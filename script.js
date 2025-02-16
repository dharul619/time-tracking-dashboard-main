const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");
const navItems = document.querySelectorAll(".container .header .nav span");

document.addEventListener("DOMContentLoaded", () =>
  updateSections("weekly", "Last Week")
);

document.addEventListener("DOMContentLoaded", () =>
  weekly.classList.add("active")
);

daily.addEventListener("click", function () {
  updateSections("daily", "Yesterday");
});

weekly.addEventListener("click", function () {
  updateSections("weekly", "Last Week");
});

monthly.addEventListener("click", function () {
  updateSections("monthly", "Last Month");
});

function updateSections(waktu, previous) {
  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      const hero = document.getElementById("hero");

      const when = waktu;
      const prev = previous;
      hero.innerHTML = "";

      data.forEach((item) => {
        const box = document.createElement("div");

        box.classList.add("box");
        box.innerHTML = "";

        box.innerHTML = `
        <div class ="box-main">
      <div class="box-header">
            <h3>${item.title}</h3>
            <img src="images/icon-ellipsis.svg" alt="" />
          </div>
          <div class="main-data">
          <h1>${item.timeframes[when].current}hrs</h1>
          <p>${prev} - ${item.timeframes[when].previous}hrs</p>
          </div>
          </div>`;

        hero.appendChild(box);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((el) => el.classList.remove("active"));

    item.classList.add("active");
  });
});
