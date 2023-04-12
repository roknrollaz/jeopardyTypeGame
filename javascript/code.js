`use strict`;

/*
 {
  keyId: "",
  topic : "",
  question : "",
  a : "",
  b : "",
  c : "",
 },
 */
const theBody = document.getElementsByTagName("body");
let topics = document.getElementsByClassName("topics");
const questionDiv = document.getElementsByClassName("question");
const questionContainer = document.querySelector(".question-container");

const actualQuestion = document.getElementsByClassName("actual-question"); //
const hiddenQuestDiv = document.querySelector(".hidden-question-div"); //
const answers = document.getElementsByClassName("answers");

const firstAnswer = document.getElementById("firstAnswer");
const secondAnswer = document.getElementById("secondAnswer");
const thirdAnswer = document.getElementById("thirdAnswer");

const firstAnswerText = document.querySelector(".first-answer-text");
const secondAnswerText = document.querySelector(".second-answer-text");
const thirdAnswerText = document.querySelector(".third-answer-text");
const answerLabels = document.getElementsByClassName("answerLabels");
const submitButton = document.getElementById("submitButton");

const scoreTextDisplay = document.querySelector(".score-itself");
const scoreContainer = document.querySelector(".score-container");
const scorePlusAnimation = document.querySelector(".score-plus-animation");
const scoreAni = document.querySelector(".score-ani");
const bonusAni = document.querySelector(".bonus-plus-animation");
const correctSound = document.getElementById("correct-sound");
const bonusSound = document.getElementById("bonus-sound");
const errorSound = document.getElementById("error-sound");
const allGreenSound = document.getElementById("all-tiles-green-sound");
const questionSound = document.getElementById("question-sound");

let bonus1 = false;
let bonus2 = false;
let bonus3 = false;
let bonus4 = false;
let bonus5 = false;
let bonus6 = false;
let bonus7 = false;
let bonus8 = false;

let firstNumbers = [];
let numbers = [];
let score = 0;
let scoreTotal = 0;
let bonusScore = 100;
// c is always correct answer// c for correct.
const questionObjects = [
  {
    keyId: "history-1",
    topic: "History",
    question:
      "Which European country was not a member of the Allied Powers during World War II?",
    a: "Italy",
    b: "France",
    c: "Germany",
  },
  {
    keyId: "geography-1",
    topic: "Geography",
    question: "What is the capital of Australia?",
    a: "Melbourne",
    b: "Sydney",
    c: "Canberra",
  },
  {
    keyId: "music-1",
    topic: "Music",
    question: "Who composed the famous opera 'The Marriage of Figaro'?",
    a: "Ludwig van Beethoven",
    b: "Wolfgang Amadeus Mozart",
    c: "Johann Sebastian Bach",
  },
  {
    keyId: "math-1",
    topic: "Math",
    question: "What is the square root of 64?",
    a: "6",
    b: "8",
    c: "4",
  },
  {
    keyId: "coding-1",
    topic: "Coding",
    question: "Which of the following is a programming language?",
    a: "HTML",
    b: "JPEG",
    c: "Python",
  },
  {
    keyId: "art-1",
    topic: "Art",
    question:
      "Which art movement is known for its use of bright colors and bold shapes?",
    a: "Baroque",
    b: "Cubism",
    c: "Fauvism",
  },
  {
    keyId: "science-1",
    topic: "Science",
    question: "Which of the following elements is not a metal?",
    a: "Copper",
    b: "Iron",
    c: "Carbon",
  },
  {
    keyId: "history-2",
    topic: "History",
    question: "Who was the first President of the United States?",
    a: "John Adams",
    b: "Benjamin Franklin",
    c: "George Washington",
  },
  {
    keyId: "geography-2",
    topic: "Geography",
    question: "Which ocean is the largest in the world?",
    a: "Atlantic Ocean",
    b: "Indian Ocean",
    c: "Pacific Ocean",
  },
  {
    keyId: "science-2",
    topic: "Science",
    question:
      "What is the process by which plant conver light into energy called?",
    a: "Respiration",
    b: "Photosynthesis",
    c: "Transpiration",
  },
];

while (firstNumbers.length < topics.length) {
  let randomNumber = Math.floor(Math.random() * questionObjects.length);
  if (!firstNumbers.includes(randomNumber)) {
    firstNumbers.push(randomNumber);
  }
}

for (let x = 0; x < firstNumbers.length; x++) {
  if (firstNumbers.length >= 9) {
    //WOrkin here trying fix numbers of objects in array being able to be randomized to go into the tiles if number of objects is over 9 length;
    topics[x].textContent = questionObjects[firstNumbers[x]].topic; // The problem is on this line<<<<<<<<<<<<<<0
    questionDiv[x].setAttribute("id", questionObjects[firstNumbers[x]].keyId);
  }
}

