
  const trailElements = [];
  const trailLength = 10; 

  for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.width = '10px';
    trail.style.height = '10px';
    trail.style.backgroundColor = 'pink';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.opacity = (trailLength - i) / trailLength; 
    document.body.appendChild(trail);
    trailElements.push(trail);
  }

  document.addEventListener('mousemove', (e) => {
    trailElements.forEach((trail, index) => {
      setTimeout(() => {
        trail.style.left = `${e.pageX - 5}px`;
        trail.style.top = `${e.pageY - 5}px`;
      }, index * 20); 
    });
  });