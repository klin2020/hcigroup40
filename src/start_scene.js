var start_scene = {
  preload: preload,
  create: create_start,
  update: update_start,
};

timeLimitStart = 0;

function preload(){
  this.load.setBaseURL('http://labs.phaser.io');
  width = this.sys.game.canvas.width;
  height = this.sys.game.canvas.height;


  startButton = this.add.rectangle(width/2 + 300, height - 75, 200, 100, "0xffffff");
  this.make.text({
    x: width/2 + 300,
    y: height - 75,
    text: 'Start',
    origin: { x: 0.5, y: 0.5},
    style: {
      font: 'bold 30px Arial',
      fill: 'black',
      wordWrap: {width: 600},
      align: "left"
    }
  });


}
function create_start () {


  timedEvent = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
  score = 0;
  this.make.text({
    x: width/2 - 150 ,
    y: 100,
    text: 'Test your reaction time and take your residential college to the top!',
    origin: { x: 0.5, y: 0.5},
    style: {
      font: 'bold 40px Arial',
      fill: 'white',
      wordWrap: {width: 600},
      align: "left"
    }
  });

  this.make.text({
    x: width/2 - 150,
    y: height - 50,
    text: 'Raise your hand to the rectangle to begin',
    origin: { x: 0.5, y: 0.5},
    style: {
      font: 'bold 30px Arial',
      fill: 'white',
      wordWrap: {width: 600},
      align: "left"
    }
  });
  
  
  pointer = this.add.circle(0, 0, 10, '0xff0000');
  leftPointer = this.add.circle(0, 0, 10, '0x00ff00');


}

var prevTime = 0;
var arrIndex = 0;
var shapeArr = new Array(10);
var startClickTime = null;
var startVerifyTime = 2;

function update_start () {
  updatePointers();

  // update timer
  let elapsedTime = timedEvent.getElapsedSeconds();
  
  var graphics = this.add.graphics();
    //create new circle every second until time runs out
    if (parseInt(prevTime) != parseInt(elapsedTime)){
      // console.log(prevTime);

      //randomize position and size of circle
      let x = Phaser.Math.Between(0, width);
      let y = Phaser.Math.Between(height-350, height - 175);
      let size = Phaser.Math.Between(10, 50);

      //randomize color
      let color = new Phaser.Display.Color();
      color = color.random();
      let color32 = Phaser.Display.Color.GetColor32(color["r"], color["g"], color["b"], color["a"]);

      //create circle 
      let shape = graphics.fillStyle(color32);
      shape = graphics.fillCircle(x, y, size);

      //add circle to array
      shapeArr[arrIndex] = shape;
      arrIndex++;
      
      
      prevTime =  elapsedTime; //update second
    }

    //reset circles every 10 seconds
    if (parseInt(elapsedTime) != 0 && parseInt(elapsedTime) % 10 == 0){
      //destroy all objects in the array
      // console.log("10 seconds passed");
      for(var i = 0; i < 10; i++){
        shapeArr[i].destroy();
      }
      arrIndex = 0;
    }



    //hover over Start for 3 seconds
    if (Phaser.Geom.Intersects.CircleToRectangle(startButton, pointer) 
    || Phaser.Geom.Intersects.CircleToRectangle(startButton, leftPointer)) {
      if (startClickTime == null) {
        startClickTime = elapsedTime;
      } else {
        console.log(elapsedTime - startClickTime);
        if (elapsedTime - startClickTime > startVerifyTime) {
          console.log("going to instruction scene");
          this.scene.start('instruction_scene');
        }
      }
    } 
    else {
      startClickTime = null;
    }

    // if(timeLimitStart == 0){
    //   this.scene.start('instruction_scene');
    // }

}

function updatePointers() {
  if (hand_x || leftHand_x) {
    updatePointer(pointer, width - hand_x, hand_y);
    updatePointer(leftPointer, width - leftHand_x, leftHand_y);
  }
}

function updatePointer(p, x, y) {
  p.x = x;
  p.y = y;
}