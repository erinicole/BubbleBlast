import util from "./util"
import MovingObject from "./moving_object"

class Projectile extends MovingObject {
    constructor(options = {}) {
      options.color = 'purple';
      options.radius = 2;
      super(options)
     }


}

 export default Projectile;

// Bullet(options) {
//   options.radius = Bullet.RADIUS;

//   MovingObject.call(this, options);
// }

// Bullet.RADIUS = 2;
// Bullet.SPEED = 15;

// Util.inherits(Bullet, MovingObject);

// Bullet.prototype.isWrappable = false;

// module.exports = Bullet;
