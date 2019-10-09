import React from 'react';
import Game from './game';
import key from 'keymaster';
import Blaster from './blaster'

class GameView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.bindKeyHandlers = this.bindKeyHandlers.bind(this)
    };



    componentDidMount(){
        const canvas = document.getElementById("game-canvas")
        const ctx = canvas.getContext("2d")
        this.setState({
            ctx: ctx,
            blaster: new Blaster({ ctx: ctx })
        }, () => {
            this.setState({game: new Game(ctx, this.state.blaster)})
        })
    }

    bindKeyHandlers() {
        // this.blaster = new Blaster({ctx: this.state.ctx})
        const moves = {
            w: [0, -1],
            a: [-1, 0],
            s: [0, 1],
            d: [1, 0],
        };
        const nBlaster = this.state.blaster
        // debugger
        Object.keys(moves).forEach(function (k) {
            const move = moves[k];
            key(k, () => {
                // debugger 
                nBlaster.power(move); });
            
        });
        console.log(moves.a)
        // key("space", function () { ship.fireBullet(); });
    };

    start(){
        // debugger

        this.bindKeyHandlers();
        setInterval(
            ()=>{
                this.state.game.step();
                this.state.game.draw()
            }, 20)
        // debugger
    }


    render(){
        if(this.state.ctx){
            this.start()
            // const test = new MovingObject({
            //     pos: [30, 30],
            //     vel: [10, 10], 
            //     radius: 5, 
            //     color: "#000000", 
            //     ctx: this.state.ctx
            //  });
            // test.draw(this.state.ctx)
            // const bubble = new Bubble({ pos: [80, 100], ctx: this.state.ctx})
            // console.log(bubble)
            // bubble.draw(this.state.ctx)
        }
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        return(
            <div>
                game view
                <canvas id="game-canvas" width={width} height={height}>

                </canvas>
            </div>
        )
    }
    
}

export default GameView;