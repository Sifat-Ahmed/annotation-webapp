// code to load and add the image to canvas
var image_height, image_width;
var imgLoader = new Image();
function getImageSize(imgSrc) {
    imgLoader.onload = function() { // assign onload handler
        var height = imgLoader.height;
        var width = imgLoader.width;

        canvas.setHeight(height);
        canvas.setWidth(width);

        var image = new fabric.Image(imgLoader);
        image.set({
            angle: 0,
            padding: 10,
            cornersize:10,
            evented: false,
            selectable: false

      });
      //canvas.centerObject(image);
      canvas.add(image);
    }
    imgLoader.src = imgSrc; // set the image source
}

//// code to zoom
//canvas.on('mouse:wheel', function(opt) {
//    var delta = opt.e.deltaY;
//    var zoom = canvas.getZoom();
//    zoom *= 0.999 ** delta;
//    if (zoom > 20) zoom = 20;
//    if (zoom < 0.01) zoom = 0.01;
//    canvas.setZoom(zoom);
//    opt.e.preventDefault();
//    opt.e.stopPropagation();
//})


///// Code to create a point and lines
var point1;
function createLine(options){
    var x = options.e.clientX - canvas._offset.left;
    var y = options.e.clientY - canvas._offset.top;

//    var circle = new fabric.Circle({
//        left: x,
//        top: y,
//        fill: 'red',
//        originX: 'center',
//        originY: 'center',
//        hasControls: false,
//        hasBorders: false,
//        lockMovementX: false,
//        lockMovementY: false,
//        radius: 10,
//        hoverCursor: 'default'
//    });
//
//    canvas.add(circle);

    if (point1 === undefined) {
        point1 = new fabric.Point(x, y)
    } else {

        var line = new fabric.Line([point1.x, point1.y, x, y], {
            id: 'Line_'+line_number,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 2,
            selectable: false,
            evented: false,
        });
        canvas.add(line);
        point1 = undefined;
        circle1 = makeCircle(line.get('x1'), line.get('y1'), line);
        circle2 = makeCircle(line.get('x2'), line.get('y2'), line);
        canvas.add(circle1);
        canvas.add(circle2);

        line_number += 1;
    }

}

function makeCircle(left, top, line) {
    var c = new fabric.Circle({
        left: left,
        top: top,
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        strokeWidth: 2,
        radius: 4,
        fill: '#fff',
        stroke: '#666'
    });
    c.hasControls = c.hasBorders = false;

    c.line = line;

    return c;
  }