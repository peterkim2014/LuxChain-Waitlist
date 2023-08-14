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
        animateBasedOnScreenSize();
    }

    initialX = null; // Reset initialX for subsequent swipes
});

function animateBasedOnScreenSize() {
    const smallScreenQuery = window.matchMedia("(max-width: 414px) and (max-height: 897px)");
    const largeScreenQuery = window.matchMedia("(max-width: 820px) and (max-height: 1180px) and (min-width: 415px) and (min-height: 897px)");

    if (smallScreenQuery.matches) {
        animateAndChangeRoute('41.75%');
    } else if (largeScreenQuery.matches) {
        animateAndChangeRoute('45.75%');
    }
}

function animateAndChangeRoute(targetMargin) {
    mobileNavBarBox.style.transition = "margin-left 0.5s ease-out";
    mobileNavBarBox.style.marginLeft = targetMargin;

    // Wait for the animation to complete (assuming it takes 500ms) then change the route.
    setTimeout(function() {
        window.location.href = "/mobile_app_preview"; 
    }, 500);
}
