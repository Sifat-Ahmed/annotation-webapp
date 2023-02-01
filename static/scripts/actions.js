// code to load and add the image to canvas
var image_height, image_width;
var imgLoader = new Image();
function getImageSize(imgSrc) {
    imgLoader.onload = function () { // assign onload handler
        var height = imgLoader.height;
        var width = imgLoader.width;

        canvas.setHeight(height);
        canvas.setWidth(width);

        var image = new fabric.Image(imgLoader);
        image.set({
            angle: 0,
            padding: 10,
            cornersize: 10,
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
function createLine(options) {
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
            id: 'Line_' + line_number,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 2,
            selectable: false,
            evented: false,
        });
        canvas.add(line);
        point1 = undefined;
        circle1 = makeCircle(line.get('x1'), line.get('y1'), line, 1);
        circle2 = makeCircle(line.get('x2'), line.get('y2'), line, 2);
        canvas.add(circle1);
        canvas.add(circle2);

        //        var group = new fabric.Group([circle1, circle2, line],{
        //            id: 'group_'+line_number,
        //        });
        //        canvas.add(group);

        lines.push({
            "id": line.id,
            "name": line.id.replace('_', ' '),
            "color": line.stroke,
            "coords": {
                x1: line.get('x1'),
                y1: line.get('y1'),
                x2: line.get('x2'),
                y2: line.get('y2'),
            }
        });

        console.log(lines);

        line_number += 1;
    }

}

function makeCircle(left, top, line, circle_id) {
    var c = new fabric.Circle({
        id: 'Circle_' + circle_id + '_' + line.id,
        left: left,
        top: top,
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        strokeWidth: 2,
        radius: 8,
        fill: '#fff',
        stroke: '#666'
    });
    c.hasControls = c.hasBorders = false;

    c.line = line;

    return c;
}

function createButtons() {


}