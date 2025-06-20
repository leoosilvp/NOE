document.addEventListener('DOMContentLoaded', function () {
    // menu sanduiche
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    mobileMenu.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    })
});