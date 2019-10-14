import Bubble from './bubble'
const width = require("../../settings.js").width
const height = require("../../settings.js").height


  // Return a randomly oriented vector with the given length.
  export const randomVec = (length) => {
    const deg = 2 * Math.PI * Math.random();
    return scale([Math.sin(deg), Math.cos(deg)], length);
  }
  // Scale the length of a vector by the given amount.
  const scale = (vec, m) => {
    return [vec[0] * m, vec[1] * m];
  }

  export const randomPos = () => {

    let posX = Math.random() * width;
    let posY = Math.random() * height;
    let pos = [posX, posY];
    return pos;
  }



