var instruction_scene = {
  preload: preload,
  create: create_instruction,
  update: update_instruction,
};

var start_time;
var timeText;
var scoreText;
var score;
var timeLeft;

function preload () {
this.load.setBaseURL('http://labs.phaser.io');
width = this.sys.game.canvas.width;
height = this.sys.game.canvas.height;

// startButton = this.add.rectangle(width/2 + 300, height - 75, 200, 100, "0xffffff");
this.instructionExitButton = this.add.rectangle(75, 50, 100, 50, "0xffffff");
this.instructionExitButtonText = this.add.text(0, 0, "Hover to exit", {
  font: 'bold 15px Arial',
  fill: 'black',
  wordWrap: {width: 600},
  align: "left"
});
Phaser.Display.Align.In.Center(this.instructionExitButtonText, this.instructionExitButton);
this.instructionExitButtonSuper = activateButton(
  this.instructionExitButton,
  this.instructionExitButtonText,
  3,
  () => {
    this.scene.start('start_scene');
  },
  "Hover to exit",
  "Exiting in ",
  '0xffffff',
  '0x808080'
)

this.instructionButton = this.add.rectangle(width/2 + 300, 320, 200, 100, "0xffffff");
this.instructionButtonText = this.add.text(0, 0, "Hover to start game", {
  font: 'bold 15px Arial',
  fill: 'black',
  wordWrap: {width: 600},
  align: "left"
});
Phaser.Display.Align.In.Center(this.instructionButtonText, this.instructionButton);
this.instructionButtonSuper = activateButton(
  this.instructionButton,
  this.instructionButtonText,
  3,
  () => {
    userLocked = true;
    this.scene.start('game_scene');
  },
  "Hover to start game",
  "Starting in ",
  '0xffffff',
  '0x808080'
)
}

var instructionClickTime = null;
var instructionVerifyTime = 2;

var instructionToExitClickTime = null;
var instructionToExitVerifyTime = 2;

// var dummyTimer = 1;

function create_instruction () {
pointer = this.add.circle(-50, 0, 10, '0xff0000');
leftPointer = this.add.circle(-50, 0, 10, '0x00ff00');
timedEvent.remove();
timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

this.make.text({
    x: width/2 - 170,
    y: 120,
    text: "This is a one player game. You can use one hand or two hands.",
    origin: {x: 0.5, y: 0.5},
    style: {
        font: 'bold 30px Arial',
        fill: 'white',
        wordWrap: {width: 600},
        align: "left"
    }
});

this.make.text({
  //165
  x: width/2 - 165,
  y: 220,
  text: "Hit as many circles as you can with your hands in 30 seconds to add to your residential college score!",
  origin: {x: 0.5, y: 0.5},
  style: {
      font: 'bold 30px Arial',
      fill: 'white',
      wordWrap: {width: 650},
      align: "left"
  }
});

this.make.text({
  x: width/2 - 155,
  y: 320,
  text: "Hitting circles will gain you points. Hitting squares will lose you points.",
  origin: {x: 0.5, y: 0.5},
  style: {
      font: 'bold 30px Arial',
      fill: 'white',
      wordWrap: {width: 650},
      align: "left"
  }
});

this.make.text({
  x: width/2 - 180,
  y: 400,
  text: "Hover over the rectangle in the top left corner to exit the game at any time.",
  origin: {x: 0.5, y: 0.5},
  style: {
      font: 'bold 30px Arial',
      fill: 'white',
      wordWrap: {width: 600},
      align: "left"
  }
});

this.make.text({
  x: width/2 - 175,
  y: 490,
  text: "Hover over the rectangle in on the right to start the game!",
  origin: {x: 0.5, y: 0.5},
  style: {
      font: 'bold 30px Arial',
      fill: 'white',
      wordWrap: {width: 600},
      align: "left"
  }
});
}



function update_instruction () {
  updatePointers();
  let elapsedTime = timedEvent.getElapsedSeconds();

//INSTRUCTION BUTTON: hover over Start Game for 2 seconds
this.instructionButtonSuper.update(elapsedTime);

//EXIT BUTTON: hover over Exit for 2 seconds
this.instructionExitButtonSuper.update(elapsedTime);


checkInactive(elapsedTime, this);

// if(dummyTimer == 1){
//   this.scene.start('game_scene');
// }
}



function updatePointers() {
if (hand_x) {
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);
}
}
function updatePointer(p, x, y) {
p.x = x;
p.y = y;
}

