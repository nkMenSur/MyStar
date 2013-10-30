var tiles = {};

$(function () {
    "use strict";
    /*variable declaration*/
    var gridHeigth, strtCoorX, strtCoorY, endCoorX, endCoorY, gridWidth,
        startSet = false, endSet = false, start = 1, visitedTiles = [],
        cleanField = {}, clean, newStart = [], checkedNeighbours = [],
        distances = [], visitedTiles = [], newStart = [],
        /*NodeObjectConstructor with necessary properties and parameters.*/
        NodeObject = function (x, y, type) {
            this.h = function () {
                if (typeof (this.g) !== 'undefined' || typeof (this.f) !== 'undefined') {
                    return this.g + this.f;
                } else {
                    return null;
                }
            };
            this.g;
            this.f;
            this.fieldType;
            this.x = x;
            this.y = y;
            this.paraneNodeX;
            this.parentNodeY;
            this.type = type;
            this.closed = false;
        };

    function startEndSet() {
        if (typeof (endCoorX) === 'undefined' || typeof (endCoorY) === 'undefined' ||
            typeof (strtCoorX) === 'undefined' || typeof (strtCoorY) === 'undefined' || 
            endCoorX === null || endCoorY === null ||
            strtCoorX === null || strtCoorY === null) {
            return false;
        } else {
            return true;
        }
    };

    function findCenter() {
        return Math.round(gridWidth / 2);
    };

    function drawHorLine(e) {
        if (e.keyCode === 32) {
            var d1 = new Date();
            var center = findCenter();
            for (var i = 0; i < gridWidth ; i++) {
                tiles[center+'|'+i].visibleTile.className += ' rock';
            }
            console.log(new Date() - d1);
        }
    };
    window.addEventListener('keydown', drawHorLine, false);
    
    
    /*function for finding neighbours*/
    function check(newStart, curX, curY) {
        var id = curX + '|' + curY;
        var mod, curX, curY, endX, endY;
        endX = endCoorX;
        endY = endCoorY;
        if (tiles[id] !== undefined && !tiles[id].visibleTile.classList.contains('rock') && !tiles[id].closed) {
            /* Δx² + Δy² = distance between Start- and End-Point*/
            tiles[id].visibleTile.distanceToTarget = Math.pow(Math.abs(curX - endX), 2) + Math.pow(Math.abs(curY - endY), 2);
            newStart.push(tiles[id].visibleTile);
            distances.push(tiles[id].visibleTile.distanceToTarget);
        };
        return newStart;
    };

    /*initial neighbourCheck*/
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
                var backStepY = parseInt(visitedTiles[i].visibleTile.dataset['yco']);
                var backStepX = parseInt(visitedTiles[i].visibleTile.dataset['xco']);

                tiles[backStepX + '|' + backStepY].closed = false;

                newStart = checkNeighbours(newStart, backStepX, backStepY);
                /*uppon finding an opportunity to walk by it jumps out the function*/
                if (newStart.length > 0) {
                    return newStart;
                };

                tiles[backStepX + '|' + backStepY].closed = true;
            };
        } else {
            return;
        };
    };

    /*removes everything from the field except the "rocks"*/
    $('.cleanButton').click(function () {
        cleanField = {};
        clean = true;
        /*saving the rocks inside "cleanField"*/
        for (var properties in tiles) {
            var currentTile = tiles[properties];
            var xco = parseInt(currentTile.visibleTile.dataset['xco']);
            var yco = parseInt(currentTile.visibleTile.dataset['yco']);

            if (currentTile.visibleTile.classList.contains('rock')) {
                cleanField[xco + '|' + yco] = currentTile;
            }
        };
        /*redrawing the grid*/
        $('.createGrid').click();

        /*redrawing the rocks on a clean planes field*/
        for (var rocks in cleanField) {
            var currentTile = cleanField[rocks];
            tiles[parseInt(currentTile.x) + '|' + parseInt(currentTile.y)].visibleTile.className += ' rock';
        };
    });

    /*DemoWall*/
    $('.demoButton').click(function () {
        clean = true;
        $('.gridWidth').val('40');
        $('.createGrid').click();

        tiles['3|3'].visibleTile.className += ' rock';
        tiles['3|4'].visibleTile.className += ' rock';
        tiles['3|5'].visibleTile.className += ' rock';
        tiles['3|18'].visibleTile.className += ' rock';
        tiles['3|19'].visibleTile.className += ' rock';
        tiles['3|20'].visibleTile.className += ' rock';
        tiles['4|2'].visibleTile.className += ' rock';
        tiles['4|3'].visibleTile.className += ' rock';
        tiles['4|5'].visibleTile.className += ' rock';
        tiles['4|18'].visibleTile.className += ' rock';
        tiles['4|20'].visibleTile.className += ' rock';
        tiles['4|21'].visibleTile.className += ' rock';
        tiles['5|1'].visibleTile.className += ' rock';
        tiles['5|2'].visibleTile.className += ' rock';
        tiles['5|5'].visibleTile.className += ' rock';
        tiles['5|18'].visibleTile.className += ' rock';
        tiles['5|21'].visibleTile.className += ' rock';
        tiles['5|22'].visibleTile.className += ' rock';
        tiles['6|1'].visibleTile.className += ' rock';
        tiles['6|5'].visibleTile.className += ' rock';
        tiles['6|18'].visibleTile.className += ' rock';
        tiles['6|22'].visibleTile.className += ' rock';
        tiles['7|1'].visibleTile.className += ' rock';
        tiles['7|5'].visibleTile.className += ' rock';
        tiles['7|18'].visibleTile.className += ' rock';
        tiles['7|22'].visibleTile.className += ' rock';
        tiles['8|1'].visibleTile.className += ' rock';
        tiles['8|5'].visibleTile.className += ' rock';
        tiles['8|18'].visibleTile.className += ' rock';
        tiles['8|22'].visibleTile.className += ' rock';
        tiles['9|1'].visibleTile.className += ' rock';
        tiles['9|5'].visibleTile.className += ' rock';
        tiles['9|6'].visibleTile.className += ' rock';
        tiles['9|7'].visibleTile.className += ' rock';
        tiles['9|8'].visibleTile.className += ' rock';
        tiles['9|9'].visibleTile.className += ' rock';
        tiles['9|10'].visibleTile.className += ' rock';
        tiles['9|11'].visibleTile.className += ' rock';
        tiles['9|12'].visibleTile.className += ' rock';
        tiles['9|13'].visibleTile.className += ' rock';
        tiles['9|14'].visibleTile.className += ' rock';
        tiles['9|15'].visibleTile.className += ' rock';
        tiles['9|16'].visibleTile.className += ' rock';
        tiles['9|17'].visibleTile.className += ' rock';
        tiles['9|18'].visibleTile.className += ' rock';
        tiles['9|22'].visibleTile.className += ' rock';
        tiles['10|1'].visibleTile.className += ' rock';
        tiles['10|22'].visibleTile.className += ' rock';
        tiles['11|1'].visibleTile.className += ' rock';
        tiles['11|22'].visibleTile.className += ' rock';
        tiles['12|1'].visibleTile.className += ' rock';
        tiles['12|22'].visibleTile.className += ' rock';
        tiles['13|1'].visibleTile.className += ' rock';
        tiles['13|22'].visibleTile.className += ' rock';
        tiles['14|1'].visibleTile.className += ' rock';
        tiles['14|22'].visibleTile.className += ' rock';
        tiles['15|0'].visibleTile.className += ' rock';
        tiles['15|1'].visibleTile.className += ' rock';
        tiles['15|22'].visibleTile.className += ' rock';
        tiles['16|22'].visibleTile.className += ' rock';
        tiles['17|22'].visibleTile.className += ' rock';
        tiles['18|22'].visibleTile.className += ' rock';
        tiles['19|22'].visibleTile.className += ' rock';
    });

    /*drawing rocks via rightclick*/
    $('body').on('mousedown', '.frame div', function (e) {
        if (e.which === 3) {
            $(this).toggleClass('rock');
        };
    });
    /*Setting eht Start- and End-Point*/
    $('body').on('click', '.frame div', function (e) {
        /*captureing coordinates for start and endpoint*/
        var $this = $(this);
        var $xClicked = $this.data('xco');
        var $yClicked = $this.data('yco');

        if (!$this.hasClass('rock')) {
            if (start === 1) {
                tiles[($xClicked) + '|' + ($yClicked)].visibleTile.className += ' start';
                strtCoorX = $this.data('xco');
                strtCoorY = $this.data('yco');
                /*Disables the walking over the start Tile*/
                tiles[$xClicked + '|' + $yClicked].closed = true;
                start++;
            } else if (start === 2) {
                tiles[($xClicked) + '|' + ($yClicked)].visibleTile.className += ' end';
                endCoorX = $this.data('xco');
                endCoorY = $this.data('yco');
                start++;
            };
        };
    });

    /*Grid Initialisation \ starting a new generation*/
    $('.createGrid').click(function () {

        /*Checking if its a cleanUp or a recreation*/
        if (!clean) {
            var kindOfField = prompt('"Maze" or "Clean" ?');
        } else {
            kindOfField = 'plains'
        };

        /*Destroying the previously used NodeObjects and stateCarrier to prepare for the next generation*/
        tiles = {};
        visitedTiles = [];
        checkedNeighbours = [];
        start = 1;
        strtCoorX = null;
        strtCoorY = null;
        endCoorX = null;
        endCoorY = null;
        $('.frame').empty();

        /*parsing input*/
        gridHeigth = gridWidth = parseInt($('.gridWidth').val());

        $('.frame').css('width', gridWidth * 8);

        /*recursive creating of the NodeObjects*/
        for (var x = 0; x < gridWidth; x++) {

            for (var y = 0; y < gridHeigth; y++) {

                /*different kinds of tiles to be implemented along with the heuristic...*/
                if (kindOfField === 'maze' || kindOfField === 'Maze') {
                    var prob = Math.floor((Math.random() * 10) + 1);

                    if (prob <= 5) { kind = 'plains'; };
                    if (prob > 5) { kind = 'rock plains'; };
                }
                else if (kindOfField === 'clean' || kindOfField === 'Clean' || clean) {
                    var kind = 'plains';
                }
                else {
                    alert('please check your spelling...');
                    return;
                }
                tiles[x + "|" + y] = new NodeObject(x, y, kind);
            };
        };

        var f = $('.frame').get(0);

        for (var properties in tiles) {
            /*creating tiles*/
            var currentTile = tiles[properties];

            currentTile.visibleTile = document.createElement('div');
            currentTile.visibleTile.setAttribute('data-xco', currentTile.x);
            currentTile.visibleTile.setAttribute('data-yco', currentTile.y);
            currentTile.visibleTile.className = currentTile.type;

            f.appendChild(currentTile.visibleTile);
        };
        clean = false;
    });

    /*starting the actual pathfinding*/

    $('.startGame').click(function () {
        if (startEndSet()) {

            /*captureing the time when the calculation started*/
            var d1 = new Date();
            var endGame = false;
            var currentPlateX = strtCoorX;
            var currentPlateY = strtCoorY;
            
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
                    newStartTile.className += ' marker';
                } else {
                    alert('There are two options:\n\n1. You\'ve reached your startpoint. To ignore the dead end and restart from your dedicated start point, just klick on "Start" again. \n\n 2.If there\'s absolutely no way out, try another Start/End combination.');
                    return;
                }

                /*setting up the new waypoint*/
                currentPlateX = parseInt(newStartTile.dataset['xco']);
                currentPlateY = parseInt(newStartTile.dataset['yco']);

                visitedTiles.push(tiles[currentPlateX + '|' + currentPlateY]);
                tiles[currentPlateX + '|' + currentPlateY].closed = true;

                /*condition for finishing the loop*/
                if (currentPlateX === endCoorX && currentPlateY === endCoorY) {
                    endGame = true;
                };
            };
            console.log(new Date - d1);
        } else {
            alert('Please set a start AND an end point!');
        };

    });
});