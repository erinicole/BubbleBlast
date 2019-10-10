import util from "./util"
import MovingObject from "./moving_object"

class Projectile extends MovingObject {
    constructor(options = {}) {
      options.color = 'purple';
      options.radius = 2;
      options.speed = 15;
      super(options)
     }


}

 export default Projectile;

