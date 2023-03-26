var isDrawing = false, isDragging = false, isArrow = false, lineArrowName;
var lineShow = document.getElementById('showLine');


var lineHasBeenDrawn = false, arrowHasBeenDrawn = false;


$("#pntBtn").on("click", function (e) { pointBtnClicked(e); });
$("#dragBtn").on("click", function (e) { dragBtnClicked(e); });
$("#arrowBtn").on("click", function (e) { arrowBtnClicked(e); });
$("#saveBtn").on("click", function (e) { saveBtnClicked(e); });



let pntBtn = document.getElementById("pntBtn");
let dragBtn = document.getElementById("dragBtn");
let arrowBtn = document.getElementById("arrowBtn");

function pointBtnClicked(e) {
    isDrawing = true;
    isDragging = false;
    isArrow = false;

    pntBtn.classList.add("active");
    dragBtn.classList.remove("active");
    arrowBtn.classList.remove("active");

    disable_all();
}

function dragBtnClicked(e) {
    isDrawing = false;
    isDragging = true;
    isArrow = false;

    pntBtn.classList.remove("active");
    dragBtn.classList.add("active");
    arrowBtn.classList.remove("active");

    enable_all();
}

function arrowBtnClicked(e) {
    isDrawing = false;
    isDragging = false;
    isArrow = true;

    pntBtn.classList.remove("active");
    dragBtn.classList.remove("active");
    arrowBtn.classList.add("active");
}

function saveBtnClicked(e) {

    lineArrowName = document.getElementById("ArrowLineNameInput").value;
    let data_to_send = [];

    console.log(lines);

    data_to_send.push({
        "name": lineArrowName,
        "data": lines
    });

    console.log("Line array", lines);
    if (lineArrowName == "") {
        alert("Please put a name in Name for Lines field");
    } else if (lines.length != 2) {
        alert("Please draw a line and an arrow");
    }
    else {

        fetch(`${window.origin}/save`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(data_to_send),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })

        }).then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                // handle this somehow
            }
        }).then(json => {
            //response = JSON.parse(json)
            //alert('Status: ' + json["status"])
            document.getElementById("savedLines").innerHTML = "<p>line-crossing-" + json["name"] + "=" + json["coords"] + ";";
        }).catch(error => {
            alert("There was an issue saving the file");
        })
    }
}

function ParseResponse(response) {
    return response.json();
}

function ParseResponse(data) {
    alert(data.result);
}



function disable_all() {
    canvas.getObjects().forEach(function (e) {
        if (String(e.id).includes('Line') || String(e.id).includes('Arrow')) {
            e['selectable'] = false;
            console.log('disabled');
        }
    })
}


function enable_all() {
    canvas.getObjects().forEach(function (e) {
        if (String(e.id).includes('Circle') || String(e.id).includes('Triangle')) {
            e['selectable'] = true;
        }
    })
}

canvas.on('selection:created', (e) => {
    if(e.target.type === 'activeSelection') {
      canvas.discardActiveObject();
    } else {
      //do nothing
    }
  })