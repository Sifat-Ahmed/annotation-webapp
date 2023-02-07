var isDrawing = false, isDragging = false, isArrow = false;
var lineShow = document.getElementById('showLine');


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
}

function dragBtnClicked(e) {
    isDrawing = false;
    isDragging = true;
    isArrow = false;

    pntBtn.classList.remove("active");
    dragBtn.classList.add("active");
    arrowBtn.classList.remove("active");
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
    let justImage = "I am trying to imagine a random variable";

    fetch(`${window.origin}/save`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(lines),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
          })

    }).then(response => {
        if(response.status == 200){
            return response.json();
        } else {
            // handle this somehow
        }
    }).then(json => {
        alert('Success! ' + JSON.stringify(json))
    }).catch(error => {
        alert("There was an issue saving the file");
    })
}

function ParseResponse(response){
    return response.json();
}

function ParseResponse(data){
    alert(data.result);
}