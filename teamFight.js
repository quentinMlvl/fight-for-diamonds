

function toss(team1, team2) {
    const randomNbr = (Math.floor(Math.random() * 100) + 1);
    return (randomNbr % 2 == 0) ? team2 : team1;
}


async function fight1v1(fighter1, fighter2) {
    return await new Promise(resolve => {
        let atkCount = 0;
        const fight = setInterval(function () {
            if (atkCount % 2 == 0) fighter1.attacks(fighter2);
            else fighter2.attacks(fighter1);
            
            if ((!fighter1.isAlive) || (!fighter2.isAlive)) {
                console.log("clear");
                clearInterval(fight);
                resolve();
            }
            atkCount++;
        }, 200);
    })
}

async function teamFight(team1, team2) {
    if (team1.fighters.length == 3 && team2.fighters.length == 3) {
        let firstTeamFightersCount = 0;
        let secondTeamFightersCount = 0;

        do {
            const firstTeam = toss(team1, team2);
            const secondTeam = (firstTeam.id == team2.id) ? team1 : team2;

            let currentFighter1 = firstTeam.fighters[firstTeamFightersCount];
            let currentFighter2 = secondTeam.fighters[secondTeamFightersCount];

            await fight1v1(currentFighter1, currentFighter2);
            if (currentFighter1.isAlive) {
                console.log(`${currentFighter1.name} wins`);
                secondTeamFightersCount++;
            } else {
                console.log(`${currentFighter2.name} wins`);
                firstTeamFightersCount++;
            }
            console.table(team1.fighters);
            console.table(team2.fighters);
        } while (team1.allFightersNotDead && team2.allFightersNotDead)
        return (team1.allFightersNotDead) ? team1 : team2;


    } else console.log("TEAMS NOT FULL");

}

export default teamFight;