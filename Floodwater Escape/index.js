var body = document.querySelector("body");
const canvas = document.getElementById("canvas");
let CANVAS_GAME_HEIGHT = 3000;
var camera = document.querySelector(".canvasDiv");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

var tran_Screen = document.querySelector(".transitionScreen");

var jsLogo = document.querySelector(".JS_logo");
var gameLogo = document.querySelector(".gameLogo");

var bPSFX = document.querySelector(".bPSFX");
var canonSFX = document.querySelector(".canonSFX");
var coinCollectSFX = document.querySelector(".coinCollectSFX");
var menuMusic = document.querySelector(".menuMusic");
menuMusic.volume = 0.7;
var jetSFX = document.querySelector(".jetSFX");
jetSFX.volume = 0.5;
var gameSFX = document.querySelector(".gameSFX");
gameSFX.volume = 0.75;
var jumpSFX = document.querySelector(".jumpSFX");
jumpSFX.volume = 0.1;
var deathSFX = document.querySelector(".deathSFX");
var spikeDamageSFX = document.querySelector(".spikeDamageSFX");
var purchaseSFX = document.querySelector(".purchaseSFX");
var waterSplashSFX = document.querySelector(".waterSplashSFX");
let highRisk = false;

//INTRODUCTION
var frontText = $(".frontText");
      document.addEventListener("DOMContentLoaded", () => {
        frontText.css("opacity", 1);
        frontText.text("Loading Assets...");
      });
      window.onload = function() {
        frontText.text("");
        frontText.css("opacity", 0);
        setTimeout(() => {
          frontText.css("opacity", 1);
          frontText.text("Created by Grant Oleksik, Sophmore at Covington High School.");
        }, 1500);
        setTimeout(() => {
          frontText.css("opacity", 0);
          setTimeout(() => {
            frontText.css("opacity", 1);
            frontText.text("Created with: "); //MAKE THE JAVASCRIPT IMAGE APPEAR HALF A SECOND AFTER THIS
            setTimeout(() => {
            jsLogo.style.opacity = 1;
            setTimeout(() => {
             frontText.css("opacity", 0);
             jsLogo.style.opacity = 0;
            }, 2000);
            }, 500);
          }, 2000);
        }, 4000);
        setTimeout(() => { //REMOVE ALL TEXT AND IMAGES TO REPLACE WITH THE GAME NAME IMAGE
          gameLogo.style.opacity = 1;
          setTimeout(() => {
            tran_Screen.classList.add("fade");
            gameLogo.style.opacity = 0;
            setTimeout(() => {
                       tran_Screen.classList.remove("fade");
              tran_Screen.style.opacity = 0;
              tran_Screen.style.top = "100%";
              frontText.css("z-index", -2);
              gameLogo.style.zIndex = -2;
              jsLogo.style.zIndex = -2;
              menuMusic.play();
              $(".returnBTN").css("z-index", 6);
             }, 3000);
          }, 5000);
        }, 11000);
      }

//END OF INTRODUCTION

var levelCount = document.querySelector(".levelCount");
document.querySelector(".menuSigns").classList.add("flicker");
var tipsDIV = document.querySelector(".tips");
var tip = "";

let RENDER_DISTANCE = 100; //FOR LATER LARGER USE
let gameFlag = false;

var world = {
  gravity: 0.6,
  level: 1,
}
levelCount.textContent = world.level;

//HIGH RISK FUNCTION
function highRiskf(){
  if(!highRisk){
  highRisk = true;
  world.level = 0;
  levelCount.textContent = "?";
  $("body").css("background", "black");
  reward *= 3;
  $(".returnBTN:nth-child(3)").text("ACTIVE");
  tip = "HIGH RISK ACTIVE: Reward tripled, all dangers activated. Don't worry I'll still be here to help, but NO turning back now :)";
  tipsDIV.textContent = tip;
  menuMusic.volume = 0;
  numOfCoinBoxes = 0;
  }
}

//Water portion

var water = {
  x: 0,
  y: CANVAS_GAME_HEIGHT + 150,
  width: canvas.width,
  height: 10,
  speed: 0.5,
}
//Coins section
var coinBoxes = [];

//Obstacles section
let WALLS_TAKEAWAY = 2;
let numWalls = (CANVAS_GAME_HEIGHT / 100) - WALLS_TAKEAWAY;
let wallYOffset = 100;
let wallWidth = 125;

