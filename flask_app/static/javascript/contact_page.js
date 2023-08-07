$(document).ready(function () {
    var currentSection = '';

    function animateOpacity(section, targetOpacity) {
        $(section).find('p, h1, h2, h3').stop(true).animate({
            opacity: targetOpacity
        }, 1000);
    }

    function setSideNavBarBoxPosition(section) {
        var marginTop, imgSrc;
        if (section === '#contact-us') {
            imgSrc = "../static/media/boxSideNavBarWhite.png";
            marginTop = '158%';
        } else if (section === '#contact-faq') {
            imgSrc = "../static/media/boxSideNavBar.png";
            marginTop = '196%';
        } else {
            return; // If no match, don't change the margin-top or image source
        }
        var imgElement = $('.side-nav-bar > img[alt="Side Nav Bar Box"]');
        imgElement.css('margin-top', marginTop);
        imgElement.attr('src', imgSrc); // Change the image source
    }

    // Initialize the opacity of all sections to 0
    $('p, h1, h2, h3').css('opacity', '0');

    // Animate the current section's text to full opacity
    animateOpacity('#contact-us', '1');
    animateOpacity('#contact-faq', '1');

    $('.top-nav-bar').on('mouseenter click', 'a', function(event) {
        // Remove the 'active' class from all links
        $('.top-nav-bar a').removeClass('active');
        // Add the 'active' class to the hovered or clicked link
        $(this).addClass('active');
    });

    $('.side-nav-links').on('click', 'a', function(event) {
        var href = $(this).attr('href');
        var target = $(href);
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 2000, "easeInOutExpo");
            return false;
        }
    });

    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();
        var newSection = '';
        var contactUsPos = $('#contact-us').offset().top;
        var contactUsHeight = $('#contact-us').height();
        var contactFaqPos = $('#contact-faq').offset().top - $(window).height();;
        var contactFaqHeight = $('#contact-faq').height();

        if (scrollPos >= contactUsPos && scrollPos < contactUsPos + contactUsHeight * 0.5) {
            newSection = '#contact-us';
            $('.side-nav-links a').css('color', 'white');
            setSideNavBarBoxPosition(newSection); // Set the nav bar box's position and image
        } else if (scrollPos >= contactFaqPos && scrollPos < contactFaqPos + contactFaqHeight) { // Adjusted the condition here
            newSection = '#contact-faq';
            $('.side-nav-links a').css('color', 'black');
            setSideNavBarBoxPosition(newSection); // Set the nav bar box's position and image
        } else {
            $('.side-nav-links a').css('color', 'black');
        }

        // If the active section has changed
        if (newSection !== currentSection && newSection) {
            // Animate the opacity to 1 for the new active section
            animateOpacity(newSection, '1');
            // Animate the opacity to 0 for the previous active section
            if (currentSection) {
                animateOpacity(currentSection, '0');
            }
            
            currentSection = newSection;
        }
    });

    $(window).trigger('scroll'); // Trigger the scroll event on page load to set the initial state
});
