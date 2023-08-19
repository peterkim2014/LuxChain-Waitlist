$(document).ready(function() {

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

// Animate the mobile nav box and position
const mobileNavBox = $('.mobile-nav-box');
const routeMap = {
    "/#global-contact": "route-global-contact",
    "/#global-faq": "route-global-faq",
};

function animateMobileNavBox(route) {
    const targetClass = routeMap[route];
    if (targetClass) {
        mobileNavBox.removeClass("route-global-contact route-global-faq");
        mobileNavBox.addClass(targetClass);
    }
}

// Function to align mobile nav box based on the hash
function alignMobileNavBox() {
    const currentHash = window.location.hash;
    animateMobileNavBox(currentHash);
    setSideNavBarBoxPositionAndAnimate(currentHash);
}

// Set the initial position of the side nav bar box and animate
function setSideNavBarBoxPositionAndAnimate(section) {
    const viewportWidth = $(window).width();
        const viewportHeight = $(window).height();

        let targetMarginLeft = {};

        if (viewportWidth >= 769 && viewportWidth <= 820 && viewportHeight >= 1025 && viewportHeight <= 1180) {
            targetMarginLeft = {
                "#global-contact": '32%',
                "#global-faq": '68%',
            };
        } else if (viewportWidth >= 415 && viewportWidth <= 768 && viewportHeight >= 897 && viewportHeight <= 1024) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#global-contact": '32%',
                "#global-faq": '68%',
            };
        } else if (viewportWidth >= 361 && viewportWidth <= 390 && viewportHeight >= 741 && viewportHeight <= 844) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#global-contact": '32%',
                "#global-faq": '70%',
            };
        } else if (viewportWidth >= 361 && viewportWidth <= 375 && viewportHeight >= 667 && viewportHeight <= 896) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#global-contact": '30%',
                "#global-faq": '71%',
            };
        } else if (viewportWidth >= 391 && viewportWidth <= 414 && viewportHeight >= 845 && viewportHeight <= 896) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#global-contact": '32%',
                "#global-faq": '70%',
            };
        } else if (viewportWidth <= 360 && viewportHeight <= 740) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#global-contact": '32%',
                "#global-faq": '70.75%',
            };
        }
    
    // const targetMarginLeft = {
        // "#global-contact": '32%',
        // "#global-faq": '67.5%',
    // };
    mobileNavBox.css({
        'margin-left': targetMarginLeft[section],
        'transition': 'margin-left 0.5s ease-in-out' // Add smooth transition
    });

    animateMobileNavBox(section);
}

// Align mobile nav box on page load and hashchange
alignMobileNavBox();

// Animate mobile nav box and position on page load and hashchange
setSideNavBarBoxPositionAndAnimate(window.location.hash);

$(window).on('hashchange', function() {
    setSideNavBarBoxPositionAndAnimate(window.location.hash);
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