const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
var transitionScreen = document.querySelector(".transitionScreen");
var JSlogo = document.querySelector(".JSlogo");
var gameLogo = document.querySelector(".gameLogo");
let gameFlag = false;  //GAME FLAG SHALL BE FALSE WHEN IN MENU, ACTIVE WHEN PLAYING
let inMenu = false; //HAVE AS FALSE LATER BEFORE CONTROLLER CHECKS(not added yet)
let inControllerCheck = false; 
let time = 62;
var timer = document.querySelector(".timer");
let inSettings = false;
var musicVolume = document.querySelector(".musicVolume");
let musicVolumeNum = parseFloat(musicVolume.value);
var sfxVolume = document.querySelector(".sfxVolume");
let sfxVolumeNum = parseFloat(sfxVolume.value);
var roundsModifier = document.querySelector(".roundsModifier");
let roundsModifierNum = parseFloat(roundsModifier.value);
var playerOneColor = document.querySelector(".playerOneColor");
var playerTwoColor = document.querySelector(".playerTwoColor");
let colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "white", "black"];
pOCIndex = 0;
pTCIndex = 1;
playerOneColor.value = colors[pOCIndex];
playerTwoColor.value = colors[pTCIndex];
document.querySelector(".playerOneColor").style.color = colors[pOCIndex];
document.querySelector(".playerTwoColor").style.color = colors[pTCIndex];
cT = true;
cTT = true;
let rmT = true;
let leaving = false;
let round = 0;
let match = 0;

const baseWidth = 800;
const baseHeight = 500;

function resizeCanvas() {    //AGAIN, SOMETHING I'M STUDYING, DID NOT MAKE THIS
  // Get the window dimensions
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Keep the aspect ratio of baseWidth/baseHeight
  const aspect = baseWidth / baseHeight;
  let newWidth = windowWidth;
  let newHeight = windowWidth / aspect;

  if (newHeight > windowHeight) {
    newHeight = windowHeight;
    newWidth = newHeight * aspect;
  }

  canvas.style.width = newWidth + "px";
  canvas.style.height = (newHeight - 50) + "px";
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function playSound(sound) {
  const sfx = sound.cloneNode(); // duplicate the <audio> in memory   Another thing I need to study, did not make this myself
  sfx.play();
}

function adjustSFXVolume(){
  redShoot.volume = sfxVolumeNum;
  blueShoot.volume = sfxVolumeNum;
  roundScore.volume = sfxVolumeNum;
  menuSelect.volume = sfxVolumeNum;
  roundEnd.volume = sfxVolumeNum;
  controllerConnect.volume = sfxVolumeNum;
  runningSFX.volume = sfxVolumeNum;
  crowd.volume = sfxVolumeNum / 1.25;
  wallPlace.volume = sfxVolumeNum;
  wallDestroy.volume = sfxVolumeNum;
  trapPlace.volume = sfxVolumeNum;
  trapActivate.volume = sfxVolumeNum;
}
function adjustMusicVolume(){
  menuMusic.volume = musicVolumeNum;
}

const redShoot = new Audio("SFX/akm-gunshot-368240.mp3");
redShoot.preload = "auto";
redShoot.volume = sfxVolumeNum;
redShoot.load();
const blueShoot = new Audio("SFX/ak74-sound-effect-351437.mp3");
blueShoot.preload = "auto";
blueShoot.volume = sfxVolumeNum;
blueShoot.load();
const roundScore = new Audio("SFX/round_score.mp3");
roundScore.preload = "auto";
roundScore.volume = sfxVolumeNum;
roundScore.load();
const roundEnd = new Audio("SFX/round_end.mp3");
roundEnd.preload = "auto";
roundEnd.volume = sfxVolumeNum;
roundEnd.load();
const menuMusic = new Audio("SFX/menu_music.mp3");
menuMusic.preload = "auto";
menuMusic.loop = true;
menuMusic.volume = musicVolumeNum;
menuMusic.load();
const menuSelect = new Audio("SFX/menu_select.mp3");
menuSelect.preload = "auto";
menuSelect.volume = sfxVolumeNum;
menuSelect.load();
const controllerConnect = new Audio("SFX/controller_connect.mp3");
controllerConnect.preload = "auto";
controllerConnect.volume = sfxVolumeNum;
controllerConnect.load();
const runningSFX = new Audio("SFX/running.mp3");
runningSFX.preload = "auto";
runningSFX.volume = sfxVolumeNum;
runningSFX.loop = true;
runningSFX.load();
const crowd = new Audio("SFX/game_crowd.mp3");
crowd.preload = "auto";
crowd.volume = sfxVolumeNum / 1.25;
crowd.loop = true;
crowd.load();
const cheer = new Audio("SFX/crowd_cheer.mp3");
cheer.preload = "auto";
cheer.volume = sfxVolumeNum;
cheer.load();
const wallPlace = new Audio("SFX/wall-place.mp3");
wallPlace.preload = "auto";
wallPlace.volume = sfxVolumeNum;
wallPlace.load();
const wallDestroy = new Audio("SFX/wall-destroy.mp3");
wallDestroy.preload = "auto";
wallDestroy.volume = sfxVolumeNum;
wallDestroy.load();
const trapPlace = new Audio("SFX/trap-place.mp3");
trapPlace.preload = "auto";
trapPlace.volume = sfxVolumeNum;
trapPlace.load();
const trapActivate = new Audio("SFX/trap-activate.mp3");
trapActivate.preload = "auto";
trapActivate.volume = sfxVolumeNum;
trapActivate.load();

var frontText = $(".frontText");
      document.addEventListener("DOMContentLoaded", () => {
        frontText.css("opacity", 1);
        frontText.text("Doubling Guns... Loading...");
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
            JSlogo.style.opacity = 1;
            setTimeout(() => {
             frontText.css("opacity", 0);
             JSlogo.style.opacity = 0;
            }, 2000);
            }, 500);
          }, 2000);
        }, 4000);
        setTimeout(() => { //REMOVE ALL TEXT AND IMAGES TO REPLACE WITH THE GAME NAME IMAGE
          gameLogo.style.opacity = 1;
          menuMusic.play();
          setTimeout(() => {
            transitionScreen.classList.add("fade");
            gameLogo.style.opacity = 0;
            setTimeout(() => {
              transitionScreen.classList.remove("fade");
              transitionScreen.style.top = "100%";
              frontText.css("z-index", -2);
              gameLogo.style.zIndex = -2;
              JSlogo.style.zIndex = -2;
              inControllerCheck = true;
             }, 3000);
          }, 5000);
        }, 11000);
      }

