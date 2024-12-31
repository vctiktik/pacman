import { Monster } from '../models/Monster';
import { MAZE_WIDTH, MAZE_HEIGHT } from '../config/constants';

export function generateMonsters(maze: number[][], playerX: number, playerY: number): Monster[] {
  const monsters: Monster[] = [];
  const numMonsters = 5;

  for (let i = 0; i < numMonsters; i++) {
    let x: number, y: number;
    do {
      x = Math.floor(Math.random() * (MAZE_WIDTH - 2)) + 1;
      y = Math.floor(Math.random() * (MAZE_HEIGHT - 2)) + 1;
    } while (
      maze[y][x] === 1 || 
      (x === playerX && y === playerY) ||
      monsters.some(m => m.x === x && m.y === y)
    );
    monsters.push(new Monster(x, y));
  }
  
  return monsters;
}