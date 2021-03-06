class Layer {
    constructor(game, width, height, speedModifier, image){
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    update(){
        if(this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background{
    constructor(game){
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer5image = document.getElementById('layer5') ;
        this.layer1 = new Layer(this.game, this.width, this.height, 2/*Layer Speed*/, this.layer5image);
        this.backgroundLayer = [this.layer1];
    }

    update(){
        this.backgroundLayer.forEach(layer => {
            layer.update();
        })
    }
    draw(context){
        this.backgroundLayer.forEach(layer => {
            layer.draw(context);
        })
    }
}