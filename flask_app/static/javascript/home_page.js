$(document).ready(function () {
    var currentSection = '';

    function animateOpacity(section, targetOpacity) {
        $(section).find('p, h1, h2, h3').stop(true).animate({
            opacity: targetOpacity
        }, 1000);
    }

    function setSideNavBarBoxPosition(section) {
        var marginTop;
        if (section === '#page-intro') {
            imgSrc = "../static/media/boxSideNavBarWhite.png";
            marginTop = '136%';
        } else if (section === '#page-app') { // Assuming #page-app corresponds to #page-preview
            imgSrc = "../static/media/boxSideNavBar.png";
            marginTop = '174.5%';
        } else if (section === '#page-waitlist') {
            imgSrc = "../static/media/boxSideNavBarWhite.png";
            marginTop = '213%';
        } else {
            return; // If no match, don't change the margin-top
        }
        var imgElement = $('.side-nav-bar > img[alt="Side Nav Bar Box"]');
        imgElement.css('margin-top', marginTop);
        imgElement.attr('src', imgSrc); // Change the image source
    }

    // Initialize the opacity of all sections to 0
    $('p, h1, h2, h3').css('opacity', '0');

    // $('a[href*="#page-"]').on('click', function (e) {
    //     e.preventDefault();
    //     var targetSection = $(this).attr('href');
    //     var targetPos = $(targetSection).offset().top;

    //     $('html, body').animate({
    //         scrollTop: targetPos
    //     }, 1000);
    // });

    // Event delegation for the .top-nav-bar links
    $('.top-nav-bar').on('mouseenter click', 'a', function(event) {
        // Remove the 'active' class from all links
        $('.top-nav-bar a').removeClass('active');
        // Add the 'active' class to the hovered or clicked link
        $(this).addClass('active');
    });

    $(window).on('scroll', function () {
        var scrollPos = $(window).scrollTop();
        var newSection = '';

        var introPos = $('#page-intro').offset().top;
        var introHeight = $('#page-intro').height();
        var appPos = $('#page-app').offset().top - $(window).height() * 0.5; // Changed this line
        var appHeight = $(window).height() * 3.2 - - $(window).height() * 0.5;;
        var waitlistPos = $('#page-waitlist').offset().top;
        var waitlistHeight = $('#page-waitlist').height();

        if (scrollPos >= introPos && scrollPos < introPos + introHeight * 0.5) {
            newSection = '#page-intro';
            $('.side-nav-links a').css('color', 'white');
        } else if (scrollPos >= appPos && scrollPos < appPos + appHeight) { // Updated condition
            newSection = '#page-app';
            $('.side-nav-links a').css('color', 'black');
        } else if (scrollPos >= waitlistPos - waitlistHeight * 0.5 && scrollPos < waitlistPos + waitlistHeight * 0.5) {
            newSection = '#page-waitlist';
            $('.side-nav-links a').css('color', 'white');
        } else {
            $('.side-nav-links a').css('color', 'black');
        }

        // If the active section has changed
        if (newSection !== currentSection && newSection) {
            // Animate the opacity to 1 for the new active section
            animateOpacity(newSection, '1');
            // Animate the opacity to 0 for the previous active section
            if (currentSection) {
                animateOpacity(currentSection, '0');
            }
            setSideNavBarBoxPosition(newSection);
            currentSection = newSection;
        }
    });
    $(window).trigger('scroll');


    $('#waitlistForm').on('submit', function(event) {
        event.preventDefault();
        var submitButton = this.querySelector('button');

    // Show processing indication
        var processing = document.getElementById("processing");
        var checkmark = document.getElementById("checkmark");
        // processing.style.display = 'block';
        
        // Save the original button text and disable the button
        var originalButtonText = submitButton.textContent;
        submitButton.textContent = "Processing...";
        submitButton.disabled = true;
    
        var formData = new FormData(this);
        
        fetch('/join_waitlist', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                // Hide processing and show checkmark
                processing.style.display = 'none';
                checkmark.style.display = 'block';
                // Redirect and show success message
                console.log(data)
                location.hash = '#page-waitlist';
                $(window).trigger('scroll');
                showSuccessMessage();
            } else {
                // Handle failure

            }
        })
        .catch(error => {
            console.error('There was an error:', error);
        })
        .finally(() => {
            // Restore the original button text and enable the button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            processing.style.display = 'none';
            checkmark.style.display = 'none';
        });
    });
    
    function showSuccessMessage() {
        var messageContainer = document.createElement('div');
        messageContainer.innerHTML = "<h3>Thank you for joining the waitlist!</h3>";
        messageContainer.style.textAlign = "center";
        messageContainer.style.padding = "20px";
        messageContainer.style.zIndex = "9999";
        messageContainer.style.opacity = "1"; // Set initial opacity to 1
        messageContainer.style.transition = "opacity 0.4s ease-in-out"; // Add transition
    
        document.body.appendChild(messageContainer);
    
        // Hide the message after 3 seconds
        setTimeout(function() {
            messageContainer.style.opacity = "0";
        }, 10000);
    }
});
