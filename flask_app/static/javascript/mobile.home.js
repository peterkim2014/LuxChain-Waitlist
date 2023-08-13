const swipeContainer = document.getElementById('swipe-container');
let initialX = null;

const mobileNavBarBox = document.querySelector('[alt="mobile nav bar box"]');

swipeContainer.addEventListener('touchstart', (e) => {
    initialX = e.touches[0].clientX;
});

swipeContainer.addEventListener('touchmove', (e) => {
    console.log("touched")
    // if (initialX === null) return;

    const currentX = e.touches[0].clientX;
    const diffX = initialX - currentX;

    if (diffX > 20) { // This means you've swiped left
        animateAndChangeRoute();
    }

    initialX = null; // Reset initialX for subsequent swipes
});

function animateAndChangeRoute() {
    // Animate the margin-left to 41.75%
    mobileNavBarBox.style.transition = "margin-left 0.5s ease-out";
    mobileNavBarBox.style.marginLeft = '41.75%';

    // Wait for the animation to complete (assuming it takes 500ms) then change the route.
    setTimeout(function() {
        window.location.href = "/mobile_app_preview"; // Update to your new route after animation
    }, 500);
}


