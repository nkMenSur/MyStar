//var tiles = {};

$(function () {
    "use strict";

    function clear(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            canvasContext.clearRect(0, 0, canvasElement.height, canvasElement.width);
        }
    }

    var doc = document;
    var canvasContainer = doc.getElementById('form');

    var canvasElement = doc.createElement('canvas');

    var canvasContext = canvasElement.getContext('2d');

    canvasContainer.appendChild(canvasElement);
    canvasElement.width = 500;
    canvasElement.height = 500;

    doc.addEventListener('keydown', clear, false);

    canvasContext.fillStyle = "#000";
    canvasContext.fillRect(420, 0, 110, 100);

    canvasContext.rect(100, 100, 100, 100)
    canvasContext.stroke();

    canvasContext.strokeRect(50,50,50,50)


    ///*bezier*/
    canvasContext.beginPath();
    canvasContext.moveTo(20, 20);
    canvasContext.bezierCurveTo(20, 100, 200, 100, 200, 20);
    canvasContext.stroke();

    /*quadratic bezier curve*/
    canvasContext.beginPath();
    canvasContext.moveTo(20, 20);
    canvasContext.quadraticCurveTo(20, 100, 200, 20);
    canvasContext.stroke();

    /*arc*/
    canvasContext.beginPath();
    canvasContext.arc(100, 75, 50, 0, 2 * Math.PI);
    canvasContext.stroke();
        

    
});