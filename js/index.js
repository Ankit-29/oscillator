const canvas = document.querySelector('canvas');

canvas.width = canvas.closest('div').offsetWidth;
canvas.height = canvas.closest('div').clientHeight;

const ctx = canvas.getContext('2d');

let position = canvas.width / 2;
let yPos = canvas.height - 20;
let force = 5;



drawTest = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(position, yPos, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();
    if (position <= 0) {
        force = 5;
    }
    if (position >= canvas.width) {
        force = -5;
    }
    position += force;

    requestAnimationFrame(() => { drawTest(); });

}

canvas.addEventListener("click", () => { yPos -= 10 });

drawTest();