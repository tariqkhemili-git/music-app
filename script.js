// --- SELECTORS ---

// Nav bar items
const menuItems = document.querySelectorAll(".menu-item");
const homeButton = document.getElementById("home");
const searchButton = document.getElementById("search");
const libraryButton = document.getElementById("library");

// Search bar and container
const searchBar = document.querySelector("#searchbar");
const searchContainer = document.querySelector(".search-container");
const searchImg = document.querySelector(".search-icon");

// Media player items
const musicPlayer = document.querySelector(".music-player");
const musicBottom = document.querySelector(".music-bottom");
const musicBottomItems = document.querySelectorAll(".music-bottom-item");
const playPauseButton = document.getElementById("play-pause-btn");

// View Containers
const homeView = document.getElementById("home-view");
const libraryView = document.getElementById("library-view");

// --- SEARCH FUNCTIONS (Updated for Active Classes) ---

const hideSearchBar = () => {
  // CHANGE: Remove 'search-active' instead of adding 'display-none'
  searchBar.classList.remove("search-active");
  searchContainer.classList.remove("search-active");
  searchImg.classList.remove("search-active");
};

const toggleSearchBar = () => {
  // CHANGE: Toggle 'search-active'
  searchBar.classList.toggle("search-active");
  searchContainer.classList.toggle("search-active");
  searchImg.classList.toggle("search-active");
};

// Search button click
searchButton.addEventListener("click", () => {
  toggleSearchBar();
  // Focus if visible
  if (searchBar.classList.contains("search-active")) {
    setTimeout(() => searchBar.focus(), 50);
  }
});

// Hide search on scroll or blur
window.addEventListener("scroll", () => {
  if (searchBar.classList.contains("search-active")) {
    hideSearchBar();
  }
});

window.addEventListener("blur", () => {
  if (searchBar.classList.contains("search-active")) {
    hideSearchBar();
  }
});

// Hide search when clicking outside
document.addEventListener("click", (event) => {
  const clickedInsideButton = searchButton.contains(event.target);
  // Note: Checking searchContainer ensures clicking the padding doesn't close it
  const clickedInsideSearchBar = searchContainer.contains(event.target);

  if (!clickedInsideButton && !clickedInsideSearchBar) {
    if (searchBar.classList.contains("search-active")) {
      hideSearchBar();
    }
  }
});

// --- UI ANIMATIONS & CLICKS ---

// Menu Items Animation
menuItems.forEach((item) => {
  item.addEventListener("animationend", () => item.classList.remove("playing"));
  item.addEventListener("click", () => {
    item.classList.remove("playing");
    void item.offsetWidth; // Trigger reflow
    item.classList.add("playing");
  });
});

// Music Control Buttons Animation
musicBottomItems.forEach((item) => {
  item.addEventListener("animationend", () => item.classList.remove("playing"));
  item.addEventListener("click", () => {
    item.classList.remove("playing");
    void item.offsetWidth;
    item.classList.add("playing");
  });
});

// Close Music Player when clicking outside
document.addEventListener("click", (event) => {
  const clickedInsidePlayer = musicPlayer.contains(event.target);
  const clickedInsideBottom = musicBottom.contains(event.target);

  if (!clickedInsidePlayer && !clickedInsideBottom) {
    if (musicPlayer.classList.contains("music-player-open")) {
      musicPlayer.classList.remove("music-player-open");
    }
  }
});

// Close Music Player on scroll
window.addEventListener("scroll", () => {
  if (musicPlayer.classList.contains("music-player-open")) {
    musicPlayer.classList.remove("music-player-open");
  }
});

// --- PLAYBACK LOGIC ---

let isPlaying = false;

const togglePlay = () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    playPauseButton.setAttribute("src", "assets/pause.svg");
  } else {
    playPauseButton.setAttribute("src", "assets/play.svg");
  }
};

// Play/Pause Button Click
playPauseButton.addEventListener("click", (e) => {
  e.stopPropagation(); // Stop bubbling to musicBottom
  togglePlay();
});

// Global Spacebar Hotkey
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && document.activeElement !== searchBar) {
    event.preventDefault(); // Stop scrolling
    togglePlay();
  }
});

// --- MUSIC BOTTOM BAR LOGIC ---

// 1. Mouseover: Change cursor style
musicBottom.addEventListener("mouseover", () => {
  if (musicPlayer.classList.contains("music-player-open")) {
    musicBottom.style.cursor = "default";
  } else {
    musicBottom.style.cursor = "context-menu";
  }
});

// 2. Click: Open Player (if not clicking a control button)
musicBottom.addEventListener("click", (e) => {
  const clickedButton = e.target.closest(".music-bottom-item");
  const isPlayerClosed = !musicPlayer.classList.contains("music-player-open");

  if (isPlayerClosed && !clickedButton) {
    musicPlayer.classList.add("music-player-open");
    musicBottom.style.cursor = "default";
  }
});

// --- PAGE SWITCHING LOGIC (Updated for View Transitions) ---

homeButton.addEventListener("click", () => {
  // CHANGE: Use 'view-active' instead of 'display-none'
  homeView.classList.add("view-active");
  libraryView.classList.remove("view-active");
});

libraryButton.addEventListener("click", () => {
  homeView.classList.remove("view-active");
  libraryView.classList.add("view-active");
});
