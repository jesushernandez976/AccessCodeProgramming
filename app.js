document.addEventListener('DOMContentLoaded', function() {
    var leftArrow = document.querySelector(".left-arrow");
    var rightArrow = document.querySelector(".right-arrow");
    var dayMode = document.querySelector(".night-mode");
    var nightMode = document.querySelector(".day-mode");
    var leftButton = document.querySelector(".left");
    var rightButton = document.querySelector(".right");
    var videos = document.querySelectorAll(".video");
    var currentVideoIndex = 0;

    var titles = [
        "WHITE AND BLUE ACP 001",
        "BLACK AND BLUE ACP 001",
        "BLUE AND WHITE ACP 001"
    ];

    var sizeLinks = [
        { S: "page1.html", M: "page2.html", L: "page3.html", XL: "page4.html" },
        { S: "page5.html", M: "page6.html", L: "page7.html", XL: "page8.html" },
        { S: "page9.html", M: "page10.html", L: "page11.html", XL: "page12.html" }
    ];

    var titleElement = document.querySelector('.pvid1');
    var sizeLetters = document.querySelectorAll('.size-letter');

    // Sound for arrows
    var hoverSound = new Audio('./audio/click2.mp3');
    var clickSound = new Audio('./audio/click1t.mp3');

    // Sound for light and dark mode buttons
    var hoverModeSound = new Audio('./audio/click2.mp3');
    var clickModeSound = new Audio('./audio/click1t.mp3');

    // Sounds for size letters
    var hoverSizeSound = new Audio('./audio/click2.mp3');
    var clickSizeSound = new Audio('./audio/click1t.mp3');

    // Set volume for both arrow sounds (0.3 is 30% volume)
    hoverSound.volume = 0.3;
    clickSound.volume = 0.3;

    // Set volume for light/dark mode sounds (separate volumes)
    hoverModeSound.volume = 0.2;
    clickModeSound.volume = 0.2;

    // Set volume for size letter sounds
    hoverSizeSound.volume = 0.3;
    clickSizeSound.volume = 0.3;

    // Flag to track audio initialization
    let audioInitialized = false;
    let preventHoverSound = false;

    // Function to initialize audio
    function initAudio() {
        audioInitialized = true;
    }

    // Play sound on hover (disabled when screen is <= 600px)
    function addHoverSound(element, hoverAudio) {
        element.addEventListener("mouseenter", function() {
            if (audioInitialized && !preventHoverSound && window.innerWidth > 430) {
                hoverAudio.currentTime = 0;
                hoverAudio.play().catch(error => {
                    console.error('Hover sound playback failed:', error);
                });
            }
        });
    }

    // Play sound on click
    function addClickSound(element, clickAudio) {
        element.addEventListener("click", function() {
            if (audioInitialized) {
                clickAudio.currentTime = 0;
                clickAudio.play().catch(error => {
                    console.error('Click sound playback failed:', error);
                });
                preventHoverSound = true;
                setTimeout(function() {
                    preventHoverSound = false;
                }, 200);
            }
        });
    }

    // Preload sounds
    function preloadSounds() {
        hoverSound.load();
        clickSound.load();
        hoverModeSound.load();
        clickModeSound.load();
        hoverSizeSound.load();
        clickSizeSound.load();
    }

    // Call preloadSounds
    preloadSounds();

    // Initialize audio on the first interaction (click)
    document.addEventListener('click', function() {
        initAudio();

        // Add hover and click sound event listeners to arrows
        addHoverSound(leftArrow, hoverSound);
        addHoverSound(rightArrow, hoverSound);
        addClickSound(leftArrow, clickSound);
        addClickSound(rightArrow, clickSound);

        // Add hover and click sound event listeners to day and night mode buttons
        addHoverSound(dayMode, hoverModeSound);
        addHoverSound(nightMode, hoverModeSound);
        addClickSound(dayMode, clickModeSound);
        addClickSound(nightMode, clickModeSound);

        // Add hover and click sound event listeners to size letters
        sizeLetters.forEach(letter => {
            addHoverSound(letter, hoverSizeSound);
            addClickSound(letter, clickSizeSound);
        });

        document.removeEventListener('click', arguments.callee);
    });

    // Function to update video title and size links
    function updateContent(index) {
        // Update the video title
        titleElement.textContent = titles[index];

        // Hide all size links
        sizeLetters.forEach(function(letter) {
            letter.style.display = "none"; // Hide all size letters
        });

        // Show size letters for the current video
        sizeLetters.forEach(function(letter) {
            var size = letter.textContent; // 'S', 'M', 'L', or 'XL'
            letter.setAttribute('href', sizeLinks[index][size]); // Set the corresponding link
            letter.style.display = "inline"; // Show size letters
        });
    }

    // Initialize the page with the first video's content
    updateContent(currentVideoIndex);

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
        updateContent(currentVideoIndex);
    });

    // Left arrow functionality
    leftArrow.addEventListener("click", function() {
        videos[currentVideoIndex].style.display = "none";
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        videos[currentVideoIndex].style.display = "block";
        updateContent(currentVideoIndex);
    });

    // Day mode (light) to night mode (dark)
    dayMode.addEventListener("click", function() {
        document.body.style.background = "black";
        dayMode.classList.add("dayMode");
        nightMode.classList.remove("dayMode");

        leftButton.classList.add("left-white");
        leftButton.classList.remove("left-black");

        rightButton.classList.add("left-white");
        rightButton.classList.remove("left-black");
    });

    // Night mode (dark) to day mode (light)
    nightMode.addEventListener("click", function() {
        document.body.style.background = "white";
        nightMode.classList.add("dayMode");
        dayMode.classList.remove("dayMode");

        leftButton.classList.remove("left-white");
        leftButton.classList.add("left-black");

        rightButton.classList.remove("left-white");
        rightButton.classList.add("left-black");
    });

    // Function to animate the dollar amount
    function animateDollarAmount(targetAmount, duration) {
        const amountElement = document.getElementById('amountDisplay');
        let startAmount = 0;
        const stepTime = Math.abs(Math.floor(duration / targetAmount));

        const updateAmount = () => {
            if (startAmount < targetAmount) {
                startAmount++;
                amountElement.textContent = `$${startAmount.toFixed(2)} USD`;
                setTimeout(updateAmount, stepTime);
            } else {
                amountElement.textContent = `$${targetAmount.toFixed(2)} USD`;
            }
        };

        updateAmount();
    }

    // Call the animation function when the page loads
    animateDollarAmount(55, 1500); // Animate to USD $55.00 over 2 seconds
});
