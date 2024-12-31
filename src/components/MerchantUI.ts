export class MerchantUI {
  private element: HTMLElement;
  private selectedIndex: number = 0;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'merchant-popup hidden';
    document.body.appendChild(this.element);
    this.setupKeyboardControls();
  }

  private setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      if (this.element.classList.contains('hidden')) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          this.updateSelection(-1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.updateSelection(1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.triggerSelectedButton();
          break;
        case 'Escape':
          e.preventDefault();
          const closeBtn = this.element.querySelector('.close-btn') as HTMLElement;
          closeBtn?.click();
          break;
      }
    });
  }

  private updateSelection(direction: number) {
    const buttons = Array.from(this.element.querySelectorAll('button'));
    this.selectedIndex = (this.selectedIndex + direction + buttons.length) % buttons.length;
    
    buttons.forEach((btn, index) => {
      btn.classList.toggle('selected', index === this.selectedIndex);
    });
  }

  private triggerSelectedButton() {
    const buttons = Array.from(this.element.querySelectorAll('button'));
    const selectedButton = buttons[this.selectedIndex];
    if (selectedButton && !selectedButton.hasAttribute('disabled')) {
      selectedButton.click();
    }
  }

  show(upgrades: Array<{ stat: string, cost: number, amount: number }>, gold: number, onPurchase: (stat: string) => void) {
    this.selectedIndex = 0;
    this.element.innerHTML = `
      <div class="merchant-container">
        <h2>Merchant's Shop</h2>
        <p>Your Gold: ${gold}</p>
        <div class="upgrades">
          ${upgrades.map(({ stat, cost, amount }) => `
            <button 
              class="upgrade-btn ${gold < cost ? 'disabled' : ''}"
              data-stat="${stat}"
              ${gold < cost ? 'disabled' : ''}
            >
              Upgrade ${stat.toUpperCase()}: +${amount} (${cost} gold)
            </button>
          `).join('')}
        </div>
        <button class="close-btn">Close</button>
      </div>
    `;

    this.element.classList.remove('hidden');
    this.updateSelection(0);

    // Add event listeners
    this.element.querySelectorAll('.upgrade-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const stat = (btn as HTMLElement).dataset.stat;
        if (stat) {
          onPurchase(stat);
          this.hide();
        }
      });
    });

    this.element.querySelector('.close-btn')?.addEventListener('click', () => {
      onPurchase('close');
      this.hide();
    });
  }

  hide() {
    this.element.classList.add('hidden');
  }
}