for (let i = 0; i < topics.length; i++) {
  /* let randomNumber = Math.floor(Math.random() * questionObjects.length); //makes random number
  
  topics[i].textContent = questionObjects[randomNumber].topic; // adds text of topic on object array using random number.
  questionDiv[i].setAttribute("id", questionObjects[randomNumber].keyId);*/ // same random number is still in motion since loop hasnt restarted when loop "loops", random number will be different. sets id on the div;
  //WORK HERE.. EVERY TILE NEEDS A DIFFERENT UNIQUE ID//
  questionDiv[i].onmousedown = function () {
    questionDiv[i].style.boxShadow = "none";
  };
  questionDiv[i].onclick = function () {
    questionDiv[i].classList.add("pointerEv");
    scoreContainer.style.display = "none";
    theBody[0].classList.add("questionAnimation");
    questionSound.play();
    for (let x = 0; x < answers.length; x++) {
      answers[x].checked = false;
    }
    numbers = [];
    //function that happens when you click on the topics.like.... history, music, exc.
    questionContainer.style.display = "none";

    hiddenQuestDiv.style.display = "block";

    for (let i = 0; i < questionObjects.length; i++) {
      if (this.id === questionObjects[i].keyId) {
        actualQuestion[0].innerHTML = questionObjects[i].question; //the question;

        while (numbers.length < answers.length) {
          //while loop that pushes random numbers between 1 and 3 into array numbers[]
          let anotherRandomNumber = Math.floor(Math.random() * answers.length);
          if (!numbers.includes(anotherRandomNumber)) {
            // if this array doesnt include the number already then we will push it so we dont have the same numbers.
            numbers.push(anotherRandomNumber);
          }
        }
        answers[numbers[0]].setAttribute("value", questionObjects[i].a); //question answerChoices// we use the numbers array to select a random answer element to put a random answer in so that we dont have a repeat of abc abc, istead we have bac, cab,abc
        answerLabels[numbers[0]].textContent = questionObjects[i].a;

        answers[numbers[1]].setAttribute("value", questionObjects[i].b);
        answerLabels[numbers[1]].textContent = questionObjects[i].b;

        answers[numbers[2]].setAttribute("value", questionObjects[i].c);
        answerLabels[numbers[2]].textContent = questionObjects[i].c;

        submitButton.addEventListener("click", function () {
          theBody[0].classList.remove("questionAnimation");
          //WORKING ON THIS FUNCTION//
          numbers = [];

          for (let n = 0; n < answers.length; n++) {
            if (answers[n].checked === true) {
              if (
                answers[n].value !== questionObjects[i].c && // value doesnt equal correct answer wich is c on objecst array questionObjects
                !document
                  .getElementById(questionObjects[i].keyId)
                  .classList.contains("color-green") &&
                !document
                  .getElementById(questionObjects[i].keyId)
                  .classList.contains("color-red") //does not contain color green class
              ) {
                //then...
                errorSound.play();
                scoreContainer.style.display = "block";
                document
                  .getElementById(questionObjects[i].keyId)
                  .classList.add("color-red");
                questionContainer.style.display = "grid";
                theBody[0].style.backgroundColor = "  #25274d";
                hiddenQuestDiv.style.display = "none";
              } else if (
                !document
                  .getElementById(questionObjects[i].keyId)
                  .classList.contains("color-green") &&
                answers[n].value === questionObjects[i].c &&
                !document
                  .getElementById(questionObjects[i].keyId)
                  .classList.contains("color-red")
              ) {
                correctSound.play();

                score += 5;
                scorePlusAnimation.style.display = "block";
                scorePlusAnimation.classList.add("score-ani");

                setTimeout(function () {
                  scorePlusAnimation.style.display = "none";
                  scorePlusAnimation.classList.remove("score-ani");
                }, 1000);

                scoreTextDisplay.textContent = score;

                document
                  .getElementById(questionObjects[i].keyId)
                  .classList.add("color-green");
                questionContainer.style.display = "grid";
                theBody[0].style.backgroundColor = " #25274d";
                hiddenQuestDiv.style.display = "none";
                scoreContainer.style.display = "block";
              }
            }
          }
          // this section is bonus points when 3 green in a row you get bonus points.
          let rowNumber = 1;
          let columnNumber = 4;
          const greenClass = document.getElementsByClassName("color-green");
          for (let a = 0; a < questionDiv.length; a++) {
            if (questionDiv[a].classList.contains("color-green")) {
              questionDiv[a].classList.add(`rowClass-${rowNumber}`);
              questionDiv[a].classList.add(`colClass-${columnNumber}`);
            }
            if (columnNumber < 6) {
              columnNumber++;
            } else {
              columnNumber = 4;
            }
            if (a === 2) {
              rowNumber = 2;
            } else if (a === 5) {
              rowNumber = 3;
            }
          }

          // rowClasses
          const rowClass1 = document.getElementsByClassName("rowClass-1");
          const rowClass2 = document.getElementsByClassName("rowClass-2");
          const rowClass3 = document.getElementsByClassName("rowClass-3");
          // colClasses
          const colClass1 = document.getElementsByClassName("colClass-4");
          const colClass2 = document.getElementsByClassName("colClass-5");
          const colClass3 = document.getElementsByClassName("colClass-6");

          // bonus variables are outside of the function so that the local variables retain there changes.
          // row bonuses//
          if (!bonus1) {
            if (rowClass1.length === 3) {
              correctSound.pause();
              bonusSound.play();
              bonusAni.style.display = "block";
              setTimeout(function () {
                bonusAni.style.display = "none";
              }, 1000);
              scoreTextDisplay.textContent = score += 100;
              bonus1 = true;
              for (let i = 0; i < rowClass1.length; i++) {
                rowClass1[i].classList.add("flashingColors");
                setTimeout(function () {
                  rowClass1[i].classList.remove("flashingColors");
                }, 1000);
              }
            }
          }
          if (!bonus2) {
            if (rowClass2.length === 3) {
              correctSound.pause();
              bonusSound.play();
              bonusAni.style.display = "block";
              setTimeout(function () {
                bonusAni.style.display = "none";
              }, 1000);
              scoreTextDisplay.textContent = score += 100;
              bonus2 = true;
              for (let i = 0; i < rowClass2.length; i++) {
                rowClass2[i].classList.add("flashingColors");
                setTimeout(function () {
                  rowClass2[i].classList.remove("flashingColors");
                }, 1000);
              }
            }
          }
          if (!bonus3) {
            if (rowClass3.length === 3) {
              correctSound.pause();
              bonusSound.play();
              bonusAni.style.display = "block";
              setTimeout(function () {
                bonusAni.style.display = "none";
              }, 1000);
              scoreTextDisplay.textContent = score += 100;
              bonus3 = true;
              for (let i = 0; i < rowClass3.length; i++) {
                rowClass3[i].classList.add("flashingColors");
                setTimeout(function () {
                  rowClass3[i].classList.remove("flashingColors");
                }, 1000);
              }
            }
          }
          //column bonuses
          if (!bonus4) {
            if (colClass1.length === 3) {
              correctSound.pause();
              bonusSound.play();
              bonusAni.style.display = "block";
              setTimeout(function () {
                bonusAni.style.display = "none";
              }, 1000);
              scoreTextDisplay.textContent = score += 100;
              bonus4 = true;
              for (let i = 0; i < colClass1.length; i++) {
                colClass1[i].classList.add("flashingColors");
                setTimeout(function () {
                  colClass1[i].classList.remove("flashingColors");
                }, 1000);
              }
            }
          }
          if (!bonus5) {
            if (colClass2.length === 3) {
              correctSound.pause();
              bonusSound.play();
              bonusAni.style.display = "block";
              setTimeout(function () {
                bonusAni.style.display = "none";
              }, 1000);
              scoreTextDisplay.textContent = score += 100;
              bonus5 = true;
              for (let i = 0; i < colClass2.length; i++) {
                colClass2[i].classList.add("flashingColors");
                setTimeout(function () {
                  colClass2[i].classList.remove("flashingColors");
                }, 1000);
              }
            }
          }
          if (!bonus6) {
            if (colClass3.length === 3) {
              correctSound.pause();
              bonusSound.play();
              bonusAni.style.display = "block";
              setTimeout(function () {
                bonusAni.style.display = "none";
              }, 1000);
              scoreTextDisplay.textContent = score += 100;
              bonus6 = true;

              for (let i = 0; i < colClass3.length; i++) {
                colClass3[i].classList.add("flashingColors");
                setTimeout(function () {
                  colClass3[i].classList.remove("flashingColors");
                }, 1000);
              }
            }
          }
          if (greenClass.length === 9) {
            correctSound.pause();
            bonusSound.pause();
            allGreenSound.play();
            scoreTextDisplay.textContent = score += 1000;
            for (let i = 0; i < questionDiv.length; i++) {
              questionDiv[i].classList.add("flashingColors");
              setTimeout(function () {
                questionDiv[i].classList.remove("flashingColors");
              }, 2000);
            }
          }
          // soon to be diagnal classes
        });
      }
    }
  };
}

function doubleChar(str) {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
   
    newStr += str[i];
    newStr += str[i];
  }
  console.log(newStr);
}
doubleChar("Hello Friend")