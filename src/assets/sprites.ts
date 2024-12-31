// Color palette for sprites
export const COLORS = {
  '.': 'transparent',
  'B': '#4a4a4a',    // Dark gray (basic outline)
  'W': '#ffffff',    // White (eyes, bones)
  'R': '#ff6b6b',    // Red (eyes, details)
  'G': '#7ac74f',    // Green (goblin, rat)
  'O': '#d17b46',    // Orange (orc)
  'P': '#9b59b6',    // Purple (bat)
  'L': '#8b4513',    // Light brick color
  'D': '#5c2c0c',    // Dark brick color
  'S': '#e0e0e0',    // Silver (skeleton)
  'N': '#8d6e63',    // Brown (spider)
  'Y': '#ffd700',    // Gold (merchant)
  'T': '#a1887f',    // Light stone
  'K': '#6d4c41',    // Dark stone
  'C': '#4169e1',    // Blue for doors/keys
  'E': '#ffd700',    // Yellow for doors/keys
  'M': '#ff4444',    // Red for doors/keys
};

// Sprite templates
export const SPRITES = {
  player: `
    .....BBBB.....
    ....BBBBBB....
    ....WWBWBW....
    ....WWBWBW....
    ....BBBBBB....
    .....RRRR.....
    ....BBBBBB....
    ...BBBBBBBB...
    ..BBBBBBBBBB..
    ..BBBBBBBBBB..
    ....BB..BB....
    ....BB..BB....
    ....BB..BB....
    ....BB..BB....
    ...BBB..BBB...
  `.trim().split('\n').map(row => row.trim()),

  wall: `
    DDDDDDDD
    DDDDDDDD
    LLDDLLDD
    LLDDLLDD
    DDLLDDLL
    DDLLDDLL
    LLDDLLDD
    LLDDLLDD
  `.trim().split('\n').map(row => row.trim()),

  merchant: `
    ....YYYY....
    ...YYYYYY...
    ...WWYWYW...
    ...YYYYYY...
    ....RRRR....
    ...YYYYYY...
    ..YYYYYYYY..
    ...YY..YY...
    ...YY..YY...
  `.trim().split('\n').map(row => row.trim()),

  stairsUp: `
    ...TTTTTT...
    ..TTTTTTTT..
    .TTTTTTTTTT.
    TTTTTTTTTTTT
    KKKKKKKKKKKK
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
  `.trim().split('\n').map(row => row.trim()),

  stairsDown: `
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
    ..KKKKKKKK..
    ..TTTTTTTT..
    ..KKKKKKKK..
    TTTTTTTTTTTT
    KKKKKKKKKKKK
    .TTTTTTTTTT.
    ..TTTTTTTT..
    ...TTTTTT...
    ....TTTT....
  `.trim().split('\n').map(row => row.trim()),

  yellowKey: `
    ....EEEE....
    ...EEEEEE...
    ..EEEEEEEE..
    ....EEEE....
    ....BBBB....
  `.trim().split('\n').map(row => row.trim()),

  blueKey: `
    ....CCCC....
    ...CCCCCC...
    ..CCCCCCCC..
    ....CCCC....
    ....BBBB....
  `.trim().split('\n').map(row => row.trim()),

  redKey: `
    ....MMMM....
    ...MMMMMM...
    ..MMMMMMMM..
    ....MMMM....
    ....BBBB....
  `.trim().split('\n').map(row => row.trim()),

  yellowDoor: `
    EEEEEEEE
    EEEEEEEE
    EEBBBBEE
    EEBBBBEE
    EEBBBBEE
    EEBBBBEE
    EEEEEEEE
    EEEEEEEE
  `.trim().split('\n').map(row => row.trim()),

  blueDoor: `
    CCCCCCCC
    CCCCCCCC
    CCBBBBCC
    CCBBBBCC
    CCBBBBCC
    CCBBBBCC
    CCCCCCCC
    CCCCCCCC
  `.trim().split('\n').map(row => row.trim()),

  redDoor: `
    MMMMMMMM
    MMMMMMMM
    MMBBBBMM
    MMBBBBMM
    MMBBBBMM
    MMBBBBMM
    MMMMMMMM
    MMMMMMMM
  `.trim().split('\n').map(row => row.trim()),
};