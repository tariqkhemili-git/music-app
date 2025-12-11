// Nav bar items
const menuItems = document.querySelectorAll(".menu-item");
const homeButton = document.getElementById("home");
const searchButton = document.getElementById("search");
const libraryButton = document.getElementById("library");

// Search bar and search container
const searchBar = document.querySelector("#searchbar");
const searchContainer = document.querySelector(".search-container");
const searchImg = document.querySelector(".search-icon");

// Media player items
const musicPlayer = document.querySelector(".music-player");
const musicBottom = document.querySelector(".music-bottom");
const musicBottomItems = document.querySelectorAll(".music-bottom-item");
const playPauseButton = document.getElementById("play-pause-btn");

// Function to hide search bar
const hideSearchBar = () => {
  searchBar.classList.add("search-container-display-none");
  searchContainer.classList.add("search-container-display-none");
  searchImg.classList.add("search-container-display-none");
};

// Function to toggle search bar
const toggleSearchBar = () => {
  searchBar.classList.toggle("search-container-display-none");
  searchContainer.classList.toggle("search-container-display-none");
  searchImg.classList.toggle("search-container-display-none");
};

// Search button click event
searchButton.addEventListener("click", () => {
  toggleSearchBar();

  // Check if the search bar is now visible (i.e., does NOT have the hidden class)
  const isVisible = !searchBar.classList.contains(
    "search-container-display-none"
  );

  if (isVisible) {
    // slight timeout ensures the element is rendered before we try to focus
    setTimeout(() => {
      searchBar.focus();
    }, 10);
  }
});

// Hide search bar when clicking outside of it
document.addEventListener("click", (event) => {
  // Check if the click happened inside the search button (including the image)
  const clickedInsideButton = searchButton.contains(event.target);

  // Check if the click happened inside the search bar itself
  const clickedInsideSearchBar = searchBar.contains(event.target);

  // If the click was NOT inside the button AND NOT inside the search bar...
  if (!clickedInsideButton && !clickedInsideSearchBar) {
    // ...and the search bar is currently open
    if (!searchBar.classList.contains("search-container-display-none")) {
      hideSearchBar();
    }
  }
});

// Hide music player when clicking outside of it
document.addEventListener("click", (event) => {
  // Check if the click happened inside the music player
  const clickedInsideMusicPlayer = musicPlayer.contains(event.target);

  // Check if the click happened inside the music bottom bar
  const clickedInsideMusicBottom = musicBottom.contains(event.target);

  // If the click was NOT inside the music player AND NOT inside the music bottom bar...
  if (!clickedInsideMusicPlayer && !clickedInsideMusicBottom) {
    // ...and the music player is currently open
    if (musicPlayer.classList.contains("music-player-open")) {
      musicPlayer.classList.remove("music-player-open");
    }
  }
});

// Change cursor to default while hovering over music bottom while music player is open
musicBottom.addEventListener("mouseover", () => {
  if (musicPlayer.classList.contains("music-player-open")) {
    musicBottom.style.cursor = "default";
  } else {
    musicBottom.style.cursor = "context-menu";
  }
});

// Hide search bar on scroll
window.addEventListener("scroll", () => {
  if (!searchBar.classList.contains("search-container-display-none")) {
    hideSearchBar();
  }
});

// Hide music player on scroll
window.addEventListener("scroll", () => {
  if (musicPlayer.classList.contains("music-player-open")) {
    musicPlayer.classList.remove("music-player-open");
  }
});

// Hide search bar on window focus loss
window.addEventListener("blur", () => {
  if (!searchBar.classList.contains("search-container-display-none")) {
    hideSearchBar();
  }
});

// Button click animations
menuItems.forEach((item) => {
  item.addEventListener("animationend", () => {
    item.classList.remove("playing");
  });

  item.addEventListener("click", () => {
    item.classList.remove("playing");
    void item.offsetWidth;

    item.classList.add("playing");
  });
});

// Media player play/pause button click event
musicBottomItems.forEach((item) => {
  item.addEventListener("animationend", () => {
    item.classList.remove("playing");
  });

  item.addEventListener("click", () => {
    item.classList.remove("playing");
    void item.offsetWidth;

    item.classList.add("playing");
  });
});

// Play/pause button alternating src on click
playPauseButton.addEventListener("click", () => {
  const currentSrc = playPauseButton.getAttribute("src");

  if (currentSrc === "assets/play.svg") {
    playPauseButton.setAttribute("src", "assets/pause.svg");
  } else {
    playPauseButton.setAttribute("src", "assets/play.svg");
  }
});

// Event listener to open music player on music bottom click
musicBottom.addEventListener("click", (e) => {
  // Check if the click originated from a button (or an icon inside a button)
  const clickedButton = e.target.closest(".music-bottom-item");

  // Check if the player is currently closed
  const isPlayerClosed = !musicPlayer.classList.contains("music-player-open");

  // Only open if the player is closed AND the click was NOT on a button
  if (isPlayerClosed && !clickedButton) {
    musicPlayer.classList.add("music-player-open");
  }
});

// --- PAGE SWITCHING LOGIC ---

// 1. Select the specific views by their ID
const homeView = document.getElementById("home-view");
const libraryView = document.getElementById("library-view");

// 2. Home button click event
homeButton.addEventListener("click", () => {
  // Show Home
  homeView.classList.remove("display-none");

  // Hide Library
  libraryView.classList.add("display-none");
});

// 3. Library button click event
libraryButton.addEventListener("click", () => {
  // Hide Home
  homeView.classList.add("display-none");

  // Show Library
  libraryView.classList.remove("display-none");
});
