import { items } from "../../Data/data.js";
export const currentArtist = document.querySelector("#currentArtist");

let myChart;

export function initArtistHomePage() {
  const itemsByArtist = items.filter(
    (el) => el.artist === sessionStorage.getItem("artist")
  );

  currentArtist.innerHTML = sessionStorage.getItem("artist");

  const soldItems = itemsByArtist.filter((el) => Boolean(el.dateSold));

  const soldItemsSpan = document.getElementById("soldItems");
  soldItemsSpan.innerHTML = soldItems.length + "/" + itemsByArtist.length;

  const sum = soldItems.reduce((acc, item) => acc + item.priceSold, 0);

  const totalIncome = document.getElementById("totalIncome");
  totalIncome.innerHTML = `$${sum}`;

  const ctx = document.getElementById("myChart");

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: generateLabels(7),
      datasets: [
        {
          backgroundColor: "#a16a5e",
          barThickness: 10,
          label: "amount",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      },
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  const last7 = document.querySelector("#last7");
  const last14 = document.querySelector("#last14");
  const last30 = document.querySelector("#last30");
  const lastYear = document.querySelector("#lastYear");

  last7.addEventListener("click", function () {
    const labels = generateLabels(7);

    myChart.data.labels = labels;

    const newDate = labels.map((label) => {
      let sum = 0;

      soldItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum = sum + item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = newDate;

    myChart.update();
  });

  last14.addEventListener("click", function () {
    const labels = generateLabels(14);

    myChart.data.labels = labels;

    const newDate = labels.map((label) => {
      let sum = 0;

      soldItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum = sum + item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = newDate;

    myChart.update();
  });

  last30.addEventListener("click", function () {
    const labels = generateLabels(30);

    myChart.data.labels = labels;

    const newDate = labels.map((label) => {
      let sum = 0;

      soldItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum = sum + item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = newDate;

    myChart.update();
  });

  lastYear.addEventListener("click", function () {
    const labels = generateLabelsForLast12Months();

    myChart.data.labels = labels;

    const newDate = labels.map((label) => {
      let sum = 0;

      soldItems.forEach((item) => {
        if (label === formatDateToMonth(item.dateSold)) {
          sum = sum + item.priceSold;
        }
      });

      return sum;
    });

    myChart.data.datasets[0].data = newDate;

    myChart.update();
  });
}

function generateLabels(daysAgo) {
  const arr = [];

  for (let i = daysAgo - 1; i >= 0; i--) {
    const start = new Date();
    start.setDate(start.getDate() - i);
    const formattedDate = formatDate(start);
    arr.push(formattedDate);
  }

  return arr;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-gb");
}

function generateLabelsForLast12Months() {
  const arr = [];

  for (let i = 11; i >= 0; i--) {
    const start = new Date();
    start.setMonth(start.getMonth() - i);
    const formattedDate = formatDateToMonth(start);
    arr.push(formattedDate);
  }

  return arr;
}

function formatDateToMonth(date) {
  return new Date(date).toLocaleDateString("en-gb", { month: "long" });
}
