"use strict"
var Constants = {
  KeyCodes: {
    WUp: 87,
    DRight: 68,
    SDown: 83,
    ALeft: 65,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
    ArrowLeft: 37,
    RightClick: 3
  },
  Measurements: {
    BrickDimensions: {
      SideLength: 20,
    },
    FieldDimensions: {
      Width:0,
      Height:0
    },
  },
  Times: {
    FrameLength: 100
  }
};

var StaticTexts = {
  INVALID_INPUT: 'user is a monkey'
};

console.log('constants initialized');