import { InputHandler } from './input.js'; // Steuerung 
import {Player} from './player.js'; // Player Stats
import {Background} from './background.js';
import {FlyingEnemy, GroundEnemy} from './enemies.js';
import {UI} from './UI.js'




window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    
    class Game {
        constructor(width,height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 50;
            this.speed = 0;//Verbunden mit LayerSpeed
            this.maxSpeed = 1;//Verbunden mit layerSpeed
            this.background = new Background(this) // this bezieht sich auf die ganzen Argumente Hier <=
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            //this.particles = [];
            this.enemies = [];// Enemies werden in ein Array gepusht
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = true;
            this.score = 0; // Kann direkt verändert werden die Scorepoints
            this.fontColor = "blue"; // Schriftfarbe ändern
            this.time = 0;
            this.maxTime = 59000; // Setting des Timer wann das Spiel beendet ist
            this.gameOver = false; // wurde mit einer If abfrage init auf UI.js
            this.lives = 3; // set the livepoints von UI zeile 26
            this.player.currentState = this.player.states[0]; // Die Sartfrequenz wie der Player anfangen soll
            this.player.currentState.enter();
            this.gameSound = new Audio('#gameSound'); // Background Music von Kirby Green Greens
        }
        update(deltaTime) {
            this.time += deltaTime;
            if(this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            //handle Enemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            // forEach weil für jeden Enemy der reinfliegt soll einer wieder mit splice entfernt werden aus dem Array
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            })
            // handle particels https://www.youtube.com/watch?v=6ppfyWdoH3c minute 21:32
            /*this.particles.forEach((particel) =>{
                particel.update();
                if(particel.markedForDeletion) this.particles.splice(index, 1);
            })*/


        }
        draw(context) {
            this.background.draw(context);

            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });
            this.UI.draw(context);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5)this.enemies.push(new GroundEnemy(this));// Hier werden die Enemies in das leere Array gepusht
            this.enemies.push(new FlyingEnemy(this)) // Hier werden die Enemies in das leere Array gepusht
            //console.log(this.enemies); //Added Enemies in Arrays dann siehst du es in der Konsole
        }
        

    }

    const game = new Game(canvas.width, canvas.height);
    //console.log(game);
    let lastTime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        
        ctx.clearRect(0,0,canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }

    
    animate(0);
    gameSound.play();
});