var walls = [
  wall = {
    x: canvas.width / 2 - wallWidth / 2,
    y: 375,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
  wall = {
    x: 100,
    y: 250,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
  wall = {
    x: 550,
    y: 250,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
  wall = {
    x: canvas.width / 2 - wallWidth / 2,
    y: 175,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
];   
var fans = [];
var fanWind = [];
var spikes = [];
var numOfCoinBoxes = 2;
var lasers = [];
let laserSwitch = 1;
setInterval(() => {
  lasers.forEach(laser => {
    laserSwitch *= -1;
    if(laserSwitch === 1){
      laser.active = true;
      laser.color = "red";
    }
    else {
      laser.active = false;
      laser.color = "rgba(0, 0, 0, 0)";
    }
    });
  }, 5000);

function startGame(){
  tran_Screen.classList.remove("fade");
  tran_Screen.classList.add("slideUp");
  tran_Screen.style.opacity = 1;
  document.querySelector(".menuSigns").classList.remove("flicker");
  document.querySelector(".menuSigns").style.opacity = 0;
  tipsDIV.style.opacity = 0;
  menuMusic.pause();
  menuMusic.currentTime = 0;
  
  player.x = 10;
  player.y = CANVAS_GAME_HEIGHT - 40;
  
  setTimeout(() => {
    gameFlag = true;
    tran_Screen.classList.remove("slideUp");
    tran_Screen.style.opacity = 0;
    camera.classList.add("shake");
  }, 3000);
  
  setTimeout(() => {
      walls = [];
  canvas.width = 500;
  canvas.height = CANVAS_GAME_HEIGHT;
  $(".canvasDiv").css("width", "500px");
  $(".canvasDiv").css("height", "700px");

  gameSFX.currentTime = 0;
  gameSFX.play();
  
for(var i = 0; i < numWalls; i++){
  var wall = {
    x: Math.floor(Math.random() * ((500 - wallWidth) - 1) + 1),
    y: (CANVAS_GAME_HEIGHT - 100) - wallYOffset * i,
    width: wallWidth,
    height: 25,
    breakable: (Math.random() > 0.15) ? false : true,
    moving: (Math.random() > 0.15) ? false : true,
    direction: 1,
  }
  walls.push(wall);
 }
    //FANS SPAWNER
    if(world.level % 3 === 0){
    for(var e = 0; e < 5; e++){
      var fan = {
        x: (Math.random() > 0.50) ? 0 : canvas.width - 20,
        y: Math.floor(Math.random() * (CANVAS_GAME_HEIGHT - 300) + 300),
        width: 20,
        height: 250,
      }
      fan.direction = (fan.x === 0) ? 3 : -3;
      fans.push(fan);

    fanWind.push(wind = {
      x: Math.floor(Math.random() * canvas.width - 100),
      y: fan.y + 50,
      width: 150,
      height: 10,
      direction: fan.direction,
    });
      fanWind.push(wind = {
      x: Math.floor(Math.random() * canvas.width - 100),
      y: fan.y + 100,
      width: 150,
      height: 10,
      direction: fan.direction,
    });
        fanWind.push(wind = {
      x: Math.floor(Math.random() * canvas.width - 100),
      y: fan.y + 150,
      width: 150,
      height: 10,
      direction: fan.direction,
    });
      fanWind.push(wind = {
      x: Math.floor(Math.random() * canvas.width - 100),
      y: fan.y + 200,
      width: 200,
      height: 10,
      direction: fan.direction,
    });
      fanWind.push(wind = {
      x: Math.floor(Math.random() * canvas.width - 100),
      y: fan.y + 250,
      width: 150,
      height: 10,
      direction: fan.direction,
    });
    }
   }
    if(world.level % 4 === 0 && !highRisk){
      numOfCoinBoxes += 2;
    }
 if(world.level % 2 === 0 && !highRisk){
   for(var j = 0; j < numOfCoinBoxes; j++){
     var coinBox = {
       x: Math.floor(Math.random() * ((500 - 10) - 1) + 1),
       y: Math.floor(Math.random() * ((CANVAS_GAME_HEIGHT - 10) - 1) + 1),
       size: 10,
     }
     coinBoxes.push(coinBox);
   }
 }
 //SPIKE SPAWNING SECTION
  if(world.level % 4 === 0){
    for(var s = 0; s < 10; s++){
      var randomPos = Math.floor(Math.random() * walls.length);
      var spike;
      if(!walls[randomPos].moving){
      spike = {
    x: walls[randomPos].x + (walls[randomPos].width / 2) - 15,
    y: walls[randomPos].y - 30,
    width: 30,
    height: 30,
  }
      }
      spikes.push(spike);
    }
  }

  //LASERS SPAWNING
  if(world.level % 8 === 0 || world.level % 10 === 0){
    for(var l = 0; l < 3; l++){
      var laser = {
        y: Math.floor(Math.random() * ((CANVAS_GAME_HEIGHT - 10) - 100) + 100),
        width: canvas.width,
        height: 2,
        active: true,
        color: "red",
      }
      lasers.push(laser);
    }
  }

  //Blackout occurance

  if(world.level % 5 === 0 || world.level % 7 === 0 || world.level % 12 === 0){
    body.classList.remove("blackout");
    body.classList.add("blackout");
    setTimeout(() => {
      body.style.background = "black";
    }, 3500);
  }
    
    camera.scrollTop = player.y - 400;
    
  }, 1500);
}

//END OF startGame FUNCTION

var player = {
  width: 20,
  height: 40,
  x: canvas.width / 2,
  y: canvas.height - 40,
  dy: 0,
  jumpStrength: 13,
  speed: 5,
  color: "#777",
  grounded: true,
  alive: true,
  maxHealth: 100,
  health: 100,
  coins: 0,
}
var reward = 100;

//Movement portion

var moving = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false,
}

document.addEventListener('keydown', (e) => {
  if(e.key === "w" && player.grounded && player.alive){
    jumpSFX.currentTime = 0;
    jumpSFX.play();
    player.grounded = false; 
    moving.w = true; 
    player.dy = -player.jumpStrength;
  }
  if(e.key === "a"){moving.a = true;}
  if(e.key === "s"){moving.s = true;}
  if(e.key === "d"){moving.d = true;}
  if(e.key === " "){moving.space = true;}
});
document.addEventListener('keyup', (e) => {
  if(e.key === "w"){moving.w = false;}
  if(e.key === "a"){moving.a = false;}
  if(e.key === "s" && player.alive){moving.s = false; player.y -= player.height;}
  if(e.key === "d"){moving.d = false;}
  if(e.key === " "){moving.space = false;}
});

function playerDeath(){
  gameFlag = false;
  player.alive = false;
  deathSFX.currentTime = 0;
  deathSFX.play();
  setTimeout(() => {
    tran_Screen.classList.add("slideUp");
    tran_Screen.style.opacity = 1;
    
    setTimeout(() => {
      walls = [];
      coinBoxes = [];
      fans = [];
      fanWind = [];
      spikes = [];
      lasers = [];
canvas.width = 800;
canvas.height = 500;
$(".canvasDiv").css("width", "800px");
$(".canvasDiv").css("height", "500px");

gameSFX.pause();
menuMusic.play();

player.x = canvas.width / 2;
player.y = canvas.height - 40;
player.health = player.maxHealth;
player.coins -= 25;
player.coins = Math.max(player.coins, 0);
coinCounter.textContent = "Coins: $" + player.coins;
camera.classList.remove("shake");
  $(".redScreen").css("opacity", (((player.health/player.maxHealth * -1)  * 100) + 100) + "%");
      water.y = CANVAS_GAME_HEIGHT + 150;
  walls = [
  wall = {
    x: canvas.width / 2 - wallWidth / 2,
    y: 375,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
  wall = {
    x: 100,
    y: 250,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
  wall = {
    x: 550,
    y: 250,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
  wall = {
    x: canvas.width / 2 - wallWidth / 2,
    y: 175,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
];  
      player.alive = true;
      document.querySelector(".menuSigns").style.opacity = 1;
  document.querySelector(".menuSigns").classList.add("flicker");
  body.classList.remove("blackout");
  if(!highRisk)body.style.background = "#555";
      tipsDIV.style.opacity = 1;
      randomizeTips();
    }, 1500);
  }, 2000);
  
  setTimeout(() => {
    tran_Screen.classList.remove("slideUp");
    tran_Screen.style.opacity = 0;
  }, 5000);
}

function levelCompletion(){
  tran_Screen.style.opacity = 1;
  tran_Screen.style.top = 0;
  tran_Screen.classList.add("fade");
  body.classList.remove("blackout");
  if(!highRisk)body.style.background = "#555";
  gameSFX.pause();

  setTimeout(() => {
    tran_Screen.classList.remove("fade");
    tran_Screen.style.opacity = 0;
  }, 3000);
  
  document.querySelector(".menuSigns").style.opacity = 1;
  document.querySelector(".menuSigns").classList.add("flicker");
  tipsDIV.style.opacity = 1;
  randomizeTips();
  
walls = [];
fans = [];
fanWind = [];
coinBoxes = [];
spikes = [];
lasers = [];
gameFlag = false;
canvas.width = 800;
canvas.height = 500;
$(".canvasDiv").css("width", "800px");
$(".canvasDiv").css("height", "500px");

menuMusic.play();

player.x = canvas.width / 2;
player.y = canvas.height - 40;
player.health = player.maxHealth;
  $(".redScreen").css("opacity", (((player.health/player.maxHealth * -1)  * 100) + 100) + "%");

  if(!highRisk)world.level++;
  if(!highRisk)levelCount.textContent = world.level; //UPDATE LEVEL COUNTER
water.speed += 0.2;
player.coins += reward;
coinCounter.textContent = "Coins: $" + player.coins;
camera.classList.remove("shake");
  
if(world.level % 2 === 0){
  wallYOffset += 25;
  CANVAS_GAME_HEIGHT += 675;
}
water.y = CANVAS_GAME_HEIGHT + 150;
  
  // - - - - - - MENU WALLS - - - - - -
  
  walls = [
  wall = {
    x: canvas.width / 2 - wallWidth / 2,
    y: 375,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
  wall = {
    x: 100,
    y: 250,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
  wall = {
    x: 550,
    y: 250,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
  wall = {
    x: canvas.width / 2 - wallWidth / 2,
    y: 175,
    width: wallWidth,
    height: 25,
    breakable: false,
  },
];   
  
}

/*
- - - - - - - - - - - - - This will be the SHOP section - - - - - - - - - - -
*/
var shop = document.querySelector(".shop");
var coinCounter = document.querySelector(".coinCounter");
var inventoryBox = document.querySelector(".inventory");
coinCounter.textContent = "Coins: $" + player.coins;

var equipped = {
  block_placer: false,
  jet_pack: false,
  teleporter: false,
  canon: false,
}

var jumpBoostBtn = document.querySelector(".jumpBoost button");
let jumpBoostCost = 100;
let jumpBoostLvl = 0;
let jBmaxLvl = 3;
jumpBoostBtn.textContent = "Buy - " + jumpBoostCost + "C";

jumpBoostBtn.addEventListener("click", () => {
  if(player.coins >= jumpBoostCost){
    if(jumpBoostLvl < jBmaxLvl){
    //Cost
    purchaseSFX.currentTime = 0;
    purchaseSFX.play();
    player.coins -= jumpBoostCost;
    coinCounter.textContent = "Coins: $" + player.coins;
    jumpBoostLvl++
    
    //Addon
    player.jumpStrength += 1;
    
    jumpBoostCost *= 2;
    jumpBoostBtn.textContent = "Upgrade - " + jumpBoostCost + "C";
    }
    else if(jumpBoostLvl === jBmaxLvl)jumpBoostBtn.textContent = "MAX LEVEL";
  }
  else {
    jumpBoostBtn.classList.add("invalid");
    setTimeout(() => {jumpBoostBtn.classList.remove("invalid");}, 500);
  }
});
var sBBtn = document.querySelector(".speedBoost button");
let sBCost = 100;
let sBLvl = 0;
let sBmaxLvl = 3;
sBBtn.textContent = "Buy - " + sBCost + "C";

sBBtn.addEventListener("click", () => {
  if(player.coins >= sBCost){
    if(sBLvl < sBmaxLvl){;
    //Cost
    purchaseSFX.currentTime = 0;
    purchaseSFX.play();
    player.coins -= sBCost;
    coinCounter.textContent = "Coins: $" + player.coins;
    sBLvl++
    
    //Addon
    player.speed += 1;
    
    sBCost *= 2;
    sBBtn.textContent = "Upgrade - " + sBCost + "C";
    }
    else if(sBLvl === sBmaxLvl)sBBtn.textContent = "MAX LEVEL";
  }
  else {
    sBBtn.classList.add("invalid");
    setTimeout(() => {sBBtn.classList.remove("invalid");}, 500);
  }
});
var healthBtn = document.querySelector(".health button");
let healthCost = 150;
let healthLvl = 0;
let healthmaxLvl = 3;
healthBtn.textContent = "Buy - " + healthCost + "C";

healthBtn.addEventListener("click", () => {
  if(player.coins >= healthCost){
    if(healthLvl < healthmaxLvl){;
    //Cost
    purchaseSFX.currentTime = 0;
    purchaseSFX.play();
    player.coins -= healthCost;
    coinCounter.textContent = "Coins: $" + player.coins;
    healthLvl++
    
    //Addon
    player.maxHealth += 50;
    player.health = player.maxHealth;
    
    healthCost *= 2;
    healthBtn.textContent = "Upgrade - " + healthCost + "C";
    }
    else if(healthLvl === healthmaxLvl)healthBtn.textContent = "MAX LEVEL";
  }
  else {
    healthBtn.classList.add("invalid");
    setTimeout(() => {healthBtn.classList.remove("invalid");}, 500);
  }
});
var umbrellaBtn = document.querySelector(".umbrella button");
let umbrellaCost = 150;
let umbrellaLvl = 0;
let umbrellamaxLvl = 3;
umbrellaBtn.textContent = "Buy - " + umbrellaCost + "C";

umbrellaBtn.addEventListener("click", () => {
  if(player.coins >= umbrellaCost){
    if(umbrellaLvl < umbrellamaxLvl){;
    //Cost
    purchaseSFX.currentTime = 0;
    purchaseSFX.play();
    player.coins -= umbrellaCost;
    coinCounter.textContent = "Coins: $" + player.coins;
    umbrellaLvl++
    
    //Addon
    world.gravity -= 0.1;
    
    umbrellaCost *= 2;
    umbrellaBtn.textContent = "Upgrade - " + umbrellaCost + "C";
    }
    else if(umbrellaLvl === umbrellamaxLvl)umbrellaBtn.textContent = "MAX LEVEL";
  }
  else {
    umbrellaBtn.classList.add("invalid");
    setTimeout(() => {umbrellaBtn.classList.remove("invalid");}, 500);
  }
});
var blockPlacerBtn = document.querySelector(".blockPlacer button");
let blockPlacerCost = 300;
let blockPlacerLvl = 0;
let blockPlacermaxLvl = 3;
let blockPlacerCooldown = 6000;
let bPFlag = true;
blockPlacerBtn.textContent = "Buy - " + blockPlacerCost + "C";

blockPlacerBtn.addEventListener("click", () => {
  if(player.coins >= blockPlacerCost){
    if(blockPlacerLvl < blockPlacermaxLvl){;
    //Cost
    purchaseSFX.currentTime = 0;
    purchaseSFX.play();
    player.coins -= blockPlacerCost;
    coinCounter.textContent = "Coins: $" + player.coins;
    blockPlacerLvl++
    
    //Addon
    blockPlacerCooldown -= 1000;
    equipped.block_placer = true;
    equipped.jet_pack = false;
    equipped.canon = false;
    equipped.teleporter = false;
    
    blockPlacerCost *= 2;
    blockPlacerBtn.textContent = "Upgrade - " + blockPlacerCost + "C";
    }
    else if(blockPlacerLvl === blockPlacermaxLvl)blockPlacerBtn.textContent = "MAX LEVEL";
  }
  else {
    blockPlacerBtn.classList.add("invalid");
    setTimeout(() => {blockPlacerBtn.classList.remove("invalid");}, 500);
  }
});
var jetPackBtn = document.querySelector(".jetPack button");
let jetPackCost = 400;
let jetPackLvl = 0;
let jetPackmaxLvl = 3;
let jetPackFuel = 150;
let jetPackMaxFuel = 130;
let jetPackStrength = 8;
jetPackBtn.textContent = "Buy - " + jetPackCost + "C";

jetPackBtn.addEventListener("click", () => {
  if(player.coins >= jetPackCost){
    if(jetPackLvl < jetPackmaxLvl){;
    //Cost
    purchaseSFX.currentTime = 0;
    purchaseSFX.play();
    player.coins -= jetPackCost;
    coinCounter.textContent = "Coins: $" + player.coins;
    jetPackLvl++
    
    //Addon
    jetPackMaxFuel += 20;
    jetPackStrength += 2;
    equipped.jet_pack = true;
    equipped.block_placer = false;
    equipped.canon = false;
    equipped.teleporter = false;
    
    jetPackCost *= 2;
    jetPackBtn.textContent = "Upgrade - " + jetPackCost + "C";
    }
    else if(jetPackLvl === jetPackmaxLvl)jetPackBtn.textContent = "MAX LEVEL";
  }
  else {
    jetPackBtn.classList.add("invalid");
    setTimeout(() => {jetPackBtn.classList.remove("invalid");}, 500);
  }
});
var smokeIndex = 0;
var smokes = []; //This is for the Jet pack VISUALS.

var canonBtn = document.querySelector(".canon button");
let canonCost = 400;
let canonLvl = 0;
let canonmaxLvl = 3;
let canonCooldown = 7500;
let canonStrength = 30;
let cFlag = true;
canonBtn.textContent = "Buy - " + canonCost + "C";

canonBtn.addEventListener("click", () => {
  if(player.coins >= canonCost){
    if(canonLvl < canonmaxLvl){;
    //Cost
    purchaseSFX.currentTime = 0;
    purchaseSFX.play();
    player.coins -= canonCost;
    coinCounter.textContent = "Coins: $" + player.coins;
    canonLvl++
    
    //Addon
    canonCooldown -= 500;
    canonStrength += 10;
    equipped.canon = true;
    equipped.jet_pack = false;
    equipped.block_placer = false;
    equipped.teleporter = false;
    
    canonCost *= 2;
    canonBtn.textContent = "Upgrade - " + canonCost + "C";
    }
    else if(canonLvl === canonmaxLvl)canonBtn.textContent = "MAX LEVEL";
  }
  else {
    canonBtn.classList.add("invalid");
    setTimeout(() => {canonBtn.classList.remove("invalid");}, 500);
  }
});
var teleporterBtn = document.querySelector(".teleporter button");
let teleporterCost = 400;
let teleporterLvl = 0;
let teleportermaxLvl = 3;
let teleporterCooldown = 20000;
let teleporterStrength = 500;
let teleporterFlag = true;
teleporterBtn.textContent = "Buy - " + teleporterCost + "C";

teleporterBtn.addEventListener("click", () => {
  if(player.coins >= teleporterCost){
    if(teleporterLvl < teleportermaxLvl){;
    //Cost
    purchaseSFX.currentTime = 0;
    purchaseSFX.play();
    player.coins -= teleporterCost;
    coinCounter.textContent = "Coins: $" + player.coins;
    teleporterLvl++
    
    //Addon
    teleporterStrength *= 2;
    equipped.teleporter = true;
    equipped.jet_pack = false;
    equipped.block_placer = false;
    equipped.canon = false;
    
    teleporterCost *= 2;
    teleporterBtn.textContent = "Upgrade - " + teleporterCost + "C";
    }
    else if(teleporterLvl === teleportermaxLvl)teleporterBtn.textContent = "MAX LEVEL";
  }
  else {
    teleporterBtn.classList.add("invalid");
    setTimeout(() => {teleporterBtn.classList.remove("invalid");}, 500);
  }
});

$(".jetPack").on("click", () => {
  if(jetPackLvl > 0){
  equipped.jet_pack = true;
  equipped.block_placer = false;
  equipped.canon = false;
  equipped.teleporter = false;
  }
});
$(".blockPlacer").on("click", () => {
  if(blockPlacerLvl > 0){
  equipped.jet_pack = false;
  equipped.block_placer = true;
  equipped.canon = false;
  equipped.teleporter = false;
  }
});
$(".canon").on("click", () => {
  if(canonLvl > 0){
  equipped.jet_pack = false;
  equipped.block_placer = false;
  equipped.canon = true;
  equipped.teleporter = false;
  }
});
$(".teleporter").on("click", () => {
  if(teleporterLvl > 0){
  equipped.jet_pack = false;
  equipped.block_placer = false;
  equipped.canon = false;
  equipped.teleporter = true;
  }
});


/*
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*/

//TIPS DIV SECTION
function randomizeTips(){
  var num = 0;
  num = Math.floor(Math.random() * 6);
  
  tip = (num === 0) ? "Jump under a platform and TAP the crouch button to start climbing the platform. Keep tapping it to climb." : 
        (num === 1) ? "Buy items in the SHOP to make escaping easier! But spend wisely." :
        (num === 2) ? "Click on the box of a special item you purchased to equip it." :
        (num === 3) ? "Watch out for deteriorating platforms! Don't let them catch you by surprise!" :
        (num === 4) ? "Be careful around spikes, only 4 mishaps and your round is over." :
        "Beware of pesky lasers, they are VERY lethal!";
  
  tipsDIV.textContent = tip;
}

//Collision function

function isColliding(x, y){
  return walls.some(wall => 
         x + player.width > wall.x && 
         x < wall.x + wall.width && 
         y + player.height > wall.y &&
         y < wall.y + wall.height
                   );
}

//----------------- UPDATE FUNCTIONS -------------------

function update(){
  var newX = player.x;
  var newY = player.y;
  
  if(moving.d && player.alive)newX += player.speed;
  if(moving.a && player.alive)newX -= player.speed;
  //if(moving.w)newY -= player.speed;
  if(moving.s && player.alive){player.height = 20;}
  else player.height = 40;
  
  player.dy += world.gravity;
  newY += player.dy;

  
    //Fans Section
  fans.some(fan => {
    if(player.y + player.height > fan.y && player.y < fan.y + fan.height){
      newX += fan.direction;
    }
  });

    fanWind.forEach(wind => {
        wind.x += wind.direction;
      if(wind.x <= 0 && Math.sign(wind.direction) === -1){
        wind.x = 400;
      }
      else if(wind.x + wind.width >= 500 && Math.sign(wind.direction) === 1){
        wind.x = 0;
      }
    });
  
  //Breaking Platforms
  walls.some(wall => {
    if(newX + player.width > wall.x &&
       newX < wall.x + wall.width &&
       newY + player.height > wall.y &&
       newY < wall.y + wall.height && 
       wall.breakable){
      if(wall.height > 0){
        wall.height -= 0.15;
      }
      else if(wall.height <= 0){
        wall.x = 500;
      }
    }
  });
  
  //Moving Platforms
  walls.some(wall => {
    if(world.level % 2 === 0){
    if(wall.moving){
      wall.x += wall.direction;
    }
    if(wall.x <= 0 || wall.x + wall.width >= canvas.width){
      wall.direction *= -1;
    }
   
   if(newX + player.width > wall.x &&
       newX < wall.x + wall.width &&
       newY + player.height > wall.y &&
       newY < wall.y + wall.height && 
       wall.moving){
        newX += wall.direction;
       }
      }
  });
  
  if(!isColliding(newX, player.y) && newX > 0 && newX + player.width < canvas.width) player.x = newX;
  if(!isColliding(player.x, newY) && newY + player.height < canvas.height) player.y = newY;
  else {
    player.grounded = true;
    player.dy = 0;
  }
  
  //Camera scroll
  
  if(gameFlag){
    camera.scrollTop = player.y - 400;
  }
  
  //Water movement
  if(gameFlag){
    water.y -= water.speed;
  if(water.y < CANVAS_GAME_HEIGHT){
    water.height += water.speed;
   }
  }
  
  //Game Start
  
  if(player.x > 770 && !gameFlag){
    tran_Screen.classList.remove("fade");
    startGame();
  }
  
  //Coin Box Section
  
  coinBoxes = coinBoxes.filter(box => {
    if(player.x + player.width > box.x &&
       player.x < box.x + box.size &&
       player.y + player.height > box.y &&
       player.y < box.y + box.size){
        coinCollectSFX.currentTime = 0;
        coinCollectSFX.play();
      player.coins += 50;
      return false;
    }
    else return true;
  });
  
  //Health Section
  
  if(player.y + player.height > water.y){
    waterSplashSFX.play();
    player.health -= 0.75;
     $(".redScreen").css("opacity", (((player.health/player.maxHealth * -1)  * 100) + 100) + "%");
  }
  else if(player.y + player.height < water.y) {
    waterSplashSFX.pause();
    waterSplashSFX.currentTime = 0;
  }
  if(player.health <= 0 && gameFlag){
    playerDeath();
    $(".redScreen").css("opacity", 100);
  }
  if(player.health <= 0){
    player.y++
  }
  
  //Level Completion
  
  if(player.y < 50 && gameFlag){
    levelCompletion();
  }
  
  //SHOP SECTION
  
  if(player.x < 10 && !gameFlag){
    shop.style.opacity = 1;
    shop.style.top = "";
  }
  else {
    shop.style.opacity = 0;
    shop.style.top = "110%";
  }
  
  // - - - - - - - - - ITEMS INNER WORKINGS SECTION - - - - - - - - - - - - - -
  if(moving.space && equipped.block_placer && bPFlag){
    bPSFX.currentTime = 0;
    bPSFX.play();
    walls.push(wall = {x: player.x - (wallWidth / 2), y: player.y + player.height, width: wallWidth, height: 25});
    bPFlag = false;
    inventoryBox.style.opacity = 0.5;
    setTimeout(() => {
      bPFlag = true;
      inventoryBox.style.opacity = 1;
    }, blockPlacerCooldown);
  }
  if(moving.space && equipped.jet_pack && jetPackFuel > 0){
    jetSFX.play();
    player.dy -= (jetPackStrength / 15);
    jetPackFuel--
    inventoryBox.style.opacity = 0.5;
  }
  if(jetPackFuel < jetPackMaxFuel && !moving.space){
    jetSFX.currentTime = 0;
    jetSFX.pause();
    jetPackFuel++
    inventoryBox.style.opacity = 1;
  }
  if(jetPackFuel <= 1){
    inventoryBox.style.background = "red";
    setTimeout(() => {
      inventoryBox.style.background = "#777";
    }, 2000);
  }
  if(moving.space && equipped.canon && cFlag){
    canonSFX.currentTime = 0;
    canonSFX.play();
    player.dy = -canonStrength;
    cFlag = false;
    inventoryBox.style.opacity = 0.5;
    setTimeout(() => {
      cFlag = true;
      inventoryBox.style.opacity = 1;
    }, canonCooldown);
  }
  if(moving.space && equipped.teleporter && teleporterFlag){
    player.y -= teleporterStrength;
    teleporterFlag = false;
    inventoryBox.style.opacity = 0.5;
    setTimeout(() => {
      teleporterFlag = true;
      inventoryBox.style.opacity = 1;
    }, teleporterCooldown);
  }

  // - - - - - - - - - INVENTORY SECTION - - - - - - - - - 
  if(equipped.block_placer){inventoryBox.textContent = "Platform Placer"; $(".blockPlacer").css("color", "lightgreen")}
  else $(".blockPlacer").css("color", "black");
  if(equipped.jet_pack){inventoryBox.textContent = "Jet Pack"; $(".jetPack").css("color", "lightgreen")}
  else $(".jetPack").css("color", "black");
  if(equipped.canon){inventoryBox.textContent = "Canon"; $(".canon").css("color", "lightgreen")}
  else $(".canon").css("color", "black");
  if(equipped.teleporter){inventoryBox.textContent = "Teleporter"; $(".teleporter").css("color", "lightgreen")}
  else $(".teleporter").css("color", "black");
  
  //--------------------- JET PACK SMOKE SECTION --------------------
  smokes.forEach(smoke => {
    smoke.y += 2;
    smoke.x += smoke.movement;
  });
  if(moving.space && equipped.jet_pack && jetPackFuel > 0){
    smokeIndex++
    if(smokeIndex % 10 === 0){
      smokes.push(smoke = {
        x: player.x,
        y: player.y + player.height,
        movement: (Math.random() > 0.5) ? 1 : -1,
        size: Math.floor(Math.random() * (25 - 10) + 10),
      });
    }
  }
  smokes = smokes.filter(smoke => {
    if(smoke.y <= player.y + 400 && smoke.y >= player.y - 400){
      return true;
    }
    else return false;
  });
  
    //SPIKES SECTION
  spikes = spikes.filter(spike => {
    if(player.x + player.width > spike.x &&
       player.x < spike.x + spike.width &&
       player.y + player.height > spike.y &&
       player.y < spike.y + spike.height){
        spikeDamageSFX.currentTime = 0;
        spikeDamageSFX.play();
      player.health -= 20;
      $(".redScreen").css("opacity", ((player.health - 100) * -1) + "%");
      return false;
    }
    else return true;
  });

  //LASERS SECTION
  lasers.some(laser => {
    if(player.y + player.height > laser.y && player.y < laser.y + laser.height && laser.active){
      player.health = 0;
    }
  });
  
  requestAnimationFrame(update);
  draw();
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height); //For umbrella hat, just do ctx fill the image above the player's head
  
  ctx.fillStyle = '#888';
  walls.forEach(wall => {
    if(wall.y <= player.y + 700 && wall.y >= player.y - 700){
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    }
  });
  ctx.fillStyle = "yellow";
  coinBoxes.forEach(box => {
    if(box.y <= player.y + 700 && box.y >= player.y - 700){
      ctx.fillRect(box.x, box.y, box.size, box.size);
    }
  });
  ctx.fillStyle = "white";
    fanWind.forEach(wind => {
      ctx.fillRect(wind.x, wind.y, wind.width, wind.height);
    });
  smokes.forEach(smoke => {
    ctx.fillRect(smoke.x, smoke.y, smoke.size, smoke.size);
  });
  ctx.fillStyle = "#c7d7f0";
  fans.forEach(fan => {
    ctx.fillRect(fan.x, fan.y, fan.width, fan.height);
  });
  
  //SPIKES SECTION
  spikes.forEach(spike => {
    ctx.beginPath();
    ctx.moveTo(spike.x, spike.y + spike.height);
    ctx.lineTo(spike.x + (spike.width / 2), spike.y );
    ctx.lineTo(spike.x + spike.width, spike.y + spike.height);
    ctx.closePath();
    
    ctx.strokeStyle = 'black'; // Set line color
    ctx.lineWidth = 2; // Set line width
    ctx.stroke(); // Draw the outline
    
    ctx.fillStyle = "red";
    ctx.fill();
  });
  lasers.forEach(laser => {
    ctx.fillStyle = laser.color;
    ctx.fillRect(0, laser.y, laser.width, laser.height);
  });
  
  ctx.fillStyle = 'rgba(0, 0, 200, 0.75)';
  ctx.fillRect(water.x, water.y, water.width, water.height);
}

update();