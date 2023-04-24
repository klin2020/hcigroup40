var leader_scene = {
    preload: preload,
    create: create_leader,
    update: update_leader,
};

function preload () {
    this.load.setBaseURL('http://labs.phaser.io');
    width = this.sys.game.canvas.width;
    height = this.sys.game.canvas.height;
  
    pointer = this.add.circle(0, 0, 10, '0xff0000');
    leftPointer = this.add.circle(0, 0, 10, '0x00ff00');
    // this.load.image('sky', 'assets/skies/space3.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');

    leaderExitButton = this.add.rectangle(75, 50, 100, 50, "0xffffff");
leaderExitButtonText = this.add.text(0, 0, "Hover to exit", {
  font: 'bold 15px Arial',
  fill: 'black',
  wordWrap: {width: 600},
  align: "left"
});
Phaser.Display.Align.In.Center(leaderExitButtonText, leaderExitButton);
leaderExitButton.setInteractive();
leaderExitButton.on('pointerdown', () => {
  score = 0;
  collegeName = null;
  // userLocked = false;
  collegeSelected = false;
  timedEvent.remove();
  this.scene.start('start_scene');
});
leaderExitButtonSuper = activateButton(
  leaderExitButton,
  leaderExitButtonText,
  3,
  () => {
    score = 0;
    // other reset stuff...
    collegeName = null;
    // userLocked = false;
    collegeSelected = false;
    timedEvent.remove();
    this.scene.start('start_scene');
  },
  "Hover to exit",
  "Exiting in ",
  '0xffffff',
  '0x808080'
);
  }

function create_leader(){
    text0 = this.add.text(width/2+250, 150, "Leaderboard",{ fontSize: 24 }).setOrigin(0.5,0.5);
    // show the top 3 colleges in the leaderboard
    text1 = this.add.text(width/2+250, 200, "1. " + db[0].name + " " + db[0].score,{ fontSize: 24 }).setOrigin(0.5,0.5);
    text2 = this.add.text(width/2+250, 250, "2. " + db[1].name + " " + db[1].score,{ fontSize: 24 }).setOrigin(0.5,0.5);
    text3 = this.add.text(width/2+250, 300, "3. " + db[2].name + " " + db[2].score,{ fontSize: 24 }).setOrigin(0.5,0.5);
    playagain = this.add.rectangle(width/2+250, 400, 200, 40, '0x065929');
    playagain.setInteractive();
    playtext = this.add.text(width/2+250, 400, "Play Again",{ fontSize: 18 }).setOrigin(0.5,0.5);

    if (timedEvent) {
        timedEvent.remove();
      }
      
    timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
    
    againSuper = activateButton(playagain, playtext, 3, () => {
        score = 0;
        // other reset stuff...
        collegeName = null;
        //userLocked = false;
        collegeSelected = false;
        timedEvent.remove();
        this.scene.start('start_scene');
    }, "Play Again", "Play Again in ", '0x00bfff', '0x004b63');

    playagain.on('pointerdown', () => {
        score = 0;
        // other reset stuff...
        collegeName = null;
        //userLocked = false;
        collegeSelected = false;
        this.scene.start('start_scene');
    });
    
    this.make.text({
        x: width/2,
        y: 100,
        text: 'Thanks for playing!',
        origin: { x: 0.5, y: 0.5},
        style: {
          font: 'bold 40px Arial',
          fill: 'white',
          wordWrap: {width: 600},
          align: "left"
        }
      });
    
    //   this.make.text({
    //     x: width/2 - 150,
    //     y: height - 50,
    //     text: 'Raise your hand to the rectangle to begin',
    //     origin: { x: 0.5, y: 0.5},
    //     style: {
    //       font: 'bold 30px Arial',
    //       fill: 'white',
    //       wordWrap: {width: 600},
    //       align: "left"
    //     }
    //   });
}

function update_leader(){

    let elapsedTime = timedEvent.getElapsedSeconds();
    
    updatePointers();

    if (hand_x) {
      // console.log('updating hand');
      // console.log(hand_x);
      // console.log(hand_y);
      updatePointer(pointer, width - hand_x, hand_y);
      updatePointer(leftPointer, width - leftHand_x, leftHand_y);
    }

    leaderExitButtonSuper.update(elapsedTime);
    againSuper.update(elapsedTime);

    var graphics = this.add.graphics();
    //create new circle every second until time runs out
    if (parseInt(prevTime) != parseInt(elapsedTime)){
      // console.log(prevTime);

      //randomize position and size of circle
      let x = Phaser.Math.Between(0, width/2+150);
      let y = Phaser.Math.Between(height-350, height - 175);
      let size = Phaser.Math.Between(10, 50);

      //randomize color
      let color = new Phaser.Display.Color();
      color = color.random();
      let color32 = Phaser.Display.Color.GetColor32(color["r"], color["g"], color["b"], color["a"]);

      //create circle
      let shape = graphics.fillStyle(color32);
      shape = graphics.fillCircle(x, y, size);

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
}