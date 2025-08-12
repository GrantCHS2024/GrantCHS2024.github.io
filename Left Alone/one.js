let canvas;
let ctx;

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
}

requestAnimationFrame(update);

var player = {
  x: 20,
  y: 20,
  width: 10,
  height: 10,
  velocity: 2,
}

var moving = {
  w: false,
  a: false,
  s: false,
  d: false,
}

document.addEventListener("keydown", (e) => {
  if(e.key === "w") moving.w = true;
  if(e.key === "a") moving.a = true;
  if(e.key === "s") moving.s = true;
  if(e.key === "d") moving.d = true;
});
document.addEventListener("keyup", (e) => {
  if(e.key === "w") moving.w = false;
  if(e.key === "a") moving.a = false;
  if(e.key === "s") moving.s = false;
  if(e.key === "d") moving.d = false;
});

function detectCollision(a, b){
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

function update() {

  if(moving.w){player.y -= player.velocity}
  if(moving.a){player.x -= player.velocity}
  if(moving.s){player.y += player.velocity}
  if(moving.d){player.x += player.velocity}

  requestAnimationFrame(update);
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle="white";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}