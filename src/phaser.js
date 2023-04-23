var config = {
  type: Phaser.AUTO,
  width: screen_width/kinectScaleFactor,
  height: screen_height/kinectScaleFactor,
  parent: 'canvas-container',
  physics: {
      default: 'arcade',
  }
};

var game = new Phaser.Game(config);

game.scene.add('game_scene', game_scene);
game.scene.add('gameover_scene', gameover_scene);
game.scene.add('start_scene', start_scene);
game.scene.add('end_scene', end_scene);
game.scene.add('confirmcollege_scene', confirmcollege_scene);
game.scene.add('leader_scene', leader_scene);

game.scene.start('game_scene', game_scene); // change to bottom line when done testing
// game.scene.start('start_scene', start_scene);
