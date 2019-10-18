const MovingObject = require("./moving_object_model");

class Projectile extends MovingObject{
    constructor(playerPos, targetPos, username){
        super();
        this.pos = playerPos;
        this.targetPos = targetPos;
        this.radius = 4;
        this.speed = 20;
        this.calculateVel();
        this.owner = username;
    }

    calculateVel(){
        this.vel = this.dir([this.targetPos[0] - this.pos[0], this.targetPos[1]-this.pos[1]])
    }

    // Normalize the length of the vector to 1, maintaining direction.
    dir(vec) {
        const norm = this.norm(vec);
        return this.scale(vec, this.speed / norm);
    }

    // Find distance between two points.
    dist(pos1, pos2) {
        return Math.sqrt(
        Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }

    // Find the length of the vector.
    norm(vec) {
        return this.dist([0, 0], vec);
    }

    // Scale the length of a vector by the given amount.
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    }


}

module.exports = Projectile