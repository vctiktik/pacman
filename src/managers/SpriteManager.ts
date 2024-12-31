import { createSprite } from '../utils/spriteRenderer';
import { SPRITES, COLORS } from '../assets/sprites';
import { Item } from '../models/items/Item';
import { Monster } from '../models/Monster';
import { Level } from '../models/Level';

export class SpriteManager {
  private sprites: Map<string, string> = new Map();

  constructor() {
    // Pre-generate static sprites
    this.sprites.set('player', createSprite(SPRITES.player, COLORS));
    this.sprites.set('wall', createSprite(SPRITES.wall, COLORS));
    this.sprites.set('merchant', createSprite(SPRITES.merchant, COLORS));
    this.sprites.set('stairsUp', createSprite(SPRITES.stairsUp, COLORS));
    this.sprites.set('stairsDown', createSprite(SPRITES.stairsDown, COLORS));
    
    // Pre-generate door sprites
    this.sprites.set('doorYellow', createSprite(SPRITES.yellowDoor, COLORS));
    this.sprites.set('doorBlue', createSprite(SPRITES.blueDoor, COLORS));
    this.sprites.set('doorRed', createSprite(SPRITES.redDoor, COLORS));
    
    // Pre-generate key sprites
    this.sprites.set('keyYellow', createSprite(SPRITES.yellowKey, COLORS));
    this.sprites.set('keyBlue', createSprite(SPRITES.blueKey, COLORS));
    this.sprites.set('keyRed', createSprite(SPRITES.redKey, COLORS));
  }

  generateSpriteStyles(level: Level): string {
    let css = `
      .wall { background-image: url(${this.sprites.get('wall')}); }
      .player-sprite { background-image: url(${this.sprites.get('player')}); }
      .merchant-sprite { background-image: url(${this.sprites.get('merchant')}); }
      .stairs-up-sprite { background-image: url(${this.sprites.get('stairsUp')}); }
      .stairs-down-sprite { background-image: url(${this.sprites.get('stairsDown')}); }
    `;

    // Add door sprites
    ['yellow', 'blue', 'red'].forEach(color => {
      css += `.door-${color}-sprite { background-image: url(${this.sprites.get(`door${color.charAt(0).toUpperCase()}${color.slice(1)}`)}); }\n`;
      css += `.key-${color}-sprite { background-image: url(${this.sprites.get(`key${color.charAt(0).toUpperCase()}${color.slice(1)}`)}); }\n`;
    });

    // Add monster sprites
    level.monsters.forEach(monster => {
      const spriteKey = `monster-${monster.id}`;
      if (!this.sprites.has(spriteKey)) {
        this.sprites.set(spriteKey, createSprite(monster.sprite, COLORS));
      }
      css += `.monster-${monster.id}-sprite { background-image: url(${this.sprites.get(spriteKey)}); }\n`;
    });

    // Add item sprites
    level.items.forEach(item => {
      const spriteKey = `item-${item.type}-${item.x}-${item.y}`;
      if (!this.sprites.has(spriteKey)) {
        this.sprites.set(spriteKey, createSprite(item.sprite, COLORS));
      }
      css += `.item-${item.type}-${item.x}-${item.y}-sprite { background-image: url(${this.sprites.get(spriteKey)}); }\n`;
    });

    return css;
  }
}