var world = {
  gravity: 0.9,
}

var keys = {  //FOR KEYBOARD CONTROLS, NOT CURRENTLY USED
  w: false,
  a: false,
  s: false,
  d: false,
}
document.addEventListener("keydown", (e) => {
  if(e.key === "w")keys.w = true;
  if(e.key === "a")keys.a = true;
  if(e.key === "s")keys.s = true;
  if(e.key === "d")keys.d = true;
});
document.addEventListener("keyup", (e) => {
  if(e.key === "w")keys.w = false;
  if(e.key === "a")keys.a = false;
  if(e.key === "s")keys.s = false;
  if(e.key === "d")keys.d = false;
});

var players = [
  {
    index: 1,
    score: 0,
    width: 20,
    height: 40,
    x: 30,
    y: canvas.height - 40,
    color: playerOneColor.value,
    alive: true,
    grounded: true,
    health: 100,
    speed: 7,
    vy: 0,
    jumpStrength: 15,
    direction: "right",
    ammo: 30,
    maxAmmo: 30,
    reloading: false,
    reloadTime: 200,
    reload: 200,
    walls: 5,
    wallHealth: 100,
    justReleased: 0,
    b6Flag: true,
    gunEquipped: true,
    trapEquipped: false,
    traps: 15,
    tFlag: true,
  },
  {
    index: 2,
    score: 0,
    width: 20,
    height: 40,
    x: canvas.width - 30,
    y: canvas.height - 40,
    color: playerTwoColor.value,
    alive: true,
    grounded: true,
    health: 100,
    speed: 7,
    vy: 0,
    jumpStrength: 15,
    direction: "left",
    ammo: 30,
    maxAmmo: 30,
    reloading: false,
    reloadTime: 200,
    reload: 200,
    walls: 5,
    wallHealth: 100,
    justReleased: 0,
    b6Flag: true,
    gunEquipped: true,
    trapEquipped: false,
    traps: 15,
    tFlag: true,
  }
];
var healthBoxes = [];

setInterval(() => {
  if(gameFlag && time > 0){
    time--
    timer.textContent = time;
  }
  if(time <= 0){
    players.forEach(player => {player.health = 5;})
  }
  if(time === 30){
    healthBoxes.push({
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
      width: 10,
      height: 10,
    });
  }
}, 1000);

var bullets = [];
var traps = []

var walls = [];

// - - - - - - - - - - - - - - - - - - - - - - - LEVELS

