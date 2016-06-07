var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = .3;
ctx.strokeStyle = "#ecf0f1";

var mousePosition =
{
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
};

var dots =
{
    nb: 250,
    distance: 100,
    d_radius: 150,
    array: []
};

function Dot()
{
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random() * 2;

    console.log(this);
}

Dot.prototype =
{
    draw: function(){
        ctx.beginPath();
        ctx.fillStyle = "#ecf0f1";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
};

function createDots()
{
    for(i = 0; i < dots.nb; i++)
    {
        dots.array.push(new Dot());
    }
}

function moveDots()
{
    for(i = 0; i < dots.nb; i++)
    {

        var dot = dots.array[i];

        if(dot.y < 0 || dot.y > canvas.height)
        {
            dot.vx = dot.vx;
            dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > canvas.width)
        {
            dot.vx = - dot.vx;
            dot.vy = dot.vy;
        }

        dot.x += dot.vx;
        dot.y += dot.vy;
    }
}

function drawDots()
{
    for(i = 0; i < dots.nb; i++)
    {
        var dot = dots.array[i];
        dot.draw();
    }
}

function animateDots()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveDots();
    //connectDots();
    drawDots();

    requestAnimationFrame(animateDots);
}

$('canvas').on('mousemove', function(e){
    mousePosition.x = e.pageX;
    mousePosition.y = e.pageY;
});

$('canvas').on('mouseleave', function(e){
    mousePosition.x = canvas.width / 2;
    mousePosition.y = canvas.height / 2;
});

createDots();
requestAnimationFrame(animateDots);
