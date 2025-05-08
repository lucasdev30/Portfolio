function handleScrollAppear() {
    const elementsToAppear = document.querySelectorAll('.aparition-annim');

    elementsToAppear.forEach(function(element) {
        const position = element.getBoundingClientRect();

        if (position.top <= window.innerHeight * 1) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        } else {
            element.style.opacity = 0;
            element.style.transform = 'translateY(60px)';
        }
    });
}

window.onscroll = handleScrollAppear;

window.onload = handleScrollAppear;