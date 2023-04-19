var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'canvas-container',
    physics: {
        default: 'arcade',
    }
  };
  
  var game = new Phaser.Game(config);
  
  game.scene.add('game_scene', game_scene);
//   game.scene.add('gameover_scene', gameover_scene)
  
  game.scene.start('game_scene', game_scene);
  