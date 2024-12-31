export type KeyColor = 'yellow' | 'blue' | 'red';

export class Key {
  constructor(
    public x: number,
    public y: number,
    public color: KeyColor,
    public sprite: string[]
  ) {}
}