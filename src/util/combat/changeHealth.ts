import {Dispatch, SetStateAction} from "react";
import {Combatant} from "../../components/combat/Combatant";

export default function changeHealth(
    combatantId: number,
    setCombatants: Dispatch<SetStateAction<Combatant[]>>,
    amount: number,
    tempHealth: number
) {
	setCombatants((prev) =>
		prev.map((mappedCombatant) =>
			mappedCombatant.id === combatantId
				? {
					...mappedCombatant,
					health: amount < 0 ?
						Math.max(mappedCombatant.health + Math.min(mappedCombatant.tempHealth +  amount, 0), 0)
						: Math.max(Math.min(mappedCombatant.health + amount, mappedCombatant.maxHealth), 0),
					tempHealth: tempHealth ?
						tempHealth
						: amount < 0 ?
							Math.max(mappedCombatant.tempHealth + amount, 0)
							: mappedCombatant.tempHealth
				}
				: mappedCombatant))
}