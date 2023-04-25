var start_scene = {
  preload: preload,
  create: create_start,
  update: update_start,
};


var timedEvent;
var timeLimitStart = 0;
var prevTime = 0;
var arrIndex = 0;
var shapeArr = new Array(10);

function preload(){
  this.load.setBaseURL('http://labs.phaser.io');
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;
}

function create_start () {
  this.startButton = this.add.rectangle(width/2 + 300, height - 75, 200, 100, "0xffffff");
  this.startButton.setInteractive();
  this.startButtonText = this.add.text(0, 0, "Hover to start", {
    font: 'bold 20px Arial',
    fill: 'black',
    wordWrap: {width: 600},
    align: "left"
  });
  Phaser.Display.Align.In.Center(this.startButtonText, this.startButton);
  this.startButtonSuper = activateButton(
    this.startButton,
    this.startButtonText,
    3,
    () => {
      userLocked = true; //user playing game is locked in
      this.scene.start('instruction_scene');
    },
    'Hover to start',
    'Starting in ',
    '0xffffff',
    '0x808080'
  )

  userInactive = false;
  if (timedEvent) {
    timedEvent.remove();
  }
  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
  // initialize score
  score = 0;
  this.make.text({
    x: width/2 - 160 ,
    y: 100,
    text: 'Test your reaction time in 30 seconds and take your residential college to the top!',
    origin: { x: 0.5, y: 0.5},
    style: {
      font: 'bold 40px Arial',
      fill: 'white',
      wordWrap: {width: 600},
      align: "left"
    }
  });

  this.make.text({
    x: width/2 - 150,
    y: height - 50,
    text: 'Raise your hand to the rectangle to begin',
    origin: { x: 0.5, y: 0.5},
    style: {
      font: 'bold 30px Arial',
      fill: 'white',
      wordWrap: {width: 600},
      align: "left"
    }
  });

  // reset inactive issues
  resetInactive();
  initializePointers(this);
}

function update_start () {
  updatePointers();

  // update timer
  let elapsedTime = timedEvent.getElapsedSeconds();

  var graphics = this.add.graphics();
  //create new circle every second until time runs out
  if (parseInt(prevTime) != parseInt(elapsedTime)){
    // console.log(prevTime);

    //randomize position and size of circle
    let x = Phaser.Math.Between(0, width);
    let y = Phaser.Math.Between(height-350, height - 175);
    let size = Phaser.Math.Between(10, 50);

    //randomize color
    let color = new Phaser.Display.Color();
    color = color.random();
    let color32 = Phaser.Display.Color.GetColor32(color["r"], color["g"], color["b"], color["a"]);

    //create circle
    let shape = graphics.fillStyle(color32);
    if(parseInt(elapsedTime)%2 == 0){
      shape = graphics.fillRect(x, y, size, size);
    }
    else{
      shape = graphics.fillCircle(x, y, size);
    }

    //add circle to array
    shapeArr[arrIndex] = shape;
    arrIndex++;


    prevTime =  elapsedTime; //update second
  }

  //reset circles every 10 seconds
  if (parseInt(elapsedTime) != 0 && parseInt(elapsedTime) % 10 == 0){
    //destroy all objects in the array
    // console.log("10 seconds passed");
    for(var i = 0; i < 10; i++){
      shapeArr[i].destroy();
    }
    arrIndex = 0;
  }
  //hover over Start for 2 seconds
  this.startButtonSuper.update(elapsedTime);
}