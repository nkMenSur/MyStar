$(function () {
  "use strict";

  var nodes = {};
  var created = false;
  var canvas = document.getElementById("pathFind");
  var context = canvas.getContext("2d");
  var draw = false;
  var win = window;
  var doc = win.document;
  var requestAnimationFrame = win.requestAnimationFrame ||
                              win.mozRequestAnimationFrame ||
                              win.webkitRequestAnimationFrame ||
                              win.msRequestAnimationFrame;
  win.requestAnimationFrame = requestAnimationFrame;
  /*tileSize dependence*/
  var modifyer = 30;

  var mousePos;
  var clickedTile;

  /*preloading images*/
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

  /*added eventListener to enable drawing tiles*/
  function drawTileManually(event) {
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
        if (prob <= 6) 
          return 1; 

      return (prob - 4);
    };
    /*image assignment*/
    function assignImage(kind) {
      if (kind <= 2) { return greenGrass; }
      else if (kind === 3) { return greenRock; }
      else if (kind === 4) { return goldRock; }
      else if (kind === 5) { return blackRock; }
      else if (kind === 6) { return redRock }
    };

    canvas.width = 0;
    canvas.height = 0;

	function createGrid(){
		var d1 = new Date();
      nodes = {};
      draw = false;
      drawTileManually();

    var gridWidth = parseInt($('.gridWidth').val());
    var gridDim = gridWidth * modifyer;

    var NodeObject = function (x, y, type, image) {
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
            var tileKind = randomizeTile();

            nodes[x + "|" + y] = new NodeObject(x, y, tileKind, assignImage(tileKind));
        };
    };
    for (var ptops in nodes) {
        var currentNode = nodes[ptops];
        context.drawImage(currentNode.image, currentNode.x * 30, currentNode.y * 30);
    }

    console.log('___________________________________');
    console.log(new Date() - d1);
		requestAnimationFrame(createGrid);
	};
	
    $('.createGrid').click(function () {    
        var d1 = new Date();
        nodes = {};
        draw = false;
        drawTileManually();

        var gridWidth = parseInt($('.gridWidth').val());
        var gridDim = gridWidth * modifyer;

        var NodeObject = function (x, y, type, image) {
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
            var tileKind = randomizeTile();

            nodes[x + "|" + y] = new NodeObject(x, y, tileKind, assignImage(tileKind));
          };
        };
        for (var ptops in nodes) {
            var currentNode = nodes[ptops];
            context.drawImage(currentNode.image, currentNode.x * 30, currentNode.y * 30);
        }

        console.log('___________________________________');
        console.log(new Date() - d1);
    });


    $('.startGame').click(function () {
        createGrid();
    });
});