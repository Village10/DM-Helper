
export default function changeHealth(combatantId, setCombatants, amount, temp_health) {
	setCombatants((prev) =>
		prev.map((mappedCombatant) =>
			mappedCombatant.id === combatantId
				? {
					...mappedCombatant,
					health: amount < 0 ?
						Math.max(mappedCombatant.health + Math.min(mappedCombatant.temp_health +  amount, 0), 0)
						: Math.max(Math.min(mappedCombatant.health + amount, mappedCombatant.max_health), 0),
					temp_health: temp_health ?
						temp_health
						: amount < 0 ?
							Math.max(mappedCombatant.temp_health + amount, 0)
							: mappedCombatant.temp_health
				}
				: mappedCombatant))
}