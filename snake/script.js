document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    function makeGrid(){
        for(let i=0; i<324; i++){
            let div = document.createElement('div');
            grid.appendChild(div);
        }
    }
    makeGrid();
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('.score span');
    const highScoreDisplay = document.querySelector('.highScore span');
    const startBtn = document.querySelector('.start');
    const foodSound = new Audio('music/food.mp3');
    const gameOverSound = new Audio('music/gameover.mp3');
    const moveSound = new Audio('music/move.mp3');
    const musicSound = new Audio('music/music.mp3');

    const width = 18;
    let currentIndex = 0; 
    let appleIndex = 0;
    let currentSnake = [2, 1, 0];
    let direction = 1;
    let score = 0; 
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;    
    let highScore = localStorage.getItem("highscore");
    if(highScore === null){
        highScoreval = 0;
        localStorage.setItem("highScore", JSON.stringify(highScoreval))
    }
    else{
        highScoreval = JSON.parse(highScore);
        highScoreDisplay.innerHTML = highScore;
    }

    // to start, and restart the game
    function startGame(){
        musicSound.play();
        currentSnake.forEach(index => {
            squares[index].classList.remove('snake');
            squares[index].classList.remove('head');
        });
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple()
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 400;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        squares[currentSnake[0]].classList.add('head');
        interval = setInterval(moveOutcome, intervalTime);
    }


    // function that deal with All the outcomes
    function moveOutcome(){

        //deals with snake hitting the wall or itself
        if(
            (currentSnake[0] + width >= (width*width) && direction === width) || // if snake hit down wall
            (currentSnake[0] % width === width-1 && direction === 1) || // if snake hit right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hit left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hit up wall
            squares[currentSnake[0] + direction].classList.contains('snake')// if snake hit itself
        ){
            gameOverSound.play();
            musicSound.pause();
            return clearInterval(interval);
        }


        let tail = currentSnake.pop();//remove tail
        squares[tail].classList.remove('snake'); // remove snake class
        squares[currentSnake[0]].classList.remove('head');
        currentSnake.unshift(currentSnake[0] + direction); // add new head

        // deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            foodSound.play();
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple()
            score++;
            if(score>highScoreval){
                highScoreval = score;
                localStorage.setItem("highScore", JSON.stringify(highScoreval));
                highScoreDisplay.innerHTML = highScoreval;
            }
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcome, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake'); // add snake class to new add
        squares[currentSnake[0]].classList.add('head');
    }


    // generate new apple once apple is eaten
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random()*squares.length);
        }while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
    }

    // Assign function to keycodes
    function control(e) {
        moveSound.play();
        squares[currentIndex].classList.remove('snake');

        if(e.keyCode === 39){
            direction = 1; // if we press right arrow, then snake move one div in right
        }
        else if(e.keyCode === 38){
            direction = -width; // if we press up arrow, then snake go back to 18 divs 
        }
        else if(e.keyCode === 37){
            direction = -1; // if we press left arrow, then snake move one div in left
        }
        else if(e.keyCode === 40){
            direction = width; // if we press down arrow, then snake go to 18 divs ahead. 
        }
    }
    
    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
});