var gameFlag = false;
var ambience = document.getElementById("ambience");
ambience.volume = 1;
var Deadambience = document.getElementById("Deadambience");
var enemyScream = document.getElementById("enemyChase");
enemyScream.volume = 0.4;
var ghostSfx = document.getElementById("ghost");
var alarm = document.getElementById("alarm");
var safeOpenSFX = document.getElementById("safeOpen");
var movingFlag = true;
var menu = document.querySelector(".menu");
var objectiveBox = document.querySelector(".items");
var objective = document.querySelector(".trapsCount");
var body = document.querySelector(".body")
var infoBox = document.querySelector(".information");
var time = 0;
var canvasDIV = document.querySelector(".canvas");
canvasDIV.opacity = 0;
var canvas = document.getElementById("canvas");
var canvasSize = 6000;
canvas.width = canvasSize;
canvas.height = canvasSize;
var ctx = canvas.getContext("2d");

var maxSpeed = 6;

var player = {
  x: 200,
  y: 200,
  size: 50,
  speed: 2,
}
var enemy = {  
  x: 4900,
  y: 4900,
  size: 50,
  speed: 1,
}
var ghost = {
  x: 5000,
  y: 5000,
  size: 75,
  speed: 6,
  up: false,
  down: false,
  left: false,
  right: false
}
var door = {
  x: 6200,
  y: 6200,
  width: 20,
  height: 200,
};

var moving = {
  w: false,
  a: false,
  s: false,
  d: false,
  up: false,
  down: false,
  left: false,
  right: false,
}

var walls = [];
var evidences = [];
var hidingSpots = [];
var playerHiding = false;
var safes = [];

startGame();
    time = 0;
    infoBox.textContent = "What is this place?";
    objective.textContent = "Escape...";
    update();
    canvasDIV.classList.add("fadeIn");
    setTimeout(() => {
      objectiveBox.classList.add("fadeIn");
    }, 20000);

function startGame(){
  gameFlag = true;
  ambience.play();
  
  setInterval(() => {
    time++
    var eventTime = Math.floor(Math.random() * (120 - 1) + 1);
    
    if(time % eventTime === 0){
      event();
      eventTime = Math.floor(Math.random() * (120 - 30 + 1) + 30);
      time = 0;
    }
  }, 1000)


//Walls section
for(var i = 0; i <  75; i++){
  walls.push({x: Math.floor(Math.random() * (canvasSize - 1) + 1), y: Math.floor(Math.random() * (canvasSize - 1) + 1), width: Math.floor(Math.random() * (180 - 100) + 100), height: Math.floor(Math.random() * (180 - 100) + 100)});
}

for(var i = 0; i <  40; i++){
  //Long Vertical walls
  walls.push({x: Math.floor(Math.random() * (canvasSize - 1) + 1), y: Math.floor(Math.random() * (canvasSize - 1) + 1), width: 30, height: Math.floor(Math.random() * (900 - 500) + 500)});

  //Long Horizontal walls
  walls.push({x: Math.floor(Math.random() * (canvasSize - 1) + 1), y: Math.floor(Math.random() * (canvasSize - 1) + 1), width: Math.floor(Math.random() * (1200 - 700) + 700), height: 30});
}

//Safes Section

var safesOpened = 0;

for(var i = 0; i < 4; i++){
  safes.push({x: Math.floor(Math.random() * (canvasSize - 1) + 1), y: Math.floor(Math.random() * (canvasSize - 1) + 1), size: 20})
}
safes.push({x: 280, y: 280, size: 20});
safes.push({x: 320, y: 320, size: 20});
safes.push({x: 360, y: 360, size: 20});



setInterval(() =>{
  safes.some(safe => {
    walls.some(wall => {
      if(wall.x + wall.width >= safe.x && 
         wall.x <= safe.x + safe.size &&
         wall.y + wall.height >= safe.y &&
         wall.y <= safe.y + safe.size
        ){
          safe.x = Math.floor(Math.random() * (canvasSize - 75) + 75);
          safe.y = Math.floor(Math.random() * (canvasSize - 75) + 75);
      }
    })
  })
}, 250)


//End of section

//Hiding Spots section

for(var i = 0; i < 15; i++){
  hidingSpots.push({x: Math.floor(Math.random() * (canvasSize - 1) + 1), y: Math.floor(Math.random() * (canvasSize - 1) + 1), size: 75})
}

  
//End of section

startGhostPath();

} //IF GAME STARTED STATEMENT END BRACKET

//Ending section
var ending = false;
var escaped = false;
var clock;
var flash;

