import Bubble from "./bubble";

class Game{
    constructor(ctx){
        this.dimX = document.documentElement.clientWidth;
        this.dimY = document.documentElement.clientHeight;
        this.numBubbles = 4;
        this.bubbles = [];
        this.ctx = ctx;
        this.addBubbles();
    }

    addBubbles(){

        for (let i = 0; i < this.numBubbles; i++) {
          this.bubbles.push(
            new Bubble({ pos: this.randomPos(), ctx: this.ctx })
          );
        }
    }

    randomPos(){
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        let posX = Math.random() * width;
        let posY = Math.random() * height;
        let pos = [posX, posY];
        return pos;
    }

    draw(){
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        this.ctx.clearRect(0, 0, width, height);
        for(let i = 0; i < this.bubbles.length; i++){
            this.bubbles[i].draw(this.ctx);
        }
    }

    moveObjects(){
        for (let i = 0; i < this.bubbles.length; i++) {
          this.bubbles[i].move();
        }
    }
}

export default Game;