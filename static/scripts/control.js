var isDrawing = false, isDragging = false, isDeleting = false;
var lineShow = document.getElementById('showLine');

$("#pntBtn").on("click", function (e) { pointBtnClicked(e); });
$("#dragBtn").on("click", function (e) { dragBtnClicked(e); });
$("#delBtn").on("click", function (e) { deleteBtnClicked(e); });

function pointBtnClicked(e) {
    isDrawing = true;
    isDragging = false;
    isDeleting = false;
}

function dragBtnClicked(e) {
    isDrawing = false;
    isDragging = true;
    isDeleting = false;
}

function deleteBtnClicked(e) {
    isDrawing = false;
    isDragging = false;
    isDeleting = true;

}