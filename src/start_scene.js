var start_scene = {
  preload: preload,
  create: create_start,
  update: update_start,
};

function create_start () {
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;

  // timeText = this.add.text(150, 20, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  // scoreText = this.add.text(700, 20, "",{ fontSize: 24 }).setOrigin(0.5,0.5);
  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
  score = 0;
  this.make.text({
    x: width/2,
    y: 100,
    text: 'Test your reaction time and take your residential college to the top!',
    origin: { x: 0.5, y: 0.5},
    style: {
      font: 'bold 40px Arial',
      fill: 'white',
      wordWrap: {width: 600},
      align: "center"
    }
  });

  this.make.text({
    x: width/2,
    y: height - 100,
    text: 'Stand still in front of screen for 3 seconds to begin',
    origin: { x: 0.5, y: 0.5},
    style: {
      font: 'bold 25px Arial',
      fill: 'white',
      wordWrap: {width: 700},
      align: "center"
    }
  });

  pointer = this.add.circle(0, 0, 10, '0xff0000');
}

var oldTime = 0;

function update_start () {
  // console.log('updating');
  updatePointers();

  // update timer
  let elapsedTime = timedEvent.getElapsedSeconds();
  let timeLeft = timeLimit - elapsedTime;

  //display time and score
  // timeText.setText('Time Remaining: ' + Math.floor(timeLeft).toString());
  // scoreText.setText('Score: ' + score.toString());


  //create new circle every second until time runs out
  if (parseInt(oldTime) != parseInt(timeLeft)){
    let x = Phaser.Math.Between(0, width);
    let y = Phaser.Math.Between(height-350, height - 175);
    let size = Phaser.Math.Between(10, 50);
    let color = new Phaser.Display.Color();
    color = color.random();
    let shape = this.add.circle(x, y, size, color.color);
    shape = this.add.group();

    // shape = this.add.circle(x, y, size, '0x00bfff');
    oldTime = timeLeft;
  }

  if (timeLeft <= 0) {
    //reset circles, loop
    this.scene.start('game_scene');
  }
}

function updatePointers(p) {
  if (hand_x) {
    // console.log('updating hand');
    // console.log(hand_x);
    // console.log(hand_y);
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);
  }
}