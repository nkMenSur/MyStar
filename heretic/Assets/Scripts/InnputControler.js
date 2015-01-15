'use strict'

function getMousePos(e, canvas) {
  var rect = canvas.getBoundingClientRect();
  var root = doc.documentElement;
  var mouseX = e.clientX - rect.left - root.scrollLeft;
  var mouseY = e.clientY - rect.top - root.scrollTop;

  return {
      x: mouseX,
      y: mouseY
  };
};

function isRightClick() {
	return (event.which === Constants.KeyCodes.RightClick)
}

console.log('---------- input controler loaded ----------');