function checkEnding(){
  if(safesOpened === 3){
    ending = true;
    objective.textContent = "LEAVE!"
    alarm.play();
    enemyScream.play();
    enemyScream.volume = 0.8;
    canvasDIV.classList.remove("flicker");
    canvasDIV.classList.remove("fadeIn");
    canvasDIV.classList.add("shake");
    enemy.speed = 3.5;
    player.speed = 5;
    var timer = 60;
    infoBox.textContent = timer;
    clock = setInterval(() => {
      timer--
      infoBox.textContent = timer;
      if(timer < 1){
        outOfTime();
      }
    }, 1000);
    flash = setInterval(() => {
      body.classList.toggle("red");
    }, 500);

    doorFlicker();
    door.x = 5980;
    door.y = Math.floor(Math.random() * 5800);
  }
};


//End of section

//Safe unlock section
var number = 0;
var safesOpened = 0;
var safeUnlockScreen = document.querySelector(".JesterBox"); //Box itself
var safeNum = document.querySelector(".JesterNum");  //Number display
var safeInputBox = document.querySelector(".JesterInput");  //Input BOX
var submitBtn = document.querySelector(".submitBtn");

function openSafe(){
  number = Math.floor(Math.random() * 1000000000);
  safeUnlockScreen.style.opacity = 1;
safeUnlockScreen.style.zIndex = 5;
safeNum.textContent = number;
safeInputBox.value = '';
}

submitBtn.addEventListener("click", () => {
  var safeInput = safeInputBox.value;
 if(Number(safeInput) === number){
  safeUnlockScreen.style.opacity = 0;
  safeUnlockScreen.style.zIndex = -1;
  safeOpenSFX.play();
  safesOpened++
  infoBox.textContent = safesOpened + "/3 Safes opened!"
  checkEnding();
 }
 else{
  safeInputBox.value = '';
 }
});
//End of section


document.addEventListener("keydown", (event) => {
  if(event.key == "w" && gameFlag === true) {moving.w = true;}
  if(event.key == "a" && gameFlag === true) {moving.a = true;}
  if(event.key == "s" && gameFlag === true) {moving.s = true;}
  if(event.key == "d" && gameFlag === true) {moving.d = true;}

  }
);
document.addEventListener("keyup", (event) => {
  if(event.key == "w") {moving.w = false;}
  if(event.key == "a") {moving.a = false;}
  if(event.key == "s") {moving.s = false;}
  if(event.key == "d") {moving.d = false;}
});

function isColliding(x, y){
  return walls.some(wall => 
         x + player.size > wall.x && 
         x < wall.x + wall.width && 
         y + player.size > wall.y &&
         y < wall.y + wall.height
                   );
}
function isEnemyColliding(x, y){
  return walls.some(wall => 
         x + enemy.size > wall.x && 
         x < wall.x + wall.width && 
         y + enemy.size > wall.y &&
         y < wall.y + wall.height
                   );
}

function startGhostPath(){
  var g = Math.floor(Math.random() * 5);

  if(g == 1){ghost.up = true; ghost.down = false; ghost.left = false; ghost.right = false};
  if(g == 2){ghost.up = false; ghost.down = true; ghost.left = false; ghost.right = false};
  if(g == 3){ghost.up = false; ghost.down = false; ghost.left = true; ghost.right = false};
  if(g == 4){ghost.up = false; ghost.down = false; ghost.left = false; ghost.right = true};

  setTimeout(() => {
    startGhostPath();
  }, 10000);
}



//UPDATE FUNCTION - - - - - - - - - - - - - - - - - - - - - - -



