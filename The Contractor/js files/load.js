//THIS FILE IS RESPONSIBLE FOR LOADING ALL VARIABLES, IMAGES, SOUND EFFECTS, AND LOADING IMAGES
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const groundcanvas = document.getElementById("groundcanvas");
const groundctx = groundcanvas.getContext("2d");
const canvasContainer = document.querySelector(".canvas");
let GAME_WIDTH = 3000;
let GAME_HEIGHT = 3000;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
groundcanvas.width = window.innerWidth;
groundcanvas.height = window.innerHeight;
const rDWidth = (window.innerWidth / 1.5);
const rDHeight = (window.innerHeight / 1.5);
let inMenu = true;
let inSettings = false;
let inGame = false;
let gamePaused = false;
let outside = false;
let inside = false;
let bossLevel = false;
let difficulty = 1;//star
let multiplier = 1;
let stars = 1;
let rating = 2;
let time = 300;
let contractItem = "Icon1"; //PLACEHOLDER
let contractItemCollected = false;
let code = "";
let days = 0;
let groundPattern = null;
const groundPatterns = {};

var player = {
  x: 100,
  y: 100,
  width: 30,
  height: 80,
  direction: 1,
  health: 5, //Hearts BRING TO 5 AFTER DONE
  maxHealth: 5,
  alive: true,
  attacking: false,
  magicAttacking: false,
  defending: false,
  left: false,
  frozenTime: 6, //seconds
  maxFrozenTime: 7,
  frozen: false,
  stamina: 50,
  relaxed: true,
  maxStamina: 50,
  range: 70,
  speed: 2.5, //TEMPORARY, CHANGE TO 2.5 AFTER DONE
  damage: 20,
  magic: 100,
  magicUsage: 50,
  maxMagic: 0,
  magicReady: true,
  coins: 100000, // CHANGE TO 0 AFTER DONE
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
  WinterSlime: 0,
  Skeleton: 1,
  Bugs: 4,
  Child: 1,
  Scorpion: 0,
  Tornado: 0,
  Spike: 0,
  Father: 0,
  Knight: 0,
}
var WinterEnemies = {
  Slime: 0,
  WinterSlime: 3,
  Skeleton: 1,
  Bugs: 0,
  Child: 1,
  Scorpion: 0,
  Tornado: 0,
  Spike: 0,
  Father: 0,
  Knight: 0,
}
var DesertEnemies = {
  Slime: 0,
  WinterSlime: 0,
  Skeleton: 1,
  Bugs: 0,
  Child: 0,
  Scorpion: 2,
  Tornado: 1,
  Spike: 2,
  Father: 0,
  Knight: 0,
}; //Will include skeletons, spike enemies of some sort, scorpions maybe, mirages, and a fire tornado
var UnderworldEnemies = { //Later add more unnerving enemies, like something bigger than the child named "The Father" that has a distorted chime when in range, then maybe try making an enemy knight that you have to fight, and maybe some baby black slimes that emerge from "The Father", as dangerous as the original slimes, easier to kill, Father doesn't attack himself just produces, and has high HP... There's also a chance for a child to spawn underneath you when in range of the Father
  Slime: 0,
  WinterSlime: 0,
  Skeleton: 2,
  Bugs: 0,
  Child: 0,
  Scorpion: 0,
  Tornado: 0,
  Spike: 0,
  Father: 1,
  Knight: 1,
}
var ThunderstormEnemies = {
  Slime: 2,
  WinterSlime: 0,
  Skeleton: 1,
  Bugs: 1,
  Child: 2,
  Scorpion: 0,
  Tornado: 0,
  Spike: 0,
  Father: 0,
  Knight: 0,
} //Same enemies as ForestEnemies, but low visibility with rain and maybe two children

let shop = [
  {
    name: "Energy Potion",
    description: "Improves Stamina",
    cost: 50,
    src: "Icons/shop/Icon7.png",
    purchase: function() {
      player.maxStamina += 50;
      player.stamina = player.maxStamina;
    },
  },
  {
    name: "Health Potion",
    description: "Adds and extra heart",
    cost: 50,
    src: "Icons/shop/Icon1.png",
    purchase: function() {
      player.maxHealth++
      player.health = player.maxHealth;
    },
  },
  {
    name: "Magic Potion",
    description: "Increases Magic (F to Use)",
    cost: 150,
    src: "Icons/shop/Icon12.png",
    purchase: function() {
      player.maxMagic += 50;
      player.magic = player.maxMagic;
    },
  },
  {
    name: "Magic Potion Aid",
    description: "Decreases Magic takeaway per use",
    cost: 50,
    src: "Icons/shop/Icon11.png",
    purchase: function() {
      player.magicUsage -= 20;
    },
  },
  {
    name: "Long Potion",
    description: "Increases Range",
    cost: 75,
    src: "Icons/shop/Icon14.png",
    purchase: function() {
      player.range += 50;
    },
  },
  {
    name: "Strength Portion",
    description: "Increases Damage",
    cost: 50,
    src: "Icons/shop/Icon44.png",
    purchase: function() {
      player.damage += 30;
    },
  },
  {
    name: "Warmth Portion",
    description: "Decreases time frozen(Winter Biome)",
    cost: 25,
    src: "Icons/shop/Icon13.png",
    purchase: function() {
      player.maxFrozenTime -= 15;
      player.frozenTime = player.maxFrozenTime;
    },
  },
]

