const swipeContainer = document.getElementById('swipe-container');
let initialX = null;
const mobileNavBarBox = document.querySelector('[alt="mobile nav bar box"]');

// Set the initial opacity of text elements to 0.
$('#swipe-container').css('opacity', '0');

// Upon page load, animate the opacity of these text elements to 1.
$(document).ready(function() {
    animateTextOpacity('1');
});

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
        handleSwipeRight();
    } else if (diffX < -20) {
        // Swiped left
        handleSwipeLeft();
    }

    initialX = null;
});

function handleSwipeRight() {
    animateAndChangeRoute('18.5%', '/');
}

function handleSwipeLeft() {
    animateAndChangeRoute('75%', '/mobile_join_waitlist');
}

function animateTextOpacity(targetOpacity) {
    $('#swipe-container').stop(true).animate({
        opacity: targetOpacity
    }, 1000);
}

function animateAndChangeRoute(targetMargin, targetRoute) {
    // As the nav bar box starts to move, animate the opacity of the specific text elements back to 0.
    animateTextOpacity('0');

    // Simultaneously animate the margin of the nav bar box.
    mobileNavBarBox.style.transition = "margin-left 0.5s ease-out";
    mobileNavBarBox.style.marginLeft = targetMargin;

    // After the animation is done, redirect.
    setTimeout(function() {
        window.location.href = targetRoute;
    }, 600);
}
