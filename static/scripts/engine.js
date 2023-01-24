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

var lines=[], single_line=[];
var all_points = [];



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
var points = [];

function writeMessage(message) {
    text.text('Message ' + message);
}
var text = new Konva.Text({
    x: 10,
    y: 10,
    fontFamily: 'Calibri',
    fontSize: 24,
    text: '',
    fill: 'red',
});



// dragging a circle

//for (var i = 0; i < points.length; i++){
//    console.log(i);
//
//    points[i].on('dragmove', function(){
//        writeMessage('2. Point '+ i + ' dragging!');
//        console.log('2. Point '+ i + ' dragging!');
//    });
//
//}

stage.on('click', function (e) {

    var x = stage.getPointerPosition().x;
    var y = stage.getPointerPosition().y;

    var circle = new Konva.Circle({
        x: x,
        y: y,
        radius: 4,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 1,
        draggable: true
    });
    points.push(circle);
    foreGround.add(circle);

    for (var i = 0; i < points.length; i+=2){
    //console.log('Point ' + [i] + ' ' + points[i].x() + ' ' + points[i].y());

    if (i+1 < points.length) {
        var line = new Konva.Line({
            points: [points[i].x(), points[i].y(), points[i+1].x(), points[i+1].y()],
            stroke: 'green',
            strokeWidth: 2,
            lineJoin: 'round',

        });
        foreGround.add(line);
        lines.push(line);
        }
    }

//    circle.on('dragmove', function(){
//        writeMessage('Point '+ i + ' dragging!');
//        console.log('Point '+ i + ' dragging!');
//    });



});


for (var j = 0; j < points.length; j++){

    points[j].on('dragmove', function(){
        console.log('2. Point '+ j + ' ' + points[1].x());
        writeMessage('2. Point '+ j + ' dragging!');
        //console.log('Lines', lines.length);

    });

}

var tr = new Konva.Transformer();

foreGround.add(text);
foreGround.add(tr);
tr.nodes(points);

//yoda.moveDown();
backGround.zIndex(0);