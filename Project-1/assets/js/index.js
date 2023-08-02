let navbar = document.querySelector(`.navbar1`);
let button = document.querySelector(`.js-btn1`);
let expanded = false;
let logo = document.querySelector(`.logo-size1`);
let menuList = document.querySelector(`.menuList1`);
let anchors = document.querySelectorAll(`.clrchange`);
let bgcSection = document.querySelector(".bgcSection");
let fltrSection = document.querySelector(".fltrSection");
let cardSection = document.querySelector(".cardSection");
button.addEventListener("click", toggle);

function toggle() {
  if (expanded) {
    navbar.style.height = "10vh";
    logo.style.display = "";
    bgcSection.style.display = "";
    fltrSection.style.display = "";
    cardSection.style.display = "";
    navbar.style.backgroundColor = "#fcd232";
    expanded = false;
    button.classList.remove("expanded");
    menuList.classList.remove("expanded2");
    let darkLinks = document.querySelectorAll(".clrchange");
    for (let link of darkLinks) {
      link.classList.remove("text-light");
      link.classList.add("text-dark");
    }
  } else {
    navbar.style.backgroundColor = "#302f38";
    navbar.style.height = "100vh";
    button.classList.toggle("expanded");
    menuList.classList.toggle("expanded2");
    bgcSection.style.display = "none";
    fltrSection.style.display = "none";
    cardSection.style.display = "none";
    logo.style.display = "none";
    expanded = true;
    let darkLinks = document.querySelectorAll(".clrchange");
    for (let link of darkLinks) {
      link.classList.remove("text-dark");
      link.classList.add("text-light");
    }
  }
}

// cardSection
let programmingFilter = document.querySelector(`#programmingCards`);
let programmingCards = document.querySelectorAll(`.programmingCards`);
let marketingFilter = document.querySelector(`#marketingCards`);
let marketingCards = document.querySelectorAll(`.marketingCards`);
let designFilter = document.querySelector(`#designCards`);
let designCards = document.querySelectorAll(`.designCards`);
let cards = document.querySelectorAll(`.cards`);
programmingFilter.addEventListener("change", coding);
marketingFilter.addEventListener("change", marketing);
designFilter.addEventListener("change", design);
let filterBgc = document.querySelectorAll(".filterBgc");
let fntawsm = document.querySelectorAll(".fntawsm");
let clrdark = document.querySelector(".clrdark");
console.log(clrdark);
for (i = 0; i < fntawsm.length; i++) {
  fntawsm[i].style.display = "none";
}
function coding() {
  if (programmingFilter.checked) {
    for (i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
    }
    for (i = 0; i < programmingCards.length; i++) {
      programmingCards[i].style.display = "flex";
    }
    filterBgc[0].style.backgroundColor = "rgb(255, 17, 0)";
    filterBgc[1].style.backgroundColor = "rgb(48, 47, 56)";
    filterBgc[2].style.backgroundColor = "rgb(48, 47, 56)";
    fntawsm[0].style.display = "flex";
    fntawsm[1].style.display = "none";
    fntawsm[2].style.display = "none";
    showMoreBtn.style.display = "none";
    marketingFilter.checked = false;
    designFilter.checked = false;
  } else {
    for (i = 0; i < cards.length; i++) {
      cards[i].style.display = "flex";
    }
    filterBgc[0].style.backgroundColor = "rgb(48, 47, 56)";
    fntawsm[0].style.display = "none";
  }
}

function marketing() {
  if (marketingFilter.checked) {
    for (i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
    }
    for (i = 0; i < marketingCards.length; i++) {
      marketingCards[i].style.display = "flex";
    }
    filterBgc[1].style.backgroundColor = "rgb(255, 17, 0)";
    filterBgc[0].style.backgroundColor = "rgb(48, 47, 56)";
    filterBgc[2].style.backgroundColor = "rgb(48, 47, 56)";
    fntawsm[1].style.display = "flex";
    fntawsm[0].style.display = "none";
    fntawsm[2].style.display = "none";
    showMoreBtn.style.display = "none";
    programmingFilter.checked = false;
    designFilter.checked = false;
  } else {
    for (i = 0; i < cards.length; i++) {
      cards[i].style.display = "flex";
    }
    filterBgc[1].style.backgroundColor = "rgb(48, 47, 56)";
    fntawsm[1].style.display = "none";
  }
}

function design() {
  if (designFilter.checked) {
    for (i = 0; i < cards.length; i++) {
      cards[i].style.display = "none";
    }
    for (i = 0; i < designCards.length; i++) {
      designCards[i].style.display = "flex";
    }
    filterBgc[2].style.backgroundColor = "rgb(255, 17, 0)";
    filterBgc[0].style.backgroundColor = "rgb(48, 47, 56)";
    filterBgc[1].style.backgroundColor = "rgb(48, 47, 56)";
    fntawsm[2].style.display = "flex";
    fntawsm[0].style.display = "none";
    fntawsm[1].style.display = "none";
    showMoreBtn.style.display = "none";
    programmingFilter.checked = false;
    marketingFilter.checked = false;
  } else {
    for (i = 0; i < cards.length; i++) {
      cards[i].style.display = "flex";
    }
    filterBgc[2].style.backgroundColor = "rgb(48, 47, 56)";
    fntawsm[2].style.display = "none";
  }
}
let showMoreBtn = document.querySelector("#showMore");
let curretCards = 6;

if (cards && cards.length) {
  showMoreBtn.onclick = () => {
    for (let i = curretCards; i < curretCards + 6; i++) {
      if (cards[i]) cards[i].style.display = "block";
    }
    curretCards += 6;
    if (curretCards >= cards.length) {
      showMoreBtn.style.display = "none";
    }
  };
}
