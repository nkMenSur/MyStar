'use strict'
function randomizeTile() {
  var prob = Math.floor((Math.random() * 10) + 1);
  if (prob <= 6) 
    return 1; 

  return (prob - 4);
};

function blockDrawing(tileAtCurrentPoint) {
  if (tileAtCurrentPoint.image) {
    if (tileAtCurrentPoint.image !== greenGrass) {
      logImpossibleToDraw();
      return true;
    } 
  }
  return false;
}

function setStartOrEndPosition(clickedTile) {
  if (win.startTile === null) {
    win.startTile = clickedTile;
    context.strokeStyle="green";

    return true;
  } else if (win.endTile === null) {
    context.strokeStyle = "red";
    win.endTile  = clickedTile;

    return true;
  }

  logPosNotSet();
  
  return false;
}

function drawTileManually(event) {
  if (!isRightClick()) {
    if (!nodes['0'+'|'+'0'] || (win.startTile !== null && win.endTile !== null))
      return;

    var canvas = event.currentTarget;
    var mousePos = getMousePos(event, canvas);
    var tileSideLength = Constants.Measurements.BrickDimensions.SideLength;
    
    var clickedTile = nodes[Math.floor(mousePos.x / tileSideLength) + "|" + Math.floor(mousePos.y / tileSideLength)];
    
    if (!clickedTile || clickedTile.type > 1) 
      return;

    /*calculated position on the canvas*/
    var desiredTileX = clickedTile.x * tileSideLength;
    var desiredTileY = clickedTile.y * tileSideLength;
    
    context.beginPath();

    context.lineWidth="1";

    if (!setStartOrEndPosition(clickedTile)) {
      return;
    }

    context.rect(desiredTileX, desiredTileY, tileSideLength, tileSideLength);
    context.stroke();

    logRelativeTilePosition(clickedTile);
  }
};

function assignImage(kind) {
  if (kind <= 2) { return greenGrass; }
  if (kind === 3) { return greenRock; }
  if (kind === 4) { return goldRock; }
  if (kind === 5) { return blackRock; }
  if (kind === 6) { return redRock }
};

function whatKindOfField(kindOfField) {
  var kindOfField;
  
  if (kindOfField != null) {
    kindOfField = kindOfField.toLowerCase();
  }

  if (kindOfField !== 'maze' && kindOfField !== 'clean') {
    kindOfField = StaticTexts.INVALID_INPUT;
    captureInvalidInput();  
  }

  return kindOfField;
}

function createGrid(){
  var chosenFieldType = whatKindOfField(prompt('"Maze" or "Clean" ?'));

  if (chosenFieldType !== StaticTexts.INVALID_INPUT) {
    var d1 = new Date();

    nodes = {};
    win.startTile = null;
    win.endTile = null;
    
    var tileSideLength = Constants.Measurements.BrickDimensions.SideLength;
    var gridWidth = parseInt($('#grid-width').val());

    if (!(gridWidth > 0)) {
      if (firstLoad > 0) {
        alert('Please enter a number bigger than 0');
      }
      firstLoad = 1;
      return;
    }

    var gridSideLength = gridWidth * Constants.Measurements.BrickDimensions.SideLength;

    canvas.height = gridSideLength;
    canvas.width = gridSideLength;

    var tileKind;

    if (chosenFieldType === 'clean') {
      tileKind = 1;
    }

    for (var x = 0; x < gridWidth; x++) {
      for (var y = 0; y < gridWidth; y++) {
        if (chosenFieldType !== 'clean') {
          tileKind = randomizeTile();
        }
        nodes[x + "|" + y] = new NodeObject(x, y, tileKind, assignImage(tileKind));

        context.drawImage(nodes[x + "|" + y].image, x * tileSideLength, y * tileSideLength, tileSideLength, tileSideLength);
      };
    };


    console.log('---------- field creation duration: ' + (new Date() - d1) +' ----------');
  } else {
    alert('your input was invalid. Try again.');
  }
};

function startEndSet() {
  if (!win.startTile) {
    logNoStartTile();
    return false;
  }

  if (!win.endTile){
    logNoEndTile();
    return false;
  }

  if (!win.endTile.x === 0 || !win.endTile.y === 0 || !win.startTile.x === 0 || !win.startTile.y === 0) {
    return false;
  } else {
    return true;
  }
};

