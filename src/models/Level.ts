import { Monster } from './Monster';
import { Item } from './items/Item';
import { Merchant } from './Merchant';
import { Stairs } from './Stairs';
import { Door } from './Door';
import { Key } from './items/Key';

export class Level {
  constructor(
    public maze: number[][],
    public monsters: Monster[],
    public items: Item[],
    public merchant: Merchant,
    public stairs: Stairs[],
    public doors: Door[],
    public keys: Key[]
  ) {}
}