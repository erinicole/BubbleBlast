 import MovingObject from "./moving_object";
 import {randomVec, randomPos} from "./util";
 import Blaster from "./blaster";
 import Projectile from "./projectile";
//  import Game from './game';

 class Bubble extends MovingObject {
   constructor(options = {}) {
     options.color = "blue";
     options.radius = 22;
     options.pos = options.pos || randomPos();
     options.vel = options.vel || randomVec(7);
     super(options);
   }

   collideWith(otherObject) {
     if (otherObject instanceof Blaster) {
       otherObject.relocate();
       return true;
     } else if (otherObject instanceof Projectile) {
       this.remove();
       otherObject.remove();
       return true;
     }
     return false;
   }


 }
 

 export default Bubble;