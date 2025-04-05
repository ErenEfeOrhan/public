function startConfetti() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";

    const confettiPieces = [];
    const numConfetti = 100;

    for (let i = 0; i < numConfetti; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 2 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.random() * 10 - 5,
            tiltAngle: 0
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        updateConfetti();
    }

    function updateConfetti() {
        confettiPieces.forEach(p => {
            p.y += p.d;
            p.tiltAngle += 0.1;
            p.x += Math.sin(p.tiltAngle) * 2;
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();

    setTimeout(() => {
        document.body.removeChild(canvas);
    }, 5000);
}
