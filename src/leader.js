var leader_scene = {
    preload: preload,
    create: create_leader,
    update: update_leader,
};

function sortLeaderboard(){
  colleges.sort(function(a, b){return b.score-a.score});
}

function create_leader(){
  this.exitButtonSuper = makeExitButton(this);
  sortLeaderboard();
  text0 = this.add.text(width/2+scale(250), scale(150), "Leaderboard",{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  // show the top 3 colleges in the leaderboard, currently placeholders
  text1 = this.add.text(width/2+scale(250), scale(200), "1. " + colleges[0].name + " " + colleges[0].score,{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  text2 = this.add.text(width/2+scale(250), scale(250), "2. " + colleges[1].name + " " + colleges[1].score,{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  text3 = this.add.text(width/2+scale(250), scale(300), "3. " + colleges[2].name + " " + colleges[2].score,{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  playagain = this.add.rectangle(width/2+scale(250), scale(400), scale(200), scale(40), '0x065929');
  playagain.setInteractive();
  playtext = this.add.text(width/2+scale(250), scale(400), "Play Again",{ fontSize: scale(18) }).setOrigin(0.5,0.5);

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
        fontSize: scale(40),
        fontStyle: 'bold',
        fill: 'white',
        align: "left"
      }
    });

  initializePointers(this);
}

function update_leader(){
  updatePointers();
  let elapsedTime = timedEvent.getElapsedSeconds();

  this.exitButtonSuper.update(elapsedTime);
  againSuper.update(elapsedTime);

  var graphics = this.add.graphics();
  //create new circle every second until time runs out
  if (parseInt(prevTime) != parseInt(elapsedTime)){
    // console.log(prevTime);

    //randomize position and size of circle
    let x = Phaser.Math.Between(0, width/2+scale(50));
    let y = Phaser.Math.Between(height-scale(350), height - scale(175));
    let size = Phaser.Math.Between(scale(10), scale(50));

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