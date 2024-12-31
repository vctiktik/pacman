import { Character } from './Character';
import { MONSTER_TYPES } from './monsters/MonsterType';

let nextMonsterId = 0;

export class Monster extends Character {
  public readonly type: string;
  public readonly sprite: string[];
  public readonly id: number;
  public readonly expReward: number;
  public readonly goldReward: number;

  constructor(x: number, y: number) {
    const types = Object.keys(MONSTER_TYPES);
    const type = types[Math.floor(Math.random() * types.length)];
    const stats = MONSTER_TYPES[type];
    
    super(x, y, stats.hp, stats.hp, stats.atk, stats.def);
    this.type = type;
    this.sprite = stats.sprite;
    this.id = nextMonsterId++;
    this.expReward = stats.expReward;
    this.goldReward = stats.goldReward;
  }
}