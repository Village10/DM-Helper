import storage from '../../util/storage'
import {Character} from "../characters/Character";

export class Combatant {

	id: number
	health: number
	tempHealth: number
	initiative: number | null

	constructor(
		public name: string,
		public maxHealth: number ,
		public armor: number,
		public character: Character | string | null = null,
	) {
		this.id = storage('get', '', 'combatant-id')
		this.health = maxHealth
		this.tempHealth = 0
		this.initiative = null
		storage('set', this.id + 1, 'combatant-id')
	}
}
