
var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    canvas: document.getElementById('myCustomCanvas'),
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        //render: render,
    }
};

var game = new Phaser.Game(config);
var image;
var scale;
var lines = [];
var points =[];


function preload ()
{
    image = document.getElementById('baseImg');
    scale = document.getElementById('customRange1');
    this.textures.addImage('frame', document.getElementById('baseImg'));
}

function create ()
{
    img = this.add.image(400, 300, 'frame');
    //image.scaleY = 800/image.width;
    //image.scaleX = 600/image.height;
    //console.log(800/image.width, 600/image.height);
    //image.height = 600;
    //image.width = 600;
    this.input.on('pointerdown', function (pointer) {
        console.log('down ', pointer.x, pointer.y);
        var circle = new Phaser.Geom.Circle(pointer.x, pointer.y, 5);
        var graphics = this.add.graphics({ fillStyle: { color: 0xff0000 } });
        graphics.fillCircleShape(circle);
        points.push({x:pointer.x, y:pointer.y});

        if (points.length == 2){
            lines.push({x1:points[0].x,y1: points[0].y, x2: points[1].x, y2: points[1].y});
            points = [];
        }
        console.log(lines);

    }, this);

}

function update()
{
    // scaling the image if needed
    // Coordinates will also get scaled according to the scale value
    // How? No idea.
    img.setScale(scale.value);
    if (lines.length > 0){
        //console.log('Length is ', points.length);
        for (var i = 0; i < lines.length; i+=1){
                var line = new Phaser.Geom.Line(lines[i].x1, lines[i].y1, lines[i].x2, lines[i].y2);
                var graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
                graphics.strokeLineShape(line);
        }
    }


}