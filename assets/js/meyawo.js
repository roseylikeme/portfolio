
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// smooth scroll
$(document).ready(function () {
    // Function to toggle navbar based on window size
    var toggleNavbar = function () {
        if ($(window).width() > 768) {
            $('#nav-toggle').addClass('is-active');
            $('ul.nav').addClass('show');
        } else {
            $('#nav-toggle').removeClass('is-active');
            $('ul.nav').removeClass('show');
        }
    };

    // Call toggleNavbar initially
    toggleNavbar();

    // Debounced function for toggling navbar on window resize
    var debouncedToggleNavbar = debounce(toggleNavbar, 250);

    // Bind debounced function to window resize event
    $(window).on('resize', debouncedToggleNavbar);

    // Smooth scrolling for navbar links
    $(".navbar .nav-link").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function () {
                window.location.hash = hash;
            });
        }
    });

    // Navbar toggle
    $('#nav-toggle').click(function () {
        $(this).toggleClass('is-active');
        $('ul.nav').toggleClass('show');
    });
});