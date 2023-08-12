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


    if (diffX < -20) {
        // Swiped right
        // You can navigate to another HTML file here
        window.location.href = 'mobile_app_preview';
    }

    initialX = null;
});
