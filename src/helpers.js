var width;
var height;

var inactiveTimeLimit = 3; // can't actually return if you leave
var inactiveTime = null;
var inactiveStartTime = null;

function checkInactive(time, scene) {
  if (userInactive) {
    if (inactiveStartTime) {
      let inactiveCountdown = inactiveTimeLimit - (time - inactiveStartTime);
      scene.inactiveText.setText('User has left the screen\nRestarting in ' + Math.ceil(inactiveCountdown));
      if (inactiveCountdown <= 0) {
        scene.scene.start('start_scene');
      }
    }
    else {
      inactiveStartTime = time;
      scene.inactiveAlert = scene.add.rectangle(width/2, height/2, width*.75, height*.75, '0x808080').setOrigin(0.5);
      scene.inactiveText = scene.add.text(0, 0, 'User has left the screen\nRestarting in ' + inactiveTimeLimit);
      Phaser.Display.Align.In.Center(scene.inactiveText, scene.inactiveAlert);
    }
  }
}