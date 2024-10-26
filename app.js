document.addEventListener('DOMContentLoaded', function() {
    // Element selectors
    var leftArrow = document.querySelector(".left-arrow");
    var rightArrow = document.querySelector(".right-arrow");
    var dayMode = document.querySelector(".night-mode");
    var nightMode = document.querySelector(".day-mode");
    var leftButton = document.querySelector(".left");
    var rightButton = document.querySelector(".right");
    var videos = document.querySelectorAll(".video");
    var products = document.querySelectorAll(".product");
    var currentVideoIndex = 0;
    var titleElement = document.querySelector('.pvid1');
    var sizeLetters = document.querySelectorAll('.size-letter');
    var cartElement = document.querySelector(".cart");

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
    var hoverInputSound = new Audio('./audio/click2.mp3');
    var clickInputSound = new Audio('./audio/click1t.mp3');

    // Set volume for all sounds
    hoverSound.volume = 0.3;
    clickSound.volume = 0.3;
    hoverModeSound.volume = 0.2;
    clickModeSound.volume = 0.2;
    hoverSizeSound.volume = 0.3;
    clickSizeSound.volume = 0.3;
    hoverInputSound.volume = 0.3;
    clickInputSound.volume = 0.3;
    pageChangeSound.volume = 0.4;

    // Initialize audio and prevent hover overlap
    let audioInitialized = false;
    let preventHoverSound = false;

    function initAudio() {
        audioInitialized = true;
    }

    // Preload sounds
    function preloadSounds() {
        hoverSound.load();
        clickSound.load();
        hoverModeSound.load();
        clickModeSound.load();
        hoverSizeSound.load();
        clickSizeSound.load();
        hoverInputSound.load();
        clickInputSound.load();
        pageChangeSound.load();
    }
    preloadSounds();

    // Play sound on hover
    function addHoverSound(element, hoverAudio) {
        element.addEventListener("mouseenter", function() {
            if (audioInitialized && !preventHoverSound && window.innerWidth > 430) {
                hoverAudio.currentTime = 0;
                hoverAudio.play().catch(error => console.error('Hover sound playback failed:', error));
            }
        });
    }

    // Play sound on click
    function addClickSound(element, clickAudio) {
        element.addEventListener("click", function() {
            if (audioInitialized) {
                clickAudio.currentTime = 0;
                clickAudio.play().catch(error => console.error('Click sound playback failed:', error));
                preventHoverSound = true;
                setTimeout(() => preventHoverSound = false, 200);
            }
        });
    }

    // Initialize sounds and add event listeners
    initAudio();
    addHoverSound(leftArrow, hoverSound);
    addHoverSound(rightArrow, hoverSound);
    addClickSound(leftArrow, clickSound);
    addClickSound(rightArrow, clickSound);

    addHoverSound(dayMode, hoverModeSound);
    addHoverSound(nightMode, hoverModeSound);
    addClickSound(dayMode, clickModeSound);
    addClickSound(nightMode, clickModeSound);

    sizeLetters.forEach(letter => {
        addHoverSound(letter, hoverSizeSound);
        addClickSound(letter, clickSizeSound);
    });

    var addToCartButtons = document.querySelectorAll('button[id^="addToCartButton"]');
    addToCartButtons.forEach(button => {
        addHoverSound(button, hoverSizeSound);
        addClickSound(button, clickSizeSound);
    });

    var quantityInput = document.getElementById('quantity1');
    addHoverSound(quantityInput, hoverInputSound);
    addClickSound(quantityInput, clickInputSound);

    var sizeSelect = document.getElementById('size1');
    addHoverSound(sizeSelect, hoverSizeSound);
    addClickSound(sizeSelect, clickSizeSound);

    addHoverSound(cartElement, hoverSizeSound);
    addClickSound(cartElement, clickSizeSound);

    // Play page change sound and navigate
    function playPageChangeSoundAndNavigate(url) {
        pageChangeSound.currentTime = 0;
        pageChangeSound.play().then(() => {
            setTimeout(() => window.location.href = url, 500);
        }).catch(error => {
            console.error('Page change sound playback failed:', error);
            window.location.href = url;
        });
    }

    // Attach size link events
    sizeLetters.forEach(letter => {
        letter.addEventListener('click', function(event) {
            event.preventDefault();
            var size = letter.textContent;
            var url = sizeLinks[currentVideoIndex][size];
            playPageChangeSoundAndNavigate(url);
        });
    });

    // Update content, video, and product display
    function updateContent(index) {
        titleElement.textContent = titles[index];
        sizeLetters.forEach(letter => {
            var size = letter.textContent;
            letter.setAttribute('href', sizeLinks[index][size]);
            letter.style.display = "inline";
        });
    }

    function showVideo(index) {
        videos.forEach((video, i) => video.style.display = i === index ? "block" : "none");
    }

    function showProduct(index) {
        products.forEach((product, i) => product.style.display = i === index ? "block" : "none");
    }

    // Initialize video and product display
    updateContent(currentVideoIndex);
    showVideo(currentVideoIndex);
    showProduct(currentVideoIndex);

    // Arrow navigation
    rightArrow.addEventListener("click", function() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        showVideo(currentVideoIndex);
        showProduct(currentVideoIndex);
        updateContent(currentVideoIndex);
    });

    leftArrow.addEventListener("click", function() {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        showVideo(currentVideoIndex);
        showProduct(currentVideoIndex);
        updateContent(currentVideoIndex);
    });

    // Light and dark mode toggle
    dayMode.addEventListener("click", function() {
        document.body.style.background = "black";
        dayMode.classList.add("dayMode");
        nightMode.classList.remove("dayMode");
        leftButton.classList.add("left-white");
        leftButton.classList.remove("left-black");
        rightButton.classList.add("left-white");
        rightButton.classList.remove("left-black");
        cartElement.classList.add("left-white");
        cartElement.classList.remove("left-black");

    });

    nightMode.addEventListener("click", function() {
        document.body.style.background = "white";
        nightMode.classList.add("dayMode");
        dayMode.classList.remove("dayMode");
        leftButton.classList.add("left-black");
        leftButton.classList.remove("left-white");
        rightButton.classList.add("left-black");
        rightButton.classList.remove("left-white");
        cartElement.classList.remove("left-white");
        cartElement.classList.add("left-black");

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
