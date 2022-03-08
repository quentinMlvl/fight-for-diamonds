import { baseImgUrl } from '../utils.js';

class Champion {
    constructor({ name, hp, prot, icon, atk }, spe) {
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.prot = !!prot;
        this.icon = icon;
        this.spe = spe;
        this.isAlive = true;
    }

    getIconUrl() {
        return axios.get(baseImgUrl + "icons/" + this.icon, {
            responseType: "blob",
        }).then((res, err) => {
            if(err) console.err(err);
            else return URL.createObjectURL(res.data);
        });        
    }

    attacks(opponent){
        const attackerDmg = this.dealsDmg()
        const defenderDmgTaken = opponent.takesDmg(attackerDmg);

        const defenderDmg = opponent.dealsDmg()
        const attackerDmgTaken = this.takesDmg(defenderDmg);
        console.log(`${ this.name } deals ${ defenderDmgTaken } dmg to ${ opponent.name } (HP: ${opponent.hp}) and take ${ attackerDmgTaken } dmg (HP: ${this.hp})`);
    }
    
    dealsDmg(){
        return this.atk;
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