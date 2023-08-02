$(document).ready(function () {
    var currentSection = '';

    function animateOpacity(section, targetOpacity) {
        $(section).find('p, h1, h2, h3').stop(true).animate({
            opacity: targetOpacity
        }, 1000);
    }

    function checkSection(scrollPos) {
        var introPos = $('#about-intro').offset().top;
        var introHeight = $('#about-intro').height();
        var companyPos = $('#about-company').offset().top;
        var companyHeight = $('#about-company').height();

        if (scrollPos >= introPos && scrollPos < introPos + introHeight) {
            return '#about-intro';
        } else if (scrollPos >= companyPos && scrollPos < companyPos + companyHeight) {
            return '#about-company';
        } else {
            return '';
        }
    }

    // Initialize the opacity of all sections to 0
    $('p, h1, h2, h3').css('opacity', '0');

    // Determine the current section on page load
    currentSection = checkSection($(window).scrollTop());
    if (currentSection) {
        animateOpacity(currentSection, '1');
    }

    // Event handlers
    $('a[href*="#about-"]').on('click', function (e) {
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

        if (newSection !== currentSection && newSection) {
            animateOpacity(newSection, '1');
            if (currentSection) {
                animateOpacity(currentSection, '0');
            }
            currentSection = newSection;
        }
    });
});
