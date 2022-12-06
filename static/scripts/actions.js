var lineTo = [];
var all_lines = [];
count_click = 0;

$(document).ready(function() {
  var canvas = $("#board").get(0);
  if (!canvas.getContext) {
    return;
  }
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 1;

  var drawChart = function(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.strokeStyle = "red";
    ctx.stroke();
  };

  $("#canvas").on("click", function(e) {
    var offset = $(this).offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;
    count_click = count_click + 1

    drawChart(x, y);

    if (lineTo.length > 0) {
          var last = lineTo[lineTo.length - 1];
          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.lineTo(x, y);
          ctx.strokeStyle = "blue";
          ctx.stroke();
          clicked = false
    }

    lineTo.push({ x: x, y: y });
  });
});