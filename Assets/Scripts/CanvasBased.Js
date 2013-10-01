$(function () {
    var nodes = {};

    var canvas = document.getElementById("pathFind");
    var context = canvas.getContext("2d");
    var modifyer = 30;
    canvas.width = 0;
    canvas.height = 0;

    var defaultTile = new Image();
    defaultTile.src = 'Assets/Images/environment/passableTiles/greenGrass30x30.png';


    /*Decision what kind if tile shall be placed*/
    function randomizeTile() {
        var prob = Math.floor((Math.random() * 10) + 1);

        if (prob <= 6) { return 'goldenSand'; };
        if (prob == 6) { return 'greenGrass'; };
        if (prob == 7) { return 'greenRock'; };
        if (prob == 8) { return 'goldRock'; };
        if (prob == 9) { return 'blackRock'; };
        if (prob == 10) { return 'redRock'; };

        return kind;
    };
    /*image assignment*/
    function assignImgSrc(kind) {
        if (kind === 'goldenSand') { return 'Assets/Images/environment/passableTiles/goldenSand30x30.png'; }
        else if (kind === 'greenGrass') { return 'Assets/Images/environment/passableTiles/greenGrass30x30.png'; }
        else if (kind === 'greenRock') { return 'Assets/Images/environment/impassibleTiles/greenRock30x30.png'; }
        else if (kind === 'goldRock') { return 'Assets/Images/environment/impassibleTiles/goldRock30x30.png'; }
        else if (kind === 'blackRock') { return 'Assets/Images/environment/impassibleTiles/blackRock30x30.png'; }
        else if (kind === 'redRock') { return 'Assets/Images/environment/impassibleTiles/redRock30x30.png'; }
    };

    $('.createGrid').click(function () {
        var d1 = new Date();

        nodes = {};
        
        var gridWidth = parseInt($('.gridWidth').val());
        var gridDim = gridWidth * modifyer;

        NodeObject = function (x, y, type, srcURL) {
            this.x = x;
            this.y = y;
            this.paraneNodeX;
            this.parentNodeY;   
            this.type = type;
            this.closed = false;
            this.image = new Image();
            this.image.src = srcURL;
        };

        canvas.width = gridDim;
        canvas.height = gridDim;

        for (var x = 0; x < gridWidth; x++) {
            for (var y = 0; y < gridWidth; y++) {
                tileKind = randomizeTile();

                nodes[x + "|" + y] = new NodeObject(x, y, tileKind, assignImgSrc(tileKind));
            };
        };

        console.log(nodes);
        console.log('___________________________________');
        console.log(new Date() - d1);
    });


    $('.startGame').click(function () {
        var d2 = new Date();
        for (props in nodes) {
            var currentNode = nodes[props];
            context.drawImage(defaultTile, currentNode.x * 30, currentNode.y * 30);
        }
        for (ptops in nodes) {
            var currentNode = nodes[ptops];
            context.drawImage(currentNode.image, currentNode.x * 30, currentNode.y * 30);
        }
        console.log('_________________________________________________________');
        console.log(new Date - d2);
    });
});