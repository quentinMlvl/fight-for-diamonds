/* ***  *** */
const splashScreen = document.querySelector('#splashScreen')
document.querySelector('#startGame').addEventListener('click', () => {
    const enterGame = gsap.timeline()
          enterGame.to(splashScreen, {opacity: 0, scale: 3, ease: 'back'})
                   .to(splashScreen, {display: 'none', zIndex: -1})
                   .to('header', {opacity: 1})
                   .to('#createPlayers', {display: 'block', opacity: 0, duration: 0, scale: 2})
                   .to('#createPlayers', {opacity: 1, scale: 1, ease: 'back'})

})

/* ***  *** */
function attackAnim(attack, target){
    
    const hitImg = attack.querySelector('.hit')
    const attackPos = attack.getBoundingClientRect();
    const targetPos = target.getBoundingClientRect();
    let topPosition = 0
    let lftPosition = 0

    attack.classList.add('attacker')
    
    // Compute the left position to go
    if (attackPos.x >= targetPos.x) {
        lftPosition = (targetPos.x - attackPos.x + (attackPos.width / 2))
    } else {
        lftPosition = -(attackPos.x - targetPos.x + (attackPos.width / 2))
    }

    // Compute the top position to go
    if (attackPos.y === targetPos.y) {
        topPosition = 0
    } else if (attackPos.y > targetPos.y) {
        topPosition = (targetPos.y - attackPos.y + (attackPos.height / 2))
    } else {
        topPosition = -(attackPos.y - targetPos.y + (attackPos.height / 2))
    }

    // The proper animation
    const attackAnim = gsap.timeline({yoyo: true, repeat: 1, onComplete: resetAttacker, onCompleteParams: [attack]})
          attackAnim.to(attack, {x: lftPosition, y: topPosition, scale: 1.25, ease: 'back'})
                    .to(hitImg, {opacity: 1}, '< -= .5')
                    .to(hitImg, {opacity: 0, duration: 0}, '< -= .5')
 
}

function resetAttacker(attacker){
    attacker.classList.remove('attacker')
}

const versusAnim = gsap.timeline().pause()
      versusAnim.to('#ready4Battle', {display: 'block', duration: 0})
                .to('#animPlayerName1', {opacity: 1, top: '30%', ease: 'back'})
                .to('#animPlayerVersus', {opacity: 1, scale: 1.5, ease: 'ease-out'})
                .to('#animPlayerVersus', {opacity: 1, scale: .5, ease: 'linear'})
                .to('#animPlayerName2', {opacity: 1, bottom: '30%', ease: 'back'})
                .to('#animPlayerName1', {left: '200%', top: '30%', ease: 'back', duration: 1}, '<+=3')
                .to('#animPlayerName2', {right: '200%', top: '30%', ease: 'back', duration: 1}, '<')
                .to('#animPlayerVersus', {opacity: 0, scale: 2, ease: 'back'}, '<+=.2')
                .to('#createTeam', {display: 'block', duration: .1})

const winnerAnim = gsap.timeline().pause()
      winnerAnim.to('#winnerContent', {opacity: 1, scale: 1, ease: 'back'})
                .to('#winnerTitle', {opacity: 1, top: '-60px', ease: 'back'})
                .to('#winnerBoard', {opacity: 1, scale: 2, ease: 'back'})
                .to('#winnerBoard', {scale: 1, ease: 'back'})
                .to('#winnerChest', {opacity: 1, rotate: '1080deg', ease: 'back'})
                .to('#winnerName',  {opacity: 1, scale: 2, ease: 'linear'})
                .to('#winnerName',  {scale: 1, ease: 'back'})
                .to('#restartGame',  {opacity: 1}, '<+=3')