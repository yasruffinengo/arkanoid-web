"use strict";

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');

canvas.width = 448;
canvas.height = 400;

/* variables */
//var counter = 0

/* variables de la pelota*/
var ballRadius = 10;

var x = canvas.width / 2; //asi se mueve en diagonal
var y = canvas.height - 30;

// velocidad de la pelota = 
//indica cuanto se mueve en cada frame
var dx = 2; // a mayor numero va mas rapido
var dy = -2; // misma velocidad, para arriba



function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath(); // esto? 
}

function drawPaddle() {}
function drawBricks() {}

function collisionDetection(){}
function ballMovement(){
    // rebotar la pelota en los laterales
    //si choca un lateral, cambia el sentido
    if ( 
        x + dx >= canvas.width - ballRadius || //pared derecha
        x + dx <= ballRadius //pared izquierda
    ) {
        dx = -dx
    }

    // rebotar en la parte de arriba
    if (y + dy  <= ballRadius){
        dy = -dy;
    }

    //la pelota toca el suelo = se pierde
    if (y + dy >= canvas.height - ballRadius){
        console.log('Game Over')
        document.location.reload()
    }

    x += dx;
    y += dy;
}

function paddleMovement(){}
function cleanCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function draw(){
    cleanCanvas();
    // dibujo elementos
    drawBall();
    drawPaddle();
    drawBricks();
    //drawScore()

    //colisiones y movimientos
    collisionDetection();
    ballMovement();
    paddleMovement();

    //aca hago dibujos y checks de colisiones
    window.requestAnimationFrame(draw);
}
draw();

