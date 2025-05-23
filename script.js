const canvas = document.getElementById('mesh');
const ctx = canvas.getContext('2d');
const stars = [];
const starCount = 200;
const maxDepth = 32;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initStars() {
    for (let i = 0; i < starCount; i++) {
        stars[i] = {
            x: Math.random() * canvas.width - canvas.width / 2,
            y: Math.random() * canvas.height - canvas.height / 2,
            z: Math.random() * maxDepth
        };
    }
}

function update() {
    for (let i = 0; i < starCount; i++) {
        stars[i].z -= 0.2;
        if (stars[i].z <= 0) {
            stars[i].z = maxDepth;
        }
    }
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < starCount; i++) {
        const k = 128 / stars[i].z;
        const x = stars[i].x * k + canvas.width / 2;
        const y = stars[i].y * k + canvas.height / 2;
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
            const size = (1 - stars[i].z / maxDepth) * 3;
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function frame() {
    update();
    draw();
    requestAnimationFrame(frame);
}

window.addEventListener('resize', resize);
resize();
initStars();
frame();
