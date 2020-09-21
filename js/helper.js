import RoundHurdle from './roundHurdle.js';
import { RADIUS_MAX_RANDOM_VALUE, RADIUS_MIN_VALUE, HURDLE_START_POINT, HURDLE_TYPE, NO_OF_HURDLE, FLAT_HURDLE_MAX_WIDTH, FLAT_HURDLE_HEIGHT } from './constant.js'
import FlatHurdle from './flatHurdle.js';

export function generateHurdle(game) {
    const randomHurdle = Math.floor(Math.random() * NO_OF_HURDLE) + 1;
    switch (randomHurdle) {
        case HURDLE_TYPE.ROUND:
            const randomRadius = Math.floor(Math.random() * RADIUS_MAX_RANDOM_VALUE, 10) + RADIUS_MIN_VALUE;
            const randomX = Math.floor(Math.random() * game.gameWidth);
            return new RoundHurdle(game, randomRadius, { x: randomX, y: HURDLE_START_POINT });

        case HURDLE_TYPE.FLAT:
            const side = Math.floor(Math.random() * 2);
            const width = Math.floor(Math.random() * (FLAT_HURDLE_MAX_WIDTH - 100)) + 100;

            const position = {
                x: side ? game.gameWidth - width : 0,
                y: HURDLE_START_POINT
            };
            return new FlatHurdle(game, position, width);

    }

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

export function isCollidedWithFlatHurdle(osc, hurdle) {
    let testXPos = osc.position.x;
    let testYPos = osc.position.y;

    if (osc.position.x < hurdle.position.x) {
        // osc is on right side test for right edge
        testXPos = hurdle.position.x;
    } else if (osc.position.x > (hurdle.position.x + hurdle.width)) {
        // osc is on left side test for left edge
        testXPos = hurdle.position.x + hurdle.width;
    }

    if (osc.position.y < hurdle.position.y) {
        // osc is above test for top edge
        testYPos = hurdle.position.x;
    } else if (osc.position.y > (hurdle.position.y + FLAT_HURDLE_HEIGHT)) {
        // osc is on left side test for left edge
        testYPos = hurdle.position.y + FLAT_HURDLE_HEIGHT;
    }

    // get distance from closest edges
    const distX = osc.position.x - testXPos;
    const distY = osc.position.y - testYPos;

    const distance = (distX * distX) + (distY * distY);
    if (distance <= (osc.radius * osc.radius)) {
        return true;
    }
    return false;
}
