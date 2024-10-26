document.addEventListener('DOMContentLoaded', function() {
    // Element selectors
    var leftArrow = document.querySelector(".left-arrow");
    var rightArrow = document.querySelector(".right-arrow");
    var dayMode = document.querySelector(".night-mode");
    var nightMode = document.querySelector(".day-mode");
    var leftButton = document.querySelector(".left");
    var rightButton = document.querySelector(".right");
    var videos = document.querySelectorAll(".video");
    var currentVideoIndex = 0;
    var titleElement = document.querySelector('.pvid1');
    var sizeLetters = document.querySelectorAll('.size-letter');
    
    // Title and size links
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

    // Sound effects
    var hoverSound = new Audio('./audio/click2.mp3');
    var clickSound = new Audio('./audio/click1t.mp3');
    var hoverModeSound = new Audio('./audio/click2.mp3');
    var clickModeSound = new Audio('./audio/click1t.mp3');
    var hoverSizeSound = new Audio('./audio/click2.mp3');
    var clickSizeSound = new Audio('./audio/click1t.mp3');
    var pageChangeSound = new Audio('./audio/page-transition.mp3');

    // Set volume for all sounds
    hoverSound.volume = 0.3;
    clickSound.volume = 0.3;
    hoverModeSound.volume = 0.2;
    clickModeSound.volume = 0.2;
    hoverSizeSound.volume = 0.3;
    clickSizeSound.volume = 0.3;
    pageChangeSound.volume = 0.5;

    // Flag to track audio initialization
    let audioInitialized = false;
    let preventHoverSound = false;

    // Function to initialize audio on first interaction
    function initAudio() {
        audioInitialized = true;
    }

    // Play sound on hover (disabled for screens <= 600px)
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

    // Preload sounds to improve performance
    function preloadSounds() {
        hoverSound.load();
        clickSound.load();
        hoverModeSound.load();
        clickModeSound.load();
        hoverSizeSound.load();
        clickSizeSound.load();
        pageChangeSound.load();
    }
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

    // Function to play page change sound, then navigate
    function playPageChangeSoundAndNavigate(url) {
        pageChangeSound.currentTime = 0;
        pageChangeSound.play().then(() => {
            setTimeout(() => {
                window.location.href = url;
            }, 500); // Delay navigation by 500ms for sound to play
        }).catch(error => {
            console.error('Page change sound playback failed:', error);
            window.location.href = url; // Fallback to navigate immediately if sound fails
        });
    }

    // Attach event listeners to size letters for page change with sound
    sizeLetters.forEach(letter => {
        letter.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default navigation
            var size = letter.textContent; // 'S', 'M', 'L', or 'XL'
            var url = sizeLinks[currentVideoIndex][size]; // Get the corresponding link
            playPageChangeSoundAndNavigate(url);
        });
    });

    // Function to update video title and size links
    function updateContent(index) {
        titleElement.textContent = titles[index];
        sizeLetters.forEach(function(letter) {
            var size = letter.textContent;
            letter.setAttribute('href', sizeLinks[index][size]);
            letter.style.display = "inline";
        });
    }
    updateContent(currentVideoIndex);

    // Manage video visibility and content update for arrow clicks
    rightArrow.addEventListener("click", function() {
        videos[currentVideoIndex].style.display = "none";
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        videos[currentVideoIndex].style.display = "block";
        updateContent(currentVideoIndex);
    });

    leftArrow.addEventListener("click", function() {
        videos[currentVideoIndex].style.display = "none";
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        videos[currentVideoIndex].style.display = "block";
        updateContent(currentVideoIndex);
    });

    // Toggle light and dark mode
    dayMode.addEventListener("click", function() {
        document.body.style.background = "black";
        dayMode.classList.add("dayMode");
        nightMode.classList.remove("dayMode");
        leftButton.classList.add("left-white");
        leftButton.classList.remove("left-black");
        rightButton.classList.add("left-white");
        rightButton.classList.remove("left-black");
    });

    nightMode.addEventListener("click", function() {
        document.body.style.background = "white";
        nightMode.classList.add("dayMode");
        dayMode.classList.remove("dayMode");
        leftButton.classList.remove("left-white");
        leftButton.classList.add("left-black");
        rightButton.classList.remove("left-white");
        rightButton.classList.add("left-black");
    });

    // Animate dollar amount display
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

    animateDollarAmount(55, 1500);
});
