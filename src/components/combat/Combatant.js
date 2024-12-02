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
        let damage = amount
        if (amount < 0) {
            if (this.temp_health !== 0) {
                if (amount * -1 > this.temp_health) {
                    damage += this.temp_health;
                    this.temp_health = 0
                } else {
                    this.temp_health += damage;
                    damage = 0
                }
            }
        }
        this.health = Math.min(Math.max(this.health + damage, 0), this.max_health);
    }
}
