let character = document.getElementById('character');
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let ground = document.getElementById('ground');
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue('height'));
let isJumping = false;
let upTime;
let downTime;
let displayScore = document.getElementById('score');
let score = 0;

function jump() {
    if (isJumping) return;
    upTime = setInterval(() => {
        if (characterBottom >= groundHeight + 250) {
            clearInterval(upTime);
            downTime = setInterval(() => {
                if (characterBottom <= groundHeight + 10) {
                    clearInterval(downTime);
                    isJumping = false;
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom + 'px';
            }, 10)
        }

        characterBottom += 10;
        character.style.bottom = characterBottom + 'px';
        isJumping = true;
    }, 20);

}



function genrateObstacle() {
    let obstacles = document.querySelector('.obstacles');
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class', 'obstacle');
    obstacles.appendChild(obstacle);

    let randomTimeout = Math.floor(Math.random() * 1000) + 1050;
    let obstacleright = -30;
    let obstacleBottom = 100;
    let obstacleWidth = 30;
    let obstacleHeight = Math.floor(Math.random() * 50) + 50;
    obstacle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}
    ,${Math.floor(Math.random() * 255)})`

    function Moveobstacle() {
        obstacleright += 5;
        obstacle.style.right = obstacleright + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        obstacle.style.width = obstacleWidth + 'px';
        obstacle.style.height = obstacleHeight + 'px';

        if (characterRight >= obstacleright - characterWidth && characterRight <=
            obstacleright + obstacleWidth && characterBottom <= obstacleBottom + obstacleHeight ) {
            alert('Game Over!,\n Your Score:' + score);
            clearInterval(obstacleInterval);
            clearTimeout(obstacleTimeout);
            score = 0;
            location.reload();
        }
        else if ( isJumping && characterRight >= obstacleright - characterWidth+77 && characterRight <=
            obstacleright + obstacleWidth ) {
                score++;
            displayScore.innerText = score;
            // Check Location How Its Working
            console.log(characterRight + ',' + obstacleright) 
        }

    }

    let obstacleInterval = setInterval(Moveobstacle, 20);
    let obstacleTimeout = setTimeout(genrateObstacle, 1000);

}


genrateObstacle();

function control(e) {
    if (e.key == 'ArrowUp' || e.key == ' ') {
        jump();
    }
}

document.addEventListener('keydown', control);