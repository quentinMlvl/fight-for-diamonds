import { uuidv4 } from "../utils.js";

class Team {
    _first=null
    _second=null
    _third=null;

    constructor(playerId) {
        this.id = uuidv4();        ;
        this.playerId = playerId;
    }

    get first() { return this._first }
    get second() { return this._second }
    get third() { return this._third }
    get fighters() { return [ this.first, this.second, this.third ] }
    get allFightersNotDead(){ return this.fighters.some(f => f.isAlive); }


    addAChampion(champ){
        try {
            if(!this.first) {
                this.first = champ;
                return 0;
            }
            if(!this.second) {
                this.second = champ;
                return 1;
            }
            if(!this.third) {
                this.third = champ;
                return 2;
            }
            return -1;
        } catch (error) {
            return -1
        }
        
    }

    set first(champ){
        if(champ.icon != this.second?.icon && champ.icon != this.third?.icon) this._first = champ;
        else throw new Error("Already existing champion");
    }

    set second(champ){
        if(champ.icon != this.first?.icon && champ.icon != this.third?.icon) this._second = champ;
        else throw new Error("Already existing champion");
    }

    set third(champ){
        if(champ.icon != this.first?.icon && champ.icon != this.second?.icon) this._third = champ;
        else throw new Error("Already existing champion");
    }
    
    
}

export default Team;