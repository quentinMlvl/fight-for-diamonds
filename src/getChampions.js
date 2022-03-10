import Champion from "./class/Champion.js"

async function getChampions(){
    const champions = []
    await axios.get("/champions.json", {
        responsType: "json"
    }).then(res => {
        res.data.champions.forEach(champion => {
            champions.push(new Champion(champion, null));
        })
    })

    champions.sort((a, b) => a.name.localeCompare(b.name));

    return champions;
}

export default getChampions;