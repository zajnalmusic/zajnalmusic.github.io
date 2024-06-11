// MAIN NAVIGATION

var menu = document.querySelector('menu');
var nav = document.querySelector('nav');

function openMenu() {
    menu.classList.add('menu-show');
    nav.classList.add('nav-open');
}

function closeMenu() {
    menu.classList.remove('menu-show');
    nav.classList.remove('nav-open');
}

function toggleMenu() {
    if (menu.classList.contains('menu-show')) {
        closeMenu();
    }
    else {
        openMenu();
    }
}

document.getElementById('hamburger').addEventListener('click', toggleMenu);


// ACCORDION

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var accordionContent = this.nextElementSibling;
        if (accordionContent.style.maxHeight) {
            accordionContent.style.maxHeight = null;
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        }
        });
}


// SCROLL ANIMATIONS

const inViewport = (entries, observer) => {
    entries.forEach(entry => {
        entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

document.querySelectorAll('[data-inviewport]').forEach(el => {
    Obs.observe(el, obsOptions);
});