import RoundHurdle from './roundHurdle.js';
import { RADIUS_MAX_RANDOM_VALUE, RADIUS_MIN_VALUE, HURDLE_START_POINT } from './constant.js'

export function generateHurdle(game) {
    let randomRadius = Math.floor(Math.random() * RADIUS_MAX_RANDOM_VALUE, 10) + RADIUS_MIN_VALUE;
    let randomX = Math.floor(Math.random() * game.gameWidth);
    return new RoundHurdle(game, randomRadius, { x: randomX, y: HURDLE_START_POINT });
}


export function drawScore(score, ctx) {
    ctx.font = "30px Comic Sans";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${score}`, 80, 25);
}


export function getDistance(osc, rh) {
    return Math.pow(osc.position.x - rh.position.x, 2) + Math.pow(osc.position.y - rh.position.y, 2);
}
