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
    document.addEventListener("keyup", resetVelocity)

    requestAnimationFrame(update);
    
}

function update() {
    requestAnimationFrame(update); 
    context.clearRect(0,0,board.width,board.height);


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