import { _deviate } from '../util/functions';

/** array of atteck patterns to for each spawned bad guy
*  startY {number} - the Y spawn position
*  deviate {function} - see above - b = bad guy
*  vX {number} - velocity.x - speed of the badguy must be positive value
**/
const level_1_1 = [
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

const level_1_2 = [
  {
    startY: 500,
    deviate: (b) => _deviate(b, -150, 300),
    vX: -300
  },
  {
    startY: 500,
    deviate: (b) => _deviate(b, -150, 300),
    vX: -300
  },
  {
    startY: 500,
    deviate: (b) => _deviate(b, -150, 300),
    vX: -300
  },
  {
    startY: 500,
    deviate: (b) => _deviate(b, -150, 300),
    vX: -300
  },
  {
    startY: 500,
    deviate: (b) => _deviate(b, -150, 300),
    vX: -300
  }
];

const level_1_3 = [
  {
    startY: 100,
    deviate: (b) => _deviate(b, 150, 400),
    vX: -300
  },
  {
    startY: 100,
    deviate: (b) => _deviate(b, 150, 400),
    vX: -300
  },
  {
    startY: 100,
    deviate: (b) => _deviate(b, 150, 400),
    vX: -300
  },
  {
    startY: 100,
    deviate: (b) => _deviate(b, 150, 400),
    vX: -300
  },
  {
    startY: 100,
    deviate: (b) => _deviate(b, 150, 400),
    vX: -300
  }
];

export default [
  level_1_1,
  level_1_2,
  level_1_3
]
