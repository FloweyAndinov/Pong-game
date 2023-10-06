//board
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

let playerWidth = 10;
let playerHeight = 50;
let playerVelocityY = 0;
let player1 = {
    x : 10,
    y : boardHeight / 2,
    width : playerWidth,
    height : playerHeight,
    velocityY : playerVelocityY
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight / 2,
    width : playerWidth,
    height : playerHeight,
    velocityY : playerVelocityY
}

let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth / 2,
    y : boardHeight / 2,
    width : ballWidth,
    height : ballHeight,
    velocityX : 1,
    velocityY : 2
}

let player1Score = 0;
let player2Score = 0;


window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight
    board.width = boardWidth
    context = board.getContext("2d"); // used for drawing on the board

    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    context.fillStyle = "skyblue";
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    document.addEventListener("keydown", movePlayer);
    document.addEventListener("keyup", resetVelocity);

    

    requestAnimationFrame(update);
    
}

function update() {
    requestAnimationFrame(update); 
    context.clearRect(0,0,board.width,board.height);

    for (let i = 10; i< board.height; i+=25) {
        // i = starting y pos, draw a square every 25 pixels down
        context.fillRect(board.width/2 - 10 , i , 5 , 5);
    }

    //player1
    context.fillStyle = "skyblue";
    //player1.y += player1.velocityY;
    let nextPlayer1Y = player1.y + player1.velocityY;
    // console.log(nextPlayer1Y);
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    else {

    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);


    //player2
    context.fillStyle = "skyblue";
    //player2.y += player2.velocityY;

    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if (ball.y<0 || ball.y + ball.height >= boardHeight) {
        ball.velocityY *=-1;
    }

    if (detectCollision(ball,player1)) {
        if (ball.x <=player1.x + player1.width) {
            ball.velocityX *= -1;
        }
    }

    if (detectCollision(ball,player2)) {
        if (ball.x + ballWidth >= player2.x) {
            ball.velocityX *= -1;
        }
    }

    //score
    if (ball.x < 0) {
        player2Score++;
        ball.x = boardWidth / 2;
        ball.y = boardHeight / 2;
    }
    if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        ball.x = boardWidth / 2;
        ball.y = boardHeight / 2;
    }

    context.font = "45px sans-serif"
    context.fillText(player1Score , boardWidth/5 , 45)
    context.fillText(player2Score , boardWidth*4/5 -45, 45)
}

function movePlayer (e) {
    //player1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }


    //player2
    if (e.code == "KeyI") {
        player2.velocityY = -3;
    }
    else if (e.code == "KeyK") {
        player2.velocityY = 3;
    }

}

function resetVelocity (e) {
    if (e.code == "KeyW") {
        
        player1.velocityY = 0;
    }
    else if (e.code == "KeyS") {
        
        player1.velocityY = 0;
    }

    if (e.code == "KeyI") {
        player2.velocityY = 0;
    }
    else if (e.code == "KeyK") {
        player2.velocityY = 0;
    }
       
}

function outOfBounds (yPos) {
    
    return (yPos < 0 || yPos + playerHeight > boardHeight);

}

function detectCollision (a,b) {
    return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
    a.x + a.width > b.x && // a's top right corner passes b's top left corner
    a.y < b.y + b.height && //a's top left corner doens't reach b's bottom left corner
    a.y + a.height > b.y; // a's bottom left corner passes b's top left corner
}