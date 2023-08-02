import { items } from "../../Data/data.js";
import { itemTypes } from "../../Data/data.js";
import { updateItems } from "../localStorage.js";

export function initaddNewItemPage() {
  document.querySelector("#currentArtist").innerHTML =
    sessionStorage.getItem("artist");


  
  const addNewItem = document.getElementById("addNewItem");
  const cancelBtn = document.querySelector("#cancel");
  const addTypeOption = document.querySelector("#addType");
  const takeSnapShot = document.querySelector(".take-snapshot");
  console.log(itemTypes);
  itemTypes.forEach((el) => {
    addTypeOption.innerHTML += ` <option value="${el}">${el}</option>`;
  });

  cancelBtn.addEventListener("click", () => {
    location.hash = "#artistItemPage";
    document.querySelector("#additemTitle").value = "";
    document.querySelector("#addDescription").value = "";
    document.querySelector("#addPrice").value = "";
    document.querySelector("#addType").innerHTML = `<option value=""></option>`;
    document.querySelector("#capturedImage").style.display = "none";
    takeSnapShot.style.display = "block";
  });

  addNewItem.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemIsPublished = e.target.itemIsPublished.checked;
    const additemTitle = e.target.additemTitle.value;
    const addDescription = document.getElementById("addDescription").value;
    const addType = e.target.addType.value;
    // const imgCaptureUrl = document.querySelector(".capturedImage").src;
    const addPrice = e.target.addPrice.value;
    const addImg =
      capturedImage.src !== null ? capturedImage.src : e.target.addImg.value;

    let addingItem = new Item(
      additemTitle,
      addDescription,
      addType,
      addImg,
      addPrice,
      itemIsPublished
    );

    items.push(addingItem);

    updateItems();
    const imageCapture = document.querySelector(".img-capture");
    imageCapture.style.display = "none";
    takeSnapShot.style.display = "block";
    console.log(addingItem);
    location.hash = "#artistItemPage";
    e.target.reset();
  });

  const caputreImageDiv = document.querySelector(".img-inner");

  takeSnapShot.addEventListener("click", () => {
    addNewItem.style.display = "none";
    caputreImageDiv.style.display = "grid";
  });
}

class Item {
  constructor(_title, _description, _type, _image, _price, _isPublished) {
    this.id = getLastId() + 1;
    this.title = _title;
    this.description = _description;
    this.type = _type;
    this.image = _image;
    this.price = _price;
    this.artist = sessionStorage.getItem("artist");
    this.dateCreated = new Date();
    this.isPublished = _isPublished;
    this.isAuctioning = false;
    this.dateSold = undefined;
    this.priceSold = undefined;
  }
}

const getLastId = () => {
  let lastId = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id > lastId) {
      lastId = items[i].id;
    }
  }
  return lastId;
};
