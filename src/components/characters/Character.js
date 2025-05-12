import Storage from "../../util/Storage"

export class Character {
    static instances = [];

    constructor(name, level, max_health, armor, mainClass, subClass, species, background) {
        this.id = Storage("get", "", "characterId");
        this.name = name;
        this.level = parseInt(level);
        this.maxHealth = parseInt(max_health);
        this.armor = parseInt(armor);
        this.mainClass = mainClass;
        this.subClass = subClass;
        this.species = species;
        this.background = background;
        Storage("set", this.id + 1, "characterId")
        Storage("push", this, "Characters")
    }
}
