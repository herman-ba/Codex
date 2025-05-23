const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    generateStars();
}

function generateStars() {
    const count = Math.floor((width + height) / 8);
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * width,
        });
    }
}

function render() {
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, 0, width, height);

    for (const star of stars) {
        star.z -= 2;
        if (star.z <= 0) star.z = width;
        const k = 128.0 / star.z;
        const px = star.x * k + width / 2;
        const py = star.y * k + height / 2;
        const size = (1 - star.z / width) * 3;
        ctx.fillStyle = 'rgba(255, 255, 255,' + (1 - star.z / width) + ')';
        ctx.fillRect(px, py, size, size);
    }

    requestAnimationFrame(render);
}

window.addEventListener('resize', resize);
resize();
render();
