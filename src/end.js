var end_scene = {
    preload: preload,
    create: create_end,
    update: update_end,
  };

var width;
var timeLimitend = 10; // inactivity
var timedEventend;

function create_end(){
    text0 = this.add.text(width/2, 100, "Thanks for Playing!" + " Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
    timedEventend = this.time.addEvent({ delay: 5000, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
}

function update_end(){
    let elapsedTimeend = timedEventend.getElapsedSeconds();
    let timeLeftend = timeLimitend - elapsedTimeend;
    if (timeLeftend <= 0) {
        this.scene.start('confirmcollege_scene');
    }
}