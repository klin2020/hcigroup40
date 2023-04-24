var gameover_scene = {
  preload: preload,
  create: create_gameover,
  update: update_gameover,
};

var width;
var start_time;

function create_gameover () {
  timedEvent.remove();
  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
  text0 = this.add.text(width/2, height/2 - 50, "Thanks for Playing!",{ fontSize: 24 }).setOrigin(0.5,0.5);
  text1 = this.add.text(width/2, height/2 + 50, "Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
}

function update_gameover () {
  let elapsedTime = timedEvent.getElapsedSeconds();
  checkInactive(elapsedTime, this);
}