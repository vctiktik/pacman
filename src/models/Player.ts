import { Character } from './Character';
import { KeyColor } from './items/Key';

export class Player extends Character {
  public exp: number = 0;
  public level: number = 1;
  public gold: number = 0;
  public expToNextLevel: number = 100;
  public keys: Set<KeyColor> = new Set();

  constructor() {
    super(1, 1, 100, 100, 15, 5);
  }

  gainExp(amount: number): boolean {
    this.exp += amount;
    if (this.exp >= this.expToNextLevel) {
      this.levelUp();
      return true;
    }
    return false;
  }

  gainGold(amount: number) {
    this.gold += amount;
  }

  hasKey(color: KeyColor): boolean {
    return this.keys.has(color);
  }

  addKey(color: KeyColor) {
    this.keys.add(color);
  }

  private levelUp() {
    this.level++;
    this.exp -= this.expToNextLevel;
    this.expToNextLevel = Math.floor(this.expToNextLevel * 1.5);
    
    this.maxHp += 20;
    this.hp = this.maxHp;
    this.atk += 5;
    this.def += 3;
  }
}