var width;
var height;

// update pointers based on hand positions
function updatePointers() {
  if (hand_x || leftHand_x) {
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);
  }
}

// update single pointer
function updatePointer(p, x, y) {
  p.x = x;
  p.y = y;
}

function initializePointers(game) {
  pointer = game.add.circle(-50, 0, 10, '0xFFFF00');
  leftPointer = game.add.circle(-50, 0, 10, '0xFFFF00');
}

/**
 * gives back styling based on scale
 */
function scale(x) {
  return x * (2/kinectScaleFactor)
}


// calculate Euclidean distance
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2)**2 + (y1 - y2)**2)
}

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

// put a time limit on the button and make it usable
// kenan's note: i added color parameters, if it does not remove them
function activateButton(button, text, timeLimit, callback, textDefault, textOn, fillColorDefault, fillColorOn) {
  button.setInteractive();
  button.on('pointerdown', function () {
    callback();
  });
  return {
    button: button,
    text: text,
    clickStartTime: null,
    clickVerifyTime: timeLimit,
    update (time) {
      // time is elapsedTime
      if (circleOnRect(pointer, button) || circleOnRect(leftPointer, button)) {
        button.fillColor = fillColorOn;
        if (this.clickStartTime == null) {
          this.clickStartTime = time;
        }
        else {
          const countdown = this.clickVerifyTime - (time - this.clickStartTime);
            // console.log(elapsedTime - instructionToExitClickTime);
            if(countdown <= 0){
              callback();
            }
            console.log(textOn);
            this.text.setText(textOn + Math.ceil(countdown));
        }
      }
      else {
        this.clickStartTime = null;
        button.fillColor = fillColorDefault;
        this.text.setText(textDefault);
      }
    }
  }
}

function circleOnRect(circle, rect) {
  if (
    (circle.x > rect.x - rect.width/2 && circle.x < rect.x + rect.width/2) &&
    (circle.y < rect.y + rect.height/2 && circle.y > rect.y - rect.height/2)
  ) {
    return true;
  }
  return false;
}


var mediumText = {
  font: 'bold ' + scale(15) + 'px Arial',
  fill: 'black',
  align: "left"
}

var largeText = {
  font: 'bold ' + scale(30) + 'px Arial',
  fill: 'white',
  align: "left",
  wordWrap: {width: 600},
}