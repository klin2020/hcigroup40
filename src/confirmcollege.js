var confirmcollege_scene = {
    preload: preload,
    create: create_confirmcollege,
    update: update_confirmcollege,
};

var colleges = [
  { name: "Branford", score: 0 },
  { name: "Berkeley", score: 0 },
  { name: "Davenport", score: 0 },
  { name: "Franklin", score: 0 },
  { name: "Grace Hopper", score: 0 },
  { name: "Jonathan Edwards", score: 0 },
  { name: "Morse", score: 0 },
  { name: "Pauli Murray", score: 0 },
  { name: "Pierson", score: 0 },
  { name: "Saybrook", score: 0 },
  { name: "Silliman", score: 0 },
  { name: "Ezra Stiles", score: 0 },
  { name: "Timothy Dwight", score: 0 },
  { name: "Trumbull", score: 0 },
  ];

function create_confirmcollege(){
  this.exitButton = this.add.rectangle(75, 50, 100, 50, "0xffffff");
  this.exitButtonText = this.add.text(0, 0, "Hover to exit", {
    font: 'bold 15px Arial',
    fill: 'black',
    wordWrap: {width: 600},
    align: "left"
  });
  Phaser.Display.Align.In.Center(this.exitButtonText, this.exitButton);
  this.exitButtonSuper = activateButton(
    this.exitButton,
    this.exitButtonText,
    3,
    () => {
      this.scene.start('start_scene');
    },
    "Hover to exit",
    "Exiting in ",
    '0xffffff',
    '0x808080'
  )

  this.text0 = this.add.text(width/2, 100, "Confirm that you are adding your",{ fontSize: 24 }).setOrigin(0.5,0.5);
  this.text1 = this.add.text(width/2, 150, "score of " + score.toString() + " to " + colleges[collegeName].name,{ fontSize: 24 }).setOrigin(0.5,0.5);
  this.accept = this.add.rectangle(width/2 - 200, 250, 250, 40, '0x004b63');
  this.acceptText = this.add.text(width/2 - 200, 250, "Yes, add score",{ fontSize: 18 }).setOrigin(0.5,0.5);
  this.accept.setInteractive();
  this.goBack = this.add.rectangle(width/2 + 200, 250, 250, 40, '0x540133');
  this.goBackText = this.add.text(width/2 + 200, 250, "No, choose another",{ fontSize: 18 }).setOrigin(0.5,0.5);
  this.goBack.setInteractive();

  // game.load.image("berk", "../images/berk.png");
  // game.add.sprite(100, 100, "berk");

  this.accept.on('pointerdown', () => {
      // add score to college
      console.log(colleges[collegeName].name + " " + colleges[collegeName].score);
      colleges[collegeName].score += score;
      console.log(colleges[collegeName].name + " " + colleges[collegeName].score);
      //upload to leaderboard...
      this.scene.start('leader_scene', leader_scene);
  });
  this.goBack.on('pointerdown', () => {
    console.log(colleges[collegeName].name + " " + colleges[collegeName].score);
    collegeSelected = false;
    collegeName = null;
    this.scene.start('gameover_scene', gameover_scene);
  });

  if (timedEvent) {
    timedEvent.remove();
  }

  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

  this.acceptSuper = activateButton(this.accept, this.acceptText, 3, () => {
    console.log(colleges[collegeName].name + " " + colleges[collegeName].score);
    colleges[collegeName].score += score;
    console.log(colleges[collegeName].name + " " + colleges[collegeName].score);
    //upload to leaderboard...
    this.scene.start('leader_scene', leader_scene);
  }, "Yes, add score", "Adding in ", '0x00bfff', '0x004b63');
  this.goBackSuper = activateButton(this.goBack, this.goBackText, 3, () => {
    console.log(colleges[collegeName].name + " " + colleges[collegeName].score);
    collegeSelected = false;
    collegeName = null;
    this.scene.start('gameover_scene', gameover_scene);
  }, "No, choose another", "Back in ", '0xff0099', '0x540133');
  initializePointers(this);
}

function update_confirmcollege(){
  updatePointers();
  // 90 seconds to choose a college or reset
  let elapsedTime = timedEvent.getElapsedSeconds();

  this.exitButtonSuper.update(elapsedTime);
  this.acceptSuper.update(elapsedTime);
  this.goBackSuper.update(elapsedTime);
}