"use strict"

window.document.onload = function () {

};

var mousePos = { x: 0, y: 0 };

var frameData = {
    startPos: null,
    endPos: null,
    map: []
}


window.onload = function (canvas) {
    var startime = new Date();

    var canvas = document.getElementById('can');
    var ctx = canvas.getContext('2d');
    frameData.map = createMap();

    bindEventListeners(canvas);
    setupCanvas(canvas, ctx);
    drawMap(ctx, frameData.map);

    console.log("Summary: ", new Date() - startime);
};

function findPath() {
    var startime = new Date();

    if (!areStartAndEndSet()) {
        alert("Please set the start and endpoints first!")
    }

    console.log("findPath: ", new Date() - startime);
}

function bindEventListeners(can) {
    document.getElementById('start').addEventListener('click', findPath);
    document.getElementById('resetStartAndEnd').addEventListener('click', resetPositions);
    can.addEventListener('click', canvasClicked);
}

function resetPositions(e) {
    frameData.startPos = null;
    frameData.endPos = null;
}

function convertRawPosToBasicPos(vector2d) {
    var startime = new Date();

    var calcedVector = {
        x: Math.floor(vector2d.x / conf.cell.width),
        y: Math.floor(vector2d.y / conf.cell.height)
    }

    console.log("convertRawPosToBasicPos: ", new Date() - startime);

    return calcedVector;
}

function isEmptyObject(obj) {
    return obj === null || Object.keys(obj).length === 0;
}

function areStartAndEndSet() {
    var isXset = (frameData.startPos != null);
    var isYset = (frameData.endPos != null);

    return isXset && isYset;
}

function startPosEqualsEndPos(startPos, endPos) {
    return startPos.x === endPos.x && startPos.y === endPos.y;
}

function canvasClicked(e) {
    var startime = new Date();
    var converted = convertRawPosToBasicPos(e);

    var canvas = document.getElementById('can');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = "red";

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
    var height = conf.canvas.height / conf.cell.height;
    var width = conf.canvas.width / conf.cell.width;

    var startime = new Date();
    var map = [];

    for (var y = 0; y < height; y++) {
        map[y] = [];

        for (var x = 0; x < width; x++) {
            map[y][x] = createCell(x, y, getRandomInteger(0, 6));
        }
    }

    console.log("Create Map: ", new Date() - startime);
    return map;
}

function createCell(x, y, kind) {
    return {
        gridX: x,
        gridY: y,
        height: conf.cell.height,
        width: conf.cell.width,
        kind: kind
    }
}

function setupCanvas(canvas, context) {
    canvas.width = conf.canvas.width;
    canvas.height = conf.canvas.height;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getVector(clientXEvent) {
    return {
        x: clientXEvent.offsetX,
        y: clientXEvent.offsetY
    }
}
