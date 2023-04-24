var gameover_scene = {
  preload: preload,
  create: create_gameover,
  update: update_gameover,
};

function preload () {
  this.load.setBaseURL('http://labs.phaser.io');
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;

  pointer = this.add.circle(0, 0, 10, '0xff0000');
  leftPointer = this.add.circle(0, 0, 10, '0x00ff00');

  overExitButton = this.add.rectangle(75, 50, 100, 50, "0xffffff");
overExitButtonText = this.add.text(0, 0, "Hover to exit", {
  font: 'bold 15px Arial',
  fill: 'black',
  wordWrap: {width: 600},
  align: "left"
});
Phaser.Display.Align.In.Center(overExitButtonText, overExitButton);
overExitButton.setInteractive();
overExitButton.on('pointerdown', () => {
  score = 0;
  collegeName = null;
  // userLocked = false;
  collegeSelected = false;
  this.scene.start('start_scene');
});
overExitButtonSuper = activateButton(
  overExitButton,
  overExitButtonText,
  3,
  () => {
    score = 0;
    // other reset stuff...
    collegeName = null;
    // userLocked = false;
    // collegeSelected = false;
    this.scene.start('start_scene');
  },
  "Hover to exit",
  "Exiting in ",
  '0xffffff',
  '0x808080'
);
  // this.load.image('sky', 'assets/skies/space3.png');
  // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  // this.load.image('red', 'assets/particles/red.png');
}

var width;
var start_time;
var collegeSelected = false;
var selectionTimer;
var collegeName;
var timedEvent;
var collegeClickTime = null;
var collegeVerifyTime = 3;

