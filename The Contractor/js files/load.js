//THIS FILE IS RESPONSIBLE FOR LOADING ALL VARIABLES, IMAGES, SOUND EFFECTS, AND LOADING IMAGES
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasContainer = document.querySelector(".canvas");
let GAME_WIDTH = 3000;
let GAME_HEIGHT = 3000;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const rDWidth = (window.innerWidth / 2) + 15;
const rDHeight = (window.innerHeight / 2) + 30;
let inMenu = false;
let inSettings = false;
let inGame = true;
let gamePaused = false;
let outside = true;
let inside = false;
let difficulty = 1;//star
let time = 300;
let contractItem = "Icon1"; //PLACEHOLDER
let contractItemCollected = false;
let code = "";

var player = {
  x: 100,
  y: 100,
  width: 30,
  height: 80,
  direction: 1,
  health: 5, //Hearts
  alive: true,
  attacking: false,
  defending: false,
  stamina: 50,
  relaxed: true,
  maxStamina: 50,
  range: 70,
  speed: 2.5, //TEMPORARY, CHANGE TO 2.5 AFTER DONE
  damage: 20,
  magic: 0,
  coins: 0,
};

let enemies = [
  {
    type: 'PLACEHOLDER',
    x: 101010,
    y: 101010,
    health: 50,
  },
];
let arrows = [];
var ForestEnemies = {
  Slime: 2,
  Skeleton: 1,
  Bugs: 4,
  Child: 1,
}
var WinterEnemies = {}

let EnterFlag = true;
let EscapeFlag = true;
document.addEventListener("keydown", (e) => {
   if (gamePaused) return;
  if(e.key === "w")moving.w = true;
  if(e.key === "a")moving.a = true;
  if(e.key === "s")moving.s = true;
  if(e.key === "d")moving.d = true;
  if(e.key === " ")moving.space = true;
  if(e.key === "Enter" && EnterFlag === true){moving.enter = true; EnterFlag = false}
  if(e.key === "Escape" && EscapeFlag === true){moving.escape = true; EscapeFlag = false}
});
document.addEventListener("keyup", (e) => {
   if (gamePaused) return;
  if(e.key === "w")moving.w = false;
  if(e.key === "a")moving.a = false;
  if(e.key === "s")moving.s = false;
  if(e.key === "d")moving.d = false;
  if(e.key === " ")moving.space = false;
  if(e.key === "Enter"){moving.enter = false; EnterFlag = true};
  if(e.key === "Escape"){moving.escape = false; EscapeFlag = true}
});
let moving = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false,
  enter: false,
  escape: false,
};

