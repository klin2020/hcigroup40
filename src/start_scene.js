var start_scene = {
  preload: preload,
  create: create_start,
  update: update_start,
};

function create_start () {
  text0 = this.add.text(width/2, height/2 - 50, "Start Screen",{ fontSize: 24 }).setOrigin(0.5,0.5);
}

function update_start () {
  ;
}