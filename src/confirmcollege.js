var confirmcollege_scene = {
    preload: preload,
    create: create_confirmcollege,
    update: update_confirmcollege,
  };

var width;
var height;
var timeLimitcc = 10;
var timedEventcc;

function create_confirmcollege(){
    text0 = this.add.text(width/2, 400, "Thanks for " +  score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
    timedEventcc = this.time.addEvent({ delay: 9999999, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
}

function update_confirmcollege(){
    let elapsedTimecc = timedEventcc.getElapsedSeconds();
    let timeLeftcc = timeLimitcc - elapsedTimecc;
    if (timeLeftcc <= 0) {
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
      console.log(data);
      console.log(data[colleges][0].name);
    
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

parseLeaderboard();