var data;
var image_height, image_width;
var imgLoader = new Image();
var canvas = new fabric.Canvas('mainView', {height: 600, width:800});

//function getImageWidth(imgSrc, callback) {
//    imgLoader.onload = function() { // assign onload handler
//        callback(this.width);
//    }
//    imgLoader.src = imgSrc; // set the image source
//}
//function getImageHeight(imgSrc, callback) {
//    imgLoader.onload = function() { // assign onload handler
//        callback(this.height);
//    }
//    imgLoader.src = imgSrc; // set the image source
//}
////canvas.onload = function(){
////var canvas = new fabric.Canvas('mainView');
//getImageWidth(mysrc, function(width){
//    image_width = width;
//});
//
//getImageHeight(mysrc, function(height){
//    image_height = height;
//});
//
function getImageSize(imgSrc) {
    imgLoader.onload = function() { // assign onload handler
        var height = imgLoader.height;
        var width = imgLoader.width;

        canvas.setHeight(height);
        canvas.setWidth(width);

        var image = new fabric.Image(imgLoader);
        image.set({
            angle: 0,
            padding: 10,
            cornersize:10,

      });
      //canvas.centerObject(image);
      canvas.add(image);

    }

    imgLoader.src = imgSrc; // set the image source
}

getImageSize(mysrc);

canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.setZoom(zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
})

canvas.renderAll();




// Callback: https://stackoverflow.com/questions/12344586/how-to-return-multiple-variables-in-javascript-callback-function