function update(){
  var newX = player.x;
  var newY = player.y;
  
  if(moving.w) newY -= player.speed;
  if(moving.a) newX -= player.speed;
  if(moving.s) newY += player.speed;
  if(moving.d) newX += player.speed;
  
  if(!isColliding(newX, player.y)) player.x = newX;
  if(!isColliding(player.x, newY)) player.y = newY;
  
  player.x = Math.max(0, Math.min(canvas.width - player.size, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.size, player.y));
  
  if(player.y % 600 < 10 && moving.s){
    canvasDIV.scrollTop = player.y;
  }
  if(player.y % 600 < 10 && moving.w){  
    canvasDIV.scrollTop = player.y - 600;
  }
  if(player.x % 1000 < 10 && moving.d){
    canvasDIV.scrollLeft = player.x;
  }
  if(player.x % 1000 < 10 && moving.a){
    canvasDIV.scrollLeft = player.x - 1000;
  }

  //Player hiding section

  // Store previous state to compare

  var playerInRange = false;

  playerHiding = hidingSpots.some(spot => {
    return (
      player.x + player.size > spot.x &&
      player.x < spot.x + spot.size &&
      player.y + player.size > spot.y &&
      player.y < spot.y + spot.size
    );
});

  var enemyLeave = false;
  if(player.x + player.size + 800 > enemy.x &&
    player.x - 800 < enemy.x + enemy.size &&
    player.y + player.size + 800 > enemy.y &&
    player.y - 800 < enemy.y + enemy.size && gameFlag)
    {
      playerInRange = true;
    }
    else {
      playerInRange = false;
    }

    if(playerHiding && !ending){
      ambience.pause();
      enemyScream.pause();
    }
    else{
      ambience.play();
    }

    var enemyChase = false;
    if(playerInRange && !playerHiding && !ending){
      enemy.speed = 3.3;
      player.speed = 3;
      enemyChase = true;
      infoBox.textContent = "HIDE";
      canvasDIV.classList.remove("flicker");
      canvasDIV.classList.remove("fadeIn");
      canvasDIV.classList.add("shake");
      enemyScream.play();
    }
    else if(playerInRange && playerHiding && !ending){
      enemyLeave = true;
      player.speed = 2;
      enemyChase = false;
      infoBox.textContent = " ";
      canvasDIV.classList.remove("shake");
      enemyScream.pause();
    }
    else if(!playerInRange && !playerHiding && !ending){
      enemy.speed = 1;
    }
    if(enemyLeave && !ending){
      enemy.speed = -1;
      if(!playerHiding){
        enemy.speed = 1;
        enemyLeave = false;
      }
    }
    if(!playerInRange && enemyChase && playerHiding && !ending){
      enemyScream.pause();
      infoBox.textContent = " ";
    }


  //End of section

  //Player safe puzzle section

  safes = safes.filter(safe => {
    if(player.x + player.size >= safe.x &&
      player.x <= safe.x + safe.size &&
      player.y + player.size >= safe.y &&
      player.y <= safe.y + safe.size
    )
    {
      openSafe();
      return false
    }
    else {
      return true
    }
  });

  //End of section

  //Enemy movement section
  
  var eNewX = enemy.x;
  var eNewY = enemy.y;
  
  enemy.x = Math.max(0, Math.min(canvas.width - enemy.size, enemy.x));
  enemy.y = Math.max(0, Math.min(canvas.height - enemy.size, enemy.y));

  if(moving.up) eNewY -= enemy.speed;
  if(moving.down) eNewY += enemy.speed;
  if(moving.right) eNewX += enemy.speed;
  if(moving.left) eNewX -= enemy.speed;

  if(player.x > enemy.x && movingFlag){
    moving.right = true;
    moving.left = false;
  }
  else if(player.x < enemy.x && movingFlag){
    moving.right = false;
    moving.left = true;
  }
  if(player.y > enemy.y && movingFlag){
    moving.down = true;
    moving.up = false;
  }
  else if(player.y < enemy.y && movingFlag){
    moving.down = false;
    moving.up = true;
  }
  
  if(!isEnemyColliding(eNewX, enemy.y)) {
    enemy.x = eNewX;
  }
  if(!isEnemyColliding(enemy.x, eNewY)) {
    enemy.y = eNewY;
  }
  
//Ghost section

if(ghost.up) ghost.y -= ghost.speed;
if(ghost.down) ghost.y += ghost.speed;
if(ghost.left) ghost.x -= ghost.speed;
if(ghost.right) ghost.x += ghost.speed;

ghost.x = Math.max(0, Math.min(canvas.width - ghost.size, ghost.x));
ghost.y = Math.max(0, Math.min(canvas.height - ghost.size, ghost.y));

if(player.x + player.size + 600 > ghost.x &&
  player.x - 600 < ghost.x + ghost.size &&
  player.y + player.size + 600 > ghost.y &&
  player.y - 600 < ghost.y + ghost.size && gameFlag)
  {
    ghostSfx.play();
  }
  else{
    ghostSfx.pause();
  }

if(player.x + player.size > ghost.x &&
  player.x < ghost.x + ghost.size &&
  player.y + player.size > ghost.y &&
  player.y < ghost.y + ghost.size)
{
  deathScreen();
}

//End of section

//ENDING SECTION

if(
  player.x + player.size >= door.x &&
  player.x <= door.x + door.width &&
  player.y + player.size >= door.y &&
  player.y <= door.y + door.height
)
{
  playerEscaped();
}

//END OF SECTION


  //Game Over(Dead) section
  
  if(player.x + player.size > enemy.x &&
     player.x < enemy.x + enemy.size &&
     player.y + player.size > enemy.y &&
     player.y < enemy.y + enemy.size)
  {
    deathScreen();
  }
  if(!gameFlag && !escaped){
    window.addEventListener("click", () => {
      window.location.replace("../index.html");
    })
  }
  
  //End of section
  
  draw();
  requestAnimationFrame(update);
}




