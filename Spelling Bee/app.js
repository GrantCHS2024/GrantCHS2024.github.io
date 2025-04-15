var canSubmit = false;
var submitBtn = document.querySelector(".submit");

function speakWord(word) { //Function was not created by me
     canSubmit = false;
  submitBtn.style.opacity = 0;
  const utterance = new SpeechSynthesisUtterance(word);

      // Optionally select a Microsoft voice if available
      const voices = window.speechSynthesis.getVoices();
      const msVoice = voices.find(v => v.name.includes("Microsoft"));
      if (msVoice) {
        utterance.voice = msVoice;
      }

    utterance.onend = () => {
      canSubmit = true;
  submitBtn.style.opacity = 1;
    }
  
      speechSynthesis.speak(utterance);
    }

    // Load voices before using them
    window.speechSynthesis.onvoiceschanged = () => {
      console.log("Voices loaded:", speechSynthesis.getVoices());
    };

document.addEventListener("keydown", (e) => {
  if(e.key === "Enter" && canSubmit === true){
    submitInput();
  }
});

var text = document.querySelector(".text");
var time = 1;
var body = document.querySelector("body");
var startScreen = document.querySelector(".startScreen");
var mainScreen = document.querySelector(".main");
let score = 0;
let maxTries = 0;
let tries = 0;
var easyBtn = document.querySelector(".easyBtn");
var mediumBtn = document.querySelector(".mediumBtn");
var hardBtn = document.querySelector(".hardBtn");
var mode;
var word;

easyBtn.addEventListener("click", () => {
  mode = "easy";
  startGame();
  startScreen.style.opacity = 0;
  mainScreen.style.opacity = 100;
  startScreen.style.zIndex = -1;
  mainScreen.style.zIndex = 1;
});
mediumBtn.addEventListener("click", () => {
  mode = "medium";
  startGame();
  startScreen.style.opacity = 0;
  mainScreen.style.opacity = 100;
  startScreen.style.zIndex = -1;
  mainScreen.style.zIndex = 1;
});
hardBtn.addEventListener("click", () => {
  mode = "hard";
  startGame();
  startScreen.style.opacity = 0;
  mainScreen.style.opacity = 100;
  startScreen.style.zIndex = -1;
  mainScreen.style.zIndex = 1;
});

