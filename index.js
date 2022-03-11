import getChampions from "./src/getChampions.js"
import addPlayerCreationForm from "./src/gameStart/playerCreation.js"
import createArena from "./src/arena/arena.js";

globalThis.champions = await getChampions();

await addPlayerCreationForm()

document.addEventListener("createArenaEvent", createArenaCB,  false)

function createArenaCB() {
    createArena()
    document.removeEventListener("createArenaEvent", createArenaCB)
}