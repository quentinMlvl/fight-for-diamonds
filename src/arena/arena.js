import { baseImgUrl } from "../utils.js"

const fightInterval = 1700
const arena = document.querySelector("#arena")

const team1 = document.querySelector('#team1')
const team2 = document.querySelector('#team2')

async function createArena(){
    arena.style.display = "block"
    const player1Name = document.querySelector('#player1Name')
    player1Name.innerHTML = `${globalThis.player1.name}`
    const player2Name = document.querySelector('#player2Name')
    player2Name.innerHTML = `${globalThis.player2.name}`

    createFighters(1, globalThis.team1.fighters)
    createFighters(2, globalThis.team2.fighters)

    teamFight().then((winnerTeam) => {
        displayVictoryScreen(winnerTeam)
    })


}

function createFighters(numTeam, fighters){
    fighters.forEach((fighter, fIndex) => {
        const championDiv = document.createElement("div");
        
        if (numTeam == 1) {
            team1.append(championDiv)
        } else {
            team2.append(championDiv)
        }
        

        let classByPosition = (fIndex == 0) ? "champFirst" : (fIndex == 1) ? "champSecond" : "champThird"
        championDiv.classList.add("champion", classByPosition);
        championDiv.id = `team${numTeam}Champ${fIndex + 1}`

        const wrapper = document.createElement("div")
        wrapper.classList.add("wrapper")
        championDiv.append(wrapper)

        const championFrame = document.createElement("div")
        championFrame.classList.add("championFrame")
        wrapper.append(championFrame)

        const figure = document.createElement("figure")
        championFrame.append(figure)

        if (fighter.prot) {
            const imgDivineShield = document.createElement("img")
            imgDivineShield.src = `${baseImgUrl}template/divine-shield.png`
            imgDivineShield.alt = "Divine shield"
            imgDivineShield.title = "Divine shield"
            imgDivineShield.classList.add('divineShield')
            
            figure.append(imgDivineShield)
        }

        const imgStats = document.createElement('img')
              imgStats.src = `${baseImgUrl}template/stat-${fighter.stat}.png`
              imgStats.setAttribute('alt', `${fighter.name} - ${(fighter.stat === 'str' ? 'Strength' : (fighter.stat === 'int' ? 'Intelligence' : 'Agility'))}`)
              imgStats.setAttribute('title', `${fighter.name} - ${(fighter.stat === 'str' ? 'Strength' : (fighter.stat === 'int' ? 'Intelligence' : 'Agility'))}`)
              imgStats.classList.add('championStat')

        
        const imgFrame = document.createElement('img')
              imgFrame.src = `${baseImgUrl}template/frame-${fighter.stat}.png`
              imgFrame.setAttribute('alt', `${fighter.name} - ${(fighter.stat === 'str' ? 'Strength' : (fighter.stat === 'int' ? 'Intelligence' : 'Agility'))}`)
              imgFrame.setAttribute('title', `${fighter.name} - ${(fighter.stat === 'str' ? 'Strength' : (fighter.stat === 'int' ? 'Intelligence' : 'Agility'))}`)
              imgFrame.classList.add('championBord')

        
        const imgIcone = document.createElement('img')
              imgIcone.src = fighter.iconUrl
              imgIcone.setAttribute('alt', `${fighter.name}`)
              imgIcone.setAttribute('title', `${fighter.name}`)
              imgIcone.classList.add('championIcon')

        const figCaption = document.createElement("figcaption")
        figCaption.textContent = `${fighter.name}`

        figure.append(imgStats, imgFrame, imgIcone, figCaption)


        const championDatas = document.createElement("div")
        championDatas.classList.add("championDatas")
        wrapper.append(championDatas)

        const championHp = document.createElement("div")
        championHp.classList.add("championHP")

        const championHpSpan = document.createElement("span")
        championHpSpan.textContent = fighter.hp
        championHp.append(championHpSpan)

        
        const championAtk = document.createElement("div")
        championAtk.classList.add("championATK")

        const championAtkSpan = document.createElement("span")
        championAtkSpan.textContent = fighter.atk
        championAtk.append(championAtkSpan)

        championDatas.append(championAtk, championHp)

        
        const championHitBox = document.createElement("div")
        championHitBox.classList.add("championHitBox")
        wrapper.append(championHitBox)

        const championHitBoxWrapper = document.createElement("wrapper")
        championHitBoxWrapper.classList.add("wrapper")
        championHitBox.append(championHitBoxWrapper)

        const hitImg = document.createElement('img')
        hitImg.src = `${baseImgUrl}template/hit.png`
        hitImg.alt = `Hit!`
        hitImg.title = `Hit!`
        hitImg.classList.add('hit')

        
        const hitKOImg = document.createElement('img')
        hitKOImg.src = `${baseImgUrl}template/hit-ko.png`
        hitKOImg.alt = `K.O!`
        hitKOImg.title = `K.O!`
        hitKOImg.classList.add('hitKO')

        championHitBoxWrapper.append(hitImg, hitKOImg)
        
    })
}

