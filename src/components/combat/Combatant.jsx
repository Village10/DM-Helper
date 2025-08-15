import storage from '../../util/storage'

export class Combatant {
	constructor(name, max_health, armor, character) {
		this.id = storage('get', '', 'combatant-id')
		this.name = name
		this.health = parseInt(max_health)
		this.max_health = parseInt(max_health)
		this.temp_health = 0
		this.armor = parseInt(armor)
		this.initiative = null
		this.character = character
		storage('set', this.id + 1, 'combatant-id')
	}
}