const lone = [
  {x: 200, y: 300, width: 100, height: 10, health: 100, breakable: false, moving: false},
  {x: 500, y: 300, width: 100, height: 10, health: 100, breakable: false, moving: false},
  {x: 400, y: 300, width: 10, height: 110, health: 100, breakable: false, moving: true, direction: -1, axis: "x"},
  {x: 200, y: 300, width: 10, height: 110, health: 100, breakable: false, moving: true, direction: -1, axis: "x"},
  {x: 600, y: 300, width: 10, height: 110, health: 100, breakable: false, moving: true, direction: -1, axis: "x"},
  {x: 150, y: 400, width: 100, height: 10, health: 100, breakable: false, moving: false},
  {x: 150, y: 400, width: 10, height: 100, health: 100, breakable: false, moving: false},
  {x: 550, y: 400, width: 100, height: 10, health: 100, breakable: false, moving: false},
  {x: 650, y: 400, width: 10, height: 100, health: 100, breakable: false, moving: false},
  {x: 650, y: 200, width: 100, height: 10, health: 100, breakable: false, moving: false},
  {x: 50, y: 200, width: 100, height: 10, health: 100, breakable: false, moving: false},
  {x: 350, y: 200, width: 100, height: 10, health: 100, breakable: false, moving: false},
  {x: 250, y: 100, width: 100, height: 10, health: 100, breakable: false, moving: false},
  {x: 450, y: 100, width: 100, height: 10, health: 100, breakable: false, moving: false},
];
const ltwo = [
  {x: 390, y: 275, width: 25, height: 125, health: 100, breakable: false, moving: false},
  {x: 245, y: 200, width: 140, height: 25, health: 100, breakable: false, moving: false},
  {x: 420, y: 200, width: 140, height: 25, health: 100, breakable: false, moving: false},
  {x: 150, y: 400, width: 10, height: 100, health: 100, breakable: false, moving: false},
  {x: 150, y: 200, width: 10, height: 120, health: 100, breakable: false, moving: false},
  {x: 650, y: 400, width: 10, height: 100, health: 100, breakable: false, moving: false},
  {x: 650, y: 200, width: 10, height: 120, health: 100, breakable: false, moving: false},
  {x: 650, y: 320, width: 50, height: 10, health: 100, breakable: false, moving: false},
  {x: 650, y: 400, width: 50, height: 10, health: 100, breakable: false, moving: false},
  {x: 110, y: 320, width: 50, height: 10, health: 100, breakable: false, moving: false},
  {x: 110, y: 400, width: 50, height: 10, health: 100, breakable: false, moving: false},
  {x: 300, y: 400, width: 100, height: 10, health: 100, breakable: false, moving: false},
  {x: 400, y: 400, width: 100, height: 10, health: 100, breakable: false, moving: false},
];
const lthree = [
  {x: 350, y: 400, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: -1, axis: "x"},
  {x: 150, y: 400, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: -1, axis: "x"},
  {x: 550, y: 400, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: -1, axis: "x"},
  {x: 300, y: 300, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: 1, axis: "x"},
  {x: 100, y: 300, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: 1, axis: "x"},
  {x: 500, y: 300, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: 1, axis: "x"},
  {x: 400, y: 200, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: -1, axis: "x"},
  {x: 200, y: 200, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: -1, axis: "x"},
  {x: 600, y: 200, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: -1, axis: "x"},
  {x: 350, y: 100, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: 1, axis: "x"},
  {x: 150, y: 100, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: 1, axis: "x"},
  {x: 550, y: 100, width: 100, height: 10, health: 100, breakable: false, moving: true, direction: 1, axis: "x"},
  {x: 400, y: 400, width: 20, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
]
const lfour = [
  {x: 400, y: 400, width: 25, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 100, y: 100, width: 25, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 675, y: 100, width: 25, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 50, y: 100, width: 50, height: 10, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 700, y: 100, width: 50, height: 10, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 100, y: 250, width: 25, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 675, y: 250, width: 25, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 50, y: 250, width: 50, height: 10, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 700, y: 250, width: 50, height: 10, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 100, y: 400, width: 25, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 675, y: 400, width: 25, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 50, y: 400, width: 50, height: 10, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 700, y: 400, width: 50, height: 10, health: 100, breakable: false, moving: false, direction: undefined},
];
const lfive = [
  {x: 370, y: 150, width: 60, height: 200, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 340, y: 300, width: 120, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 150, y: 100, width: 80, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 600, y: 100, width: 80, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 375, y: 50, width: 60, height: 20, health: 100, breakable: true, moving: false, direction: undefined},
  {x: 200, y: 250, width: 50, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 550, y: 250, width: 50, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 150, y: 400, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 600, y: 400, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 390, y: 450, width: 25, height: 50, health: 100, breakable: false, moving: false, direction: undefined}
];
const lsix = [
  {x: 50, y: 450, width: 120, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 630, y: 450, width: 120, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 100, y: 400, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 200, y: 325, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 300, y: 250, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 600, y: 400, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 500, y: 325, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 400, y: 250, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 375, y: 225, width: 50, height: 25, health: 100, breakable: true, moving: false, direction: undefined},
  {x: 250, y: 125, width: 60, height: 15, health: 60, breakable: true, moving: false, direction: undefined},
  {x: 500, y: 125, width: 60, height: 15, health: 60, breakable: true, moving: false, direction: undefined}
];
const lseven = [
  {x: 50, y: 450, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 650, y: 450, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 200, y: 400, width: 25, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 575, y: 400, width: 25, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 300, y: 325, width: 50, height: 25, health: 50, breakable: true, moving: false, direction: undefined},
  {x: 450, y: 325, width: 50, height: 25, health: 50, breakable: true, moving: false, direction: undefined},
  {x: 375, y: 250, width: 50, height: 100, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 200, y: 150, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 575, y: 150, width: 100, height: 25, health: 100, breakable: false, moving: false, direction: undefined},
  {x: 375, y: 100, width: 50, height: 25, health: 50, breakable: true, moving: false, direction: undefined}
];
const leight = [
  // Bottom center divider (prevents spawn spam)
  { x: 375, y: 440, width: 50, height: 60, health: 200, breakable: false, moving: false, direction: undefined },
  // Left shelter (small safe nook for cover / trap placement)
  { x: 90, y: 330, width: 90, height: 60, health: 120, breakable: false, moving: false, direction: undefined },
  // Right shelter (mirror)
  { x: 620, y: 330, width: 90, height: 60, health: 120, breakable: false, moving: false, direction: undefined },
  // Upper-left stepping platforms (layered vertical play)
  { x: 95,  y: 220, width: 80,  height: 15, health: 90,  breakable: false, moving: false, direction: undefined },
  { x: 210, y: 160, width: 100, height: 15, health: 80,  breakable: true,  moving: false, direction: undefined }, // breakable step
  // Upper-right stepping platforms (mirror)
  { x: 625, y: 220, width: 80,  height: 15, health: 90,  breakable: false, moving: false, direction: undefined },
  { x: 490, y: 160, width: 100, height: 15, health: 80,  breakable: true,  moving: false, direction: undefined },
  // Mid-row breakable tiles across center — can open lanes as match progresses
  { x: 220, y: 300, width: 60, height: 18, health: 45, breakable: true, moving: false, direction: undefined },
  { x: 300, y: 300, width: 60, height: 18, health: 45, breakable: true, moving: false, direction: undefined },
  { x: 380, y: 300, width: 60, height: 18, health: 45, breakable: true, moving: false, direction: undefined },
  { x: 460, y: 300, width: 60, height: 18, health: 45, breakable: true, moving: false, direction: undefined },
  // Two horizontal moving platforms (left and right) — move on X axis between the given ranges
  { x: 240, y: 185, width: 120, height: 14, health: 120, breakable: false, moving: true, direction: 1,
    axis: "x"},
  { x: 440, y: 185, width: 120, height: 14, health: 120, breakable: false, moving: true, direction: -1,
    axis: "x"},
  // Two vertical gates near center — slide up/down to open/close lanes (axis: "y")
  { x: 300, y: 240, width: 26, height: 80, health: 110, breakable: false, moving: true, direction: 1,
    axis: "y", rangeMin: 200, rangeMax: 320},
  { x: 474, y: 240, width: 26, height: 80, health: 110, breakable: false, moving: true, direction: -1,
    axis: "y", rangeMin: 200, rangeMax: 320},
  // Top center small breakable perch (gives high ground but is fragile)
  { x: 370, y: 118, width: 60, height: 12, health: 40, breakable: true, moving: false, direction: undefined },
  // Lower side cover for close-quarter fights (keeps bottom from being empty)
  { x: 200, y: 410, width: 80, height: 18, health: 100, breakable: false, moving: false, direction: undefined },
  { x: 520, y: 410, width: 80, height: 18, health: 100, breakable: false, moving: false, direction: undefined }
];
var levels = [lone, ltwo, lthree, lfour, lfive, lsix, lseven, leight];

//LEVEL LOADER
function loadLevel(){
  walls = [];
  healthBoxes = [];
  var ranLvl = Math.floor(Math.random() * levels.length);
  var chosenLevel = levels[ranLvl];
  for(var i = 0; i < chosenLevel.length; i++){
    walls.push(chosenLevel[i]);
  }
}

function gameStart(){                          // - - - - - - - - - - GAME START - - - - - - - - - - - - 
  transitionScreen.textContent = "";
  transitionScreen.style.zIndex = 6;
  transitionScreen.classList.remove("slideUp");
  transitionScreen.classList.remove("slideIn");
  transitionScreen.classList.remove("slideOut");
  transitionScreen.classList.add("slideUp");
  setTimeout(() => {
    menuMusic.pause();
    crowd.play();
    document.querySelector(".menu").style.zIndex = -1;
    document.querySelector(".menu").style.opacity = 0;
    gameFlag = true;
    inMenu = false;
  loadLevel();
  players.forEach(player => {player.traps = 15});
  }, 2500);
}

//MENU SECTION
/*
MENU IS IN HTML, create index var that will follow controller input if 'inMenu'. On a certain index
have the div with the id NUMBER be highlighted, and if a is clicked, use '.click()' and it will trigger
addEventListener('click');
*/
var downFlag = true;
var upFlag = true;
var aFlag = true;
let menuSelectIndex = 1;
var id;
function menuSelectFunction(){
  id = (menuSelectIndex === 1) ? "one" : 
           (menuSelectIndex === 2) ? "two" : 
       (menuSelectIndex === 3) ? "three" :
       (menuSelectIndex === 4) ? "four" : 
       (menuSelectIndex === 5) ? "five" : 
       (menuSelectIndex === 6) ? "six" :
       (menuSelectIndex === 7) ? "seven" : 
       (menuSelectIndex === 8) ? "eight" : "nine";
  document.querySelector("#one").style.border = "2px solid black";
  document.querySelector("#two").style.border = "2px solid black";
  document.querySelector("#three").style.border = "2px solid black";
  document.querySelector("#four").style.border = "2px solid black";
  document.querySelector("#five").style.border = "2px solid black";
  document.querySelector("#six").style.border = "2px solid black";
  document.querySelector("#seven").style.border = "2px solid black";
  document.querySelector("#eight").style.border = "2px solid black";
  document.querySelector("#nine").style.border = "2px solid black";
  document.querySelector("#one").style.color = "black";
  document.querySelector("#two").style.color = "black";
  document.querySelector("#three").style.color = "black";
  document.querySelector("#four").style.color = "black";
  document.querySelector("#five").style.color = "black";
  document.querySelector("#six").style.color = "black";
  document.querySelector("#seven").style.color = "black";
  document.querySelector("#eight").style.color = "black";
  document.querySelector("#nine").style.color = "black";
  
  document.querySelector("#" + id).style.border = "2px solid lightgreen";
  document.querySelector("#" + id).style.color = "lightgreen";
}
function leavingScreen(){
  leaving = true;
  document.querySelector(".leavingScreen").style.zIndex = 6;
  document.querySelector(".leavingScreen").style.opacity = 1;
}
function settings(){
  inSettings = true;
  menuSelectFunction();
  menuSelectIndex = 4;
  document.querySelector(".settings").style.opacity = 1;
  document.querySelector(".settings").style.zIndex = 6;
}
menuSelectFunction();

function checkCollision(player, x, y){
    return walls.some(wall => 
        x + player.width > wall.x &&
        x < wall.x + wall.width &&
        y + player.height > wall.y &&
        y < wall.y + wall.height
   );                    
}

function applyDeadzone(value, threshold = 0.2) {
      return Math.abs(value) < threshold ? 0 : value;
    }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - UPDATE FUNCTION - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function update(){
  const gamepads = navigator.getGamepads();

  if(inControllerCheck){ 
      if(gamepads[0]){
        controllerConnect.play();
      $(".controllerCheckONE h1").text("Connected!");
      $(".controllerCheckONE").css("opacity", 1);
      $(".controllerCheckONE").addClass("pulse");
      if(gamepads[0].buttons[0].pressed){
        inControllerCheck = false;
      $(".controllerCheck").css("opacity", 0);
      setTimeout(() => {
        $(".controllerCheck").css("z-index", -6);
      inMenu = true;
      }, 3000);
      }
      }
      if(gamepads[1]){
        controllerConnect.play();
        inControllerCheck = false;
      $(".controllerCheckTWO h1").text("Connected!");
      $(".controllerCheckTWO").css("opacity", 1);
      $(".controllerCheckTWO").addClass("pulse");
      $(".controllerCheck").css("opacity", 0);
      setTimeout(() => {
        $(".controllerCheck").css("z-index", -6);
      inMenu = true;
      }, 3000);
      }
  }

      players.forEach((player, i) => {
        const gp = gamepads[i]; // each player uses a different controller   NOTE: THIS WAS NOT CREATED BY ME, I AM CURRENTLY STUDYING AND LOOKING AT THIS
        if (!gp) return; // skip if controller not connected

        //MENU WORKINGS
    if(gamepads[0].axes[1] > 0.4 && inMenu && downFlag){
      menuSelectIndex++
      if(!inSettings){
        menuSelectIndex = Math.min(menuSelectIndex, 3);
      }
      else {
        menuSelectIndex = Math.min(menuSelectIndex, 9);
      }
      menuSelectFunction();
      downFlag = false;
   }
        else if(gamepads[0].axes[1] < 0.4){
          downFlag = true;
        }
    if(gamepads[0].axes[1] < -0.4 && inMenu && upFlag){
      menuSelectIndex--
      if(inSettings){
        menuSelectIndex = Math.max(menuSelectIndex, 4);
      }
      else {
        menuSelectIndex = Math.max(menuSelectIndex, 1);
      }
      menuSelectFunction();
      upFlag = false;
   }
        else if(gamepads[0].axes[1] > -0.4){
          upFlag = true;
        }
    if(gamepads[0].buttons[0].pressed && inMenu && aFlag){
      document.querySelector("#" + id).click();
      menuSelect.play();
      aFlag = false;
    }
        else {
          aFlag = true;
        }
    if(gamepads[0].buttons[0].pressed && inMenu && leaving){
      window.location.href = '../index.html';
    }
        else if(gamepads[0].buttons[1].pressed && inMenu && leaving){
          leaving = false;
  document.querySelector(".leavingScreen").style.zIndex = -2;
  document.querySelector(".leavingScreen").style.opacity = 0;
        }
    if(gamepads[0].buttons[1].pressed && inMenu && inSettings){
      inSettings = false;
      document.querySelector(".settings").style.opacity = 0;
      document.querySelector(".settings").style.zIndex = -3;
      id = "one";
      menuSelectIndex = 1;
      menuSelectFunction();
    }
    if(inSettings && gamepads[0].axes[3] > 0.4){
      document.querySelector(".settings").scrollBy(0, 5);
    }
    else if(inSettings && gamepads[0].axes[3] < -0.4){
      document.querySelector(".settings").scrollBy(0, -5);
    }
        if(inSettings && id === "four" && gamepads[0].buttons[14].pressed){
          musicVolumeNum -= 0.01;
          musicVolumeNum = Math.max(musicVolumeNum, 0);
          musicVolume.value = musicVolumeNum;
          adjustMusicVolume();
        }
        else if(inSettings && id === "four" && gamepads[0].buttons[15].pressed){
          musicVolumeNum += 0.01;
          musicVolumeNum = Math.min(musicVolumeNum, 1);
          musicVolume.value = musicVolumeNum;
          adjustMusicVolume();
        }
        if(inSettings && id === "five" && gamepads[0].buttons[14].pressed){
          sfxVolumeNum -= 0.01;
          sfxVolumeNum = Math.max(sfxVolumeNum, 0);
          sfxVolume.value = sfxVolumeNum;
          adjustSFXVolume();
        }
        else if(inSettings && id === "five" && gamepads[0].buttons[15].pressed){
          sfxVolumeNum += 0.01;
          sfxVolumeNum = Math.min(sfxVolumeNum, 1);
          sfxVolume.value = sfxVolumeNum;
          adjustSFXVolume();
        }
        if(inSettings && id === "six" && gamepads[0].buttons[14].pressed && rmT){
          rmT = false;
          roundsModifierNum--
          roundsModifierNum = Math.max(roundsModifierNum, 3);
          roundsModifier.value = roundsModifierNum;
        }
        else if(inSettings && id === "six" && gamepads[0].buttons[15].pressed && rmT){
          rmT = false;
          roundsModifierNum++
          roundsModifierNum = Math.min(roundsModifierNum, 20);
          roundsModifier.value = roundsModifierNum;
        }
        else if(inSettings && id === "six" && !gamepads[0].buttons[15].pressed && !gamepads[0].buttons[14].pressed && !rmT){
          rmT = true;
        }
        if(inSettings && id === "seven" && gamepads[0].buttons[14].pressed && cT){
          pOCIndex--
          pOCIndex = Math.max(pOCIndex, 0);
          playerOneColor.value = colors[pOCIndex];
          playerTwoColor.value = colors[pTCIndex];
          document.querySelector(".playerOneColor").style.color = colors[pOCIndex];
          document.querySelector(".playerTwoColor").style.color = colors[pTCIndex];
          players[0].color = playerOneColor.value;
          redSide.style.background = players[0].color;
          if(players[0].color === "black")redText.style.color = "white";
          else redText.style.color = "black";
          cT = false;
        }
        else if(inSettings && id === "seven" && gamepads[0].buttons[15].pressed && cT){
          pOCIndex++
          pOCIndex = Math.min(pOCIndex, colors.length - 1);
          playerOneColor.value = colors[pOCIndex];
          playerTwoColor.value = colors[pTCIndex];
          document.querySelector(".playerOneColor").style.color = colors[pOCIndex];
          document.querySelector(".playerTwoColor").style.color = colors[pTCIndex];
          players[0].color = playerOneColor.value;
          redSide.style.background = players[0].color;
          if(players[0].color === "black")redText.style.color = "white";
          else redText.style.color = "black";
          cT = false;
        }
        else if(inSettings && id === "seven" && !gamepads[0].buttons[15].pressed && !gamepads[0].buttons[14].pressed && !cT){
          cT = true;
        }
        if(inSettings && id === "eight" && gamepads[0].buttons[14].pressed && cTT){
          pTCIndex--
          pTCIndex = Math.max(pTCIndex, 0);
          playerOneColor.value = colors[pOCIndex];
          playerTwoColor.value = colors[pTCIndex];
          document.querySelector(".playerOneColor").style.color = colors[pOCIndex];
          document.querySelector(".playerTwoColor").style.color = colors[pTCIndex];
          players[1].color = playerTwoColor.value;
          blueSide.style.background = players[1].color;
          if(players[1].color === "black")blueText.style.color = "white";
          else blueText.style.color = "black";
          cTT = false;
        }
        else if(inSettings && id === "eight" && gamepads[0].buttons[15].pressed && cTT){
          pTCIndex++
          pTCIndex = Math.min(pTCIndex, colors.length - 1);
          playerOneColor.value = colors[pOCIndex];
          playerTwoColor.value = colors[pTCIndex];
          document.querySelector(".playerOneColor").style.color = colors[pOCIndex];
          document.querySelector(".playerTwoColor").style.color = colors[pTCIndex];
          players[1].color = playerTwoColor.value;
          blueSide.style.background = players[1].color;
          if(players[1].color === "black")blueText.style.color = "white";
          else blueText.style.color = "black";
          cTT = false;
        }
        else if(inSettings && id === "eight" && !gamepads[0].buttons[15].pressed && !gamepads[0].buttons[14].pressed && !cTT){
          cTT = true;
        }
        if(inSettings && id === "nine"){
          document.querySelector(".controls").style.zIndex = 7;
          document.querySelector(".controls").style.opacity = 1;
        }
        else if(!inSettings || id !== "nine"){
          document.querySelector(".controls").style.zIndex = -5;
          document.querySelector(".controls").style.opacity = 0;
        }
        
        // LEFT STICK MOVEMENT
        let moveX = applyDeadzone(gp.axes[0]);
        let newX = player.x;
        let newY = player.y;
        
        if(moveX > 0.4 && gameFlag){
          player.direction = "right";
          runningSFX.play();
        }
        else if(moveX < -0.4 && gameFlag) {
          player.direction = "left";
          runningSFX.play();
        }
        else {
          runningSFX.pause();
        }
        
        if(gp.buttons[0].pressed && player.grounded && gameFlag){
          player.grounded = false;
          player.vy = -player.jumpStrength;
        }
        if(gp.buttons[2].pressed && gameFlag){
          player.ammo = 0;
        }
        if(gp.buttons[1].pressed && gameFlag){
          player.justReleased = 0;
          player.height = 20;
        }
        else {
          player.justReleased++
          if(player.justReleased === 1)player.y -= 20;
          player.height = 40;
        }
        if(gp.buttons[6].pressed && player.b6Flag && gameFlag){
          player.b6Flag = false;
          if(player.walls > 0){
            wallPlace.play();
            player.walls--
            walls.push({
              x: (player.direction === "right") ? (player.x + player.width) + 25 : player.x - 25,
              y: player.y - 50,
              width: 15,
              height: 90,
              health: player.wallHealth,
              breakable: true,
              moving: false,
              direction: undefined,
            });
          }
        }
        else if(!gp.buttons[6].pressed && !player.b6Flag){
          player.b6Flag = true;
        }
        if(gp.buttons[7].pressed && gameFlag && player.gunEquipped){
          if(player.ammo > 0 && !player.reloading){
           player.ammo--
          var bullet = {
            size: 5,
            x: (player.direction === "right") ? (player.x + player.width + 10) : (player.x - 15),
            y: player.y + (player.height / 2),
            direction: (player.direction === "right") ? 1 : -1,
            speed: 10,
          }
          bullets.push(bullet);
          if(player.index === 1 && player.ammo % 3 === 0){
            playSound(redShoot);
          }
          else if(player.index === 2 && player.ammo % 3 === 0) {
            playSound(blueShoot);
          }
          }
        }
            if(player.ammo <= 0){
            player.reloading = true;
            player.reload--
            if(player.reload === 0){
              player.ammo = player.maxAmmo;
              player.reloading = false;
              player.reload = player.reloadTime;
            }
        }

        if(gp.buttons[7].pressed && gameFlag && player.trapEquipped && player.tFlag && player.traps > 0){
          player.tFlag = false;
          trapPlace.play();
          player.traps--
          var trap = {
            index: player.index,
            x: player.x,
            y: player.y + player.height - 20,
            size: 20,
          }
          traps.push(trap);
        }
        else if(!gp.buttons[7].pressed && gameFlag && player.trapEquipped && !player.tFlag){
          player.tFlag = true;
        }

        if(gp.buttons[4].pressed && gameFlag){
          player.gunEquipped = true;
          player.trapEquipped = false;
        }
        else if(gp.buttons[5].pressed && gameFlag){
          player.gunEquipped = false;
          player.trapEquipped = true;
        }

        if(player.alive && gameFlag){
        newX += moveX * player.speed;
        player.vy += world.gravity;
        newY += player.vy;
        }
        
        if(!checkCollision(player, newX, player.y) && newX > 0 && newX + player.width < canvas.width) {
         player.x = newX;
        }
        if(!checkCollision(player, player.x, newY) && newY + player.height < canvas.height) {
         player.y = newY;
       } else {
         player.grounded = true;
         player.vy = 0;
        }
        
        if(player.y + player.height >= canvas.height && gameFlag){
          player.grounded = true;
          player.vy = 0;
        }
      });
      
        walls.some(wall => {         //WALL BULLET COLLISION
          bullets = bullets.filter(b => {
              if(wall.x + wall.width > b.x &&
                 wall.x < b.x + b.size &&
                 wall.y + wall.height > b.y &&
                 wall.y < b.y + b.size){
                if(wall.breakable){
                  wall.health -= 5;
                }
                return false;
              }
          else return true;
         });
          if(wall.moving && gameFlag){
            if(wall.axis === "x"){
              wall.x += wall.direction;
            }
            if(wall.x < 0 || wall.x + wall.width > canvas.width && wall.axis === "x"){
              wall.direction *= -1;
            }
            if(wall.axis === "y"){
              wall.y += wall.direction;
            }
            if(wall.y < 0 || wall.y + wall.height > canvas.height || wall.y < wall.rangeMin || wall.y > wall.rangeMax && wall.axis === "y"){
              wall.direction *= -1;
            }
          }
        });
  walls = walls.filter(wall => {
    if(wall.health <= 0){
      wallDestroy.play();
      return false;
    }
    else return true;
  });
  
  players.some(player => {      //PLAYER BULLET COLLISION
    bullets = bullets.filter(b => {
          if(player.x + player.width > b.x &&
             player.x < b.x + b.size &&
             player.y + player.height > b.y &&
             player.y < b.y + b.size){
            player.health -= 4;
            player.health = Math.max(player.health, 0);
            document.querySelector("#canvas").classList.add("shake");
            return false;
             }
             else if(b.x < 0 || b.x > canvas.width){
              return false;
             }
             else{
              b.x += (b.direction * b.speed);
              document.querySelector("#canvas").classList.remove("shake");
              return true;
             }
            
        });

        traps = traps.filter(trap => {
          if(player.x + player.width > trap.x &&
             player.x < trap.x + trap.size &&
             player.y + player.height > trap.y &&
             player.y < trap.y + trap.size && trap.index !== player.index
          ){
            trapActivate.play();
            player.health -= 50;
            player.health = Math.max(player.health, 0);
            return false;
          }
          else return true;
        });
    if(player.health === 0){
      player.y = canvas.height;
      player.alive = false;
      gameFlag = false;
      playerDeath();
      player.health = 1;
    }
    healthBoxes = healthBoxes.filter(box => {
      if(player.x + player.height > box.x &&
        player.x < box.x + box.height &&
        player.y + player.height > box.y &&
        player.y < box.y + box.height){
        player.health += 50;
        return false;
      }
      else return true;
    }); //PLAYER HEALING
  });
  
  requestAnimationFrame(update);
  draw();
}

//NEW POST-ROUND SCORE ANIMATIONS
var redSide = document.querySelector(".red_Side");
var blueSide = document.querySelector(".blue_Side");
var redText = document.querySelector(".redScore");
var blueText = document.querySelector(".blueScore");

function redRoundVictory(){
  redSide.classList.add("redSlideIn");
  blueSide.classList.add("blueSlideIn");
  blueSide.style.opacity = 0.5;
  redSide.style.opacity = 1;

  setTimeout(() => {
     redSide.style.opacity = 0;
     blueSide.style.opacity = 0;
  }, 5000);
}
function blueRoundVictory(){
  redSide.classList.add("redSlideIn");
  blueSide.classList.add("blueSlideIn");
  blueSide.style.opacity = 1;
  redSide.style.opacity = 0.5;

  setTimeout(() => {
     redSide.style.opacity = 0;
     blueSide.style.opacity = 0;
  }, 5000);
}


function redMatchVictory(){
  redSide.classList.add("redSlideIn");
  blueSide.classList.add("blueSlideIn");
setTimeout(() => {
  blueSide.style.opacity = 0;
  redSide.style.opacity = 1;

  setTimeout(() => {
    redText.textContent = "VICTORY";
    redSide.style.width = "100vw";
  }, 2000);
}, 2000);
}
function blueMatchVictory(){
setTimeout(() => {
  blueSide.style.opacity = 1;
  redSide.style.opacity = 0;

  setTimeout(() => {
    blueText.textContent = "VICTORY";
    blueSide.style.width = "100vw";
    blueSide.style.left = "0px";
  }, 2000);
}, 2000);
}


/*RED RESET
redSide.classList.remove("redSlideIn");
redText.textContent = 0;//SHOULD BE PLAYERONE SCORE
redSide.style.opacity = 0.5;
redSide.style.width = "50vw";
*/

/*BLUE RESET
blueSide.classList.remove("blueSlideIn");
blueText.textContent = 0;//SHOULD BE PLAYERTWO SCORE
blueSide.style.opacity = 0.5;
blueSide.style.width = "50vw";
blueSide.style.left = "50%";
*/

function randomPerk(){
  var perks = ["Double Jump Strength!", "Double Ammo!", "Double Speed!", "Low Gravity!", "Where'd I put my glasses?", "Stronger Walls!"];
  let num = Math.floor(Math.random() * perks.length);
  if(num === 0){
    players.forEach(player => {player.jumpStrength += 5;});
  }
  else if(num === 1){
    players.forEach(player => {player.maxAmmo += 30; player.ammo += 30;});
  }
  else if(num === 2){
    players.forEach(player => {player.speed += 4;});
  }
  else if(num === 3){
    world.gravity = 0.5;
  }
  else if(num === 4){
    $("#canvas").css("filter", "blur(20px)");
  }
  else if(num === 5){
    players.forEach(player => {player.wallHealth = 300;});
  }
  return perks[num];
}

var textFlag = false;
var text = "";
var perkText = "";
var index = 0;
setInterval(() => {
                if(textFlag){
                  text += perkText[index];
                  index++
                  transitionScreen.textContent = text;
                  if(index >= perkText.length){
                    textFlag = false;
                  }
                }
              }, 100);
function playerDeath(){  // - - - - - - - - - - - - - - - - - - - - - - - PLAYER DEATH FUNCTION
  roundEnd.play();
  cheer.play();
  transitionScreen.classList.remove("slideUp");
  transitionScreen.classList.remove("slideIn");
  transitionScreen.classList.remove("slideOut");
  transitionScreen.textContent = "";
  transitionScreen.style.zIndex = 6;
  textFlag = false;
  setTimeout(() => {
    roundScore.play();
    players.some(player => {
        //ROUND WINNERS AND MATCH ENDS AFTER SET AMOUNT OF WINS
        if(player.health > 1){
          player.score++
          round++
          redText.textContent = players[0].score;
          blueText.textContent = players[1].score;
          if(player.index === 1){
            redRoundVictory();
          }
          else {
            blueRoundVictory();
          }
          if(player.score < roundsModifierNum){
            setTimeout(() => {
              transitionScreen.classList.add("slideIn");
            }, 5000);
            setTimeout(() => {
              index = 0;
              textFlag = true;
              perkText = "";
              perkText = randomPerk();
              text = "";
            }, 8000);
            setTimeout(() => {
              transitionScreen.classList.remove("slideIn");
              transitionScreen.classList.add("slideOut");
              time = 62;
          timer.textContent = time;
          gameFlag = true;
         inMenu = false;
         textFlag = false;
         traps = [];
        loadLevel();
          player.alive = true;
            }, 13000);
      }
        else {
          redText.textContent = players[0].score;
          blueText.textContent = players[1].score;
          if(players[0].score > players[1].score){
            redMatchVictory();
          }
          else {
            blueMatchVictory();
          }
          setTimeout(() => {
            transitionScreen.classList.add("slideUp");
          timer.textContent = "";
          setTimeout(() => {
            crowd.pause();
            menuMusic.play();
            gameFlag = false;
          inMenu = true;
          walls = [];
          healthBoxes = [];
          traps = [];
          players.forEach(player => {player.score = 0;});
          console.log("Check @395: Bad -> Ending Game");
            document.querySelector(".menu").style.zIndex = 3;
            document.querySelector(".menu").style.opacity = 1;
          }, 2500);
          }, 7000);
         }
        }
      });
  
    setTimeout(() => {
      world.gravity = 0.9;
      $("#canvas").css("filter", "blur(0px)");
      players.forEach(player => {  //COMPLETE RESET
        player.width = 20;
    player.height = 40;
    player.x = (player.index === 1) ? 30 : canvas.width - 30;
    player.y = canvas.height - 50;
    player.grounded = false;
    player.speed = 7;
    player.health = 100;
    player.jumpStrength = 15;
    player.direction = (player.index === 1) ? "right" : "left";
    player.ammo = 30;
    player.maxAmmo = 30;
    player.reloading = false;
    player.reloadTime = 200;
    player.reload = 200;
    player.walls = 5;
    player.wallHealth = 100;
    player.alive = true;      
      });
      redSide.classList.remove("redSlideIn");
redText.textContent = 0;//SHOULD BE PLAYERONE SCORE
redSide.style.opacity = 0;
redSide.style.width = "50vw";

blueSide.classList.remove("blueSlideIn");
blueText.textContent = 0;//SHOULD BE PLAYERTWO SCORE
blueSide.style.opacity = 0;
blueSide.style.width = "50vw";
blueSide.style.left = "50%";
    }, 7900);
  }, 2000);
}



function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if(!inMenu){
  players.forEach(player => {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#444";
    if(player.direction === "right" && player.gunEquipped){                               //GUN
      ctx.fillRect((player.x + player.width), player.y + (player.height / 2), 15, 5);
    }
    else if(player.direction === "left" && player.gunEquipped){
      ctx.fillRect(player.x - 15, player.y + (player.height / 2), 15, 5);
    }
    else if(player.direction === "right" && player.trapEquipped){                               //GUN
      ctx.fillRect((player.x + player.width), player.y + (player.height / 2), 10, 10);
    }
    else if(player.direction === "left" && player.trapEquipped){
      ctx.fillRect(player.x - 10, player.y + (player.height / 2), 10, 10);
    }
    
      ctx.fillStyle = players[0].color;     //HEALTH BARS
      ctx.fillRect(10, 10, players[0].health * 1.5, 20);
      ctx.fillStyle = players[1].color;
      ctx.fillRect((canvas.width - (players[1].health * 1.5)) - 10, 10, players[1].health * 1.5, 20);

    ctx.fillStyle = "#B59410";     //AMMO

      ctx.fillRect(10, 35, players[0].ammo * 4, 20);
      ctx.fillRect((canvas.width - (players[1].ammo * 4)) - 10, 35, players[1].ammo * 4, 20);

    ctx.font = "15px Impact";
    ctx.fillStyle = "black";
    ctx.fillText("Walls: " + players[0].walls, 10, 75);
    ctx.fillText("Walls: " + players[1].walls, canvas.width - 70, 75);
    ctx.font = "15px Impact";
    ctx.fillStyle = (!players[0].gunEquipped) ? "rgba(0, 0, 0, 0)" : "black";
    ctx.fillText("Rifle", 10, 90);

    ctx.fillStyle = (!players[0].trapEquipped) ? "rgba(0, 0, 0, 0)" : "black";
    ctx.fillText("Traps: " + players[0].traps, 10, 90);

    ctx.fillStyle = (!players[1].gunEquipped) ? "rgba(0, 0, 0, 0)" : "black";
    ctx.fillText("Rifle", canvas.width - 70, 90);

    ctx.fillStyle = (!players[1].trapEquipped) ? "rgba(0, 0, 0, 0)" : "black";
    ctx.fillText("Traps: " + players[1].traps, canvas.width - 70, 90);

    healthBoxes.forEach(box => {
      ctx.fillStyle = "white";
      ctx.fillRect(box.x, box.y, box.width, box.height);
      ctx.fillStyle = "red";
      ctx.fillRect(box.x + 1, box.y + 4, 7, 1);
      ctx.fillRect(box.x + 4, box.y + 1, 1, 7);
    });
  });
  
  walls.forEach(wall => {
    ctx.fillStyle = "rgba(169, 169, 169, " + wall.health + ")";
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  });
  
  bullets.forEach(bullet => {
    ctx.fillStyle = "gold";
    ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
  });

  traps.forEach(trap => {
    ctx.fillStyle = "#222";
    ctx.fillRect(trap.x, trap.y, trap.size, trap.size);
  });
  
  }   //ENDING GAME FLAG BRACKET
}
update();