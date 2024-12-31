import { Item } from '../models/items/Item';
import { ITEM_SPRITES } from '../models/items/ItemSprites';
import { MAZE_WIDTH, MAZE_HEIGHT } from '../config/constants';

export function generateItems(maze: number[][], playerX: number, playerY: number, monsters: { x: number, y: number }[]): Item[] {
  const items: Item[] = [];
  
  // Create one sword and one shield
  const itemTypes: ['sword', 'shield'] = ['sword', 'shield'];
  
  for (const type of itemTypes) {
    let x: number, y: number;
    do {
      x = Math.floor(Math.random() * (MAZE_WIDTH - 2)) + 1;
      y = Math.floor(Math.random() * (MAZE_HEIGHT - 2)) + 1;
    } while (
      maze[y][x] === 1 || 
      (x === playerX && y === playerY) ||
      monsters.some(m => m.x === x && m.y === y) ||
      items.some(item => item.x === x && item.y === y)
    );
    
    items.push({
      type,
      x,
      y,
      bonus: type === 'sword' ? 5 : 3, // Sword gives +5 ATK, Shield gives +3 DEF
      sprite: ITEM_SPRITES[type]
    });
  }
  
  return items;
}