// import { setCurrentArtist } from "../globals.js";

export function initLandingPage() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((data) => data.json())
    .then((data) => {
      const artistSelect = document.querySelector("#artists");
      artistSelect.innerHTML = "";
      artistSelect.innerHTML = `<option>Choose</option>`;
      data.forEach((el) => {
        artistSelect.innerHTML += ` <option value="${el.name}">${el.name}</option>`;
      });

      artistSelect.addEventListener("change", (e) => {
        sessionStorage.setItem("artist", e.target.value);
        location.hash = "#artistHomePage";
        // let artist = sessionStorage.getItem("artist");
        // setCurrentArtist(artist);
      });
    });

  sessionStorage.removeItem("artist");
}
