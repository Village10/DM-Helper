export let id = 0;

export class Combatant {
    static instances = [];

    constructor(name, max_health, armor) {
        this.id = id;
        this.name = name;
        this.health = parseInt(max_health);
        this.max_health = parseInt(max_health);
        this.temp_health = 0;
        this.armor = parseInt(armor);
        id += 1
        Combatant.instances.push(this);
    }

    ChangeHealth(amount) {
        this.health = Math.min(Math.max(this.health + amount, 0), this.max_health);
    }
}
