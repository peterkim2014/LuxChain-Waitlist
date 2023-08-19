

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

    // Function to align mobile nav box based on the hash
    function alignMobileNavBox() {
        const currentHash = window.location.hash;
        animateMobileNavBox(currentHash);
        setSideNavBarBoxPositionAndAnimate(currentHash);
    }

    // Function to set the initial position of the side nav bar box and animate
    function setSideNavBarBoxPositionAndAnimate(section) {
        const viewportWidth = $(window).width();
        const viewportHeight = $(window).height();

        let targetMarginLeft = {};

        if (viewportWidth >= 769 && viewportWidth <= 820 && viewportHeight >= 1025 && viewportHeight <= 1180) {
            targetMarginLeft = {
                "#global-intro": '18.2%',
                "#global-app": '45%',
                "#global-waitlist": '75%',
            };
        } else if (viewportWidth >= 415 && viewportWidth <= 768 && viewportHeight >= 897 && viewportHeight <= 1024) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#global-intro": '18.2%',
                "#global-app": '45%',
                "#global-waitlist": '75%',
            };
        } else if (viewportWidth >= 361 && viewportWidth <= 390 && viewportHeight >= 741 && viewportHeight <= 844) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#global-intro": '13%',
                "#global-app": '42%',
                "#global-waitlist": '75%',
            };
        } else if (viewportWidth >= 361 && viewportWidth <= 375 && viewportHeight >= 667 && viewportHeight <= 896) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#global-intro": '13%',
                "#global-app": '42%',
                "#global-waitlist": '75%',
            };
        } else if (viewportWidth >= 391 && viewportWidth <= 414 && viewportHeight >= 845 && viewportHeight <= 896) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#global-intro": '14%',
                "#global-app": '42%',
                "#global-waitlist": '75%',
            };
        }

        mobileNavBox.css({
            'margin-left': targetMarginLeft[section],
            'transition': 'margin-left 0.5s ease-in-out' // Add smooth transition
        });

        animateMobileNavBox(section);
    }

    // Align mobile nav box on page load and hashchange
    alignMobileNavBox();

    // Animate mobile nav box and position on page load and hashchange
    setSideNavBarBoxPositionAndAnimate(getCurrentSection());

    $(window).on('hashchange', function() {
        setSideNavBarBoxPositionAndAnimate(window.location.hash);
    });



    // Track scroll position
    let lastScrollPos = 0;
    const opaqueDistance = window.innerHeight * 0.2; // 20% of the viewport height

    // Function to handle scroll and opacity animation
    function handleScroll() {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos > lastScrollPos) {
            // Scrolling down
            // $('.content').removeClass('opaque');
            $('#global-app').removeClass('hidden'); // Ensure #global-app is visible when scrolling down
        } else {
            // Scrolling up
            if (currentScrollPos <= opaqueDistance) {
                // $('.content').addClass('opaque');
                $('#global-app').addClass('hidden'); // Hide #global-app
                $('.mobile-header').addClass('small'); // Add the small class
            } else {
                // $('.content').removeClass('opaque');
                $('#global-app').removeClass('hidden');
                $('.mobile-header').removeClass('small'); // Remove the small class
            }
        }

        lastScrollPos = currentScrollPos;
    }
    // Attach scroll event listener
    $(window).on('scroll', handleScroll);

    // Initialize Hammer.js on the swipe container
    const swipeContainer = document.getElementById('swipe-container');
    const hammer = new Hammer(swipeContainer);

    // Variable to keep track of initial pan position
    let initialPanPos = null;

    // Attach pan event listener
    hammer.on('panstart', function(e) {
        initialPanPos = e.center.y;
    });

    hammer.on('panmove', function(e) {
        if (initialPanPos !== null) {
            const currentPanPos = e.center.y;
            const deltaY = currentPanPos - initialPanPos;

            // Update the initial pan position for the next iteration
            initialPanPos = currentPanPos;

            // Calculate the new scroll position
            const currentScrollPos = window.scrollY - deltaY;

            // Handle scroll based on the new position
            handleScroll(currentScrollPos);
        }
    });

    hammer.on('panend', function() {
        // Reset the initial pan position
        initialPanPos = null;
    });

    // Attach scroll event listener for desktop browsers
    $(window).on('scroll', function() {
        // Handle scroll based on the current scroll position
        handleScroll(window.scrollY);
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

