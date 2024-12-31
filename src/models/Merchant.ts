export class Merchant {
  constructor(
    public x: number,
    public y: number,
    private upgrades: {
      hp: { cost: number, amount: number, used: boolean },
      atk: { cost: number, amount: number, used: boolean },
      def: { cost: number, amount: number, used: boolean }
    } = {
      hp: { cost: 20, amount: 50, used: false },
      atk: { cost: 20, amount: 10, used: false },
      def: { cost: 20, amount: 8, used: false }
    }
  ) {}

  getAvailableUpgrades() {
    return Object.entries(this.upgrades)
      .filter(([_, upgrade]) => !upgrade.used)
      .map(([stat, upgrade]) => ({
        stat,
        cost: upgrade.cost,
        amount: upgrade.amount
      }));
  }

  purchase(stat: keyof typeof this.upgrades) {
    if (!this.upgrades[stat] || this.upgrades[stat].used) {
      return null;
    }
    const upgrade = this.upgrades[stat];
    this.upgrades[stat].used = true;
    return upgrade;
  }
}