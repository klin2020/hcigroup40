var instruction_scene = {
    preload: preload,
    create: create_instruction,
    update: update_instruction,
  };
  
  var width;
  var height;
  var start_time;
  var timeText;
  var scoreText;
  var score;
  var timedEvent;
  var timeLimit = 1000;
  var pointer;
  var timeLeft;
  
  function preload () {
    this.load.setBaseURL('http://labs.phaser.io');
    width = this.sys.game.canvas.width;
    height = this.sys.game.canvas.height;
  

    // startButton = this.add.rectangle(width/2 + 300, height - 75, 200, 100, "0xffffff");
    instructionExitButton = this.add.rectangle(75, 50, 100, 50, "0xffffff");
    this.make.text({
      x: 75,
      y: 50,
      text: "Exit",
      origin: {x: 0.5, y: 0.5},
      style: {
          font: 'bold 30px Arial',
          fill: 'black',
          wordWrap: {width: 600},
          align: "left"
      }
    }); 
  
    instructionButton = this.add.rectangle(width/2 + 300, 320, 200, 100, "0xffffff");
    this.make.text({
      x: width/2 + 300,
      y: 320,
      text: "Start Game",
      origin: {x: 0.5, y: 0.5},
      style: {
          font: 'bold 30px Arial',
          fill: 'black',
          wordWrap: {width: 600},
          align: "left"
      }
    }); 
  }
  
var instructionClickTime = null;
var instructionVerifyTime = 2;

var instructionToExitClickTime = null;
var instructionToExitVerifyTime = 2;

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
    let elapsedTime = timedEvent.getElapsedSeconds();

  
  if (hand_x || leftHand_x) {
      //update hand points
      updatePointer(pointer, width - hand_x, hand_y);
      updatePointer(leftPointer, width - leftHand_x, leftHand_y);
  

    }

  //hover over Start Game for 3 seconds
  if (Phaser.Geom.Intersects.CircleToRectangle(instructionButton, pointer) 
  || Phaser.Geom.Intersects.CircleToRectangle(instructionButton, leftPointer)) {
      if (instructionClickTime == null) {
        instructionClickTime = elapsedTime;
      } 
      else {
        console.log(elapsedTime - instructionClickTime);
        if (elapsedTime - instructionClickTime > instructionVerifyTime) {
          this.scene.start('game_scene');
        }
      }
  } 
  else {
    instructionClickTime = null;
  }

  //hover over Exit for 3 seconds
  if (Phaser.Geom.Intersects.CircleToRectangle(instructionExitButton, pointer) 
  || Phaser.Geom.Intersects.CircleToRectangle(instructionExitButton, leftPointer)) {
    if (instructionToExitClickTime == null) {
      instructionToExitClickTime = elapsedTime;
    } 
    else {
        console.log(elapsedTime - instructionToExitClickTime);
        if (elapsedTime - instructionToExitClickTime > instructionToExitVerifyTime) {
          this.scene.start('start_scene');
        }
    }
  } 
  else {
    instructionToExitClickTime = null;
  }
  
  //if nothing happens for 2 minutes, return to start scene
  if (elapsedTime == 120){
    this.scene.start('start_scene');
  }
}


  
  function updatePointers() {
    if (hand_x) {
      // console.log('updating hand');
      // console.log(hand_x);
      // console.log(hand_y);
      updatePointer(pointer, width - hand_x, hand_y);
      updatePointer(leftPointer, width - leftHand_x, leftHand_y);
    }
  }
  function updatePointer(p, x, y) {
    p.x = x;
    p.y = y;
  }
  
