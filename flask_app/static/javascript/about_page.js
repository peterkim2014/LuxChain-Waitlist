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
    $(window).trigger('scroll');

    function handleResize() {
        var windowWidth = $(window).width();
        var isiPad = windowWidth >= 768 && windowWidth <= 1024;

        // 1. Side Navigation Bar
        if (windowWidth < 400) {
            $('.side-nav-bar > a').css({
                'font-size': '10px',
                'margin-left': '-5px',
                'width': '50%'
            });
        } else if (windowWidth >= 400 && windowWidth < 600) {
            $('.side-nav-bar > a').css({
                'font-size': '12px',
                'margin-left': '0px',
                'width': '40%'
            });
        } else if (windowWidth >= 600 && windowWidth < 768) {
            $('.side-nav-bar > a').css({
                'font-size': '14px',
                'margin-left': '2.5px',
                'width': '30%'
            });
        } else {
            $('.side-nav-bar > a').css({
                'font-size': '16px',
                'margin-left': '5px',
                'width': '25%'
            });
        }

        // 2. Top Navigation Bar
        var topNavBar = $('.top-nav-bar a');
        if (windowWidth < 800) {
            topNavBar.css('font-size', '12px');
        } else {
            topNavBar.css('font-size', '16px');
        }

        // 3. Intro Body
        var introHeaderH1 = $('.intro-body-header h1');
        var introHeaderP = $('.intro-body-header p');
        var introTitleBodyP = $('.intro-title-body p');
        var introLogo = $('.intro-body-header img');
        if (windowWidth < 800) {
            introHeaderH1.css('font-size', '24px');
            introHeaderP.css('font-size', '12px');
            introTitleBodyP.css('font-size', '10px');
            introLogo.css('width', '8.5%');
        } else {
            introHeaderH1.css('font-size', '46px');
            introHeaderP.css('font-size', '16px');
            introTitleBodyP.css('font-size', '13.5px');
            introLogo.css('width', '11.5%');
        }

        // 4. Company Values
        var companyValuesH2 = $('.company-values h2');
        var companyValuesP = $('.company-values p');
        if (windowWidth < 768) {
            companyValuesH2.css('font-size', '20px');
            companyValuesP.css('font-size', '14px');
        } else {
            companyValuesH2.css('font-size', '24px');
            companyValuesP.css('font-size', '14px');
        }

        // 5. Problems & Solutions
        var problemDetailsH3 = $('.about-problem-details h3');
        var textElements = $('.problem-text, .solution-text');
        if (windowWidth < 768) {
            problemDetailsH3.css('font-size', '18px');
            textElements.css('font-size', '12px');
        } else {
            problemDetailsH3.css('font-size', '20px');
            textElements.css('font-size', '12px');
        }
    }
    // Call handleResize function initially to set the right state when page loads.
    handleResize();

    // Attach handleResize function to window resize event.
    $(window).resize(handleResize);
});