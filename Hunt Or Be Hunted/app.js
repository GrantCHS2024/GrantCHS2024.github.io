var gameFlag = false;
var ambience = document.getElementById("ambience");
var nightambience = document.getElementById("nightAmbience");
var paperCollect = document.getElementById("paperCollect");
var trapPlace = document.getElementById("trapPlace");
var boxSearchSfx = document.getElementById("boxSearch");
var Deadambience = document.getElementById("Deadambience");
var staticVideo = document.getElementById("staticVideo");
var killerHum = document.getElementById("killerHum");
killerHum.volume = 0.2;
var menu = document.querySelector(".menu");
var walkingSfx = document.getElementById("walking");
var easyBtn = document.querySelector(".easyBtn");
var hardBtn = document.querySelector(".hardBtn");
var impossibleBtn = document.querySelector(".impossibleBtn");
var canvasDIV = document.querySelector(".canvas");
var body = document.querySelector(".body")
var infoBox = document.querySelector(".information");
var canvas = document.getElementById("canvas");
var canvasSize = 4000;
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
  size: 25,  //When the time function is added, make the enemy's size slightly bigger after every full day.
  speed: 1,
}
var moving = {
  w: false,
  a: false,
  s: false,
  d: false,
}



var numOfEvidence = 10;
var evidenceCollected = 0;
var walls = [];
var luckyBoxes = [];
var evidences = [];
var hardMode = false;


easyBtn.addEventListener("click", () => {
    menu.classList.add("transition");
    startGame();
    time = 0;
    infoBox.textContent = "";
  
  for(var i = 0; i <= numOfEvidence; i++){
  var x = Math.floor(Math.random() * (canvasSize - 1) + 1);
  var y = Math.floor(Math.random() * (canvasSize - 75) + 1);
  
  evidences.push({x: x, y: y, size: 20});
}
  
    update();
});
hardBtn.addEventListener("click", () => {
    menu.classList.add("transition");
    canvasSize = 6000;
    numOfEvidence = 15;
    startGame();
    time = 0;
    hardMode = true;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    infoBox.textContent = "";
  
  for(var i = 0; i <= numOfEvidence; i++){
  var x = Math.floor(Math.random() * (canvasSize - 1) + 1);
  var y = Math.floor(Math.random() * (canvasSize - 75) + 1);

  evidences.push({x: x, y: y, size: 20});
}
  
    update();
});
impossibleBtn.addEventListener("click", () => {
    menu.classList.add("transition");
    canvasSize = 7000;
    numOfEvidence = 20;
    startGame();
    time = 0;
    hardMode = true;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    infoBox.textContent = "";

    enemy.speed = 2;
  
  for(var i = 0; i <= numOfEvidence; i++){
  var x = Math.floor(Math.random() * (canvasSize - 1) + 1);
  var y = Math.floor(Math.random() * (canvasSize - 75) + 1);

  evidences.push({x: x, y: y, size: 20});
}
  
    update();
});


