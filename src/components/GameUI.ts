import { SpriteManager } from '../managers/SpriteManager';
import { Level } from '../models/Level';
import { Player } from '../models/Player';

export class GameUI {
  private container: HTMLElement;
  private gameElement: HTMLElement;
  private statsElement: HTMLElement;
  private styleElement: HTMLStyleElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'game-container';

    this.gameElement = document.createElement('div');
    this.gameElement.id = 'game';

    this.statsElement = document.createElement('div');
    this.statsElement.id = 'stats';

    this.styleElement = document.createElement('style');
    document.head.appendChild(this.styleElement);

    this.container.appendChild(this.statsElement);
    this.container.appendChild(this.gameElement);
    document.body.appendChild(this.container);
  }

  renderLevel(
    level: Level,
    player: Player,
    spriteManager: SpriteManager
  ) {
    // Update sprites CSS
    this.styleElement.textContent = spriteManager.generateSpriteStyles(level);

    // Render maze
    this.gameElement.innerHTML = level.maze
      .map((row, y) => {
        const rowHtml = row.map((cell, x) => {
          const cellElements = [];

          // Base cell and wall
          if (cell === 1) {
            cellElements.push('<div class="cell-content wall"></div>');
          }

          // Stairs
          const stairs = level.stairs.find(s => s.x === x && s.y === y);
          if (stairs) {
            cellElements.push(`<div class="cell-content stairs-${stairs.type}-sprite"></div>`);
          }

          // Doors
          const door = level.doors.find(d => d.x === x && d.y === y);
          if (door) {
            cellElements.push(`<div class="cell-content door-${door.color}-sprite"></div>`);
          }

          // Keys
          const key = level.keys.find(k => k.x === x && k.y === y);
          if (key) {
            cellElements.push(`<div class="cell-content key-${key.color}-sprite"></div>`);
          }

          // Items
          const item = level.items.find(item => item.x === x && item.y === y);
          if (item) {
            cellElements.push(`<div class="cell-content item-${item.type}-${item.x}-${item.y}-sprite"></div>`);
          }

          // Monsters or merchant
          const monster = level.monsters.find(m => m.x === x && m.y === y && m.isAlive());
          if (monster) {
            cellElements.push(`<div class="cell-content monster-${monster.id}-sprite"></div>`);
          } else if (level.merchant.x === x && level.merchant.y === y) {
            cellElements.push('<div class="cell-content merchant-sprite"></div>');
          }

          // Player (always last to be on top)
          if (player.x === x && player.y === y) {
            cellElements.push('<div class="cell-content player-sprite"></div>');
          }

          return `<div class="cell">${cellElements.join('')}</div>`;
        }).join('');
        
        return `<div class="row">${rowHtml}</div>`;
      })
      .join('');
  }

  updateStats(player: Player, currentLevel: number) {
    const keyInfo = ['yellow', 'blue', 'red']
      .map(color => `${player.hasKey(color as any) ? '🔑' : '❌'} ${color}`)
      .join('\n');

    this.statsElement.innerHTML = `
      ⚔️ Level ${player.level}
      📈 EXP: ${player.exp}/${player.expToNextLevel}
      💰 Gold: ${player.gold}
      ❤️ HP: ${player.hp}/${player.maxHp}
      ⚔️ ATK: ${player.atk}
      🛡️ DEF: ${player.def}
      🏰 Floor: ${currentLevel + 1}
      
      Keys:
      ${keyInfo}
    `;
  }
}