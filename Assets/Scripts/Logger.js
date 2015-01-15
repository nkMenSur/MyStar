"use strict"
function logRelativeTilePosition(clickedTile) {

  if (!clickedTile) {
    console.log('Could not determine Tile!');
    return;
  }
  if (clickedTile.x === 0 && clickedTile.y > 0) {
    console.log('clickedTile: 0 | '+ clickedTile.y );
    return;
  }
  if (clickedTile.x > 0 && clickedTile.y === 0) {
    console.log('clickedTile: '+ clickedTile.x  + ' | '+'0');
    return;
  }

  console.log('clickedTile: ' + clickedTile.x + ' | ' + clickedTile.y );
}

function captureInvalidInput() {
  console.log('invalid input captured.');
}
  
function logImpossibleToDraw() {
  console.log('This tile can not be redrawn.')
}
function logBothPositionsAreSet() {
  console.log('Start and Endposition are already set!');
}
function logPosNotSet() {
  console.log('Start or EndPosition was not set propperly!');
}

console.log('--------- Logger initialized ----------');