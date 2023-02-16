var canvas = new fabric.Canvas('mainView', { height: 600, width: 800 });

var line_number = 1;
var arrow_number = 1;
var lines = [];

getImageSize(mysrc);

canvas.on('mouse:down', function (options) {
    if (isDrawing) {
        if (lineHasBeenDrawn == false){
            createLine(options);
        }else{
            alert("You can draw 1 line only");
        }
    }
    if (isArrow){
        if (arrowHasBeenDrawn == false){
            createArrow(options);
        }else{
            alert("You can draw 1 arrow only");
        }
    }
    
    let list = document.getElementById("lineList")
    list.innerHTML = '';
    let propList = document.getElementById("propList")
    propList.innerHTML = '';
    canvas.getObjects().forEach(function (o) {
        if ((String(o.id).includes('Line') || String(o.id).includes('Arrow')) && !String(o.id).includes('Circle')) {
            let root = document.createElement("div");
            root.setAttribute('class', 'row');
            root.setAttribute('id', String(o.id));

            let div1 = document.createElement("div");
            div1.setAttribute('class', 'd-grid col-8 mx-auto');

            let btn1 = document.createElement("button");
            btn1.setAttribute('class', 'btn btn-secondary');
            btn1.setAttribute('id', 'btn_' + o.id);
            btn1.innerHTML = String(o.id).replace('_', ' ');
            btn1.onclick = function () {
                properties(propList, String(o.id).replace('_', ' '));
                let selected_line;
                canvas.getObjects().forEach(function (e) {
                    if (String(e.id) == ('Circle_1_' + o.id)) {
                        e.line.set("stroke", "yellow");
                        e.line.set("strokeWidth", 5);
                        line_name = e.line.id.replace('_', ' ');
                
                        document.getElementById("lineName").innerHTML = line_name;
                        lineShow.value = Math.floor(e.line.x1) + '; ' + Math.floor(e.line.y1) + '; ' + Math.floor(e.line.x2) + '; ' + Math.floor(e.line.y2);

                        canvas.renderAll();
                        selected_line = e.line.id;
                        console.log(e.line.stroke);
                    }
                    else {
                        if (e.line != null && e.line.id != selected_line) {
                            for (let i = 0; i < lines.length; i++){
                                if (e.line.id == lines[i].id){
                                    e.line.set("stroke", lines[i].color);
                                    e.line.set("strokeWidth", 2);
                                    console.log("After coloring", e.line.stroke, e.line.id);
                                    canvas.renderAll();
                                }
                            }
                        }
                    }
                });
            };
            btn1.onmouseover = function(){
                let lineData;
                for (let i = 0; i < lines.length; i++) {
                    if (o.id == lines[i].id) {
                        lineData = lines[i];
                        break;  
                    }
                }
                
                document.getElementById("lineDetails").innerHTML = JSON.stringify(lineData, undefined, 4);

            }

            let div2 = document.createElement("div");
            div2.setAttribute('class', 'd-grid col-2 mx-auto');

            let icon = document.createElement("span");
            icon.setAttribute('class', 'delete');

            let btn2 = document.createElement("button");
            btn2.setAttribute('class', 'btn btn-outline-danger');
            btn2.appendChild(icon);
            btn2.onclick = function (btnEvent) {
                canvas.getObjects().forEach(function (e) {
                    if (String(e.id) == ('Circle_1_' + o.id)) {
                        canvas.remove(e);
                    }
                    if (String(e.id) == ('Circle_2_' + o.id)) {
                        canvas.remove(e);
                    }
                    document.getElementById(String(o.id)).style.display = "none";
                });
                if (String(o.id).includes('Line')){
                    lineHasBeenDrawn = false;
                }else if (String(o.id).includes('Arrow'))
                {
                    arrowHasBeenDrawn = false;
                }
                canvas.remove(o);
                console.log(o);
                canvas.renderAll();
            };

            div1.appendChild(btn1);
            div2.appendChild(btn2);
            root.appendChild(div1);
            root.appendChild(div2);
            list.appendChild(root);
        }

    })
    
});


