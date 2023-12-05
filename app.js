let textElement;
let optionButtonsElement;
let textNodes;
let itemStates;

class Character {
  constructor(name, health, attackPower) {
      this.name = name;
      this.health = health;
      this.attackPower = attackPower;
      this.inventory = [];
      this.location = null;
  }
  
takeDamage(damage) {
      this.health -= damage;
      if (this.health < 0) {
          this.health = 0;
      }
  }
  useHealingItem(amount) {
    this.health += amount;
    if (this.health > 200) {
      this.health = 200;
    }
  }
}
//List of all Characters
const gideonTheKnight = new Character("Gideon", 200, 50)
const evilArchduke = new Character("Archduke", 200, 50)
const prisonGuard = new Character ("Guard", 75, 20)
const wolves =  new Character ("Wolves", 200, 30)
const hurtWolves = new Character("Hurt Wolves", 170, 30)

const characters = [
  gideonTheKnight,
  evilArchduke,
  prisonGuard,
  wolves
]

class Item {
  constructor(name, type, value) {
    this.name = name;
    this.type = type; // e.g., "weapon", "healing", "quest"
    this.value = value;                     
  }
}
//List of all items
const guardSword = new Item("Chipped Sword", "weapon", 15);      
const gideonSword = new Item("Gideon's Sword", "weapon", 45);
const guardArmor = new Item("Leather Armor", "Armor", 15);
const gideonArmor = new Item("Gold Armor", "Armor", 50);
const healthPotion = new Item ("Vial of Health", "healing", 25);
let breadRoll = new Item("Bread Roll", "healing", 10);
const halfBreadRoll = new Item("Half Bread Roll", "healing", 5);
const lockPick = new Item("Lock Pick", "Key Item", 0);
const smallRock = new Item("Small Rock", "Key Item", 0);

const items = [
    guardSword,      
    gideonSword,
    guardArmor,
    gideonArmor,
    healthPotion,
    breadRoll,
    halfBreadRoll,
    lockPick,
    smallRock
];
//All states of Item that change when the user picks them up/interacts with them
let state = {
  lockPick: false,
  smallRock: false,
  smallRockDropped: false,
  healthPotion: false,
  breadRoll: false,
  halfBreadRoll: false,
  guardDead: false,
  gideonDead: false,
  wolvesDead: false,
  archdukeDead: false,
  lockPickKept: false,
  triedGate: false,
  triedClimbing: false,
  lockPickBroken: false,
  gideonSword: false,
  gideonArmor: false,
  guardArmor: false,
  guardSword: false,



};

class Location {
  constructor(name, description, imageSrc) {
    this.name = name;
    this.description = description;
    this.imageSrc = imageSrc;
    this.characters = [];
    this.items = [];
    this.connectedLocations = [];
  }

move(newLocation) {
  if (this.connectedLocations.includes(newLocation)) {
    currentLocation = newLocation;
}
}
}
// List of all locations and their discriptions that get fed into the HTML page
const castle = new Location("Castle", "The Dungeons: A dark, gloomy maze of paths.", "/images/Dark Dungeon.jpg");
const courtyard = new Location("Castle Courtyard", "Courtyard: An empty enclosed green space.", "/images/Castle Courtyard.jpg");
const forest = new Location("Forest", "Forest: An eerily quiet and forboding forest of large trees.", "/images/Dark Forest.jpg");
const meadow = new Location("Meadow", "Meadow: The meadow is fragrant and brightly lit", "/images/Meadow.jpg");
const plateau = new Location("Plateau", "Plateau: Bright green grass spreads as far as the eye can see", "/images/Grassy Plateau.jpg");

const locations = [castle, courtyard, forest, meadow, plateau];

castle.connectedLocations.push(courtyard);
courtyard.connectedLocations.push(castle);
courtyard.connectedLocations.push(forest);
courtyard.connectedLocations.push(meadow);
meadow.connectedLocations.push(forest);
forest.connectedLocations.push(plateau);

let currentLocation = castle;

// How the images and descriptions get inserted into the HTML page
document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;
  

let option;

//Event Listener for when the page is loaded, all below will immediately load
document.addEventListener("DOMContentLoaded", function () {

const log1 = document.getElementById("log1");
const log2 = document.getElementById("log2"); 

const healthElement = document.getElementById("health");
healthElement.textContent = `Health: ${mainCharacter.health}`;

const attackPowerElement = document.getElementById("attackPower");
attackPowerElement.textContent = `Attack Power: ${mainCharacter.attackPower}`;



log1.innerHTML = "";
log2.innerHTML = "";

textElement = document.getElementById("storyText");
optionButtonsElement = document.getElementById("option-buttons");

startGame();
 
});



let player1;
let player2;
// Alerts that ask for users name and title and stores them 
const mainCharacterName = prompt("Please Enter your name:");
if (mainCharacterName !== null && mainCharacterName.trim() !== ""){
    mainCharacter = new Character(mainCharacterName, 75, 20);
    localStorage.setItem("mainCharacter", mainCharacterName);
}
else {
    alert("You don't have a name? Even a ghost has a name. . . \nIf you do, please refresh this page and enter one.")
}

const mainCharacterTitle = prompt("Are you a Queen or a King? \nPress cancel if you'd prefer to be neither.");
if (mainCharacterTitle === "Queen" || "King") {
    alert("Welcome, " + mainCharacterTitle + " " + mainCharacter.name + ". You're the ruler of these lands and have been captured by the evil Archduke! \nPlease select 'OK' and continue the story. \nGood luck.")
}
else if (mainCharacterTitle == null && mainCharacterTitle.trim() == ""){
    alert("Welcome, " + mainCharacter.name + ". You're the ruler of these lands and have been captured by the evil Archduke! \nPlease select 'OK' and continue the story. \nGood luck.")
    localStorage.setItem("mainCharacter", mainCharacter.name);
}
else {
    alert("Welcome, " + mainCharacter.name + ". You're the ruler of these lands and have been captured by the evil Archduke! \nPlease select 'OK' and continue the story. \nGood luck.")
}

//How the maincharacter name gets loaded to the HTML page 
const mainCharacterNameElement = document.getElementById("mainCharacterName");
mainCharacterNameElement.textContent = `${mainCharacter.name}'s Stats:`;


function startGame(){
    
    const storedCharacterName = localStorage.getItem("mainCharacter");
    if (storedCharacterName) {
        mainCharacter.name = storedCharacterName;
    }
    mainCharacter.health = 75;
    mainCharacter.attackPower = 20;
    prisonGuard.health = 75;
    gideonTheKnight.health = 200;
    wolves.health = 200;
    hurtWolves.health = 170;
    evilArchduke.health = 200;

    let currentLocation = castle;
    document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;
    
    const healthElement = document.getElementById("health");
    healthElement.textContent = `Health: ${mainCharacter.health}`;
    const attackPowerElement = document.getElementById("attackPower");
        attackPowerElement.textContent = `Attack Power: ${mainCharacter.attackPower}`;
    window.onload = showTextNode(0.5);

    

     state = {
        lockPick: false,
        smallRock: false,
        smallRockDropped: false,
        healthPotion: false,
        breadRoll: false,
        halfBreadRoll: false,
        guardDead: false,
        gideonDead: false,
        wolvesDead: false,
        archdukeDead: false,
        lockPickKept: false,
        triedGate: false,
        triedClimbing: false,
        lockPickBroken: false,
        gideonSword: false,
        gideonArmor: false,
        guardArmor: false,
        guardSword: false,



    };
    
    
    viewInventory();
    showTextNode(0.5);
}

