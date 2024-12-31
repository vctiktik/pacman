import { Player } from '../models/Player';
import { Monster } from '../models/Monster';

export class CombatUI {
  private element: HTMLElement;
  
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'combat-popup hidden';
    document.body.appendChild(this.element);
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }

  updateStats(player: Player, monster: Monster) {
    this.element.innerHTML = `
      <div class="combat-container">
        <div class="combatant player-side">
          <div class="sprite-container">
            <div class="sprite player-sprite"></div>
          </div>
          <div class="stats">
            <div class="name">Player</div>
            <div class="hp-bar">
              <div class="hp-fill" style="width: ${(player.hp / player.maxHp) * 100}%"></div>
              <span class="hp-text">${player.hp}/${player.maxHp}</span>
            </div>
            <div class="combat-stats">
              <div>⚔️ ATK: ${player.atk}</div>
              <div>🛡️ DEF: ${player.def}</div>
            </div>
          </div>
        </div>

        <div class="vs">VS</div>

        <div class="combatant monster-side">
          <div class="sprite-container">
            <div class="sprite monster-${monster.id}-sprite"></div>
          </div>
          <div class="stats">
            <div class="name">${monster.type.charAt(0).toUpperCase() + monster.type.slice(1)}</div>
            <div class="hp-bar">
              <div class="hp-fill" style="width: ${(monster.hp / monster.maxHp) * 100}%"></div>
              <span class="hp-text">${monster.hp}/${monster.maxHp}</span>
            </div>
            <div class="combat-stats">
              <div>⚔️ ATK: ${monster.atk}</div>
              <div>🛡️ DEF: ${monster.def}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="combat-log"></div>
    `;
  }

  updateLog(message: string) {
    const logElement = this.element.querySelector('.combat-log');
    if (logElement) {
      logElement.textContent = message;
    }
  }
}