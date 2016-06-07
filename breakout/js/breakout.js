//Cheet to open debug menu
cheet('d e b u g', function()
{
    alert("DEBUG MODE ENABLED");
    document.getElementById("debug").style.display = 'inline-block';
});

cheet('g o d', function ()
{
    alert("\"GOD\" MODE ENABLED");
    godMode = true;
});

var canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var paddleSpeed = 7;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 15;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;
var bricks = [];
var godMode = false;

for (c = 0; c < brickColumnCount; c++)
{
    bricks[c] = [];
    for ( r = 0; r < brickRowCount; r++)
    {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e)
{
    if(e.keyCode == 39)
    {
        rightPressed = true;
    }
    else if(e.keyCode == 37)
    {
        leftPressed = true;
    }
}

function keyUpHandler(e)
{
    if(e.keyCode == 39)
    {
        rightPressed = false;
    }
    else if(e.keyCode == 37)
    {
        leftPressed = false;
    }
}

function mouseMoveHandler(e)
{
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width)
    {
        paddleX = relativeX - paddleWidth/2;
    }
}

function collisionDetection()
{
    for(c = 0; c < brickColumnCount; c++)
    {
        for(r = 0; r < brickRowCount; r++)
        {
            var b = bricks[c][r];
            if(b.status == 1)
            {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight)
                {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount * brickColumnCount)
                    {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks()
{
    for(c = 0; c < brickColumnCount; c++)
    {
        for(r = 0; r < brickRowCount; r++)
        {
            if(bricks[c][r].status == 1)
            {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore()
{
    document.getElementById("score").innerHTML = "Score: " + score;
}

function drawLives()
{
    if (godMode == true)
    {
        document.getElementById("lives").innerHTML = "Lives: GOD";
    }
    else
    {
        document.getElementById("lives").innerHTML = "Lives: " + lives;
    }
}

function drawDebug()
{
    document.getElementById("x").innerHTML = "x: " + x;
    document.getElementById("y").innerHTML = "y: " + y;
    document.getElementById("dx").innerHTML = "dx: " + dx;
    document.getElementById("dy").innerHTML = "dy: " + dy;
    document.getElementById("paddleSpeed").innerHTML = "Paddle Speed = " + paddleSpeed;
    document.getElementById("rightPressed").innerHTML = "Right Pressed = " + rightPressed;
    document.getElementById("leftPressed").innerHTML = "Left Pressed = " + leftPressed;
    document.getElementById("ballRadius").innerHTML = "Ball Radius = " + ballRadius;
    document.getElementById("brickRowCount").innerHTML = "Brick Row Count = " + brickRowCount;
    document.getElementById("brickColumnCount").innerHTML = "Brick Column Count = " + brickColumnCount;
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    drawDebug();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius)
    {
        dx = -dx;
    }

    if(y + dy < ballRadius)
    {
        dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius)
    {
        if(x > paddleX && x < paddleX + paddleWidth)
        {
            dy = -dy;
        }
        else
        {
            lives--;
            if (lives == 0)
            {
                if (godMode == true)
                {

                }
                else
                {
                    alert("GAME OVER");
                    document.location.reload();
                }
            }
            else
            {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth) / 2;
            }
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth)
    {
        paddleX += paddleSpeed;
    }
    else if(leftPressed && paddleX > 0)
    {
        paddleX -= paddleSpeed;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
draw();