// Below code is how inventory is generated into the HTML element based on the states of the item. There is also a toggle visibility attached to an HTML button
function viewInventory() {
  const inventoryElement = document.getElementById("currentInventory");
  inventoryElement.style.display = (inventoryElement.style.display === "none") ? "block" : "none";

  if (inventoryElement.style.display === "block") {
  inventoryElement.innerHTML = "<ul>";

  
  for (let itemName in state) {
    if (state[itemName] === true && itemName === "lockPick") {
      const listItem = document.createElement("li");
      listItem.textContent = "Lock Pick";
      inventoryElement.appendChild(listItem);
    }
    if (state[itemName] === true && itemName === "smallRock") {
      const listItem = document.createElement("li");
      listItem.textContent = "Small Rock";
      inventoryElement.appendChild(listItem);
    }
    if (state[itemName] === true && itemName === "healthPotion") {
      const listItem = document.createElement("li");
      listItem.textContent = "Used Health Potion";
      inventoryElement.appendChild(listItem);
    }
    if (state[itemName] === true && itemName === "guardArmor") {
      const listItem = document.createElement("li");
      listItem.textContent = "Leather Armor";
      inventoryElement.appendChild(listItem);
    }
    if (state[itemName] === true && itemName === "gideonArmor") {
      const listItem = document.createElement("li");
      listItem.textContent = "Gold Armor";
      inventoryElement.appendChild(listItem);
    }
    if (state[itemName] === true && itemName === "gideonSword") {
      const listItem = document.createElement("li");
      listItem.textContent = "Gideon's Sword";
      inventoryElement.appendChild(listItem);
    }
    if (state[itemName] === true && itemName === "guardSword") {
      const listItem = document.createElement("li");
      listItem.textContent = "Dulled Sword";
      inventoryElement.appendChild(listItem);
    }
    if (state[itemName] === true && itemName === "breadRoll") {
      const listItem = document.createElement("li");
      listItem.textContent = "Bread crumbs";
      inventoryElement.appendChild(listItem);
    }
    
  }

  inventoryElement.innerHTML += "</ul>"; // Close the unordered list
}
}
// Wait for the document to be ready
document.addEventListener("DOMContentLoaded", function () {
document.getElementById("toggleInventoryBtn").addEventListener("click", viewInventory);
});

//Function for random dice rolls which is used in the below battle function 
function getRandomDiceRoll() {
  return Math.floor(Math.random() * 10) + 1;
}
//This rotates who goes first in the turn by random dice roll
function determineFirstPlayer(player1, player2) {
  return (getRandomDiceRoll() <= 5 ? player1 : player2);
}

//Code for battle function that calculates damage, remaining health, and who wins and pushes the text along based on the outcome. All is displayed into an HTML element 
function battle(player1, player2, logElement1, logElement2, option) {
  // Determine the first player
  const firstPlayer = determineFirstPlayer(player1, player2);
  const secondPlayer = (firstPlayer === player1 ? player2 : player1);


 let battleResult;

  while (player1.health > 0 && player2.health > 0){
      let currentAttacker = firstPlayer;
      let currentDefender = secondPlayer;

      const roll1 = getRandomDiceRoll();
      const roll2 = getRandomDiceRoll();

      let damage1 = 0;
      let damage2 = 0;

      console.log(player1);
      console.log(player2);    

      if (currentAttacker === player1 && roll1 <= 2) {
          logElement1.innerHTML += `<p>${player1.name} missed the attack on ${player2.name}.</p>`;
      } else if (currentAttacker === player1 && roll1 >= 3 && roll1 <= 9) {
          damage1 = Math.round(roll1 * 0.1 * player1.attackPower);
          player2.takeDamage(damage1);
          logElement1.innerHTML += `<p>${player1.name} dealt ${damage1} damage to ${player2.name}. ${player2.name}'s current health: ${player2.health}</p>`;
      } else if (currentAttacker === player1) {
          damage1 = player1.attackPower * 2;
          player2.takeDamage(damage1);
          logElement1.innerHTML += `<p>${player1.name} scored a critical hit, dealing ${damage1} damage to ${player2.name}. ${player2.name}'s current health: ${player2.health}</p>`;
      } 
      if (currentDefender === player1 && roll2 <= 2) {
          logElement1.innerHTML += `<p>${player1.name} missed the attack on ${player2.name}.</p>`;
      } else if (currentDefender === player1 && roll2 >= 3 && roll2 <= 9) {
          damage2 = Math.round(roll2 * 0.1 * player1.attackPower);
          player2.takeDamage(damage2);
          logElement1.innerHTML += `<p>${player1.name} dealt ${damage2} damage to ${player2.name}. ${player2.name}'s current health: ${player2.health}</p>`;
      } else if (currentDefender === player1) {
          damage2 = player1.attackPower * 2;
          player2.takeDamage(damage2);
          logElement1.innerHTML += `<p>${player1.name} scored a critical hit, dealing ${damage2} damage to ${player2.name}. ${player2.name}'s current health: ${player2.health}</p>`;
      }

      if (currentAttacker === player2 && roll1 <= 2) {
          logElement2.innerHTML += `<p>${player2.name} missed the attack on ${player1.name}.</p>`;
      } else if (currentAttacker === player2 && roll1 >= 3 && roll1 <= 9) {
          damage1 = Math.round(roll1 * 0.1 * player2.attackPower);
          player1.takeDamage(damage1);
          logElement2.innerHTML += `<p>${player2.name} dealt ${damage1} damage to ${player1.name}. ${player1.name}'s current health: ${player1.health}</p>`;
      } else if (currentAttacker === player2) {
          damage1 = player2.attackPower * 2;
          player1.takeDamage(damage1);
          logElement2.innerHTML += `<p>${player2.name} scored a critical hit, dealing ${damage1} damage to ${player1.name}. ${player1.name}'s current health: ${player1.health}</p>`;
      } 
      if (currentDefender === player2 && roll2 <= 2) {
          logElement2.innerHTML += `<p>${player2.name} missed the attack on ${player1.name}.</p>`;
      } else if (currentDefender === player2 && roll2 >= 3 && roll2 <= 9) {
          damage2 = Math.round(roll2 * 0.1 * player2.attackPower);
          player1.takeDamage(damage2);
          logElement2.innerHTML += `<p>${player2.name} dealt ${damage2} damage to ${player1.name}. ${player1.name}'s current health: ${player1.health}</p>`;
      } else if (currentDefender === player2) {
          damage2 = player2.attackPower * 2;
          player1.takeDamage(damage2);
          logElement2.innerHTML += `<p>${player2.name} scored a critical hit, dealing ${damage2} damage to ${player1.name}. ${player1.name}'s current health: ${player1.health}</p>`;
      }
    
      // Swap attacker and defender for the next round
      [currentAttacker, currentDefender] = [currentDefender, currentAttacker];

      
      if (currentDefender === player1 && player1.health <= 0) {
          logElement2.innerHTML += `<p>${player2.name} wins the battle!</p>`;
          battleResult = option.player2;
      } else if (currentDefender === player2 && player2.health <= 0) {
          logElement1.innerHTML += `<p>${player1.name} wins the battle!</p>`;
          battleResult = option.player1;
         
      }
      if (currentAttacker === player2 && player2.health <= 0) {
          logElement1.innerHTML += `<p>${player1.name} wins the battle!</p>`;
          battleResult = option.player1;
      } else if (currentAttacker === player1 && player1.health <= 0) {
          logElement2.innerHTML += `<p>${player2.name} wins the battle!</p>`;
          battleResult = option.player2;
      }
    }
  
    let nextTextNodeId;

    if (battleResult === option.player1) {
      showTextNode(option.nextTextOnPlayer1Win);
    } else if (battleResult === option.player2) {
      showTextNode(option.nextTextOnPlayer2Win);
    }
  
    if (player1.health <= 0) {
      nextTextNodeId = option.nextTextOnPlayer2Win;
    } else {
      nextTextNodeId = option.nextTextOnPlayer1Win;
    }
    const healthElement = document.getElementById("health");
    healthElement.textContent = `Health: ${mainCharacter.health}`;
    return nextTextNodeId;
    
  }

