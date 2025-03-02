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
document.addEventListener("DOMContentLoaded", function () {
    const screenshots = [
        "Smart/Screenshot 2024-12-30 224237.png",
        "Smart/Screenshot 2024-12-30 224312.png",
        "Smart/Screenshot 2024-12-30 225948.png",
        "Smart/Screenshot 2024-12-30 230003.png",
        "Smart/Screenshot 2024-12-30 230041.png",
        "Smart/Screenshot 2024-12-30 230100.png",
        "Smart/Screenshot 2024-12-30 230652.png",
        "Smart/Screenshot 2024-12-30 230732.png",
        "",
        
    ];

    const diagrams = [
        "images/project1/database_diagram.png",
        "images/project1/system_architecture.png",
        "images/project1/use_case_diagram.png"
    ];

    const screenshotContainer = document.getElementById("screenshots");
    screenshots.forEach(src => {
        let img = document.createElement("img");
        img.src = src;
        img.alt = "Project Screenshot";
        screenshotContainer.appendChild(img);
    });

    const diagramContainer = document.getElementById("diagrams");
    diagrams.forEach(src => {
        let img = document.createElement("img");
        img.src = src;
        img.alt = "Project Diagram";
        diagramContainer.appendChild(img);
    });
});

// Back Button Function
function goBack() {
    window.history.back();
}
