import React from 'react';
import MovingObject from './moving_object';
import Util from './util';
import Bubble from './bubble';


class GameView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    };

    componentDidMount(){
        const canvas = document.getElementById("game-canvas")
        const ctx = canvas.getContext("2d")
        this.setState({
            ctx: ctx
        })
    }


    render(){
        if(this.state.ctx){
            const test = new MovingObject([30, 30], [10, 10], 5, "#000000", this.state.ctx);
            test.draw(this.state.ctx)
            const bubble = new Bubble
            bubble.draw(this.state.ctx)
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