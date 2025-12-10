// Nav bar items
const menuItems = document.querySelectorAll(".menu-item");
const homeButton = document.getElementById("home");
const searchButton = document.getElementById("search");
const libraryButton = document.getElementById("library");

// Search bar and search container
const searchBar = document.querySelector("#searchbar");
const searchContainer = document.querySelector(".search-container");
const searchImg = document.querySelector(".search-icon");

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

// Hide search bar on scroll
window.addEventListener("scroll", () => {
  if (!searchBar.classList.contains("search-container-display-none")) {
    hideSearchBar();
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
