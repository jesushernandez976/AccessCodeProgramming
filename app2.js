// Load sound effects
var pageChangeSound = document.getElementById('page-change-sound');
var hoverModeSound = document.getElementById('hover-mode-sound');
var clickModeSound = document.getElementById('click-mode-sound');

// Set volumes for sounds
pageChangeSound.volume = 0.3; 
hoverModeSound.volume = 0.2;
clickModeSound.volume = 0.2;

// Flag to prevent hover sound when clicking
let isClicked = false;

// Function to play the page transition sound and navigate
function playPageChangeSoundAndNavigate(url) {
    // Reset the sound to start from the beginning
    pageChangeSound.currentTime = 0; 

    // Play the sound effect
    pageChangeSound.play().then(() => {
        // Add fade-out class to body for transition effect
        document.body.classList.add('fade-out');

        // Wait for the full duration of the sound before navigating
        setTimeout(() => {
            window.location.href = url; // Navigate to the new page
        }, pageChangeSound.duration * 1000); // Sound duration in milliseconds
    }).catch(error => {
        console.error('Page change sound playback failed:', error);
        window.location.href = url; // Fallback to navigate immediately if sound fails
    });
}

// Attach event listener to the "C0MING S00N" button
document.getElementById('shop-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action
    playPageChangeSoundAndNavigate('shop.html'); // Call the function to play sound and navigate
});

// Function to add hover sound
function addHoverSound(element, hoverAudio) {
    element.addEventListener("mouseenter", function() {
        if (!isClicked) { // Only play hover sound if not clicked
            hoverAudio.currentTime = 0;
            hoverAudio.play().catch(error => {
                console.error('Hover sound playback failed:', error);
            });
        }
    });
}

// Function to add click sound with delay
function addClickSound(element, clickAudio) {
    element.addEventListener("click", function() {
        // Play click sound and set clicked flag
        isClicked = true; // Set flag to prevent hover sound
        clickAudio.currentTime = 0;
        clickAudio.play().catch(error => {
            console.error('Click sound playback failed:', error);
        });

        // Reset the clicked flag after 200 ms
        setTimeout(function() {
            isClicked = false; // Allow hover sound again after delay
        }, 200); // Delay before allowing hover sound
    });
}

// Day mode button
var dayMode = document.querySelector(".night-mode");
var nightMode = document.querySelector(".day-mode");

// Set initial background color to white (day mode)
document.body.style.background = "white";

// Add hover and click sounds for day mode
addHoverSound(dayMode, hoverModeSound);
addClickSound(dayMode, clickModeSound);

// Add hover and click sounds for night mode
addHoverSound(nightMode, hoverModeSound);
addClickSound(nightMode, clickModeSound);

// Day mode event listener
dayMode.addEventListener("click", function() {
    // Check if the current background is white
    if (document.body.style.background === "white") {
        // Switch to night mode
        document.body.style.background = "black"; // Change to night color
        nightMode.classList.remove("dayMode"); // Adjust class for night mode
        dayMode.classList.add("dayMode"); // Adjust class for day mode button
    }
});

// Night mode event listener
nightMode.addEventListener("click", function() {
    if (document.body.style.background === "black") {
        document.body.style.background = "white"; // Change back to original color
        dayMode.classList.remove("dayMode"); // Adjust class for night mode button
        nightMode.classList.add("dayMode"); // Adjust class for day mode
    }
});
