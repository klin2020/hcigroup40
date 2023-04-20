var gameover_scene = {
  preload: preload,
  create: create_gameover,
  update: update_gameover,
};

var width;
var start_time;

function create_gameover () {
  text0 = this.add.text(width/2, 100, "Thanks for Playing!" + " Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
  // text1 = this.add.text(width/2 - 200, height/2 + 50, " Score: " + score.toString(),{ fontSize: 24 }).setOrigin(0.5,0.5);
  //text2 = this.add.text(width/2, 175, "Click to Play Again",{ fontSize: 24 }).setOrigin(0.5,0.5);
  text3 = this.add.text(width/2, 200, "Choose Your College To Add Your Score!",{ fontSize: 24 }).setOrigin(0.5,0.5);
  text4 = this.add.text(width/2 - 200, 325, "Branford",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text5 = this.add.text(width/2 - 200, 350, "Davenport",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text6 = this.add.text(width/2 - 200, 375, "Jonathan Edwards",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text7 = this.add.text(width/2 - 200, 400, "Pierson",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text8 = this.add.text(width/2 - 200, 425, "Saybrook",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text9 = this.add.text(width/2 - 200, 450, "Stiles",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text10 = this.add.text(width/2 - 200, 475, "Timothy Dwight",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text11 = this.add.text(width/2 + 200, 325, "Trumbull",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text12 = this.add.text(width/2 + 200, 350, "Grace Hopper",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text13 = this.add.text(width/2 + 200, 375, "Pauli Murray",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text14 = this.add.text(width/2 + 200, 400, "Silliman",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text15 = this.add.text(width/2 + 200, 425, "Franklin",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text16 = this.add.text(width/2 + 200, 450, "Morse",{ fontSize: 18 }).setOrigin(0.5,0.5);
  text17 = this.add.text(width/2 + 200, 475, "Berkeley",{ fontSize: 18 }).setOrigin(0.5,0.5);

}

function update_gameover () {
  if(false){
    this.scene.start('end_scene', end_scene);
  }
}

function parseLeaderboard() {
  // show the top 3 colleges in the leaderboard
  var leaderboard = [];
  var colleges = require('../leaderboard.json');
  // var first = obj[0].name;
  // var second = obj[1].name;
  // var third = obj[2].name;
  // for(var i = 0; i < obj.length; i++) {
  //     console.log(obj[i].name + " " + obj[i].score);
      
  // }    
  colleges.sort(function(a, b) {
      return b.score - a.score;
  });
  for(var i = 0; i < colleges.length; i++) {
      //obj[i].name + " " + obj[i].score
      leaderboard.push({name: colleges[i].name, score: colleges[i].score});
  }
  console.log(leaderboard);
  return leaderboard;
}
