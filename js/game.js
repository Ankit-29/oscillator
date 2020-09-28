import Oscillator from './oscillator.js';
import FlatHurdle from './flatHurdle.js';
import InputHandler from './inputHandler.js';
import { generateHurdle, drawScore, getDistance, isCollidedWithFlatHurdle } from './helper.js';
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
        this.gameState = GAME_STATE.RUNNING;
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
        [...this.gameObject, ...this.hurdles].forEach(obj => obj.draw(ctx));
        drawScore(this.score, ctx);
    }

    detectCollision() {
        let isCollided = this.hurdles.some(hurdle => {
            if (hurdle.radius && getDistance(this.osc, hurdle) < Math.pow((this.osc.radius + hurdle.radius), 2)) {
                return true;
            } else if (hurdle.width) {
                return isCollidedWithFlatHurdle(this.osc, hurdle);
            }
        });

        if (isCollided) {
            this.gameState = GAME_STATE.OVER;
            this.sound.pause();
            navigator.vibrate([200, 200, 200, 200]);
            document.querySelector("#score").innerHTML = `Socre: ${this.score}`;
            document.querySelector(".menu").style.display = "flex";
        }
    }

    toggleMotion() {
        this.isGameMotionActive = !this.isGameMotionActive;
    }
}