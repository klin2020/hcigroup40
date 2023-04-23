var confirmcollege_scene = {
    preload: preload,
    create: create_confirmcollege,
    update: update_confirmcollege,
  };

var width;
var height;
var timeLimitcc = 90;
var timedEventcc;
var db;
parseLeaderboard();

function create_confirmcollege(){
    text0 = this.add.text(width/2, 100, "Confirm that you are adding your",{ fontSize: 24 }).setOrigin(0.5,0.5);
    text1 = this.add.text(width/2, 150, "score of " + score.toString() + " to " + db[collegeName].name,{ fontSize: 24 }).setOrigin(0.5,0.5);
    accept = this.add.rectangle(width/2 - 200, 250, 250, 40, '0x065929');
    accepttext = this.add.text(width/2 - 200, 250, "Yes, add score",{ fontSize: 18 }).setOrigin(0.5,0.5);
    accept.setInteractive();
    goback = this.add.rectangle(width/2 + 200, 250, 250, 40, '0xff0099');
    backtext = this.add.text(width/2 + 200, 250, "No, choose another",{ fontSize: 18 }).setOrigin(0.5,0.5);

    // game.load.image("berk", "../images/berk.png");
    // game.add.sprite(100, 100, "berk");

    accept.on('pointerdown', () => {
        // add score to college
        console.log(db[collegeName].score);
        db[collegeName].score += score;
        console.log(db[collegeName].score);
        //upload to leaderboard
        this.scene.start('leader_scene', leader_scene);
    });

    

    timedEventcc = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
}

function update_confirmcollege(){
    // 90 seconds to choose a college or reset
    let elapsedTimecc = timedEventcc.getElapsedSeconds();
    let timeLeftcc = timeLimitcc - elapsedTimecc;
    if (timeLeftcc <= 0) {
        score = 0;
        // other reset stuff...
        this.scene.start('start_scene');
    }

    
}

function parseLeaderboard() {
    // show the top 3 colleges in the leaderboard
    // var leaderboard = [];
    // var colleges = require('../leaderboard.json');
    // // var first = obj[0].name;
    // // var second = obj[1].name;
    // // var third = obj[2].name;
    // // for(var i = 0; i < obj.length; i++) {
    // //     console.log(obj[i].name + " " + obj[i].score);
        
    // // }    
    // colleges.sort(function(a, b) {
    //     return b.score - a.score;
    // });
    // // for(var i = 0; i < colleges.length; i++) {
    // //     //obj[i].name + " " + obj[i].score
    // //     leaderboard.push({name: colleges[i].name, score: colleges[i].score});
    // // }
    // // console.log(leaderboard);
    // // return leaderboard;
    // console.log(colleges);
    // return colleges;
      // Load the JSON data from the file using an HTTP request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../leaderboard.json', true);
    xhr.onload = function() {
      // Parse the JSON data into a JavaScript object
      const data = JSON.parse(xhr.responseText);
      db = data;
      console.log(data);
      //console.log(data[0].name);
      console.log(collegeName);
    
      // Convert the JavaScript object back to JSON format
      const json = JSON.stringify(data);
    
      // Write the updated JSON data back to the file using an HTTP request
      const xhr2 = new XMLHttpRequest();
      xhr2.open('PUT', '../leaderboard.json', true);
      xhr2.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr2.onload = function() {
        console.log('JSON data updated successfully');
      };
      xhr2.send(json);
    };
    xhr.send();
  
  }