function preload(){
  this.load.image('dot', '../assets/red-dot.png');
  this.load.image('bullet', '../assets/bullet.png');
  this.load.image('badguy', '../assets/baddie.png');
  this.load.image('background', '../assets/shittybg.png');
  this.load.spritesheet('explosion', '../assets/explosion.png', {
    frameWidth: 75,
    frameHeight: 75
  });
  this.load.spritesheet("player1", "../assets/player1-sprite.png", {
    frameWidth: 200,
    frameHeight: 100
  });
  this.load.image("bomb", "../assets/bomb.png");
}

export default preload;
