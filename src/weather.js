let currentDate = new Date();
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[currentDate.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Agust",
  "Septamber",
  "October",
  "November",
  "December",
];
let month = months[currentDate.getMonth()];
let year = currentDate.getFullYear();
let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${currentDate.getHours()}`;
}
let minute = currentDate.getMinutes();
if (minute < 10) {
  minute = `0${currentDate.getMinutes()}`;
}
let h2 = document.querySelector("h2");
h2.innerHTML = `${day},${month} ${hour}:${minute}`;
function showTemp(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let tempreature = document.querySelector("#tempreature");
  celsiusTemperature = response.data.temperature.current;
  tempreature.innerHTML = Math.round(celsiusTemperature);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  icon.setAttribute("alt", response.data.condition.description);
}
function cityName(city) {
  let apiKey = `47b8a1e3deb146o2b0d0f91ac0t39049`;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  cityName(city);
}
let search = document.querySelector("#search-form");
search.addEventListener("submit", searchCity);
function showFahrenhietTempreature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#tempreature");
  temperature.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
function showCelsiusTempreature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#tempreature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenhietLink");
fahrenheitLink.addEventListener("click", showFahrenhietTempreature);
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTempreature);
let celsiusTemperature = null;
cityName("Tehran");
