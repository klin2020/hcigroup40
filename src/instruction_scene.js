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
  
    pointer = this.add.circle(0, 0, 10, '0xff0000');
    leftPointer = this.add.circle(0, 0, 10, '0x00ff00');

  }
  
  function create_instruction () {
    timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

    this.make.text({
        x: width/2 - 260,
        y: 50,
        text: "This is a one player game.",
        origin: {x: 0.5, y: 0.5},
        style: {
            font: 'bold 30px Arial',
            fill: 'white',
            // wordWrap: {width: 600},
            align: "left"
        }
    });
    this.make.text({
      x: width/2 - 150,
      y: 135,
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
      x: width/2 - 140,
      y: 250,
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
    y: 350,
    text: "Point at the rectangle in the top left corner to exit the game at any time",
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

  
    if (hand_x) {
      //update hand points
      updatePointer(pointer, width - hand_x, hand_y);
      updatePointer(leftPointer, width - leftHand_x, leftHand_y);
  

    }
  }
  
  function updatePointer(p, x, y) {
    p.x = x;
    p.y = y;
  }
  
