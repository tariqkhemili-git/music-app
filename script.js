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

// --- SEARCH FUNCTIONS ---

const hideSearchBar = () => {
  searchBar.classList.add("search-container-display-none");
  searchContainer.classList.add("search-container-display-none");
  searchImg.classList.add("search-container-display-none");
};

const toggleSearchBar = () => {
  searchBar.classList.toggle("search-container-display-none");
  searchContainer.classList.toggle("search-container-display-none");
  searchImg.classList.toggle("search-container-display-none");
};

// Search button click
searchButton.addEventListener("click", () => {
  toggleSearchBar();
  // Focus if visible
  if (!searchBar.classList.contains("search-container-display-none")) {
    setTimeout(() => searchBar.focus(), 10);
  }
});

// Hide search on scroll or blur
window.addEventListener("scroll", () => {
  if (!searchBar.classList.contains("search-container-display-none")) {
    hideSearchBar();
  }
});

window.addEventListener("blur", () => {
  if (!searchBar.classList.contains("search-container-display-none")) {
    hideSearchBar();
  }
});

// Hide search when clicking outside
document.addEventListener("click", (event) => {
  const clickedInsideButton = searchButton.contains(event.target);
  const clickedInsideSearchBar = searchBar.contains(event.target);

  if (!clickedInsideButton && !clickedInsideSearchBar) {
    if (!searchBar.classList.contains("search-container-display-none")) {
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

// --- MUSIC BOTTOM BAR LOGIC (Merged) ---

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

// --- PAGE SWITCHING LOGIC ---

homeButton.addEventListener("click", () => {
  homeView.classList.remove("display-none");
  libraryView.classList.add("display-none");
});

libraryButton.addEventListener("click", () => {
  homeView.classList.add("display-none");
  libraryView.classList.remove("display-none");
});
