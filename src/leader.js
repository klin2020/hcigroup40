var leader_scene = {
    preload: preload,
    create: create_leader,
    update: update_leader,
};

function sortLeaderboard(){
  colleges.sort(function(a, b){return b.score-a.score});
}

function create_leader(){
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
  sortLeaderboard();
  text0 = this.add.text(width/2+250, 150, "Leaderboard",{ fontSize: 24 }).setOrigin(0.5,0.5);
  // show the top 3 colleges in the leaderboard, currently placeholders
  text1 = this.add.text(width/2+250, 200, "1. " + colleges[0].name + " " + colleges[0].score,{ fontSize: 24 }).setOrigin(0.5,0.5);
  text2 = this.add.text(width/2+250, 250, "2. " + colleges[1].name + " " + colleges[1].score,{ fontSize: 24 }).setOrigin(0.5,0.5);
  text3 = this.add.text(width/2+250, 300, "3. " + colleges[2].name + " " + colleges[2].score,{ fontSize: 24 }).setOrigin(0.5,0.5);
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

  initializePointers(this);
}

function update_leader(){
  updatePointers();
  let elapsedTime = timedEvent.getElapsedSeconds();

  leaderExitButtonSuper.update(elapsedTime);
  againSuper.update(elapsedTime);

  var graphics = this.add.graphics();
  //create new circle every second until time runs out
  if (parseInt(prevTime) != parseInt(elapsedTime)){
    // console.log(prevTime);

    //randomize position and size of circle
    let x = Phaser.Math.Between(0, width/2+50);
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
  checkInactive(elapsedTime, this);
}