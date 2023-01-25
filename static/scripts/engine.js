var data;
var image_height, image_width;
var imgLoader = new Image();
var canvas = new fabric.Canvas('mainView', {height: 600, width:800});

function getImageSize(imgSrc) {
    imgLoader.onload = function() { // assign onload handler
        var height = imgLoader.height;
        var width = imgLoader.width;

        //canvas.setHeight(height);
        //canvas.setWidth(width);

        var image = new fabric.Image(imgLoader);
        image.set({
            angle: 0,
            padding: 10,
            cornersize:10,

      });
      //canvas.centerObject(image);
      canvas.add(image);

    }

    imgLoader.src = imgSrc; // set the image source
}

getImageSize(mysrc);

canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
})

var point1;
canvas.on('mouse:down', function (options) {

    var x = options.e.clientX - canvas._offset.left;
    var y = options.e.clientY - canvas._offset.top;

    var circle = new fabric.Circle({
        left: x,
        top: y,
        fill: 'red',
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        radius: 5,
        hoverCursor: 'default'
    });

    canvas.add(circle);

    if (point1 === undefined) {
        point1 = new fabric.Point(x, y)
    } else {
        canvas.add(new fabric.Line([point1.x, point1.y, x, y], {
            stroke: 'blue',
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true,
            hoverCursor: 'default'
        }))
        point1 = undefined;
    }
});


canvas.renderAll();




// Callback: https://stackoverflow.com/questions/12344586/how-to-return-multiple-variables-in-javascript-callback-function
// http://jsfiddle.net/ry270sw9/ line create and move