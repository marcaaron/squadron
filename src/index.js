import 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);

function preload(){
  this.load.image('dot', '../assets/red-dot.png');
  this.load.image('bullet', '../assets/bullet.png');
  this.load.image('badguy', '../assets/bad-guy.png');
  this.load.image('background', '../assets/shittybg.png');
}

function create(){
  this.background1 = this.add.tileSprite(800,600,1600,1200, 'background')
  // initialize player
  this.player = this.physics.add.image(100, 300, 'dot');
  // prevent player from moving outside of the screen
  this.player.setCollideWorldBounds(true);
  // set up controls up, down, left, right
  this.cursors = this.input.keyboard.createCursorKeys();
  // initialize hp
  this.hp = 1000;
  // initialize immunity state
  this.immunityActive = false;

  // set up bullet group
  this.bullets = this.physics.add.group({
    defaultKey: 'bullet',
    maxSize: 5
  })

  // set up rules for bad guys and add them to group
  this.badguys = this.physics.add.group({
    defaultKey: 'badguy',
    maxSize: 5
  })

  // listen for spacebar clicks and trigger the shoot function
  this.input.keyboard.on('keydown_SPACE', (e)=>{
    this.shoot();
  })

  // fire bullets. bullets originate from the player position
  // we must set their active and visible states to true
  // and give them an initial velocity
  this.shoot = () => {
    const bullet = this.bullets.get(this.player.x, this.player.y);
    if(bullet){
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.velocity.x = 800;
    }
  }

  // set counter to zero
  this.counter = 0;

  // this sets up a timed attack wave with a counter
  // if the counter reaches the maxSize of badguys the interval is claered
  this.hoard = setInterval(()=>{
      if(this.counter===4){
        clearInterval(this.hoard);
      }
      /** deviate function
       *  badguy - the game object to act upon
       *  vY - {number} velocity.y - negative value for up pos for down
       *  delay - {number} total milliseconds before a direction change
       **/
      const _deviate = (badguy, vY, delay) => {
        setTimeout(()=>{
          badguy.body.velocity.y = vY;
        }, delay)
      }

      /** array of atteck patterns to for each spawned bad guy
      *  startY {number} - the Y spawn position
      *  deviate {function} - see above - b = bad guy
      *  vX {number} - velocity.x - speed of the badguy must be positive value
      **/

      const patterns = [
        {
          startY: 300,
          deviate: (b) => _deviate(b, -150, 200),
          vX: -300
        },
        {
          startY: 300,
          deviate: (b) => _deviate(b, 150, 200),
          vX: -300
        },
        {
          startY: 300,
          deviate: (b) => _deviate(b, -150, 200),
          vX: -300
        },
        {
          startY: 300,
          deviate: (b) => _deviate(b, 150, 200),
          vX: -300
        },
        {
          startY: 300,
          deviate: (b) => _deviate(b, -150, 200),
          vX: -300
        }
      ];
      // destructure properties for the current bad guy
      const { startY, vX, deviate } = patterns[this.counter];
      // set the Y position X will always be the right edge of playfield
      const badguy = this.badguys.get(800, startY);
      // if we can create a badguy the make them active and visible
      // set their body velocity
      // and call the deviate function to define their movement pattern
      if(badguy){
        badguy.setActive(true);
        badguy.setVisible(true);
        badguy.body.velocity.x = vX;
        deviate(badguy);
      }
      // increment counter so we can spawn the next baddie
      this.counter++;
    // create a new bad guy every 200ms
  }, 200)

  // detect collisions between bullets and badguys
  this.physics.add.overlap(this.bullets, this.badguys, targetDestroy, null, this);
  // callback function - destroy both bullets and badguys
  function targetDestroy(bullet, badguy){
    bullet.destroy();
    badguy.destroy();
  }

  // activateImmunity causes the player to blink and change colors
  // no damage can be taken during this time
  // immunity lasts for 3 seconds
  this.activateImmunity = () => {
    // set immunity to true
    this.immunityActive = true;
    // initialize visibility
    let visible = true;
    // every 200ms alternate color every 100ms make player invisible
    const blink = setInterval(()=>{
      visible = !visible;
      if(!visible){
        this.player.setTint(`0x${Math.floor(Math.random()*16777215).toString(16)}`);
      }
      this.player.setVisible(visible);
    }, 100);
    // after 3 seconds turn off immunity, clear tint, clear blink, and set visible to true in case we end up invisible from the blinking
    setTimeout(()=>{
      this.immunityActive = false;
      this.player.clearTint();
      this.player.setVisible(true);
      clearInterval(blink);
    },3000);
  }

  // if player and badguy overlap then take damage
  this.physics.add.overlap(this.badguys, this.player, damageTaken, null, this);
  // if immunity is active no damage can be taken
  // otherwise remove the bad guy from the world, lower hp, activate 3 second immunity, and update HP counter
  function damageTaken(_, badguy){
    if(!this.immunityActive){
      badguy.destroy();
      this.hp -= 100;
      this.hpText.setText(`HP: ${this.hp}`);
      this.activateImmunity();
    }
  }

  // add the initial hp status to the game screen
  this.hpText = this.add.text(16, 16, `HP: ${this.hp}`, {
    fontSize: "32px",
    fill: "#FFF"
  });
}

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
