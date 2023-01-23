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
var points = [0,0,50,50, 150,100,100,200, 300,300,400,400];







console.log(points);

stage.on('click', function (e) {
        // e.target is a clicked Konva.Shape or current stage if you clicked on empty space
        console.log('clicked on', e.target);
//        console.log('usual click on ' + stage.getPointerPosition().x);
//
        var x = stage.getPointerPosition().x;
        var y = stage.getPointerPosition().y;
        single_line.push({xc: x, yc: y})




        all_points.push({xc:x, yc: y});

        if (single_line.length == 2)
        {
            lines.push({
                x0: single_line[0].xc,
                y0: single_line[0].yc,
                x1: single_line[1].xc,
                y1: single_line[1].yc
            })
            //console.log(single_line);
            single_line = [];
        }

        for (var i = 0; i <lines.length; i++)
        {
            var redLine = new Konva.Line({
            points: [lines[i].x0, lines[i].y0, lines[i].x1, lines[i].y1],
            stroke: 'red',
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round',
            draggable: true
          });
          foreGround.add(redLine);
        }

});

//yoda.moveDown();
backGround.zIndex(0);