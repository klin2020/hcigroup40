var confirmcollege_scene = {
    preload: preload,
    create: create_confirmcollege,
    update: update_confirmcollege,
  };

var width;
var height;
var timeLimitcc = 10; // inactivity
var timedEventcc;

function create_confirmcollege(){
    text0 = this.add.text(width/2, 100, "Thanks for Playing!" + " Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
    timedEventcc = this.time.addEvent({ delay: 5000, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
}

function update_confirmcollege(){
    let elapsedTimecc = timedEventcc.getElapsedSeconds();
    let timeLeftcc = timeLimitcc - elapsedTimecc;
    if (timeLeftcc <= 0) {
        this.scene.start('start_scene');
    }
}