import { Character } from '../models/Character';
import { Player } from '../models/Player';
import { Monster } from '../models/Monster';
import { COMBAT_TURN_DELAY, END_COMBAT_DELAY } from '../config/constants';
import { CombatUI } from '../components/CombatUI';

export function processCombatTurn(attacker: Character, defender: Character): string {
  const damage = attacker.attack(defender);
  return `${attacker.constructor.name} deals ${damage} damage!`;
}

export async function handleCombatRound(
  player: Player,
  monster: Monster,
  combatUI: CombatUI,
  onCombatEnd: () => void
) {
  // Player attacks
  const playerAttackLog = processCombatTurn(player, monster);
  combatUI.updateStats(player, monster);
  combatUI.updateLog(playerAttackLog);

  if (!monster.isAlive()) {
    const leveledUp = player.gainExp(monster.expReward);
    player.gainGold(monster.goldReward);
    
    await new Promise(resolve => setTimeout(resolve, END_COMBAT_DELAY));
    const rewardText = `Victory! Gained ${monster.expReward} EXP and ${monster.goldReward} gold!` +
      (leveledUp ? ' Level Up!' : '');
    combatUI.updateLog(rewardText);
    
    // Add a small delay before hiding the combat UI
    setTimeout(() => {
      combatUI.hide();
      onCombatEnd();
    }, 1000);
    return;
  }

  // Monster attacks
  await new Promise(resolve => setTimeout(resolve, COMBAT_TURN_DELAY));
  const monsterAttackLog = processCombatTurn(monster, player);
  combatUI.updateStats(player, monster);
  combatUI.updateLog(monsterAttackLog);

  if (!player.isAlive()) {
    combatUI.updateLog('Game Over! You were defeated!');
    return;
  }

  // Next round
  await new Promise(resolve => setTimeout(resolve, COMBAT_TURN_DELAY));
  return handleCombatRound(player, monster, combatUI, onCombatEnd);
}