let EnterFlag = true;
let EscapeFlag = true;
document.addEventListener("keydown", (e) => {
   if (gamePaused || player.frozen) return;
  if(e.key === "w")moving.w = true;
  if(e.key === "a")moving.a = true;
  if(e.key === "s")moving.s = true;
  if(e.key === "d")moving.d = true;
  if(e.key === " ")moving.space = true;
  if(e.key === "Enter" && EnterFlag === true){moving.enter = true; EnterFlag = false}
  if(e.key === "Escape" && EscapeFlag === true){moving.escape = true; EscapeFlag = false}
  if(e.key === "f" && !moving.w && !moving.a && !moving.s && !moving.d && player.magic >= player.magicUsage && player.magicReady && outside){ //MAGIC
    SFX.explosion.currentTime = 0;
    SFX.explosion.play();
    player.magic -= player.magicUsage;
    player.magic = Math.max(player.magic, 0);
    player.magicAttacking = true;
    magicAttack();
    player.health++
    drawHearts();
    player.stamina = player.maxStamina;
    $(".explosion").addClass("explosionAnim");
    $(".magic").css("opacity", 0.5);
    player.magicReady = false;
    setTimeout(() => {
      $(".explosion").removeClass("explosionAnim");
      player.magicAttacking = false;
    }, 1500);
    setTimeout(() => {
      player.magicReady = true;
      $(".magic").css("opacity", 1);
    }, 12000)
  }
});
document.addEventListener("keyup", (e) => {
   if (gamePaused || player.frozen) return;
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
var biome = biomes[1];

var grass_ruins = ["Water_ruins1", "Water_ruins2"];

var grass_trees = ["middle_lane_tree5", "middle_lane_tree2", "middle_lane_tree3", "jungle_tree_5"];
var winter_trees = ["winter_conifer_tree_1", "winter_conifer_tree_2", "winter_conifer_tree_3", "winter_conifer_tree_4", "winter_conifer_tree_5"];//INCLUDE WINTER TREES DOWNLOADED, CURRENTLY EMPTY
var underworld_trees = ["fir_tree_10", "fir_tree_11", "jungle_tree_5", "jungle_tree_12", "middle_lane_tree10", "middle_lane_tree11"];
var desert_trees = ["group_cactus", "Tall_cactus", "short_cactus"];

var walls = [];
let loot = []; //NEXT, INPUT THE SET ITEM THAT THE PLAYER HAS TO FIND IN THE CONTRACT, HAVE THE PLAYER SEARCH FOR IT INSIDE A BUILDING OF SOME SORT THAT THEY TELEPORT INTO, HAVE IT LITTERED WITH EITHER TRAPS OR ENEMIES, HAVE IT SEPARATE FOR LAG.

var thunder;
setInterval(() => {
  thunder = Math.random();
  if(biome === "Thunderstorm" && outside){
    $(".light").addClass("lightning");
    if(thunder < 0.3)ambience.thunder1.currentTime = 0; ambience.thunder1.play();
    if(thunder > 0.3 && thunder < 0.6)ambience.thunder2.currentTime = 0; ambience.thunder2.play();
    if(thunder > 0.6)ambience.thunder3.currentTime = 0; ambience.thunder3.play();
    setTimeout(() => {
      $(".light").removeClass("lightning");
    }, 600);
  }
}, 14000)

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

function determinePuzzle(){ //14 BOXES, 9 CHESTS
  sites.forEach(site => {
    site.type = "";
  });
  if(Number(difficulty) === 1){
    code = Math.floor(Math.random() * (9999 - 1000) + 1000);
    let chosenBox = Math.floor(Math.random() * 14);
    let chosenChest = Math.floor(Math.random() * (sites.length - 16) + 16);
    sites[chosenBox].type = "box";
    sites[chosenBox].text = `The code is: ${code}`
    sites[chosenChest].type = "chest";
  }
  else if(Number(difficulty) === 2){
    code = Math.floor(Math.random() * (9999 - 1000) + 1000);
    let chosenChest = Math.floor(Math.random() * (sites.length - 16) + 16);
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
  else if(Number(difficulty) === 3){
    code = "";
    for(var n = 0; n < 8; n++){
      let num = Math.floor(Math.random() * permittedDigits.length);
      code += permittedDigits[num];
    }
    let chosenChest = Math.floor(Math.random() * (sites.length - 16) + 16);
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
  else if(Number(difficulty) === 4){
    code = Math.floor(Math.random() * (99999 - 10000) + 10000);
    letterCode = letters.split('').sort(() => Math.random() - 0.5).join('');
    let chosenChest = Math.floor(Math.random() * (sites.length - 16) + 16);
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
 else if(Number(difficulty) === 5){
    code = Math.floor(Math.random() * (99999 - 10000) + 10000);
    letterCode = letters.split('').sort(() => Math.random() - 5).join('');
    let chosenChest = Math.floor(Math.random() * (sites.length - 16) + 16);
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

 console.log(sites)
}

function determineMission(){
  switch (Number(difficulty)) {
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
function loadAudio(src) {
    const audio = new Audio();
    audio.src = src;
    return audio;
}
function clearAmbience(){
  for(var key in ambience){
    var sound = ambience[key];

    sound.pause();
    sound.currentTime = 0;
  }
}
function allSoundStop(){
  for(var key in ambience){
    var sound = ambience[key];

    sound.pause();
    sound.currentTime = 0;
  }
  for(var j in SFX){
    var s = SFX[j];

    s.pause();
    s.currentTime = 0;
  }
  for(var o in monsters){
    var so = monsters[o];

    so.pause();
    so.currentTime = 0;
  }
}

const SFX = {
  miss: loadAudio("SFX/woosh-230554.mp3"),
  hit: loadAudio("SFX/fast-body-fall-impact-352725.mp3"),
  defend: loadAudio("SFX/sword-deflection-the-ballad-of-the-blades-255962.mp3"),
  hurt: loadAudio("SFX/retro-hurt-2-236675.mp3"),
  contractItemCollect: loadAudio("SFX/pick-up-sfx-38516.mp3"),
  itemCollect: loadAudio("SFX/item-equip-6904.mp3"),
  paper: loadAudio("SFX/crumple-03-40747 (1).mp3"),
  enter: loadAudio("SFX/closing-metal-door-44280.mp3"),
  computerOpen: loadAudio("SFX/menu-open-sound-effect-432999.mp3"),
  computerClick: loadAudio("SFX/click-409642.mp3"),
  menuClick: loadAudio("SFX/menu-button-88360.mp3"),
  explosion: loadAudio("SFX/large-underwater-explosion-190270.mp3"),
}
const monsters = {
  childGiggle: loadAudio("SFX/cute-child-giggle-383731.mp3"),
  childYell: loadAudio("SFX/haunted-ghost-baby-crying-3-184016.mp3"),
  father: loadAudio("SFX/creepy-laugh-97997.mp3"),
  skeleton: loadAudio("SFX/arrow-twang_01-306041.mp3"),
  winterSlime: loadAudio("SFX/ice-freezing-445024.mp3"),
  tornado: loadAudio("SFX/fire-366936.mp3"),
  bees: loadAudio("SFX/bees-swarming-98657.mp3"),
}
monsters.bees.loop = true;
monsters.bees.volume = 0.3;
monsters.tornado.loop = true;
const ambience = {
  forest: loadAudio("SFX/outside-ambience-29767.mp3"),
  winter: loadAudio("SFX/blizzard-445020.mp3"),
  desert: loadAudio("SFX/desert-wind-2-350417.mp3"),
  dungeon: loadAudio("SFX/dungeon-air-6983 (1).mp3"),
  underworld: loadAudio("SFX/creepy-vocal-ambience-6074.mp3"),
  rain: loadAudio("SFX/calming-rain-257596.mp3"),
  thunder1: loadAudio("SFX/big-thunder-clap-99753.mp3"),
  thunder2: loadAudio("SFX/loud-thunder-439064.mp3"),
  thunder3: loadAudio("SFX/loud-thunder-sound-effect-359272.mp3"),
}
ambience.underworld.volume = 0.2;
ambience.rain.volume = 0.2;
for(var key in ambience){
  if(key !== "thunderstorm1" && key !== "thunderstorm2" && key !== "thunderstorm3"){
  key.loop = true;
  }
}

$("#introVideo").on('ended', () => {
  $(".intro").addClass("fade-out");
  setTimeout(() => {
    ambience.rain.play();
    ambience.forest.play();
    $(".intro").remove();
  }, 3000);
});

const grounds = {
  Forest: loadImage("Sprites/World/Forest.png"),
  Thunderstorm: loadImage("Sprites/World/Forest.png"),
  Winter: loadImage("Sprites/World/Winter.png"),
  Underworld: loadImage("Sprites/World/Underworld.png"),
  Desert: loadImage("Sprites/World/Desert.png"),
  Dungeon: loadImage("Sprites/World/Dungeon.jpg")
}

var ground = grounds.grass; 
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
frozen: loadImage("Sprites/Knight/Frozen.png"),
};
const skeletonSprites = {
  animation: loadImage("Sprites/Enemy/Skeleton/Idle.png"),
  idle: loadImage("Sprites/Enemy/Skeleton/Idle.png"),
  walk: loadImage("Sprites/Enemy/Skeleton/Walk.png"),
  shot: loadImage("Sprites/Enemy/Skeleton/Shot.png"),
  arrow: loadImage("Sprites/Enemy/Skeleton/Arrow.png"),
  dead: loadImage("Sprites/Enemy/Skeleton/Dead.png"),
}
const scorpionImg = {
  animation: loadImage("Sprites/Enemy/Scorpion/Scorpio_walk.png"),
  walk: loadImage("Sprites/Enemy/Scorpion/Scorpio_walk.png"),
  death: loadImage("Sprites/Enemy/Scorpion/Scorpio_death.png"),
  attack: loadImage("Sprites/Enemy/Scorpion/Scorpio_attack.png"),
}
const tornadoImg = loadImage("Sprites/Enemy/Tornado.png");
const spikeImg = loadImage("Sprites/Enemy/Spike.png");
const fatherImg = loadImage("Sprites/Enemy/The_Father.png");
const blackSlimeImg = loadImage("Sprites/Enemy/BlackSlime.png");
const arrowImg = new Image();
arrowImg.src = "Sprites/Enemy/Skeleton/Arrow.png";
const slimeImg = new Image();
slimeImg.src = "Sprites/Enemy/Slime.png";
const winterslimeImg = new Image();
winterslimeImg.src = "Sprites/Enemy/WinterSlime.png";
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

$(".inventory").on("click", ".slot", function() {
  console.log("woring")
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
  for(var i = 0; i < Math.ceil(player.health); i++){
    var $heart = $("<div>").addClass("heart").appendTo(".hearts");
    $("<img>").attr("src", "Sprites/HUD/Heart.png").appendTo($heart);
  }
  if(player.health <= 0 && player.alive){
    player.alive = false;
    contractItemCollected = false;
    playerWalk.delay = playerWalk.maxDelay;
    playerWalk.totalFrames = 5;
    playerWalk.frame = 0;
    setTimeout(() => {
      $(".transitionScreen").css("top", "0%").addClass("fade-in");
      setTimeout(() => {
        $(".transitionScreen h1").addClass("fade-in-quick").text("YOU DIED");
        $(".blizzard").css("opacity", 0);
        $(".rain").css("opacity", 0);
        allSoundStop();
        setTimeout(() => {
          $(".transitionScreen").css("top", "100%").removeClass(".fade-in");
          $(".transitionScreen").css("top", "0%").addClass("fade-out");
        }, 3000);
      }, 3000);
      setTimeout(() => {
        days++
        outside = false;
        inside = false;
        inMenu = true;
        inGame = false;
        walls = [];
        loot = [];
        enemies = [
          {
    type: 'PLACEHOLDER',
    x: 101010,
    y: 101010,
    health: 50,
  },
        ];
        code = "";
        contractItemCollected = false;
        contractItem = "";
        $('.menu').css("z-index", 5);
        $(".canvas").css("z-index", -1);
        $(".HUD").css("z-index", -1);
        $(".flashlight").css("opacity", 0);
        for(var i = 0; i < sites.length - 1; i++){
          sites[i].type = "";
        }
        rating -= multiplier;
        rating = Math.max(rating, 1);
        stars = Math.floor(rating / 2);
        stars = Math.max(stars, 1);
      }, 4500);
      setTimeout(() => {
        $(".transitionScreen").css("top", "100%").removeClass(".fade-out");
        $(".transitionScreen h1").removeClass("fade-in-quick").text("");
        //console.log(difficulty)
      }, 9000);
    }, 3000)
  }
}
drawHearts();

//ATTACK

$("#canvas").on("click", () => {
  if(player.stamina > 24 && player.alive && !moving.w && !moving.a && !moving.s && !moving.d && !player.frozen){
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
  SFX.miss.currentTime = 0;
  SFX.miss.play();
  enemies.forEach(enemy => {
    if(player.x + player.width + player.range > enemy.x &&
        player.x - player.range < enemy.x + enemy.width &&
        player.y + player.height + player.range > enemy.y &&
        player.y - player.range < enemy.y + enemy.height
      ){
        SFX.hit.currentTime = 0;
        SFX.hit.play();
        if(enemy.type === "Slime" || enemy.type === "WinterSlime" || enemy.type === "blackSlime"){
          enemy.health -= player.damage;
        enemy.speed *= -10;
        setTimeout(() => {
          enemy.speed *= -0.1;
        }, 1000);
        }
        else if(enemy.type === "Skeleton"){
          enemy.awake = false;
        enemy.frame = 0;
        setTimeout(() => {
          enemy.awake = true;
        }, player.damage * 1000);
        }
        else if(enemy.type === "Spike"){
          enemy.x = Math.floor(Math.random() * (GAME_WIDTH - 500) + 500);
          enemy.y = Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500);
        }
        else if(enemy.type === "Scorpion" && enemy.awake){
          enemy.src = scorpionImg.death;
          enemy.awake = false;
          enemy.frame = 0;
          enemy.walking = false;
          enemy.totalFrames = 4;
          setTimeout(() => {
            enemy.health -= player.damage;
            enemy.src = scorpionImg.walk;
            enemy.x = Math.floor(Math.random() * (GAME_WIDTH - 500) + 500);
            enemy.y = Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500);
            enemy.awake = true;
            enemy.walking = true;
            enemy.totalFrames = 4;
          }, 600)
        }
        else if(enemy.type === "Knight"){
          if(!enemy.defending){
          enemy.health -= player.damage;
          enemy.forceMove = true;
          setTimeout(() => {
            enemy.forceMove = false;
          }, 2000);
        }
        else {
          SFX.defend.currentTime = 0;
          SFX.defend.play();
        }
        }
        else if(enemy.type === "Father"){
          enemy.x = Math.floor(Math.random() * (GAME_WIDTH - 500) + 500);
          enemy.y = Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500);
          removeBlackSlime();
        }
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

function magicAttack(){
  enemies.forEach(enemy => {
    if(player.x + player.width + ((window.innerWidth / 2) * 1.5) > enemy.x &&
        player.x - ((window.innerWidth / 2) * 1.5) < enemy.x + enemy.width &&
        player.y + player.height + ((window.innerHeight / 2) * 1.5) > enemy.y &&
        player.y - ((window.innerHeight / 2) * 1.5) < enemy.y + enemy.height
      ){
        enemy.health -= player.damage * 2;
        if(enemy.type === "Slime"){
        enemy.speed *= -10;
        setTimeout(() => {
          enemy.speed *= -0.2;
        }, 10000);
        }
        if(enemy.type === "Bees"){
          enemy.x = enemy.Hx;
          enemy.y = enemy.Hy;
          enemy.speed -= 0.5;
        }
        if(enemy.type === "Child"){
          enemy.x = Math.floor(Math.random() * (GAME_WIDTH - 1000) + 1000);
          enemy.y = Math.floor(Math.random() * (GAME_HEIGHT - 1000) + 1000);
        }
        if(enemy.type === "Skeleton"){
        enemy.awake = false;
        enemy.afraid = true;
        enemy.frame = 0;
        setTimeout(() => {
          enemy.awake = true;
        }, player.damage * 1000);
       }
       if(enemy.type === "Father"){
        enemy.x = Math.floor(Math.random() * (GAME_WIDTH - 500) + 500);
          enemy.y = Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500);
          removeBlackSlime();
       }
       if(enemy.type === "Spike"){
        enemy.x = Math.floor(Math.random() * (GAME_WIDTH - 500) + 500);
        enemy.y = Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500);
       }
       if(enemy.type === "Scorpion"){
        enemy.src = scorpionImg.death;
          enemy.awake = false;
          enemy.frame = 0;
          enemy.walking = false;
          enemy.totalFrames = 4;
          setTimeout(() => {
            enemy.health -= player.damage;
            enemy.src = scorpionImg.walk;
            enemy.x = Math.floor(Math.random() * (GAME_WIDTH - 500) + 500);
            enemy.y = Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500);
            enemy.awake = true;
            enemy.walking = true;
            enemy.totalFrames = 4;
          }, 5000)
       }
      }
      
      
  });
}
function removeBlackSlime(){
  enemies = enemies.filter(enemy => {
    if(enemy.type === "blackSlime"){
      return false;
    }
    else return true;
  });
}

function loadContracts(){
  for(var i = 0; i < 3; i++){
    let contract = $("<div>").addClass("contract").appendTo(".tab");
    let d = (Math.random() > 0.5) ? Number(stars) : Number(stars) + 1;
    let diff = (d === 1) ? "⭐" :
               (d === 2) ? "⭐⭐" :
               (d === 3) ? "⭐⭐⭐" :
               (d === 4) ? "⭐⭐⭐⭐" : 
               (d === 5) ? "⭐⭐⭐⭐⭐" : "";
    let num = Math.floor(Math.random() * biomes.length);
    let b = biomes[num];
    let bio = (b === biomes[0]) ? "Sprites/World/Trees/middle_lane_tree2.png" : 
              (b === biomes[1]) ? "Sprites/World/Trees/winter_conifer_tree_4.png" : 
              (b === biomes[2]) ? "Sprites/World/Trees/group_cactus.png" : 
              (b === biomes[3]) ? "Sprites/World/Trees/fir_tree_10.png" : "Sprites/World/Trees/Thunderstorm.png";
    let item = Math.floor(Math.random() * (48 - 1) + 1);
    $("<h1>").addClass("difficulty").attr("aria-label", d).text("Difficulty: " + diff).appendTo(contract);
    let biomeText = $("<h1>").addClass("biome").text("Biome:").appendTo(contract);
    $("<img>").addClass("biomeImg").attr({
      src: bio,
      alt: b,
    }).appendTo(biomeText);
    let itemText = $("<h1>").addClass("item").text("Item:").appendTo(contract);
    $("<img>").addClass("contractItem").attr({
      alt: `Icon${item}`,
      src: `Sprites/World/Loot/1/Icon${item}.png`,
    }).appendTo(itemText);
  }
}

function loadGame(){  //MAKE A 5 OR 6 MINUTE TIMER FOR EVERY MISSION TO MAKE THE GAME MORE PRESSURIZED
  for(var i = 0; i < 50; i++){
    let treesArray = (biome === "Forest") ? grass_trees :
                     (biome === "Winter") ? winter_trees : 
                     (biome === "Desert") ? desert_trees : 
                     (biome === "Underworld") ? underworld_trees : 
                     (biome === "Thunderstorm") ? grass_trees : "";
    let num = Math.floor(Math.random() * grass_trees.length);
    let wall = {
      x: Math.floor(Math.random() * (GAME_WIDTH - 200) + 200),
      y: Math.floor(Math.random() * (GAME_HEIGHT - 200) + 200),
    }
    const img = new Image();
  img.src = `Sprites/World/Trees/${treesArray[num]}.png`;
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
  let ruinsArray = "This variable will decide which Array to choose from based on biome";
  let num = Math.floor(Math.random() * grass_ruins.length);
  let ruin = {
    x: Math.floor(Math.random() * (GAME_WIDTH - 200) + 200),
    y: Math.floor(Math.random() * (GAME_HEIGHT - 200) + 200),
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
    let lootamount = 4 + Number(difficulty);
    for(var l = 0; l < lootamount; l++){
    let group = Math.floor(Math.random() * 3);
    let number = Math.floor(Math.random() * 48 + 1);
    let item = {
      x: Math.floor(Math.random() * GAME_WIDTH),
      y: Math.floor(Math.random() * GAME_HEIGHT),
      cost: (7 * difficulty) + Math.floor(Math.random() * 25),
      mirage: false,
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
   if(biome === "Desert"){
    for(var m = 0; m < 3; m++){
    let group = Math.floor(Math.random() * 3);
    let number = Math.floor(Math.random() * 48 + 1);
    let item = {
      x: Math.floor(Math.random() * GAME_WIDTH),
      y: Math.floor(Math.random() * GAME_HEIGHT),
      cost: 0,
      mirage: true,
    }
    const img2 = new Image();
    img2.src = `Sprites/World/Loot/${group}/Icon${number}.png`;
    img2.onload = () => {
      item.type = img2;
      item.identification = `${group}/Icon${number}`
    item.width = img2.naturalWidth;
    item.height = img2.naturalHeight;
    }
    
    loot.push(item);
    }
   }
  }, 2000);

  setTimeout(() => {
    let setBiome = (biome === "Forest") ? ForestEnemies : 
                   (biome === "Winter") ? WinterEnemies :
                   (biome === "Desert") ? DesertEnemies :
                   (biome === "Underworld") ? UnderworldEnemies : 
                   (biome === "Thunderstorm") ? ThunderstormEnemies : "";
    for(var i = 0; i < setBiome.Slime; i++){ //SLIME IF IN FOREST
      var enemy = {
      type: 'Slime',
    x: Math.floor(Math.random() * (GAME_WIDTH - 400) + 400),
    y: Math.floor(Math.random() * (GAME_HEIGHT - 400) + 400),
    speed: Number(difficulty),
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
      for(var i = 0; i < setBiome.WinterSlime; i++){ //SLIME IF IN FOREST
      var enemy = {
      type: 'WinterSlime',
    x: Math.floor(Math.random() * (GAME_WIDTH - 400) + 400),
    y: Math.floor(Math.random() * (GAME_HEIGHT - 400) + 400),
    speed: Number(difficulty),
    damage: 0,
    alive: true,
    hurt: false,
    health: 80,
    };
  enemy.src = winterslimeImg;
enemy.width = winterslimeImg.naturalWidth;
enemy.height = winterslimeImg.naturalHeight;
enemies.push(enemy);
    }
    }, 50);
    setTimeout(() => {
      for(var i = 0; i < setBiome.Child; i++){
        var child = {
        type: "Child",
        x: Math.floor(Math.random() * (GAME_WIDTH - 1000) + 1000),
        y: Math.floor(Math.random() * (GAME_HEIGHT - 1000) + 1000),
        speed: 1,
        health: 250,
        damage: difficulty,
        alive: true,
        stalking: true,
      }
      child.src = childImg;
      child.width = childImg.naturalWidth;
      child.height = childImg.naturalHeight;
      enemies.push(child);
      }
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
        health: 250,
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
          health: 200,
          awake: true,
          damage: 0.5,
          speed: player.speed - 1,
          direction: -1,
          afraid: false,

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
    setTimeout(() => {
      for(var i = 0; i < setBiome.Tornado; i++){
        var tornado = {
          type: "Tornado",
          y: Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500),
          x: 2690,
          src: tornadoImg,
          speed: 4,
          health: 100,
          width: (tornadoImg.naturalWidth / 3),
          height: (tornadoImg.naturalHeight),
          direction: -1,
          tick: 50,
          maxTick: 50,

          delay: 3,
          maxDelay: 3,
          frame: 0,
          frameWidth: (tornadoImg.naturalWidth / 3),
          frameHeight: (tornadoImg.naturalHeight),
          totalFrames: 3,
        }
        enemies.push(tornado);
      }
      //console.log(enemies);
    }, 650);
    setTimeout(() => {
      for(var i = 0; i < setBiome.Spike; i++){
      var spike = {
        type: "Spike",
        x: Math.floor(Math.random() * (GAME_WIDTH - 500) + 500),
        y: Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500),
        src: spikeImg,
        speed: 2,
        health: 50,
        damage: 1,
        width: (spikeImg.naturalWidth / 3),
        height: spikeImg.naturalHeight,

        delay: 5,
          maxDelay: 5,
          frame: 0,
          frameWidth: (spikeImg.naturalWidth / 3),
          frameHeight: (spikeImg.naturalHeight),
          totalFrames: 3,
      }

      enemies.push(spike)
    }
    }, 700);
    setTimeout(() => {
      for(var i = 0; i < setBiome.Scorpion; i++){
        var scorpion = {
          type: "Scorpion",
          x: Math.floor(Math.random() * (GAME_WIDTH - 500) + 500),
          y: Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500),
          src: scorpionImg.animation,
          speed: player.speed / 1.5,
          damage: Number(difficulty),
          health: 40,
          width: (scorpionImg.walk.naturalWidth / 4),
          height: scorpionImg.walk.naturalHeight,
          walking: true,
          awake: true,
          attacking: false,
          direction: -1,

          delay: 5,
          maxDelay: 5,
          frame: 0,
          frameWidth: (scorpionImg.walk.naturalWidth / 4),
          frameHeight: (scorpionImg.walk.naturalHeight),
          totalFrames: 4,
        }
        enemies.push(scorpion);
      }
    }, 750);
    setTimeout(() => {
      for(var i = 0; i < setBiome.Father; i++){
        var Father = {
          type: "Father",
          x: Math.floor(Math.random() * (GAME_WIDTH - 500) + 500),
          y: Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500),
          speed: 1,
          health: 200,
          src: fatherImg,
          width: fatherImg.naturalWidth,
          height: fatherImg.naturalHeight,
          damage: 1,
          readY: true,
          tick: 120,
          maxTick: 120,
          encounters: 0,
        }
        enemies.push(Father);
      }
    }, 800); 
    setTimeout(() => {
      for(var i = 0; i < setBiome.Knight; i++){
        var knight = {
          type: "Knight",
          x: Math.floor(Math.random() * (GAME_WIDTH - 500) + 500),
          y: Math.floor(Math.random() * (GAME_HEIGHT - 500) + 500),
          walking: true,
          attacking: false,
          defending: false,
          relaxed: false,
          alive: true,
          running: false,
          forceMove: false,
          health: 100,
          damage: 1,
          speed: player.speed / 1.5,
          stamina: 50,
          range: 70,
          src: playerSprites.walk,
          direction: -1,
          width: 128,
          height: 128,

          delay: 5,
          maxDelay: player.speed * 2,
          frame: 0,
          frameWidth: 128,
          frameHeight: 128,
          totalFrames: 4,
        }
        enemies.push(knight);
      }
    }, 850);

  }, 2500);

  //BIOME
  if(biome === "Winter"){
    $(".blizzard").css("opacity", 1);
  }
  if(biome === "Thunderstorm"){
    $(".rain").css("opacity", 1);
  }
}
$(".shop").on("click", () => {
  if($(".tab").css("z-index") < 5){
    $(".tab .contract").remove();
    $(".tab .shopItem").remove();
    $(".tab h1").remove();
    $(".tab").css({
      "opacity": 1,
      "z-index": 5,
    });
    for(var i = 0; i < shop.length; i++){
      var shopItem = $("<div>").addClass("shopItem").appendTo(".tab");
      var name = $("<h1>").text(shop[i].name).appendTo(shopItem);
      $("<img>").addClass("itemImg").attr("src", shop[i].src).appendTo(name);
      $("<h1>").text(shop[i].description).appendTo(shopItem);
      $("<h1>").addClass("cost").text(`Cost: $ ${shop[i].cost}`).appendTo(shopItem);
   }
   $("<h1>").text("SHOP --> " + "$" + player.coins).appendTo(".nav-bar");
  }
});
$(".tab").on("click", ".shopItem", function() {
  var index = ($(".shopItem").index(this)) - (shop.length);
  if(player.coins >= shop[index].cost){
    player.coins -= shop[index].cost;
    shop[index].purchase();
    shop[index].cost *= 2;
    $(this).find(".cost").text(`Cost: $ ${shop[index].cost}`);
    $(".nav-bar h1").text("SHOP --> " + "$" + player.coins)
  }
});
$(".profile").on("click", () => {
  if($(".tab").css("z-index") < 5){
    $(".tab .contract").remove();
    $(".tab .shopItem").remove();
    $(".tab h1").remove();
    let star = (stars === 1) ? "⭐" :
               (stars === 2) ? "⭐⭐" :
               (stars === 3) ? "⭐⭐⭐" :
               (stars === 4) ? "⭐⭐⭐⭐" : 
               (stars === 5) ? "⭐⭐⭐⭐⭐" : "";
    $("<h1>").addClass("stats").text(`Days: ${days}`).appendTo(".tab");
    $("<h1>").addClass("stats").text(`Stars: ${star}`).appendTo(".tab");
    $("<h1>").addClass("stats").text(`Coins: $ ${player.coins}`).appendTo(".tab");
    $("<h1>").text("PROFILE").appendTo(".nav-bar");
    $(".tab").css({
      "opacity": 1,
      "z-index": 5,
    });
  }
});
$(".list").on("click", () => {
  if($(".tab").css("z-index") < 5){
    $(".tab .contract").remove();
    $(".tab .shopItem").remove();
    $(".tab h1").remove();
    $(".tab").css({
      "opacity": 1,
      "z-index": 5,
    });
    $("<h1>").text("CONTRACTS").appendTo(".nav-bar");
    loadContracts();
  }
});
$(".tab .nav-bar .exit-button").on("click", () => {
  $(".tab").css({
    "opacity": 0,
    "z-index": -1,
  });
});

$(".tab").on("click", ".contract", function() {
  SFX.menuClick.currentTime = 0;
  SFX.menuClick.play();
  let diffElement = $(this).find(".difficulty");
  let itemElement = $(this).find(".contractItem");
  let biomeElement = $(this).find(".biomeImg");
  difficulty = $(diffElement).attr("aria-label");
  contractItem = $(itemElement).attr("alt");
  biome = $(biomeElement).attr("alt");
  if($(diffElement).attr("aria-label") > stars){
    multiplier = 2;
  }
  else {
    multiplier = 1;
  }
  $(".transitionScreen").removeClass("slideUp");
  $(".transitionScreen").removeClass("fade-in");
  $(".transitionScreen").removeClass("fade-out");
  $(".transitionScreen").addClass("slideUp");
  setTimeout(() => {
    $(".transitionScreen").removeClass("slideUp");
  }, 3000);
  setTimeout(() => {
    $(".tab").css({
      "opacity": 0,
      "z-index": -1,
    });
    $('.menu').css("z-index", -1);
    $(".canvas").css("z-index", 5);
    startGame();
  }, 1500);
});

// - - - - - - - - - - - - - - - - - HOME - - - - - - - - - - - - - - -
$(".startBtn").on("click", () => {
  SFX.menuClick.currentTime = 0;
  SFX.menuClick.play();
  $(".transitionScreen").addClass("slideIn");
  setTimeout(() => {
    $(".transitionScreen h1").css("color", "white").text("loading...");
    $(".home").css("z-index", -1);
    $(".menu").css("z-index", 5);
    ambience.rain.currentTime = 0;
    ambience.rain.pause();
    ambience.forest.currentTime = 0;
    ambience.forest.pause();
    setTimeout(() => {
      $(".transitionScreen h1").css("color", "red").text("");
      $(".transitionScreen").removeClass("slideIn");
      $(".transitionScreen").addClass("fade-out");
      SFX.computerOpen.currentTime = 0;
      SFX.computerOpen.play();
    }, 3000);
  }, 1500);
});
$(".exitBtn").on("click", () => {
    $(".tab").css({
      "opacity": 1,
      "z-index": 7,
    })
});
$(".home .tab #yes").on("click", () => {
  window.close();
});
$(".home .tab #no").on("click", () => {
  $(".tab").css({
      "opacity": 0,
      "z-index": "-1",
    })
});

function startGame(){
  //LOAD FUNCTION BEFORE THIS: SERVES AS THE MAIN GAME LOAD FUNCTION FOR BIOME, CHESTS, ITEMS, AND BUILDINGS/WALLS
  //THIS FUNCTIONS SETS ALL VALUES, MUST BE CALLED FIRST
  switch(biome){
    case "Forest":
    ground = grounds.Forest;
    ambience.forest.play();
    break;
    case "Winter":
    ground = grounds.Winter;
    ambience.winter.play();
    break;
    case "Underworld":
    ground = grounds.Underworld;
    ambience.underworld.play();
    break;
    case "Thunderstorm":
    ground = grounds.Thunderstorm;
    ambience.rain.play();
    break;
    case "Desert":
    ground = grounds.Desert;
    ambience.desert.play();
    break;
    default: ground = grounds.Forest;
  }

  if (!groundPatterns[biome]) {
  groundPatterns[biome] = ctx.createPattern(grounds[biome], "repeat");
}

groundPattern = groundPatterns[biome];

  $(".canvas").css("display", "block");
  $(".HUD").css("z-index", 7);
  $(".tab .contract").remove();
  $(".tab .shopItem").remove();
  inGame = true;
  outside = true;
  inMenu = false;
  loadGame();
  player.x = 100;
  player.y = 100;
  player.direction = 1;
  player.alive = true;
  player.attacking = false;
  player.defending = false;
  player.frozen = false;
  player.relaxed = true;
  player.health = player.maxHealth;
  player.stamina = player.maxStamina;
  player.magic = player.maxMagic;
  update();
  determinePuzzle();
  determineMission();
  drawHearts();
  inventory = [];
  $(".inventory").empty();
  for(var i = 0; i < inventorySlots; i++){
  var $newSlot = $("<div>").addClass("slot").appendTo(".inventory");
  $("<img>").appendTo($newSlot);
  $("<h1>").appendTo($newSlot);
}
  $(".missions").text("Search for the entrance to the dungeon and collect items for cash on the way.");
  drawGround();
}
/*document.addEventListener("DOMContentLoaded",() => {
  setTimeout(() => {
    startGame();
  }, 1000);
});*/