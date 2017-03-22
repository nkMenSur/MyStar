"use strict"

//data that needs to be accessed globally
var frameData = {
    startPos: null,
    endPos: null,
    map: [],
    canvas: null,
    ctx: null
}

//init
window.onload = function (canvas) {
    var startime = new Date();
    //init canvas + it's context
    frameData.canvas = document.getElementById('can');
    frameData.ctx = frameData.canvas.getContext('2d');

    //create the map and store it as an array
    frameData.map = createMap();

    //Canvas layout setup
    setupCanvas(frameData.canvas, frameData.ctx);

    //Eventbinding
    bindEventListeners(frameData.canvas);
    //initial map draw
    drawMap(frameData.ctx, frameData.map);

    console.log("Summary: ", new Date() - startime);
};

function findPath() {
    var startime = new Date();
    //start the algorythm if the start and enpoint are set
    if (!areStartAndEndSet()) {
        alert("Please set the start and endpoints first!")
        return;
    }

    console.log("findPath: ", new Date() - startime);
}

function bindEventListeners(can) {
    //envent bindings
    document.getElementById('start').addEventListener('click', findPath);
    document.getElementById('resetStartAndEnd').addEventListener('click', resetPositions);
    can.addEventListener('click', canvasClicked);
}

function resetPositions(e) {
    //repaint the portion that has been set as start / end
    var canvas = document.getElementById('can');
    var ctx = canvas.getContext('2d');
    if (!isEmptyObject(frameData.startPos)) {
        ctx.fillStyle = getFillstyleByNumber(frameData.map[frameData.startPos.y][frameData.startPos.x].kind);
        ctx.fillRect(frameData.startPos.x * conf.cell.width, frameData.startPos.y * conf.cell.height, conf.cell.width, conf.cell.height);
    }
    if (!isEmptyObject(frameData.endPos)) {
        ctx.fillStyle = getFillstyleByNumber(frameData.map[frameData.endPos.y][frameData.endPos.x].kind);
        ctx.fillRect(frameData.endPos.x * conf.cell.width, frameData.endPos.y * conf.cell.height, conf.cell.width, conf.cell.height);
    }

    //reset of the positions in order to be reused
    frameData.startPos = null;
    frameData.endPos = null;
}

function convertRawPosToMapPos(e) {
    var startime = new Date();
    var relativeVector = getVector(e);

    //map the supplied vector according to the map.
    var calcedVector = {
        x: Math.floor(relativeVector.x / conf.cell.width),
        y: Math.floor(relativeVector.y / conf.cell.height) 
    }

    console.log("convertRawPosToMapPos: ", new Date() - startime);

    return calcedVector;
}
function getVector(e) {
    var rect = frameData.canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;
    
    return {
        x: mouseX,
        y: mouseY
    }
}
function isEmptyObject(obj) {
    //check if the provided object is null or empty
    return obj === null || Object.keys(obj).length === 0;
}

function areStartAndEndSet() {
    //check if the start and endpoints are set
    var isXset = (frameData.startPos != null);
    var isYset = (frameData.endPos != null);

    return isXset && isYset;
}

function startPosEqualsEndPos(startPos, endPos) {
    //check if the starting point is equal to the end point
    return startPos.x === endPos.x && startPos.y === endPos.y;
}

function canvasClicked(e) {
    var startime = new Date();
    var converted = convertRawPosToMapPos(e);
    var canvas = frameData.canvas;
    var ctx = frameData.ctx;

    ctx.fillStyle = "red";

    //setting the start and endpoints based on a click on the canvas + special cases
    if (isEmptyObject(frameData.startPos)) {
        frameData.startPos = converted;
        ctx.fillRect(frameData.startPos.x * conf.cell.width, frameData.startPos.y * conf.cell.height, conf.cell.width, conf.cell.height);
        return;

    } else if (isEmptyObject(frameData.endPos) && !startPosEqualsEndPos(frameData.startPos, converted)) {
        frameData.endPos = converted;
        ctx.fillRect(frameData.endPos.x * conf.cell.width, frameData.endPos.y * conf.cell.height, conf.cell.width, conf.cell.height);
        return;

    } else if (areStartAndEndSet()) {
        alert("Start and End already set. You can find a path now.");
    } else {
        alert("The start and the end cannot be the same!")
    }

    console.log("Canvas Clicked: ", new Date() - startime);
}

function getFillstyleByNumber(kind) {
    //returns a colorcode based on the tilekind that's been provided 
    return conf.cell.kinds[kind].color;
}

function drawMap(context, map) {
    var startime = new Date();

    for (var x = 0; x < map.length; x++) {
        for (var y = 0; y < map[x].length; y++) {
            var currentCell = map[x][y];
            var calcedX = currentCell.gridX * conf.cell.width;
            var calcedY = currentCell.gridY * conf.cell.height;
            context.fillStyle = getFillstyleByNumber(currentCell.kind);
            context.fillRect(calcedX, calcedY, conf.cell.width, conf.cell.height);
        }
    }
    console.log("DrawMap: ", new Date() - startime);
}

function createMap() {
    //create a map and return it as a 2dim array
    var startime = new Date();
    var map = [];

    for (var y = 0; y < conf.canvas.tilesYamount; y++) {
        map[y] = [];

        for (var x = 0; x < conf.canvas.tilesXamount; x++) {
            map[y][x] = createCell(x, y, getRandomInteger(0, 6));
        }
    }

    console.log("Create Map: ", new Date() - startime);
    return map;
}

function createCell(x, y, kind) {
    //cell constructor that returns an annonymus cell object
    return {
        gridX: x,
        gridY: y,
        height: conf.cell.height,
        width: conf.cell.width,
        kind: kind
    }
}

function setupCanvas(canvas, context) {
    canvas.width = conf.canvas.tilesXamount * conf.cell.width;
    canvas.height = conf.canvas.tilesYamount * conf.cell.height;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
