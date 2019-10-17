import React from 'react';
import Game from './game';
import key from 'keymaster';
import Blaster from './blaster';
const width = require("../../settings.js").width
const height = require("../../settings.js").height

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
        canvas.addEventListener('click', (event) =>{
            let pos = [event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop]
            this.props.shootEvent(pos)
        } )
        let blasters = [];
        let colors = [
            'Blue',
            'Green',
            'Pink',
            'Skyblue'
        ]
        for (let i = 0; i < this.props.blasterPositions.length; i++) {
            blasters.push(new Blaster({ ctx: ctx, color: colors[i] }))
        }
        this.setState({
            ctx: ctx,
            blaster: blasters
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
        Object.keys(moves).forEach(function (k) {
            const move = moves[k];
            key(k, () => {
                nBlaster.power(move); });
            
        });
    };

    start(){
        // this.bindKeyHandlers();
        if(this.state.game){
            this.state.game.step();
            this.state.game.draw(
                this.props.bubblePositions, 
                this.props.blasterPositions,
                this.props.projectilePositions
                )
        }

    }


    render(){
        if(this.state.ctx){
            this.start()
        }
        return(
            <div>
                <canvas id="game-canvas" width={width} height={height}>

                </canvas>
            </div>
        )
    }
    
}

export default GameView;