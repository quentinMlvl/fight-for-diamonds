import Player from "./src/class/Player.js"
import Team from "./src/class/Team.js"

import getChampions from "./src/getChampions.js"
import addPlayerCreationForm from "./src/gameStart/playerCreation.js"

globalThis.champions = await getChampions();

/* Create PLAYERS AND TEAMS IN DEV
globalThis.player1 = new Player("Player1");
globalThis.team1 = new Team(globalThis.player1.id);

globalThis.team1.first = champions[2];
globalThis.team1.first.stat = "str"
globalThis.team1.second = champions[14];
globalThis.team1.second.stat = "agi"
globalThis.team1.third = champions[16];
globalThis.team1.third.stat = "int"


globalThis.player2 = new Player("Player2");
globalThis.team2 = new Team(globalThis.player2.id);

globalThis.team2.first = champions[5];
globalThis.team2.first.stat = "agi"

globalThis.team2.second = champions[48];
globalThis.team2.second.stat = "str"

globalThis.team2.third = champions[35];
globalThis.team2.third.stat = "str"
*/

await addPlayerCreationForm();