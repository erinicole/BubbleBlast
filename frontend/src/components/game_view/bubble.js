 import MovingObject from "./moving_object";
 import {randomVec} from "./util";
//  import Game from './game';

 class Bubble extends MovingObject {
   constructor(options = {}) {
      options.color = 'blue';
      options.radius = 22;
      options.pos = options.pos || options.game.randomPos(); 
      options.vel = options.vel || randomVec(7);
      super(options)
     }
   }
 

 export default Bubble;