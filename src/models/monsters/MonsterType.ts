export interface MonsterStats {
  hp: number;
  atk: number;
  def: number;
  sprite: string[];
  expReward: number;
  goldReward: number;
}

export const MONSTER_TYPES: Record<string, MonsterStats> = {
  goblin: {
    hp: 30,
    atk: 8,
    def: 3,
    expReward: 25,
    goldReward: 10,
    sprite: `
      ....GGGG....
      ...GGGGGG...
      ...RWRWRW...
      ...GGGGGG...
      ....RRRR....
      ...GGGGGG...
      ..GGGGGGGG..
      ...GG..GG...
      ...GG..GG...
    `.trim().split('\n').map(row => row.trim())
  },
  slime: {
    hp: 25,
    atk: 6,
    def: 2,
    expReward: 15,
    goldReward: 5,
    sprite: `
      ....LLLL....
      ...LLLLLL...
      ..LLWLLWLL..
      ..LLLLLLLL..
      ..LLLLLLLL..
      ...LLLLLL...
    `.trim().split('\n').map(row => row.trim())
  },
  skeleton: {
    hp: 35,
    atk: 10,
    def: 1,
    expReward: 35,
    goldReward: 15,
    sprite: `
      ....SSSS....
      ...SSSSSS...
      ...BWBWBW...
      ...SSSSSS...
      ....SSSS....
      ...SSSSSS...
      ..SSSSSSSS..
      ...SS..SS...
      ...SS..SS...
    `.trim().split('\n').map(row => row.trim())
  },
  bat: {
    hp: 20,
    atk: 7,
    def: 1,
    expReward: 20,
    goldReward: 8,
    sprite: `
      PP.......PP.
      .PPPP..PPPP.
      ..PPPPPPPP..
      ...PRRRPP...
      ....PPPP....
    `.trim().split('\n').map(row => row.trim())
  },
  orc: {
    hp: 45,
    atk: 12,
    def: 4,
    expReward: 50,
    goldReward: 25,
    sprite: `
      ....OOOO....
      ...OOOOOO...
      ...BWBWBW...
      ...OOOOOO...
      ....RRRR....
      ...OOOOOO...
      ..OOOOOOOO..
      ..OO....OO..
      .OOO....OOO.
    `.trim().split('\n').map(row => row.trim())
  },
  spider: {
    hp: 22,
    atk: 9,
    def: 2,
    expReward: 30,
    goldReward: 12,
    sprite: `
      N..N..N..N..
      .NNNNNNNN...
      ..NRWWRN....
      .NNNNNNNN...
      N..N..N..N..
    `.trim().split('\n').map(row => row.trim())
  },
  ghost: {
    hp: 28,
    atk: 11,
    def: 0,
    expReward: 40,
    goldReward: 20,
    sprite: `
      ....DDDD....
      ...DDDDDD...
      ...RWRWRW...
      ...DDDDDD...
      ...DDDDDD...
      ..DDDDDDDD..
      .DDDDDDDDDD.
      .DD.DD.DD.D.
    `.trim().split('\n').map(row => row.trim())
  },
  rat: {
    hp: 18,
    atk: 6,
    def: 1,
    expReward: 10,
    goldReward: 3,
    sprite: `
      .NN........
      NNNN.......
      NRWRN......
      .NNNNNN....
      ..NNNNNN...
      ...NNNNNN..
      ....NN..NN.
    `.trim().split('\n').map(row => row.trim())
  }
};