function startGame(){
  gameFlag = true;
  ambience.play();
  
  var time = 0;
  setInterval(() => {
    time++
    var eventTime = Math.floor(Math.random() * (120 - 1) + 1);
    
    if(time % 60 === 0){
    canvasDIV.classList.add("dark");
    canvasDIV.classList.remove("light");
    ambience.pause();
    nightambience.play();
    enemy.speed += 0.5;
  }
    if(time % 119 === 0){
      time = 0;
      ambience.play();
      nightambience.pause();
      canvasDIV.classList.remove("dark");
      canvasDIV.classList.add("light");
      enemy.size = enemy.size * 1.25;
      infoBox.textContent = "A day has passed";
    }
    if(time % eventTime === 0){
      event();
      eventTime = Math.floor(Math.random() * (120 - 30 + 1) + 30);
    }
    //
  }, 1000)

for(var i = 0; i <  75; i++){
  walls.push({x: Math.floor(Math.random() * (canvasSize - 1) + 1), y: Math.floor(Math.random() * (canvasSize - 1) + 1), width: 75, height: 75});
  }
//Small Houses Section
for(var e = 0; e <  20; e++){
  var x = Math.floor(Math.random() * (canvasSize - 1) + 1);
  var y = Math.floor(Math.random() * (canvasSize - 75) + 1);
  
  
  walls.push({x: x, y: y, width: 10, height: 200});  //Left wall
  walls.push({x: x + 200, y: y, width: 10, height: 200});  //Right wall
  walls.push({x: x, y: y + 200, width: 200, height: 10});  //Bottom wall
  walls.push({x: x, y: y, width: 70, height: 10});  //Top Left Frame
  walls.push({x: x + (200 - 70), y: y, width: 70, height: 10});  //Top Right Frame
}
//End of Section

//Big Houses Section
for(var b = 0; b < 5; b++){
  var bigx = Math.floor(Math.random() * (canvasSize - 1) + 1);
  var bigy = Math.floor(Math.random() * (canvasSize - 75) + 1);
  
  walls.push({x: bigx, y: bigy, width: 10, height: 300});  //Left wall
  walls.push({x: bigx + 225, y: bigy, width: 10, height: 300});  //Right wall
  walls.push({x: bigx, y: bigy + 300, width: 75, height: 10});  
  walls.push({x: bigx + (225 - 75), y: bigy + 300, width: 75, height: 10});
  walls.push({x: bigx, y: bigy, width: 75, height: 10});  //Top Left Frame
  walls.push({x: bigx + (225 - 75), y: bigy, width: 75, height: 10});  //Top Right Frame
}
//End of Section


for(var c = 0; c < 16; c++){
  var lx = Math.floor(Math.random() * (canvasSize - 1) + 1);
  var ly = Math.floor(Math.random() * (canvasSize - 75) + 1);
  
  luckyBoxes.push({x: lx, y: ly, size: 10});
}

//Objectives section


setInterval(() =>{
  evidences.some(evidence => {
    walls.some(wall => {
      if(wall.x + wall.width >= evidence.x && 
         wall.x <= evidence.x + evidence.size &&
         wall.y + wall.height >= evidence.y &&
         wall.y <= evidence.y + evidence.size
        ){
        evidence.x = Math.floor(Math.random() * (canvasSize - 1) + 1);
        evidence.y = Math.floor(Math.random() * (canvasSize - 75) + 1);
      }
    })
  })
}, 250)

//End of section


} //IF GAME STARTED STATEMENT END BRACKET





//Random Item section

function randomItem(){
  var ranNum = Math.floor(Math.random() * (4 - 1) + 1);
  
  if(ranNum === 1){
    numberTraps++
    infoBox.textContent = "You recieved a trap, press E to use";
  }
  if(ranNum === 2){
    enemy.speed = (enemy.speed * 0.8);
    infoBox.textContent = "Killer has been slowed down";
    enemy.speed = Math.min(enemy.speed, maxSpeed);
  }
  if(ranNum === 3){
    player.speed = (player.speed * 1.2);
    infoBox.textContent = "Player speed increased";
    player.speed = Math.min(player.speed, maxSpeed);
  }
}

//End of section

//Traps section
var placedTraps = []
var numberTraps = 0;

function placeTrap(){
  placedTraps.push({x: player.x, y: player.y, size: 20});
  numberTraps--
  trapPlace.play();
}

//End of section

