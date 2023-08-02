import { items } from "../../Data/data.js";
import { updateItems } from "../localStorage.js";

let timer;

export function initAuctionPage() {
  updateItems();

  const auctionDiv = document.querySelector(".auction-inner");
  if (sessionStorage.getItem("artist")) {
    auctionDiv.innerHTML = `<h1>Artists cannot participate in the auction</h1>`;
  } else {
    auctionDiv.innerHTML = ``;
    const auctionItemId = sessionStorage.getItem("AuctionItem");
    const auctioningItem = items.find((el) => el.id == auctionItemId);

    const biddingInput = document.querySelector("#biddingInput");
    const biddingBtn = document.querySelector("#biddingBtn");
    biddingBtn.style.display = "block";
    biddingInput.style.display = "block";

    const highestBid = document.querySelector("#highestBid");
    highestBid.textContent = `${auctioningItem.price}`;

    biddingInput.min = auctioningItem.price;
    biddingInput.value = auctioningItem.price;

    biddingInput.addEventListener("input", function () {
      biddingBtn.disabled = !(biddingInput.value > auctioningItem.price);
    });

    auctionDiv.innerHTML = "";
    document.querySelector(".auction-bidding").style.display = "block";
    document.querySelector("#timer").style.display = "block";

    if (auctioningItem.isAuctioning) {
      initTimer(120);

      document.querySelector(".auction-info-homepage").textContent =
        "There is auction going on right now!";
      auctionDiv.innerHTML += `<div class="card">
          <div class="card-img">
        <img src="${auctioningItem.image}" alt="${auctioningItem.title}" /></div>
           <div class="card-context">
          <div class="context-heading">
          <p>${auctioningItem.artist}</p>  
              </div>
                <p>${auctioningItem.title}</p>
            <p class="fs-med">
                 ${auctioningItem.description}
             </p>
          </div>
        </div>`;
    } else {
      localStorage.removeItem("auctionTimer");
      document.querySelector(".auction-info-homepage").textContent =
        "There is no auction going live currently!";
    }

    biddingBtn.addEventListener("click", function () {
      const currentBid = Number(biddingInput.value);
      const newBid = currentBid + 50;
      biddingInput.value = newBid;

      const formData = new FormData();
      formData.set("amount", newBid);

      fetch("https://projects.brainster.tech/bidding/api", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          highestBid.textContent = `${newBid}`;
          biddingHistory.innerHTML += `<li>Your Bid $${newBid}</li>`;

          if (data.isBidding) {
            highestBid.textContent = `${data.bidAmount}`;
            biddingInput.min = data.bidAmount;
            biddingInput.value = data.bidAmount;
            biddingHistory.innerHTML += `<li >Your opponent Bid $${data.bidAmount}</li>`;
          } else {
            // debugger;
            console.log("vlegva vo else statment");
            clearInterval(timer);
            localStorage.removeItem("auctionTimer");
            biddingHistory.innerHTML = ``;
            biddingHistory.innerHTML += `<li class="li-text">Your opponet gave up!</li>`;
            document.querySelector(".auction-bidding").style.display = "none";
            document.querySelector("#timer").style.display = "none";
            auctionDiv.innerHTML = `<h2>Item SOLD!</h2>`;
            sessionStorage.removeItem("AuctionItem");
            auctioningItem.isAuctioning = false;
            auctioningItem.dateSold = new Date();
            auctioningItem.priceSold = +highestBid.textContent;
            console.log(auctioningItem);
            updateItems();
          }
        });
    });
  }
}

function initTimer(initialTime) {
  const timerContent = document.querySelector("#timer");

  const biddingInput = document.querySelector("#biddingInput");
  const biddingBtn = document.querySelector("#biddingBtn");

  let time = localStorage.getItem("auctionTimer") || initialTime;

  timer = setInterval(function () {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    timerContent.textContent = formattedTime;

    time -= 1;

    localStorage.setItem("auctionTimer", time);

    if (time <= 0) {
      const auctionItemId = sessionStorage.getItem("AuctionItem");
      const auctioningItem = items.find((el) => el.id == auctionItemId);
      clearInterval(timer);
      biddingBtn.disabled = "true";
      biddingInput.disabled = "true";

      document.querySelector("#timer").style.display = "none";
      document.querySelector(
        ".auction-inner"
      ).innerHTML = `<h2>Item SOLD!</h2>`;
      localStorage.removeItem("auctionTimer");
      sessionStorage.removeItem("AuctionItem");
      auctioningItem.isAuctioning = false;
      auctioningItem.dateSold = new Date();
      auctioningItem.priceSold =
        document.querySelector("#highestBid").textContent;
      updateItems();
    }
  }, 1000);
}
