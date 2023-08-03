$(document).ready(function () {
    // Function to animate the opacity
    function animateOpacity(section, targetOpacity) {
        $(section).find('p, h1, h2, h3').stop(true).animate({
            opacity: targetOpacity
        }, 1000);
    }

    // Initialize the opacity of all sections to 0
    $('p, h1, h2, h3').css('opacity', '0');

    // Animate the current section's text to full opacity
    animateOpacity('#contact-us', '1');

    // If you want to apply some other effect on scrolling or clicking, you can add it here as well

    $(document).ready(function() {
        // Event delegation for the .top-nav-bar links
        $('.top-nav-bar').on('mouseenter click', 'a', function(event) {
            // Remove the 'active' class from all links
            $('.top-nav-bar a').removeClass('active');
            // Add the 'active' class to the hovered or clicked link
            $(this).addClass('active');
        });
    
        // Event delegation for the 'a' tags in .side-nav-links
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
    });
});
