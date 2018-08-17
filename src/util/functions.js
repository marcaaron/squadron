/** deviate function
 *  badguy - the game object to act upon
 *  vY - {number} velocity.y - negative value for up pos for down
 *  delay - {number} total milliseconds before a direction change
 **/
export const _deviate = (badguy, vY, delay) => {
  setTimeout(()=>{
    badguy.body.velocity.y = vY;
  }, delay)
};
