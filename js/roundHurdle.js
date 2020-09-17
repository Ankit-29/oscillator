export default class RoundHurdle {

    constructor(game, radius, position) {
        this.game = game;
        this.radius = radius;
        this.color = "#fff";
        this.position = position
    }

    update() {
        if (this.game.isGameMotionActive) {
            this.position.y += this.game.gameSpeed;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}