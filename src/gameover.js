var gameover_scene = {
  preload: preload,
  create: create_gameover,
  update: update_gameover,
};

var width;
var start_time;
var collegeSelected = false;
var selectionTimer;
var collegeName;
var timedEventss;

function create_gameover () {
  text0 = this.add.text(width/2, 99, "Thanks for Playing!" + " Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
  // text1 = this.add.text(width/2 - 200, height/2 + 50, " Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
  //text2 = this.add.text(width/2, 175, "Click to Play Again",{ fontSize: 24 }).setOrigin(0.5,0.5);
  text3 = this.add.text(width/2, 150, "Choose Your College To Add Your Score!",{ fontSize: 24 }).setOrigin(0.5,0.5);
  text33 = this.add.text(width/2, 200, "Hold your hand over your college for 3 seconds",{ fontSize: 24 }).setOrigin(0.5,0.5);
  rect4 = this.add.rectangle(width/2 - 200, 250, 175, 20, '0x00bfff');
  text4 = this.add.text(width/2 - 200, 250, "Branford",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect5 = this.add.rectangle(width/2 - 200, 290, 175, 20, '0x00bfff');
  text5 = this.add.text(width/2 - 200, 290, "Davenport",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect6 = this.add.rectangle(width/2 - 200, 330, 175, 20, '0x00bfff');
  text6 = this.add.text(width/2 - 200, 330, "Jonathan Edwards",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect7 = this.add.rectangle(width/2 - 200, 370, 175, 20, '0x00bfff');
  text7 = this.add.text(width/2 - 200, 370, "Pierson",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect8 = this.add.rectangle(width/2 - 200, 410, 175, 20, '0x00bfff');
  text8 = this.add.text(width/2 - 200, 410, "Saybrook",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect9 = this.add.rectangle(width/2 - 200, 450, 175, 20, '0x00bfff');
  text9 = this.add.text(width/2 - 200, 450, "Stiles",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect10 = this.add.rectangle(width/2 - 200, 490, 175, 20, '0x00bfff');
  text10 = this.add.text(width/2 - 200, 490, "Timothy Dwight",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect11 = this.add.rectangle(width/2 + 200, 250, 175, 20, '0x00bfff');
  text11 = this.add.text(width/2 + 200, 250, "Trumbull",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect12 = this.add.rectangle(width/2 + 200, 290, 175, 20, '0x00bfff');
  text12 = this.add.text(width/2 + 200, 290, "Grace Hopper",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect13 = this.add.rectangle(width/2 + 200, 330, 175, 20, '0x00bfff');
  text13 = this.add.text(width/2 + 200, 330, "Pauli Murray",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect14 = this.add.rectangle(width/2 + 200, 370, 175, 20, '0x00bfff');
  text14 = this.add.text(width/2 + 200, 370, "Silliman",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect15 = this.add.rectangle(width/2 + 200, 410, 175, 20, '0x00bfff');
  text15 = this.add.text(width/2 + 200, 410, "Franklin",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect16 = this.add.rectangle(width/2 + 200, 450, 175, 20, '0x00bfff');
  text16 = this.add.text(width/2 + 200, 450, "Morse",{ fontSize: 18 }).setOrigin(0.5,0.5);
  rect17 = this.add.rectangle(width/2 + 200, 490, 175, 20, '0x00bfff');
  text17 = this.add.text(width/2 + 200, 490, "Berkeley",{ fontSize: 18 }).setOrigin(0.5,0.5);

  // first half of colleges
  // for loop?
  timedEventss = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

}

function update_gameover () {
  if (hand_x) {
    // console.log('updating hand');
    // console.log(hand_x);
    // console.log(hand_y);
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);

    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect4)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      rect4.color = '0x00ff00';
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect4)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Branford";
        collegeSelected = true;
      }
      
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect5)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect5)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Davenport";
        collegeSelected = true;
      }
      
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect6)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect6)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Jonathan Edwards";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect7)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect7)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Pierson";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect8)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect8)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Saybrook";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect9)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect9)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Stiles";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect10)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect10)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Timothy Dwight";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect11)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect11)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Trumbull";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect12)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect12)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Grace Hopper";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect13)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect13)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Pauli Murray";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect14)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect14)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Silliman";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect15)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect15)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Franklin";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect16)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect16)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Morse";
        collegeSelected = true;
      }
    }
    if (Phaser.Geom.Intersects.CircleToRectangle(pointer, rect17)) { // while loop?
      console.log('TOUCHDOWN');
      selectionTimer = 3;
      let elapsedTimess = timedEventss.getElapsedSeconds();
      let timeLeftss = selectionTimer - elapsedTimess;
      if (timeLeftss <= 0 && Phaser.Geom.Intersects.CircleToRectangle(pointer, rect17)) {
        //this.scene.start('confirmcollege_scene');
        //this.scene.start('confirmcollege_scene', confirmcollege_scene);
        collegeName = "Berkeley";
        collegeSelected = true;
      }
    }
  }
  
  if(collegeSelected){
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  }

  rect4.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect5.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect6.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect7.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect8.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect9.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect10.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect11.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect12.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect13.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect14.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect15.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect16.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
  rect17.on('pointerdown', function (rect4)
  {
    this.destroy();
    collegeSelected = true;
  });
}
