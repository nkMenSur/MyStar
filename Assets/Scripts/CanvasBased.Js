$(function () {
    var nodes = {};
    var created = false;
    var canvas = document.getElementById("pathFind");
    var context = canvas.getContext("2d");
    var draw = false;
    var modifyer = 30;
    var mousePos;
    var clickedTile;

    canvas.width = 0;
    canvas.height = 0;

    var goldenSand = new Image();
    goldenSand.src = 'Assets/Images/environment/passableTiles/goldenSand30x30.png';

    var greenGrass = new Image();
    greenGrass.src = 'Assets/Images/environment/passableTiles/greenGrass30x30.png';

    var greenRock = new Image();
    greenRock.src = 'Assets/Images/environment/impassibleTiles/greenRock30x30.png';

    var goldRock = new Image();
    goldRock.src = 'Assets/Images/environment/impassibleTiles/goldRock30x30.png';

    var blackRock = new Image();
    blackRock.src = 'Assets/Images/environment/impassibleTiles/blackRock30x30.png';

    var redRock = new Image();
    redRock.src = 'Assets/Images/environment/impassibleTiles/redRock30x30.png';

    function drawTileWhenCreated(event) {
        if (draw) {
            canvas.addEventListener('mousedown', function (event) {

                var mousePos = getMousePos(canvas, event);
                var clickedTile = nodes[Math.floor(mousePos.x / 30) + "|" + Math.floor(mousePos.y / 30)];

                clickedTile.x = nodes[Math.floor(mousePos.x / 30) + "|" + Math.floor(mousePos.y / 30)].x * 30;
                clickedTile.y = nodes[Math.floor(mousePos.x / 30) + "|" + Math.floor(mousePos.y / 30)].y * 30;

                clickedTile.image = goldenSand;

                context.drawImage(goldenSand, clickedTile.x, clickedTile.y);

            }, function () {
                mousePos = null;
                clickedTile = null;
            });
        } else {
            canvas.removeEventListener('mousedown', drawTileWhenCreated);

        }
        
    }
    /*return relative mouse position*/
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect(), root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
            x: mouseX,
            y: mouseY
        };
    }
    /*Decision what kind if tile shall be placed*/
    function randomizeTile() {
        var prob = Math.floor((Math.random() * 10) + 1);

        if (prob <= 6) { return 1; };
        if (prob == 6) { return 2; };
        if (prob == 7) { return 3; };
        if (prob == 8) { return 4; };
        if (prob == 9) { return 5; };
        if (prob == 10) { return 6; };

        return kind;
    };
    /*image assignment*/
    function assignImage(kind) {
        if (kind <= 2) { return greenGrass; }
        else if (kind === 3) { return greenRock; }
        else if (kind === 4) { return goldRock; }
        else if (kind === 5) { return blackRock; }
        else if (kind === 6) { return redRock }
    };

    $('.createGrid').click(function () {
        var d1 = new Date();
        nodes = {};
        draw = false;
        canvas.removeEventListener('mousedown');
        var gridWidth = parseInt($('.gridWidth').val());
        var gridDim = gridWidth * modifyer;

        NodeObject = function (x, y, type, image) {
            this.x = x;
            this.y = y;
            this.paraneNodeX;
            this.parentNodeY;   
            this.type = type;
            this.closed = false;
            this.image = image;
        };

        canvas.width = gridDim;
        canvas.height = gridDim;

        for (var x = 0; x < gridWidth; x++) {
            for (var y = 0; y < gridWidth; y++) {
                tileKind = randomizeTile();

                nodes[x + "|" + y] = new NodeObject(x, y, tileKind, assignImage(tileKind));
            };
        };
        created = true;
        console.log(nodes);
        console.log('___________________________________');
        console.log(new Date() - d1);
    });


    $('.startGame').click(function () {
        draw = true;

        if (created) {
            var d2 = new Date();

            for (ptops in nodes) {
                var currentNode = nodes[ptops];
                context.drawImage(currentNode.image, currentNode.x * 30, currentNode.y * 30);
            }
            
            console.log('_________________________________________________________');
            console.log(new Date - d2);
        }
        drawTileWhenCreated();
        
    });
    /*finding and editing tiles based on clickEvent*/
    
});