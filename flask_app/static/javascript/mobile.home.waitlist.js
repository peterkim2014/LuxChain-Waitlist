// Function to animate opacity of specific elements
function animateTextOpacity(targetOpacity) {
    $('#swipe-container').stop(true).animate({
        opacity: targetOpacity
    }, 1000);
}

// Set the initial opacity of text elements to 0.
$('#swipe-container').css('opacity', '0');

// Upon page load, animate the opacity of these text elements to 1.
$(document).ready(function() {
    animateTextOpacity('1');
});

const swipeContainer = document.getElementById('swipe-container');
let initialX = null;

const mobileNavBarBox = document.querySelector('[alt="mobile nav bar box"]');

swipeContainer.addEventListener('touchstart', (e) => {
    initialX = e.touches[0].clientX;
});



swipeContainer.addEventListener('touchmove', (e) => {
    console.log("touched")

    const currentX = e.touches[0].clientX;


    const diffX = initialX - currentX;

    if (diffX < -20) { // Detected a left swipe
        animateBasedOnScreenSize();
    }

    initialX = null; // Reset initialX for subsequent swipes
});

function animateBasedOnScreenSize() {
    const smallScreenQuery = window.matchMedia("(max-width: 414px) and (max-height: 897px)");
    const largeScreenQuery = window.matchMedia("(max-width: 820px) and (max-height: 1180px) and (min-width: 415px) and (min-height: 897px)");

    if (smallScreenQuery.matches) {
        animateAndChangeRoute('41.75%');
        // animateAndChangeRoute('100%');
    } else if (largeScreenQuery.matches) {
        animateAndChangeRoute('45.75%');
        // animateAndChangeRoute('100%');
    }
}

function animateAndChangeRoute(targetMargin) {
    // As the nav bar box starts to move, animate the opacity of the specific text elements back to 0.
    animateTextOpacity('0');

    // Simultaneously animate the margin of the nav bar box.
    mobileNavBarBox.style.transition = "margin-left 0.5s ease-out";
    mobileNavBarBox.style.marginLeft = targetMargin;

    // After the animation is done, redirect.
    setTimeout(function() {
        window.location.href = "/mobile_app_preview"; 
    }, 600);
}

