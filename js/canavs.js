var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var myLineChart = new Chart(ctx).Line(data, options);

