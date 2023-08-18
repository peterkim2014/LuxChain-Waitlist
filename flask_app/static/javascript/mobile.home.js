

// Map sections to their corresponding left and right swipe sections
const sectionMap = {
    "global-intro": { right: "global-waitlist", left: "global-app" },
    "global-app": { right: "global-intro", left: "global-waitlist" },
    "global-waitlist": { right: "global-app", left: "global-intro" },
};

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

// Function to get current section
function getCurrentSection() {
    return window.location.hash.substring(1) || "global-intro";
}


// Listen to the hashchange event and switch to the appropriate section
$(window).on('hashchange', function() {
    switchSection(window.location.hash.substring(1));
});

// Set the initial opacity of the swipe container to 1
$('#swipe-container').css('opacity', '0');

// Show the correct section based on the initial URL hash
switchSection(window.location.hash.substring(1) || "global-intro");

// Upon page load, animate the opacity of these text elements to 1.
animateTextOpacity('1');


$(document).ready(function() {
    // Animate the mobile nav box and position
    const mobileNavBox = $('.mobile-nav-box');
    const routeMap = {
        "/#global-intro": "route-intro",
        "/#global-app": "route-app",
        "/#global-waitlist": "route-waitlist"
    };

    function animateMobileNavBox(route) {
        const targetClass = routeMap[route];
        if (targetClass) {
            mobileNavBox.removeClass("route-intro route-app route-waitlist");
            mobileNavBox.addClass(targetClass);
        }
    }

    // Set the initial position of the side nav bar box and animate
    function setSideNavBarBoxPositionAndAnimate(section) {
        const targetMarginLeft = {
            "#global-intro": '18.2%',
            "#global-app": '45%',
            "#global-waitlist": '75%',
        };
        mobileNavBox.css({
            'margin-left': targetMarginLeft[section],
            'transition': 'margin-left 0.5s ease-in-out' // Add smooth transition
        });

        animateMobileNavBox(section);
    }

    // Animate mobile nav box and position on page load and hashchange
    setSideNavBarBoxPositionAndAnimate(getCurrentSection());

    $(window).on('hashchange', function() {
        setSideNavBarBoxPositionAndAnimate(window.location.hash);
    });






    let swipingFeatures = document.querySelectorAll('.swiping-features > div');
    swipingFeatures[0].classList.add('active');

    function switchSwipingFeature() {
        let activeDiv = document.querySelector('.swiping-features > div.active');
        activeDiv.classList.remove('active');

        let nextIndex = (Array.from(swipingFeatures).indexOf(activeDiv) + 1) % swipingFeatures.length;

        activeDiv.classList.add('out');
        swipingFeatures[nextIndex].classList.add('entering');

        setTimeout(() => {
            activeDiv.classList.remove('out');
            swipingFeatures[nextIndex].classList.remove('entering');
            swipingFeatures[nextIndex].classList.add('active');
        }, 1000); // This timing might need adjustment

        // Ensure that other text elements are hidden
        for (let i = 0; i < swipingFeatures.length; i++) {
            if (i !== nextIndex) {
                swipingFeatures[i].classList.remove('active');
            }
        }
    }

    setInterval(switchSwipingFeature, 3000);

    window.addEventListener("orientationchange", function() {
        if (window.orientation === 90 || window.orientation === -90) {
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
    const currentSection = getCurrentSection();
    const nextSection = sectionMap[currentSection]?.left;
    if (nextSection) {
        switchSection(nextSection);
    }
});

// Handle swipe right
hammer.on('swiperight', function() {
    const currentSection = getCurrentSection();
    const nextSection = sectionMap[currentSection]?.right;
    if (nextSection) {
        switchSection(nextSection);
    }
});

// Show the correct section based on the initial URL hash
switchSection(window.location.hash.substring(1) || "global-intro");

// Set the initial opacity of the swipe container to 1
$('#swipe-container').css('opacity', '1');
// });

