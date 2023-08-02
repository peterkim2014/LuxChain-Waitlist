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
});
