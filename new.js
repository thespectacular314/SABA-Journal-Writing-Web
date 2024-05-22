document.addEventListener("DOMContentLoaded", function() {
    const img = document.querySelector('.main img');

    img.addEventListener('mouseenter', function() {
        if (!this.classList.contains('shake-once')) {
            this.classList.add('shake-once'); // Add class to apply shake animation
            
            // Add green border
            this.style.borderColor = 'green';
            
            // Listen for animationend event to remove the class after one shake
            this.addEventListener('animationend', function() {
                this.classList.remove('shake-once');
            }, {once: true});
        }
    });

    img.addEventListener('mouseleave', function() {
        // Remove green border on mouse leave
        this.style.borderColor = 'transparent';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const sabaText = document.querySelector('.navbar h2');

    sabaText.addEventListener('mouseenter', function() {
        this.classList.add('rotate-animation');
    });

    sabaText.addEventListener('animationend', function() {
        this.classList.remove('rotate-animation');
    }, {once: true});
});

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in');

    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this,
                args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function checkSlide() {
        elements.forEach(element => {
            // Halfway through the element
            const slideInAt = (window.scrollY + window.innerHeight) - element.clientHeight / 2;
            // Bottom of the element
            const elementBottom = element.offsetTop + element.clientHeight;
            const isHalfShown = slideInAt > element.offsetTop;
            const isNotScrolledPast = window.scrollY < elementBottom;
            if (isHalfShown && isNotScrolledPast) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    // Debounce scroll event listener for performance
    window.addEventListener('scroll', debounce(checkSlide));
});
