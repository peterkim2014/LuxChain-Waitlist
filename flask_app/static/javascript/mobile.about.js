$(document).ready(function() {
    function animateTextOpacity(targetOpacity) {
        $('#swipe-container').stop(true).animate({
            opacity: targetOpacity
        }, 1000);
    }

    function switchSection(dynamicLoad) {
        if (dynamicLoad) {
            // Hide all sections
            $(".dynamicLoad").hide();
            
            // Show the selected section with a fade-in animation
            $(`#${dynamicLoad}`).show().addClass('fade-in');
            
            // Remove the fade-in class after the animation is done
            setTimeout(() => {
                $(`#${dynamicLoad}`).removeClass('fade-in');
            }, 500);
            
            // Update the URL hash
            window.location.hash = dynamicLoad;
        }
    }
    const mobileHeader = $(".mobile-header");
    const mobileHeaderHeight = mobileHeader.outerHeight();
    let previousScroll = 0;

    $(window).on("scroll", function() {
        const currentScroll = $(this).scrollTop();

        if (currentScroll > (mobileHeaderHeight - 75) && currentScroll > previousScroll) {
            mobileHeader.slideUp(300); // Slide up with animation
        } else if (currentScroll < 50) { // Slide down only at the top of the page
            mobileHeader.slideDown(300); // Slide down with animation
        }

        previousScroll = currentScroll;
    });

    // Listen to the hashchange event and switch to the appropriate section
    $(window).on('hashchange', function() {
        switchSection(window.location.hash.substring(1));
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
            $('#about-info').removeClass('hidden'); // Ensure #about-info is visible when scrolling down
        } else {
            // Scrolling up
            if (currentScrollPos <= opaqueDistance) {
                // $('.content').addClass('opaque');
                $('#about-info').addClass('hidden'); // Hide #about-info
                $('.mobile-header').addClass('small'); // Add the small class
            } else {
                // $('.content').removeClass('opaque');
                $('#about-info').removeClass('hidden');
                $('.mobile-header').removeClass('small'); // Remove the small class
            }
        }

        lastScrollPos = currentScrollPos;
    }
    // Attach scroll event listener
    $(window).on('scroll', handleScroll);

    // Set the initial opacity of the swipe container to 1
    $('#swipe-container').css('opacity', '0');

    // Show the correct section based on the initial URL hash
    switchSection(window.location.hash.substring(1) || "about");

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
        "/#about": "route-about",
        "/#about-info": "route-about-info",
    };

    function animateMobileNavBox(route) {
        const targetClass = routeMap[route];
        if (targetClass) {
            mobileNavBox.removeClass("route-about route-about-info");
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
                "#about": '26.75%',
                "#about-info": '65%',
            };
        } else if (viewportWidth >= 415 && viewportWidth <= 768 && viewportHeight >= 897 && viewportHeight <= 1024) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#about": '26.5%',
                "#about-info": '65%',
            };
        } else if (viewportWidth >= 361 && viewportWidth <= 390 && viewportHeight >= 741 && viewportHeight <= 844) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#about": '21.75%',
                "#about-info": '63%',
            };
        } else if (viewportWidth >= 361 && viewportWidth <= 375 && viewportHeight >= 667 && viewportHeight <= 896) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#about": '23%',
                "#about-info": '62.5%',
            };
        } else if (viewportWidth >= 391 && viewportWidth <= 414 && viewportHeight >= 845 && viewportHeight <= 896) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#about": '22%',
                "#about-info": '65%',
            };
        } else if (viewportWidth <= 360 && viewportHeight <= 740) {
            // Add more conditions for other media queries
            targetMarginLeft = {
                "#about": '22%',
                "#about-info": '63%',
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
        switchSection("about-info");
    });

    // Handle swipe right
    hammer.on('swiperight', function() {
        switchSection("about");
    });

    // Show the correct section based on the initial URL hash
    switchSection(window.location.hash.substring(1) || "about");

    // Set the initial opacity of the swipe container to 1
    $('#swipe-container').css('opacity', '1');
});