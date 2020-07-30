class Oscillator {
    constructor(radius, x, y, color = 'blue') {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
}