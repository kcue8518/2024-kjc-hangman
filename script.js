//helpful with debugging, less errors will occur 
"use strict";

//Creates buttons for guessing, Initizaling variable and retrieving an element from the id "alphabet"
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
  //Creates the button and gives each button functionalilty according to what letter is assigned
  let button = document.createElement("button");
  button.innerHTML = letter;
  alphabet.appendChild(button);
  button.addEventListener ("click", e => initGame(e.target, letter));
}

//Word and hint list (Array)
let wordList = [
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
    word: "Apex",
    hint: "_____ predator"
  },
  
  {
    word: "Rhythm",
    hint: "Repeated pattern of sound"
  },
  
  {
    word: "Cowboy",
    hint: "Wild west"
  },
  
  {
    word: "Eagle", 
    hint: "Large prey bird"
  },
  
  {
    word: "Fabric",
    hint: "Cloth produced by knitting"
  },
  
  {
    word: "Hacked",
    hint: "Unauthorized access to a computer"
  },
  
  {
    word: "Kabob",
    hint: "Popular dish on a stick"
  },
  
  {
    word: "Nachos",
    hint: "Loaded chips"
  },
  
  {
    word: "Rabbit",
    hint: "Small fluffy animal",
  },
  
  {
    word: "Vacuum",
    hint: "Dyson, hoover or roomba",
  },

  {
    word: "Bamboo",
    hint: "Strong stalk for food and framing Japanese houses"
  },

  {
    word: "Arcade",
    hint: "Place to socialize and play games"
  },
  
  {
    word: "Checkers",
    hint: "Turn-based game"
  },

  {
    word: "Sakura",
    hint: "Flowering cherry tree"
  },
  
  {
    word: "Neptune",
    hint: "An icy planet"
  }
  
]

//Array for used words 
let usedWords = []

//Reused variables. link for modal - https://www.w3schools.com/howto/howto_css_modals.asp
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

//Function for getting random word and setting up game and word list.
function getRandomWord() {
  let newWordIndex = [Math.floor(Math.random() * wordList.length)]
  const {word, hint} = wordList[newWordIndex];
  console.log(word, hint);
  currentWord = word.toUpperCase()
  document.getElementById('hint').innerText = "Hint: " + hint;
  playerGuess.innerHTML = word.split("").map(() => '<li class="letter"></li>').join("");
  hangmanImg.src = 'images/hangman-' + wrongGuessCount + '.png';
  updateGuessCount()
  if(wordList.length > 1) {
  usedWords.push(wordList[newWordIndex]);
  wordList.splice(newWordIndex, 1);
  } else {
    usedWords.forEach((list) => {
        wordList.push(list); 
    })
    usedWords = []
    usedWords.push(wordList[newWordIndex]);
    wordList.splice(newWordIndex, 1);
  }
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
  getRandomWord();
}

//Play again button to resetAll() function. 
retry.addEventListener ("click", e => resetAll());

// Function to load hangman images asynchronously
function loadHangmanImages() {
  return new Promise((resolve, reject) => {
      const hangmanImages = [];
      for (let i = 0; i <= maxGuesses; i++) {
          const img = new Image();
          img.onload = () => {
              hangmanImages.push(img);
// Resolve the promise when all images are loaded.
              if (hangmanImages.length === maxGuesses + 1) {
                  resolve(hangmanImages);
              }
          };
// Reject the promise if any image fails to load.
          img.onerror = () => reject(new Error('Failed to load hangman images'));
          img.src = `images/hangman-${i}.png`;
      }
  });
}

// Load hangman images asynchronously
loadHangmanImages()
  .then(images => {
      // All hangman images loaded successfully
      console.log('Hangman images loaded successfully:', images);
      // Now you can start the game
      getRandomWord();
  })
  .catch(error => {
      // Error occurred while loading hangman images
      console.error('Error loading hangman images:', error);
  });

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
        hangmanImg.src = 'images/hangman-' + wrongGuessCount + '.png';
        updateGuessCount();
       } else if (wrongGuessCount === maxGuesses - 1) {
           wrongGuessCount++;
           hangmanImg.src = 'images/hangman-' + wrongGuessCount + '.png';
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
