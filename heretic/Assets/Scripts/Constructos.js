'use strict'
function NodeObject (x, y, type, image){
	return {
		type: type,
		x: x,
		y:y,
		closed: false,
		image: image,
		distanceToTarget: -1,
		timesVisited: 0
	}
};

console.log('Constructors initialized');