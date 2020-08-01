clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


drawScore = (score) => {
    ctx.font = "30px Comic Sans";
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${score}`, 80, 25);
}

changeOscillatingDirection = () => {
    oscillatingForce = -oscillatingForce;
}

increaseScore = () => {
    score += POINT;
}


generateHurdle = () => {
    hurdles.push(new RoundHurdle(parseInt(Math.random() * ROUND_HURDLE_RANDOM_RADIUS, 10) + ROUND_HURDLE_RADIUS_MIN, parseInt(Math.random() * canvas.width), HURDLE_START_POINT));
}

getDistance = (osc, rh) => {
    return Math.sqrt(Math.pow(osc.x - rh.x, 2) + Math.pow(osc.y - rh.y, 2));
}

getStartingHurdles = () => {
    return [
        new RoundHurdle(parseInt(Math.random() * ROUND_HURDLE_RANDOM_RADIUS, 10) + ROUND_HURDLE_RADIUS_MIN - 10, parseInt(Math.random() * canvas.width), HURDLE_START_POINT),
        // new RoundHurdle(parseInt(Math.random() * ROUND_HURDLE_RANDOM_RADIUS, 10) + ROUND_HURDLE_RADIUS_MIN - 10, parseInt(Math.random() * canvas.width), canvas.height / 2),
        // new RoundHurdle(parseInt(Math.random() * ROUND_HURDLE_RANDOM_RADIUS, 10) + ROUND_HURDLE_RADIUS_MIN-10, parseInt(Math.random() * canvas.width), HURDLE_START_POINT + 100),
    ];
}