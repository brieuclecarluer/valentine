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
    let ouiButtonSizex = 100; 
    let ouiButtonSizey = 50; 

    let x1 = 0, y1 = 0;
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
        dist_to_draw = 50,
        delay = 1000,  
        fsize = [
            '20px', '25px', '30px', '35px'
        ],  
        rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,  
        selRand = (o) => o[rand(0, o.length -1)],  
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

    addEventListener("mousemove", (e) => {
    const {clientX, clientY} = e;
    if (shouldDraw(clientX, clientY)) {
        addHeart(clientX, clientY);
        x1 = clientX;
        y1 = clientY;
        }
    });


    function showButtons() {
        nonButton.style.display = 'inline-block';
        ouiButton.style.display = 'inline-block';
    }

    let messageIndex = 0;
    function moveButton() {
        if (!isNonButtonClicked) return;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const buttonWidth = nonButton.offsetWidth;
        const buttonHeight = nonButton.offsetHeight;
        const randomX = Math.floor(Math.random() * (windowWidth - buttonWidth));
        const randomY = Math.floor(Math.random() * (windowHeight - buttonHeight));

        nonButton.style.position = 'absolute';
        nonButton.style.left = `${randomX}px`;
        nonButton.style.top = `${randomY}px`;

        messageElement.textContent = messages[messageIndex];
        messageIndex = (messageIndex + 1) % messages.length;
    }

    function resizeButton() {
        if (!isNonButtonClicked) return;
        ouiButtonSizex += 15;
        ouiButtonSizey += 5;
        ouiButton.style.width = `${ouiButtonSizex}px`;
        ouiButton.style.height = `${ouiButtonSizey}px`;
    }

    function toggleContent() {
        kenza.style.fontSize = '50px';

        hideElements.forEach(element => {
            element.classList.toggle('hide');
            element.classList.toggle('show');
        });

        showElements.forEach(element => {
            element.classList.toggle('hide');
            element.classList.toggle('show');
        });

        showButtons();
        document.removeEventListener('click', toggleContent);
        document.removeEventListener('keydown', toggleContent);
    }

    nonButton.addEventListener('click', function () {
        isNonButtonClicked = true; 
        moveButton();
    });

    nonButton.addEventListener('mouseover', function () {
        if (isNonButtonClicked) {
            moveButton();
            resizeButton(); 
        }
    });

    ouiButton.addEventListener('click', function () {
        window.location.href = 'accepte.html'; 
    });

    document.addEventListener('click', toggleContent);
    document.addEventListener('keydown', toggleContent);
});
