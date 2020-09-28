import { GAME_STATE } from './constant.js';
import Game from './game.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.closest('div').offsetWidth;
canvas.height = canvas.closest('div').clientHeight;
const sound = document.querySelector('audio');
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let game;


function gameLoop() {
    if(game.gameState === GAME_STATE.OVER){
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(() => { gameLoop(); });
}


document.querySelector('.btn').addEventListener('click', (ele) => {
    game = new Game(GAME_WIDTH, GAME_HEIGHT, sound);
    document.querySelector(".menu").style.display = "none";
    gameLoop();
});