function resizeCanvas(){
if(inMenu){    //WHEN IN MENU SET BOTH THE CONTAINER AND CANVAS TO THE SAME SIZE FOR CENTERING
  //unknown values
}
else if(inGame){
  canvasContainer.style.width = "100vw";
  canvasContainer.style.height = "100vh";
}
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Run once on startup

var biomes = ["Forest", "Winter", "Desert", "Underworld", "Thunderstorm"];//HAVE ENEMIES VARY BASED ON BIOME, MAKE SPAWNS RANDOM, BUT THE TIME THEY SPAWN AND AMOUNT DEPENDENT ON DIFFICULTY AND BIOME
var biome = biomes[0];

var grass_ruins = ["Water_ruins1", "Water_ruins2"];

var grass_trees = ["middle_lane_tree5", "middle_lane_tree2", "middle_lane_tree3", "jungle_tree_5"];
var winter_trees = []//INCLUDE WINTER TREES DOWNLOADED, CURRENTLY EMPTY

var walls = [];
let loot = []; //NEXT, INPUT THE SET ITEM THAT THE PLAYER HAS TO FIND IN THE CONTRACT, HAVE THE PLAYER SEARCH FOR IT INSIDE A BUILDING OF SOME SORT THAT THEY TELEPORT INTO, HAVE IT LITTERED WITH EITHER TRAPS OR ENEMIES, HAVE IT SEPARATE FOR LAG.

//WALL IN FOR LOOP WILL CHOSE A RANDOM TREE FROM THE BIOME/WORLD CHOSEN (FOR LOOP WILL BE IN 'loadGame()' FUNCTION ALONG WITH LOADING THE BIOMES!)

let inWalls = [
  {
    x: 0,
    y: 260,
    width: 540,
    height: 100,
  },
  {
    x: 690,
    y: 250,
    width: 360,
    height: 470,
  },
  {
    x: 690,
    y: 940,
    width: 360,
    height: 830,
  },
  {
    x: 0,
    y: 260,
    width: 160,
    height: 1700,
  },
  {
    x: 300,
    y: 260,
    width: 240,
    height: 470,
  },{
    x: 0,
    y: 940,
    width: 540,
    height: 310,
  },
  {
    x: 0,
    y: 1100,
    width: 190,
    height: 710,
  },
  {
    x: 0,
    y: 1810,
    width: 520,
    height: 190,
  },
  {
    x: 1210,
    y: 250,
    width: 550,
    height: 50,
  },
  {
    x: 1900,
    y: 250,
    width: 550,
    height: 50,
  },
  {
    x: 1210,
    y: 250,
    width: 190,
    height: 825,
  },
  {
    x: 1210,
    y: 780,
    width: 540,
    height: 295,
  },
  {
    x: 1900,
    y: 790,
    width: 540,
    height: 285,
  },
  {
    x: 1900,
    y: 1290,
    width: 540,
    height: 475,
  },
  {
    x: 1580,
    y: 1290,
    width: 170,
    height: 475,
  },
  {
    x: 1205,
    y: 1630,
    width: 550,
    height: 135,
  },
  {
    x: 20,
    y: 200,
    width: 50,
    height: 50,
  },
  {
    x: 740,
    y: 200,
    width: 50,
    height: 50,
  },
  {
    x: 1360,
    y: 100,
    width: 50,
    height: 50,
  },
  {
    x: 2390,
    y: 100,
    width: 50,
    height: 100,
  },
  {
    x: 300,
    y: 760,
    width: 40,
    height: 40,
  },
  {
    x: 690,
    y: 760,
    width: 40,
    height: 40,
  },
  {
    x: 540,
    y: 940,
    width: 40,
    height: 40,
  },
  {
    x: 1060,
    y: 600,
    width: 40,
    height: 20,
  },
  {
    x: 1060,
    y: 940,
    width: 40,
    height: 20,
  },
  {
    x: 1000,
    y: 890,
    width: 40,
    height: 20,
  },
  {
    x: 1210,
    y: 1100,
    width: 60,
    height: 30,
  },
  {
    x: 1210,
    y: 1300,
    width: 90,
    height: 80,
  },
  {
    x: 1500,
    y: 1300,
    width: 60,
    height: 40,
  },
  {
    x: 1420,
    y: 1460,
    width: 90,
    height: 80,
  },
  {
    x: 200,
    y: 1300,
    width: 200,
    height: 100,
  },
  {
    x: 270,
    y: 1600,
    width: 100,
    height: 90,
  },
  {
    x: 690,
    y: 1750,
    width: 40,
    height: 60,
  },
  {
    x: 1010,
    y: 1750,
    width: 40,
    height: 80,
  },
  {
    x: 1775,
    y: 490,
    width: 115,
    height: 75,
  },
  {
    x: 1480,
    y: 600,
    width: 95,
    height: 90,
  },
  {
    x: 2020,
    y: 320,
    width: 115,
    height: 35,
  },
  {
    x: 2080,
    y: 525,
    width: 90,
    height: 80,
  },
  {
    x: 1760,
    y: 920,
    width: 50,
    height: 40,
  },
]; 
let sites = [
  {
    x: 360,
    y: 1340,
    width: 60,
    height: 120,
    type: "",//This is box
  },
  {
    x: 220,
    y: 1340,
    width: 60,
    height: 120,
    type: "",//This is box
  },
  {
    x: 280,
    y: 1600,
    width: 120,
    height: 120,
    type: "",//This is box
  },
  {
    x: 690,
    y: 1775,
    width: 50,
    height: 65,
    type: "",//This is box
  },
  {
    x: 1205,
    y: 1100,
    width: 80,
    height: 65,
    type: "",//This is box
  },
  {
    x: 1205,
    y: 1310,
    width: 120,
    height: 100,
    type: "",//This is box
  },
  {
    x: 1500,
    y: 1290,
    width: 80,
    height: 65,
    type: "",//This is box
  },
  {
    x: 1400,
    y: 1450,
    width: 120,
    height: 100,
    type: "",//This is box
  },
  {
    x: 2090,
    y: 530,
    width: 50,
    height: 110,
    type: "",//This is box
  },
  {
    x: 2150,
    y: 530,
    width: 50,
    height: 50,
    type: "",//This is box
  },
  {
    x: 1780,
    y: 490,
    width: 135,
    height: 110,
    type: "",//This is box
  },
  {
    x: 1490,
    y: 600,
    width: 115,
    height: 120,
    type: "",//This is box
  },
  {
    x: 2030,
    y: 320,
    width: 140,
    height: 75,
    type: "",//This is box
  },
  {
    x: 2370,
    y: 110,
    width: 50,
    height: 100,
    type: "",//This is box
  },
  {
    x: 290,
    y: 1400,
    width: 60,
    height: 60,
    type: "",//This is chest
  },
  {
    x: 1325,
    y: 1100,
    width: 80,
    height: 65,
    type: "",//This is chest
  },
  {
    x: 1425,
    y: 1570,
    width: 50,
    height: 50,
    type: "",//This is chest
  },
  {
    x: 2350,
    y: 1795,
    width: 50,
    height: 50,
    type: "",//This is chest
  },
  {
    x: 2380,
    y: 1100,
    width: 50,
    height: 50,
    type: "",//This is chest
  },
  {
    x: 200,
    y: 375,
    width: 60,
    height: 60,
    type: "",//This is chest
  },
  {
    x: 200,
    y: 375,
    width: 60,
    height: 60,
    type: "",//This is chest
  },
  {
    x: 2150,
    y: 610,
    width: 50,
    height: 50,
    type: "",//This is chest
  },
  {
    x: 1560,
    y: 325,
    width: 50,
    height: 50,
    type: "",//This is chest
  },
];//THESE ARE THE DUNGEON'S WALLS and OBJECTS
let permittedDigits = "1234567890qwertyuiopoasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
let letters = "ABCDE";
let letterCode;

let puzzles = []; //Have puzzle names in here, choose random puzzle, create function that applies those puzzles to the sites randomly.

function determinePuzzle(){ //14 BOXES, 9 CHESTS
  if(difficulty === 1){
    code = Math.floor(Math.random() * (9999 - 1000) + 1000);
    let chosenBox = Math.floor(Math.random() * 14);
    let chosenChest = Math.floor(Math.random() * ((sites.length - 1) - 15) + 15);
    sites[chosenBox].type = "box";
    sites[chosenBox].text = `The code is: ${code}`
    sites[chosenChest].type = "chest";
  }
  else if(difficulty === 2){
    code = Math.floor(Math.random() * (9999 - 1000) + 1000);
    let chosenChest = Math.floor(Math.random() * ((sites.length - 1) - 15) + 15);
    sites[chosenChest].type = "chest";
    for(var i = 0; i < 4; i++){
      let chosenBox = Math.floor(Math.random() * 14);
      if(sites[chosenBox].type !== "box"){
        sites[chosenBox].type = "box";
        sites[chosenBox].text = `The ${i + 1} number in the code is ${String(code)[i]}`;
      }
      else {
        i--
      }
    }
  }
  else if(difficulty === 3){
    code = "";
    for(var n = 0; n < 8; n++){
      let num = Math.floor(Math.random() * permittedDigits.length);
      code += permittedDigits[num];
    }
    let chosenChest = Math.floor(Math.random() * ((sites.length - 1) - 15) + 15);
    sites[chosenChest].type = "chest";
    for(var i = 0; i < 8; i++){
      let chosenBox = Math.floor(Math.random() * 14);
      if(sites[chosenBox].type !== "box"){
        sites[chosenBox].type = "box";
        sites[chosenBox].text = `The ${i + 1} digit in the code is ${String(code)[i]}`;
      }
      else {
        i--
      }
    }
  }
  else if(difficulty === 4){
    code = Math.floor(Math.random() * (99999 - 10000) + 10000);
    letterCode = letters.split('').sort(() => Math.random() - 0.5).join('');
    let chosenChest = Math.floor(Math.random() * ((sites.length - 1) - 15) + 15);
    sites[chosenChest].type = "chest";
    for(var i = 0; i < 6; i++){
      let chosenBox = Math.floor(Math.random() * 14);
      if(sites[chosenBox].type !== "box" && i !== 5){
        sites[chosenBox].type = "box";
        sites[chosenBox].text = `${letterCode[i]} = ${String(code)[i]}`;
      }
      else if(sites[chosenBox].type === "box" && i !== 5) {
        i--
      }
      if(sites[chosenBox].type !== "box" && i === 5){
        sites[chosenBox].type = "box";
        sites[chosenBox].text = `The code is ${letterCode}`;
      }
      else if(sites[chosenBox].type === "box" && i === 5){
        i--
      }
   }
 }
 else if(difficulty === 5){
    code = Math.floor(Math.random() * (99999 - 10000) + 10000);
    letterCode = letters.split('').sort(() => Math.random() - 5).join('');
    let chosenChest = Math.floor(Math.random() * ((sites.length - 1) - 15) + 15);
    sites[chosenChest].type = "chest";
    for(var i = 0; i < 6; i++){
      let chosenBox = Math.floor(Math.random() * 14);
      if(sites[chosenBox].type !== "box" && i !== 5){
        sites[chosenBox].type = "box";
        sites[chosenBox].text = `${letterCode[i]} = ${String(code)[i]}`;
      }
      else if(sites[chosenBox].type === "box" && i !== 5) {
        i--
      }
      if(sites[chosenBox].type !== "box" && i === 5){
        sites[chosenBox].type = "box";
        sites[chosenBox].text = `The code is ${letterCode[0]}${letterCode[1]}${letterCode[2]}__`;
      }
      else if(sites[chosenBox].type === "box" && i === 5){
        i--
      }
   }
 }
}

function determineMission(){
  switch (difficulty) {
    case 1:
    $(".missions").text("Mission: Search for the box with the code to the chest and retrieve the contract item.");
    break;
    case 2:
    $(".missions").text("Mission: Search four boxes with the code to the chest and retrieve the contract item.");
    break;
    case 3:
    $(".missions").text("Mission: Search eight boxes with the code to the chest and retrieve the contract item.");
    break;
    case 4:
    $(".missions").text("Search the boxes for clues to the code in the chest.");
    break;
    case 5:
    $(".missions").text("Search the boxes for clues to the broken code in the chest.");
    break;
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - IMAGES AND SOUNDS - - - - - - - - - - - - - - - - - - - - - - - - - - -

function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

const ground = new Image();
ground.src = `Sprites/World/${biome}.png`;  //WORK ON NEW GROUND IMAGES, used to be too small, now it's larger but glitched because of how it was all copied together.
const playerWalk = {
  animation: loadImage("Sprites/Knight/Idle.png"),
  delay: 3,
  maxDelay: player.speed * 2,
  frame: 0,
  frameWidth: 129,
  frameHeight: 129,
  totalFrames: 8,
}
const playerSprites = {
walk: loadImage("Sprites/Knight/Walk.png"),
idle: loadImage("Sprites/Knight/Idle.png"),
defend: loadImage("Sprites/Knight/Defend.png"),
attack: loadImage("Sprites/Knight/Attack_1.png"),
dead: loadImage("Sprites/Knight/Dead.png"),
magic: loadImage("Sprites/Knight/Attack_3.png"),
};
const skeletonSprites = {
  animation: loadImage("Sprites/Enemy/Skeleton/Idle.png"),
  idle: loadImage("Sprites/Enemy/Skeleton/Idle.png"),
  walk: loadImage("Sprites/Enemy/Skeleton/Walk.png"),
  shot: loadImage("Sprites/Enemy/Skeleton/Shot.png"),
  arrow: loadImage("Sprites/Enemy/Skeleton/Arrow.png"),
  dead: loadImage("Sprites/Enemy/Skeleton/Dead.png"),
}
const arrowImg = new Image();
arrowImg.src = "Sprites/Enemy/Skeleton/Arrow.png";
const slimeImg = new Image();
slimeImg.src = "Sprites/Enemy/Slime.png";
const bugsImg = new Image();
bugsImg.src = "Sprites/Enemy/Bees.png";
const bugsSprite = {
  delay: 2,
  maxDelay: 2,
  frame: 0,
  frameWidth: 200,
  frameHeight: 200,
  totalFrames: 8,
}
const childImg = new Image();
childImg.src = "Sprites/Enemy/Child.png";

//- - - - - - - - - - - - - - - - - - - - - - - - - - FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//INVENTORY
let inventory = [];
let n = 1;
let inventoryDiv = $(".inventory");
let inventorySlots = 3;
for(var i = 0; i < inventorySlots; i++){
  var $newSlot = $("<div>").addClass("slot").appendTo(".inventory");
  $("<img>").appendTo($newSlot);
  $("<h1>").appendTo($newSlot);
}

$(".inventory .slot").on("click", function() {
  var $slot = $(this).index();
      let item = {
      x: player.x,
      y: player.y - 50,
      cost: inventory[$slot].cost,
    }
    const img2 = new Image();
    img2.src = `Sprites/World/Loot/${inventory[$slot].identification}.png`;
    img2.onload = () => {
      item.type = img2;
      item.identification = inventory[$slot].identification;
    item.width = img2.naturalWidth;
    item.height = img2.naturalHeight;
    loot.push(item);
    }

    setTimeout(() => {
        inventory[$slot] = undefined;
        $(`.inventory .slot:nth-child(${$slot + 1}) h1`).text("");
        drawInInventory();
    }, 100);
});

function isInventoryOpen(){
  var openSlots = [];
  for(var i = 0; i < inventorySlots; i++){
    if(inventory[i] === undefined || inventory[i] === ""){
      openSlots.push(i);
    }
  }
  if(openSlots.length > 0){
    return true
  }
  else return false;
}

function addToInventory(item){
  var openSlots = [];
  for(var i = 0; i < inventorySlots; i++){
    if(inventory[i] === undefined || inventory[i] === ""){
      openSlots.push(i);
    }
  }
  inventory[openSlots[0]] = item;
}

function drawInInventory(){
  for(var i = 0; i < inventorySlots; i++){
    if(inventory[i] !== undefined){
      $(`.inventory .slot:nth-child(${i + 1}) img`).css("display", "block").attr("src", `Sprites/World/Loot/${inventory[i].identification}.png`);
      $(`.inventory .slot:nth-child(${i + 1}) h1`).text(inventory[i].cost + "$");
    }
    else {
      $(`.inventory .slot:nth-child(${i + 1}) img`).css("display", "none").attr("src", "");
    }
  }
}

//HEARTS
function drawHearts(){
  $(".hearts").empty();
  for(var i = 0; i < player.health; i++){
    var $heart = $("<div>").addClass("heart").appendTo(".hearts");
    $("<img>").attr("src", "Sprites/HUD/Heart.png").appendTo($heart);
  }
  if(player.health <= 0){
    player.alive = false;
    playerWalk.delay = playerWalk.maxDelay;
    playerWalk.totalFrames = 5;
    playerWalk.frame = 0;
  }
}
drawHearts();

//ATTACK

$("#canvas").on("click", () => {
  if(player.stamina > 24 && player.alive && !moving.w && !moving.a && !moving.s && !moving.d){
    player.attacking = true;
    player.defending = false;
    player.relaxed = false;
  playerWalk.frame = 0;
  playerWalk.totalFrames = 5;
  playerWalk.maxDelay = 2;
  player.stamina -= 25;
  player.stamina = Math.max(player.stamina, 0);
  setTimeout(() => {
    player.relaxed = true;
  }, 2500);
  enemies.forEach(enemy => {
    if(player.x + player.width + player.range > enemy.x &&
        player.x - player.range < enemy.x + enemy.width &&
        player.y + player.height + player.range > enemy.y &&
        player.y - player.range < enemy.y + enemy.height && enemy.type === "Slime"
      ){
        enemy.health -= player.damage;
        enemy.speed *= -10;
        setTimeout(() => {
          enemy.speed *= -0.1;
        }, 1000);
      }
      
      if(player.x + player.width + player.range > enemy.x &&
        player.x - player.range < enemy.x + enemy.width &&
        player.y + player.height + player.range > enemy.y &&
        player.y - player.range < enemy.y + enemy.height && enemy.type === "Skeleton"
      ){
        enemy.awake = false;
        enemy.frame = 0;
        setTimeout(() => {
          enemy.awake = true;
        }, 17000);
      }
  });
  }
});

function checkCollision(x ,y){
  return walls.some(wall =>
    Math.abs(wall.x - x) < 200 &&
    Math.abs(wall.y - y) < 200 &&
    x + player.width > wall.x &&
    x < wall.x + wall.width &&
    y + player.height > wall.y &&
    y < wall.y + wall.height
  );
};
function checkEntrance(x, y){
  return walls.some(wall =>
    Math.abs(wall.x - x) < 200 &&
    Math.abs(wall.y - y) < 200 &&
    (x + player.width) + 20 > wall.x &&
    x - 20 < wall.x + wall.width &&
    (y + player.height) + 20 > wall.y &&
    y - 20 < wall.y + wall.height && wall.entrance
  );
}
function checkCollisionInside(x ,y){
  return inWalls.some(wall =>
    x + player.width > wall.x &&
    x < wall.x + wall.width &&
    y + player.height > wall.y &&
    y < wall.y + wall.height
  );
};
function checkExit(){
  return player.x + player.width > 100 &&
  player.x < 140 &&
  player.y + player.height > 50 &&
  player.y < 130
}
function checkBeacon(x, y){
  return walls.some(wall =>
    Math.abs(wall.x - x) < 200 &&
    Math.abs(wall.y - y) < 200 &&
    (x + player.width) + 20 > wall.x &&
    x - 20 < wall.x + wall.width &&
    (y + player.height) + 20 > wall.y &&
    y - 20 < wall.y + wall.height && wall.exit
  );
}

function loadGame(){  //MAKE A 5 OR 6 MINUTE TIMER FOR EVERY MISSION TO MAKE THE GAME MORE PRESSURIZED
  for(var i = 0; i < 50; i++){
    let num = Math.floor(Math.random() * grass_trees.length);
    let wall = {
      x: Math.floor(Math.random() * (GAME_WIDTH - 50) + 50),
      y: Math.floor(Math.random() * (GAME_HEIGHT - 100) + 100),
    }
    const img = new Image();
  img.src = `Sprites/World/Trees/${grass_trees[num]}.png`;
  img.onload = () => {
    wall.type = img;
  wall.imgYOffset = img.naturalHeight / 2;
  wall.width = img.naturalWidth - 30;
  wall.height = img.naturalHeight - wall.imgYOffset;
  wall.imgW = img.naturalWidth;
  wall.imgH = img.naturalHeight;
  }

  walls.push(wall);
  }
  let num = Math.floor(Math.random() * grass_ruins.length);
  let ruin = {
    x: Math.floor(Math.random() * (GAME_WIDTH - 50) + 50),
    y: Math.floor(Math.random() * (GAME_HEIGHT - 100) + 100),
    entrance: true,
  }
  const img = new Image();
  img.src = `Sprites/World/Ruins/${grass_ruins[num]}.png`;
  img.onload = () => {
    ruin.type = img;
  ruin.imgYOffset = (img.naturalHeight * 2) / 2;
  ruin.width = (img.naturalWidth * 2) - 30;
  ruin.height = (img.naturalHeight * 2) - ruin.imgYOffset;
  ruin.imgW = img.naturalWidth * 2;
  ruin.imgH = img.naturalHeight * 2;
  }
  walls.push(ruin);

  //CREATE THE LOOT FIRST, THEN MAKE THE FUNCTION THAT CHECKS IF THEY'RE STUCK IN ANYTHING
  //HAVE LOOT AMOUNT DEPENDENT ON HOW BIG MAP IS, AND HAVE COST BASED ON THE DIFFICULTY
  setTimeout(() => {
    for(var l = 0; l < 4 + difficulty; l++){
    let group = Math.floor(Math.random() * 3);
    let number = Math.floor(Math.random() * 48 + 1);
    let item = {
      x: Math.floor(Math.random() * GAME_WIDTH),
      y: Math.floor(Math.random() * GAME_HEIGHT),
      cost: (7 * difficulty) + Math.floor(Math.random() * 25),
    }
    const img2 = new Image();
    img2.src = `Sprites/World/Loot/${group}/Icon${number}.png`;
    img2.onload = () => {
      item.type = img2;
      item.identification = `${group}/Icon${number}`
    item.width = img2.naturalWidth;
    item.height = img2.naturalHeight;
    }
    walls.forEach(wall => {
      if(item.x + item.width > wall.x &&
         item.x < wall.x + wall.width &&
         item.y + item.height > wall.y &&
         item.y < wall.y + wall.height
      ){
        item.x = Math.floor(Math.random() * GAME_WIDTH);
        item.y = Math.floor(Math.random() * GAME_HEIGHT);
      }
    });
    
    loot.push(item);
   }
  }, 2000);

  setTimeout(() => {
    let setBiome = (biome === "Forest") ? ForestEnemies : WinterEnemies;
    for(var i = 0; i < setBiome.Slime; i++){ //SLIME IF IN FOREST
      var enemy = {
      type: 'Slime',
    x: Math.floor(Math.random() * (GAME_WIDTH - 400) + 400),
    y: Math.floor(Math.random() * (GAME_HEIGHT - 400) + 400),
    speed: difficulty,
    damage: 2,
    alive: true,
    hurt: false,
    health: 80,
    };
  enemy.src = slimeImg;
enemy.width = slimeImg.naturalWidth;
enemy.height = slimeImg.naturalHeight;
enemies.push(enemy);
    }
    setTimeout(() => {
      var child = {
        type: "Child",
        x: Math.floor(Math.random() * (GAME_WIDTH - 1000) + 1000),
        y: Math.floor(Math.random() * (GAME_HEIGHT - 1000) + 1000),
        speed: 1,
        health: 100,
        damage: 1,
        alive: true,
        stalking: true,
      }
      child.src = childImg;
      child.width = childImg.naturalWidth;
      child.height = childImg.naturalHeight;
      enemies.push(child);
    }, 100);
    setTimeout(() => {
      for(var b = 0; b < setBiome.Bugs; b++){ //BUGS IF IN FOREST, (REPLACE '1' with setBiome.Bugs LATER)
      var num = Math.floor(Math.random() * (walls.length - 1))
      var targetedTree = walls[num];
      var bug = {
        type: "Bees",
        x: targetedTree.x,
        y: targetedTree.y - 50,
        Hx: targetedTree.x,
        Hy: targetedTree.y - 50,
        damage: 1,
        health: 100,
        speed: player.speed,
        tick: 100,
        maxTick: 100,
      }
      bug.src = bugsImg;
      bug.width = bugsImg.naturalWidth / 8;
      bug.height = bugsImg.naturalHeight;
      enemies.push(bug);
    }
    //console.log(enemies);
    }, 500);
    setTimeout(() => {
      for(var i = 0; i < setBiome.Skeleton; i++){
        var skeleton = {
          type: "Skeleton",
          x: Math.floor(Math.random() * (GAME_WIDTH - 500) + 500),
          y: Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500),
          width: 129,
          height: 129,
          health: 1000,
          awake: true,
          damage: 1,
          speed: player.speed - 1,
          direction: -1,

          delay: 3,
          maxDelay: (player.speed - 1) * 2,
          frame: 0,
          frameWidth: 129,
          frameHeight: 89,
          totalFrames: 8,
        }

        enemies.push(skeleton);
      }
    }, 600);
  }, 2500);

}

function startGame(){
  //LOAD FUNCTION BEFORE THIS: SERVES AS THE MAIN GAME LOAD FUNCTION FOR BIOME, CHESTS, ITEMS, AND BUILDINGS/WALLS
  //THIS FUNCTIONS SETS ALL VALUES, MUST BE CALLED FIRST
  inGame = true;
  determinePuzzle();
  inventory = [];
  $(".missions").text("Search for the entrance to the dungeon and collect items for cash on the way.");
}
startGame();