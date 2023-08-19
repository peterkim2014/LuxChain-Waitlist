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
        const targetMarginLeft = {
            "#about": '20%',
            "#about-info": '70%',
        };
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