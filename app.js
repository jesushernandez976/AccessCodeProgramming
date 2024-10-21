document.addEventListener('DOMContentLoaded', function() {
    var leftArrow = document.querySelector(".left-arrow");
    var rightArrow = document.querySelector(".right-arrow");
    var videos = document.querySelectorAll(".video");
    var currentVideoIndex = 0;

    // Hide all videos except the first one
    videos.forEach((video, index) => {
        if (index !== currentVideoIndex) {
            video.style.display = "none";
        }
    });

    // Right arrow functionality
    rightArrow.addEventListener("click", function() {
        videos[currentVideoIndex].style.display = "none";
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        videos[currentVideoIndex].style.display = "block";
    });

    // Left arrow functionality
    leftArrow.addEventListener("click", function() {
        videos[currentVideoIndex].style.display = "none";
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        videos[currentVideoIndex].style.display = "block";
    });

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
            const timeRemaining = targetDate - currentDate;

            if (timeRemaining <= 0) {
                clearInterval(interval);
                timerElement.textContent = "000: 000: 000: 000";
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            const formattedDays = padNumber(days, 3);
            const formattedHours = padNumber(hours, 3);
            const formattedMinutes = padNumber(minutes, 3);
            const formattedSeconds = padNumber(seconds, 3);

            timerElement.textContent = `${formattedDays}: ${formattedHours}: ${formattedMinutes}: ${formattedSeconds}`;
        }, 1000);
    }

    // Start the countdown on page load
    startCountdown();
});

var dayMode = document.querySelector(".night-mode");
var nightMode = document.querySelector(".day-mode");
var leftButton = document.querySelector(".left");
var rightButton = document.querySelector(".right");

// Set initial background color and button states
document.body.style.background = "white";
nightMode.classList.add("dayMode"); // Initially set night mode button hidden
leftButton.classList.add("left-black");
rightButton.classList.add("left-black");


dayMode.addEventListener("click", function() {
    // Switch to night mode
    document.body.style.background = "black"; // Change to night color
    dayMode.classList.add("dayMode"); // Hide the day mode button
    nightMode.classList.remove("dayMode"); // Show the night mode button

    leftButton.classList.add("left-white"); // Change button class for night mode
    leftButton.classList.remove("left-black"); // Remove day mode class

   rightButton.classList.add("left-white"); // Change button class for night mode
   rightButton.classList.remove("left-black");
});

nightMode.addEventListener("click", function() {
    // Switch back to day mode
    document.body.style.background = "white"; // Change back to original color
    nightMode.classList.add("dayMode"); // Hide the night mode button
    dayMode.classList.remove("dayMode"); // Show the day mode button

    leftButton.classList.remove("left-white"); // Remove night mode class
    leftButton.classList.add("left-black"); // Add day mode class

    rightButton.classList.remove("left-white"); // Remove night mode class
    rightButton.classList.add("left-black"); 

});
