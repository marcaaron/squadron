// callback function - destroy both bullets and badguys
export function targetDestroy(bullet, badguy){
  bullet.destroy();
  badguy.destroy();
}

// fire bullets. bullets originate from the player position
// we must set their active and visible states to true
// and give them an initial velocity
export function shoot(bullet){
  if(bullet){
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.body.velocity.x = 800;
  }
}
