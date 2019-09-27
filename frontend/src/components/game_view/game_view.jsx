import React from 'react';
import MovingObject from './moving_object';
import Bubble from './bubble';
import Game from './game'


class GameView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // ctx: ''
        }
    };

    componentDidMount(){
        const canvas = document.getElementById("game-canvas")
        const ctx = canvas.getContext("2d")
        this.setState({
            ctx: ctx
        })
    }

    start(){

        const newGame = new Game(this.state.ctx)
        setInterval(
            ()=>{
                newGame.moveObjects();
                newGame.draw()
            } ,20)
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