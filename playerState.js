//import { Dust } from "./particles";

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6
}

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}
// Sitting
export class Sitting extends State {
    constructor(game) {
        super('SITTING', game);

    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;

    }
    handleInput(input){
        if(input.includes("ArrowLeft") || input.includes("ArrowRight")){
            this.game.player.setState(states.RUNNING, 1/*GameSpeed=layerSpeed*/)
        } else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 1.5/*GameSpeed=layerSpeed*/)
        }
    }
}
// RUN
export class Running extends State {
    constructor(game) {
        super('RUNNING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;//sprite positione


    }
    handleInput(input){
        //this.game.particles.push(new Dust(this.game, this.game.player.x, this.game.player.y));
        if(input.includes("ArrowDown")){
            this.game.player.setState(states.SITTING, 0)
        }else if(input.includes("ArrowUp")){
            this.game.player.setState(states.JUMPING, 1)
        }else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 1.5/*GameSpeed=layerSpeed*/)
        }
    }
}

// JUMPING
export class Jumping extends State {
    constructor(game) {
        super('JUMPING', game);
    }
    enter(){
        if(this.game.player.onGround()) this.game.player.vy -= 24;
        this.game.player.maxFrame = 6;
        this.game.player.frameX = 0;

        this.game.player.frameY = 1;//sprite position

    }
    handleInput(input){
        if(this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        } else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 2/*GameSpeed=layerSpeed*/);
        } else if(input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}
// FALLING
export class Falling extends State {
    constructor(game) {
        super('FALLING',game);
    }
    enter(){
        if(this.game.player.onGround()) this.game.player.vy -= 20;
        this.game.player.maxFrame = 6;
        this.game.player.frameX = 0;

        this.game.player.frameY = 2;//sprite positione

    }
    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1)
        } else if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 1.5/*GameSpeed=layerSpeed*/)
        } else if(input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

// Rolling
export class Rolling extends State {
    constructor(game) {
        super('ROLLING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameX = 0;

        this.game.player.frameY = 6;//sprite positione

    }
    handleInput(input){
        if(!input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1)
        }
        else if(!input.includes('Enter') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1)
        } else if(input.includes('Enter')&& input.includes('ArrowUp') && this.game.player.onGround()){
            this.game.player.vy -= 25;
        } else if(input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

// Diving
export class Diving extends State {
    constructor(game) {
        super('DIVING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;

        this.game.player.frameY = 6;//sprite positione
        this.game.player.vy = 20;

    }
    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1)
        }
        else if(input.includes('Enter') && !this.game.player.onGround()){
            this.game.player.setState(states.ROLLING, 2)
        } 
    }
}

// Hit
export class Hit extends State {
    constructor(game) {
        super('HIT', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;

        this.game.player.frameY = 4;//sprite positione


    }
    handleInput(input){
        if(this.game.player.frameX >= 10 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }
        else if(this.game.player.frameX >= 10 && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        } 
    }
}