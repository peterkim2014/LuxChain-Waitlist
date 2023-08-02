$(document).ready(function () {
    var currentSection = '';

    function animateOpacity(section, targetOpacity) {
        $(section).find('p, h1, h2, h3').stop(true).animate({
            opacity: targetOpacity
        }, 1000);
    }

    // Initialize the opacity of all sections to 0
    $('p, h1, h2, h3').css('opacity', '0');

    function checkSection(scrollPos) {
        var introPos = $('#page-intro').offset().top;
        var introHeight = $('#page-intro').height();
        var appPos = $('#page-app').offset().top;
        var appHeight = $(window).height() * 3.2;
        var waitlistPos = $('#page-waitlist').offset().top;
        var waitlistHeight = $('#page-waitlist').height();

        if (scrollPos >= introPos && scrollPos < introPos + introHeight * 0.5) {
            return '#page-intro';
        } else if (scrollPos >= appPos && scrollPos < appPos + appHeight) {
            return '#page-app';
        } else if (scrollPos >= waitlistPos - waitlistHeight * 0.5 && scrollPos < waitlistPos + waitlistHeight * 0.5) {
            return '#page-waitlist';
        } else {
            return '';
        }
    }

    // Determine the current section on page load
    currentSection = checkSection($(window).scrollTop());
    if (currentSection) {
        animateOpacity(currentSection, '1');
    }

    // Event handlers
    $('a[href*="#page-"]').on('click', function (e) {
        e.preventDefault();
        var targetSection = $(this).attr('href');
        var targetPos = $(targetSection).offset().top;

        $('html, body').animate({
            scrollTop: targetPos
        }, 1000);
    });

    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();
        var newSection = checkSection(scrollPos);

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
});
