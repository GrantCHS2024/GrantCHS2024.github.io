$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }
    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); //top
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200); //right
    createPlatform(-50, -50, 50, canvas.height + 500); //bottom
    createPlatform(canvas.width, -50, 50, canvas.height + 100);

    /**
     * Uncomment the drawGrid() function call below to add a "grid" to your platformer game's screen
     * The grid will place both horizontal and vertical platforms incremented 100 pixels apart
     * This can help you determine specific x any y values throughout the game
     * Comment the function call out to remove the grid
     */

    // drawGrid();

    /////////////////////////////////////////////////
    //////////ONLY CHANGE BELOW THIS POINT///////////
    /////////////////////////////////////////////////

    // TODO 1
    // Create platforms
    // You must decide the x position, y position, width, and height of the platforms
    // example usage: createPlatform(x,y,width,height)

    createPlatform(200, 600, 50, 20);//Cannon trap section
    createPlatform(300, 600, 50, 20);
    createPlatform(400, 600, 50, 20);
    createPlatform(500, 600, 50, 20);
    createPlatform(600, 600, 50, 20);
    createPlatform(700, 600, 50, 20);
    createPlatform(800, 600, 50, 20);
    createPlatform(900, 600, 50, 20);
    createPlatform(950, 90, 10, 510);
    
    createPlatform(170, 90, 10, 525);//Outter walls
    createPlatform(130, 680, 10, 90);
    createPlatform(998, 690, 10, 75);

    createPlatform(1100, 625, 1, 10);//skinny parkour jumps section
    createPlatform(1250, 600, 1, 10);
    createPlatform(1375, 575, 1, 10);
    createPlatform(1150, 550, 1, 10);
    createPlatform(1200, 525, 1, 10);
    createPlatform(1275, 500, 1, 10);
    createPlatform(1000, 475, 1, 10);
    createPlatform(1375, 450, 1, 10);
    createPlatform(1050, 425, 1, 10);
    createPlatform(1200, 400, 1, 10);
    createPlatform(1025, 375, 1, 10);
    createPlatform(1300, 350, 1, 10);
    createPlatform(1057, 325, 1, 10);
    createPlatform(1243, 300, 1, 10);
    createPlatform(1164, 275, 1, 10);
    createPlatform(1007, 250, 1, 10);
    createPlatform(1387, 225, 1, 10);
    createPlatform(1084, 200, 1, 10);
    createPlatform(1301, 175, 1, 10);
    createPlatform(1226, 150, 1, 10);
    createPlatform(1036, 125, 1, 10);
    createPlatform(1123, 100, 1, 10);
    createPlatform(925, 85, 75, 5);
    createPlatform(155, 90, 75, 5);

    createPlatform(325, 400, 15, 5);//Finale Section
    createPlatform(525, 400, 15, 5);
    createPlatform(725, 400, 15, 5);
    createPlatform(800, 500, 15, 5);
    createPlatform(625, 500, 15, 5);
    createPlatform(425, 500, 15, 5);
    createPlatform(475, 550, 20, 5);
    createPlatform(675, 550, 20, 5);
    createPlatform(875, 550, 20, 5);
    createPlatform(275, 550, 20, 5);
    createPlatform(400, 450, 5, 5);
    createPlatform(600, 450, 5, 5);
    createPlatform(300, 450, 5, 5);
    createPlatform(200, 450, 5, 5);
    createPlatform(800, 450, 5, 5);
    createPlatform(900, 450, 5, 5);
    createPlatform(250, 325, 5, 5);
    createPlatform(300, 325, 5, 5);  
    createPlatform(400, 325, 5, 5);
    createPlatform(450, 325, 5, 5);
    createPlatform(550, 325, 5, 5);
    createPlatform(600, 325, 5, 5);
    createPlatform(700, 325, 5, 5);
    createPlatform(750, 325, 5, 5);
    createPlatform(900, 325, 5, 5);
    
    createPlatform(600, 275, 5, 5);
    createPlatform(300, 275, 5, 5);
    createPlatform(200, 275, 5, 5);
    createPlatform(800, 275, 5, 5);
    createPlatform(900, 275, 5, 5);
    
    createPlatform(625, 225, 15, 5);
    createPlatform(425, 225, 15, 5);
    createPlatform(475, 225, 20, 5);
    createPlatform(675, 225, 20, 5);
    createPlatform(875, 225, 20, 5);
    createPlatform(275, 225, 20, 5);
    
    createPlatform(300, 150, 5, 5);  
    createPlatform(400, 150, 5, 5);
    createPlatform(450, 150, 5, 5);
    createPlatform(550, 150, 5, 5);
    createPlatform(600, 150, 5, 5);
    createPlatform(700, 150, 5, 5);
    createPlatform(750, 150, 5, 5);
    createPlatform(900, 150, 5, 5);

    
    // TODO 2
    // Create collectables
    // You must decide on the collectable type, the x position, the y position, the gravity, and the bounce strength
    // Your collectable choices are 'database' 'diamond' 'grace' 'kennedi' 'max' and 'steve'; more can be added if you wish
    // example usage: createCollectable(type, x, y, gravity, bounce)

createCollectable("database", 1350, 475, 0, 0);
createCollectable("database", 1100, 345, 0, 0);
createCollectable("database", 1350, 50, 0, 0);
createCollectable("database", 300, 300, 0, 0);
createCollectable("database", 500, 300, 0, 0);
createCollectable("database", 700, 300, 0, 0);
createCollectable("steve", 145, 25, 0, 0);

    
    // TODO 3
    // Create cannons
    // You must decide the wall you want the cannon on, the position on the wall, and the time between shots in milliseconds
    // Your wall choices are: 'top' 'left' 'right' and 'bottom'
    // example usage: createCannon(side, position, delay, width, height)

  createCannon("right", 760, 1600, 25, 25);
  createCannon("top", 1300, 1150, 25, 25);
  createCannon("top", 380, 1250, 25, 25);
  createCannon("top", 580, 1350, 25, 25);
  createCannon("top", 780, 1450, 25, 25);
  createCannon("top", 885, 1525, 25, 25);

    
    /////////////////////////////////////////////////
    //////////ONLY CHANGE ABOVE THIS POINT///////////
    /////////////////////////////////////////////////
  }

  registerSetup(setup);
});