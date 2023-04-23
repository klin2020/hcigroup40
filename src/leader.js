var leader_scene = {
    preload: preload,
    create: create_leader,
    update: update_leader,
};

function preload () {
    this.load.setBaseURL('http://labs.phaser.io');
    width = this.sys.game.canvas.width;
    height = this.sys.game.canvas.height;
  
    pointer = this.add.circle(0, 0, 10, '0xff0000');
    leftPointer = this.add.circle(0, 0, 10, '0x00ff00');
    // this.load.image('sky', 'assets/skies/space3.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');
  }

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