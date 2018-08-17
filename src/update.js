function update(){
    this.background1.tilePositionX += 5 //change this to a value suited for your needs change - to + to change direction

  // if hp is 0 end the game
  if(this.hp === 0){
    gameOver = true;
  }

  // controls
  if (this.cursors.up.isDown){
    this.player.setVelocityY(-500);
    this.player.setVelocityX(0);
  }
  else if (this.cursors.down.isDown){
    this.player.setVelocityY(500);
    this.player.setVelocityX(0);
  }
  else if (this.cursors.left.isDown){
    this.player.setVelocityX(-500);
    this.player.setVelocityY(0);
  }
  else if (this.cursors.right.isDown){
    this.player.setVelocityX(500);
    this.player.setVelocityY(0);
  }
  else{
    this.player.setVelocityY(0)
    this.player.setVelocityX(0)
  }

  // sets up boundary for bullets. if they leave the world they are removed
  this.bullets.children.each( b => {
    if (b.active) {
      if (b.x > 800) {
          b.setActive(false);
      }
    }
  });

  // sets up boundaries for badguys. if they leave the world they are removed.
  this.badguys.children.each( b => {
    if (b.active) {
      if (b.x < 0 || b.y < 0 || b.y > 600) {
        b.setActive(false);
      }
    }
  });
}

export default update;
