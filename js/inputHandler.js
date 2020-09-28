import { GAME_STATE } from "./constant.js ";

export default class InputHandler {

    constructor(game) {
        this.game = game;
        this.addEventHandlers();
    }


    addEventHandlers() {
        const canvas = document.querySelector('canvas');


        canvas.addEventListener("mousedown", () => {
            this.game.isGameMotionActive = true;
        });
        canvas.addEventListener("touchstart", () => {
            this.game.isGameMotionActive = true;
        });

        document.addEventListener("keydown", (e) => {
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

}