function create_gameover () {
  text0 = this.add.text(width/2, 99, "Thanks for Playing!" + " Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
  // text1 = this.add.text(width/2 - 200, height/2 + 50, " Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
  //text2 = this.add.text(width/2, 250, "Click to Play Again",{ fontSize: 24 }).setOrigin(0.5,0.5);
  text3 = this.add.text(width/2, 150, "Choose Your College To Add Your Score!",{ fontSize: 24 }).setOrigin(0.5,0.5);
  text33 = this.add.text(width/2, 200, "Hold your hand over your college for 3 seconds",{ fontSize: 24 }).setOrigin(0.5,0.5);
  rect4 = this.add.rectangle(width/2 - 250, 250, 250, 20, '0x00bfff');
  text4 = this.add.text(width/2 - 250, 250, "Branford",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect5 = this.add.rectangle(width/2 - 250, 290, 250, 20, '0x00bfff');
  text5 = this.add.text(width/2 - 250, 290, "Davenport",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect6 = this.add.rectangle(width/2 - 250, 330, 250, 20, '0x00bfff');
  text6 = this.add.text(width/2 - 250, 330, "Jonathan Edwards",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect7 = this.add.rectangle(width/2 - 250, 370, 250, 20, '0x00bfff');
  text7 = this.add.text(width/2 - 250, 370, "Pierson",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect8 = this.add.rectangle(width/2 - 250, 410, 250, 20, '0x00bfff');
  text8 = this.add.text(width/2 - 250, 410, "Saybrook",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect9 = this.add.rectangle(width/2 - 250, 450, 250, 20, '0x00bfff');
  text9 = this.add.text(width/2 - 250, 450, "Stiles",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect10 = this.add.rectangle(width/2 - 250, 490, 250, 20, '0x00bfff');
  text10 = this.add.text(width/2 - 250, 490, "Timothy Dwight",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect11 = this.add.rectangle(width/2 + 250, 250, 250, 20, '0x00bfff');
  text11 = this.add.text(width/2 + 250, 250, "Trumbull",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect12 = this.add.rectangle(width/2 + 250, 290, 250, 20, '0x00bfff');
  text12 = this.add.text(width/2 + 250, 290, "Grace Hopper",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect13 = this.add.rectangle(width/2 + 250, 330, 250, 20, '0x00bfff');
  text13 = this.add.text(width/2 + 250, 330, "Pauli Murray",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect14 = this.add.rectangle(width/2 + 250, 370, 250, 20, '0x00bfff');
  text14 = this.add.text(width/2 + 250, 370, "Silliman",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect15 = this.add.rectangle(width/2 + 250, 410, 250, 20, '0x00bfff');
  text15 = this.add.text(width/2 + 250, 410, "Franklin",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect16 = this.add.rectangle(width/2 + 250, 450, 250, 20, '0x00bfff');
  text16 = this.add.text(width/2 + 250, 450, "Morse",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect17 = this.add.rectangle(width/2 + 250, 490, 250, 20, '0x00bfff');
  text17 = this.add.text(width/2 + 250, 490, "Berkeley",{ fontSize: 18 }).setOrigin(0.5,0.5);
  

  // first half of colleges
  // for loop?
  if (timedEvent) {
    timedEvent.remove();
  }
  
  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

  rect4Super = activateButton(rect4, text4, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 0;
    this.scene.start('confirmcollege_scene');
  }, "Branford", "Branford in ", '0x00bfff', '0x004b63');
  rect5Super = activateButton(rect5, text5, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 2;
    this.scene.start('confirmcollege_scene');
  }, "Davenport", "Davenport in ", '0x00bfff', '0x004b63');
  rect6Super = activateButton(rect6, text6, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 5;
    this.scene.start('confirmcollege_scene');
  }, "Jonathan Edwards", "Jonathan Edwards in ", '0x00bfff', '0x004b63');
  rect7Super = activateButton(rect7, text7, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 8;
    this.scene.start('confirmcollege_scene');
  }, "Pierson", "Pierson in ", '0x00bfff', '0x004b63');
  rect8Super = activateButton(rect8, text8, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 9;
    this.scene.start('confirmcollege_scene');
  }, "Saybrook", "Saybrook in ", '0x00bfff', '0x004b63');
  rect9Super = activateButton(rect9, text9, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 11;
    this.scene.start('confirmcollege_scene');
  }, "Stiles", "Stiles in ", '0x00bfff', '0x004b63');
  rect10Super = activateButton(rect10, text10, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 12;
    this.scene.start('confirmcollege_scene');
  }, "Timothy Dwight", "Timothy Dwight in ", '0x00bfff', '0x004b63');
  rect11Super = activateButton(rect11, text11, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 13;
    this.scene.start('confirmcollege_scene');
  }, "Trumbull", "Trumbull in ", '0x00bfff', '0x004b63');
  rect12Super = activateButton(rect12, text12, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 4;
    this.scene.start('confirmcollege_scene');
  }, "Grace Hopper", "Grace Hopper in ", '0x00bfff', '0x004b63');
  rect13Super = activateButton(rect13, text13, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 7;
    this.scene.start('confirmcollege_scene');
  }, "Pauli Murray", "Pauli Murray in ", '0x00bfff', '0x004b63');
  rect14Super = activateButton(rect14, text14, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 10;
    this.scene.start('confirmcollege_scene');
  }, "Silliman", "Silliman in ", '0x00bfff', '0x004b63');
  rect15Super = activateButton(rect15, text15, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 3;
    this.scene.start('confirmcollege_scene');
  }, "Franklin", "Franklin in ", '0x00bfff', '0x004b63');
  rect16Super = activateButton(rect16, text16, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 6;
    this.scene.start('confirmcollege_scene');
  }, "Morse", "Morse in ", '0x00bfff', '0x004b63');
  rect17Super = activateButton(rect17, text17, 3, () => {
    collegeSelected = true; //user playing game is locked in
    collegeName = 1;
    this.scene.start('confirmcollege_scene');
  }, "Berkeley", "Berkeley in ", '0x00bfff', '0x004b63');

  // for on click testing purposes

  rect4.setInteractive();
  rect5.setInteractive();
  rect6.setInteractive();
  rect7.setInteractive();
  rect8.setInteractive();
  rect9.setInteractive();
  rect10.setInteractive();
  rect11.setInteractive();
  rect12.setInteractive();
  rect13.setInteractive();
  rect14.setInteractive();
  rect15.setInteractive();
  rect16.setInteractive();
  rect17.setInteractive();

  rect4.on('pointerdown', () =>
  {
    rect4.destroy();
    rect4.fillColor = '0x004b63';
    collegeSelected = true;
    collegeName = 0;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect5.on('pointerdown', () =>
  {
    rect5.destroy();
    collegeSelected = true;
    collegeName = 2;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect6.on('pointerdown', () =>
  {
    rect6.destroy();
    collegeSelected = true;
    collegeName = 5;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect7.on('pointerdown', () =>
  {
    rect7.destroy();
    collegeSelected = true;
    collegeName = 8;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect8.on('pointerdown', () =>
  {
    rect8.destroy();
    collegeSelected = true;
    collegeName = 9;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect9.on('pointerdown', () =>
  {
    rect9.destroy();
    collegeSelected = true;
    collegeName = 11;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect10.on('pointerdown', () =>
  {
    rect10.destroy();
    collegeSelected = true;
    collegeName = 12;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect11.on('pointerdown', () =>
  {
    rect11.destroy();
    collegeSelected = true;
    collegeName = 13;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect12.on('pointerdown', () =>
  {
    rect12.destroy();
    collegeSelected = true;
    collegeName = 4;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect13.on('pointerdown', () =>
  {
    rect13.destroy();
    collegeSelected = true;
    collegeName = 7;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect14.on('pointerdown', () =>
  {
    rect14.destroy();
    collegeSelected = true;
    collegeName = 10;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect15.on('pointerdown', () =>
  {
    rect15.destroy();
    collegeSelected = true;
    collegeName = 3;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect16.on('pointerdown', () =>
  {
    rect16.destroy();
    collegeSelected = true;
    collegeName = 6;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });
  rect17.on('pointerdown', () =>
  {
    this.rect17.destroy();
    collegeSelected = true;
    collegeName = 1;
    console.log("collegeSelected: " + collegeSelected);
    console.log("collegeName: " + collegeName);
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  });

}

function update_gameover () {
  updatePointers();

  let elapsedTime = timedEvent.getElapsedSeconds();

  // update timer
  // let elapsedTime = timedEvent.getElapsedSeconds();
  
  if (hand_x) {
    // console.log('updating hand');
    // console.log(hand_x);
    // console.log(hand_y);
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect4)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   //rect4.color = '0x00ff00';
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0) { // && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect4)
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = 0;
    //     collegeSelected = true;
    //   }
      
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect4) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect4)) {
    //   rect4.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     if (timeToStart <= 0) {
    //       collegeName = 0;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect4.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect5)) { // while loop?
    // //   console.log('TOUCHDOWN');
    // //   selectionTimer = 3;
    // //   let elapsedTimess = timedEventss.getElapsedSeconds();
    // //   let timeLeftss = selectionTimer - elapsedTimess;
    // //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect5)) {
    // //     //this.scene.start('confirmcollege_scene');
    // //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    // //     collegeName = "Davenport";
    // //     collegeSelected = true;
    // //   }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect5) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect5)) {
    //   rect5.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 2;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect5.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }
      
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect6) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect6)) {
    //   rect6.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 5;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect6.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect7) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect7)) {
    //   rect7.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 8;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect7.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect8) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect8)) {
    //   rect8.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 9;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect8.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect9) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect9)) {
    //   rect9.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 11;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect9.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect10) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect10)) {
    //   rect10.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 12;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect10.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect11) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect11)) {
    //   rect11.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 13;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect11.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect12) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect12)) {
    //   rect12.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 4;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect12.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect13) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect13)) {
    //   rect13.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 7;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect13.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect14) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect14)) {
    //   rect14.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 10;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect14.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect15) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect15)) {
    //   rect15.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 3;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect15.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect16) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect16)) {
    //   rect16.fillColor = '0x004b63';
    //   //let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   console.log(collegeClickTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 6;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect16.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }

    // rect17Super = activateButton(this.rect17, this.text17, 3, () => {
    //   collegeSelected = true; //user playing game is locked in
    //   this.scene.start('confirmcollege_scene');
    // }, text17, text17, '0x00bfff', '0x004b63');
    
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect17) ||
    // Phaser.Geom.Intersects.CircleToRectangle(leftPointer, rect17)) {
    //   rect17.fillColor = '0x004b63';
    //   let elapsedTime = timedEvent.getElapsedSeconds();
    //   console.log(elapsedTime);
    //   if (collegeClickTime == null) {
    //     collegeClickTime = elapsedTime;
    //   } else {
    //     const timeToStart = collegeVerifyTime - (elapsedTime - collegeClickTime);
    //     console.log(elapsedTime - collegeClickTime);
    //     console.log(timeToStart);
    //     console.log(timeToStart <= 0);
    //     if (timeToStart <= 0) {
    //       collegeName = 1;
    //       collegeSelected = true;
    //       this.scene.start('confirmcollege_scene');
    //     }
    //     //this.startButtonText.setText('Starting in ' + Math.ceil(timeToStart));
    //   }
    // }
    // else {
    //   collegeClickTime = null;
    //   rect17.fillColor = '0x00bfff';
    //   //this.startButtonText.setText('Hover to start');
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect6)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect6)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Jonathan Edwards";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect7)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect7)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Pierson";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect8)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect8)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Saybrook";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect9)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect9)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Stiles";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect10)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect10)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Timothy Dwight";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect11)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect11)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Trumbull";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect12)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect12)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Grace Hopper";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect13)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect13)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Pauli Murray";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect14)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect14)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Silliman";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect15)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect15)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Franklin";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect16)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect16)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Morse";
    //     collegeSelected = true;
    //   }
    // }
    // if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect17)) { // while loop?
    //   console.log('TOUCHDOWN');
    //   selectionTimer = 3;
    //   let elapsedTimess = timedEventss.getElapsedSeconds();
    //   let timeLeftss = selectionTimer - elapsedTimess;
    //   if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect17)) {
    //     //this.scene.start('confirmcollege_scene');
    //     //this.scene.start('confirmcollege_scene', confirmcollege_scene);
    //     collegeName = "Berkeley";
    //     collegeSelected = true;
    //   }
    }
  
  
  if(collegeSelected){
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  }

  // on click methods mainly for testing
  // update method needed for kinect to detect 3 second hovering for confirm button
  
  overExitButtonSuper.update(elapsedTime);
  rect4Super.update(elapsedTime);  
  rect5Super.update(elapsedTime); 
  rect6Super.update(elapsedTime); 
  rect7Super.update(elapsedTime); 
  rect8Super.update(elapsedTime);  
  rect9Super.update(elapsedTime); 
  rect10Super.update(elapsedTime);
 
  rect11Super.update(elapsedTime);
 
  rect12Super.update(elapsedTime);
 
  rect13Super.update(elapsedTime);
 
  rect14Super.update(elapsedTime);
 
  rect15Super.update(elapsedTime);
 
  rect16Super.update(elapsedTime);
 
  rect17Super.update(elapsedTime);
 
}