function properties(propList, line_id) {
    propList.innerHTML = "";
    
    let linePropHolderDiv = document.createElement("div");

    let root1 = document.createElement("div");
    root1.setAttribute("class", "row");
    //root.setAttribute('id', String(o.id));

    let div3 = document.createElement("div");
    div3.setAttribute('class', 'd-grid col-8 mx-auto');

    let div4 = document.createElement("div");
    div4.setAttribute('class', 'd-grid col-4 mx-auto');


    let input1 = document.createElement("input");
    input1.setAttribute("type", "color");
    input1.setAttribute("id", "colorPicker");
    input1.setAttribute("class", "form-control form-control-color");
    input1.value = "#ff0000";

    input1.addEventListener("input", watchColorPicker, false);

    function watchColorPicker(event) {
        canvas.getObjects().forEach(function (e) {
            if (String(e.id) == (String(line_id).replace(' ', '_'))) {
                e.set("stroke", event.target.value);
                for (let i = 0; i < lines.length; i++) {
                    if (e.id == lines[i].id) {
                        lines[i]["color"] = event.target.value;   
                    }
                    canvas.renderAll();
                }
            }
        });
    }

    let label = document.createElement("label");
    label.setAttribute("class", "d-flex align-items-center");
    label.setAttribute("for", "colorPicker");
    label.innerHTML = "Choose color for: " + line_id;

    div3.appendChild(label);
    div4.appendChild(input1);
    root1.appendChild(div3);
    root1.appendChild(div4);

    linePropHolderDiv.appendChild(root1);


    let lineNameAreaDiv = document.createElement("div");
    lineNameAreaDiv.setAttribute("class", "row");
    lineNameAreaDiv.setAttribute("id", "lineNameAreaDiv");

    let lineNameHolderDiv = document.createElement("div");
    lineNameHolderDiv.setAttribute("class", "input-group mb-3 input-group-default");

    let lineNameSpan = document.createElement("span");
    lineNameSpan.setAttribute("class", "input-group-text");
    lineNameSpan.setAttribute("id", "showLineNameOnProp");
    lineNameSpan.innerHTML = "Name for "+ line_id;

    let lineNameInput = document.createElement("input");
    lineNameInput.setAttribute("id", "lineNameInput");
    lineNameInput.setAttribute("class", "form-control");
    lineNameInput.setAttribute("type", "text");
    lineNameInput.setAttribute("aria-describedby", "basic-addon3");

    let selectedLine;

    for (let i = 0; i < lines.length; i++) {
        if (line_id.replace(' ', '_') == lines[i].id) {
            lineNameInput.value = lines[i].name;
            selectedLine = i;
            break;  
        }
        canvas.renderAll();
    }


    let renameBtn = document.createElement("button");
    renameBtn.setAttribute('class', 'btn btn-success');
    renameBtn.innerHTML = "Rename";

    renameBtn.onclick = function(event){

        if (lineNameInput.value == ""){
            alert("Please write a name");
        }else{
            let tempName = lines[selectedLine].name;
            lines[selectedLine].name = lineNameInput.value;
            document.getElementById('btn_' + lines[selectedLine].id).innerHTML = lineNameInput.value;
            document.getElementById("lineName").innerHTML = lineNameInput.value;
            alert(tempName + " has been renamed to " + lineNameInput.value);
            
        }

        
    };

    

    lineNameHolderDiv.appendChild(lineNameSpan);
    lineNameHolderDiv.appendChild(lineNameInput);

    lineNameAreaDiv.appendChild(lineNameHolderDiv);
    linePropHolderDiv.appendChild(lineNameAreaDiv);
    linePropHolderDiv.appendChild(renameBtn);

    propList.appendChild(linePropHolderDiv);
}



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

