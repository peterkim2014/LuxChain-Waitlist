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

    function handleResize() {
        var windowWidth = $(window).width();
    
        // 1. Side Navigation Bar
        if (windowWidth < 400) {
            $('.side-nav-links').css({
                'font-size': '2.5px',
                'margin-left': '0px',
                'width': '20%'
            });
        } else if (windowWidth >= 400 && windowWidth < 600) {
            $('.side-nav-links').css({
                'font-size': '6px',
                'margin-left': '0px',
                'width': '30%'
            });
        } else if (windowWidth >= 600 && windowWidth < 768) {
            $('.side-nav-links').css({
                'font-size': '10px',
                'margin-left': '2.5px',
                'width': '40%'
            });
        } else {
            $('.side-nav-links').css({
                'font-size': '16px',
                'margin-left': '7.75px',
                'width': '43.25%'
            });
        }
    
        // 2. Top Navigation Bar
        if (windowWidth < 400) {
            $('.top-nav-bar a').css('font-size', '10px');
        } else if (windowWidth < 800) {
            $('.top-nav-bar').css('font-size', '14px');
        } else {
            $('.top-nav-bar').css('font-size', '18px');
        }
    
        // 3. Intro section
        var introTitleHeader = $('.intro-title-header h1');
        var introSlogan = $('.intro-slogan');
        var introLogo = $('.intro-title-header img')
        var introDescription = $('.intro-description')
        var introFooter = $('.intro-footer')
        if (windowWidth < 400) {
            introTitleHeader.css('font-size', '12px');
            introSlogan.css('font-size', '5px');
            introDescription.css('font-size', '5px')
            introFooter.css('font-size', '5px')
            introLogo.css('width', '8.5%');
        } else if (windowWidth >= 400 && windowWidth < 800) {
            introTitleHeader.css('font-size', '20px');
            introSlogan.css('font-size', '8.5px');
            introDescription.css('font-size', '8.5px')
            introFooter.css('font-size', '8.5px')
            introLogo.css('width', '10%');
        } else {
            introTitleHeader.css('font-size', '40px');
            introSlogan.css('font-size', '16px');
            introDescription.css('font-size', '16px')
            introFooter.css('font-size', '14px')
            introLogo.css('width', '8.75%');
        }
    
        // 4. Crypto Wallet section
        var cryptoWalletHeader = $('.wallet-intro h1');
        var walletFlexibilityHeader = $('.wallet-flexibility h2')
        var walletFlexibilityText = $('.wallet-flexibility')
        var walletBorderlessHeader = $('.wallet-borderless h2')
        var walletBorderlessText = $('.wallet-borderless')
        var walletOwnershipHeader = $('.wallet-ownership h2')
        var walletOwnershipText = $('.wallet-ownership')
        var walletDetails = $('.wallet-details')

        if (windowWidth < 400) {
            cryptoWalletHeader.css('font-size', '10px');
            walletFlexibilityHeader.css('font-size', '6px');
            walletFlexibilityText.css('font-size', '5px');
            walletBorderlessHeader.css('font-size', '6px');
            walletBorderlessText.css('font-size', '5px');
            walletOwnershipHeader.css('font-size', '6px');
            walletOwnershipText.css('font-size', '5px');
            walletDetails.css('margin-top', '0%');
            walletDetails.css('gap', '0vh');
            walletDetails.css('height', '25%');
        } else if (windowWidth < 800) {
            cryptoWalletHeader.css('font-size', '16px');
            walletFlexibilityHeader.css('font-size', '10px');
            walletFlexibilityText.css('font-size', '8.5px');
            walletBorderlessHeader.css('font-size', '10px');
            walletBorderlessText.css('font-size', '8.5px');
            walletOwnershipHeader.css('font-size', '10px');
            walletOwnershipText.css('font-size', '8.5px');
            walletDetails.css('margin-top', '1.25%');
            walletDetails.css('gap', '0.5vh');
            walletDetails.css('height', '35%');
        } else {
            cryptoWalletHeader.css('font-size', '24px');
            walletFlexibilityHeader.css('font-size', '16px');
            walletFlexibilityText.css('font-size', '15px');
            walletBorderlessHeader.css('font-size', '16px');
            walletBorderlessText.css('font-size', '15px');
            walletOwnershipHeader.css('font-size', '16px');
            walletOwnershipText.css('font-size', '15px');
            walletDetails.css('margin-top', '2.25%');
            walletDetails.css('gap', '1.25vh');
            walletDetails.css('height', '45%');
        }
    
        // 5. Wallet Process section
        var processSteps = $('.process-steps');
        var processDetails = $('.process-steps');

        if (windowWidth < 400) {
            processSteps.css('font-size', '4px');
            processDetails.css('width', '50%');
            processDetails.css('height', '40%');
        } else if (windowWidth < 800) {
            processSteps.css('font-size', '8px');
            processDetails.css('width', '75%');
            processDetails.css('height', '45%');
        } else {
            processSteps.css('font-size', '13px');
            processDetails.css('width', '100%');
            processDetails.css('height', '50%');
        }

        // Wallet 3 points
        var pointsText = $('.wallet-strip-3-points');

        if (windowWidth < 400) {
            pointsText.css('font-size', '2px');
        } else if (windowWidth < 800) {
            pointsText.css('font-size', '7.5px');
        } else {
            pointsText.css('font-size', '13px');
        }
    

        // 6. App preview
        var diagramTexts = $('.diagram-text p');
        var appDescription = $('.app-icon-description p')
        var diagramContainer = $('.diagram-account')
        var appFooterText = $('.app-preview-footer')

        if (windowWidth < 400) {
            diagramTexts.css('font-size', '5px');
            appDescription.css('font-size', '5px');
            diagramContainer.css('margin-bottom', '50%');
            appFooterText.css('font-size', '3.5px');
            appFooterText.css('margin-top', '-25%');
        } else if (windowWidth < 800) {
            diagramTexts.css('font-size', '7.5px');
            appDescription.css('font-size', '7.5px');
            diagramContainer.css('margin-bottom', '35%');
            appFooterText.css('font-size', '7.5px');
            appFooterText.css('margin-top', '-15%');
        } else {
            diagramTexts.css('font-size', '10px');
            appDescription.css('font-size', '0.9em');
            diagramContainer.css('margin-bottom', '16.5%');
            appFooterText.css('font-size', '12px');
            appFooterText.css('margin-top', '-8.62%');
        }
    
        // 7. System comparison headers
        var systemHeaders = $('.system-header p');
        var systemContainer = $('.system-comparison');
        var bankText = $('.bank-text');
        var luxText = $('.lux-text');
        var bankContainer = $('.bank-content');
        var luxContainer = $('.lux-content');
        var bankHeader = $('.bank-header');
        var luxHeader = $('.lux-header');

        if (windowWidth < 400) {
            systemHeaders.css('font-size', '4px');
            systemContainer.css('margin-top', '4px');
            bankText.css('font-size', '4px');
            luxText.css('font-size', '4px');
            bankHeader.css('font-size', '4px');
            luxHeader.css('font-size', '4px');
            bankContainer.css('height', '10%');
            luxContainer.css('height', '10%');
            bankContainer.css('margin-top', '30%');
            luxContainer.css('margin-top', '30%');
        } else if (windowWidth < 800) {
            systemHeaders.css('font-size', '10px');
            systemContainer.css('margin-top', '10px');
            bankText.css('font-size', '4px');
            luxText.css('font-size', '4px');
            bankHeader.css('font-size', '9px');
            luxHeader.css('font-size', '9px');
            bankContainer.css('height', '40%');
            luxContainer.css('height', '40%');
            bankContainer.css('margin-top', '15%');
            luxContainer.css('margin-top', '15%');
        } else {
            systemHeaders.css('font-size', '16px');
            systemContainer.css('margin-top', '15%');
            bankText.css('font-size', '0.65em');
            luxText.css('font-size', '0.65em');
            bankHeader.css('font-size', '0.8em');
            luxHeader.css('font-size', '0.8em');
            bankContainer.css('height', '100%');
            luxContainer.css('height', '100%');
            bankContainer.css('margin-top', '4.25%');
            luxContainer.css('margin-top', '4.25%');
        }

    
        // 8. Join waitlist header
        var waitlistHeader = $('.waitlist-header');
        var waitlistContent = $('.waitlist-content');
        var waitlistFirst = $('.waitlist-first');
        var waitlistLast = $('.waitlist-last');
        var waitlistEmail = $('.waitlist-email');

        if (windowWidth < 400) {
            waitlistHeader.css('font-size', '10px');
            waitlistContent.css('font-size', '7.5px');
            waitlistFirst.css('font-size', '10px');
            waitlistLast.css('font-size', '10px');
            waitlistEmail.css('font-size', '10px');
        } else if (windowWidth < 800) {
            waitlistHeader.css('font-size', '16px');
            waitlistContent.css('font-size', '10px');
            waitlistFirst.css('font-size', '10px');
            waitlistLast.css('font-size', '10px');
            waitlistEmail.css('font-size', '10px');
        } else {
            waitlistHeader.css('font-size', '24px');
            waitlistContent.css('font-size', '18px');
            waitlistFirst.css('font-size', '18px');
            waitlistLast.css('font-size', '18px');
            waitlistEmail.css('font-size', '18px');
        }
    }
    
    // Call handleResize function initially to set the right state when the page loads.
    handleResize();
    
    // Attach handleResize function to window resize event.
    $(window).resize(handleResize);
});