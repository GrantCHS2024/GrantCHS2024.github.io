$(document).ready(function () {
  // Your code goes here
  var dieNum = 0;
  var dieNumTwo = 0;
  var sum = dieNum + dieNumTwo;

  function makeDot(top, left, elementID){
    $("<div>")
  .css("height", 15)
  .css("width", 15)
  .css("background-color", "black")
  .css("position", "absolute")
  .css("top", top)
  .css("left", left)
  .appendTo(elementID);
  }

  function rollDie(die, num){
    $(".number").appendTo("body").text(sum)
    $(die).empty();
    if (num === 1) {
  makeDot(50, 50, die); // middle middle
} else if (num === 2) {
  makeDot(25, 25, die); // top left
  makeDot(75, 75, die); // bottom right
} else if (num === 3) {
  makeDot(25, 25, die); // top left
  makeDot(75, 75, die); // bottom right
  makeDot(50, 50, die); // middle middle
} else if (num === 4) {
  makeDot(75, 75, die); // bottom right
  makeDot(25, 25, die); // top left
  makeDot(25, 75, die); // bottom left
  makeDot(75, 25, die); // top right
} else if (num === 5) {
  makeDot(50, 50, die); // middle middle
  makeDot(75, 75, die); // bottom right
  makeDot(25, 25, die); // top left
  makeDot(25, 75, die); // bottom left
  makeDot(75, 25, die); // top right
}
else if(num === 6){
  makeDot(25, 25, die);
  makeDot(50, 25, die);
  makeDot(75, 25, die);
  makeDot(25, 75, die);
  makeDot(50, 75, die);
  makeDot(75, 75, die);
}
  }
  
  $("#die").on("click", () => {
    dieNum = Math.ceil(Math.random() * 6);
    sum = dieNum + dieNumTwo;
    rollDie("#die", dieNum);
});
  $("#dieTwo").on("click", () => {
    dieNumTwo = Math.ceil(Math.random() * 6);
    sum = dieNum + dieNumTwo;
    rollDie("#dieTwo", dieNumTwo);
});
  
});
