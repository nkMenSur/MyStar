'use strict'
$(function($){
	window.win = window;
	win.nodes = {};
	win.doc = win.document;
	var created = false;
	win.canvas = doc.getElementById('pathFind');
	canvas.height = 0;
	canvas.width = 0;
	win.context = canvas.getContext("2d");
	var draw = false;
	var requestAnimationFrame = win.requestAnimationFrame ||
															win.mozRequestAnimationFrame ||
															win.webkitRequestAnimationFrame ||
															win.msRequestAnimationFrame;
															win.firstLoad = 0;

	win.startTile = null;
	win.endTile = null;

	win.visitedTiles = [];
	win.cleanField = {};
	win.clean;
	win.newStart = [];
	win.checkedNeighbours = [];
  win.distances = []; win.visitedTiles = [];
  win.newStart = [];

	win.requestAnimationFrame = requestAnimationFrame;
	console.log('global variables initialized');

	canvas.addEventListener('mousedown', drawTileManually);
	console.log('eventlisteners initialized');

	$('#create-grid').click(function(){
		createGrid();
	});
	
	$('#find-path').click(function(){
		findPath();
	});
});

