var end_scene = {
    preload: preload,
    create: create_end,
    update: update_end,
  };

function preload() {
  this.load.setBaseURL('http://labs.phaser.io');
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;

  pointer = this.add.circle(0, 0, 10, '0xff0000');
  leftPointer = this.add.circle(0, 0, 10, '0x00ff00');
  // this.load.image('sky', 'assets/skies/space3.png');
  // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
  // this.load.image('red', 'assets/particles/red.png');
}

var width;
//var timeLimitend = 10; // inactivity
var timedEventend;

function create_end(){
    text0 = this.add.text(width/2, 100, "Thanks for Playing!" + " Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
    timedEventend = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
}

function update_end(){
    let elapsedTimeend = timedEventend.getElapsedSeconds();
    let timeLeftend = timeLimitend - elapsedTimeend;
    if (timeLeftend <= 0) {
        this.scene.start('confirmcollege_scene');
    }
}