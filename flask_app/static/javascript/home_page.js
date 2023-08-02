$(document).ready(function () {
    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();

        // Get the position and height of each section
        var introPos = $('#page-intro').offset().top;
        var introHeight = $('#page-intro').height();
        var appPos = $('#page-app').offset().top;
        var appHeight = $(window).height() * 3.2; // 369vh
        var waitlistPos = $('#page-waitlist').offset().top;
        var waitlistHeight = $('#page-waitlist').height();

        // Check if the page is scrolled more than 50% through the #page-intro section
        if (scrollPos >= introPos && scrollPos < introPos + introHeight * 0.5) {
            $('.side-nav-links a').css('color', 'white');
        } 
        // Check if the page is within the #page-app section
        else if (scrollPos >= appPos && scrollPos < appPos + appHeight) {
            $('.side-nav-links a').css('color', 'black');
        } 
        // Check if the page is scrolled so that at least 50% of the #page-waitlist section is visible
        else if (scrollPos >= waitlistPos - waitlistHeight * 0.5 && scrollPos < waitlistPos + waitlistHeight * 0.5) {
            $('.side-nav-links a').css('color', 'white');
        } else {
            $('.side-nav-links a').css('color', 'black');
        }
    });
});
