import { baseImgUrl } from '../utils.js';

class Champion {
    constructor({ name, hp, prot, icon, atk }, stat) {
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.prot = !!prot;
        this.icon = icon;
        this.stat = stat;
        this.isAlive = true;
    }

    get id(){ return this.icon.split(".")[0]; }

    get iconUrl() {
        return `${baseImgUrl}icons/${this.icon}`;       
    }

    attacks(opponent){
        const attackerDmg = this.dealsDmg(opponent.stat)
        const defenderDmgTaken = opponent.takesDmg(attackerDmg);

        const defenderDmg = opponent.dealsDmg(this.stat)
        const attackerDmgTaken = this.takesDmg(defenderDmg);

        // console.log(`${ this.name } deals ${ defenderDmgTaken } dmg to ${ opponent.name } (HP: ${opponent.hp}) and take ${ attackerDmgTaken } dmg (HP: ${this.hp})`);
    }
    
    dealsDmg(statOpp){
        let factor = 1
        switch (this.stat){
            case "agi":
                if(statOpp == "str") factor = .8
                if(statOpp == "end") factor = 1.2   
                break;

            case "str": 
                if(statOpp == "end") factor = .8
                if(statOpp == "agi") factor = 1.2
                break;

            case "end":
                if(statOpp == "agi") factor = .8
                if(statOpp == "str") factor = 1.2
                break;
        }
        return Math.ceil(this.atk * factor);
    }

    takesDmg(dmg){
        if(!this.prot) {
            if(dmg >= this.hp) {
                this.isAlive = false;
                this.hp = 0;
            } else this.hp -= dmg;
            return dmg; 
        }else { 
            this.prot = false;
            return 0;
        };
    }
}

export default Champion