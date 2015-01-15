$(function($){
  win.greenGrass = new Image();
  win.greenRock = new Image();
  win.goldRock = new Image();
  win.blackRock = new Image();
  win.redRock = new Image();
  win.goldenSand = new Image();

  goldenSand.src = 'Assets/Images/environment/passableTiles/goldenSand30x30.png';
  greenGrass.src = 'Assets/Images/environment/passableTiles/greenGrass30x30.png';
  greenRock.src = 'Assets/Images/environment/impassibleTiles/greenRock30x30.png';
  goldRock.src = 'Assets/Images/environment/impassibleTiles/goldRock30x30.png';
  blackRock.src = 'Assets/Images/environment/impassibleTiles/blackRock30x30.png';
  redRock.src = 'Assets/Images/environment/impassibleTiles/redRock30x30.png';

  console.log('ressources loaded');
});
