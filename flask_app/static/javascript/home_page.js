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
            marginTop = '167.5%';
        } else if (section === '#page-app') { // Assuming #page-app corresponds to #page-preview
            imgSrc = "../static/media/boxSideNavBar.png";
            marginTop = '214%';
        } else if (section === '#page-waitlist') {
            imgSrc = "../static/media/boxSideNavBarWhite.png";
            marginTop = '259.25%';
        } else {
            return; // If no match, don't change the margin-top
        }
        var imgElement = $('.side-nav-bar > img[alt="Side Nav Bar Box"]');
        imgElement.css('margin-top', marginTop);
        imgElement.attr('src', imgSrc); // Change the image source
    }

    // Initialize the opacity of all sections to 0
    $('p, h1, h2, h3').css('opacity', '0');

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

    $(document.body).on('submit', '#waitlistForm', function(event) {
        // event.preventDefault();
    
        var submitButton = this.querySelector('button');
    
        // Show processing indication
        var processing = document.getElementById("processing");
        processing.style.display = 'block';
    
        // Save the original button text and disable the button
        var originalButtonText = submitButton.textContent;
        submitButton.textContent = "Processing...";
        submitButton.disabled = true;  // This will disable the button
    
        var formData = new FormData(this);
    
        fetch('/join_waitlist', {
            method: 'POST',
            body: formData
        })
        .then(() => {
            // This is a redirect so no need to handle JSON response
            location.hash = '#page-waitlist';
            $(window).trigger('scroll');
    
            // Fetch and show the flash message
            var message = getFlashMessage();  // You need to implement this function
            if (message) {
                var header = document.querySelector('.waitlist-header');
                if (header) {
                    header.textContent = message;
                }
            }
        })
        .catch(error => {
            console.error('There was an error:', error);
        })
        .finally(() => {
            processing.style.display = 'none';
            // Restore the original button text and enable the button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            document.getElementById("waitlistForm").reset();
        });
    });
    
    function showCheckmark(button) {
        var checkmark = document.createElement('div');
        checkmark.id = 'checkmark';
        checkmark.className = 'checkmark';
        checkmark.textContent = '\u2713'; // Checkmark symbol
    
        // Add styling for the checkmark element
        checkmark.style.color = 'green';
        checkmark.style.fontSize = '24px';
    
        button.appendChild(checkmark);
    }
    
    function showErrorIndicator(button) {
        var errorIndicator = document.createElement('div');
        errorIndicator.id = 'errorIndicator';
        errorIndicator.className = 'error-indicator';
        errorIndicator.textContent = '\u274C'; // Cross mark symbol
    
        // Add styling for the errorIndicator element
        errorIndicator.style.color = 'red';
        errorIndicator.style.fontSize = '24px';
    
        button.appendChild(errorIndicator);
    }
    
    function hideCheckmark(button) {
        var checkmark = button.querySelector('#checkmark');
        if (checkmark) {
            button.removeChild(checkmark);
        }
    }
    
    function hideErrorIndicator(button) {
        var errorIndicator = button.querySelector('#errorIndicator');
        if (errorIndicator) {
            button.removeChild(errorIndicator);
        }
    }
    
    function showFailedMessage(message) {
        var header = document.querySelector('.waitlist-header');
        if (header) {
            header.textContent = message;
        }
    }
    
    function showSuccessMessage(message) {
        var header = document.querySelector('.waitlist-header');
        if (header) {
            header.textContent = message;
        }
    }

    
});