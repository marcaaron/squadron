import attackPatterns from './attackPatterns';
import { targetDestroy, shoot } from './functions';
import createAnims from './anims';

function create(){
  // Must pass reference to this.anims
  createAnims(this.anims);
  // Create Game Objects
  this.background1 = this.add.tileSprite(800,600,1600,1200, 'background')
  // initialize player
  this.player = this.physics.add.sprite(100, 200, 'player1');
  // prevent player from moving outside of the screen
  this.player.setCollideWorldBounds(true);
  // set up controls up, down, left, right
  this.cursors = this.input.keyboard.createCursorKeys();
  // initialize hp
  this.hp = 300;
  // initialize immunity state
  this.immunityActive = false;

  // set up bullet group
  this.bullets = this.physics.add.group({
    defaultKey: 'bullet',
    maxSize: 5
  });

  // set up rules for bad guys and add them to group
  this.badguys = this.physics.add.group({
    defaultKey: 'badguy',
    maxSize: 30
  });

  this.bombs = this.physics.add.group({
    key:'bomb',
    frameQuantity: 10
  });

  this.circle = new Phaser.Geom.Circle(this.player.x, this.player.y, 150);

  // listen for spacebar clicks and trigger the shoot function
  this.input.keyboard.on('keydown_SPACE', (e)=>{
    const bullet = this.bullets.get(this.player.x, this.player.y);
    shoot(bullet);
  });

  // set counter to zero
  // this sets up a timed attack wave with a counter
  // if the counter reaches the maxSize of badguys the interval is claered
  let waveCount = 0;
  const attackWave = () => {
    let enemyCount = 0;
    const attackTimer = setInterval(()=>{
    // if the next wave is null then set back to 0 index
    if(waveCount > attackPatterns.length-1){
      waveCount = 0;
    }

    const currentPattern = attackPatterns[waveCount];
    // if total number of enemies created = the pattern length then stop creating enemies
    if(enemyCount===currentPattern.length-1){
      clearInterval(attackTimer);
      // increment to call the next pattern wave
      waveCount++;
      // wait 5 seconds and start the next wave
      setTimeout(()=>{
        attackWave();
      }, 5000);
    }
    // destructure properties for the current bad guy
    const { startY, vX, deviate } = currentPattern[enemyCount];
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
    enemyCount++;
    // create a new bad guy every 300ms
    }, 300)
  }

  attackWave(); 

  // detect collisions between bombs and baddies
  this.physics.add.overlap(this.bombs, this.badguys, targetDestroyedByBomb, triggerExplosion, this);

  function targetDestroyedByBomb(bomb, badguy){
    bomb.destroy();
    badguy.destroy();
  }

  // detect collisions between bullets and badguys
  this.physics.add.overlap(this.bullets, this.badguys, targetDestroy, triggerExplosion, this);

  function triggerExplosion(impactPoint){
    const explosion = this.physics.add.sprite(impactPoint.x,impactPoint.y,'explosion');
    explosion.anims.play('explode', true);
    explosion.once('animationcomplete', ()=>{
      explosion.destroy();
    })
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

  this.startAngle = this.tweens.addCounter({
    from: 0,
    to: 6.28,
    duration: 6000,
    repeat: -1
  })
  this.endAngle = this.tweens.addCounter({
    from: 6.28,
    to: 12.56,
    duration: 6000,
    repeat: -1
  })
}

export default create;
