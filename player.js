import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from './playerState.js';

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 1;// Gravitation
        this.image = document.getElementById('player'); //player in  der HTML
        this.frameX = 0; // Koordinationskarte des Sprites
        this.frameY = 0; /// Koordinationskarte des Sprites
        this.maxFrame;
        this.fps = 10; // Wie schnell bewegt sich der Sprite
        this.frameInterval = 1000/this.fps; // Wie schnell bewegt sich der Sprite
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [new Sitting(this.game), //verbunden mit PlayerState
             new Running(this.game),
              new Jumping(this.game),
               new Falling(this.game),
                new Rolling(this.game),
                 new Diving(this.game),
                  new Hit(this.game)];



    }
    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);
        //horizontal Movement
        this.x += this.speed;
        if (input.includes("ArrowRight"))/*indexOf*/ this.speed = this.maxSpeed; 
        else if (input.includes("ArrowLeft"))/*indexOf*/ this.speed = -this.maxSpeed;
        else this.speed = 0;
        // horizontal boundaries
        if(this.x < 0) this.x = 0;
        if(this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        //vertical Movement -- Gravitation
        
       // if (input.includes("ArrowUp") && this.onGround()) this.vy -= 20; // Gravitation
        this.y += this.vy;

        //if(this.frameX  < this.maxFrame) this.frameX++;   
        //else this.frameX = 0; // ES LEBT

        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        // horizontal Boundaries
        if(this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;


        //sprite animation
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX  < this.maxFrame) this.frameX++;   
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }  
        

    }
    //Zeichne Funktion
    draw(context) {
        //context.fillStyle = "red"; // Red Rectangle Char
        //context.fillRect(this.x, this.y, this.width, this.height); // Rectangle Char black
        if(this.game.debug) context.strokeRect(this.x, this.y,this.width,this.height) // Stroke  Rect = die ausenlinien des Kastens
        context.drawImage(this.image,this.frameX * this.width, this.frameY*this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        
    }
    // Player wenn er am Boden ist Bzw Definition
    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    // Player FrameSet //
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed; // Formel das es sich flüssig bewegt
        this.currentState.enter();
    }
    // Kollisionsfeld läuft über der rectAngle
    checkCollision(){
        this.game.enemies.map(enemy => {
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                //Collision Detected
                enemy.markedForDeletion = true;

                if(this.currentState === this.states[4] || this.currentState === this.states[5]) {
                    this.game.score++ // Get Point
                } else {
                    this.setState(6, 0); //HitUS
                    this.game.lives--;
                    if(this.game.lives <= 0) this.game.gameOver = true;
                }

            }
        })
    }
}