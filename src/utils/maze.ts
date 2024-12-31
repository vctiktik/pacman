export function generateMaze(width: number, height: number): number[][] {
  const maze: number[][] = Array(height).fill(0).map(() => Array(width).fill(1));
  
  function carve(x: number, y: number) {
    maze[y][x] = 0;
    const directions = [[0, 2], [2, 0], [0, -2], [-2, 0]];
    directions.sort(() => Math.random() - 0.5);
    
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      
      if (newX > 0 && newX < width - 1 && newY > 0 && newY < height - 1 && maze[newY][newX] === 1) {
        maze[y + dy/2][x + dx/2] = 0;
        carve(newX, newY);
      }
    }
  }

  carve(1, 1);
  return maze;
}