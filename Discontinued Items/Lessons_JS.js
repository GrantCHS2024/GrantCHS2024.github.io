
var box = document.querySelector(".box");
x = 50;
y = 800;

document.addEventListener("keydown", (event) => {
    if(event.key === "w")moving.w = true;
    else if(event.key === "a")moving.a = true;
    else if(event.key === "s")moving.s = true;
    else if(event.key === "d")moving.d = true;
  });
document.addEventListener("keyup", (event) => {
    if(event.key === "w")moving.w = false;
    else if(event.key === "a")moving.a = false;
    else if(event.key === "s")moving.s = false;
    else if(event.key === "d")moving.d = false;
  });

let moving = {
    w: false,
    a: false,
    s: false,
    d: false,
}

function update(){
  if(moving.w)y -= 5;
  if(moving.s)y += 5;
  if(moving.a)x -= 5;
  if(moving.d)x += 5;

  box.style.top = y + "px";
  box.style.left = x + "px";
  requestAnimationFrame(update);
}
update();

document.querySelector("#myButton").addEventListener("click", () => {
    alert("This button works! Wont ya look at that!");
});
document.addEventListener("keydown", (event) => {
    if(event.key === "c"){
        alert("Boo! Did I scare you? You pressed the c key");
    }
});

const canvas = document.querySelector(".drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;

canvas.addEventListener("mousedown", (event) => {
  drawing = true;
  drawAtEvent(event);
});

canvas.addEventListener("mousemove", (event) => {
  if (drawing) {
    drawAtEvent(event);
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
});

function drawAtEvent(event) {
  // Get mouse position relative to the canvas
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  draw(x, y);
}

function draw(x, y) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 5, 5);
}