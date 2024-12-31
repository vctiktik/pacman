import { Player } from '../models/Player';
import { Monster } from '../models/Monster';
import { Level } from '../models/Level';
import { generateLevel } from '../utils/levelGenerator';
import { CombatUI } from '../components/CombatUI';
import { MerchantUI } from '../components/MerchantUI';
import { GameUI } from '../components/GameUI';
import { SpriteManager } from '../managers/SpriteManager';
import { handleCombatRound } from '../utils/combat';

export class Game {
  private currentLevel: number = 0;
  private levels: Level[] = [];
  private player: Player;
  private inCombat: boolean = false;
  private isShoppingAtMerchant: boolean = false;
  private currentMonster: Monster | null = null;
  private combatUI: CombatUI;
  private merchantUI: MerchantUI;
  private gameUI: GameUI;
  private spriteManager: SpriteManager;

  constructor() {
    this.player = new Player();
    this.spriteManager = new SpriteManager();
    this.combatUI = new CombatUI();
    this.merchantUI = new MerchantUI();
    this.gameUI = new GameUI();
    
    this.initializeLevels();
    this.setupControls();
    this.render();
  }

  private initializeLevels() {
    for (let i = 0; i < 3; i++) {
      this.levels[i] = generateLevel(i, this.player.x, this.player.y);
    }
  }

  private setupControls() {
    document.addEventListener('keydown', (e) => {
      if (this.inCombat || this.isShoppingAtMerchant) return;

      let newX = this.player.x;
      let newY = this.player.y;

      switch (e.key) {
        case 'ArrowRight': newX++; break;
        case 'ArrowLeft': newX--; break;
        case 'ArrowDown': newY++; break;
        case 'ArrowUp': newY--; break;
        default: return;
      }

      this.handleMovement(newX, newY);
    });
  }

  private handleMovement(newX: number, newY: number) {
    const currentLevel = this.levels[this.currentLevel];
    
    // Check for doors
    const door = currentLevel.doors.find(d => d.x === newX && d.y === newY);
    if (door && !this.player.hasKey(door.color)) {
      return; // Can't pass through door without key
    }
    
    if (
      newX >= 0 && newX < currentLevel.maze[0].length &&
      newY >= 0 && newY < currentLevel.maze.length &&
      currentLevel.maze[newY][newX] === 0
    ) {
      // Check for keys
      const keyIndex = currentLevel.keys.findIndex(k => k.x === newX && k.y === newY);
      if (keyIndex !== -1) {
        const key = currentLevel.keys[keyIndex];
        this.player.addKey(key.color);
        currentLevel.keys.splice(keyIndex, 1);
      }

      // Check for stairs
      const stairs = currentLevel.stairs.find(s => s.x === newX && s.y === newY);
      if (stairs) {
        this.handleStairs(stairs);
      } else {
        this.player.x = newX;
        this.player.y = newY;
        this.handleInteractions(newX, newY);
      }
      
      this.render();
    }
  }

  private handleStairs(stairs: { type: 'up' | 'down', x: number, y: number }) {    
    if (stairs.type === 'up' && this.currentLevel < 2) {
      this.currentLevel++;
      // Place player at the down stairs in the next level
      const downStairs = this.levels[this.currentLevel].stairs.find(s => s.type === 'down');
      if (downStairs) {
        this.player.x = downStairs.x;
        this.player.y = downStairs.y;
      }
    } else if (stairs.type === 'down' && this.currentLevel > 0) {
      this.currentLevel--;
      // Place player at the up stairs in the previous level
      const upStairs = this.levels[this.currentLevel].stairs.find(s => s.type === 'up');
      if (upStairs) {
        this.player.x = upStairs.x;
        this.player.y = upStairs.y;
      }
    }
  }

  private handleInteractions(x: number, y: number) {
    const currentLevel = this.levels[this.currentLevel];

    // Check for merchant interaction
    if (currentLevel.merchant.x === x && currentLevel.merchant.y === y) {
      this.handleMerchantInteraction();
      return;
    }

    // Check for item pickup
    const itemIndex = currentLevel.items.findIndex(item => item.x === x && item.y === y);
    if (itemIndex !== -1) {
      const item = currentLevel.items[itemIndex];
      if (item.type === 'sword') {
        this.player.atk += item.bonus;
      } else if (item.type === 'shield') {
        this.player.def += item.bonus;
      }
      currentLevel.items.splice(itemIndex, 1);
      return;
    }

    // Check for monster combat
    const monster = currentLevel.monsters.find(m => m.x === x && m.y === y && m.isAlive());
    if (monster) {
      this.startCombat(monster);
    }
  }

  private handleMerchantInteraction() {
    this.isShoppingAtMerchant = true;
    const upgrades = this.levels[this.currentLevel].merchant.getAvailableUpgrades();
    
    this.merchantUI.show(upgrades, this.player.gold, (stat) => {
      if (stat !== 'close') {
        const upgrade = this.levels[this.currentLevel].merchant.purchase(stat as any);
        if (upgrade && this.player.gold >= upgrade.cost) {
          this.player.gold -= upgrade.cost;
          switch (stat) {
            case 'hp': this.player.maxHp += upgrade.amount; this.player.hp += upgrade.amount; break;
            case 'atk': this.player.atk += upgrade.amount; break;
            case 'def': this.player.def += upgrade.amount; break;
          }
        }
      }
      this.isShoppingAtMerchant = false;
      this.render();
    });
  }

  private startCombat(monster: Monster) {
    this.inCombat = true;
    this.currentMonster = monster;
    this.combatUI.show();
    this.combatUI.updateStats(this.player, monster);
    this.handleCombatRound();
  }

  private async handleCombatRound() {
    if (!this.currentMonster) return;

    await handleCombatRound(
      this.player,
      this.currentMonster,
      this.combatUI,
      () => {
        this.inCombat = false;
        this.currentMonster = null;
        this.levels[this.currentLevel].monsters = 
          this.levels[this.currentLevel].monsters.filter(m => m.isAlive());
        this.render();
      }
    );
  }

  private render() {
    const currentLevel = this.levels[this.currentLevel];
    this.gameUI.renderLevel(currentLevel, this.player, this.spriteManager);
    this.gameUI.updateStats(this.player, this.currentLevel);
  }
}