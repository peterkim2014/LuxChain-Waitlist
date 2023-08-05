$(document).ready(function () {
    var currentSection = '';
    var initialSection = checkSection($(window).scrollTop());
    setSideNavBarBoxPosition(initialSection);

    function animateOpacity(section, targetOpacity) {
        $(section).find('p, h1, h2, h3').stop(true).animate({
            opacity: targetOpacity
        }, 1000);
    }

    function setSideNavBarBoxPosition(section) {
        if (section === '#about-intro') {
            $('.side-nav-bar > img[alt="Side Nav Bar Box"]').css('margin-top', '158.25%');
        } else if (section === '#about-company') {
            $('.side-nav-bar > img[alt="Side Nav Bar Box"]').css('margin-top', '196.75%');
        }
    }

    // Initialize the opacity of all sections to 0
    $('p, h1, h2, h3').css('opacity', '0');

    // Event handlers
    $('a[href*="#about-"]').on('click', function (e) {
        e.preventDefault();
        var targetSection = $(this).attr('href');
        var targetPos = $(targetSection).offset().top;

        $('html, body').animate({
            scrollTop: targetPos
        }, 1000);
    });

    // Event delegation for the .top-nav-bar links
    $('.top-nav-bar').on('mouseenter click', 'a', function(event) {
        // Remove the 'active' class from all links
        $('.top-nav-bar a').removeClass('active');
        // Add the 'active' class to the hovered or clicked link
        $(this).addClass('active');
    });

    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();
        var newSection = checkSection(scrollPos);
    
        if (newSection !== currentSection && newSection) {
            animateOpacity(newSection, '1');
            setSideNavBarBoxPosition(newSection);
            if (currentSection) {
                animateOpacity(currentSection, '0');
            }
            currentSection = newSection;
        }
    });

    function checkSection(scrollPos) {
        var introPos = $('#about-intro').offset().top;
        var introHeight = $('#about-intro').height();
        var companyPos = $('#about-company').offset().top - $(window).height();
        var companyHeight = $('#about-company').height();

        if (scrollPos >= introPos && scrollPos < introPos + introHeight * 0.5) {
            return '#about-intro';
        } else if (scrollPos >= companyPos && scrollPos < companyPos + companyHeight) {
            return '#about-company';
        } else {
            return '';
        }
    }

    // Determine the current section on page load
    currentSection = checkSection($(window).scrollTop());
    if (currentSection) {
        animateOpacity(currentSection, '1');
    }
});
