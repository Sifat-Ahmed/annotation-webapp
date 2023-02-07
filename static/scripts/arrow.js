var point1;
function createArrow(options) {
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
            id: 'Arrow_' + arrow_number,
            fill: 'red',
            stroke: 'red',
            strokeWidth: 2,
            selectable: false,
            evented: false,
        });
        canvas.add(line);
        point1 = undefined;
        arrowHead = makeArrow(line.get('x2'), line.get('y2'), line, 1);
        //circle2 = makeArrow(line.get('x2'), line.get('y2'), line, 2);
        canvas.add(arrowHead);
       // canvas.add(circle2);

        //        var group = new fabric.Group([circle1, circle2, line],{
        //            id: 'group_'+line_number,
        //        });
        //        canvas.add(group);

        lines.push({
            "id": line.id,
            "name": line.id.replace('_', ' '),
            "color": line.stroke,
            "coords": {
                x1: Math.floor(line.get('x1')),
                y1: Math.floor(line.get('y1')),
                x2: Math.floor(line.get('x2')),
                y2: Math.floor(line.get('y2')),
            }
        });

        //console.log(lines);

        arrow_number += 1;
    }

}

function makeArrow(left, top, line, arrow_id) {
    // var c = new fabric.Circle({
    //     id: 'Circle_' + circle_id + '_' + line.id,
    //     left: left,
    //     top: top,
    //     originX: 'center',
    //     originY: 'center',
    //     hasControls: false,
    //     hasBorders: false,
    //     strokeWidth: 2,
    //     radius: 8,
    //     fill: '#fff',
    //     stroke: '#666'
    // });
    // c.hasControls = c.hasBorders = false;

    var headLength = 15,

    x1 = Math.floor(line.get('x1')),
    y1 = Math.floor(line.get('y1')),
    x2 = Math.floor(line.get('x2')),
    y2 = Math.floor(line.get('y2')),

    dx = x2 - x1,
    dy = y2 - y1,

    angle = Math.atan2(dy, dx);

    angle *= 180 / Math.PI;
    
    // if (arrow_id == 2){
    //   angle -= 90;
    // }
    // else{
    //   angle += 90;
    // }
    angle += 90;

    var t = new fabric.Triangle({
      id: 'Circle_' + arrow_id + '_' + line.id,
      angle: angle,
      fill: '#fff',
      stroke: '#666',
      top: top,
      left: left,
      height: headLength,
      width: headLength,
      originX: 'center',
      originY: 'center',
      hasControls: false,
      hasBorders: false,
      strokeWidth: 2,
    });



    t.line = line;

    return t;
}
