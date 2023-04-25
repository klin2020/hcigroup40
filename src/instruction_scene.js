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

function create_instruction () {
  initializePointers(this);
  timedEvent.remove();

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
    "Hover to start",
    "Starting in ",
    '0xffffff',
    '0x808080',
  )

  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

  this.make.text({
      x: scale(50),
      y: scale(120),
      text: [
        "This is a one player game. You can use one hand or two hands.",
        "Hit as many circles as you can with your hands in 30 seconds to add to your residential college score!",
        "Hitting circles will gain you points. Hitting squares will lose you points.",
      ].join("\n\n"),
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
}