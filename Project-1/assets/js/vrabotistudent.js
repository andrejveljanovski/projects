let navbar = document.querySelector(`.navbar`);
let inputForm = document.querySelector(`.frm-h`);
let footer = document.querySelector(`.footer`);
let button = document.querySelector(`.js-btn`);
let expanded = false;
let logo = document.querySelector(`.logo-size`);
let menuList = document.querySelector(`.menuList`);
let anchors = document.querySelectorAll(`.clrchange`);

button.addEventListener("click", toggle);

function toggle() {
  if (expanded) {
    navbar.style.height = "10vh";
    inputForm.style.display = "";
    footer.style.display = "";
    logo.style.display = "";
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
    inputForm.style.display = "none";
    footer.style.display = "none";
    logo.style.display = "none";
    expanded = true;
    let darkLinks = document.querySelectorAll(".clrchange");
    for (let link of darkLinks) {
      link.classList.remove("text-dark");
      link.classList.add("text-light");
    }
  }
}

//
document
  .querySelector("button[type='submit']")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let nameAndSurename = document.querySelector("#nameAndSurename").value;
    let companyName = document.querySelector("#companyName").value;
    let contactEmail = document.querySelector("#contactEmail").value;
    let phoneNumber = document.querySelector("#phoneNumber").value;
    let inputState = document.querySelector("#inputState").value;
    if (!nameAndSurename) {
      alert("Ве молиме внесете име и презиме");
    } else if (!companyName) {
      alert("Ве молиме внесете име на компанијата");
    } else if (!contactEmail) {
      alert("Ве молиме внесете ја вашата емаил адреса");
    } else if (!contactEmail.includes("@") || !contactEmail.includes(".")) {
      alert("Ве молиме внесете точна емаил адреса");
    } else if (!phoneNumber) {
      alert("Ве молиме внесете телефонски број");
    } else if (isNaN(phoneNumber) || phoneNumber.length < 9) {
      alert("Ве молиме внесете точен телефонски број");
    } else if (inputState === "Изберете тип на студент") {
      alert("Ве молиме изберете тип на студент");
    } else {
      alert(
        "Вашата апликација е успешно процесирана, ќе бидете исконтактирани"
      );
      document.querySelector("#nameAndSurename").value = "";
      document.querySelector("#companyName").value = "";
      document.querySelector("#contactEmail").value = "";
      document.querySelector("#phoneNumber").value = "";
      document.querySelector("#inputState").value = "";
    }
  });
