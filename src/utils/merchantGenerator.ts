import { Merchant } from '../models/Merchant';
import { MAZE_WIDTH, MAZE_HEIGHT } from '../config/constants';

function isDeadEnd(maze: number[][], x: number, y: number): boolean {
  // Count number of walls around the position
  let wallCount = 0;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  
  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (newX < 0 || newX >= MAZE_WIDTH || newY < 0 || newY >= MAZE_HEIGHT || maze[newY][newX] === 1) {
      wallCount++;
    }
  }
  
  // A dead end has exactly 3 walls around it
  return wallCount === 3;
}

function findDeadEnds(maze: number[][]): Array<[number, number]> {
  const deadEnds: Array<[number, number]> = [];
  
  for (let y = 1; y < MAZE_HEIGHT - 1; y++) {
    for (let x = 1; x < MAZE_WIDTH - 1; x++) {
      if (maze[y][x] === 0 && isDeadEnd(maze, x, y)) {
        deadEnds.push([x, y]);
      }
    }
  }
  
  return deadEnds;
}

export function generateMerchant(
  maze: number[][],
  playerX: number,
  playerY: number,
  monsters: { x: number; y: number }[],
  items: { x: number; y: number }[]
): Merchant {
  // Find all dead ends in the maze
  const deadEnds = findDeadEnds(maze).filter(([x, y]) => 
    // Filter out positions that are occupied
    !(x === playerX && y === playerY) &&
    !monsters.some(m => m.x === x && m.y === y) &&
    !items.some(i => i.x === x && i.y === y)
  );

  // If no valid dead ends are found, throw an error (this shouldn't happen with proper maze generation)
  if (deadEnds.length === 0) {
    throw new Error('No valid dead ends found for merchant placement');
  }

  // Randomly select one of the available dead ends
  const [x, y] = deadEnds[Math.floor(Math.random() * deadEnds.length)];
  
  return new Merchant(x, y);
}