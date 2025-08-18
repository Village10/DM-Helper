import storage from '../../util/storage'

export class Character {

	id: number
	level: number
	maxHealth: number
	armor: number

	constructor(
		public name: string,
		level: string | number,
		maxHealth: string | number,
		armor: string | number,
		public mainClass: string,
		public subClass: string,
		public species: string,
		public background: string
	) {
		this.id = storage('get', '', 'character-id')
		this.level = typeof level === "string" ? parseInt(level) : level
		this.maxHealth = typeof maxHealth === "string" ? parseInt(maxHealth) : maxHealth
		this.armor = typeof armor === "string" ? parseInt(armor): armor
		storage('set', this.id + 1, 'character-id')
		storage('push', this, 'characters')
	}
}
