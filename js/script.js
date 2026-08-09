"use strict";

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');

var sprite = document.querySelector("#sprite")

canvas.width = 448;
canvas.height = 400;

/* VARIABLES DE LA PELOTA */
var ballRadius = 5;

//coordenadas. 
//indican la posicion
var x = canvas.width / 2; 
var y = canvas.height - 30;

// velocidad de la pelota = 
//indica cuantos px se mueve en cada frame
var dx = 2; // + derecha, - izquierda 
var dy = -2; // + abajo, - arriba


/* VARIABLES DE LA PALETA */
var paddleHeight = 10;
var paddleWidth = 50;

var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - paddleHeight - 10;

var rightPressed = false;
var leftPressed = false;

var PADDLE_SENSITIVITY = 3;

/* DIBUJAR */
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath(); // esto? 
}

function drawPaddle() {

    // primera paletita q hice jeje
    /*ctx.fillStyle = '#09f';
    ctx.fillRect(
        paddleX,
        paddleY,
        paddleWidth,
        paddleHeight
    );*/

    ctx.drawImage(
        sprite,
        629, 350, 165, 45, // sprite
        paddleX, paddleY, //canvas
        paddleWidth, paddleHeight
    );

    
}


function drawBricks() {}

/* COMPORTAMIENTOS / MOVIMIENTOS */

function collisionDetection(){}

/* MOVIMIENTO PELOTA */
function ballMovement(){
    // la pelota toca la paleta
    var isBallSameXAsPaddle =
        x + ballRadius > paddleX &&
        x - ballRadius < paddleX + paddleWidth;
    
    var isBallTouchingPaddle =
        y + ballRadius + dy >= paddleY &&
        y + ballRadius <= paddleY + paddleHeight;

    // rebotar la pelota en los laterales
    //si choca, cambia el sentido
    if (
        x + dx >= canvas.width - ballRadius ||
        x + dx <= ballRadius
    ) {
        dx = -dx;
    }

    // Techo
    if (y + dy <= ballRadius) {
        dy = -dy;
    }

    // Paleta: solamente cuando la pelota está bajando
    if (
        dy > 0 &&
        isBallSameXAsPaddle &&
        isBallTouchingPaddle
    ) {
        dy = -dy;
    } else if (y + dy >= canvas.height - ballRadius) {
        console.log("Game over");
        document.location.reload();
    }

    x += dx;
    y += dy;
}

/* MOVIMIENTO y LIMITE DE LA PALETA */
function paddleMovement(){
    if(
        rightPressed && 
        paddleX < canvas.width - paddleWidth
    ){
        paddleX += PADDLE_SENSITIVITY;
    } else if (
        leftPressed && 
        paddleX > 0
    ) {
        paddleX -= PADDLE_SENSITIVITY;
    }
}


function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* EVENTOS TECLAS */
function initEvents(){
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    function keyDownHandler(event){
        var key = event.key ;
        if (key === 'Right' || key ==='ArrowRight'){
            rightPressed = true;
        } else if (key === 'Left' || key === 'ArrowLeft' ){
            leftPressed = true;
        }
    }
    function keyUpHandler(event){
        var key = event.key ;
        if (key === 'Right' || key ==='ArrowRight'){
            rightPressed = false;
        } else if (key === 'Left' || key === 'ArrowLeft' ){
            leftPressed = false;
        }
    }
}

function draw(){
    cleanCanvas();
    /* LLAMO DIBUJOS */
    drawBall();
    drawPaddle();
    drawBricks();
    //drawScore()

    //colisiones y movimientos
    collisionDetection();
    ballMovement();
    paddleMovement();

    //ejecuta muchas veces la funcion
    //se va formando el "video"
    window.requestAnimationFrame(draw);
}
initEvents();
draw();

