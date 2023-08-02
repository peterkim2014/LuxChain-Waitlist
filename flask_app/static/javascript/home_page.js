$(document).ready(function () {
    // Define a function to animate the opacity of specified elements
    function animateOpacity(elements) {
        elements.stop(true).css('opacity', '0').animate({
            opacity: '1'
        }, 1000);
    }

    $('a[href*="#page-"]').on('click', function (e) {
        e.preventDefault();
        var targetSection = $(this).attr('href');
        var targetPos = $(targetSection).offset().top;

        $('html, body').animate({
            scrollTop: targetPos
        }, 1000, function() {
            animateOpacity($(targetSection).find('p, h1, h2, h3'));
        });
    });

    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();

        // Get the position and height of each section
        var introPos = $('#page-intro').offset().top;
        var introHeight = $('#page-intro').height();
        var appPos = $('#page-app').offset().top;
        var appHeight = $(window).height() * 3.2; // 369vh
        var waitlistPos = $('#page-waitlist').offset().top;
        var waitlistHeight = $('#page-waitlist').height();

        // Animate opacity for the section that is currently visible
        if (scrollPos >= introPos && scrollPos < introPos + introHeight * 0.5) {
            animateOpacity($('#page-intro').find('p, h1, h2, h3'));
            $('.side-nav-links a').css('color', 'white');
        } else if (scrollPos >= appPos && scrollPos < appPos + appHeight) {
            animateOpacity($('#page-app').find('p, h1, h2, h3'));
            $('.side-nav-links a').css('color', 'black');
        } else if (scrollPos >= waitlistPos - waitlistHeight * 0.5 && scrollPos < waitlistPos + waitlistHeight * 0.5) {
            animateOpacity($('#page-waitlist').find('p, h1, h2, h3'));
            $('.side-nav-links a').css('color', 'white');
        } else {
            $('.side-nav-links a').css('color', 'black');
        }
    });
});
