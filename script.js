document.addEventListener("DOMContentLoaded", function () {
    // --- Section 1: Navigation & Active Link Highlighting ---
    // Select all main content sections and mobile navigation links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".mobile-icons a");

    /**
     * Updates the active navigation link's color based on the currently visible section.
     * This function is primarily triggered by the Intersection Observer.
     * @param {string} activeSectionId - The ID of the section that is currently intersecting.
     */
    function updateActiveLink(activeSectionId) {
        navLinks.forEach((link) => {
            // Reset all links to their default color (gray)
            link.style.color = "rgb(161, 161, 161)";
            // If the link's href matches the active section's ID, set its color to orange
            if (link.getAttribute("href") === `#${activeSectionId}`) {
                link.style.color = "orange";
            }
        });
    }

    // Initialize Intersection Observer to detect when sections enter/exit the viewport
    // This is a modern and more performant way to track scroll position for navigation highlighting.
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // When a section becomes visible (intersects), update the active link
                    updateActiveLink(entry.target.id);
                }
            });
        },
        { threshold: 0.6 } // A section is considered "intersecting" when 60% of it is visible
    );

    // Start observing each section for intersection changes
    sections.forEach((section) => sectionObserver.observe(section));

    // Add click listeners to mobile navigation icons for smooth scrolling
    navLinks.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent the default instant jump behavior
            const targetId = this.getAttribute("href").substring(1); // Get the section ID from the href
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Smoothly scroll to the target section
                targetSection.scrollIntoView({ behavior: "smooth" });

                // A small delay to ensure the active link updates correctly after smooth scrolling.
                // This gives the browser time to update scroll position and for the Intersection Observer to potentially fire.
                setTimeout(() => updateActiveLink(targetId), 500);
            }
        });
    });

    // --- Section 2: Mobile Menu Toggle Logic ---
    const menuIcon = document.querySelector(".menu-icon"); // The hamburger menu icon
    const nav = document.querySelector("nav"); // The navigation element
    const body = document.body; // The body element for scroll locking/blur effects

    if (menuIcon && nav && body) {
        // Event listener to open the menu when the menu icon is clicked
        menuIcon.addEventListener("click", function () {
            nav.classList.add("active"); // Add 'active' class to show the nav
            body.classList.add("menu-open"); // Add 'menu-open' class to body for blur/scroll lock effects
        });

        // Event listener to close the menu when a link inside the nav is clicked, or if the nav background is clicked
        nav.addEventListener("click", function (event) {
            if (event.target.tagName === 'A' || event.target === nav) { // Check if a link or the nav itself was clicked
                nav.classList.remove("active");
                body.classList.remove("menu-open");
            }
        });
    }

    // --- Section 3: Quiz Popup Logic ---
    const quizBtn = document.getElementById("quiz-btn"); // Button to open the quiz
    const popup = document.getElementById("quiz-popup"); // The popup container
    const closeBtn = document.querySelector(".popup .close"); // Button to close the popup

    if (quizBtn && popup && closeBtn) {
        // Open popup when quiz button is clicked
        quizBtn.addEventListener("click", function () {
            popup.style.display = "block"; // Show the popup
            body.classList.add("modal-open"); // Add class to body to prevent background scrolling
        });

        // Close popup when close button is clicked
        closeBtn.addEventListener("click", function () {
            popup.style.display = "none"; // Hide the popup
            body.classList.remove("modal-open"); // Remove body class
        });

        // Close popup when clicking outside the popup content (on the overlay)
        window.addEventListener("click", function (event) {
            if (event.target === popup) {
                popup.style.display = "none";
                body.classList.remove("modal-open");
            }
        });
    }

    // --- Section 4: Image Slider with Swipe Functionality ---
    const imageSliderWrapper = document.querySelector(".image-slider-wrapper"); // The outer container for the slider
    const imageSlider = document.querySelector(".image-slider"); // The inner container that holds the images
    const sliderImages = document.querySelectorAll(".image-slider img"); // All individual image elements
    const sliderDotsContainer = document.querySelector(".slider-dots"); // Optional: for navigation dots

    let currentIndex = 0; // Tracks the currently displayed image index
    let startX = 0;       // Stores the starting X coordinate of a touch
    let endX = 0;         // Stores the ending X coordinate of a touch
    let isSwiping = false; // Flag to indicate if a swipe gesture is in progress

    // Only enable slider functionality if the necessary elements are found and there are images
    if (imageSlider && sliderImages.length > 0) {
        // Optional: Dynamically create navigation dots for each image
        if (sliderDotsContainer) {
            for (let i = 0; i < sliderImages.length; i++) {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                dot.dataset.index = i;
                dot.addEventListener("click", () => showSlide(i)); // Make dots clickable
                sliderDotsContainer.appendChild(dot);
            }
        }

        /**
         * Updates the active state of the navigation dots to match the current slide.
         */
        function updateDots() {
            if (sliderDotsContainer) {
                document.querySelectorAll(".slider-dots .dot").forEach((dot, idx) => {
                    dot.classList.toggle("active", idx === currentIndex);
                });
            }
        }

        /**
         * Displays the image at the specified index.
         * Handles looping back to the start/end if index goes out of bounds.
         * @param {number} index - The index of the image to display.
         */
        function showSlide(index) {
            // Loop functionality: if going past the last image, go to the first; if before the first, go to the last.
            if (index < 0) {
                currentIndex = sliderImages.length - 1;
            } else if (index >= sliderImages.length) {
                currentIndex = 0;
            } else {
                currentIndex = index; // Set the current index
            }

            // Calculate the CSS `transform` value to slide the images horizontally.
            // Each image takes 100% of the slider's width.
            const offset = -currentIndex * 100;
            imageSlider.style.transform = `translateX(${offset}%)`;

            updateDots(); // Update the visual state of the navigation dots
        }

        // --- Touch Event Listeners for Swipe ---

        // When a finger touches the screen
        imageSlider.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX; // Record the starting X position of the touch
            isSwiping = true; // Set flag that a swipe might be starting
            // Optional: Temporarily remove CSS transition for a "real-time drag" feel during the touchmove
            // imageSlider.style.transition = 'none';
        });

        // When a finger moves on the screen after touching
        imageSlider.addEventListener("touchmove", (e) => {
            if (!isSwiping) return; // Only proceed if a swipe started
            endX = e.touches[0].clientX; // Record the current X position of the touch
            // To prevent scrolling the page while swiping the image slider
            e.preventDefault();
            // Optional: Implement live dragging effect (uncomment if you want images to follow finger)
            // const currentTranslate = -currentIndex * 100;
            // const dragAmount = ((endX - startX) / imageSlider.offsetWidth) * 100;
            // imageSlider.style.transform = `translateX(${currentTranslate + dragAmount}%)`;
        });

        // When a finger lifts off the screen
        imageSlider.addEventListener("touchend", () => {
            if (!isSwiping) return; // Only proceed if a swipe was in progress
            isSwiping = false; // Reset swipe flag
            // Optional: Re-enable CSS transition after the touch ends
            // imageSlider.style.transition = 'transform 0.5s ease-in-out';

            const threshold = 50; // Minimum pixel distance for a swipe to be recognized
            const deltaX = endX - startX; // Calculate the total horizontal distance moved

            if (deltaX > threshold) { // If moved right significantly (swipe right)
                showSlide(currentIndex - 1); // Go to the previous image
            } else if (deltaX < -threshold) { // If moved left significantly (swipe left)
                showSlide(currentIndex + 1); // Go to the next image
            }
            // Reset startX and endX for the next swipe gesture
            startX = 0;
            endX = 0;
        });

        // Initialize the slider to show the first image when the page loads
        showSlide(0);
    }
});