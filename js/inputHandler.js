import { GAME_STATE } from "./constant.js ";

export default class InputHandler {

    constructor(game) {
        this.game = game;
        this.addEventHandlers();
    }


    addEventHandlers() {
        const canvas = document.querySelector('canvas');


        canvas.addEventListener("mousedown", () => {
            this.activateGameState();
            this.game.isGameMotionActive = true;
        });
        canvas.addEventListener("touchstart", () => {
            this.activateGameState();
            this.game.isGameMotionActive = true;
        });

        document.addEventListener("keydown", (e) => {
            this.activateGameState();
            if (e.code === 'Space') {
                this.game.isGameMotionActive = true;
            }
        });

        document.addEventListener("keyup", (e) => {
            if (e.code === 'Space') {
                this.game.isGameMotionActive = false;
            }
        });

        canvas.addEventListener("mouseup", () => {
            setTimeout(() => {
                this.game.isGameMotionActive = false;
            }, 180);
        });

        canvas.addEventListener("touchend", () => {
            setTimeout(() => {
                this.game.isGameMotionActive = false;
            }, 180);
        });
    }


    activateGameState() {
        if (this.game.gameState === GAME_STATE.MENU) {
            this.game.gameState = GAME_STATE.RUNNING;
        }

    }
}