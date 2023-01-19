var width = window.innerWidth;
var height = window.innerHeight;

//var img = document.getElementById('baseImg');
//console.log(img.src);

var stage = new Konva.Stage({
    container: 'container',
    width: 800,
    height: 600,
});

var backGround = new Konva.Layer();
var foreGround = new Konva.Layer();
stage.add(backGround);
stage.add(foreGround);
// main API:
var yoda;
var imageObj = new Image();

var group = new Konva.Group();

imageObj.onload = function() {
    yoda = new Konva.Image({
    x: 0,
    y: 0,
    image: imageObj,
    width: 800,
    height: 600,
});

// add the shape to the layer
backGround.add(yoda);
};

imageObj.src = mysrc;

var prev = 0;
var points = [0,0,50,50, 150,100,100,200, 300,300,400,400];


var redLine = new Konva.Line({
    points: points,
    stroke: 'red',
    strokeWidth: 5,
    lineCap: 'round',
    lineJoin: 'round',
    draggable: true
  });


foreGround.add(redLine);

console.log(points);



//yoda.moveDown();
backGround.zIndex(0);