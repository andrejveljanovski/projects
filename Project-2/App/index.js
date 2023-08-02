import { initLandingPage } from "./pages/landingPage.js";
import { initVisitorHomePage } from "./pages/visitorHomePage.js";
import { initArtistHomePage } from "./pages/artistHomePage.js";
import { initVisitorListingPage } from "./pages/visitorListingPage.js";
import { initArtistItemPage } from "./pages/artistItemPage.js";
import { initaddNewItemPage } from "./pages/addNewItemPage.js";
import { initCaptureImage } from "./pages/captureImage.js";
import { initAuctionPage } from "./pages/auction.js";

const handleRoute = () => {
  const hash = location.hash === "" ? "#landingPage" : location.hash;

  const allPages = document.querySelectorAll(".page");

  allPages.forEach((el) => (el.style.display = "none"));

  document.querySelector(hash).style.display = "block";

  const landingPageNav = document.querySelector(".nav-landingPage");

  const navbar = document.querySelector(".first-nav");

  switch (hash) {
    case "#landingPage":
      navbar.style.display = "none";
      initLandingPage();
      break;
    case "#visitorHomePage":
      navbar.style.display = "none";
      initVisitorHomePage();
      break;
    case "#visitorListing":
      navbar.style.display = "none";
      initVisitorListingPage();
      break;
    case "#artistHomePage":
      navbar.style.display = "flex";
      initArtistHomePage();
      break;
    case "#artistItemPage":
      navbar.style.display = "flex";
      initArtistItemPage();
      break;
    case "#addNewItemPage":
      navbar.style.display = "flex";
      initaddNewItemPage();
      initCaptureImage();
      break;
    case "#auction":
      navbar.style.display = "none";
      initAuctionPage();
      break;
    default:
      break;
  }
};

window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);

document.querySelector(".dropbtn").addEventListener("click", () => {
  document.querySelector("#dropdown-menu").classList.toggle("show");
});

const navItems = document.querySelectorAll(".nav-items");
navItems.forEach((el) =>
  el.addEventListener("click", () => {
    document.querySelector("#dropdown-menu").classList.remove("show");
  })
);
