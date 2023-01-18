var width = window.innerWidth;
var height = window.innerHeight;

//var img = document.getElementById('baseImg');
//console.log(img.src);

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

// main API:
var imageObj = new Image();
imageObj.onload = function () {
var yoda = new Konva.Image({
  x: 50,
  y: 50,
  image: imageObj,
  width: 106,
  height: 118,
});

// add the shape to the layer
layer.add(yoda);
};

imageObj.src = mysrc;