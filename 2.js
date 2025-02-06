
let x1 = 0, y1 = 0;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
    dist_to_draw = 50,
    delay = 1000,
    fsize = ['20px', '25px', '30px', '35px'],
    rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    selRand = (o) => o[rand(0, o.length - 1)],
    distanceTo = (x1, y1, x2, y2) => Math.sqrt((Math.pow(x2 - x1, 2)) + (Math.pow(y2 - y1, 2))),
    shouldDraw = (x, y) => (distanceTo(x1, y1, x, y) >= dist_to_draw),
    addHeart = (x, y) => {
        const heart = document.createElement("div");
        heart.innerHTML = '❤️';
        heart.className = 'heart';
        heart.style.top = `${y + rand(-20, 20)}px`;
        heart.style.left = `${x}px`;
        heart.style.fontSize = selRand(fsize);
        document.body.appendChild(heart);

        const fs = 10 + 5 * parseFloat(getComputedStyle(heart).fontSize);

        heart.animate({
            translate: `0 ${(y + fs) > vh ? vh - y : fs}px`,
            opacity: 0,
            transform: `rotateX(${rand(1, 500)}deg) rotateY(${rand(1, 500)}deg)`
        }, {
            duration: delay,
            fill: 'forwards',
        });

        setTimeout(() => {
            heart.remove();
        }, delay);
    };

const handleInteraction = (x, y) => {
    if (shouldDraw(x, y)) {
        addHeart(x, y);
        x1 = x;
        y1 = y;
    }
};

addEventListener("mousemove", (e) => {
    handleInteraction(e.clientX, e.clientY);
});

addEventListener("click", (e) => {
    handleInteraction(e.clientX, e.clientY);
});

addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
});

addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    handleInteraction(touch.clientX, touch.clientY);
});