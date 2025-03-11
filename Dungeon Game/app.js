var gameContainer = document.querySelector(".game-container");
var gameOverScreen = document.querySelector(".game-over");
var playerDead = false;

//Collision detection

var wall = document.querySelector(".box");
var wallX = Math.floor(Math.random() * (100 - 1) + 1);
var wallY = Math.floor(Math.random() * (450 - 1) + 1);
var wallWidth = Math.floor(Math.random() * (400 - 50) + 50);
var wallHeight = Math.floor(Math.random() * (100 - 10) + 10);

wall.style.top = wallY + "px";
wall.style.left = wallX + "px";
wall.style.width = wallWidth + "px";
wall.style.height = wallHeight + "px";

//End of Collision detection

//Player movement section
var player = document.querySelector(".player");
var playerX = 250;
var playerY = 470;
var playerSpeed = 5;


player.style.left = playerX + "px";
player.style.top = playerY + "px";

document.addEventListener("keydown", function(event) { //Movement keys
  let newX = playerX;
  let newY = playerY;
  
   if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
    newY -= playerSpeed;

  }
  
  if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
    newX += playerSpeed;

  }
  
  if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
    newX -= playerSpeed;
    
  }
  
  if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
    newY += playerSpeed;

  }
  
  if(!(newX + 25 >= wallX &&          //If collision detection statements --> wall
     newX <= wallX + wallWidth &&
     newY + 25 >= wallY &&
     newY <= wallY + wallHeight)){
    
    playerX = newX;
    playerY = newY;
    
  }
  
    if(coinX + 10 >= newX &&          //If collision detection statements --> coin
     coinX <= newX + 25 &&
     coinY + 10 >= newY &&
     coinY <= newY + 25){
   coinX = Math.floor(Math.random() * (440 - 1) + 1);
   coinY = Math.floor(Math.random() * (440 - 1) + 1);
      enemySpeed += 1;
      pointsCollected++
      playerSpeed += 0.5;
      
      pointscollectedCounter.textContent = "Points Collected: " + pointsCollected;
  }
  
    checkPos()
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
});

function checkPos(){
 if(playerX > 470){
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
    playerX = 470;
  }
 if(playerX < 1){
    player.style.left = playerX + "px";
   player.style.top = playerY + "px";
   playerX = 1;
   }
  if(playerY < 1){
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
    playerY = 1;
  }
  if(playerY > 470){
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
    playerY = 470;
  }
}

//End of Player movement section

//Enemy movement section

var enemy = document.querySelector(".enemy");
var enemySpeed = 1;
var enemyX = 10;
var enemyY = 10;

enemy.style.top = enemyY + "px";
enemy.style.left = enemyX + "px";

setInterval(enemyMove, 200)

function enemyMove(){           //Enemy's chase section
  if(playerX > enemyX){
    enemyX += enemySpeed;
  }
  else if(playerX < enemyX){
    enemyX -= enemySpeed;
  }
  if(playerY > enemyY){
    enemyY += enemySpeed;
  }
  else if(playerY < enemyY){
    enemyY -= enemySpeed;
  }
  
  if(playerX + 25 >= enemyX &&  //Enemy & player collide section
    playerX <= enemyX + 40 &&
    playerY + 25 >= enemyY &&
    playerY <= enemyY + 40){
    
    gameOver()
    playerDead = true;
  }
  
  enemy.style.top = enemyY + "px";
  enemy.style.left = enemyX + "px";
}

//End of Enemy movement section

//Game over section
var pointsCollected = 0;
var pointscollectedCounter = document.querySelector(".points-collected");

pointscollectedCounter.textContent = "Points Collected: " + pointsCollected;

function gameOver(){
  gameContainer.classList.add("hide");
  gameOverScreen.classList.add("show");
}

//End of Game over section

//Coin section

var coin = document.querySelector(".coin");
var coinX = Math.floor(Math.random() * (440 - 1) + 1);
var coinY = Math.floor(Math.random() * (440 - 1) + 1);

coin.style.top = coinY + "px";
coin.style.left = coinX + 'px';

setInterval(checkCoinPos, 500);

function checkCoinPos(){
  if(coinX + 10 >= wallX &&          //This if statement detects if the coin spawned INSIDE the wall, and respawns the coin if it did
     coinX <= wallX + wallWidth &&
     coinY + 10 >= wallY &&
     coinY <= wallY + wallHeight){
   coinX = Math.floor(Math.random() * (440 - 1) + 1);
   coinY = Math.floor(Math.random() * (440 - 1) + 1);
  }
coin.style.top = coinY + "px";
coin.style.left = coinX + 'px';
}

//End of Coin section

//Restart game section

function restartGame(){
  if(playerDead === true){
    gameContainer.classList.remove("hide");
    gameOverScreen.classList.remove("show");
    pointsCollected = 0;
    pointscollectedCounter.textContent = "Points Collected: " + pointsCollected;
    playerDead = false;
    
  coinX = Math.floor(Math.random() * (440 - 1) + 1);
  coinY = Math.floor(Math.random() * (440 - 1) + 1);
  
  wallX = Math.floor(Math.random() * (100 - 1) + 1);
  wallY = Math.floor(Math.random() * (450 - 1) + 1);
  wallWidth = Math.floor(Math.random() * (400 - 50) + 50);
  wallHeight = Math.floor(Math.random() * (100 - 10) + 10);
  
  playerX = 250;
  playerY = 470;
  playerSpeed = 5;
  
  enemySpeed = 1;
  enemyX = 10;
  enemyY = 10;
  
  enemy.style.top = enemyY + "px";
  enemy.style.left = enemyX + "px";
  
  coin.style.top = coinY + "px";
  coin.style.left = coinX + 'px';
  
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
  
  wall.style.top = wallY + "px";
  wall.style.left = wallX + "px";
  wall.style.width = wallWidth + "px";
  wall.style.height = wallHeight + "px";
  }
}

//End of Restart game section

