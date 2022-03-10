import createArena from "../arena/arena.js"
import { baseImgUrl } from "../utils.js"


const createTeam = document.querySelector("#createTeam")
const createTeamWrapper = createTeam.querySelector("#createTeam .wrapper")
const listChampions = createTeamWrapper.querySelector("#listChampions .wrapper")

const composeTeam = createTeamWrapper.querySelector("#composeTeam")
const fullTeam = composeTeam.querySelector(".fullTeam")

const playerNameTitleSpan = createTeamWrapper.querySelector("#playerNameText .playerName")

const championFirst = fullTeam.querySelector("#championFirst")
const championSecond = fullTeam.querySelector("#championSecond")
const championThird = fullTeam.querySelector("#championThird")

const confirmButton = composeTeam.querySelector(".confirmTeam")

const confirmBlock = createTeamWrapper.querySelector("#blockSelection")
const confirmPopin = createTeamWrapper.querySelector(".confirmPopin")
const cancelPopinBtn = confirmPopin.querySelector("#cancelPopinBtn")
const confirmPopinBtn = confirmPopin.querySelector("#confirmPopinBtn")


function createChampionsSelection() { 
    const player = globalThis.currentPlayer;
    
    listChampions.style.display = "flex"
    playerNameTitleSpan.innerHTML = ` ${ player.name } `

    globalThis.champions.forEach((champ) => {
        const iconUrl = champ.iconUrl
        
        let champButton = document.createElement("button")
            champButton.dataset.championName = champ.id

        let champIcon = document.createElement("img")
            champIcon.src = iconUrl
            champIcon.alt = champ.name
            champIcon.title = champ.name

        let champFrame = document.createElement("img")
            champFrame.src = `${baseImgUrl}template/select-frame-border.png`
            champFrame.alt = champ.name
            champFrame.title = champ.name
        
        addClickOnChampion(champ, champButton)
        
        champButton.append(champIcon, champFrame)
        listChampions.append(champButton)
    })

    confirmButton.addEventListener("click", (e) => {
        e.preventDefault()
        confirmBlock.style.display = "block"
        confirmPopin.style.display = "block"
        
        // TODO : blockSelection ne prend pas toute la taille de la fenêtre

        confirmPopinBtn.addEventListener("click", e => {
            e.preventDefault()
            if(globalThis.team2.isReady){
                createTeam.style.display = "none"
                createArena()
            }else {
                globalThis.team1.fighters.forEach((fighters, i) => {
                    removeChampionFromSelection(fullTeam.children[i], fighters, globalThis.team1)
                });
                globalThis.currentPlayer = globalThis.player2
                globalThis.currentTeam = globalThis.team2

                createChampionsSelection(globalThis.player2, globalThis.team2)
                confirmBlock.style.display = "none"
                confirmPopin.style.display = "none"
            }
        })

        cancelPopinBtn.addEventListener("click", e => {
            e.preventDefault()
            confirmBlock.style.display = "none"
            confirmPopin.style.display = "none"
        }) 
    })
}



function addClickOnChampion(champ, iconWrapper) {
    iconWrapper.addEventListener("click", onChampionSelect, false)

    function onChampionSelect(event) {
        event.preventDefault()
        if (selectChampion(champ)) {
            iconWrapper.classList.add("chosen")
            iconWrapper.removeEventListener("click", onChampionSelect)
        }
    }
}

