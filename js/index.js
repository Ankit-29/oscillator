const canvas = document.querySelector('canvas');
const sound = document.querySelector('audio');

canvas.width = canvas.closest('div').offsetWidth;
canvas.height = canvas.closest('div').clientHeight;

const ctx = canvas.getContext('2d');


let score = 0;
let position = canvas.width / 2;
let force = 5;
let flag = false;
let hurdles = [
    new RoundHurdle(parseInt(Math.random() * 50, 10) + 20, parseInt(Math.random() * canvas.width), 20),
    new RoundHurdle(parseInt(Math.random() * 50, 10) + 20, parseInt(Math.random() * canvas.width), canvas.height / 2),
    new RoundHurdle(parseInt(Math.random() * 50, 10) + 20, parseInt(Math.random() * canvas.width), canvas.height / 5),
];

const osc = new Oscillator(15, canvas.width / 2, canvas.height - 200, "#66fcf1");
generateHurdle = () => {
    hurdles.push(new RoundHurdle(parseInt(Math.random() * 20, 10) + 50, parseInt(Math.random() * canvas.width), 20));
}

getDistance = (osc, rh) => {
    return Math.sqrt(Math.pow(osc.x - rh.x, 2) + Math.pow(osc.y - rh.y, 2));
}

drawTest = () => {
    sound.play();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Comic Sans";
    ctx.fillStyle = "White";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, 70, 25);

    osc.draw();
    hurdles.forEach(hurdle => {
        hurdle.draw();
    });

    if (hurdles[0].y > canvas.height) {
        hurdles.shift();
        console.log(hurdles);
        score += 10;
    }

    if (flag) {
        hurdles.forEach(hurdle => {
            hurdle.y += 7;
        });
    }

    for (let i = 0; i < hurdles.length; i++) {
        // console.log(getDistance(osc, hurdles[i]) < (osc.radius + hurdles[i].radius));
        if (getDistance(osc, hurdles[i]) < (osc.radius + hurdles[i].radius) - 3) {
            navigator.vibrate([200, 200, 200, 200]);
            setTimeout(() => {
                alert(`Score ${score}`);
            })
            sound.pause();
            return;
        }
    }

    if (hurdles[hurdles.length - 1].y >= canvas.height / 2.5) {
        generateHurdle();
    }
    // console.log(hurdles[0].y > canvas.height);

    if (osc.x <= 15) {
        force = 5;
    }
    if (osc.x >= canvas.width-15) {
        force = -5;
    }
    osc.x += force;

    requestAnimationFrame(() => { drawTest(); });

}

canvas.addEventListener("mousedown", () => { flag = true });
canvas.addEventListener("mouseup", () => { flag = false });
canvas.addEventListener("touchstart", () => { flag = true });
canvas.addEventListener("touchend", () => { flag = false });

// generateHurdle();
drawTest();

