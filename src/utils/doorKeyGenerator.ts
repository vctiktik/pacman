import { Door } from '../models/Door';
import { Key, KeyColor } from '../models/items/Key';
import { SPRITES } from '../assets/sprites';
import { findEmptySpot } from './levelGenerator';

const DOOR_SPRITES = {
  yellow: SPRITES.yellowDoor,
  blue: SPRITES.blueDoor,
  red: SPRITES.redDoor
};

const KEY_SPRITES = {
  yellow: SPRITES.yellowKey,
  blue: SPRITES.blueKey,
  red: SPRITES.redKey
};

export function generateDoorsAndKeys(
  maze: number[][],
  occupied: Array<{ x: number, y: number }>,
  level: number
): { doors: Door[], keys: Key[] } {
  const doors: Door[] = [];
  const keys: Key[] = [];
  const colors: KeyColor[] = ['yellow', 'blue', 'red'];
  
  // Number of door-key pairs increases with level
  const numPairs = Math.min(level + 1, colors.length);
  
  for (let i = 0; i < numPairs; i++) {
    const color = colors[i];
    
    // Place key first
    const keyPos = findEmptySpot(maze, occupied);
    const key = new Key(keyPos.x, keyPos.y, color, KEY_SPRITES[color]);
    keys.push(key);
    occupied.push(keyPos);
    
    // Place door after key
    const doorPos = findEmptySpot(maze, occupied);
    const door = new Door(doorPos.x, doorPos.y, color, DOOR_SPRITES[color]);
    doors.push(door);
    occupied.push(doorPos);
  }
  
  return { doors, keys };
}