canvas.on('object:moving', function (e) {
    if (isDragging){
        var objType = e.target.get('type');
        var p = e.target;
        let clicked_line;
        //p.line && p.line.set({ 'x1': p.left, 'y1': p.top });

        // there are two points on one line. we need to identify first which point has been clicked
        // so try to find the nearest point on line where we have clicked

        distance = Math.sqrt(Math.pow(p.left - p.line.x1, 2) + Math.pow(p.top - p.line.y1, 2))

        //console.log(distance);
        if (distance < 50) {
            p.line && p.line.set({ 'x1': p.left, 'y1': p.top });
            canvas.getObjects().forEach(function (o) {
                if (o.line && String(o.id).includes("Triangle")){
                    var x1 = Math.floor(o.line.get('x1')),
                    y1 = Math.floor(o.line.get('y1')),
                    x2 = Math.floor(o.line.get('x2')),
                    y2 = Math.floor(o.line.get('y2')),

                    dx = x2 - x1,
                    dy = y2 - y1,

                    angle = Math.atan2(dy, dx);
                    angle *= 180 / Math.PI;
                    angle += 90;

                    o.angle = angle;
                    canvas.renderAll();
                }
            });
        } else {
            p.line && p.line.set({ 'x2': p.left, 'y2': p.top });
            //console.log(p.angle);

            if (String(p.id).includes("Arrow")){
                // recalculate the angles again
                var x1 = Math.floor(p.line.get('x1')),
                y1 = Math.floor(p.line.get('y1')),
                x2 = Math.floor(p.line.get('x2')),
                y2 = Math.floor(p.line.get('y2')),

                dx = x2 - x1,
                dy = y2 - y1,

                angle = Math.atan2(dy, dx);
                angle *= 180 / Math.PI;
                angle += 90;

                p.angle = angle;
                canvas.renderAll();
                
            }

        }
        console.log("Dragging", p.id);


        line_name = p.line.id.replace('_', ' ');
        document.getElementById("lineName").innerHTML = line_name;
        lineShow.value = Math.floor(p.line.x1) + '; ' + Math.floor(p.line.y1) + '; ' + Math.floor(p.line.x2) + '; ' + Math.floor(p.line.y2);

        p.line.set('stroke', 'yellow');
        p.line.set("strokeWidth", 5);

        clicked_line = p.line;
        canvas.getObjects().forEach(function (o) {
            if (o.line != null && o.line.id != clicked_line.id) {
                for (let i = 0; i < lines.length; i++){
                    if (o.line.id == lines[i].id){
                        o.line.set("stroke", lines[i].color);
                        o.line.set("strokeWidth", 2);
                        // console.log("object selected", o);
                        canvas.renderAll();
                    }
                }
            }
            for (let i = 0; i < lines.length; i++) {
                if (clicked_line.id == lines[i].id) {
                    lines[i]["coords"] = {
                        x1: Math.floor(clicked_line.get('x1')),
                        y1: Math.floor(clicked_line.get('y1')),
                        x2: Math.floor(clicked_line.get('x2')),
                        y2: Math.floor(clicked_line.get('y2')),
                    };
                    lines[i]["original_coords"] = {
                        x1: Math.ceil(clicked_line.get('x1') * scale), 
                        y1: Math.ceil(clicked_line.get('y1') * scale),
                        x2: Math.ceil(clicked_line.get('x2') * scale),
                        y2: Math.ceil(clicked_line.get('y2') * scale),
                    }
                }
            }
        });

        p.line.setCoords();
        p.setCoords();


        //console.log('Line id', p.line.id);
        canvas.renderAll();
    }
});


canvas.renderAll();




// Callback: https://stackoverflow.com/questions/12344586/how-to-return-multiple-variables-in-javascript-callback-function
// http://jsfiddle.net/ry270sw9/ line create and move
// https://stackoverflow.com/questions/35203019/how-can-i-send-an-ajax-request-on-button-click-from-a-form-with-2-buttons