var canvas = new fabric.Canvas('mainView', {height: 600, width:800});

getImageSize(mysrc);

canvas.on('mouse:down', function (options) {
    if (isDrawing){
        createLine(options);
    }

    var p = options.target;
    console.log(p);
});


canvas.renderAll();




// Callback: https://stackoverflow.com/questions/12344586/how-to-return-multiple-variables-in-javascript-callback-function
// http://jsfiddle.net/ry270sw9/ line create and move