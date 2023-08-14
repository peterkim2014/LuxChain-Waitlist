const swipeContainer = document.getElementById('swipe-container');
let initialX = null;

swipeContainer.addEventListener('touchstart', (e) => {
    console.log('Touchstart detected');
    initialX = e.touches[0].clientX;
});

swipeContainer.addEventListener('touchmove', (e) => {
    if (initialX === null) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - initialX;

    console.log('DiffX:', diffX);

    if (diffX > 20) {
        // Swiped right
        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = '/';
        }, 500); // Match the transition duration

    } else if (diffX < -20) {
        // Swiped left
        document.body.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = 'mobile.home.preview.html';
        }, 500); // Match the transition duration
    }

    initialX = null;
});