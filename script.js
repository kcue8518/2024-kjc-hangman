#script.js
//clearing the console (allowing game to begin on a fresh slate)
console.clear();

//less errors will occur with strict mode on 
"use strict";

//Creates buttons for guessing
let i = 1;
let alphabet = document.getElementById("alphabet");

//For loop and switch to letter each button
for (i; i <= 26; i++) {
  let letter;
  switch (i) {
    case 1:
      letter = 'A'
      break;
    case 2:
      letter = 'B'
      break;
    case 3:
      letter = 'C'
      break;
    case 4:
      letter = 'D'
      break;
    case 5:
      letter = 'E'
      break;
    case 6:
      letter = 'F'
      break;
    case 7:
      letter = 'G'
      break;
    case 8:
      letter = 'H'
      break;
    case 9:
      letter = 'I'
      break;
    case 10:
      letter = 'J'
      break;
    case 11:
      letter = 'K'
      break;
    case 12:
      letter = 'L'
      break;
    case 13:
      letter = 'M'
      break;
    case 14:
      letter = 'N'
      break;
    case 15:
      letter = 'O'
      break;
    case 16:
      letter = 'P'
      break;
    case 17:
      letter = 'Q'
      break;
    case 18:
      letter = 'R'
      break;
    case 19:
      letter = 'S'
      break;
    case 20:
      letter = 'T'
      break;
    case 21:
      letter = 'U'
      break;
    case 22:
      letter = 'V'
      break;
    case 23:
      letter = 'W'
      break;
    case 24:
      letter = 'X'
      break;
    case 25:
      letter = 'Y'
      break;
    case 26:
      letter = 'Z'
      break;
  }
  let button = document.createElement("button");
  button.innerHTML = letter;
  alphabet.appendChild(button);
  button.addEventListener ("click", e => initGame(e.target, letter));
}

//Word and hint list
const wordList = [
  {
    word: "Wealth",
    hint: "Another word for rich"
  },
  
  {
    word: "Oxygen",
    hint: "Tree invention"
  },
  
  {
    word: "Before",
    hint: "Opposite of after"
  },
  
  {
    word: "Puzzle",
    hint: "Game that tests knowledge"
  },
  
  {
  word: "Reward",
  hint: "Gift of recognition"
  },
  
  {
    word: "baboon",
    hint: "another word for ape"
  },
  
  {
    word: "eagles", 
    hint: "Large prey bird (plural)"
  },
  
  {
    word:"fabric",
    hint:"cloth produced by knitting"
  },
  
  {
    word: "hacked",
    hint: "unauthorized access to a computer"
  },
  
  {
    word: "kabobs",
    hint:"popular dish on a stick"
  },
  
  {
    word:"nachos",
    hint:"loaded chips"
  },
  
  {
    word:"rabbit",
    hint:"small fluffy animal",
  },
  
  {
    word:"vacuum",
    hint:"dyson, hoover or roomba",
  },
]

//Reused variables.
let currentWord
let correctLetters = []
let playerGuess = document.getElementById('guess');
let wrongGuessCount = 0;
const maxGuesses = 6;
let numberOfGuesses = document.getElementById('guess-count');
let mainWrap = document.getElementById('main-wrap');
let hangmanImg = document.getElementById('character');
let modal = document.getElementById('modal');
let modalResult = document.getElementById('modal-result');
let modalAnswer = document.getElementById('modal-answer');
let emoji = document.getElementById('emoji');
let retry = document.getElementById('retry');

//Function to update HTML guess count.
function updateGuessCount() {
  numberOfGuesses.innerText = 'Guesses: ' + wrongGuessCount + '/' + maxGuesses;
}

//Function for getting random word and setting up game.
function getRandomWord() {
  const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word.toUpperCase()
  console.log(word, hint);
  document.getElementById('hint').innerText = "Hint: " + hint;
  playerGuess.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");
  hangmanImg.src = 'images/hangman-' + wrongGuessCount + '.svg';
  updateGuessCount()
}

//Function for resetting data to play again.
function resetAll() {
  correctLetters = []
  wrongGuessCount = 0;
  alphabet.querySelectorAll('button').forEach(btn => btn.disabled = false);
  modal.classList.add('display');
  mainWrap.classList.remove('background');
document.getElementById('hint').innerText = "Hint: " + hint;
playerGuess.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
document.getElementById('hint').innerText = "Hint: " + hint;
 playerGuess.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
  getRandomWord();
}

//Play again button to resetAll() function. 
retry.addEventListener ("click", e => resetAll());

//Initiate game function. Guess functionality, as well as game over and winning modal. Else if in line 184 so count can't go over max guesses. Hangman images update by number through incorrect guess count.
function initGame(button, clickedLetter) {
  
if(currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter)
        playerGuess.querySelectorAll("li")[index].innerText = letter;
        if (correctLetters.length === currentWord.length) {
          setTimeout (() => {
            emoji.src = 'https://media.tenor.com/fEthhnb02dIAAAAe/bucktooth-emoji-patrick-star.png';
            modalResult.innerHTML = "You win!";
            modalAnswer.innerHTML = currentWord + "!";
            modal.classList.remove('display');
            mainWrap.classList.add('background');
          }, 300)
        }
      }})
    } else {
      if (wrongGuessCount < maxGuesses - 1) {
        wrongGuessCount++;
        hangmanImg.src = 'images/hangman-' + wrongGuessCount + '.svg';
        updateGuessCount();
       } else if (wrongGuessCount < maxGuesses) {
           wrongGuessCount++;
           hangmanImg.src = 'images/hangman-' + wrongGuessCount + '.svg';
           updateGuessCount();
           setTimeout (() => {
               emoji.src = 'https://media1.tenor.com/m/ZuIi8_mAm74AAAAC/scared-concerned.gif';
               modalResult.innerHTML = "Game over";
               modalAnswer.innerHTML = currentWord + "!";
               modal.classList.remove('display');
               mainWrap.classList.add('background');
             }, 300)     
         }
     }
      button.disabled = true
    }

//Starts game off
getRandomWord()
