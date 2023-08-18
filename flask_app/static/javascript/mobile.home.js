$(document).ready(function() {
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
    // Close the side nav bar when clicked outside the side-nav-bar or hamburger-icon
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.side-nav-bar').length && !$(e.target).hasClass('hamburger-icon')) {
            closeSideNavBar();
        }
    });

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

    // Rest of your code related to swiping features, orientation change, hamburger menu, etc.

    // Function to animate opacity for #global- pages
    function animateGlobalPagesOpacity(sectionId, targetOpacity, callback) {
        $(sectionId).stop(true).animate({
            opacity: targetOpacity
        }, 125, callback);
    }

    // Function to slide in a section from the specified direction
    function slideInSection(sectionId, direction, callback) {
        const offset = direction === 'left' ? '-100%' : '100%'; // Reverse the offset for swiping right
        $(sectionId).css({
            'transform': `translateX(${offset})`,
            'transition': 'transform 400ms ease-in-out' // Updated duration
        });

        // Wait for the transition to complete before invoking the callback
        setTimeout(callback, 400);
    }

    const swipeContainer = document.getElementById('swipe-container');
    const hammer = new Hammer(swipeContainer);

    // Handle swipe left
    hammer.on('swipeleft', function() {
        const currentSection = getCurrentSection();
        const nextSection = sectionMap[currentSection]?.left;
        if (nextSection) {
            animateGlobalPagesOpacity(`#${currentSection}`, 0, function() {
                // Animation complete, perform the section switch
                switchSection(nextSection);
                slideInSection(`#${nextSection}`, 'right', function() {
                    $(`#${nextSection}`).css('transform', 'none'); // Reset transform
                    animateGlobalPagesOpacity(`#${nextSection}`, 1); // Animate opacity back to 1
                }); // Slide in from the right
            });
        }
    });

    // Handle swipe right
    hammer.on('swiperight', function() {
        const currentSection = getCurrentSection();
        const nextSection = sectionMap[currentSection]?.right;
        if (nextSection) {
            animateGlobalPagesOpacity(`#${currentSection}`, 0, function() {
                // Animation complete, perform the section switch
                switchSection(nextSection);
                slideInSection(`#${nextSection}`, 'left', function() {
                    $(`#${nextSection}`).css('transform', 'none'); // Reset transform
                    animateGlobalPagesOpacity(`#${nextSection}`, 1); // Animate opacity back to 1
                }); // Slide in from the left
            });
        }
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
function closeSideNavBar() {
    // Slide the side nav bar out
    $('.side-nav-bar').css('transform', 'translateX(-100%)');

    // Show the hamburger-icon and hide the hamburger-return icon
    $('.hamburger-icon').show();
    // $('.hamburger-return').hide();
} 
    // Rest of your code related to swiping features, orientation change, hamburger menu, etc.
});
