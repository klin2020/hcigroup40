var leader_scene = {
    preload: preload,
    create: create_leader,
    update: update_leader,
  };

function create_leader(){
    text0 = this.add.text(width/2, 150, "Leaderboard",{ fontSize: 24 }).setOrigin(0.5,0.5);
    // show the top 3 colleges in the leaderboard
    text1 = this.add.text(width/2, 200, "1. " + db[0].name + " " + db[0].score,{ fontSize: 24 }).setOrigin(0.5,0.5);
    playagain = this.add.rectangle(width/2, 300, 250, 40, '0x065929');
    playagain.setInteractive();
    playtext = this.add.text(width/2, 300, "Play Again",{ fontSize: 18 }).setOrigin(0.5,0.5);
    
}

function update_leader(){
    playagain.on('pointerdown', function (pointer) {
        score = 0;
        // other reset stuff...
        this.scene.start('start_scene');
    });
}