const form = document.getElementById("form");
const searchField = document.getElementById("search");
const weather = document.querySelector(".weather");
const city = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const feelLike = document.querySelector(".feel-like-text");
const wind = document.querySelector(".wind-text");
const humidity = document.querySelector(".humidity-text");
const error = document.querySelector(".error");
form.addEventListener("submit", search);

searchField.addEventListener("input", (event) => {
  error.innerText = "";
});

async function search(event) {
  event.preventDefault();
  const search = searchField.value.toLowerCase().replace(/\s+/g, "");
  await getData(search);
}

async function getData(search = "hanoi") {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=b4f8edf865eb4936bd120322241106&q=${search}`,
  );
  const result = await response.json();
  if (!response.ok) {
    showError(result);
  } else {
    updateUI(result);
  }
}

function updateUI(data) {
  weather.innerText = data.current.condition.text;
  city.innerText = data.location.name + ", " + data.location.country;
  temperature.innerText = Math.round(data.current.temp_f);
  feelLike.innerText = Math.round(data.current.feelslike_f);
  wind.innerText = Math.round(data.current.wind_mph);
  humidity.innerText = Math.round(data.current.humidity);
}

function showError(response) {
  error.innerText = response.error.message;
}

(async () => await getData())();
