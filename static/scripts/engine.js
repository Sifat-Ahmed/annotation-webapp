var canvas = new fabric.Canvas('mainView', {height: 600, width:800});

var line_number = 1;
var lines = {};

getImageSize(mysrc);



canvas.on('mouse:down', function (options) {
    if (isDrawing){
        createLine(options);
    }
    let list = document.getElementById("lineList")
    list.innerHTML = '';
    canvas.getObjects().forEach(function(o) {
      if(String(o.id).includes('Line')) {

          let li = document.createElement("li");
          li.setAttribute('id', String(o.id));
          let btn = document.createElement("button");
          btn.innerHTML = String(o.id).replace('_', ' ');
          btn.onclick = function(){
            console.log(o.x1);
          };
          li.appendChild(btn);
          list.appendChild(li);
      }

  })
});

//
//function objectAddedListener(ev) {
//    let target = ev.target;
//    console.log('left', target.left, 'top', target.top, 'width', target.width, 'height', target.height);
//}
//
//function objectMovedListener(ev) {
//    let target = ev.target;
//    console.log('left', target.left, 'top', target.top, 'width', target.width * target.scaleX, 'height', target.height * target.scaleY);
//}
//
//canvas.on('object:added', objectAddedListener);
//canvas.on('object:modified', objectMovedListener);

canvas.on('object:moving', function(e) {
    var objType = e.target.get('type');
    var p = e.target;
    //p.line && p.line.set({ 'x1': p.left, 'y1': p.top });

    // there are two points on one line. we need to identify first which point has been clicked
    // so try to find the nearest point on line where we have clicked

    distance = Math.sqrt( Math.pow(p.left-p.line.x1, 2) + Math.pow(p.top-p.line.y1, 2))

    //console.log(distance);
    if (distance < 50){
        p.line && p.line.set({ 'x1': p.left, 'y1': p.top });
    }else{
        p.line && p.line.set({ 'x2': p.left, 'y2': p.top });
    }


    line_name = p.line.id.replace('_', ' ');
    lineShow.innerHTML = line_name + ': ' +Math.floor(p.line.x1) + ', ' + Math.floor(p.line.y1) + ', ' + Math.floor(p.line.x2) + ', ' + Math.floor(p.line.y2);

    p.line.set('stroke', 'green');
    p.line.setCoords();
    p.setCoords();


    console.log('Line id', p.line.id);
    canvas.renderAll();
});


canvas.renderAll();




// Callback: https://stackoverflow.com/questions/12344586/how-to-return-multiple-variables-in-javascript-callback-function
// http://jsfiddle.net/ry270sw9/ line create and move