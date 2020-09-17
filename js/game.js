import Oscillator from './oscillator.js';
import InputHandler from './inputHandler.js';
import { generateHurdle, drawScore, getDistance } from './helper.js';
import { GAME_SPEED, GAME_STATE, POINT } from './constant.js';


export default class Game {

    constructor(gameWidth, gameHeight, sound) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.isGameMotionActive = false;
        this.gameSpeed = GAME_SPEED;
        new InputHandler(this);
        this.start();
        this.sound = sound;
    }

    start() {
        this.gameState = GAME_STATE.MENU;
        this.score = 0;
        this.hurdles = [];
        this.osc = new Oscillator(this);
        this.hurdles.push(generateHurdle(this));
        this.gameObject = [this.osc];
    }

    update() {
        if (this.gameState !== GAME_STATE.RUNNING) return;

        this.sound.play();

        if (this.hurdles[this.hurdles.length - 1].position.y >= this.gameHeight / 2.5) {
            this.hurdles.push(generateHurdle(this));
        }

        if (this.hurdles[0].position.y > this.gameHeight) {
            this.hurdles.shift();
            this.score += POINT;
        }

        this.detectCollision();

        [...this.gameObject, ...this.hurdles].forEach(obj => obj.update());

    }

    draw(ctx) {
        if (this.gameState === GAME_STATE.MENU) {
            ctx.fillStyle = "rgb(240,248,255,0.5)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = "30px Comic Sans";
            ctx.fillStyle = "#fff";
            ctx.fillText(`Click or Tap to Start`, this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gameState === GAME_STATE.OVER) {
            ctx.fillStyle = "rgb(240,248,255,0.5)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = "30px Comic Sans";
            ctx.fillStyle = "#fff";
            ctx.fillText(`Game Over`, this.gameWidth / 2, this.gameHeight / 2);
        }

        [...this.gameObject, ...this.hurdles].forEach(obj => obj.draw(ctx));
        drawScore(this.score, ctx);
    }

    detectCollision() {
        let isCollided = this.hurdles.some(hurdle => {
            if (getDistance(this.osc, hurdle) < Math.pow((this.osc.radius + hurdle.radius), 2)) {
                return true;
            }
        });

        if (isCollided) {
            this.gameState = GAME_STATE.OVER;
            this.sound.pause();
            navigator.vibrate([200, 200, 200, 200]);
        }
    }

    toggleMotion() {
        this.isGameMotionActive = !this.isGameMotionActive;
    }
}