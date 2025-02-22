document.addEventListener('DOMContentLoaded', function () {
    const nonButton = document.querySelector('.non');
    const ouiButton = document.querySelector('.oui');
    const kenza = document.querySelector('.kenza');
    const hideElements = document.querySelectorAll('.hide');
    const showElements = document.querySelectorAll('.show');
    const messageElement = document.getElementById('message');

    const messages = [
        "Clique sur Oui?",
        "Tu joue a quoi?",
        "Bah frère clique sur oui juste nan?",
        "Je le prend mal hein",
        "Bon aller arrete de faire genre tu veux cliquer sur Oui ca se voit",
        "Pff t'essaye juste de voir tout les messages a ce niveau",
        "Bah vzy t'sais quoi en fait je m'en fou de toi",
        "Bon... je vais te laisser réfléchir",
        "C'est bon tu as fini de réfléchir?",
        "T'es trop une actrice c'est grave",
        "Arrete de faire la princesse là",
        "Je vais pas te suplier crois pas",
        "T'facon t'es bloqué ici",
        "Quitte pas la page il y a une suprise sur le Oui",
        "Aller c'est le moment de cliquer",
        "3",
        "2",
        "1",
        "Clique sur Oui!",
    ];

    let isNonButtonClicked = false;
    let isNonButtonClickable = true;
    let ouiButtonSizex = 100;
    let ouiButtonSizey = 50;

    let x1 = 0, y1 = 0;
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
        dist_to_draw = 50,
        delay = 2000,
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

    function showButtons() {
        nonButton.style.display = 'inline-block';
        ouiButton.style.display = 'inline-block';

        nonButton.style.opacity = '1';
        ouiButton.style.opacity = '1';
    }

    let messageIndex = 0;
    function moveButton() {
        if (!isNonButtonClicked) return;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const buttonWidth = nonButton.offsetWidth;
        const buttonHeight = nonButton.offsetHeight;
        const ouiButtonRect = ouiButton.getBoundingClientRect();

        let randomX, randomY;
        let isOverlapping;

        do {
            randomX = Math.floor(Math.random() * (windowWidth - buttonWidth));
            randomY = Math.floor(Math.random() * (windowHeight - buttonHeight));

            const nonButtonRect = {
                left: randomX,
                top: randomY,
                right: randomX + buttonWidth,
                bottom: randomY + buttonHeight
            };

            isOverlapping = !(
                nonButtonRect.right < ouiButtonRect.left ||
                nonButtonRect.left > ouiButtonRect.right ||
                nonButtonRect.bottom < ouiButtonRect.top ||
                nonButtonRect.top > ouiButtonRect.bottom
            );
        } while (isOverlapping);

        nonButton.style.position = 'absolute';
        nonButton.style.transition = 'left 0.5s ease, top 0.5s ease';
        nonButton.style.left = `${randomX}px`;
        nonButton.style.top = `${randomY}px`;

        messageElement.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
    }

    function resizeButton() {
        if (!isNonButtonClicked) return;

        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;

        ouiButtonSizex += 15;
        ouiButtonSizey += 5;

        if (ouiButtonSizex > maxWidth) ouiButtonSizex = maxWidth;
        if (ouiButtonSizey > maxHeight) ouiButtonSizey = maxHeight;

        ouiButton.style.width = `${ouiButtonSizex}px`;
        ouiButton.style.height = `${ouiButtonSizey}px`;
    }

    function toggleContent() {
        kenza.style.fontSize = '50px';

        hideElements.forEach(element => {
            element.style.display = 'none'; 
        });

        showElements.forEach(element => {
            element.style.display = 'block';
        });

        showButtons(); 
        document.removeEventListener('click', toggleContent);
        document.removeEventListener('keydown', toggleContent);
        document.removeEventListener('touchstart', toggleContent);
    }

    nonButton.addEventListener('mouseover', function () {
        if (isNonButtonClicked) {
            moveButton();
            resizeButton();
        }
    });

    nonButton.addEventListener('click', function () {
        if (!isNonButtonClickable) return;
        isNonButtonClickable = false;

        isNonButtonClicked = true;
        resizeButton();
        moveButton();

        // Désactiver le bouton "Oui" pendant 1 seconde
        ouiButton.disabled = true;
        setTimeout(() => {
            ouiButton.disabled = false;
        }, 2000);

        setTimeout(() => {
            isNonButtonClickable = true;
        }, 500);
    });

    nonButton.addEventListener('touchstart', function (e) {
        if (!isNonButtonClickable) return;
        isNonButtonClickable = false;

        isNonButtonClicked = true;
        resizeButton();
        moveButton();

        // Désactiver le bouton "Oui" pendant 1 seconde
        ouiButton.disabled = true;
        setTimeout(() => {
            ouiButton.disabled = false;
        }, 2000);

        setTimeout(() => {
            isNonButtonClickable = true;
        }, 500);
    });

    ouiButton.addEventListener('click', function () {
        if (ouiButton.disabled) return; // Empêcher l'action si le bouton est désactivé
        window.location.href = 'accepte.html';
    });

    document.addEventListener('click', toggleContent);
    document.addEventListener('keydown', toggleContent);
    document.addEventListener('touchstart', toggleContent);
});