import { uuidv4 } from "../utils.js";

class Player {
    constructor(name, money = 1000) {
        this.id = uuidv4();
        this.name = name;
        this.money = money;
    }
}

export default Player