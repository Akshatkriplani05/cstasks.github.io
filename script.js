const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 10, snakeY = 15;
let speedX = 0, speedY = 0;
let snakeBody = [];
let setIntervalId;

let score = 0;


let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const foodsound =new Audio('food.wav');
const Oversound=new Audio('over.wav');
const updateFoodPosition = () => {
     
    foodX = Math.floor(Math.random() * 30) + 1;
      foodY = Math.floor(Math.random() * 30) + 1;
}

const GameOver = () => {
    
    Oversound.play();
    clearInterval(setIntervalId);
    alert("Oops!!!game over ...press enter to restart");
    location.reload();
   
}

const changeDirection = e => {
    
    if(e.key === "ArrowUp" && speedY != 1)
     {
        speedX = 0;
        speedY = -1;
    } 
    else if(e.key === "ArrowDown" && speedY != -1)
     {
        speedX = 0;
        speedY = 1;
    }
     else if(e.key === "ArrowLeft" && speedX != 1)
      {
        speedX = -1;
        speedY = 0;
    } 
    else if(e.key === "ArrowRight" && speedX != -1)
     {
    speedX = 1;
     speedY = 0;
    }
}


controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if(gameOver)
     return GameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

 
    if(snakeX === foodX && snakeY === foodY)
     {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); 
        score++; 
         foodsound.play();
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
           scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    
    snakeX += speedX;
    snakeY += speedY;
    
   
    for (let i = snakeBody.length - 1; i > 0; i--)
     {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

  
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30)
     {
        
        return GameOver();
        
    }

    for (let i = 0; i < snakeBody.length; i++)
     {
        
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
       
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            
            return GameOver();

        
        }
    }
    playBoard.innerHTML = html;
}

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);