function check(newStart, curX, curY) {
  var id = curX + '|' + curY;
  var mod, curX, curY, endX, endY;
      endX = win.endTile.x;
      endY = win.endTile.y;
  if (nodes[id] !== undefined && nodes[id].type === 1 && !nodes[id].closed) {
    /* Δx² + Δy² = distance between Start- and End-Point*/
    nodes[id].distanceToTarget = Math.pow(Math.abs(curX - endX), 2) + Math.pow(Math.abs(curY - endY), 2);
    newStart.push(nodes[id]);
    distances.push(nodes[id].distanceToTarget);
  };
  return newStart;
};

function checkNeighbours(newStart, currentPlateX, currentPlateY) {
  newStart = check(newStart, currentPlateX - 1, currentPlateY - 1);
  newStart = check(newStart, currentPlateX, currentPlateY - 1);
  newStart = check(newStart, currentPlateX + 1, currentPlateY - 1);
  newStart = check(newStart, currentPlateX - 1, currentPlateY);
  newStart = check(newStart, currentPlateX + 1, currentPlateY);
  newStart = check(newStart, currentPlateX - 1, currentPlateY + 1);
  newStart = check(newStart, currentPlateX, currentPlateY + 1);
  newStart = check(newStart, currentPlateX + 1, currentPlateY + 1);
  return newStart;
};
/*walking backwarts and finding a new way to start from*/
function alternatingPath(amountOfSurroundingTiles) {
  if (amountOfSurroundingTiles === 0) {
    for (var i = visitedTiles.length - 1; i >= 0 ; i--) {
      var backStepY = visitedTiles[i].y;
      var backStepX = visitedTiles[i].x;

      nodes[backStepX + '|' + backStepY].closed = false;

      newStart = checkNeighbours(newStart, backStepX, backStepY);
      /*uppon finding an opportunity to walk by it jumps out the function*/
      if (newStart.length > 0) {
        return newStart;
      };

      nodes[backStepX + '|' + backStepY].closed = true;
    };
  } else {
    return;
  };
};  
var steps = 0;
function drawMarker(x,y){
    var tileSideLength = Constants.Measurements.BrickDimensions.SideLength;
    var desiredTileX = x * tileSideLength;
    var desiredTileY = y * tileSideLength;
    var currentTile = nodes[x + '|' + y];
    
    currentTile.timesVisited++;

    context.beginPath();
    
    switch(currentTile.timesVisited){
      case 1:
        context.strokeStyle = "#00529e";
      break;

      case 2:
        context.strokeStyle = "#ffe500";
      break;
      
      default:
        context.strokeStyle = "#e3001b";
      break;
    }
    context.lineWidth="1";
    context.rect(desiredTileX, desiredTileY, tileSideLength, tileSideLength);
    context.stroke();
    steps++;
}


function findPath(){
  if (startEndSet()) {

    /*captureing the time when the calculation started*/
    var d1 = new Date();
    var endGame = false;
    var currentPlateX = win.startTile.x;
    var currentPlateY = win.startTile.y;

    while (!endGame) {
      var distanceComparison = 4294967295;

      newStart = [];
      distances = [];

      /*finding all 8 neighbours of the current waypoint*/
      newStart = checkNeighbours(newStart, currentPlateX, currentPlateY)

      var newStartTile = null;

      /*check if the current tile is a dead end, if not find the closest point to start searching from.*/
      alternatingPath(newStart.length);

      /*finding the closest tile to the target*/
      for (var i = 0; i < newStart.length; i++) {
        if (newStart[i].distanceToTarget < distanceComparison) {
          newStartTile = newStart[i];
          distanceComparison = newStart[i].distanceToTarget;
        };
      };
      if (newStartTile !== null) {
        drawMarker(currentPlateX, currentPlateY);
      } else {
        alert('There are two options:\n\n 1. You\'ve reached your startpoint. To ignore the dead end and restart from your dedicated start point, just klick on "Start" again. \n\n 2.If there\'s absolutely no way out, try another Start/End combination.');
        return;
      }
      /*setting up the new waypoint*/
      currentPlateX = newStartTile.x;
      currentPlateY = newStartTile.y;

      visitedTiles.push(nodes[currentPlateX + '|' + currentPlateY]);
      nodes[currentPlateX + '|' + currentPlateY].closed = true;

      /*condition for finishing the loop*/
      if (currentPlateX === win.endTile.x && currentPlateY === win.endTile.y) {
        endGame = true;
      };
    };
    console.log(new Date - d1);
    console.log(steps)
  } else {
    alert('Please set a start AND an end point!');
  };
}
console.log('----------methods loaded----------');