async function teamFight() {
    const team1 = globalThis.team1
    const team2 = globalThis.team2
    let firstTeamFightersCount = 0;
    let secondTeamFightersCount = 0;
    
    const firstTeam = toss(team1, team2);
    const secondTeam = (firstTeam.id == team2.id) ? team1 : team2;
    while (team1.allFightersNotDead && team2.allFightersNotDead){
        let currentFighter1 = firstTeam.fighters[firstTeamFightersCount];
        let currentFighter2 = secondTeam.fighters[secondTeamFightersCount];
        
        await fight1v1(currentFighter1, currentFighter2, firstTeam, secondTeam);
        if (!currentFighter1.isAlive) {
            firstTeamFightersCount++;
        } 
        if (!currentFighter2.isAlive) {
            secondTeamFightersCount++;
        }
    }
    return (team1.allFightersNotDead) ? team1 : team2;
}

function toss(team1, team2) {
    const randomNbr = (Math.floor(Math.random() * 100) + 1);
    return (randomNbr % 2 == 0) ? team2 : team1;
}

async function fight1v1(fighter1, fighter2, team1, team2) {
    return await new Promise(resolve => {
        let atkCount = 0;
        const fight = setInterval(function () {
            if (atkCount % 2 == 0) { // GG !!
                // Ya qlq probleme : (de css, j'ai vu) + des fois les perso qui reviennent pas à leur place ...
                // Je te laisse ça je m'occupe de la maj auto des pv et de l'amplification de dégâts
                // Yup, je regarderais ça demain matin, je pense.
                // Pas de souci
                // Live share meilleur messagerie pour dev 
                // LiveShare > WhatsApp :rofl:
                // On laisse cette conversation pour demain ??
                // Je la push sur Github ?
                // On va se gêner, tient ! (╯°□°）╯︵ ┻━┻
                // Oui pour les deux #trollDesFamilles
                // ( ͡~ ͜ʖ ͡°)
                launchFightAnim(fighter1, team1, fighter2, team2)
            } 
            else {
                launchFightAnim(fighter2, team2, fighter1, team1,)
            } 
            
            if ((!fighter1.isAlive) || (!fighter2.isAlive)) {
                clearInterval(fight);
                resolve();
            }
            atkCount++;
        }, fightInterval);
    })
}


function launchFightAnim(attacker, teamAttacker, opponent, teamOpponent){
    const attackerTeamNumber = (teamAttacker.id == globalThis.team1.id) ? 1 : 2
    const indexAttacker = teamAttacker.fighters.findIndex(f => f.name == attacker.name)
    const attackerIdSearched = `#team${attackerTeamNumber}Champ${indexAttacker + 1 }`
    const attackerDiv = document.querySelector(attackerIdSearched)
    
    const opponentTeamNumber = (attackerTeamNumber == 1) ? 2 : 1
    const indexOpponent = teamOpponent.fighters.findIndex(f => f.name == opponent.name)
    const opponentIdSearched = `#team${opponentTeamNumber}Champ${indexOpponent + 1}`
    const opponentDiv = document.querySelector(opponentIdSearched);
    
    attacker.attacks(opponent)
    
    // TODO JSP KESKISEPASS avec les anims mais c'est le bazar ...
    // TODO Du coup anim désactiver pour le moment
    // attackAnim(attackerDiv, opponentDiv)
    // TODO Optionnel : lancer les updateUI à un certain moment de l'anim ????
    updateUI(attacker, attackerDiv)
    updateUI(opponent, opponentDiv)

}

function updateUI(champ, elem) {

    const HPSpan = elem.querySelector(".championHP span")
    HPSpan.textContent = champ.hp

    const figure = elem.querySelector("figure")

    // Grey the dead champion
    if(!champ.isAlive) figure.classList.add("dead")

    // Remove divineShield
    const dS = figure.querySelector(".divineShield")
    if(dS && !champ.prot) figure.removeChild(dS)
}

function displayVictoryScreen(winnerTeam) {
    const winner = (winnerTeam.playerId == globalThis.player1.id ) ?  globalThis.player1 :  globalThis.player2

    arena.style.display = " none"
        
    // TODO : Le screen de victoire
    const victoryScreen = document.querySelector("#victory")
    
    const result = document.querySelector("#victoryResults")
    result.innerHTML = `Congratulations ${ winner.name }, you win this fight !!! <br>Here's your diamonds 💎💎💎`
    
    const restartGameBtn = document.querySelector("#restartGame")
    
    victoryScreen.style.display = "block"
    restartGameBtn.addEventListener("click", function(){
        globalThis.player1 = null
        globalThis.player2 = null
        globalThis.team1 = null
        globalThis.team2 = null
        globalThis.champions = null
        location.reload()
    })
    
}

export default createArena;