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
