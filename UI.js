export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25; // grösse des Textes  
        this.fontFamily = "Sans-Serif"; // schrift Art
        this.livesImage = document.getElementById("live"); // sind die herzen in  der Html von assets
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;
        // Score
        context.fillText("SCORE:" + this.game.score,10, 40); // Filltext ist eine Methode von JS

        //Timer
        context.font = this.fontSize * 0.5 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 200, 25); // Filltext ist eine Methode von JS

        // Lives
        for(let i = 0; i < this.game.lives; i++){
            context.drawImage(this.livesImage, 25 * i + 20,65,20,20); //koord wo du es zeichnen willst
        }
        

        // Game Over Messsage
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if(this.game.score > 10){// Win Condition
            context.fillText('Game Over', this.game.width * 0.5, this.game.height * 0.5 -20); // Filltext ist eine Methode von JS
            context.font = this.fontSize * .5 + 'px ' + this.fontFamily;
            context.fillText('Great Job', this.game.width * 0.5, this.game.height * 0.2); // Filltext ist eine Methode von JS
            }else {//Lose Condition
                context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
                context.fillText('Ready for next Player', this.game.width * 0.5, this.game.height * 0.4 -20); // Filltext ist eine Methode von JS
                context.font = this.fontSize * .7 + 'px ' + this.fontFamily;
                context.fillText('its that all what you got', this.game.width * 0.5, this.game.height * 0.2); // Filltext ist eine Methode von JS
            }

        }
        context.restore();
    }
}