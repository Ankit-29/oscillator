const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.closest('div').offsetWidth;
canvas.height = canvas.closest('div').clientHeight;


const sound = document.querySelector('audio');


let score = 0;
let oscillatingForce = OSC_FORCE;
let flag = false;

let hurdles = getStartingHurdles();

const osc = new Oscillator(OSC_RADIUS, canvas.width / 2, canvas.height - 200, OSC_COLOR);

gamePlay = () => {
    sound.play();
    clearCanvas();
    drawScore(score);
    osc.draw();
    hurdles.forEach(hurdle => {
        hurdle.draw();
    });

    for (let i = 0; i < hurdles.length; i++) {
        if (getDistance(osc, hurdles[i]) < (osc.radius + hurdles[i].radius)) {
            navigator.vibrate([200, 200, 200, 200]);
            setTimeout(() => {
                alert(`Score ${score}`);
                window.location.reload();
            })
            sound.pause();
            return;
        }
    }

    if (flag) {
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

    if (osc.x >= canvas.width - 15 || osc.x <= 15) {
        changeOscillatingDirection();
    }

    osc.x += oscillatingForce;

    requestAnimationFrame(() => { gamePlay(); });

}

canvas.addEventListener("mousedown", () => { flag = true });
canvas.addEventListener("mouseup", () => {
    setTimeout(() => {
        flag = false;
    }, 180);
});
canvas.addEventListener("touchstart", () => { flag = true });
canvas.addEventListener("touchend", () => {
    setTimeout(() => {
        flag = false;
    }, 180);
});

gamePlay();

