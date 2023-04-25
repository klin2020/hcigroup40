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
  timedEvent.remove();

  this.exitButtonSuper = makeExitButton(this);

  this.instructionButton = this.add.rectangle(width/2 + scale(300), scale(320), scale(200), scale(100), "0xffffff");
  this.instructionButtonText = this.add.text(0, 0, "Hover to start game", {
    font: 'bold ' + scale(15) + 'px Arial',
    fill: 'black',
    wordWrap: {width: scale(600)},
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
        "Try moving your hands around and see the yellow dots move!"
      ].join("\n\n"),
      style: {
          font: 'bold ' + scale(25) + 'px Arial',
          fill: 'white',
          wordWrap: {width: scale(600)},
          align: "left"
      }
  });
  initializePointers(this);
}



function update_instruction () {
  updatePointers();
  let elapsedTime = timedEvent.getElapsedSeconds();
  //INSTRUCTION BUTTON: hover over Start Game for 2 seconds
  this.instructionButtonSuper.update(elapsedTime);
  //EXIT BUTTON: hover over Exit for 2 seconds
  this.exitButtonSuper.update(elapsedTime);
  checkInactive(elapsedTime, this);
}