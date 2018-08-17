function preload(){
  this.load.image('dot', '../assets/red-dot.png');
  this.load.image('bullet', '../assets/bullet.png');
  this.load.image('badguy', '../assets/bad-guy.png');
  this.load.image('background', '../assets/shittybg.png');
  this.load.spritesheet('explosion', '../assets/explosion.png', {
    frameWidth: 75,
    frameHeight: 75
  });
  this.load.spritesheet("player1", "../assets/player1-sprite.png", {
    frameWidth: 200,
    frameHeight: 100
  });
}

export default preload;
