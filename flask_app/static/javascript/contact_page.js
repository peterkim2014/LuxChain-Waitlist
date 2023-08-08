$(document).ready(function () {
    var currentSection = '';

    function animateOpacity(section, targetOpacity) {
        $(section).find('p, h1, h2, h3').stop(true).animate({
            opacity: targetOpacity
        }, 1000);
    }

    function setSideNavBarBoxPosition(section) {
        var marginTop, imgSrc, linkColor;
        if (section === '#contact-us') {
            imgSrc = "../static/media/boxSideNavBarWhite.png";
            marginTop = '158%';
            linkColor = 'white';
        } else if (section === '#contact-faq') {
            imgSrc = "../static/media/boxSideNavBar.png";
            marginTop = '196%';
            linkColor = 'black';
        } else {
            return; 
        }
        
        var imgElement = $('.side-nav-bar > img[alt="Side Nav Bar Box"]');
        imgElement.css('margin-top', marginTop);
        imgElement.attr('src', imgSrc);
        $('.side-nav-links a').css('color', linkColor);
    }

    $('p, h1, h2, h3').css('opacity', '0');

    $('.top-nav-bar').on('mouseenter click', 'a', function(event) {
        $('.top-nav-bar a').removeClass('active');
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

    function checkSection(scrollPos) {
        var contactUsPos = $('#contact-us').offset().top;
        var contactUsHeight = $('#contact-us').height();
        var contactFaqPos = $('#contact-faq').offset().top - $(window).height();
        var contactFaqHeight = $('#contact-faq').height();

        if (scrollPos >= contactUsPos && scrollPos <= contactUsPos + contactUsHeight * 0.5) {
            return '#contact-us';
        } else if (scrollPos >= contactFaqPos && scrollPos <= contactFaqPos + contactFaqHeight) {
            return '#contact-faq';
        } else {
            return '';
        }
    }

    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();
        var newSection = checkSection(scrollPos);

        if (newSection !== currentSection && newSection) {
            animateOpacity(newSection, '1');
            if (currentSection) {
                animateOpacity(currentSection, '0');
            }
            setSideNavBarBoxPosition(newSection);
            currentSection = newSection;
        }
    });

    // Determine the current section on page load
    currentSection = checkSection($(window).scrollTop());
    if (currentSection) {
        animateOpacity(currentSection, '1');
        setSideNavBarBoxPosition(currentSection);
    }

    $(window).trigger('scroll');
});
