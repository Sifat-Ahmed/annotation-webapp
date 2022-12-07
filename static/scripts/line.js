var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;
var count_click = 0;
var is_drawing_point = false;
var is_dragging_line = false;


function reOffset(){
    var BB=canvas.getBoundingClientRect();
    offsetX=BB.left;
    offsetY=BB.top;
}
var offsetX,offsetY;
reOffset();
window.onscroll=function(e){ reOffset(); }
window.onresize=function(e){ reOffset(); }

var single_line = [];
var isDown=false;
var startX,startY;
var nearest = false;
var isDown=false;
var lines=[];
var all_points = [];

$("#canvas").on("click", function(e){handleMouseClick(e);});
$("#pntBtn").on("click", function(e){pointBtnClicked(e);});
$("#dragBtn").on("click", function(e){dragBtnClicked(e);});
$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUpOut(e);});
$("#canvas").mouseout(function(e){handleMouseUpOut(e);});


function pointBtnClicked(e){
    is_drawing_point = true;
    is_dragging_line = false;
    console.log('switching to point drawing');
}

function dragBtnClicked(e){
    is_dragging_line = true;
    is_drawing_point = false;
    console.log('Switching to dragging')
}

draw();

function drawLine(line,color){
    ctx.beginPath();
    ctx.moveTo(line.x0,line.y0);
    ctx.lineTo(line.x1,line.y1);
    ctx.strokeStyle=color;
    ctx.stroke();
}

var drawChart = function(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = "red";
    ctx.stroke();
};

function draw(){
    ctx.clearRect(0,0,cw,ch);
    // draw all lines at their current positions
    for(var i=0;i<lines.length;i++){
        drawLine(lines[i],'black');
    }


//    for (var i=0; i < all_points.length; i++){
//        console.log('lines' + lines[i].x0);
//        drawChart(lines[i].x0, lines[i].y0);
//        drawChart(lines[i].x1, lines[i].y1);
//    }

    // draw markers if a line is being dragged
    if(nearest){
        // point on line nearest to mouse
        ctx.beginPath();
        ctx.arc(nearest.pt.x,nearest.pt.y,5,0,Math.PI*2);
        ctx.strokeStyle='red';
        ctx.stroke();
        // marker for original line before dragging
        drawLine(nearest.originalLine,'red');
        // hightlight the line as its dragged
        drawLine(nearest.line,'red');
    }

}

// select the nearest line to the mouse
function closestLine(mx,my){
    var dist=100000000;
    var index,pt;
    for(var i=0;i<lines.length;i++){
        //
        var xy=closestXY(lines[i],mx,my);
        //
        var dx=mx-xy.x;
        var dy=my-xy.y;
        var thisDist=dx*dx+dy*dy;
        if(thisDist<dist){
            dist=thisDist;
            pt=xy;
            index=i;
        }
    }
    var line=lines[index];
    return({ pt:pt, line:line, originalLine:{x0:line.x0,y0:line.y0,x1:line.x1,y1:line.y1} });
}

// linear interpolation -- needed in setClosestLine()
function lerp(a,b,x){return(a+x*(b-a));}

// find closest XY on line to mouse XY
function closestXY(line,mx,my){
    var x0=line.x0;
    var y0=line.y0;
    var x1=line.x1;
    var y1=line.y1;
    var dx=x1-x0;
    var dy=y1-y0;
    var t=((mx-x0)*dx+(my-y0)*dy)/(dx*dx+dy*dy);
    t=Math.max(0,Math.min(1,t));
    var x=lerp(x0,x1,t);
    var y=lerp(y0,y1,t);
    return({x:x,y:y});
}

function handleMouseClick(e){
    if (is_drawing_point){
        pointDrawing(e);
    }
    if (is_dragging_line){
        selectLine(e);
    }

    draw();
}

function selectLine(e){
    var x = e.pageX - offsetX;
    var y = e.pageY - offsetY;

    nearest=closestLine(x,y);
    draw();
}

function pointDrawing(e){
    var x = e.pageX - offsetX;
    var y = e.pageY - offsetY;
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
        console.log(single_line);
        single_line = [];
    }

}

function handleMouseDown(e){
  if (is_dragging_line){
      // tell the browser we're handling this event
      e.preventDefault();
      e.stopPropagation();
      // mouse position
      startX=parseInt(e.clientX-offsetX);
      startY=parseInt(e.clientY-offsetY);
      // find nearest line to mouse
      nearest=closestLine(startX,startY);

      console.log(nearest);
      console.log(lines);

      draw();
      // set dragging flag
      isDown=true;
  }
}

function handleMouseUpOut(e){
  if (is_dragging_line){
      // tell the browser we're handling this event
      e.preventDefault();
      e.stopPropagation();
      // clear dragging flag
      isDown=false;
      nearest=null;
      draw();
  }
}

function closestPointOnLine(x1, y1, x2, y2){
    return Math.sqrt(
        Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2)
    );
}


function handleMouseMove(e){
    if (is_dragging_line){
        if(!isDown){return;}
        // tell the browser we're handling this event
        e.preventDefault();
        e.stopPropagation();
        // mouse position
        mouseX=parseInt(e.clientX-offsetX);
        mouseY=parseInt(e.clientY-offsetY);
        // calc how far mouse has moved since last mousemove event
        var dx=mouseX-startX;
        var dy=mouseY-startY;
        startX=mouseX;
        startY=mouseY;
        // change nearest line vertices by distance moved
        var line=nearest.line;

        if (closestPointOnLine(nearest.pt.x, nearest.pt.y, nearest.originalLine.x0, nearest.originalLine.y0) < 10.0){
            line.x0+=dx;
            line.y0+=dy;
            console.log('point 0');

        } else if(closestPointOnLine(nearest.pt.x, nearest.pt.y, nearest.originalLine.x1, nearest.originalLine.y1,) < 10.0){
            line.x1+=dx;
            line.y1+=dy;
            console.log('point 1');
        }else {
            line.x0+=dx;
            line.y0+=dy;
            line.x1+=dx;
            line.y1+=dy;
            console.log('point 3');
        }

        // redraw
        draw();

    }
}