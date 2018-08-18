function update(){
    this.background1.tilePositionX += 5 //change this to a value suited for your needs change - to + to change direction

  // if hp is 0 end the game
  if(this.hp === 0){
    gameOver = true;
  }

  // controls
  if (this.cursors.up.isDown){
    this.player.setVelocityY(-700);
    this.player.setVelocityX(0);
    this.player.anims.play("stop", true);
    this.bombs.children.each((bomb,index)=>{
      bomb.setVelocityX(0);
      bomb.setVelocityY(-700);
    })
  }
  else if (this.cursors.down.isDown){
    this.player.setVelocityY(700);
    this.player.setVelocityX(0);
    this.player.anims.play("stop", true);
    this.bombs.children.each((bomb,index)=>{
      bomb.setVelocityX(0);
      bomb.setVelocityY(700);
    })
  }
  else if (this.cursors.left.isDown){
    this.player.setVelocityX(-700);
    this.player.setVelocityY(0);
    this.player.anims.play("stop", true);
    this.bombs.children.each((bomb,index)=>{
      bomb.setVelocityX(-700);
      bomb.setVelocityY(0);
    })

  }
  else if (this.cursors.right.isDown){
    this.player.setVelocityX(700);
    this.player.setVelocityY(0);
    this.player.anims.play("forward", true);
    this.bombs.children.each((bomb,index)=>{
      bomb.setVelocityX(700);
      bomb.setVelocityY(0);
    })
  }
  else{
    this.player.setVelocityY(0)
    this.player.setVelocityX(0)
    this.player.anims.play("stop", true);
    this.bombs.children.each((bomb,index)=>{
      bomb.setVelocityX(0);
      bomb.setVelocityY(0);
    })
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

  Phaser.Actions.SetXY([this.circle], this.player.x, this.player.y);
  // Phaser.Actions.PlaceOnCircle(this.bombs.getChildren(), this.circle);
  this.bombs.children.each((bomb,index)=>{
    Phaser.Actions.RotateAroundDistance(
      [bomb],
      {x: this.player.x, y: this.player.y},
      0.03,
      150
    );
  })
}

export default update;
