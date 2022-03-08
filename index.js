import Player from "./class/Player.js"
import Champion from "./class/Champion.js"
import Team from "./class/Team.js"
import teamFight from "./teamFight.js"

const app = document.querySelector('#app')
let fileUrl = null

const champions = []
await axios.get("/champions.json", {
    responsType: "json"
}).then(res => {
    res.data.champions.forEach(champion => {
        champions.push(new Champion(champion, null));
    })
})

champions.sort((a, b) => a.name.localeCompare(b.name));

let player1 = new Player("Player1");
const team1 = new Team(player1.id);

team1.first = champions[0];
team1.second = champions[13];
team1.third = champions[14];


let player2 = new Player("Player2");
const team2 = new Team(player2.id);

team2.first = champions[5];
team2.second = champions[48];
team2.third = champions[35];

// let winnerTeam = await teamFight(team1, team2)
let winnerPlayer = (winnerTeam.playerId == player1.id) ? player1 : player2
console.log(`${winnerPlayer.name} wins the match`);


const startGameSection = document.querySelector("#startGameSection");
const startGameButton = startGameSection.querySelector("#startGame");
const createPlayerWrapper = startGameSection.querySelector("#createPlayer");
const createPlayerForm = createPlayerWrapper.querySelector("form");
const createPlayerName = createPlayerForm.querySelector("#playerName");
const createPlayerTitle = document.createElement("h2");

const selectChampions = startGameSection.querySelector("#selectChampions");
const selectChampionsTitleSpan = startGameSection.querySelector("#selectChampionsTitleSpan");
const championsPool = startGameSection.querySelector("#championsPool");

const firstSelected = startGameSection.querySelector("#firstSelected");
const secondSelected = startGameSection.querySelector("#secondSelected");
const thirdSelected = startGameSection.querySelector("#thirdSelected");

startGameButton.addEventListener("click", () => {
    startGameButton.style.display = "none";
    createPlayer.style.display = "block";
    
    createPlayerTitle.innerHTML = "Create player 1";
    
    createPlayerWrapper.prepend(createPlayerTitle);
})


// let player1 = new Player("Player1");
// let player2 = new Player("Player2");
// const team1 = new Team(player1.id);

// let player1 = null;
// let player2 = null;
createPlayer.style.display = "none";

await showChampionsSelection();

// createPlayerForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const name = createPlayerName.value;
//     if(!player1){
//         player1 = new Player(name);
        
//         createPlayerTitle.innerHTML = "Create player 2";
//         createPlayerName.value = "";

//     }else  {
//         player2 = new Player(name);
//         createPlayerName.value = "";
//         createPlayer.style.display = "none";

//         await showChampionsSelection();
//     }
    
// });

// async function showChampionsSelection(){
//     selectChampions.style.display = "block";
//     selectChampionsTitleSpan.innerHTML = `${ player1.name } : `;

//     await champions.forEach(async (champ) => {
//         let iconWrapper = document.createElement("div");
//         iconWrapper.classList.add("championSelectionIconWrapper");

        
//         let icon = document.createElement("img");
//         icon.classList.add("championSelectionIcon");
        
//         const iconUrl = await champ.getIconUrl();
//         icon.src = iconUrl 
//         icon.alt = champ.name;

//         iconWrapper.addEventListener("click", () => {
//             addAChampion(champ, iconUrl)
//             iconWrapper.classList.add("chosen"); 
//         });
//         icon.title = champ.name;
        
//         iconWrapper.append(icon);
//         championsPool.append(iconWrapper);

//     })
// }

// function addAChampion(champ, iconUrl) {
//     let championIndex = team1.addAChampion(champ);
//     console.log(championIndex);
    
//     let icon = document.createElement("img");
//     icon.classList.add("championSelectedIcon");
//     icon.src = iconUrl;

//     switch (championIndex) {
//         case 0:
//             firstSelected.append(icon)
//             break;
//         case 1:
//             secondSelected.append(icon)
//             break;
//         case 2:
//             thirdSelected.append(icon)
//             break;
    
//         default:
//             break;
//     }
// }