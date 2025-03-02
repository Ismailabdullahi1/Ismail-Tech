
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".mobile-icons a");

    // Function to update active state
    function updateActiveLink(targetId) {
        navLinks.forEach((link) => link.style.color = "rgb(161, 161, 161)");

        let activeLink = document.querySelector(`.mobile-icons a[href="#${targetId}"]`);
        if (activeLink) {
            activeLink.style.color = "orange";
        }
    }

    // Intersection Observer to detect scrolling
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    updateActiveLink(entry.target.id);
                }
            });
        },
        { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    // Smooth scroll on icon click + ensure orange is set
    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });

                // Small delay to update color after scrolling
                setTimeout(() => updateActiveLink(targetId), 500);
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector(".menu-icon");
    const nav = document.querySelector("nav");
    const body = document.body;


   
    // Open menu
    menuIcon.addEventListener("click", function () {
        nav.classList.add("active");
        body.classList.add("menu-open"); // Apply blur effect
    });

    
});
document.addEventListener("DOMContentLoaded", function () {
    const quizBtn = document.getElementById("quiz-btn");
    const popup = document.getElementById("quiz-popup");
    const closeBtn = document.querySelector(".popup .close");

    quizBtn.addEventListener("click", function () {
        popup.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});

