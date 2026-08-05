"use strict";

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');

canvas.width = 448;
canvas.height = 400;

/* VARIABLES DE LA PELOTA */
var ballRadius = 10;

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


/* DIBUJAR */
function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath(); // esto? 
}

function drawPaddle() {
    ctx.fillStyle = '#09f';
    ctx.fillRect(
        paddleX,
        paddleY,
        paddleWidth,
        paddleHeight
    );
    
}


function drawBricks() {}

/* COMPORTAMIENTOS / MOVIMIENTOS */

function collisionDetection(){}

/* MOVIMIENTO PELOTA */
function ballMovement(){
    // rebotar la pelota en los laterales
    //si choca un lateral, cambia el sentido
    if ( 
        x + dx >= canvas.width - ballRadius || //pared derecha
        x + dx <= ballRadius //pared izquierda
    ) {
        dx = -dx;
    }

    // rebotar en la parte de arriba
    if (y + dy  <= ballRadius){
        dy = -dy;
    }

    //la pelota toca el suelo = se pierde
    if (y + dy >= canvas.height - ballRadius){
            dy = -dy;
        //console.log('Game Over');
        //document.location.reload();
    }

    x += dx;
    y += dy;
}

/* MOVIMIENTO PALETA */
function paddleMovement(){
    if(rightPressed){
        paddleX += 7;
    } else if (leftPressed) {
        paddleX -= 7;
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

