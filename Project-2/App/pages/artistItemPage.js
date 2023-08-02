import { currentArtist } from "./artistHomePage.js";
import { items } from "../../Data/data.js";
import { formatDate } from "./artistHomePage.js";
import { updateItems } from "../localStorage.js";
import { itemTypes } from "../../Data/data.js";

export function initArtistItemPage() {
  updateItems();

  const itemsByArtist = items.filter(
    (el) => el.artist === sessionStorage.getItem("artist")
  );

  currentArtist.innerHTML = sessionStorage.getItem("artist");

  const itemArtistDiv = document.querySelector(".artist-items");
  itemArtistDiv.innerHTML = "";

  itemsByArtist.forEach(
    ({ image, title, dateCreated, description, price, id }) => {
      const cardDiv = document.createElement("div");

      cardDiv.setAttribute("id", id);

      cardDiv.classList.add("card");

      cardDiv.innerHTML += `<div class="card-img">
      <img src="${image}" alt="${title}" /></div>
      <div class="card-context">
        <div class="context-heading">
          <div><p>${title}</p>
                <p>${formatDate(dateCreated)}</p>
          </div>
          <span class="fs-med">$${[price]}</span>
        </div>
        <p class="fs-med">
          ${description}
        </p>
      </div>`;

      const buttonsDiv = document.createElement("div");

      cardDiv.appendChild(buttonsDiv);

      const auctionBtn = document.createElement("button");
      auctionBtn.textContent = "Sent to Auction";
      auctionBtn.classList.add("auctionBtn");

      const publishBtn = document.createElement("button");
      publishBtn.textContent = "Publish";
      publishBtn.classList.add("publishBtn");

      itemsByArtist.forEach((el) => {
        if (el.isPublished) {
          publishBtn.textContent = "Unpublish";
          publishBtn.style.backgroundColor = "#1bac6f";
          publishBtn.style.color = "#F8F8F8";
        } else {
          publishBtn.textContent = "Publish";
          publishBtn.style.backgroundColor = "#e5e5e5";
          publishBtn.style.color = "#5a5a5a";
        }
      });

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("removeBtn");

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("editBtn");

      buttonsDiv.append(auctionBtn, publishBtn, removeBtn, editBtn);
      buttonsDiv.classList.add("buttonsDivStyle");

      itemArtistDiv.append(cardDiv);

      removeBtn.addEventListener("click", (e) => {
        const cardDiv = e.target.parentElement.parentElement;
        const id = cardDiv.id;

        cardDiv.remove();

        const index = items.findIndex((item) => item.id == id);
        index !== -1 ? (items.splice(index, 1), updateItems()) : null;
      });

      editBtn.addEventListener("click", (e) => {
        editSnapShot();
        document.querySelector(".edit-items").style.display = "block";
        document.querySelector(".add-item").style.display = "none";
        document.querySelector(".artist-items").style.display = "none";
        document.querySelector("#artistItemPage").style.padding = "0";
        editCapturedImage.style.display = "none";

        document.querySelector("#edit-cancel").addEventListener("click", () => {
          document.querySelector(".edit-items").style.display = "none";
          itemArtistDiv.style.display = "block";
          document.querySelector(".add-item").style.display = "block";
        });

        const id = e.target.parentElement.parentElement.id;

        let editItem = itemsByArtist.find((item) => item.id == id);

        document.getElementById("editItemTitle").value = editItem.title;
        document.getElementById("edit-addDescription").value =
          editItem.description;
        console.log(editItem.description);
        document.getElementById("editType").value = editItem.type;

        document.getElementById("editPrice").value = editItem.price;
        document.getElementById("edit-addImg").value = editItem.image;

        const updateBtn = document.querySelector("#edit-submitBtn");

        updateBtn.addEventListener("click", () => {
          editItem.title = document.getElementById("editItemTitle").value;

          editItem.description = document.getElementById(
            "edit-addDescription"
          ).value;

          editItem.price = document.getElementById("editPrice").value;

          editItem.type = document.getElementById("editType").value;
          console.log(editItem.type);

          editItem.image =
            document.querySelector("#editCapturedImage").src ||
            document.getElementById("edit-addImg").value;

          const index = items.findIndex((item) => item.id === editItem.id);
          if (index !== -1) {
            items[index] = editItem;
          }

          document.querySelector(".edit-items").style.display = "none";
          itemArtistDiv.style.display = "block";
          document.querySelector(".add-item").style.display = "block";

          updateItems();
          location.reload();
          console.log(editItem);
        });
      });

      publishBtn.addEventListener("click", (e) => {
        const id = e.target.parentElement.parentElement.id;
        let publishItem = items.find((item) => item.id == id);
        console.log(publishItem);

        if (publishItem.isPublished) {
          publishBtn.textContent = `Publish`;
          publishBtn.style.backgroundColor = "#e5e5e5";
          publishBtn.style.color = "#5a5a5a";
        } else {
          // publishBtn.style.color = "#F8F8F8";
          publishBtn.textContent = `Unpublish`;
          publishBtn.style.backgroundColor = "#1bac6f";
          publishBtn.style.color = "#F8F8F8";
        }

        publishItem.isPublished = !publishItem.isPublished;
        updateItems();
      });

      auctionBtn.addEventListener("click", (e) => {
        const isAnyItemAuctioning = items.some((el) => el.isAuctioning);
        if (isAnyItemAuctioning) {
          alert("Another item is currently on auction");
          return;
        }

        const id = e.target.parentElement.parentElement.id;
        let auctionItem = items.find((item) => item.id == id);
        auctionItem.isAuctioning = true;
        sessionStorage.setItem("AuctionItem", id);
        console.log(auctionItem);
        alert("Item is sent to auction!");
        updateItems();
      });
    }
  );
  document.querySelector(".add-new-item").addEventListener("click", () => {
    location.hash = "#addNewItemPage";
  });
}

