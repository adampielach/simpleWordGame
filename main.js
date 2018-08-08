window.addEventListener('load', init);

const levels = {
    easy: 5,
    medium: 3,
    hard: 2
};

let currentLevel = levels.easy;
let time = currentLevel;
let score = 0;
let isPlaying;

const difficulty = document.querySelector('#difficulty');
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'hat',
    'bat',
    'mouse',
    'dog',
    'river',
    'house',
    'prestidigitator',
    'concede',
    'runaway',
    'ambidextrous',
    'establishment',
    'backdrop',
    'curtly',
    'happily',
    'motherboard',
    'skyscraper',
    'balloon',
    'coffee',
    'tea',
    'bark',
    'sword',
    'space',
    'nebula',
    'undead',
    'blight',
    'light',
    'scourge',
    'fortunate'
];

// Set Time

function setTime() {
    time = currentLevel;
    seconds.innerHTML = currentLevel;
}

// Set level
function setLevel() {
    currentLevel = levels[difficulty.value];
    difficulty.addEventListener('change', function () {
        currentLevel = levels[this.value];
        seconds.innerHTML = currentLevel;
        newGame();
    });
}

// New Game

function newGame() {
    isPlaying = true;
    setTime();
    clearInterval(countdown);
    clearInterval(checkStatus);
    showWord(words);
    wordInput.value = '';
    checkStatus();
}

// Initialize the game

function init() {
    // Sets the current dropdown level
    setLevel();
    // Show number of seconds in UI
    setTime();
    // load word from array
    // showWord(words);
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
    // New game
    newGame();
}

// Start match

function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    // If score = -1
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

// Match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

// Pick & Show random word
function showWord(words) {
    // generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
    // Make sure time is not run out
    if (time > 0) {
        // Decrement
        time--;
    } else if (time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        score = -1;
    } else {
        // message.innerHTML = '';
    }
}