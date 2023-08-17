const swipeContainer = document.getElementById('swipe-container');
let initialX = null;
const mobileNavBarBox = document.querySelector('[alt="mobile nav bar box"]');

// Set the initial opacity of text elements to 0.
$('#swipe-container').css('opacity', '0');

// Upon page load, animate the opacity of these text elements to 1.
$(document).ready(function() {
    animateTextOpacity('1');
    
    $('.hamburger-icon').on('click', function() {
        // Slide the side nav bar in
        $('.side-nav-bar').css('transform', 'translateX(0)');

        // Hide the hamburger-icon and show the hamburger-return icon
        $('.hamburger-return').show();
    });

    $('.hamburger-return').on('click', function() {
        // Slide the side nav bar out
        $('.side-nav-bar').css('transform', 'translateX(-100%)');

        // Show the hamburger-icon and hide the hamburger-return icon
        $('.hamburger-icon').show();
        // $('.hamburger-return').hide();
    });

    // Close the side nav bar when clicked outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.side-nav-bar').length && !$(e.target).hasClass('hamburger-icon')) {
            closeSideNavBar();
        }
    });

    function closeSideNavBar() {
        // Slide the side nav bar out
        $('.side-nav-bar').css('transform', 'translateX(-100%)');

        // Show the hamburger-icon and hide the hamburger-return icon
        $('.hamburger-icon').show();
        // $('.hamburger-return').hide();
    }
});


// Upon page load, animate the opacity of these text elements to 1.
$(document).ready(function() {
    animateTextOpacity('1');

    // Grab all the swiping-features divs
    let swipingFeatures = document.querySelectorAll('.swiping-features > div');

    // Set the first div as the active div
    swipingFeatures[0].classList.add('active');

    // Function to switch to the next swiping-features div
    function switchSwipingFeature() {
    // Find the current active div
    let activeDiv = document.querySelector('.swiping-features > div.active');

    // Remove the active class from the current active div
    activeDiv.classList.remove('active');

    // Find the index of the next div
    let nextIndex = (Array.from(swipingFeatures).indexOf(activeDiv) + 1) % swipingFeatures.length;

    // Add the active class to the next div
    swipingFeatures[nextIndex].classList.add('active');
    }

    // Set up an interval to switch the swiping-features div every 3 seconds
    setInterval(switchSwipingFeature, 3000);
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
    }, 350);
}
