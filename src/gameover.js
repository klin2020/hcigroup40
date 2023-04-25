var gameover_scene = {
  preload: preload,
  create: create_gameover,
  update: update_gameover,
};


var start_time;
var collegeSelected = false;
var selectionTimer;
var collegeName;
var timedEvent;

function create_gameover () {
  this.exitButtonSuper = makeExitButton(this);

  let buttonWidth = scale(250);
  let buttonHeight = scale(20);

  text0 = this.add.text(width/2, scale(99), "Thanks for Playing!" + " Score: " + score.toString(),{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  // text1 = this.add.text(width/2 - 200, height/2 + 50, " Score: " + score.toString(),{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  //text2 = this.add.text(width/2, 250, "Click to Play Again",{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  text3 = this.add.text(width/2, scale(150), "Choose Your College To Add Your Score!",{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  text31 = this.add.text(width/2, scale(200), "Hold your hand over your college for 3 seconds",{ fontSize: scale(24) }).setOrigin(0.5,0.5);
  rect4 = this.add.rectangle(width/2 - scale(250), scale(250), buttonWidth, buttonHeight, '0x00bfff');
  text4 = this.add.text(width/2 - scale(250), scale(250), "Branford",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect5 = this.add.rectangle(width/2 - scale(250), scale(290), buttonWidth, buttonHeight, '0x00bfff');
  text5 = this.add.text(width/2 - scale(250), scale(290), "Davenport",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect6 = this.add.rectangle(width/2 - scale(250), scale(330), buttonWidth, buttonHeight, '0x00bfff');
  text6 = this.add.text(width/2 - scale(250), scale(330), "JE",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect7 = this.add.rectangle(width/2 - scale(250), scale(370), buttonWidth, buttonHeight, '0x00bfff');
  text7 = this.add.text(width/2 - scale(250), scale(370), "Pierson",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect8 = this.add.rectangle(width/2 - scale(250), scale(410), buttonWidth, buttonHeight, '0x00bfff');
  text8 = this.add.text(width/2 - scale(250), scale(410), "Saybrook",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect9 = this.add.rectangle(width/2 - scale(250), scale(450), buttonWidth, buttonHeight, '0x00bfff');
  text9 = this.add.text(width/2 - scale(250), scale(450), "Stiles",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect10 = this.add.rectangle(width/2 - scale(250), scale(490), buttonWidth, buttonHeight, '0x00bfff');
  text10 = this.add.text(width/2 - scale(250), scale(490), "TD",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect11 = this.add.rectangle(width/2 + scale(250), scale(250), buttonWidth, buttonHeight, '0x00bfff');
  text11 = this.add.text(width/2 + scale(250), scale(250), "Trumbull",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect12 = this.add.rectangle(width/2 + scale(250), scale(290), buttonWidth, buttonHeight, '0x00bfff');
  text12 = this.add.text(width/2 + scale(250), scale(290), "Hopper",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect13 = this.add.rectangle(width/2 + scale(250), scale(330), buttonWidth, buttonHeight, '0x00bfff');
  text13 = this.add.text(width/2 + scale(250), scale(330), "Murray",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect14 = this.add.rectangle(width/2 + scale(250), scale(370), buttonWidth, buttonHeight, '0x00bfff');
  text14 = this.add.text(width/2 + scale(250), scale(370), "Silliman",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect15 = this.add.rectangle(width/2 + scale(250), scale(410), buttonWidth, buttonHeight, '0x00bfff');
  text15 = this.add.text(width/2 + scale(250), scale(410), "Franklin",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect16 = this.add.rectangle(width/2 + scale(250), scale(450), buttonWidth, buttonHeight, '0x00bfff');
  text16 = this.add.text(width/2 + scale(250), scale(450), "Morse",{ fontSize: scale(18) }).setOrigin(0.5,0.5);
  rect17 = this.add.rectangle(width/2 + scale(250), scale(490), buttonWidth, buttonHeight, '0x00bfff');
  text17 = this.add.text(width/2 + scale(250), scale(490), "Berkeley",{ fontSize: scale(18) }).setOrigin(0.5,0.5);


  // first half of colleges
  // for loop?
  if (timedEvent) {
    timedEvent.remove();
  }

  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

  rect4Super = activateButton(rect4, text4, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 0;
    collegeName = "Branford";
    this.scene.start('confirmcollege_scene');
  }, "Branford", "Branford in ", '0x00bfff', '0x004b63');
  rect5Super = activateButton(rect5, text5, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 2;
    collegeName = "Davenport";
    this.scene.start('confirmcollege_scene');
  }, "Davenport", "Davenport in ", '0x00bfff', '0x004b63');
  rect6Super = activateButton(rect6, text6, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 5;
    collegeName = "JE";
    this.scene.start('confirmcollege_scene');
  }, "JE", "JE in ", '0x00bfff', '0x004b63');
  rect7Super = activateButton(rect7, text7, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 8;
    collegeName = "Pierson";
    this.scene.start('confirmcollege_scene');
  }, "Pierson", "Pierson in ", '0x00bfff', '0x004b63');
  rect8Super = activateButton(rect8, text8, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 9;
    collegeName = "Saybrook";
    this.scene.start('confirmcollege_scene');
  }, "Saybrook", "Saybrook in ", '0x00bfff', '0x004b63');
  rect9Super = activateButton(rect9, text9, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 11;
    collegeName = "Stiles";
    this.scene.start('confirmcollege_scene');
  }, "Stiles", "Stiles in ", '0x00bfff', '0x004b63');
  rect10Super = activateButton(rect10, text10, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 12;
    collegeName = "TD";
    this.scene.start('confirmcollege_scene');
  }, "TD", "TD in ", '0x00bfff', '0x004b63');
  rect11Super = activateButton(rect11, text11, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 13;
    collegeName = "Trumbull";
    this.scene.start('confirmcollege_scene');
  }, "Trumbull", "Trumbull in ", '0x00bfff', '0x004b63');
  rect12Super = activateButton(rect12, text12, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 4;
    collegeName = "Hopper";
    this.scene.start('confirmcollege_scene');
  }, "Hopper", "Hopper in ", '0x00bfff', '0x004b63');
  rect13Super = activateButton(rect13, text13, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 7;
    collegeName = "Murray";
    this.scene.start('confirmcollege_scene');
  }, "Murray", "Murray in ", '0x00bfff', '0x004b63');
  rect14Super = activateButton(rect14, text14, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 10;
    collegeName = "Silliman";
    this.scene.start('confirmcollege_scene');
  }, "Silliman", "Silliman in ", '0x00bfff', '0x004b63');
  rect15Super = activateButton(rect15, text15, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 3;
    collegeName = "Franklin";
    this.scene.start('confirmcollege_scene');
  }, "Franklin", "Franklin in ", '0x00bfff', '0x004b63');
  rect16Super = activateButton(rect16, text16, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 6;
    collegeName = "Morse";
    this.scene.start('confirmcollege_scene');
  }, "Morse", "Morse in ", '0x00bfff', '0x004b63');
  rect17Super = activateButton(rect17, text17, 3, () => {
    collegeSelected = true; //user playing game is locked in
    //collegeName = 1;
    collegeName = "Berkeley";
    this.scene.start('confirmcollege_scene');
  }, "Berkeley", "Berkeley in ", '0x00bfff', '0x004b63');
  initializePointers(this);
}


function update_gameover () {
  updatePointers();

  let elapsedTime = timedEvent.getElapsedSeconds();

  // update timer
  // let elapsedTime = timedEvent.getElapsedSeconds();

  if(collegeSelected){
    this.scene.start('confirmcollege_scene', confirmcollege_scene);
  }

  // on click methods mainly for testing
  // update method needed for kinect to detect 3 second hovering for confirm button

  this.exitButtonSuper.update(elapsedTime);
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
  checkInactive(elapsedTime, this);
}
