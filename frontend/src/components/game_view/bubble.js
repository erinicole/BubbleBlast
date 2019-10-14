 import MovingObject from "./moving_object";
 import {randomVec, randomPos} from "./util";
 import Blaster from "./blaster";
 import Projectile from "./projectile";
//  import Game from './game';

 class Bubble extends MovingObject {
   constructor(options = {}) {
     options.color = "blue";
     options.radius = 22;
     options.pos = [200,200];
    //  options.pos = options.pos || randomPos();
     options.vel = [0,0];
     //  options.vel = options.vel || randomVec(7);
     super(options);
     this.letter = options.text;
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

   draw(pos){
    //  super.draw(pos)
     if (!pos) {
       return;
     }
     this.ctx.fillStyle = "white";
     this.ctx.font = "30px Arial";
     this.ctx.fillText(this.letter, pos[0],pos[1]);
   }

 }
 

 export default Bubble;