var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let i = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let score = 0;
let highScore = 0;
var scoreDIV = document.querySelector(".score");
var highScoreDIV = document.querySelector(".highScore");

var ball = {
  size: 10,
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  direction: "bottomRight",
  speedX: 5,
  speedY: 5,
}
var p1 = {
  height: 150,
  width: 20,
  x: -10,
  y: canvas.height / 2,
}
var p2 = {
  height: 150,
  width: 10,
  x: canvas.width - 10,
  y: canvas.height / 2,
}

var key = {
  w: false,
  a: false,
  s: false,
  d: false,
}

document.addEventListener("keydown", (e) => {
  if(e.key === "w")key.w = true;
  if(e.key === "s")key.s = true;
});
document.addEventListener("keyup", (e) => {
  if(e.key === "w")key.w = false;
  if(e.key === "s")key.s = false;
});

//End game check            HERE I USED THE NEW STUFF I LEARNED USING jQuery!
setInterval(() => {
  if(ball.speedX === 0 && ball.speedY === 0){
    i++
    var endScreenDIV = $(".endScreen");
    endScreenDIV.text("GAME OVER");
    scoreDIV.classList.add("appear");
    scoreDIV.style.top = "400px";
    scoreDIV.textContent = `Score: ${score}`
    highScoreDIV.classList.add("appear");
    highScoreDIV.style.top = "520px";
    highScoreDIV.textContent = `High Score: ${highScore}`
    if(i > 20){
      endScreenDIV.text("Restarting...");
    }
    if(i > 24){
      endScreenDIV.text("");
      scoreDIV.classList.remove("appear");
      highScoreDIV.classList.remove("appear");
      ball.speedX = 5;
      ball.speedY = 5;
      ball.x = window.innerWidth / 2;
      ball.y = window.innerHeight / 2;
      ball.direction = "bottomRight";
      i = 0;
      score = 0;
    }
  }
}, 500);

//                        RANDOM EVENTS

var timer = Math.floor(Math.random() * (21 - 5) + 5);
var eventNum = 0;
setInterval(() => {
  timer--
  if(timer <= 0){
    eventNum = Math.floor(Math.random() * (4 - 1) + 1);
    if(eventNum === 1)ball.speedY *= -1;
    else if(eventNum === 2)p1.y += 200;
    else if(eventNum === 3){
    ballColor = "black";
      setTimeout(() => {
        ballColor = "white";
      }, 3000);
    }
    timer = Math.floor(Math.random() * (21 - 5) + 5);
    eventNum = 0;
  }
}, 1000);

function update(){
  
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  
  if(ball.x + ball.size > canvas.width){
    ball.speedX = ball.speedX * -1;
    if(Math.sign(ball.speedX) === 1)ball.speedX += 0.5;
    else ball.speedX -= 0.5;
  }
  else if(p1.x + p1.width > ball.x && p1.x < ball.x + ball.size && p1.y + p1.height > ball.y && p1.y < ball.y + ball.size){
    ball.speedX = ball.speedX * -1;
    if(Math.sign(ball.speedX) === 1)ball.speedX += 0.5;
    else ball.speedX -= 0.5;
    score++
  }
  else if(ball.x < -10){
    ball.speedX = 0;
    ball.speedY = 0;
  }
  
  if(ball.y + ball.size > canvas.height || ball.y < 0){
    ball.speedY = ball.speedY * -1;
  }
  
  if(key.w)p1.y -= 25;
  if(key.s)p1.y += 25;
  
  p2.y = ball.y - p2.height/2;
  
  //High Score Code
  if(score > highScore)highScore = score;
  
  draw();
  requestAnimationFrame(update);
}

var ballColor = "white";

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = ballColor;
  ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
  
  ctx.fillStyle = "white";
  ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
  ctx.fillRect(p2.x, p2.y, p2.width, p2.height);
}
update();
