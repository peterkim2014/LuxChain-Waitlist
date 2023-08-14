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
        // Add fade-out class
        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');

        // Delay the actual navigation to allow the transition to play
        setTimeout(() => {
            window.location.href = 'mobile_app_preview';
        }, 100); // 500ms delay to match the 0.5s transition
    }

   
    initialX = null;
});