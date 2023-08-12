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
        console.log('Swiped right');
        window.location.href = '/';
    } else if (diffX < -20) {
        console.log('Swiped left');
        window.location.href = 'mobile.home.preview.html';
    }

    initialX = null;
});