document.addEventListener("keydown", (event) => {
  if(event.key == "w" && gameFlag === true) {moving.w = true;}
  if(event.key == "a" && gameFlag === true) {moving.a = true;}
  if(event.key == "s" && gameFlag === true) {moving.s = true;}
  if(event.key == "d" && gameFlag === true) {moving.d = true;}
  
  if(event.key == "e" && numberTraps !== 0) {infoBox.textContent = "";
  placeTrap()
  
  if(event.key === " "){
    infoBox.textContent = "";
  }
   }
});
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
  
  //Enemy movement section
  
  var eNewX = enemy.x;
  var eNewY = enemy.y;
  
  enemy.x = Math.max(0, Math.min(canvas.width - enemy.size, enemy.x));
  enemy.y = Math.max(0, Math.min(canvas.height - enemy.size, enemy.y));
  
  if(player.x + player.size / 4 > enemy.x){
    eNewX += enemy.speed;
  }
  if(player.x + player.size / 4 < enemy.x){
    eNewX -= enemy.speed;
  }
  if(player.y + player.size / 4 > enemy.y){
    eNewY += enemy.speed;
  }
  if(player.y + player.size / 4 < enemy.y){
    eNewY -= enemy.speed;
  }
  
  if(!isEnemyColliding(eNewX, enemy.y)) enemy.x = eNewX;
  if(!isEnemyColliding(enemy.x, eNewY)) enemy.y = eNewY;
  
  placedTraps = placedTraps.filter(trap => {
    if(enemy.x + enemy.size >= trap.x && 
       enemy.x <= trap.x + trap.size &&
       enemy.y + enemy.size >= trap.y &&
       enemy.y <= trap.y + trap.size){
      enemy.speed = enemy.speed * -1;
      setTimeout(() => {
        enemy.speed = enemy.speed * -1;
        
      }, 15000)
      return false
    }
    else {
      return true
    }
  })

  if(Math.abs(player.x - enemy.x) < 120 || Math.abs(player.y - enemy.y) < 120){
    killerHum.play();
  }
  else {
    killerHum.pause();
  }

  //End of section
  
  //Lucky boxes section
  
  luckyBoxes = luckyBoxes.filter(box => {  //Study '.filter()' method. [Not created by me]
    if (
        player.x + player.size >= box.x &&
        player.x <= box.x + box.size &&
        player.y + player.size >= box.y &&
        player.y <= box.y + box.size
    ) {
       
      boxSearchSfx.play();
      randomItem();  
      return false; // Remove this box
    }
    return true; // Keep this box
    
    //End of section
});
  
  //Objectives section
  
  evidences = evidences.filter(evidence => {
    if(player.x + player.size >= evidence.x && 
       player.x <= evidence.x + evidence.size && 
       player.y + player.size >= evidence.y &&
       player.y <= evidence.y + evidence.size)
    {
      evidenceCollected++
      paperCollect.play();
      
      if(evidenceCollected === numOfEvidence){
    canvasDIV.style.opacity = 0;
    gameFlag = false;
    time = 0;
    body.style.background = "#d1d1d1";
    infoBox.textContent = "You collected all evidence, you made us proud."
    }
      else {
        infoBox.textContent = "Evidence Collected! " + evidenceCollected + " pages out of " + numOfEvidence + ""
      }
      
      return false
    }
    else {
      return true
    }
  })
  
  
  
  //End of section
  
  
  //Game Over(Dead) section
  
  if(player.x + player.size > enemy.x &&
     player.x < enemy.x + enemy.size &&
     player.y + player.size > enemy.y &&
     player.y < enemy.y + enemy.size)
  {
    gameFlag = false;
    canvasDIV.classList.add("dark")
    canvasDIV.style.opacity = 0;
    time = 0;
    infoBox.textContent = "He caught you. . ."
    ambience.pause();
    nightambience.pause();
    Deadambience.play();
  }
  if(gameFlag === false){
    window.addEventListener("click", () => {
      location.reload();
    })
  }
  
  //End of section
  
  draw();
  requestAnimationFrame(update);
}




//END OF UPDATE FUNCTION - - - - - - - - - - - - - - - - - - - - - - -





var enemyColor = "red";

//Extra enemies section
var stalker = document.querySelector(".stalkerImage");
var stalkerScream = document.getElementById("scream");
var LOOKATME = document.querySelector(".LOOKATMEImage");
var LOOKATMEX = 0;
var LOOKATMEY = 0;
var lookatmeClicked = false;
LOOKATME.style.top = LOOKATMEY + 'px';
LOOKATME.style.left = LOOKATMEX + 'px';
var lookatmeLAUGH = document.getElementById("laughing");
var blurIntensity = 0;
canvasDIV.style.filter = `blur(${blurIntensity}px)`;
var JesterBox = document.querySelector(".JesterBox");
var JesterNum = document.querySelector(".JesterNum");
var JesterInputBox = document.querySelector(".JesterInput");
var submitBtn = document.querySelector(".submitBtn");
var staticVideoOpacity = 0;
staticVideo.style.opacity = staticVideoOpacity;
var staticAudio = document.getElementById("staticAudio");

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