function editSnapShot() {
  const editliveStream = document.querySelector("#edit-liveStream");
  const editCaptureCanvas = document.querySelector("#edit-liveCapture");
  const editImageBtn = document.querySelector("#edit-captureImage");
  const editRetake = document.querySelector("#edit-retakeImage");
  const editControlBtns = document.querySelector(".edit-control-buttons");
  const editOk = document.querySelector("#edit-img-okay");
  const editSnapShotDiv = document.querySelector(".edit-take-snapshot");
  const editCapturedImageImg = document.querySelector("#editCapturedImage");
  const editItemSection = document.querySelector(".edit-items");

  editSnapShotDiv.addEventListener("click", () => {
    editItemSection.style.display = "none";
    document.querySelector(".edit-img-inner").style.display = "grid";
  });

  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        // aspectRatio: { exact: 2 },
      },
    })
    .then((stream) => {
      editliveStream.srcObject = stream;
    });

  liveStream.addEventListener("canplay", function () {
    editCaptureCanvas.width = editliveStream.width;
    editCaptureCanvas.height = editliveStream.height;
  });

  editImageBtn.addEventListener("click", function () {
    const ctx = editCaptureCanvas.getContext("2d");
    editliveStream.style.display = "none";
    editCaptureCanvas.style.display = "block";
    ctx.drawImage(editliveStream, 0, 0);
    const editImageDataUrl = editCaptureCanvas.toDataURL("image/png");
    editCapturedImageImg.src = editImageDataUrl;
    // console.log(imageDataUrl);
  });

  editOk.addEventListener("click", () => {
    editItemSection.style.display = "block";
    editSnapShotDiv.style.display = "none";
    editCapturedImage.style.display = "block";
    document.querySelector(".edit-img-inner").style.display = "none";
  });

  editRetake.addEventListener("click", () => {
    editCaptureCanvas.style.display = "none";
    editliveStream.style.display = "block";
  });
}
