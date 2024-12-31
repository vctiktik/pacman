// Utility for rendering sprites to data URLs
export function createSprite(pixelArt: string[], colors: Record<string, string>): string {
  const pixelSize = 2;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  canvas.width = pixelArt[0].length * pixelSize;
  canvas.height = pixelArt.length * pixelSize;
  
  pixelArt.forEach((row, y) => {
    [...row].forEach((pixel, x) => {
      const color = colors[pixel];
      if (color !== 'transparent') {
        ctx.fillStyle = color;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    });
  });
  
  return canvas.toDataURL();
}