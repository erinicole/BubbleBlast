 import MovingObject from "./moving_object";
 import {randomVec} from "./util"

 class Bubble extends MovingObject {
   constructor(options) {
    this.options = {
        color: 'blue',
        radius: '22',
        pos: '1',
        vel: randomVec(7)
    }
    super(options);
   }
 }
 

 export default Bubble;