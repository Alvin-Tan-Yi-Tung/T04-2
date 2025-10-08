// ================================
// Set current year in footer
// ================================
document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ================================
    // Highlight active navigation link
    // ================================
    let currentPage = window.location.pathname.split('/').pop();

    if (currentPage === "" || currentPage === null) {
        currentPage = "index.html";
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ================================
    // Force navigation for nav links
    // ================================
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // stop default link behavior
            const targetPage = link.getAttribute('href');
            window.location.href = targetPage; // navigate manually
        });
    });

    // ================================
    // Make logo clickable (goes to home)
    // ================================
    const logo = document.getElementById('home-link');
    if (logo) {
        logo.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    }
});
