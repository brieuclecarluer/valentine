document.addEventListener('DOMContentLoaded', function() {
    const nonButton = document.querySelector('.non');
    let size = 100;

    nonButton.addEventListener('click', () =>{
        let currentHeight = nonButton.offsetHeight;
        let currentWidth = nonButton.offsetWidth;

        nonButton.style.height = (currentHeight + size)+'px';
        nonButton.style.width = (currentWidth + size)+'px';


        if (nonButton.offsetWidth >= window.innerWidth || nonButton.offsetHeight >= window.innerHeight) {
            nonButton.style.width = '100vw';
            nonButton.style.height = '100vh';
            nonButton.style.position = 'fixed';
            nonButton.style.top = '0';
            nonButton.style.left = '0';
            nonButton.style.zIndex = '1000';
        }

    });

});