function event(){
  if(hardMode === true){
    var random = Math.floor(Math.random() * (7 - 1) + 1);
  
  if(random === 1){
    console.log("Nothing");
    random = 0; //Nothing
  }
  else if(random === 2){
    console.log("Cena");
    enemyColor = "rgba(0, 0, 0, 0)"; //The Cena Enemy (HARD)
    setTimeout(() => {
      enemyColor = "rgba(255, 0, 0, 1)";
    }, 60000)
       random = 0;
  }
  else if(random === 3){
    console.log("Stalker");
    stalker.style.opacity = 100;
    setTimeout(() => {
    if(moving.w || moving.a || moving.s || moving.d){
    player.speed = 1;
    blurIntensity += 2;
    canvasDIV.style.filter = `blur(${blurIntensity}px)`;
    stalkerScream.play();
    canvasDIV.classList.add("shake");
    infoBox.textContent = "WHY DID YOU MOVE?!";
    }
    stalker.style.opacity = 0;
    }, 1000)
    random = 0;
  }
  else if(random === 4){
    console.log("LOOKATME");
    LOOKATMEX = Math.floor(Math.random() * (1000 - 1) + 1); //LOOKATME (HARD)
    LOOKATMEY = Math.floor(Math.random() * (500 - 1) + 1);
    LOOKATME.style.opacity = 100;
    lookatmeClicked = false;
    
    LOOKATME.addEventListener("click", () => {
        LOOKATME.style.opacity = 0;
        lookatmeClicked = true;
    });

    setTimeout(() => {
       if(lookatmeClicked == false){
            player.speed = 1.5;
            numberTraps = 0;
            blurIntensity += 1;
            canvasDIV.style.filter = `blur(${blurIntensity}px)`;
            lookatmeLAUGH.play();
            staticVideo.style.opacity = 1;
            staticVideo.style.zIndex = 10;
            staticAudio.play();
            setTimeout(() => {
              staticVideo.style.opacity = 0;
              staticVideo.style.zIndex = 4;
            staticAudio.pause();
            }, 1000);

            infoBox.textContent = "You should've clicked on him...";
        }

        lookatmeClicked = false;
        LOOKATME.style.opacity = 0;
    }, 1500);

    random = 0;
    LOOKATME.style.top = LOOKATMEY + 'px';
    LOOKATME.style.left = LOOKATMEX + 'px';
  }
  else if (random === 5) {
    console.log("Jester"); // Jester
    JesterBox.style.opacity = 75;
    JesterBox.style.zIndex = 5;
    var JesterNumber = Math.floor(Math.random() * 1000);
    JesterNum.textContent = JesterNumber;
    submitBtn.addEventListener("click", () => {
        var JesterInput = parseInt(JesterInputBox.value);
       
       if(JesterInput == JesterNumber){
        JesterBox.style.opacity = 0;
        JesterBox.style.zIndex = -1;
        JesterInputBox.value = '';
       }
       else{
         blurIntensity += 0.5;
         canvasDIV.style.filter = `blur(${blurIntensity}px)`;
       }
      });
     
    random = 0;
  }
  else if(random == 6){
    console.log("Corruption")
    var randomSpeech = Math.floor(Math.random() * (8 - 1) + 1);

    if(randomSpeech === 1){
      staticAudio.play();
      setTimeout(() =>{
        staticAudio.pause();
        speakWord("You will not get away with this... Trust me... I... Am... Your.. Friend");
      }, 500);

      randomSpeech = 0;
    }
    if(randomSpeech === 2){
      staticAudio.play();
      setTimeout(() =>{
        staticAudio.pause();
      speakWord("Give up... He will find you");
    }, 500);

    randomSpeech = 0;
    }
    if(randomSpeech === 3){
      staticAudio.play();
      setTimeout(() =>{
        staticAudio.pause();
      speakWord("Nothing is worth the risk... Stop Now");
    }, 500);

    randomSpeech = 0;
    }
    if(randomSpeech === 4){
      staticAudio.play();
      setTimeout(() =>{
        staticAudio.pause();
      speakWord("Run... Run... Run... Run... Run... ");
    }, 500);

    randomSpeech = 0;
    }
    if(randomSpeech === 5){
      staticAudio.play();
      setTimeout(() =>{
        staticAudio.pause();
      speakWord("Something went wrong... but it's still watching you.");
    }, 500);

    randomSpeech = 0;
    }
    if(randomSpeech === 6){
      staticAudio.play();
      setTimeout(() =>{
        staticAudio.pause();
      speakWord("4... 0... 4... Escape not found... Turn Back");
    }, 500);

    randomSpeech = 0;
    }
    if(randomSpeech === 7){
      staticAudio.play();
      setTimeout(() =>{
        staticAudio.pause();
      speakWord("Unknown glitch detected... its growing closer.");
    }, 500);
    
    randomSpeech = 0;
    }

    staticVideo.play();
    staticVideoOpacity += 0.1;
    staticVideo.style.opacity = staticVideoOpacity;

    random = 0;
  }
  
 }
}

//End of section.

function checkEnemyStuck(){
  let enemyXCheck = enemy.x;
  let enemyYCheck = enemy.y;
  
  setTimeout(() => {
    if(enemy.x === enemyXCheck && enemy.y === enemyYCheck){
     enemy.y += 125;
    }
    checkEnemyStuck();
  }, 5000)
}
checkEnemyStuck();

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "grey";
  ctx.fillRect(player.x, player.y, player.size, player.size);
  
  ctx.fillStyle = enemyColor;
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
  
          ctx.fillStyle = "brown";
  walls.forEach(wall => {
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
  
  })
  
  ctx.fillStyle = "#fa6000";
  luckyBoxes.forEach(box => {
    ctx.fillRect(box.x, box.y, box.size, box.size);
  });
  
  ctx.fillStyle = "black";
  placedTraps.forEach(trap => {
    ctx.fillRect(trap.x, trap.y, trap.size, trap.size);
  });
  
  ctx.fillStyle = "white";
  evidences.forEach(evidence => {
    ctx.fillRect(evidence.x, evidence.y, evidence.size, evidence.size);
  });
}


