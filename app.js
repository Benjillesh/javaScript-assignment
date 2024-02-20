// dom element select
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const foodDisplayContainer = document.getElementById("foodDisplayContainer");
const modalInfo = document.getElementById("modal-info");
const topToBtn = document.getElementById("topToBtn");
const eventContainer = document.getElementById("events-container");
const eTitle = document.getElementById("e-title");
const eDescription = document.getElementById("e-description");
const eLocation = document.getElementById("e-location");
const eDate = document.getElementById("e-date");
const eCreator = document.getElementById("e-creator");
const eventSubmit = document.getElementById("submit_btn");





// event listener
window.addEventListener("load", () => {
  getData();
});
window.addEventListener("scroll", scrolling);
searchBtn.addEventListener("click", getData);
topToBtn.addEventListener("click", toToScroll);

// functionality

function getData() {
  document.getElementById("spinner").classList.remove("hidden");
  const foodName = searchInput.value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}&limit=10`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("spinner").classList.add("hidden");
      displayCards(data.meals);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayCards(data) {
  if (!data) {
    return (foodDisplayContainer.innerHTML = " <h2>No data found</h2>");
  }
  const tenData = data.slice(0, 6);

  let childHtml = "";
  for (const item of tenData) {
    const { strMealThumb, strMeal, strInstructions, idMeal } = item;

    let html = ` <div class="card w-full card-compact bg-base-100 shadow-xl">
              <figure>
                <img
                  class="w-full h-60 object-cover"
                  src=${strMealThumb}
                  alt="images"
                />
              </figure>
            <div class="card-body">
              <h2 class="card-title">${strMeal}</h2>
              <p>
                ${strInstructions.slice(0, 100)}
              </p>
              <div class="card-actions justify-end" onclick="modalFn(${idMeal})"}>
                <label for="my-modal-6" class="btn btn-warning text-white"
                  >View Details</label
                >
              </div>
            </div>
          </div> `;

    childHtml = childHtml + html;
  }

  foodDisplayContainer.innerHTML = childHtml;
}

function modalFn(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      modalInfo.innerHTML = "";
      let html = `<div class="card card-compact bg-base-100 shadow-xl">
                    <figure>
                      <img
                        class="w-full h-96 object-cover"
                        src=${data.meals[0].strMealThumb}
                        alt="images"
                      />
                    </figure>
                  <div class="card-body">
                    <h2 class="card-title">${data.meals[0].strMeal}</h2>
                    <p>
                    ${data.meals[0].strInstructions}
                    </p>
                  </div>
              </div>;`;
      modalInfo.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

function toToScroll() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function scrolling() {
  const px = window.pageYOffset;
  if (px > 200) {
    topToBtn.classList.remove("opacity-0", "invisible");
  } else {
    topToBtn.classList.add("opacity-0", "invisible");
  }
}

// Swiper Slider
var swiper = new Swiper(".bannerSwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


// events listing 

function generateEventHTML(title, description, location, date, creator) {
  return `
    <div class="w-full p-5 bg-slate-800 mt-5">
      <h3 class="text-xl font-semibold text-white">${title}</h3>
      <p class="font-light">${description}</p>
      <h4 class="flex items-center gap-2 text-lg font-semibold my-3">
        <span><i class="fa-solid fa-location-dot text-yellow-700"></i></span><span>${location}</span>
      </h4>
      <h4 class="flex items-center gap-2 text-lg font-semibold">
        <span><i class="fa-solid fa-calendar-days text-yellow-700"></i></span><span>${date}</span>
      </h4>
      <p class="flex items-center gap-2 text-lg font-semibold my-3">
        <span><i class="fa-solid fa-ticket text-yellow-700"></i></span>
        <span>${creator}</span>
      </p>
    </div>
  `;
}

eventSubmit.addEventListener("click", (e) => {
  const title = eTitle.value;
  const description = eDescription.value;
  const location = eLocation.value;
  const date = eDate.value;
  const creator = eCreator.value;

  if (!title || !description || !location || !date || !creator) {
    alert("Please fill all the fields");
    return;
  }

  const newEventHTML = generateEventHTML(title, description, location, date, creator);

  const newEventListing = document.createElement("div");
  newEventListing.innerHTML = newEventHTML;

  // Append the new event listing to the events container
  const eventsContainer = document.getElementById("events");
  if (eventsContainer.firstChild) {
    eventsContainer.insertBefore(newEventListing, eventsContainer.firstChild);
  } else {
    eventsContainer.appendChild(newEventListing);
  }

  // clear the input field
  eTitle.value = "";
  eDescription.value = "";
  eLocation.value = "";
  eDate.value = "";
  eCreator.value = "";

});
