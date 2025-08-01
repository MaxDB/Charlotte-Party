const playerElements = document.querySelectorAll(".player");
const players = Array.from(playerElements).map(formatPlayers);

//format player data
function formatPlayers(playerElement,index) {
    const coinCounter = playerElement.querySelector(".coin-container");
    const coins = {
        value: 0,
        valueElement: coinCounter.querySelector(".value"),
        changeElement: coinCounter.querySelector(".increment"),
        arrows: coinCounter.querySelectorAll(".arrow"),
        type: "coin"
    }

    const starCounter = playerElement.querySelector(".star-container");
    const stars = {
        value: 0,
        valueElement: starCounter.querySelector(".value"),
        changeElement: starCounter.querySelector(".increment"),
        arrows: starCounter.querySelectorAll(".arrow"),
        type: "star"
    }
    
    playerElement.style.gridColumn = "2/3";

    return {
        element: playerElement,
        playerID: index,
        position: index + 1,
        coins: coins,
        stars: stars
    }

}

//add callbacks for changing coin and star values

players.forEach(addIncCallback);

function addIncCallback(player) {
    function addResourceListeners(type) {
        const typeChange = type.changeElement;
        typeChange.addEventListener("pointermove",(event) => handleHover(event,type),passive=true);
        typeChange.addEventListener("pointerout",(event) => handlePointerOut(event,type),passive=true);
        typeChange.addEventListener("pointerdown",(event) => handlePointerDown(event,type),passive=true);
        typeChange.addEventListener("contextmenu", function(event){event.preventDefault();},passive=false);
    }
    addResourceListeners(player.coins);
    addResourceListeners(player.stars);

    player.element.addEventListener("pointerout",(event) => evaluateLeaderboard(event,player.playerID,players),passive="true")
}

function handleHover(event,type) {
    const incrementer = type.changeElement;
    const [topArrow,bottomArrow] = type.arrows;
    

    const elementBox = incrementer.getBoundingClientRect();    
    const heightFraction = (event.clientY-elementBox.y)/elementBox.height;
    if (heightFraction <= 0.4){
        topArrow.style.visibility = "visible";
        bottomArrow.style.visibility = "hidden";
    } else if (heightFraction >= 0.6){
        topArrow.style.visibility = "hidden";
        bottomArrow.style.visibility = "visible";
    } else {
        topArrow.style.visibility = "hidden";
        bottomArrow.style.visibility = "hidden";
    }

}

function handlePointerOut(event,type){
    const [topArrow,bottomArrow] = type.arrows;
    topArrow.style.visibility = "hidden";
    bottomArrow.style.visibility = "hidden";
}


function handlePointerDown(event,type) {
    const [topArrow,bottomArrow] = type.arrows;
    let value = parseInt(type.valueElement.innerHTML);

    let inc = 0;
    if (event.button === 2) {inc = 5}
    else {inc = 1}
    
    if (topArrow.style.visibility === "visible") {
        inc *= 1;
    } else if (bottomArrow.style.visibility === "visible") {
        inc *= -1; 
    } else {return}
    value += inc;
    type.valueElement.innerHTML = value.toString();
    type.value = value;
    if (inc > 0){
        if (type.type==="star") {
            const audio = document.querySelector("#star-audio");
            audio.play();
        } else if (type.type ==="coin") {
            const audio = document.querySelector("#coin-audio");
            audio.play();
        }
    }

    if (inc < 0){
        if (type.type==="star"){
            const audioIndex = Math.floor(Math.random() * 3);
            let audioID;
            if (audioIndex === 0) {
                audioID = "#lose-one-audio";
            } else if (audioIndex === 1){
                audioID = "#lose-two-audio";
            } else if (audioIndex === 2){
                audioID = "#lose-three-audio";
            }
            const audio = document.querySelector(audioID);
            audio.play();
            
        }
    }
}

function evaluateLeaderboard(event,playerID,players) {
    // only check player that the pointer has just left
    const player = players[playerID];
    const playerDims = player.element.getBoundingClientRect();
    const [pointerX,pointerY] = [event.clientX,event.clientY];

    if (pointerX > playerDims.x && pointerX < (playerDims.x + playerDims.width)){
        if (pointerY > playerDims.y && pointerY < (playerDims.y + playerDims.height)){
            return
        }
    }

    let abovePosition = player.position - 1;
    while (abovePosition >= 1) {
        const abovePlayer = getPlayerByPosition(players,abovePosition);
        if (comparePlayers(player,abovePlayer)){
            swapPosition(player,abovePlayer);
            abovePosition = player.position - 1;
        } else {break}
    }

    let belowPosition = player.position + 1;
    while (belowPosition <= players.length) {
        const belowPlayer = getPlayerByPosition(players,belowPosition);
        if (comparePlayers(belowPlayer,player)){
            swapPosition(belowPlayer,player);
            belowPosition = player.position + 1;
        } else {break}
    }
    
  
}

function getPlayerByPosition(players,position) {
    return players.filter(player => player.position === position)[0]
}

function comparePlayers(p1,p2) {
    if (p1.stars.value > p2.stars.value) {
        return true 
     } else if (p1.stars.value === p2.stars.value){
         if (p1.coins.value > p2.coins.value){
            return true
         }
     }
     return false
}



function swapPosition(p1,p2) {
    [p1.position,p2.position] = [p2.position,p1.position];
    p1.element.style.gridRow = `${p1.position}/${p1.position+1}`;
    p2.element.style.gridRow = `${p2.position}/${p2.position+1}`;
}