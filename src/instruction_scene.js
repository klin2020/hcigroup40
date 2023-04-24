var instruction_scene = {
    preload: preload,
    create: create_instruction,
    update: update_instruction,
};

var start_time;
var timeText;
var scoreText;
var score;
var pointer;
var timeLeft;

function preload () {
  this.load.setBaseURL('http://labs.phaser.io');
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;


  // startButton = this.add.rectangle(width/2 + 300, height - 75, 200, 100, "0xffffff");
  instructionExitButton = this.add.rectangle(75, 50, 100, 50, "0xffffff");
  this.instructionExitButtonText = this.add.text(0, 0, "Hover to exit", {
    font: 'bold 15px Arial',
    fill: 'black',
    wordWrap: {width: 600},
    align: "left"
  });
  Phaser.Display.Align.In.Center(this.instructionExitButtonText, instructionExitButton);

  instructionButton = this.add.rectangle(width/2 + 300, 320, 200, 100, "0xffffff");
  this.instructionButtonText = this.add.text(0, 0, "Hover to start game", {
    font: 'bold 15px Arial',
    fill: 'black',
    wordWrap: {width: 600},
    align: "left"
  });
  Phaser.Display.Align.In.Center(this.instructionButtonText, instructionButton);

}

var instructionClickTime = null;
var instructionVerifyTime = 2;

var instructionToExitClickTime = null;
var instructionToExitVerifyTime = 2;

// var dummyTimer = 1;

function create_instruction () {
  pointer = this.add.circle(0, 0, 10, '0xff0000');
  leftPointer = this.add.circle(0, 0, 10, '0x00ff00');
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
    text: "Hit as many circles as you can with your hands in 90 seconds to add to your residential college score!",
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
    text: "Hitting smaller circles will gain you more points than hitting larger circles.",
    origin: {x: 0.5, y: 0.5},
    style: {
        font: 'bold 30px Arial',
        fill: 'white',
        wordWrap: {width: 650},
        align: "left"
    }
  });

  this.make.text({
    x: width/2 - 200,
    y: 400,
    text: "Point at the rectangle in the top left corner to exit the game at any time.",
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
    text: "Point at the rectangle in on the right to start the game!",
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
  if (Phaser.Geom.Intersects.CircleToRectangle(instructionButton, pointer)
  || Phaser.Geom.Intersects.CircleToRectangle(instructionButton, leftPointer)) {
    instructionButton.fillColor = '0x808080';
    if (instructionClickTime == null) {
        instructionClickTime = elapsedTime;
    }
    else {
      const timeToGame = instructionVerifyTime - (elapsedTime - instructionClickTime);
      // console.log(elapsedTime - instructionClickTime);
      if (timeToGame <= 0){
        userLocked = true; //**NEED HERE?
        this.scene.start('game_scene');
      }
      this.instructionButtonText.setText('Starting in ' + Math.ceil(timeToGame));
    }
  }
  else {
    //reset hover time
    instructionClickTime = null;
    instructionButton.fillColor = '0xffffff';
    this.instructionButtonText.setText("Hover to start game");
  }

  //EXIT BUTTON: hover over Exit for 2 seconds
  if (Phaser.Geom.Intersects.CircleToRectangle(instructionExitButton, pointer)
  || Phaser.Geom.Intersects.CircleToRectangle(instructionExitButton, leftPointer)) {
    instructionExitButton.fillColor = '0x808080';
    if (instructionToExitClickTime == null) {
      instructionToExitClickTime = elapsedTime;
    }
    else {
      const timeToHomeScreen = instructionToExitVerifyTime - (elapsedTime - instructionToExitClickTime);
        // console.log(elapsedTime - instructionToExitClickTime);
        if(timeToHomeScreen <= 0){
          userLocked = true;
          this.scene.start('start_scene');
        }
        this.instructionExitButtonText.setText('Exiting in ' + Math.ceil(timeToHomeScreen));
        // if (elapsedTime - instructionToExitClickTime > instructionToExitVerifyTime) {
        //   this.scene.start('start_scene');
        // }
    }
  }
  else {
    instructionToExitClickTime = null;
    instructionExitButton.fillColor = '0xffffff';
    this.instructionExitButtonText.setText("Hover to exit");
  }


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

