// Set the target date to January 29, 2025 at midnight
const targetDate = new Date('January 29, 2025 00:00:00').getTime();

// Function to pad numbers with leading zeros
function padNumber(number, digits) {
    return String(number).padStart(digits, '0');
}

// Function to start the countdown
function startCountdown() {
    const timerElement = document.getElementById('timer');

    const interval = setInterval(() => {
        const currentDate = new Date().getTime();
        const timeRemaining = targetDate - currentDate; // Time difference in milliseconds

        if (timeRemaining <= 0) {
            clearInterval(interval);
            timerElement.textContent = "000: 000: 000: 000"; // Timer ended
            return;
        }

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Format the result with leading zeros
        const formattedDays = padNumber(days, 3);   // Ensure days are in 000 format
        const formattedHours = padNumber(hours, 3); // Ensure hours are in 000 format
        const formattedMinutes = padNumber(minutes, 3); // Ensure minutes are in 000 format
        const formattedSeconds = padNumber(seconds, 3); // Ensure seconds are in 000 format

        // Display the result in the timer element
        timerElement.textContent = `${formattedDays}: ${formattedHours}: ${formattedMinutes}: ${formattedSeconds}`;
    }, 1000); // Update every second
}

// Start the countdown on page load
startCountdown();

// Sound for light and dark mode buttons
var hoverModeSound = new Audio('./audio/click2.mp3');
var clickModeSound = new Audio('./audio/click1t.mp3');

// Set volume for light/dark mode sounds
hoverModeSound.volume = 0.2;
clickModeSound.volume = 0.5;

// Function to add hover sound
function addHoverSound(element, hoverAudio) {
    element.addEventListener("mouseenter", function() {
        hoverAudio.currentTime = 0;
        hoverAudio.play().catch(error => {
            console.error('Hover sound playback failed:', error);
        });
    });
}

// Function to add click sound with delay
function addClickSound(element, clickAudio) {
    let preventClickSound = false; // Flag to prevent immediate re-click

    element.addEventListener("click", function() {
        if (!preventClickSound) {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(error => {
                console.error('Click sound playback failed:', error);
            });
            preventClickSound = true; // Set flag to prevent re-click

            setTimeout(function() {
                preventClickSound = false; // Reset flag after 200 ms
            }, 200); // Delay before allowing another click
        }
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
        clickModeSound.currentTime = 0; // Reset sound
        clickModeSound.play(); // Play click sound
    }
});

// Night mode event listener
nightMode.addEventListener("click", function() {
    if (document.body.style.background === "black") {
        document.body.style.background = "white"; // Change back to original color
        dayMode.classList.remove("dayMode"); // Adjust class for night mode button
        nightMode.classList.add("dayMode"); // Adjust class for day mode
        clickModeSound.currentTime = 0; // Reset sound
        clickModeSound.play(); // Play click sound
    }
});

