import { FLAT_HURDLE_HEIGHT } from "./constant.js";

export default class FlatHurdle {

    constructor(game, position, width) {
        this.game = game;
        this.width = width
        this.color = "#fff";
        this.position = position;
        this.height = FLAT_HURDLE_HEIGHT;
    }

    update() {
        if (this.game.isGameMotionActive) {
            this.position.y += this.game.gameSpeed;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}