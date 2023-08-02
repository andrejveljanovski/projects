import { items } from "../../Data/data.js";
import { itemTypes } from "../../Data/data.js";
import { updateItems } from "../localStorage.js";

export function initVisitorListingPage() {
  updateItems();
  const publishedItems = items.filter((el) => el.isPublished);
  console.log(publishedItems);

  const visitorListingContainer = document.querySelector(".listing-container");
  visitorListingContainer.innerHTML = "";
  publishedItems.forEach(({ image, artist, title, description, price }) => {
    visitorListingContainer.innerHTML += ` <div class="card">
    <div class="card-img">
    <img src="${image}" alt="${title}" /></div>
    <div class="card-context">
      <div class="context-heading">
        <p>${artist}</p>
        <span class="fs-med">$${[price]}</span>
      </div>
      <p>${title}</p>
      <p class="fs-med">
        ${description}
      </p>
    </div>
  </div>`;
  });
  const filterBtn = document.querySelector(".filterListing");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((data) => data.json())
    .then((data) => {
      const filterArtistOption = document.querySelector("#filterArtist");
      filterArtistOption.innerHTML = "";
      filterArtistOption.innerHTML = `<option></option>`;
      data.forEach((el) => {
        filterArtistOption.innerHTML += ` <option value="${el.name}">${el.name}</option>`;
      });
    });

  const typeOfArt = document.querySelector("#typeOfArt");
  itemTypes.forEach((el) => {
    // typeOfArt.innerHTML = ` <option></option>`;

    typeOfArt.innerHTML += ` <option value="${el}">${el}</option>`;
  });

  let listingContainer = document.querySelector(".listing-container");

  filterBtn.addEventListener("click", () => {
    filterForm.style.display = "flex";
    listingContainer.style.display = "none";
    filterBtn.style.display = "none";
    document.querySelector("#submitFilter").style.display = "block";
    filterForm.style.display = "block";
  });

  const discardFilter = document.querySelector("#filter-discard");

  discardFilter.addEventListener("click", () => {
    filterForm.style.display = "none";
    visitorListingContainer.style.display = "block";
    filterBtn.style.display = "block";
  });

  const filterForm = document.querySelector("#filterForm");
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const artist = e.target.artist.value;
    const minPrice = e.target.minPrice.value;
    const maxPrice = e.target.maxPrice.value;
    const type = e.target.type.value;

    console.log(title);
    console.log(artist);

    console.log(minPrice);
    typeof maxPrice;
    console.log(type);

    console.log(publishedItems);
    const filtered = publishedItems.filter(
      (item) =>
        (title ? item.title.includes(title) : true) &&
        (artist ? item.artist === artist : true) &&
        (minPrice ? item.price >= minPrice : true) &&
        (maxPrice ? item.price <= maxPrice : true) &&
        (type ? item.type === type : true)
    );

    console.log(filtered);
    listingContainer.style.display = "block";

    listingContainer.innerHTML = "";
    filtered.forEach(({ image, artist, title, description, price }) => {
      listingContainer.innerHTML += ` <div class="card">
      <div class="card-img">
      <img src="${image}" alt="${title}" /></div>
      <div class="card-context">
        <div class="context-heading">
          <p>${artist}</p>
          <span class="fs-med">$${[price]}</span>
        </div>
        <p>${title}</p>
        <p class="fs-med">
          ${description}
        </p>
      </div>
    </div>`;
    });

    e.target.reset();
    document.querySelector("#submitFilter").style.display = "none";
    filterBtn.style.display = "block";
    filterForm.style.display = "none";
  });
}
