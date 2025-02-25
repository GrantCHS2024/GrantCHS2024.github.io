windows.alert("This app is a TEST and does NOT have localStorage!");
var body = document.querySelector(".body");
var container = document.querySelector(".container");
var settingsContainer = document.querySelector(".settings");
var sl = document.querySelector(".settingsLink");
var darkModeBtn = document.querySelector(".dark-mode");
var note = document.querySelector(".note");
var notesNum = 1;
var notesContainer = document.querySelector(".notesContainer");
var darkEnabled = 0;

function darkMode(){
  var nb = document.querySelector(".nav-bar");
  nb.classList.toggle("dark");
  container.classList.toggle("dark");
  body.classList.toggle("dark");
  settingsContainer.classList.toggle("dark");
  notesContainer.classList.toggle("dark");
  note.style.background = black;
  darkEnabled++
}

sl.onclick = function(){
  settingsContainer.classList.toggle("show");
}

var addNoteBtn = document.querySelector(".addNoteBtn");

addNoteBtn.onclick = function() {
  let inputBox = document.createElement("div");
  let inputArea = document.createElement("span");
  let deleteNote = document.createElement("button");
  deleteNote.className = "deleteNote";
  deleteNote.setAttribute("contenteditable", "false");
  inputBox.className = "note";
  inputArea.textContent = "Note ID: " + notesNum;
  inputArea.setAttribute("contenteditable", "true");
  inputArea.style.padding = "10px"
  notesContainer.appendChild(inputBox).appendChild(inputArea);
  notesContainer.style.opacity = "100";
  inputBox.appendChild(deleteNote);
  notesNum++
}
notesContainer.addEventListener("click", function(e){
  if(e.target.tagName === "BUTTON"){
    e.target.parentElement.remove();
    notesNum--
  }
  if(notesNum === 1){
    notesContainer.style.opacity = "0";
  }
});


var findNote = document.querySelector(".findNoteNum");
var findNoteBtn = document.querySelector(".findNote");
var findNoteContainer = document.querySelector(".findNoteBtn");


findNoteBtn.onclick = function(){
  const findNoteNum = parseInt(findNote.value);
  let notes = notesContainer.children[findNoteNum - 1];
  notesContainer.scrollTo({top: notes.offsetTop, behavior: "smooth"});
}
window.addEventListener("scroll", function() {
    if (window.scrollY >= 300) { // Change 300 to any scroll distance
        findNoteContainer.style.position = "fixed";
        findNoteContainer.style.left = "85%";
        findNoteContainer.style.background = "#333";
        findNoteContainer.style.color = "white";
    }
});
window.addEventListener("scroll", function() {
    if (window.scrollY < 300) { // Change 300 to any scroll distance
        findNoteContainer.style.position = "relative";
        findNoteContainer.style.left = "";
        findNoteContainer.style.background = "";
        findNoteContainer.style.color = "";
    }
});

var videoOne = document.querySelector("#videoOne");
var videoTwo = document.querySelector("#videoTwo");
var videoThree = document.querySelector("#videoThree");
var videoFour = document.querySelector("#videoFour");

function playVideoOne(){
  videoOne.style.opacity = 100;
  videoOne.play();
  
  videoTwo.style.opacity = 0;
  videoTwo.pause();
  videoTwo.currentTime = 0;
  
  videoThree.style.opacity = 0;
  videoThree.pause();
  videoThree.currentTime = 0;
  
  videoFour.style.opacity = 0;
  videoFour.pause();
  videoFour.currentTime = 0;
}
function playVideoTwo(){
    videoTwo.style.opacity = 100;
    videoTwo.play();
    
    videoOne.style.opacity = 0;
    videoOne.pause();
    videoOne.currentTime = 0;
    
    videoThree.style.opacity = 0;
    videoThree.pause();
    videoThree.currentTime = 0;
    
    videoFour.style.opacity = 0;
    videoFour.pause();
    videoFour.currentTime = 0;
  }
  function playVideoThree(){
    videoThree.style.opacity = 100;
    videoThree.play();
    
    videoTwo.style.opacity = 0;
    videoTwo.pause();
    videoTwo.currentTime = 0;
  
    videoOne.style.opacity = 0;
    videoOne.pause();
    videoOne.currentTime = 0;
   
    videoFour.style.opacity = 0;
    videoFour.pause();
    videoFour.currentTime = 0;
  }
  function playVideoFour(){
    videoFour.style.opacity = 100;
    videoFour.play();
   
    videoThree.style.opacity = 0;
    videoThree.pause();
    videoThree.currentTime = 0;
  
    videoOne.style.opacity = 0;
    videoOne.pause();
    videoOne.currentTime = 0;
 
    videoTwo.style.opacity = 0;
    videoTwo.pause();
    videoTwo.currentTime = 0;
  }
  function clearVideos(){
    videoOne.style.opacity = 0;
    videoOne.pause();
    videoOne.currentTime = 0;

    videoTwo.style.opacity = 0;
    videoTwo.pause();
    videoTwo.currentTime = 0;
    
    videoThree.style.opacity = 0;
    videoThree.pause();
    videoThree.currentTime = 0;
    
    videoFour.style.opacity = 0;
    videoFour.pause();
    videoFour.currentTime = 0;
  }