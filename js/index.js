import Game from './game.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.closest('div').offsetWidth;
canvas.height = canvas.closest('div').clientHeight;
const sound = document.querySelector('audio');
const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;


const game = new Game(GAME_WIDTH, GAME_HEIGHT, sound);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(() => { gameLoop(); });
}

gameLoop();

