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
    element: document.querySelector("#spin-animation"),
    duration: 1,
    minigames: getMinigames(),
    gameName: "",
    gameDescription: "",
    gameNameElement: document.querySelector("#game-name"),
    gameDescriptionElement: document.querySelector("#game-description"),
    isSpinning: false
}
//----
minigameButtons.elements.forEach(addClickCallback);

function addClickCallback(button,index) {
    button.addEventListener("pointerdown",event => handleButtonPress(event,minigameButtons,index),passive=true);
}

function handleButtonPress(event,minigameButtons,index) {
    if (spinner.isSpinning) {return};
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
spinner.element.addEventListener("animationend", (event) => spinnerFinish(event,spinner))

function getMinigames() {
    const minigameNames = [
        "all-vs-all",
        "one-vs-five",
        "two-teams",
        "three-teams"
    ]

    return minigameNames.map(loadMinigames)
}

function loadMinigames(name) {
    const filename = "./data/" + name + "-minigames.txt";
    // fetch(filename)
       // .then(response => response.text())
        //.then(text => console.log(text))
        //.catch(error => console.error("Error fetching file:", error));
    
        const text = ` 
            game-1, ${name} -description-1;
            game-2, ${name} -description-2;
            game-3, ${name} -description-3;
            game-4, ${name} -description-4;
            game-5, ${name} -description-5;
            game-6, ${name} -description-6;
            game-7, ${name} -description-7;
            game-8, ${name} -description-8;
            game-9, ${name} -description-9;
            game-10, ${name} -description-10
        `
        minigameData = text.replace(/(\r\n|\r|\n| )/g,"").split(";")
            .map(game => game.split(","));
    
    return minigameData
}

function spinWheel(spinner,index) {
    const minigames = spinner.minigames[index];
    if (minigames.length == 0) {return};
    const gameIndex = Math.floor(Math.random() * minigames.length);
    const [gameName,gameDescription] = minigames.splice(gameIndex, 1)[0];

    spinner.gameName = gameName;
    spinner.gameDescription = gameDescription;

    startSpinning(spinner)
}

function startSpinning(spinner) {
    spinner.isSpinning = true;
    spinner.element.style.opacity = 1;
    spinner.element.style.animationPlayState = "running";

}

function spinnerFinish(event,spinner){
    spinner.gameNameElement.innerHTML = spinner.gameName;
    spinner.gameDescriptionElement.innerHTML = spinner.gameDescription;
     spinner.element.style.animationPlayState = "paused";
     spinner.element.style.opacity = 0;
     spinner.isSpinning = false;
    
    spinner.element.style.animation = 'none'
    void spinner.element.offsetWidth;
    spinner.element.style.animation = null; 

}