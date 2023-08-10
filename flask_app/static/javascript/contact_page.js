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

    // This function will handle the resizing logic.
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
        if (windowWidth < 800) {
            $('.top-nav-bar a').css('font-size', '12px');
        } else {
            $('.top-nav-bar a').css('font-size', '16px');
        }
    
        // 3. Contact Main Section
        if (windowWidth < 800) {
            $('.intro-header-title img').css('width', '6.5%');
            $('.contact-content').css('padding', '10px');
        } else {
            $('.intro-header-title img').css('width', '8.5%');
            $('.contact-content').css('padding', '20px');
        }
    
        // 4. FAQ Section
        if (windowWidth < 800) {
            $('.faq-text-left, .faq-text-right').css('font-size', '10px');
            $('.faq-header img').css('width', '20%');
        } else {
            $('.faq-text-left, .faq-text-right').css('font-size', '14px');
            $('.faq-header img').css('width', '40%');
        }
    
        // 5. Font Resizing for #contact-us
        if ($('#contact-us').length) {
            var baseFontSize = 14;
    
            if (windowWidth < 500) {
                baseFontSize = 8;
            } else if (windowWidth >= 500 && windowWidth < 768) {
                baseFontSize = 10;
            } else if (windowWidth >= 768 && windowWidth < 1200) {
                baseFontSize = 12;
            }
    
            $('#contact-us p').css('font-size', baseFontSize + 'px');
            $('#contact-us h1').css('font-size', (baseFontSize + 20) + 'px');
            $('#contact-us h2').css('font-size', (baseFontSize + 14) + 'px');
            $('#contact-us h3').css('font-size', (baseFontSize + 8) + 'px');
            
        // 6. iPad specific adjustments
        // if (isiPad) {
        //     $('#global', '*').css({
        //         'height': '76vh'
        //     })
        //     $('body').css({
        //         'height': '76vh'
        //     })
        //     $('html').css({
        //         'height': '76vh'
        //     })
        //     $('#contact-us').css({
        //         'height': '38vh'
        //     })
        //     $('.side-nav-bar').css({
        //         'width': '12.5%'
        //     });
        //     $('.side-nav-links').css({
        //         'width': '100%',
        //         'margin-left': '10%',
        //         'gap': '5vh',
        //         'margin-top': '158%',
        //         // 'height': '60%'
        //     })
        //     $('.side-nav-links > a').css({
        //         'font-size': '0.6em',
        //         'width': '100%'
        //     });
        //     $('.side-nav-bar > img').css({
        //         'width': '15%',
        //         'height': '1.25%',
        //         'transition': 'margin-top 0.3s ease-in-out',
        //         'margin-top': '158%'
        //     });
        //     $('.contact-body').css({
        //         'height': '100%'
        //     })
        //     $('.contact-main').css({
        //         'height': '85%'
        //     })
        //     $('.contact-content').css({
        //         'height': '75%',
        //         'padding-left': '15px',
        //         'margin-top': '0%'
        //     })
        //     $('.contact-content > h2').css({
        //         'margin-bottom': '5%'
        //     })
        //     $('.contact-form').css({
        //         'gap': '2.5vh'
        //     })
        //     $('.form-name').css({
        //         'height': '9%'
        //     })
        //     $('.form-email').css({
        //         'height': '9%'
        //     })
        //     $('.form-header').css({
        //         'height': '9%'
        //     })
        //     $('.form-description').css({
        //         'height': '90%'
        //     })
        //     $('.contact-form > button').css({
        //         'height': '15%'
        //     })
        //     $('.intro-header-title').css({
        //         'width': '90%'
        //     });
        //     $('.intro-header-title > h1').css({
        //         'height': '75%'
        //     })
        //     $('.intro-header-title > img').css({
        //         'width': '8%'
        //     });
        //     $('.intro-body-header > p').css({
        //         'margin-top': '-2.5%'
        //     });
        //     $('#contact-faq').css({
        //         'height': '38vh'
        //     })
        //     $('.faq-header img').css({
        //         'width': '30%'
        //     });
        //     $('.faq-list-left').css({
        //         'height': '20%'
        //     })
        //     $('.one-faq-left > img').css({
        //         'height': '25%'
        //     })
        //     $('.faq-list-right').css({
        //         'height': '20%'
        //     })
        //     $('.one-faq-right > img').css({
        //         'height': '25%'
        //     })

            
        //     $('.faq-text-left, .faq-text-right').css('font-size', '12px');
            
        //     $('.top-nav-bar a').css('font-size', '12px');
        //     $('#contact-us p').css('font-size', '12px');
        //     $('#contact-us h1').css('font-size', '34px');
        //     $('#contact-us h2').css('font-size', '26px');
        //     $('#contact-us h3').css('font-size', '20px');
            
        //     $('.faq-question-left, .faq-question-right').css('font-size', '14px');
        //     $('.faq-answer-left, .faq-answer-right').css('font-size', '12px');
        //     }
        } else if ($('#contact-faq').length) {
            var faqQuestionSize;
            var faqAnswerSize;
    
            if (windowWidth < 500) {
                faqQuestionSize = 10;
                faqAnswerSize = 8;
            } else if (windowWidth >= 500 && windowWidth < 768) {
                faqQuestionSize = 12;
                faqAnswerSize = 10;
            } else if (windowWidth >= 768 && windowWidth < 1200) {
                faqQuestionSize = 14;
                faqAnswerSize = 12;
            } else {
                faqQuestionSize = 16;
                faqAnswerSize = 14;
            }
    
            $('.faq-question-left, .faq-question-right').css('font-size', faqQuestionSize + 'px');
            $('.faq-answer-left, .faq-answer-right').css('font-size', faqAnswerSize + 'px');
        }
    }
    
    // Call handleResize function initially to set the right state when page loads.
    handleResize();
    // Attach handleResize function to window resize event.
    $(window).resize(handleResize);
});
