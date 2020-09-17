import { OSC_COLOR, OSC_RADIUS, OSC_FORCE } from "./constant.js";

export default class Oscillator {

    constructor(game) {
        this.game = game;
        this.radius = OSC_RADIUS;
        this.color = OSC_COLOR;
        this.oscillatingForce = OSC_FORCE;
        this.position = { x: game.gameWidth / 2, y: game.gameHeight - 200 };
    }

    update() {
        if (this.position.x >= this.game.gameWidth - this.radius || this.position.x <= this.radius) {
            this.oscillatingForce = -this.oscillatingForce;
        }
        
        this.position.x += this.oscillatingForce;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}