let questionText = document.querySelector("#questionText");
let answerOne = document.querySelector("#answerOne");
let answerTwo = document.querySelector("#answerTwo");
let answerThree = document.querySelector("#answerThree");
let answerFour = document.querySelector("#answerFour");
let submitBtn = document.querySelector("#submit");


let question = 1;
let correct;
let correctNum = 0;
let totalQuestions = 8;
  
setInterval(quiz, 200);

function quiz(){
  if(question === 1){
    answerOne.classList.add("cursorTrue");
    answerTwo.classList.add("cursorTrue");
    answerThree.classList.add("cursorTrue");
    answerFour.classList.add("cursorTrue");

    answerOne.classList.remove("cursorFalse");
    answerTwo.classList.remove("cursorFalse");
    answerThree.classList.remove("cursorFalse");
    answerFour.classList.remove("cursorFalse");
    
    submitBtn.textContent = "Submit"

    questionText.textContent = "What does HTML stand for?"

    answerOne.textContent = "Hypertext Markup Language"
    answerOne.onclick = function(){
        correct = true
        answerOne.classList.toggle("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerTwo.textContent = "Hyperventilating Talented Monkey Language"
    answerTwo.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.toggle("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerThree.textContent = "Hollowtext Markup Language"
    answerThree.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.toggle("clicked");
        answerFour.classList.remove("clicked");
    };
    answerFour.textContent = "Hypertext Monkey Language"
    answerFour.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.toggle("clicked");
    };
    submitBtn.onclick = function(){
        if(correct === true){
            correctNum++
        }
        question = 2
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    }
  };
  if(question === 2){

    questionText.textContent = "True or false, nearly all tags in HTML need a closing tag"

    answerOne.textContent = "True"
    answerOne.onclick = function(){
        correct = true
        answerOne.classList.toggle("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerTwo.textContent = "False"
    answerTwo.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.toggle("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerThree.classList.remove("cursorTrue");
    answerThree.classList.add("cursorFalse");
    answerThree.textContent = ""
    answerThree.onclick = function(){
      correct = false;
    };
    answerFour.classList.remove("cursorTrue");
    answerFour.classList.add("cursorFalse");
    answerFour.textContent = ""
    answerFour.onclick = function(){
      correct = false;
    };
    submitBtn.onclick = function(){
        if(correct === true){
            correctNum++
        }
        question = 3
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    }
  }
  if(question === 3){

    questionText.textContent = "Which one of these is NOT a math operator?"

    answerOne.textContent = "==="
    answerOne.onclick = function(){
        correct = false
        answerOne.classList.toggle("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerTwo.textContent = ">"
    answerTwo.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.toggle("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerThree.classList.add("cursorTrue");
    answerThree.classList.remove("cursorFalse");
    answerThree.textContent = ";"
    answerThree.onclick = function(){
        correct = true
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.toggle("clicked");
        answerFour.classList.remove("clicked");
    };
    answerFour.classList.add("cursorTrue");
    answerFour.classList.remove("cursorFalse");
    answerFour.textContent = "<="
    answerFour.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.toggle("clicked");
    };
    submitBtn.onclick = function(){
        if(correct === true){
            correctNum++
        }
        question = 4
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    }
  }
  if(question === 4){

    questionText.textContent = "In Javascript, which of the following is NOT the proper way to create a click function?"

    answerOne.textContent = "box.onclick = function(){ console.log() };"
    answerOne.onclick = function(){
        correct = false
        answerOne.classList.toggle("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerTwo.textContent = "box.addEventListener('click', function(){ console.log() });"
    answerTwo.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.toggle("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerThree.textContent = "box.onclick = handleClick;"
    answerThree.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.toggle("clicked");
        answerFour.classList.remove("clicked");
    };
    answerFour.textContent = "box.addEventListener('click', function(){ console.log() };"
    answerFour.onclick = function(){
        correct = true
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.toggle("clicked");
    };
    submitBtn.onclick = function(){
        if(correct === true){
            correctNum++
        }
        question = 5
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    }
  }
  if(question === 5){

    questionText.textContent = "In Javascript, what is the output to this if numOne = 10 and numTwo = 4? console.log(numOne % numTwo)"

    answerOne.textContent = "2"
    answerOne.onclick = function(){
        correct = true
        answerOne.classList.toggle("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerTwo.textContent = "0"
    answerTwo.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.toggle("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerThree.textContent = "error"
    answerThree.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.toggle("clicked");
        answerFour.classList.remove("clicked");
    };
    answerFour.textContent = "8"
    answerFour.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.toggle("clicked");
    };
    submitBtn.onclick = function(){
        if(correct === true){
            correctNum++
        }
        question = 6
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    }
  }
  if(question === 6){

    questionText.textContent = "In HTML, what do you type in css to affect <div class='box'></div>?"

    answerOne.textContent = "#box"
    answerOne.onclick = function(){
        correct = false
        answerOne.classList.toggle("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerTwo.textContent = "box"
    answerTwo.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.toggle("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerThree.textContent = ".box"
    answerThree.onclick = function(){
        correct = true
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.toggle("clicked");
        answerFour.classList.remove("clicked");
    };
    answerFour.textContent = ",box"
    answerFour.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.toggle("clicked");
    };
    submitBtn.onclick = function(){
        if(correct === true){
            correctNum++
        }
        question = 7
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    }
  }
  if(question === 7){

    questionText.textContent = "True or False, In Javascript, this is the right way to call function 'click' after every second. setInterval(click, 1);"

    answerOne.textContent = "True"
    answerOne.onclick = function(){
        correct = false
        answerOne.classList.toggle("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerTwo.textContent = "False"
    answerTwo.onclick = function(){
        correct = true
        answerOne.classList.remove("clicked");
        answerTwo.classList.toggle("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerThree.classList.remove("cursorTrue");
    answerThree.classList.add("cursorFalse");
    answerThree.textContent = ""
    answerThree.onclick = function(){
      correct = false;
    };
    answerFour.classList.remove("cursorTrue");
    answerFour.classList.add("cursorFalse");
    answerFour.textContent = ""
    answerFour.onclick = function(){
      correct = false;
    };
    submitBtn.onclick = function(){
        if(correct === true){
            correctNum++
        }
        question = 8
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    }
  }
  if(question === 8){

    questionText.textContent = "In CSS, how do you change the text's size?"

    answerOne.textContent = "font-weight: bold;"
    answerOne.onclick = function(){
        correct = false
        answerOne.classList.toggle("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerTwo.textContent = "font: 15px;"
    answerTwo.onclick = function(){
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.toggle("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    };
    answerThree.classList.add("cursorTrue");
    answerThree.classList.remove("cursorFalse");
    answerThree.textContent = "font-size: 1.5rem;"
    answerThree.onclick = function(){
      correct = true;
    };
    answerFour.classList.add("cursorTrue");
    answerFour.classList.remove("cursorFalse");
    answerFour.textContent = "text-size: 100px;"
    answerFour.onclick = function(){
      correct = false;
    };
    submitBtn.onclick = function(){
        if(correct === true){
            correctNum++
        }
        question = 9
        correct = false
        answerOne.classList.remove("clicked");
        answerTwo.classList.remove("clicked");
        answerThree.classList.remove("clicked");
        answerFour.classList.remove("clicked");
    }
  }
  //Ending Score!
  if(question === totalQuestions + 1){
    answerOne.classList.remove("cursorTrue");
    answerTwo.classList.remove("cursorTrue");
    answerThree.classList.remove("cursorTrue");
    answerFour.classList.remove("cursorTrue");

    answerOne.classList.add("cursorFalse");
    answerTwo.classList.add("cursorFalse");
    answerThree.classList.add("cursorFalse");
    answerFour.classList.add("cursorFalse");
    
    questionText.textContent = "You got " + correctNum + "/" + totalQuestions + " questions correct!"
    answerOne.textContent = ""
    answerOne.onclick = function(){
        question = 5
        correctNum += 0
    };
    answerTwo.textContent = ""
    answerTwo.onclick = function(){
        question = 5
        correctNum += 0
    };
    answerThree.textContent = ""
    answerThree.onclick = function(){
        question = 5
        correctNum += 0
    };
    answerFour.textContent = ""
    answerFour.onclick = function(){
        question = 5
        correctNum += 0
    };
    submitBtn.textContent = "Retry"
    submitBtn.onclick = function(){
        correct = false;
        question = 1;
        correctNum = 0;
    }
  }
};