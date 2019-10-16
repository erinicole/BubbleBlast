class MovingObject {
  constructor() {}
  
  isCollidedWith(otherObject) {
    let [x_1, y_1] = this.pos;
    let [x_2, y_2] = otherObject.pos;
    let dist = Math.sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2);
    if (dist < this.radius + otherObject.radius) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = MovingObject