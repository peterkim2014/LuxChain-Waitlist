// Function to animate opacity of specific elements
function animateTextOpacity(targetOpacity) {
    $('#swipe-container').stop(true).animate({
        opacity: targetOpacity
    }, 1000);
}

function switchSection(dynamicLoad) {
    if (dynamicLoad) {
        // Hide all sections
        $(".dynamicLoad").hide();
        // Show the selected section
        $(`#${dynamicLoad}`).show();
        // Update the URL hash
        window.location.hash = dynamicLoad;
    }
}

// Listen to the hashchange event and switch to the appropriate section
$(window).on('hashchange', function() {
    switchSection(window.location.hash.substring(1));
});

// Set the initial opacity of the swipe container to 1
$('#swipe-container').css('opacity', '0');

// Show the correct section based on the initial URL hash
switchSection(window.location.hash.substring(1) || "global-contact");

// Upon page load, animate the opacity of these text elements to 1.
animateTextOpacity('1');

window.addEventListener("orientationchange", function() {
    if (window.orientation === 90 || window.orientation === -90) {
        // alert("Please use portrait mode!");
        window.location.reload();
    }
});

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

// Initialize Hammer.js on the swipe container
const swipeContainer = document.getElementById('swipe-container');
const hammer = new Hammer(swipeContainer);

// Handle swipe left
hammer.on('swipeleft', function() {
    switchSection("global-faq");
});

// Handle swipe right
hammer.on('swiperight', function() {
    switchSection("global-contact");
});

// Show the correct section based on the initial URL hash
switchSection(window.location.hash.substring(1) || "global-contact");

// Set the initial opacity of the swipe container to 1
$('#swipe-container').css('opacity', '1');
// });

// function animateBasedOnScreenSize() {
//     const smallScreenQuery = window.matchMedia("(max-width: 414px) and (max-height: 897px)");
//     const largeScreenQuery = window.matchMedia("(max-width: 820px) and (max-height: 1180px) and (min-width: 415px) and (min-height: 897px)");

//     if (smallScreenQuery.matches) {
//         animateAndChangeRoute('69.5%');
//     } else if (largeScreenQuery.matches) {
//         animateAndChangeRoute('67%');
//     }
// }

// function animateAndChangeRoute(targetMargin) {
//     // As the nav bar box starts to move, animate the opacity of the specific text elements back to 0.
//     animateTextOpacity('0');

//     // Simultaneously animate the margin of the nav bar box.
//     mobileNavBarBox.style.transition = "margin-left 0.5s ease-out";
//     mobileNavBarBox.style.marginLeft = targetMargin;

//     // After the animation is done, redirect.
//     setTimeout(function() {
//         window.location.href = "/FAQ"; 
//     }, 350);
// }