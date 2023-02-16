var point1;
function createArrow(options) {
    var x = options.e.clientX - canvas._offset.left;
    var y = options.e.clientY - canvas._offset.top;

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
        arrowTail = makeCircle(line.get('x1'), line.get('y1'), line, 2);
        
        canvas.add(arrowHead);
        canvas.add(arrowTail);
     
        lines.push({
            "id": line.id,
            "name": line.id.replace('_', ' '),
            "color": line.stroke,
            "coords": {
                x1: Math.floor(line.get('x1')),
                y1: Math.floor(line.get('y1')),
                x2: Math.floor(line.get('x2')),
                y2: Math.floor(line.get('y2')),
            },
            "original_coords": {
                x1: Math.ceil(line.get('x1') * scale), 
                y1: Math.ceil(line.get('y1') * scale),
                x2: Math.ceil(line.get('x2') * scale),
                y2: Math.ceil(line.get('y2') * scale),
            }
        });
        arrow_number += 1;
        arrowHasBeenDrawn = true;
    }

}

function makeArrow(left, top, line, arrow_id) {
    var headLength = 15,

    x1 = Math.floor(line.get('x1')),
    y1 = Math.floor(line.get('y1')),
    x2 = Math.floor(line.get('x2')),
    y2 = Math.floor(line.get('y2')),

    dx = x2 - x1,
    dy = y2 - y1,

    angle = Math.atan2(dy, dx);

    angle *= 180 / Math.PI;
    angle += 90;

    var t = new fabric.Triangle({
      id: 'Circle_Triangle_' + arrow_id + '_' + line.id,
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