//END OF UPDATE FUNCTION - - - - - - - - - - - - - - - - - - - - - - -




function outOfTime(){
  alarm.pause();
  enemyScream.pause();
  ghostSfx.pause();
  ambience.pause();
  canvasDIV.style.opacity = 0;
  body.classList.remove("red");
  clearInterval(clock);
  clearInterval(flash);
  time = 0;
  canvasDIV.classList.remove("flicker");
  canvasDIV.classList.remove("fadeIn");
  canvasDIV.classList.remove("shake");
  canvasDIV.classList.remove("flash");
  infoBox.textContent = "You were so close... Too bad."
  gameFlag = false;
  ending = false;
}

function playerEscaped(){
  escaped = true;
  alarm.pause();
  enemyScream.pause();
  ghostSfx.pause();
  ambience.pause();
  canvasDIV.style.opacity = 0;
  body.classList.remove("red");
  clearInterval(clock);
  clearInterval(flash);
  time = 0;
  canvasDIV.classList.remove("flicker");
  canvasDIV.classList.remove("fadeIn");
  canvasDIV.classList.remove("shake");
  canvasDIV.classList.remove("flash");
  body.style.background = "#999";
  infoBox.style.color = "black"
  infoBox.textContent = "You've escaped. You're finally free.";
  player.x = 20;
  player.y = 20;
  gameFlag = false;
  ending = false;
  setTimeout(() => {
    window.close();
  }, 3000);
}

function deathScreen(){
  gameFlag = false;
  canvasDIV.classList.remove("flicker");
  canvasDIV.classList.remove("fadeIn");
  canvasDIV.classList.remove("shake");
  canvasDIV.classList.remove("flash");
  canvasDIV.style.opacity = 0;
  time = 0;
  infoBox.textContent = "You've been killed."
  ambience.pause();
  enemyScream.pause();
  alarm.pause();
  Deadambience.play();
  ending = false;
}

//Extra enemies section

function speakWord(word) { //Function was not created by me
const utterance = new SpeechSynthesisUtterance(word);

utterance.pitch = 0.1;
   // Optionally select a Microsoft voice if available
   const voices = window.speechSynthesis.getVoices();
   const msVoice = voices.find(v => v.name.includes("Microsoft"));
   if (msVoice) {
     utterance.voice = msVoice;
   }

   speechSynthesis.speak(utterance);
 }

 // Load voices before using them
 window.speechSynthesis.onvoiceschanged = () => {
   console.log("Voices loaded:", speechSynthesis.getVoices());
 };


//Extra Enemies section


function event(){
  if(!ending){
    canvasDIV.classList.remove("fadeIn");
    canvasDIV.classList.remove("flicker");
    canvasDIV.classList.add("flicker");
    setTimeout(()=> {
      canvasDIV.style.opacity = 0.3;
    }, 502);
  }                    
}


//End of section.


function checkEnemyStuck(){  
  let enemyXCheck = enemy.x;
  let enemyYCheck = enemy.y;
  
  setTimeout(() => {
    if(enemy.x === enemyXCheck && enemy.y === enemyYCheck){
      enemy.x += 100;
      enemy.y -= 100;
  }
    checkEnemyStuck();
  }, 3000)
}
checkEnemyStuck();

//Flickering Enemy

var enemyColor = "rgba(190, 0, 0, 1)";

function flicker(){
  setTimeout(() => {
    enemyColor = "rgba(0, 0, 0, 0)"
  }, 200);
  setTimeout(() => {
    enemyColor = "rgba(190, 0, 0, 1)"
    flicker();
  }, 402);
}
flicker();
//End

//Flashing ending Door

var doorColor = "white";

function doorFlicker(){
  setTimeout(() => {
    doorColor = "grey";
    setTimeout(() => {
      doorColor = "white";
    }, 200);
  }, 200);
}


//End

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "grey";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  ctx.fillStyle = "#4afc44";
  ctx.fillRect(ghost.x, ghost.y, ghost.size, ghost.size);
  
  ctx.fillStyle = enemyColor;
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
  
          ctx.fillStyle = "#242424";
  walls.forEach(wall => {
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  
  });
  
  ctx.fillStyle = "black";
  hidingSpots.forEach(spot => {
    ctx.fillRect(spot.x, spot.y, spot.size, spot.size);
  });

  ctx.fillStyle = "white";
  safes.forEach(safe => {
    ctx.fillRect(safe.x, safe.y, safe.size, safe.size);
  });

  ctx.fillStyle = doorColor;
  if(ending){
    ctx.fillRect(door.x, door.y, door.width, door.height);
  }
}


