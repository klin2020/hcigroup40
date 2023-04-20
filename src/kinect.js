// receive input from kinect sensor

// local playback
// var host = "localhost:4444";
// tv 4
var host = "cpsc484-04.yale.internal:8888"

$(document).ready(function() {
  frames.start();
  twod.start();
});

var screen_width = 1920;
var screen_height = 1080;
var kinectScaleFactor = 2;

var hand_x = null;
var hand_y = null;

var leftHand_x = null;
var leftHand_y = null;

/**
 *
 * convert kinect coordinates to phaser canvas coordinates
 * @todo: ask TA about coordinates, make sure this mapping is correct
 */
function kinect2canvas(x, y) {
  let newX = x + screen_width/2;
  let newY = y + screen_height/2;
  newX /= kinectScaleFactor;
  newY /= kinectScaleFactor;
  return [newX, newY];
}

var frames = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      frames.show(JSON.parse(event.data));
    }
  },

  show: function(frame) {
    // console.log(frame);
    frames.set_hands(frame);
  },

  set_hands: function(frame) {
    if (frame.people.length < 1) {
      hand_x = null;
      hand_y = null;
      leftHand_x = null;
      rightHand_x = null;
      return null;
    }

    let leftHand = frame.people[0].joints[8];
    let rightHand = frame.people[0].joints[15];

    if (leftHand) {
      // console.log(hand.position);
      let res = kinect2canvas(leftHand.position.x, leftHand.position.y);
      leftHand_x = res[0];
      leftHand_y = res[1];
      // console.log(hand.position);
      // console.log(hand_x, hand_y);
    } else {
      leftHand_x = null;
      leftHand_y = null;
    }

    if (rightHand) {
      // console.log(hand.position);
      let res1 = kinect2canvas(rightHand.position.x, rightHand.position.y);
      hand_x = res1[0];
      hand_y = res1[1];
      // console.log(hand.position);
      // console.log(hand_x, hand_y);
    } else {
      hand_x = null;
      hand_y = null;
    }
  }

};

var twod = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/twod";
    twod.socket = new WebSocket(url);
    twod.socket.onmessage = function(event) {
      twod.show(JSON.parse(event.data));
    }
  },

  show: function(twod) {
    $('.twod').attr("src", 'data:image/pnjpegg;base64,'+twod.src);
  }
};

// let startButton = document.getElementById('start-button');
// startButton.addEventListener("click", () => {
//   window.location.replace("instructions.html");
// });