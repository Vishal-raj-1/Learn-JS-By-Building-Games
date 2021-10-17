const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const grid = document.querySelector('.grid');
const main = document.querySelector('.main');
let score = document.querySelector('#score');
let gameMusic = new Audio('./music/gameMusic.mp3');
let hitMusic = new Audio('./music/hitMusic.mp3');

let result = 0;
let currentTime = 60;
let hitPosition;
let timerId = null;
let countDownTimerId = null;

// Random Square have mole class
function randomSquare(){
  square.forEach(className => {
    className.classList.remove('mole');
  })
  let randomPosition = square[Math.floor(Math.random()*9)];
  randomPosition.classList.add('mole');
  hitPosition = randomPosition.id;
}
randomSquare();
// mousedown event
square.forEach(id => {
  id.addEventListener('mousedown', () => {
    if(id.id === hitPosition){
      result++;
      hitMusic.play();
      setTimeout( () => hitMusic.pause(), 1000);
      score.textContent = 'Your Score: ' + result;
      hitPosition = null;
    }
  })
})

// Time Left Calculation
function countDown(){
  currentTime--;
  timeLeft.textContent = 'Time Left: ' + currentTime;

  if(currentTime === 0){
    pauseGame();
    showScore();
  }
}

//Centralise the score
function showScore(){
  main.style.justifyContent = 'center';
  grid.style.display = 'none';
  timeLeft.style.display = 'none';
  pause.style.display = 'none';
}

function showGrid(){
  grid.style.display = 'flex';
  timeLeft.style.display = 'inline-block';
  pause.style.display = 'inline-block';
}

start.addEventListener('click', startGame);
pause.addEventListener('click', pauseGame);

// Start Game
function startGame(){
  showGrid();
  gameMusic.play();
  currentTime = 60;
  result = 0;
  timeLeft.textContent = 'Time Left: ' + currentTime;
  score.textContent = 'Your Score: ' + result;
  pause.textContent = "Pause";
  clearInterval(timerId);
  clearInterval(countDownTimerId);
  countDownTimerId = setInterval(countDown, 1000);
  timerId = setInterval(randomSquare, 1000);
}

// Pause Game
function pauseGame(){
  if(pause.textContent === "Pause"){
    clearInterval(timerId);
    clearInterval(countDownTimerId);
    gameMusic.pause();
    pause.textContent = "Resume";
  }
  else{
    countDownTimerId = setInterval(countDown, 1000);
    timerId = setInterval(randomSquare, 1000);
    gameMusic.play();
    pause.textContent = "Pause";
  }
}