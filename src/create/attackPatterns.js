import { _deviate } from '../util/functions';

/** array of atteck patterns to for each spawned bad guy
*  startY {number} - the Y spawn position
*  deviate {function} - see above - b = bad guy
*  vX {number} - velocity.x - speed of the badguy must be positive value
**/

export const attackPatterns = [
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
