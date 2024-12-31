import { playHitSound } from '../utils/audio';

export class Character {
  constructor(
    public x: number,
    public y: number,
    public hp: number,
    public maxHp: number,
    public atk: number,
    public def: number
  ) {}

  isAlive(): boolean {
    return this.hp > 0;
  }

  attack(target: Character): number {
    const damage = Math.max(1, this.atk - target.def);
    target.hp = Math.max(0, target.hp - damage);
    playHitSound();
    return damage;
  }
}