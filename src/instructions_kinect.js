// copied from instructions.js to test out kinect sensor component
//
var host = "localhost:4444";

// tv 4
// var host = "cpsc484-04.yale.internal:8888"

$(document).ready(function() {
  frames.start();
  twod.start();
});


var frames = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      // var command = frames.get_left_wrist_command(JSON.parse(event.data));
      // if (command !== null) {
      //   sendWristCommand(command);
      // }
      frames.show(JSON.parse(event.data));
    }
  },

  show: function(frame) {
    console.log(frame);
  },

  get_left_wrist_command: function (frame) {
    var command = null;
    if (frame.people.length < 1) {
      return command;
    }

    // Normalize by subtracting the root (pelvis) joint coordinates
    var pelvis_x = frame.people[0].joints[0].position.x;
    var pelvis_y = frame.people[0].joints[0].position.y;
    var pelvis_z = frame.people[0].joints[0].position.z;
    var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
    var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
    var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;

    if (left_wrist_z < 100) {
      return command;
    }

    if (left_wrist_x < 200 && left_wrist_x > -200) {
      if (left_wrist_y > 500) {
        command = 73; // UP
      } else if (left_wrist_y < 100) {
        command = 75; // DOWN
      }
    } else if (left_wrist_y < 500 && left_wrist_y > 100) {
      if (left_wrist_x > 200) {
        command = 76; // RIGHT
      } else if (left_wrist_x < -200) {
        command = 74; // LEFT
      }
    }
    return command;
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


function setup() {
  let canvas = createCanvas(windowWidth/2, windowHeight);

  canvas.parent("canvas-container");
  frameRate(3);
  stroke(255);
  strokeWeight(10);

  scoreElem = createDiv('Score = 0');
  scoreElem.style = ('color', '#ffffff');
  scoreElem.parent("nav-bar");
  scoreElem.id = 'score';

// how to add button
//   button = createButton('test button');
//   button.position(280, 300);

  //how to add text
  // input = createElement('div', "text");
  // input.position(280, 300);
  // input.parent("canvas-container");

//   startButton = createDiv("Start Game");
//   startButton.style = ('color', '#ffffff');
//   startButton.parent(canvas);

//   startB = createDiv("Start Game");
//   startB.style = ('color', '#ffffff');
//   startB.parent("start-button")
//   startB.parent.parent("canvas-container");
//   scoreElem.id = 'start';

    // let intro_text = "Test your reaction time and take your residential college to the top!";
    // intro_text.style('font-size', '20px');
    // intro_text.style('color', '#ffffff');
    // intro_text.position(windowWidth/6, windowHeight/3);

}



function draw() {
    background('#69cceb');

    let canvasWidth = windowWidth/2;
    let canvasHeight = windowHeight;

    let instruction0 = "Gain as many points as you can in 90 seconds to add to your residential college's score!";
    let instruction1 = "Guide your wrist to hit randomly generated objects for points";
    let instruction2 = "The smaller the shape, the higher the point value. Hitting [x shape] will lose you points!";
    let instruction3 = "Guide your wrist to the quit button on the top-left of the screen to exit the game"
    textSize(20);
    noStroke();
    textAlign(LEFT, LEFT);

    text(instruction0, 20, 20, canvasWidth-50, canvasHeight/2);

    rect(10, 80, canvasWidth-50, 150, 20);
    text(instruction1, 20, 90, canvasWidth-50, canvasHeight/2);

    rect(10, 260, canvasWidth-50, 150, 20);
    text(instruction2, 20, 270, canvasWidth-50, canvasHeight/2);

    rect(10, 440, canvasWidth-50, 150, 20);
    text(instruction3, 20, 450, canvasWidth-60, canvasHeight/2);

    ellipse(canvasWidth/2, 655, 200, 100);
    text("Start Game", canvasWidth/2 - 50, 660)
  }

