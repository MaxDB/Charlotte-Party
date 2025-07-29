const minigameButtons = {
    elements: document.querySelectorAll(".minigame-button"),
    description: [
        "all vs all",
        "1 vs 5",
        "two teams",
        "three teams"
    ],
    currentIndex: 0,
    currentType: document.querySelector("#minigame-type"),
    rewards: document.querySelectorAll(".reward")
}

const spinner = {
    elements: document.querySelectorAll("#spinner"),
    type: "",
    duration: 1,
    minigames: getMinigames()
}


//----
minigameButtons.elements.forEach(addClickCallback);

function addClickCallback(button,index) {
    button.addEventListener("pointerdown",event => handlePointerDown(event,minigameButtons,index),passive=true);
}

function handlePointerDown(event,minigameButtons,index) {
    minigameButtons.currentType.innerHTML = minigameButtons.description[index];
    minigameButtons.currentIndex = index; 
    setReward(minigameButtons.rewards,index);
    spinWheel(spinner,index)
}

function setReward(rewards,index) {
    rewards.forEach(reward => reward.style.visibility = "visible");
    
    let numRewards;
    switch (index){
        case 0: numRewards = 5;break;
        case 1: numRewards = 1;break;
        case 2: numRewards = 1;break;
        case 3: numRewards = 2;break;
    }

    const hiddenRewards = Array.from(rewards).slice(numRewards);
    hiddenRewards.forEach(reward => reward.style.visibility = "hidden");
}
//---
function getMinigames() {
    let minigameData;
    fetch('./data/all-vs-all-minigames.txt')
        .then(response => response.text())
        .then(text => minigameData = text.split(","))
        .catch(error => console.error("Error fetching file:", error));

    if (minigameData === undefined){
        
    }
}


function spinWheel(spinner,index) {

}