function startGame(){
  var words = {
    
    easy: ["apple", "ball", "cat", "dog", "egg", "fish", "go", "hat", "ice", "jam",
"kid", "log", "man", "net", "owl", "pig", "run", "sun", "top", "van",
"bat", "box", "can", "dot", "ear", "fan", "gas", "hen", "ink", "jar",
"key", "lip", "map", "nap", "oil", "pen", "queen", "rat", "sock", "toy",
"up", "vet", "web", "yak", "zip", "bed", "cup", "dig", "eat", "frog",
"gum", "hill", "iron", "jet", "kite", "leaf", "mud", "nose", "open", "pot",
"quiz", "red", "sea", "tent", "use", "vase", "wax", "yes", "zoo", "ant",
"bag", "cold", "drum", "fast", "glue"],
    
    medium: ["absent", "arrival", "balance", "banquet", "battery", "breeze", "cabinet", "cactus", "capital", "capture",
"caution", "ceiling", "ceramic", "citizen", "climate", "collar", "column", "command", "compass", "contest",
"crayon", "crumble", "curious", "damage", "decimal", "demand", "depart", "detail", "distant", "donkey",
"effort", "emblem", "fabric", "famine", "fiction", "flavor", "fossil", "freight", "furnace", "gadget",
"garbage", "glacier", "gravel", "harvest", "helmet", "hollow", "immune", "injury", "journey", "justice",
"lawyer", "lemonade", "lizard", "locker", "magnet", "marble", "mascot", "mention", "message", "motion",
"muscle", "nephew", "nervous", "nickname", "notable", "object", "package", "pasture", "perfume", "phrase",
"plumber", "protect", "recycle", "remind", "rescue"
],
    
    hard: ["abdomen", "abysmal", "acquire", "adjacent", "aisle", "allegiance", "amphibian", "ancestor", "applause", "architect",
"ascend", "asylum", "avalanche", "awkward", "bachelor", "balloonist", "barricade", "benevolent", "bewilder", "blizzard",
"boulevard", "buffoon", "cabaret", "calculus", "catastrophe", "celestial", "chandelier", "charisma", "cinnamon", "collateral",
"colleague", "commemorate", "commodity", "conscience", "courteous", "cylinder", "deceitful", "deductible", "deteriorate", "diagnosis",
"disastrous", "distinguish", "dormitory", "drought", "eccentric", "eloquent", "embroidery", "endeavor", "equator", "escapade",
"exaggerate", "fascinate", "ferocious", "flourish", "formidable", "frivolous", "fugitive", "gauge", "genuine", "glutton",
"grammar", "gruesome", "handkerchief", "hazardous", "hygiene", "ignorance", "illustrate", "imagine", "impulsive", "incarcerate",
"inoculate", "intricate", "jeopardy", "jurisdiction", "laboratory"
],
  }
  var raNum;
  if(mode === "easy"){
    raNum = Math.floor(Math.random() * words.easy.length);
    word = words.easy[raNum];
    maxTries = 10;
    time = 13;
    text.textContent = time;
    runTimeFlag = true;
  }
  else if(mode === "medium"){
    raNum = Math.floor(Math.random() * words.medium.length);
    word = words.medium[raNum];
    maxTries = 20;
    time = 13;
    text.textContent = time;
    runTimeFlag = true;
  }
  else if(mode === "hard"){
    raNum = Math.floor(Math.random() * words.hard.length);
    word = words.hard[raNum];
    maxTries = 40;
    time = 10;
    text.textContent = time;
    runTimeFlag = true;
  }
  
  speakWord("Your word is... " + word);
  console.clear();
  console.log(word)
}

var runTimeFlag = false;

var timer = setInterval(() => {
  if(runTimeFlag){ 
    time--;
    text.textContent = time;
  }
  
      var Ncalled = false;
  if(time === 0){
    runTimeFlag = false;
    time = 1;
    mainScreen.style.opacity = 0;
    if(Ncalled === false){
      speakWord("Sorry, you ran out of time... moving on");
      Ncalled = true;
    }
    body.classList.add("incorrect");
    setTimeout(() => {
      body.classList.remove("incorrect");
    }, 1000);
    
    setTimeout(() => {
      mainScreen.style.opacity = 100;
      tries++
      runTimeFlag = true;
      startGame();
      Ncalled = false;
    }, 3500);
  }
}, 1000);

submitBtn.addEventListener("click", () => {
  if(canSubmit) submitInput();
});

  function submitInput(){
  let inputBox = document.getElementById("word");
  let input = inputBox.value
  if(input === word){
    score++
    
    body.classList.add("correct");
    setTimeout(() => {
      body.classList.remove("correct");
    }, 1000);
    tries++
  }
  else{
    body.classList.add("incorrect");
    setTimeout(() => {
      body.classList.remove("incorrect");
    }, 1000);
    tries++
  }
  
  if(tries === maxTries){
    mainScreen.style.opacity = 0;
    if(score === 0){
      speakWord("You have completed the spelling bee... But you have flunked it... goodbye");
    }
    else if(score === maxTries){
      speakWord("You have completed the spelling bee and ACED it! Congratulations! You will now be refreshed... thank you!");
    }
    else{
      speakWord("You have completed the spelling bee and got " + score + " out of " + maxTries + " right... Keep trying and be better than last time! You will now be reset");
    }
    setTimeout(() => {
      window.location.reload();
    }, 10000);
    
    runTimeFlag = false;
  }
  else {
    startGame();
  }
  
  inputBox.value = "";
 }

