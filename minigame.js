const minigameButtons = {
    elements: document.querySelectorAll(".minigame-button"),
    description: [
        "all vs all",
        "1 vs 3",
        "two teams"
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
        "two-teams"
    ]

    return minigameNames.map(loadMinigames)
}

function loadMinigames(name) {
    // const filename = "./data/" + name + "-minigames.txt";
    // fetch(filename)
       // .then(response => response.text())
        //.then(text => console.log(text))
        //.catch(error => console.error("Error fetching file:", error));
        let text;
        if (name==="all-vs-all"){
            text = `
            Camera ready,Can you find this photo in Bowser F.'s domain;
            Shy Guy Says, Follow the flags or DIE;
            Ass to grass, How Joe can you go!? Stand up fully COMMA plant ass on grass COMMA repeat to win!;
            Xray pay day, Memorise what's on the cards and don't grab the bomb!;
            Bowser big blast, Don't get blasted!;
            Stones Joe, Toss your stone win a prize! Get your rocks in prize zones to win;
            Prime Cut, Cut the biscuit perfectly!;
            Sticky hands showdown, Grab the cards you wont - don't get shot;
            Wario Whacky Wager, Bet on if you'll get the trivia question right;
            Dice & Dash, Roll all of the symbols to win (bomb NOT EQUAL shot);
            Foo me once, Memorise the path or DIE;
            Nut cases, Find the most NUTS;
            Don't look, After the count COMMA don't face your face in the direction of the host!;
            Domination, Tap fast? Yeah COMMA I do that. Tap phone screen most to win;
            Memory sketch match, Recreate Charlotte's WACKY drawing;
            Sticky Slap Spinout, Spin around for 5 seconds COMMA grab the win in the shortest time;
            Honey Comb Havoc, You already know;
            Noise Mimic, Host votes on accuracy;
            Max I Don't Drink & Drive, Mario race. Finish your drink before the line;
            Aaron Fingers, Its the drinking game fingers;
            Dexters Cheeky Smile, Higher or lower but with SHOTS;
            Charlotte F(ish), Fish Fillet! One flips 4 cups COMMA rest work sequentually flip 4 between!;
            Russian Roulette, Bunch o'shots COMMA but only one is a blast!;
            Max at the races, Horse race! Place your bets! Roll up roll up! Do the bet then do card flip after bet cards are horses and suits are for the winner of the card game!
            `;
        } else if (name==="one-vs-five"){
            text = `
            Hide & seek, Put tokens under cups and HIDE or face penalty;
            Bowser Bogus Bingo, Don't get a bingo;
            Ass grass Redux, One person pressups COMMA rest ass to grass! Higher total wins coins
            `;
        } else if (name==="two-teams"){
            text = `
            Tricky Tum Table, To tum or not to tum: get the coins not the bombs as a team;
            Donkey Conga, Let's play Taiko;
            Regular Arm Wrestle, Do the thing;
            Slappy Go-round, Tortilla but stickyhands;
            Mushroom Medic, Wearing noise cancelling headphones read your lips;
            Don't make me laugh, The game;
            Cake Factory, In pairs drink the drink then flip then drink + flip!;
            Straw by Straw, Move water from source to sink using only straws;
            Rally Race, Blind folded racer! Sighted passenger? Who wins?;
            Handcar Havoc, Decant drink into shot glasses SLAM shot. Race to the bottom!;
            Imagery Recreation to the MAX, Blindfolded in pairs recreate the image
            `;
        } else {
            text = ` 
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
        };
        minigameData = text.replace(/(\r\n|\r|\n)/g,"").split(";")
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