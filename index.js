    document.addEventListener('DOMContentLoaded', function () {
        const nonButton = document.querySelector('.non');
        const ouiButton = document.querySelector('.oui');
        const hideElements = document.querySelectorAll('.hide');
        const showElements = document.querySelectorAll('.show');
        const messageElement = document.getElementById('message'); // Récupère l'élément du message
    
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
        function showButtons() {
            nonButton.style.display = 'inline-block';
            ouiButton.style.display = 'inline-block';
        }
        let messageIndex = 0;
        function moveButton() {
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
    
        function toggleContent() {
            hideElements.forEach(element => {
                element.classList.toggle('hide');
                element.classList.toggle('show');
            });
    
            showElements.forEach(element => {
                element.classList.toggle('hide');
                element.classList.toggle('show');
            });
    
            showButtons(); // Afficher les boutons après le premier clic ou touche
            document.removeEventListener('click', toggleContent);
            document.removeEventListener('keydown', toggleContent);
        }
    
        nonButton.addEventListener('mouseover', moveButton);
        nonButton.addEventListener('click', moveButton);
    
        ouiButton.addEventListener('click', () => {
            alert('Tu fais le bon choix là! 💖');
        });
    
        document.addEventListener('click', toggleContent);
        document.addEventListener('keydown', toggleContent);
    });