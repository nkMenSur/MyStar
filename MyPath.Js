var tiles = {};
var visitedTiles = [];

$(function () {
        /*tile properties*/
    var gridHeigth, strtCoorX, strtCoorY, endCoorX, endCoorY, gridWidth;
    var startSet = endSet = false;
        var start = 1
        var newStart = [];
        checkedNeighbours = [];
        //DemoWall
        $('.demoButton').click(function () {
            var visitedTiles = [];

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
            tiles['10|22'].visibleTile.className += ' rock'
            tiles['11|1'].visibleTile.className += ' rock';
            tiles['11|22'].visibleTile.className += ' rock'
            tiles['12|1'].visibleTile.className += ' rock';
            tiles['12|22'].visibleTile.className += ' rock'
            tiles['13|1'].visibleTile.className += ' rock';
            tiles['13|22'].visibleTile.className += ' rock'
            tiles['14|1'].visibleTile.className += ' rock';
            tiles['14|22'].visibleTile.className += ' rock'
            tiles['15|0'].visibleTile.className += ' rock';
            tiles['15|1'].visibleTile.className += ' rock';
            tiles['15|22'].visibleTile.className += ' rock'
            tiles['16|22'].visibleTile.className += ' rock'
            tiles['17|22'].visibleTile.className += ' rock'
            tiles['18|22'].visibleTile.className += ' rock'
            tiles['19|22'].visibleTile.className += ' rock'
        });

        /*NodeObjectConstructor with necessary properties and parameters.*/
        NodeObject = function (x, y, type) {
            this.h = function () {
                return this.g + this.f;
            }
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

        /*drawing rocks via rightclick*/
        $('body').on('mousedown', '.frame div', function (e) {
            if (e.which === 3) {
                $(this).toggleClass('rock');
            }
        });

        $('body').on('click', '.frame div', function (e) {
            /*captureing coordinates for start and endpoint*/
            var $this = $(this);
            var $xClicked = $this.data('xco');
            var $yClicked = $this.data('yco');
            if (!$this.hasClass('rock')) {
                if (start == 1) {
                    tiles[($xClicked) + '|' + ($yClicked)].visibleTile.className += ' start';
                    strtCoorX = $this.data('xco');
                    strtCoorY = $this.data('yco');
                    /*Disables the walking over the start Tile*/
                    tiles[$xClicked + '|' + $yClicked].closed = true;
                    start++;
                } else if (start == 2) {
                    tiles[($xClicked) + '|' + ($yClicked)].visibleTile.className += ' end';
                    endCoorX = $this.data('xco');
                    endCoorY = $this.data('yco');
                    start++;
                }
            }
        });


        /*Grid Initialisation \ starting a new generation*/
        $('.createGrid').click(function () {
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
                    //var kind = 'plains';
                    /*different kinds of tiles to be implemented along with the heuristic*/
                    var prob = Math.floor((Math.random() * 10) + 1);
                    if (prob <= 7) { kind = 'plains'; };
                    if (prob > 7) { kind = 'rock plains'; };
                    //if (prob === 10) { kind = 'wall plains' };

                    tiles[x + "|" + y] = new NodeObject(x, y, kind);
                }
            }

            var f = $('.frame').get(0);
            for (var properties in tiles) {
                var currentTile = tiles[properties];
                /*creating tiles*/
                currentTile.visibleTile = document.createElement('div');
                currentTile.visibleTile.setAttribute('data-xco', currentTile.x);
                currentTile.visibleTile.setAttribute('data-yco', currentTile.y);
                currentTile.visibleTile.className = currentTile.type;

                f.appendChild(currentTile.visibleTile);
            }
        });

        $('.startGame').click(function () {

            var d1 = new Date();
            var endGame = false;
            var currentPlateX = strtCoorX;
            var currentPlateY = strtCoorY;

            while (!endGame) {
                var distanceComparison = 4294967295;
                var newStart = [];
                var distances = [];
                var mod, curX, curY, endX, endY, id;
                endX = endCoorX;
                endY = endCoorY;


                /*function for finding neighbours*/
                function check(newStart, curX, curY) {
                    id = curX + '|' + curY
                    if (tiles[id] !== undefined && !tiles[id].visibleTile.classList.contains('rock') && !tiles[id].closed) {
                            tiles[id].visibleTile.distanceToTarget = Math.pow(Math.abs(curX - endX), 2) + Math.pow(Math.abs(curY - endY), 2);
                            newStart.push(tiles[id].visibleTile);
                            distances.push(tiles[id].visibleTile.distanceToTarget);
                    }
                    return newStart;
                }
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

                function alternatingPath(amountOfSurroundingTiles) {
                    if (amountOfSurroundingTiles == 0) {

                        for (var i = visitedTiles.length - 1; i >= 0 ; i--) {
                            var backStepY = parseInt(visitedTiles[i].visibleTile.dataset['yco']);
                            var backStepX = parseInt(visitedTiles[i].visibleTile.dataset['xco']);
                            tiles[backStepX + '|' + backStepY].closed = false;

                            
                            newStart = checkNeighbours(newStart, backStepX, backStepY);
                            if (newStart.length > 0) {
                                return newStart;
                            }
                            tiles[backStepX + '|' + backStepY].closed = true;
                        }
                    } else {
                        return;
                    }
                }

                /*finding all 8 neighbours of the current waypoint*/

                newStart = checkNeighbours(newStart, currentPlateX, currentPlateY)

                var newStartTile = null;
                /*check if the current tile is a dead end*/
                alternatingPath(newStart.length);

                /*sorting the current 8 distances to the target in an accending order*/
                checkedNeighbours = _.sortBy(distances, function (num) {
                    return num;
                });
                
                /*chosing the closest tile to the target as the next startTile*/
                for (var i = 0; i < newStart.length; i++) {
                    if (newStart[i].distanceToTarget == checkedNeighbours[0]) {
                        newStartTile = newStart[i];
                    }
                }
                newStartTile.className += ' marker';

                /*setting up the new waypoint*/
                currentPlateX = parseInt(newStartTile.dataset['xco']);
                currentPlateY = parseInt(newStartTile.dataset['yco']);

                //visitedTiles.push(currentPlateX + '|' + currentPlateY);
                visitedTiles.push(tiles[currentPlateX + '|' + currentPlateY]);
                tiles[currentPlateX + '|' + currentPlateY].closed = true;

                /*condition for finishing the loop*/
                if (currentPlateX === endCoorX && currentPlateY === endCoorY) {
                    endGame = true;
                }
            }
            console.log(new Date - d1);

        })
    });