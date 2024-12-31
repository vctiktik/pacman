import { generateMaze } from './maze';
import { generateMonsters } from './monsterGenerator';
import { generateItems } from './items';
import { generateMerchant } from './merchantGenerator';
import { generateDoorsAndKeys } from './doorKeyGenerator';
import { Level } from '../models/Level';
import { Stairs } from '../models/Stairs';
import { MAZE_WIDTH, MAZE_HEIGHT } from '../config/constants';

export function findEmptySpot(
  maze: number[][],
  occupied: Array<{ x: number, y: number }>,
): { x: number, y: number } {
  let x: number, y: number;
  do {
    x = Math.floor(Math.random() * (MAZE_WIDTH - 2)) + 1;
    y = Math.floor(Math.random() * (MAZE_HEIGHT - 2)) + 1;
  } while (
    maze[y][x] === 1 ||
    occupied.some(pos => pos.x === x && pos.y === y)
  );
  return { x, y };
}

export function generateLevel(
  levelNumber: number,
  playerX: number,
  playerY: number,
  fromStairs?: { type: 'up' | 'down', x: number, y: number }
): Level {
  const maze = generateMaze(MAZE_WIDTH, MAZE_HEIGHT);
  
  if (fromStairs) {
    playerX = fromStairs.x;
    playerY = fromStairs.y;
  }

  const monsters = generateMonsters(maze, playerX, playerY);
  const items = generateItems(maze, playerX, playerY, monsters);
  const merchant = generateMerchant(maze, playerX, playerY, monsters, items);
  
  const occupied = [
    { x: playerX, y: playerY },
    ...monsters,
    ...items,
    merchant
  ];

  const stairs: Stairs[] = [];

  if (fromStairs && fromStairs.type === 'up') {
    stairs.push(new Stairs(playerX, playerY, 'down'));
  }
  
  if (levelNumber < 2) {
    const upStairsPos = findEmptySpot(maze, occupied);
    stairs.push(new Stairs(upStairsPos.x, upStairsPos.y, 'up'));
    occupied.push(upStairsPos);
  }
  
  if (levelNumber > 0 && (!fromStairs || fromStairs.type === 'down')) {
    const downStairsPos = fromStairs?.type === 'down' 
      ? { x: playerX, y: playerY }
      : findEmptySpot(maze, occupied);
    stairs.push(new Stairs(downStairsPos.x, downStairsPos.y, 'down'));
  }

  const { doors, keys } = generateDoorsAndKeys(maze, occupied, levelNumber);

  return new Level(maze, monsters, items, merchant, stairs, doors, keys);
}