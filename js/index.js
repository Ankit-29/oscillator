const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.closest('div').offsetWidth;
canvas.height = canvas.closest('div').clientHeight;
const sound = document.querySelector('audio');
let score = 0;
let oscillatingForce = OSC_FORCE;
let isMouseDownOrTouchActive = false;



let hurdles = getStartingHurdles();

const osc = new Circle(OSC_RADIUS, canvas.width / 2, canvas.height - 200, OSC_COLOR);

gameLoop = () => {
    sound.play();
    clearCanvas();
    drawScore(score);
    osc.draw();
    hurdles.forEach(hurdle => {
        hurdle.draw();
    });

    for (let i = 0; i < hurdles.length; i++) {
        if (getDistance(osc, hurdles[i]) < Math.pow((osc.radius + hurdles[i].radius),2)) {
            navigator.vibrate([200, 200, 200, 200]);
            setTimeout(() => {
                alert(`Score ${score}`);
                window.location.reload();
            })
            sound.pause();
            return;
        }
    }

    if (isMouseDownOrTouchActive) {
        hurdles.forEach(hurdle => {
            hurdle.y += GAME_SPEED;
        });
    }

    if (hurdles[0].y > canvas.height) {
        hurdles.shift();
        increaseScore();
    }


    if (hurdles[hurdles.length - 1].y >= canvas.height / 2.5) {
        generateHurdle();
    }

    if (osc.x >= canvas.width - osc.radius || osc.x <= osc.radius) {
        changeOscillatingDirection();
    }

    osc.x += oscillatingForce;

    requestAnimationFrame(() => { gameLoop(); });

}

canvas.addEventListener("mousedown", () => { isMouseDownOrTouchActive = true });
canvas.addEventListener("mouseup", () => {
    setTimeout(() => {
        isMouseDownOrTouchActive = false;
    }, 180);
});
canvas.addEventListener("touchstart", () => { isMouseDownOrTouchActive = true });
canvas.addEventListener("touchend", () => {
    setTimeout(() => {
        isMouseDownOrTouchActive = false;
    }, 180);
});

gameLoop();

