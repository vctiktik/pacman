import { KeyColor } from './items/Key';

export class Door {
  constructor(
    public x: number,
    public y: number,
    public color: KeyColor,
    public sprite: string[]
  ) {}
}