//Function that dynamically enters in text and options into the HTML page and removes options if below 4 exist. 
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  const filteredOptions = textNode.options.filter((option) => showOption(option));

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  if (option.requiredState) {
    return option.requiredState(state);
  }
  if (option.requiredItem) {
    return state[option.requiredItem];
  }
  if (option.id === 3 && state.smallRockDropped) {
    return false;
  }
  if (option.id === 1 && option.text === "See if you can climb the stone walls over the prison bars.") {
    return state.smallRock && !state.smallRockDropped;
  }
  return true;
}

//An important function that handles the next text logic based on who wins a battle, and if certain chosen options affect the players health/attack power.
function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  log1.innerHTML = "";
  log2.innerHTML = "";

  let nextTextId;

  if (option.prompt) {
    alert(option.prompt);
}

    if (option.nextTextOnPlayer1Win && option.nextTextOnPlayer2Win) {
        // Battle is involved, so determine the winner
        console.log(option);
        const battleResult = battle(option.player1, option.player2, log1, log2, option);
        if (option.player1 === mainCharacter){
          player1.health = mainCharacter.health;
        }

        if (battleResult === option.player1) {
          nextTextId = option.nextTextOnPlayer1Win; 
      } else if (battleResult === option.player2) {
          nextTextId = option.nextTextOnPlayer2Win; 
      }
    } else {
        // No battle, just use nextText
        nextTextId = option.nextText;
    }
    if (option.text === "Drink it now") {
      const healthPotionItem = items.find(item => item.name === "Vial of Health");
      if (healthPotionItem) {
        const healingAmount = healthPotionItem.value;
        
        mainCharacter.useHealingItem(healingAmount);
        
        const healthElement = document.getElementById("health");
        healthElement.textContent = `Health: ${mainCharacter.health}`;
      
      } 
    }
    if (option.text === "Take the bread and continue down the hall") {
      const breadRollItem = items.find(item => item.name === "Bread Roll");
      if (breadRollItem) {
          const healingAmount = breadRollItem.value;
          mainCharacter.useHealingItem(healingAmount);
          const healthElement = document.getElementById("health");
          healthElement.textContent = `Health: ${mainCharacter.health}`;
          console.log(mainCharacter.health);
      }
  }
  if (option.text === "Try to take a bread roll.") {
    const breadRollItem = items.find(item => item.name === "Bread Roll");
    if (breadRollItem) {
        const healingAmount = breadRollItem.value;
        mainCharacter.useHealingItem(healingAmount);
        const healthElement = document.getElementById("health");
        healthElement.textContent = `Health: ${mainCharacter.health}`;
        console.log(mainCharacter.health);
    }
}
if (option.text === "Continue down the hall.") {
  const guardArmorItem = items.find(item => item.name === "Leather Armor");
  const guardSwordItem = items.find(item => item.name === "Chipped Sword");
  if (guardArmorItem) {
    const healingAmount = guardArmorItem.value;
    mainCharacter.useHealingItem(healingAmount);
    const healthElement = document.getElementById("health");
    healthElement.textContent = `Health: ${mainCharacter.health}`;
    console.log(mainCharacter.health);
  }
  if (guardSwordItem) {
    mainCharacter.attackPower += guardSwordItem.value; 
        const attackPowerElement = document.getElementById("attackPower");
        attackPowerElement.textContent = `Attack Power: ${mainCharacter.attackPower}`;
        console.log(mainCharacter.attackPower);
}
}
if (option.text === "Adjust your new armor and continue.") {
  const guardArmorItem = items.find(item => item.name === "Leather Armor");
  const guardSwordItem = items.find(item => item.name === "Chipped Sword");
  if (guardArmorItem) {
    const healingAmount = guardArmorItem.value;
    mainCharacter.useHealingItem(healingAmount);
    const healthElement = document.getElementById("health");
    healthElement.textContent = `Health: ${mainCharacter.health}`;
    console.log(mainCharacter.health);
  }
  if (guardSwordItem) {
    mainCharacter.attackPower += guardSwordItem.value; 
        const attackPowerElement = document.getElementById("attackPower");
        attackPowerElement.textContent = `Attack Power: ${mainCharacter.attackPower}`;
        console.log(mainCharacter.attackPower);
}
meadow.move(forest);
  document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;

}
if (option.text === "Hurriedly climb down.") {
  mainCharacter.health -= 10;
  const healthElement = document.getElementById("health"); 
  healthElement.textContent = `Health: ${mainCharacter.health}`;
  console.log(mainCharacter.health);
}
if (option.text === "Attack the Archduke!") {
  const gideonSwordItem = items.find(item => item.name === "Gideon's Sword");
  if (gideonSwordItem) {
    mainCharacter.attackPower += gideonSwordItem.value; 
        const attackPowerElement = document.getElementById("attackPower");
        attackPowerElement.textContent = `Attack Power: ${mainCharacter.attackPower}`;
        console.log(mainCharacter.attackPower);
}
}
if (option.text === "Adjust Gideon's armor across your shoulders.") {
  const gideonArmorItem = items.find(item => item.name === "Gold Armor");
  const gideonSwordItem = items.find(item => item.name === "Gideon's Sword");
  if (gideonArmorItem) {
    const healingAmount = gideonArmorItem.value;
    mainCharacter.useHealingItem(healingAmount);
    const healthElement = document.getElementById("health");
    healthElement.textContent = `Health: ${mainCharacter.health}`;
    console.log(mainCharacter.health);
  }
  if (gideonSwordItem) {
    mainCharacter.attackPower += gideonSwordItem.value; 
        const attackPowerElement = document.getElementById("attackPower");
        attackPowerElement.textContent = `Attack Power: ${mainCharacter.attackPower}`;
        console.log(mainCharacter.attackPower);
}
}
if (option.text === "Go through the doors."){
  castle.move(courtyard);
  document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;
  
}
if (option.text === "Take the left path, towards the meadow."){
  courtyard.move(meadow);
  document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;
  
}
if (option.text === "Move towards the horses."){
  forest.move(plateau);
  document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;
}
if (option.text === "Take the right path, deeper into the forest."){
  courtyard.move(forest);
  document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;
}
if (option.text === "Follow him."){
  meadow.move(forest);
  document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;
}
if (option.text === "Refuse, and run off into the woods."){
  meadow.move(forest);
  document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;
}
if (option.text === "Run!"){
  courtyard.move(forest);
  document.getElementById("locationImage").src = currentLocation.imageSrc;
document.getElementById("description").textContent = currentLocation.description;
}
    if (nextTextId <= 0) {
        startGame();
        return;
    }
    
  const updatedState = Object.assign({}, state, option.setState); // Combine all state changes
  state = updatedState; // Update the state+
  
    showTextNode(nextTextId);

    
  }
  //All story text, options, setting current states, entering characters into battle. All is done via player choice based on which option is chosen
  textNodes = [
    {
        id: 0.5,
        text: "Welcome, " + mainCharacter.name +". You've been captured by your enemy, the Archduke, who threatens to kill you unless you hand over rulership of your kingdom, Scriptopia, to him. You must escape. Click continue to progress the story.",
        options: [
            {
              text: "Continue",
              nextText: 1,
            },
          ]
      },
    {
      id: 1,
      text: "Awakening in a dark prison, you search your surroundings and see a skeleton in the corner, an old, ripped mattress on the floor. You also notice a small gap between the ceiling and top bar of the prison bars. Perhaps you could fit in?",
      options: [
        {
          text: "Search the skeleton's clothes for anything of use.",
          requiredState: (currentState) => !currentState.lockPickKept,
          setState: {lockPick: true},
          prompt: "You found a lock pick!",
          nextText: 2
        },
        {
          text: "See if you can climb the stone walls over the prison bars.",
          setState: {smallRock: true},
          prompt: "As your grip the wall, a rock comes loose! You gained a rock!",
          requiredState: (currentState) => !currentState.smallRockDropped,
          nextText: 3
        },
        {
          text: "Look under the mattress.",
          setState: {healthPotion: true},
          requiredState: (currentState) => !currentState.healthPotionKept,
          nextText: 1.3
        },
        {
          text: "Accept your fate.",
          setState: {playerDead: true},
          nextText: 1.5
        },
      ]
    },
    {
        id: 1.3,
        text: "Lifting the mattress, you find a tiny vial. It's dirty, but the red sparkling liquid inside looks fine.",
        options: [
            {
              text: "Drink it now",
              nextText: 1.35,
              prompt: "You gain instantly +25 health! You're feeling much better.",
              
            },
          ]
      },
      {
        id: 1.35,               //FIGHT
        text: "Footsteps sound down the hall, and you quickly hide the empty vial as a guard appears at your prison door, opens it, and orders you outside.",
        options: [
            {
              text: "Stay where you are.",
              nextTextOnPlayer1Win: 3.7,
              nextTextOnPlayer2Win: 3.81,
              player1: mainCharacter,
              player2: prisonGuard,


            },
            {
                text: "Follow his order.",
                nextText: 3.9
              },
          ]
      },
    
        {
            id: 2,
            requiredState: (currentState) => currentState.lockPickKept,
            text: "Running your thumb down the metal, you notice that the end is sharpened enough to possibly fit into the lock at the jail door.",
            
            options: [
              {
                text: "Use the tool to pick the lock.",
                requiredState: (currentState) => currentState.lockPick,
                setState: { lockPick: true, lockPickBroken: true},
                nextText: 4,
                prompt: "The lock pick breaks just as the door unlocks.",
              },
              {
                text: "Keep the pick for later.",
                requiredState: (currentState) => currentState.lockPick,
                setState: { lockPickKept: true },
                nextText: 2.5,
              },
            ]
          },
    {
        id: 1.5,
        text: "Eventually, the guard comes for you. Taking you up  winding stairs of the tower. There, waiting, is the Archduke. Asking you once more for your country, you refuse, and he grows furious. He kills you before you even realize. You have died.",
        options: [
            {
              text: "Restart?",
              nextText: -1
            },
          ]
      },
          {
            id: 2.5,
            requiredState: (currentState) => currentState.lockPick,
            text: "You search your surroundings once more and see the climbable wall, and the old, ripped mattress on the floor.",
            
            options: [
                {
                  text: "Search the skeleton's clothes for anything of use.",
                  requiredState: (currentState) => !currentState.lockPickKept,
                  setState: {lockPick: true},
                  prompt: "You found a lock pick!",
                  nextText: 2
                },
                {
                  text: "See if you can climb the stone walls over the prison bars.",
                  setState: {smallRock: true},
                  requiredState: (currentState) => !currentState.smallRockDropped,
                  nextText: 3
                },
                {
                  text: "Look under the mattress.",
                  setState: {healthPotion: true},
                  requiredState: (currentState) => !currentState.healthPotionKept,
                  nextText: 1.3
                },
                {
                  text: "Accept your fate.",
                  setState: {playerDead: true},
                  nextText: 1.5
                },
              ]
          },
          {
            id: 3,                      // FIGHT
            requiredState: (currentState) => currentState.smallRock,
            text: "The guard hears you and orders you to drop the rock.",
            options: [
              {
                text: "Refuse.",
                nextTextOnPlayer1Win: 3.7,
                nextTextOnPlayer2Win: 3.81,
                player1: mainCharacter,
                player2: prisonGuard, 
                
              },
              {
                text: "Drop the item.",
                setState: {smallRockDropped: true},
                nextText: 3.5,
              },
            ]
          },
          {
            id: 3.5,
            requiredState: (currentState) => currentState.smallRockDropped,
            text: "The guard glowers at you before once more disappearing. He's left you alone for now. You search your surroundings once more and see the skeleton in the corner, and the old, ripped mattress on the floor.",
            options: [
                {
                  text: "Search the skeleton's clothes for anything of use.",
                  requiredState: (currentState) => !currentState.lockPickKept,
                  setState: {lockPick: true},
                  prompt: "You found a lock pick!",
                  nextText: 2
                },
                {
                  text: "See if you can climb the stone walls over the prison bars.",
                  setState: {smallRock: true},
                  requiredState: (currentState) => !currentState.smallRockDropped,
                  nextText: 3
                },
                {
                  text: "Look under the mattress.",
                  setState: {healthPotion: true},
                  requiredState: (currentState) => !currentState.healthPotionKept,
                  nextText: 1.3
                },
                {
                  text: "Accept your fate.",
                  setState: {playerDead: true},
                  nextText: 1.5
                },
              ]
          },
          {
            id: 3.7,
            text: "You defeated the guard! You take the guard's sword and some of his leather uniform and then hurry out of the prison cell.",
            options: [
                {
                  text: "Continue down the hall.",
                  prompt: "You gained 15 health and 15 attack power!",
                  setState: {guardArmor: true, guardSword: true, guardDead: true},
                              
                  nextText: 5,
                },
              ]
          }, 
          {
            id: 3.8,            // FIGHT //
            text: "You know you will likely need this later. Putting it into your pocket, you hear footsteps coming down the hall. The guard comes to your cell, opens the door, and orders you outside.",
            options: [
                {
                  text: "Stay where you are.", 
                  nextTextOnPlayer1Win: 3.7,
                  nextTextOnPlayer2Win: 3.81,
                  player1: mainCharacter,
                  player2: prisonGuard, 

                },
                {
                  text: "Follow his order.",
                  
                  nextText: 3.9
                },
              ]
          },
          {
            id: 3.81,            //LOST TO GUARD
            text: "You lose to the guard. Taking your arm, he hauls you to your feet and drags you up the tower and straight to the Archduke. You have died.",
            options: [
                {
                  text: "Restart?",     
                  nextText: -1,
                },
                
              ]
          },
          {
            id: 3.9,
            text: "He pushes you down the hallway in front of him, a hand on his sword. You both travel down a long, dark hallway and above the dampness of the stone walls, you smell bread. The smell gets bigger until you arrive in a brightly lit kitchen. An ornery cook glares at you both as you enter, and the guard shoves you aside as he closely examines the bread rolls lined up across the table to cool. The guard and the cook are both distracted.",
            options: [
                {
                  text: "Try to slowly sneak away",
                  prompt: "You get away successfully!",                
                  nextText: 5,
                },
                {
                  text: "Don't move.",
                  
                  nextText: 3.92,
                },
                {
                    text: "Try to take a bread roll.",
                    setState: {breadRoll: true},
                    prompt: "You succeed! You eat it right away, gaining 10 health!",
                    nextText: 3.93,
                    
                  },
              ]
          },
          {
            id: 3.92,
            text: "The guard takes you up the winding stairs of the tower. There, waiting, is the Archduke. Asking you once more for your country, you refuse, and he grows furious. He kills you before you even realize. You have died.",
            options: [
                {
                  text: "Restart?",
                                  
                  nextText: -1
                },
              ]
          },
          {
            id: 3.93,
            text: "The guard and the cook are both distracted still . . .",
            requiredState: (currentState) => currentState.breadRoll,
            options: [
                {
                  text: "Try to slowly sneak away",
                  prompt: "You get away without them noticing!",                
                  nextText: 3.95
                },
                {
                  text: "Don't move.",
                  
                  nextText: 3.92
                },
              ]
          },
          {
            id: 3.95,
            text: "You make your way down the hall and reach a tall, ominous door and a set of stairs to the right, or should you go back down the hall to try to take some bread?",
            options: [
                {
                  text: "Return to the kitchen.",
                                  
                  nextText: 5.6,
                },
                {
                  text: "Keep going down the hall.",
                  
                  nextText: 5
                },
                
              ]
          },
              {
                id: 4,
                text: "Carefully, you sneak down the hall. The smell of food wafts down the corridor, and you remember how hungry you are.",
                options: [
                    {
                      text: "Follow your nose to the food.",
                                      
                      nextText: 4.1
                    },
                    {
                      text: "Keep going down the hall.",
                      
                      nextText: 5
                    },
                  ]
              },
              {
              id: 4.1,
              text: "You reach the kitchens, where the castle cook is preparing fresh bread rolls. Your stomach churns loudly, and the cook nearly drops a hot pan. They are startled, but don't seem to realize who you are. They quickly shove a few rolls at you and angrily shoo you from the kitchen.",
              options: [
                  {
                    text: "Take the bread and continue down the hall",
                    prompt: "You gained a fresh bread roll!",
                    setState: {breadRoll: true},                
                    nextText: 5,
                  },
                ]
            },
            {
                id: 5,                  
                text: "You make your way down the hall and reach a tall, ominous door and a set of stairs to the right",
                options: [
                    {
                      text: "Go through the doors.",
                      // ENTER THE COURTYARD //               
                      nextText: 6
                    },
                    {
                        text: "Go up the stairs.",
                                       
                        nextText: 5.4,
                      },
                      {
                        text: "Go back down the hall and get more bread",
                        requiredState: (currentState) => currentState.breadRoll,
                        nextText: 5.6
                      },
                  ]
              },
              {
                id: 5.4,
                text: "The staircase is windy and dark. You think it's going on forever when you bump directly into someone. It's the Archduke! Furious at your escape, he immediately executes you. You have died.",
                options: [
                    {
                      text: "Restart?",
                                    
                      nextText: -1
                    },
                  ]
              },
              {
                id: 5.5,                
                text: "You make your way down the hall and reach a tall, ominous door and a set of stairs to the right",
                options: [
                    {
                      text: "Go through the doors.",
                      // ENTER THE COURTYARD //               
                      nextText: 6
                    },
                    {
                        text: "Go up the stairs.",
                                       
                        nextText: 5.4
                      },
                      
                  ]
              },
              {
                id: 5.6,                //FIGHT//
                requiredState: (currentState) => currentState.breadRoll,                 
                text: "Feeling both brave and ravenous, you slowly creep to the kitchen, but soon hear the rattling shudder of armour as the guard comes running down the hall towards you. Upon spotting you, he quickly draws his sword.",
                options: [
                    {
                      text: "FIGHT.",
                      nextTextOnPlayer1Win: 5.61,
                      nextTextOnPlayer2Win: 3.81,
                      player1: mainCharacter,
                      player2: prisonGuard, 
                    },
                    
                  ]
              },
              {
                id: 5.61, 
                text: "You defeated the guard! Voices echo down the hall. Taking the guard's sword and some of his leather uniform, you hurry back down the hall.",
                options: [
                    {
                      text: "Continue down the hall.",
                      setState: {guardArmor: true, guardSword: true, guardDead: true},
                      prompt: "You gained 15 health and 15 attack power!",               
                      nextText: 5.5,
                    },
                  ]
              }, 
// SECOND ACT //////////
              {
                id: 6,// ENTER THE COURTYARD // 
                text: "You enter a quiet courtyard and beyond a tall brick wall you can see a dense forest surrounding the Archduke's castle. To your right, past a large fountain, you see a young boy with his back turned to you, shovelling hay into a stall. And in front of you is a small iron gate covered in ivy, and the wall looks scalable, if you wanted to try climbing it.",
                options: [
                    {
                      text: "Climb the wall.",
                      setState: {triedClimbing: true}, 
                      nextText: 6.4
                    },
                    {
                        text: "Carefully approach the stable boy.",
                        requiredState: (currentState) => currentState.guardDead,               
                        nextText: 6.51
                      },
                      {
                        text: "Carefully approach the stable boy.",
                        requiredState: (currentState) => !currentState.guardDead,               
                        nextText: 6.5
                      },
                      {
                        text: "Approach the gate.",
                        nextText: 6.2,
                        setState: {triedGate: true},
                      },
                  ]
              }, 
              {
                id: 6.2,
                text: "Thick ropes of ivy curl around the wrought iron, but with a little encouragment, it would come off. Through the bars you can see a dark forest. A thick padlock also locks the gate.",
                options: [
                    {
                      text: "Climb the wall instead.",
                      requiredState: (currentState)=> !currentState.triedClimbing, 
                      setState: {triedClimbing: true},              
                      nextText: 6.4,
                    },
                    {
                        text: "Change your mind and go to the stables.",
                        requiredState: (currentState) => currentState.guardDead,              
                        nextText: 6.51
                      },
                      {
                        text: "Change your mind and go to the stables.",
                        requiredState: (currentState) => !currentState.guardDead,                
                        nextText: 6.5
                      },
                      {
                        text: "Pick the lock.",
                        requiredState: (currentState) => { return !currentState.lockPickBroken && !currentState.guardDead && currentState.lockPick},
                        setState: {triedGate: true, lockPickBroken: true},
                        prompt: "The lock pick breaks just as the padlock snaps open.",               
                        nextText: 6.25
                      },
                      {
                        text: "Pull the vines away and pick the lock.",
                        requiredState: (currentState) => { return !currentState.lockPickBroken && currentState.guardDead && currentState.lockPick},
                        setState: {triedGate: true, lockPickBroken: true},
                        
                        prompt: "The lock pick breaks just as the padlock snaps open, and with a little effort the gate swings open.",               
                        nextText: 6.6,
                      }
                  ]
              },
              {
                id: 6.25,                  
                text: "The broken lock pick and heavy padlock both fall to your feet. You grab onto the vines and begin to pull, unfurling the vines slowly. A loud crash sounds behindy you as the guard shoves through the door. They found you!",
                options: [
                    {
                      text: "Pull harder on the vines.", 
                      prompt: "You succeed! The vines come loose!",            
                      nextText: 6.7,
                    },
                  ]
              },
              {
                id: 6.4,
                text: "Finding a crevice to shove your foot into, you pull yourself up the wall slowly. Halfway up, a brick comes loose, and you lose your balance, falling back to the ground.",
                options: [
                    {
                      text: "Try to climb the wall again.",
                      requiredState: (currentState) => !currentState.guardDead,             
                      nextText: 6.45
                    },
                    {
                        text: "Try to climb the wall again.",
                        requiredState: (currentState) => currentState.guardDead,              
                        nextText: 6.47
                      },
                      {
                        text: "Change your mind and go to the stables.",
                        requiredState: (currentState) => currentState.guardDead,              
                        nextText: 6.51
                      },
                      {
                        text: "Change your mind and go to the stables.",
                        requiredState: (currentState) => !currentState.guardDead,                
                        nextText: 6.5
                      },
                      {
                        text: "Approach the gate.",
                        requiredState: (currentState) => !currentState.triedGate,
                        setState: {triedGate: true},
                        nextText: 6.2
                      },
                  ]
              },
              {
                id: 6.45, //Guard alive
                text: "Knowing better this time, you climb the wall without issue and quickly reach the stop. You stand on top of the wall and peer out into the forest. The landscape is unfamiliar, and the forest is dark and quiet, but it's your only chance of freedom.",
                options: [
                    {
                      text: "Continue.",             
                      nextText: 6.46
                    },
                  ]
              },
              {
                id: 6.46,    //Required state guard alive
                  text: "While preparing to climb down the outer wall, the door into the courtyard bursts open. The red-faced guard easily spots you and rushes across the courtyard to a locked gate, where he fumbles with the lock. You had to get down and into the forest, or he would catch you.",
                  options: [
                      {
                        text: "Slowly and carefully climb down.",             
                        nextText: 6.461
                      },
                      {
                          text: "Hurriedly climb down.",
                          prompt: "In your panic to quickly get down the wall, your grip slips, and you fall. You lose 10 health!",
                          nextText: 6.462
                        },
                        {
                          text: "Jump down.",
                          prompt: "You leap down, but underestimate how tall the wall is. Your legs break and the guard drags you back to the Archduke. \nYou have died.",
                          nextText: -1,
                        },
                    ]
                },
              {
              id: 6.461,    //Required state guard alive
                text: "You safely climb down the wall as the guard is furiously jolting the gate back and forth, trying to break off the ivy. As you rush across the grass and reach the perimeter of the forest, the gate behind you breaks open, and the guard chases you into the forest. Bushes and trees blur past you, and branches and thorns tug at your clothes as you run through brambles. You come onto a path. The left path leads to a brightly lit meadow, and the right one to a dark and narrow, winding path.",
                options: [
                    {
                      text: "Take the left path, towards the meadow.",             
                      nextText: 7,
                    },
                    {
                        text: "Take the right path, deeper into the forest.",
                                       
                        nextText: 7.18,
                      },
                  ]
              },
              
              {
                id: 6.462,  //guard alive 
                text: "You fall to the ground a second time. The guard is still struggling with the gate as you run into the woods. Bushes and trees blur past you, and branches and thorns tug at your clothes as you run through brambles. You come onto a path. The left path leads to a brightly lit meadow, the right one into a dark and narrow, winding path.",
                options: [
                    {
                      text: "Take the left path, towards the meadow.",     // ALTERNATE ROUTE         
                      nextText: 7,
                    },
                    {
                        text: "Take the right path, deeper into the forest.",
                                       
                        nextText: 7.18,
                      },
                  ]
              },
              {
              id: 6.47, //Guard dead 
                text: "Knowing better this time, you climb the wall without issue and quickly reach the stop. You stand on top of the wall and peer out into the forest. The landscape is unfamiliar, and the forest is dark and quiet, but your only chance of freedom. You climb down the otherside and move towards the woods.",
                options: [
                    {
                        text: "Continue.",
                                     
                        nextText: 6.6
                      },
                  ]
              },
            {
              id: 6.5,    //guard alive
                      text: "You approach the stables, hoping to slip past the boy unnoticed, when a large white dog comes barrelling around the end of the stables. You reach down to pet it when a door crashes open somewhere behind you. The boy beckons you over to the large pile of hay, but you can also just make out a large gate further down the wall.",
                      options: [
                          {
                            text: "Jump into the hay bale!",             
                            nextText: 6.53,
                          },
                          {
                              text: "Run to the gate",
                                             
                              nextText: 6.52
                            },
                        ]
                    },
                    {
                      id: 6.53,    //guard alive
                              text: "Without hesitation, you leap into the mound of straw and the boy helps to hurriedly cover you. The guard shouts, asking the boy if he'd seen someone matching my exact description. The boy denies it and you listen as the guard curses and continues onwards.",
                              options: [
                                  {
                                    text: "Get out of the hay.",             
                                    nextText: 6.54,
                                  },
                                ]
                            },
                            {
                              id: 6.54,    //guard alive
                                      text: "Brushing straw from your clothes, the boy tells you, “Hurry,” and points you towards a wide gate before a drawn bridge leading into the inner castle courtyard. You thank him and continue. Thankfully, no one spots you as you slip through the gate.",
                                      options: [
                                          {
                                            text: "Thankfully, no one spots you as you slip through the gate",             
                                            nextText: 6.6,
                                          },
                        
                                        ]
                                    },
                    {
                        id: 6.52,    //guard alive
                                text: "Ignoring the stable boy, you run as quickly as you can to the large gate and push it open. You can hear the guard behind you, shouting at you. It pushes your legs to move faster as you rush into the forest.",
                                options: [
                                    {
                                      text: "Run!",             
                                      nextText: 6.7
                                    },
                                  ]
                              },
                { 
                    id: 6.51,    //guard dead
                      text: "You approach the stables, hoping to slip past the boy unnoticed. He hums a tune beneath his breath as you move past and continue to a large gate further down the wall. You make it out of the courtyard unnoticed.",
                      options: [
                          {
                            text: "Continue",           
                            nextText: 6.6
                          },
                        ]
                    },
            
                {
                id: 6.6, // guard dead
                  text: "Bordering the castle is a forest with shade darker than night. Making your way through the forest, you are careful of the sharp branches jutting out. You feel like you are walking for some time when you come onto a path. The left path leads to a brightly lit meadow, the right one into a dark and narrow, winding path.",
                  options: [
                    {
                        text: "Take the left path, towards the meadow.",             
                        nextText: 7.1,
                      },
                      {
                          text: "Take the right path, deeper into the forest.",
                                         
                          nextText: 7.18,
                        },
                    ]
                },
                {
                    id: 6.7, //guard alive
                  text: "As you rush across the grass and reach the perimeter of the forest, the gate behind you breaks open, and the guard chases you into the forest. Bushes and trees blur past you, and branches and thorns tug at your clothes as you run through brambles. You come onto a path. The left path leads to a brightly lit meadow, and the right one to a dark and narrow, winding path.",
                  options: [
                    {
                        text: "Take the left path, towards the meadow.",     // ALTERNATE ROUTE         
                        nextText: 7,
                      },
                      {
                          text: "Take the right path, deeper into the forest.",
                                         
                          nextText: 7.18,
                        },
                    ]
                },
        // MEADOW /////
        {
            id: 7, //guard alive        BATTLE 
          text: "The meadow is fragrant and brightly lit, but you hear the guard right behind you. You make it halfway across the meadow before he tackles you to the ground. You are too weak to fight him off, and he presses his sword against your throat. The sharp clinking of armour and footfalls grow louder. The guard pushes off you and stands to jump away as a man in golden armour stands between him and you. It's Knight Captain Gideon! “I've found you, " + mainCharacterTitle + " " + mainCharacter.name + "! Allow me to take care of this cur!” He grips his drawn sword tightly.",
          options: [
            {
                text: "Allow Gideon to attack the guard.",
                nextTextOnPlayer1Win: 7.25,
                nextTextOnPlayer2Win: 7.2,
                player1: gideonTheKnight,
                player2: prisonGuard, 
              },
              {
                text: "Fight the guard yourself",
                nextTextOnPlayer1Win: 7.25,
                nextTextOnPlayer2Win: 7.14,
                player1: mainCharacter,
                player2: prisonGuard, 
                },
            ]
        },
        {
            id: 7.1, //guard DEAD        
          text: "The meadow is fragrant and brightly lit, and is walled in by dark foreboding trees that seem to blacken the foliage beneath. Suddenly, the foliage shifts, and you freeze, waiting for the creature to reveal itself. A tall man with golden hair and amour with your family's insignia on the breastplate emerges from the treeline. It's Knight Captain Gideon! “I've found you, " + mainCharacterTitle + " " + mainCharacter.name + "! Follow me!” It looks and sounds like the same man, but you aren't certain that it isn't a trick.",
          options: [
            {
                text: "Follow him.",
                nextText: 7.26,
              },
              {
                  text: "Refuse, and run off into the woods.",
                  nextText: 7.15,
                },
            ]
        },
        {
          id: 7.14, //guard DEAD  Gideon DEAD      
        text: "Gideon collapses to the ground and does not rise. He has died. With a loud cry, you take up his sword and swing at the guard.",
        options: [
          {
              text: "FIGHT.",
              prompt: "You gain 45 attack power from Gideon's sword",
              setState: {gideonSword: true, gideonDead: true},
              nextTextOnPlayer1Win: 7.41,
              nextTextOnPlayer2Win: 3.81,
              player1: mainCharacter,
              player2: prisonGuard,
            },
            
          ]
      },
        {
            id: 7.15, 
          text: "Gideon tries to stop you, but you escape him. It isn't long until you run right into the Archduke that entered the forest to look for you. You have died.",
          options: [
            {
                text: "Restart?",
                nextText: -1
              },
            ]
        },
        {
            id: 7.18,        // guard ALIVE  BATTLE ALTERNATE ROUTE
          text: "The path can fit two people side by side at first, but eventually, you are bunching your shoulders together to pass between unkempt bushes. But there is silence behind you. You're certain that the guard didn't follow you. Then you hear growls and wolves, with glowing yellow eyes, snarl. The sharp clinking of armour and footfalls spund until a man in golden armour stands between him and the wolves. It's Knight Captain Gideon! “I've found you, " + mainCharacterTitle + " " + mainCharacter.name + "! Allow me to take care of this!” He grips his drawn sword tightly.",
          options: [
            {
                text: "Send Knight Gideon.",
                nextTextOnPlayer1Win: 7.3,
                nextTextOnPlayer2Win: 7.31,
                player1: gideonTheKnight,
                player2: wolves, 
              },
              {
                text: "Deal with the wolves yourself.",
                nextTextOnPlayer1Win: 7.24,
                nextTextOnPlayer2Win: 7.23,
                player1: mainCharacter,
                player2: wolves,
                
                
              },
              {
                requiredState: (currentState) => { return currentState.smallRock && !currentState.smallRockDropped},
                text: "Throw rock at one of the wolves.", 
                
                
                nextTextOnPlayer1Win: 7.3,
                nextTextOnPlayer2Win: 7.2,
                player1: gideonTheKnight,
                player2: hurtWolves,
                prompt: "The rock hits one of the wolves right on the snout! It takes 30 damage! Gideon then steps in to handle the rest.",
                
              }, 
            ]
        },
        {
            id: 7.2,        // guard alive, Gideon dead BATTLE
          text: "Knight Gideon has died, and the wolves begin to circle you. You take Gideon's sword. You must defend yourself!",
          options: [
            {
                text: "Fight!",
                prompt: "You gain 45 attack power!",
                nextTextOnPlayer1Win: 7.41,
                nextTextOnPlayer2Win: 7.23,
                player1: mainCharacter,
                player2: wolves,
              },
              
            ]
        },
        {
          id: 7.23,        // guard alive, Gideon dead BATTLE
        text: "It was hardly a fight. The wolves kill you nearly instantly. You have died.",
        options: [
          {
              text: "Restart?",
              nextText: -1,
              
            },
          ]
      },
      {
        id: 7.24,        // wolves dead
      text: "You beat the wolves! Gideon commends you on your victory before you both continue onwards.You both continue on your way without issue, and eventually you see light through the trees. You're coming near the edge of the forest! Exiting the forest, a plateau of bright green grass spreads as far as the eye can see. Down the hill, two saddled horses graze.",
      options: [
        {
            text: "Move towards the horses.",
            nextText: 7.4
          },
        ]
    },
        {
            id: 7.25,        // guard dead, Gideon alive
          text: "The guard lies on the ground defeated. Gideon walks up to them and removes pieces of their armour, putting it onto you and places the guard's weapon into your hands. “This will help you, Your Highness.”",
          options: [
            {
                text: "Adjust your new armor and continue.",
                setState: {guardArmor: true, guardSword: true},
                prompt: "You gain 15 health and 15 attack power!",
                nextText: 7.26
              },
            ]
        },
        {
            id: 7.26,        // guard dead, Gideon alive
          text: "Gideon then points through the trees. “I have left horses over there, past the forest. We must hurry.” You follow after him, weaving through the trees and entering a quiet darkness that only seems to grow the further you go. Eventually, you hear a noise in the distance that sounds like a woman's scream. Gideon stiffens, searching the dark and reaching for his weapon.",
          options: [
            {
                text: "Ignore the noise.",
                nextText: 7.28,
              },
              {
                text: "Go towards it.",
                nextText: 7.27,
              },
            ]
        },
        {
          id: 7.27,        // Gideon alive, wolves dead
        text: "Going towards the noise, light behind to stream through the trees. You step past the line of trees and stand at the edge of a ridge, the wind howling and sighing as it sweeps through the ravine. It was no woman, it was the wind. But it is too dangerous to step down here, you both follow the tree line and eventually come upon a plateau of bright green grass spreads as far as the eye can see. Down the hill, two saddled horses graze.",
        options: [
          {
              text: "Move towards the horses.",
              nextText: 7.4,
            },
            
          ]
      },
      {
        id: 7.28,        
      text: "The scream sounds again, but you and Gideon turn away, and continue toward the edge of the forest. Then you hear growls begin to surround you, and wolves with glowing yellow eyes snarl as they circle you both. ",
      options: [
        {
          text: "Send Knight Gideon.",
          nextTextOnPlayer1Win: 7.3,
          nextTextOnPlayer2Win: 7.31,
          player1: gideonTheKnight,
          player2: wolves, 
        },
        {
          text: "Deal with the wolves yourself.",
          nextTextOnPlayer1Win: 7.24,
          nextTextOnPlayer2Win: 7.23,
          player1: mainCharacter,
          player2: wolves,
          
        },
          {
            text: "Throw rock at wolf.",
            requiredState: (currentState) => {return !currentState.smallRockDropped && currentState.smallRock},
            prompt: "The rock hits one of the wolves right on the snout! It takes 30 damage! Gideon then steps in to handle the rest.",
            nextTextOnPlayer1Win: 7.3,
            nextTextOnPlayer2Win: 7.2,
            player1: gideonTheKnight,
            player2: hurtWolves,
          }
        ]
    },
        {
            id: 7.3,        // WOLVES dead, Gideon alive
          text: "Gideon pulls his sword from the last wolf's belly and wipes it clean on the moss across the ground. You both continue on your way without issue, and eventually you see light through the trees. You're coming near the edge of the forest! Exiting the forest, a plateau of bright green grass spreads as far as the eye can see. Down the hill, two saddled horses graze.",
          options: [
            {
                text: "Move towards the horses.",
                nextText: 7.4
              },
            ]
        },
        {
            id: 7.31,        // wolves alive, Gideon dead BATTLE
          text: "Knight Gideon has died, and the wolves move towards you! You must defend yourself!",
          options: [
            {
                text: "FIGHT!",
                nextTextOnPlayer1Win: 7.41,
                nextTextOnPlayer2Win: 7.23,
                player1: mainCharacter,
                player2: wolves, 
              },
            ]
        },
        {
            id: 7.4,        // Gideon alive // enter ACT 3
          text: "Suddenly, storm clouds gather and lightning strikes. The winds howl as a figure on a dark horse emerges from the trees behind you. You and Gideon narrowly miss the horse as it flies past, and the Archduke dismounts to face you, sword in hand.",
          options: [
            {
                text: "Continue.",
                nextText: 8.1
              },
            ]
        },
        {
            id: 7.41,        // Gideon dead // enter ACT 3
          text: "Gideon has died. With a prayer, you bend down to take his sword and his chest plate before you turn and continue alone through the woods.",
          options: [
            {
                text: "Adjust Gideon's armor across your shoulders.",
                setState: {gideonArmor: true, gideonSword:true, gideonDead: true},
                prompt: "You gained +50 health and +45 Attack Power!",
                nextText: 7.42
              },
            ]
        },
        {
          id: 7.42,        // Gideon dead // enter ACT 3
        text: "Gideon has died. With a prayer, you turn and continue alone through the woods. Eventually you see light through the trees. You're coming near the edge of the forest! Exiting the forest, a plateau of bright green grass spreads as far as the eye can see. Down the hill, two saddled horses graze. Suddenly, storm clouds gather and lightning strikes. The winds howl as a figure on a dark horse emerges from the trees behind you. You narrowly miss the horse as it flies past, and the Archduke dismounts to face you, sword in hand.",
        options: [
          {
              text: "Continue.",
              nextText: 8
            },
          ]
      },

        //// ACT 3 /////
        {
            id: 8,        // Gideon dead // 
          text: "It is time to end this and to save your kingdom and get vengence for Gideon!",
          options: [
            {
                text: "Attack.",
                nextTextOnPlayer1Win: 9.15,
                nextTextOnPlayer2Win: 9.2,
                player1: mainCharacter,
                player2: evilArchduke, 
              },
            ]
        },
        {
            id: 8.1,        // Gideon alive // 
          text: "The Archduke challenges you, but Gideon blocks him.",
          options: [
            {
                text: "Allow Gideon to fight the Archduke.",
                nextTextOnPlayer1Win: 9,
                nextTextOnPlayer2Win: 8.2,
                player1: gideonTheKnight,
                player2: evilArchduke, 
              },
              {
                text: "Fight the Archduke yourself.",
                nextTextOnPlayer1Win: 9,
                nextTextOnPlayer2Win: 9.2,
                player1: mainCharacter,
                player2: evilArchduke, 
              },
            ]
        },
        {
            id: 8.2,        // Gideon dead // 
          text: "Gideon collapses to the ground and does not rise. He has died. With a loud cry, you swing at the Archduke.",
          options: [
            {
                text: "Attack the Archduke!",
                setState: {gideonSword: true},
                //prompt: "From Gideon's sword, you gained 45 attack power!",
                nextTextOnPlayer1Win: 9.1,
                nextTextOnPlayer2Win: 9.2,
                player1: mainCharacter,
                player2: evilArchduke, 
                
              },
            ]
        },

        //// ENDINGS ////

        {
            id: 9,        // Gideon alive //
          text: "The Archduke takes a final, rattling breath before he slumps against the ground. The clouds part and the sky brightens. Your Kingdom, Scriptopia, is saved! Gideon helps you onto your horse and you both take off towards home, leaving the dark forest behind you.",
          options: [
            {
                text: "Go home.",
                prompt: "Congratulations! Both you and Knight Gideon survived!",
                nextText: -1
              },
            ]
        },
        {
            id: 9.1,        // Gideon DEAD // 
          text: "The Archduke takes a final, rattling breath before he slumps against the ground. Gideon lies nearby, motionless. You are victorious, but it's bittersweet. You mount one of the horses and take the reins of Gideon's charger into your hands, leading it back home.",
          options: [
            {
                text: "Go home.",
                prompt: "Congratulations! You have survived!",
                nextText: -1
              },
            ]
        },
        {
          id: 9.15,        // Gideon DEAD // 
        text: "The Archduke takes a final, rattling breath before he slumps against the ground. You are victorious, but it's bittersweet. You mount one of the horses and take the reins of Gideon's charger into your hands, leading it back home.",
        options: [
          {
              text: "Go home.",
              prompt: "Congratulations! You have survived!",
              nextText: -1
            },
          ]
      },
        {
            id: 9.2,        // Gideon and You died //
          text: "The last thing you hear is the Archduke's laughter as the world turns dark and the pain drifts away. ",
          options: [
            {
                text: "You have died. Your Kingdom is lost",
                prompt: "You have lost.",
                nextText: -1
                
              },
            ]
        },     
  ]


startGame();












