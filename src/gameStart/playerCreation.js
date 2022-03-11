import Player from "../class/Player.js"
import Team from "../class/Team.js"
import createChampionsSelection from "./championSelection.js"

const startGameSection = document.querySelector("#splashScreen")
const startGameButton = startGameSection.querySelector("#startGame")

const createPlayerSection = document.querySelector("#createPlayers")
const createPlayer = createPlayerSection.querySelector(".wrapper")

const createPlayerForm = createPlayerSection.querySelector("#formPlayer")
const createPlayerName = createPlayerForm.querySelector("#playerName")
const createPlayerTitle = createPlayerForm.querySelector("label ")

const spanPlayerNumber = createPlayerTitle.querySelector(".playerNumber")

const playerName1 = document.querySelector("#animPlayerName1")
const playerName2 = document.querySelector("#animPlayerName2")
const animPlayerVersus = document.querySelector("#animPlayerVersus img")

async function addPlayerCreationForm(){
    startGameButton.addEventListener("click", () => {
        startGameButton.style.display = "none"
        createPlayer.style.display = "block"
        spanPlayerNumber.innerHTML = "1"
    }, false)
    
    const form = createPlayerForm.querySelector("form");
    await form.addEventListener("submit",async (e) => {
        e.preventDefault()
    
        const name = createPlayerName.value
        
        if (!globalThis.player1?.name){
            globalThis.player1 = new Player(name)
            globalThis.team1 = new Team(globalThis.player1.id)
            spanPlayerNumber.innerHTML = "2"
            createPlayerName.value = ""
        } else {
            globalThis.player2 = new Player(name)
            globalThis.team2= new Team(globalThis.player2.id)

            createPlayerName.value = ""
    
            globalThis.currentPlayer = globalThis.player1
            globalThis.currentTeam =  globalThis.team1

            playerName1.textContent = globalThis.player1.name
            playerName2.textContent = globalThis.player2.name

            animPlayerVersus.alt = `${globalThis.player1.name} VS. ${globalThis.player2.name}`
            animPlayerVersus.title = `${globalThis.player1.name} VS. ${globalThis.player2.name}`


            createPlayerForm.style.display = 'none'

                
            document.querySelector('#ready4Battle').style.display = 'block'
            await versusAnim.play()
            createPlayerSection.style.display = "none"
            
            await createChampionsSelection()
        }
    }, false)
}

export default addPlayerCreationForm;
