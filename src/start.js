// Adapted from https://p5js.org/examples/interaction-snake-game.html
//
var host = "localhost:4444";
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
      //get spine_naval coordinates
      //how to indicate time elapsed for stillness?
      var command = frames.get_spine_naval_command(JSON.parse(event.data)); //where does get_spine_chest_command
      // if (command !== null) {
      //   sendNavalCommand(command); //in example, function determined direction
      // }
    }
    // frames.socket.onmessage = function (event) {
    //   var command = frames.get_left_wrist_command(JSON.parse(event.data));
    //   if (command !== null) {
    //     sendWristCommand(command);
    //   }
    // }
  },

  get_naval_command: function (frame) {
    var command = null;
    if (frame.people.length < 1) {
      return command;
    }

    // Normalize by subtracting the root (pelvis) joint coordinates 
    var pelvis_x = frame.people[0].joints[0].position.x;
    var pelvis_y = frame.people[0].joints[0].position.y;
    var pelvis_z = frame.people[0].joints[0].position.z;
    var naval_x = (frame.people[0].joints[1].position.x - pelvis_x) * -1;
    var naval_y = (frame.people[0].joints[1].position.y - pelvis_y) * -1;
    var naval_z = (frame.people[0].joints[1].position.z - pelvis_z) * -1;

    //look at naval values while still vs while in motion when testing in front of screen

    if (left_wrist_z < 100) {
      //how to check for time?
      //when still? NAVIGATE TO INSTRUCTIONSPAGE***
      return command;
    }
    else{
      //when in movement
      return null;
    }

  }
};

//   get_left_wrist_command: function (frame) {
//     var command = null;
//     if (frame.people.length < 1) {
//       return command;
//     }

//     // Normalize by subtracting the root (pelvis) joint coordinates
//     var pelvis_x = frame.people[0].joints[0].position.x;
//     var pelvis_y = frame.people[0].joints[0].position.y;
//     var pelvis_z = frame.people[0].joints[0].position.z;
//     var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
//     var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
//     var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;

//     if (left_wrist_z < 100) {
//       return command;
//     }

//     if (left_wrist_x < 200 && left_wrist_x > -200) {
//       if (left_wrist_y > 500) {
//         command = 73; // UP
//       } else if (left_wrist_y < 100) {
//         command = 75; // DOWN
//       }
//     } else if (left_wrist_y < 500 && left_wrist_y > 100) {
//       if (left_wrist_x > 200) {
//         command = 76; // RIGHT
//       } else if (left_wrist_x < -200) {
//         command = 74; // LEFT
//       }
//     }
//     return command;
//   }
// };

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


let x, y, x1, y1, x2, y2;

function setup() {
  let canvas = createCanvas(windowWidth/2, windowHeight);

  canvas.parent("canvas-container");
  frameRate(3);
  stroke(255);
  strokeWeight(2);

  scoreElem = createDiv('Score = 0');
  scoreElem.style = ('color', '#ffffff');
  scoreElem.parent("nav-bar");
  scoreElem.id = 'score';

  test_button = createP("Test");
  test_button.parent(canvas);
  test_button.style('background-color', '#ffffff');
  test_button.position(windowWidth/5.58, windowHeight/1.449);

  x = windowWidth/4;
  x1 = windowWidth/4;
  y = windowHeight/2;
  y1 = windowHeight/2;
  x2 = windowWidth/4;
  y2 = windowHeight/2;

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
    // background('#69cceb');

    // ellipse(x, y, 100);
    // // ellipse(x2, y2, 50, 50);
    // ellipse(x1, y1, 50);
    // ellipse(x2, y2, 150);

    // x = x + random(-10, 10);
    // y = y - 10;
    // if (y < 0){
    //   y = windowHeight;
    // }

    // x1 = x1 + random(-50, 50);
    // y1 = y1 - 3;
    // if (y1 < 0){
    //   y1 = windowHeight;
    // }


    // x2 = x2 + random(-50, 50);
    // y2 = y2 - 3;
    // if (y2 < 0){
    //   y2 = windowHeight;
    // }
    // ellipse(windowWidth/6, windowHeight/4, 100, 100);
    // ellipse(windowWidth/8, windowHeight/9, 50, 50);
    // ellipse(windowWidth/2, windowHeight/2, 200, 200);
    // ellipse(windowWidth/8, windowHeight/2, 75, 75);
    // ellipse(windowWidth/3, windowHeight/1.1, 50, 50);
    // ellipse(windowWidth/9, windowHeight/1.3, 20, 20);
    // ellipse(10, windowHeight/1.1, 130, 130);
    // ellipse(30, 50, 80, 80);
    // ellipse(500, 20, 150, 150);

    
    // start_button_shape = ellipse(windowWidth/4, windowHeight/1.5, 270, 135);
    // textSize(40);
    // stroke('#ffffff');
    // textAlign(LEFT);
    // text("Start Game", windowWidth/5.58, windowHeight/1.449);

    // textSize(50);
    // noStroke();
    // textAlign(CENTER);
    // // fill(128 + sin(frameCount*0.5) * 128);
    // //fill(128 + sin(frameCount*0.1) * 128);
    // text("Test your reaction time and take your residential college to the top!", 80, 130, windowHeight/1.5, windowWidth);




  }
