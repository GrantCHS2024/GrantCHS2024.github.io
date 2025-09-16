/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
  var player = {
    x: 100,
    y: 100,
    speedX: 8,
    speedY: 8,
    width: Number($("#gameItem").css("width").slice(0, 2)),
    height: Number($("#gameItem").css("height").slice(0, 2)),
  }
  var playerTwo = {
    x: 700,
    y: 700,
    speedX: 5,
    speedY: 5,
    width: Number($("#playerTwo").css("width").slice(0, 2)),
    height: Number($("#playerTwo").css("height").slice(0, 2)),
  }

  var board = {
    width: Number($("#board").css("width").slice(0, 3)),
    height: Number($("#board").css("height").slice(0, 3)),
  }

  var key = {
    w: false,
    a: false,
    s: false,
    d: false,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  $(document).on('keydown', handleKeyDown);                          
  
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
 
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    $("#gameItem").css("top", player.y);
    $("#gameItem").css("left", player.x);
    $("#playerTwo").css("left", playerTwo.x);
    $("#playerTwo").css("top", playerTwo.y);

    if(player.x > playerTwo.x) playerTwo.x += playerTwo.speedX;
    if(player.x < playerTwo.x) playerTwo.x -= playerTwo.speedX;
    if(player.y > playerTwo.y) playerTwo.y += playerTwo.speedX;
    if(player.y < playerTwo.y) playerTwo.y -= playerTwo.speedX;

    var newX = player.x;
    var newY = player.y;

    if(key.w)newY -= player.speedY;
    if(key.a)newX -= player.speedX;
    if(key.s)newY += player.speedY;
    if(key.d)newX += player.speedX;

    if(newX > 0 && 
    newX + player.width < board.width &&
    newY > 0 &&
    newY + player.height < board.height){
      player.x = newX;
      player.y = newY;
    }

    if(player.x + player.width > playerTwo.x &&
      player.x < playerTwo.x + playerTwo.width &&
      player.y + player.height > playerTwo.y &&
      player.y < playerTwo.y + playerTwo.height
    ){
      $("#gameItem").css("background-color", "darkred");
      $("body").css("background-color", "darkred");
    }
    else {
      $("#gameItem").css("background-color", "grey"); 
      $("body").css("background-color", "#adadad");
    }
  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  function handleKeyDown(event){
    if(event.key === "w")key.w = true;
    if(event.key === "a")key.a = true;
    if(event.key === "s")key.s = true;
    if(event.key === "d")key.d = true;
  }
  $(document).on('keyup', (e) => {
    if(e.key === "w")key.w = false;
    if(e.key === "a")key.a = false;
    if(e.key === "s")key.s = false;
    if(e.key === "d")key.d = false;
  });

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
