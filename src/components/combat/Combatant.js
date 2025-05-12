import Storage from "../../util/Storage"

export class Combatant {
    constructor(name, max_health, armor, character) {
        this.id = Storage("get", "", "combatId");
        this.name = name;
        this.health = parseInt(max_health);
        this.max_health = parseInt(max_health);
        this.temp_health = 0;
        this.armor = parseInt(armor);
        this.initiative = null
        this.character = character;
        Storage("set", this.id + 1, "combatId")
        Storage("push", this, "Combat")
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