function selectChampion(champ) {
    const team = globalThis.currentTeam;
    let championIndex = team.addAChampion(champ)
    
    let championSelectedDiv
    switch (championIndex) {
        case 0: championSelectedDiv = championFirst; break;
        case 1: championSelectedDiv = championSecond; break;
        case 2: championSelectedDiv = championThird ; break;
        default: championSelectedDiv = -1; break;
    }
    
    if (championSelectedDiv === -1) { return false }

    let figure = document.createElement("figure")

    let icon = document.createElement("img")
        icon.classList.add("avatar")
        icon.src = champ.iconUrl
        icon.alt = champ.name
        icon.title = champ.name
    
    let iconFrame = document.createElement("img")
        iconFrame.classList.add("border")
        iconFrame.src = `${baseImgUrl}template/select-frame-border.png`
        iconFrame.alt = champ.name
        iconFrame.title = champ.name

    figure.append(icon, iconFrame)
    
    const iconSelectedChampion = championSelectedDiv.querySelector(".iconChampion")
    iconSelectedChampion.append(figure)

    const stats = championSelectedDiv.querySelector(".stats")

    const hpDiv = document.createElement("div")
    hpDiv.classList.add("championHP")

    const hpSpan = document.createElement("span")
    
    hpDiv.append(hpSpan)
    hpSpan.textContent = `${champ.hp}`

    
    const atkDiv = document.createElement("div")
    atkDiv.classList.add("championATK")

    const atkSpan = document.createElement("span")
    
    atkDiv.append(atkSpan)
    atkSpan.textContent = `${champ.atk}`

    stats.append(atkDiv, hpDiv);

    
    const removeChampionBtn = document.createElement("button")
    removeChampionBtn.classList.add("removeChampion")
    championSelectedDiv.append(removeChampionBtn)


    addSpeSelection(championSelectedDiv, championIndex)


    checkTeamReady()

    removeChampionBtn.addEventListener("click", onChampionSelectedClick, false)

    function onChampionSelectedClick(event) {
        event.preventDefault()
        team.removeChampion(championIndex)
        checkTeamReady()

        const championSelected = fullTeam.children[championIndex]

        removeChampionFromSelection(championSelected, champ)
    }

    return true;
}


function addSpeSelection(selectedDiv, championIndex) {
    const team = globalThis.currentTeam;

    const selectGems = document.createElement("div")
    selectGems.classList.add("selectStat")

    const agiGem = addSpeIcon(selectGems, championIndex, "agi")
    const strGem = addSpeIcon(selectGems, championIndex, "str")
    const intGem = addSpeIcon(selectGems, championIndex, "int")
    
    const randomNum = Math.floor(Math.random() * 3)
    const randomGem = (randomNum == 0) ? agiGem : (randomNum == 1) ? strGem : intGem
    
    const stat = (randomNum == 0) ? "agi" : (randomNum == 1) ? "str" : "int"
    team.fighters[championIndex].stat = stat
    
    randomGem.classList.add("chosenStat")
    selectedDiv.appendChild(selectGems)

    const mainStat = document.createElement("div")
          mainStat.classList.add("mainStat")

    const mainStatIcon = document.createElement("img")
          mainStatIcon.src = randomGem.src
          mainStatIcon.title = `Main stat is ${stat.toLocaleUpperCase()}.`
          mainStatIcon.alt = `Main stat is ${stat.toLocaleUpperCase()}.`
          mainStat.append(mainStatIcon)

    selectGems.before(mainStat)
}

function addSpeIcon(node, championIndex, stat){
    const team = globalThis.currentTeam;
    const gemButton = document.createElement("button")
    
    const gem = document.createElement("img")
          gem.classList.add("gemSelection")
          gem.src = `${baseImgUrl}template/stat-${stat}.png`
          gem.alt = `Chose ${stat.toLocaleUpperCase()} as main stat.`
    
    gemButton.append(gem);
    node.append(gemButton);
    
    gem.addEventListener("click", () => {

        team.fighters[championIndex].stat = stat
        
        const gems = node.querySelectorAll(".gemSelection")
        
        gems.forEach(g =>  g.classList.remove("chosenStat"))
        gem.classList.add("chosenStat")

        const mainStatIcon = fullTeam.children[championIndex].querySelector(".mainStat img")
        mainStatIcon.src = gem.src
    })

    return gem
}

function checkTeamReady(){  confirmButton.disabled = (!globalThis.currentTeam.isReady) }

function removeChampionFromSelection(championSelectedDiv, champ){
    const champButton = document.querySelector(`#listChampions>.wrapper>button[data-champion-name='${champ.id}']`)
    champButton.classList.remove("chosen")        

    addClickOnChampion(champ, champButton)

    const selectStat = championSelectedDiv.querySelector(".selectStat")
    const championIcon = championSelectedDiv.querySelector(".iconChampion")
    const figure = championIcon.querySelector("figure")
    const stats = championSelectedDiv.querySelector(".stats")
    const hpDiv = championSelectedDiv.querySelector(".championHP")
    const atkDiv = championSelectedDiv.querySelector(".championATK")
        
    const removeChampionBtn = championSelectedDiv.querySelector(".removeChampion")
    
    stats.removeChild(hpDiv);
    stats.removeChild(atkDiv);

    championSelectedDiv.removeChild(removeChampionBtn); 
    championSelectedDiv.removeChild(championSelectedDiv.querySelector(".mainStat"))
    championSelectedDiv.removeChild(selectStat)
    championIcon.removeChild(figure)
}

export default createChampionsSelection