function showCurrentTime() {
  let sydneyElement = document.querySelector("#sydney");
  let sydneyDateElement = sydneyElement.querySelector(".date");
  let sydneyTimeElement = sydneyElement.querySelector(".time");
  let sydneyTime = moment().tz("Australia/Sydney");
  sydneyDateElement.innerHTML = sydneyTime.format("Do MMMM YYYY");
  sydneyTimeElement.innerHTML = sydneyTime.format(
    "h:mm:ss [<small>] A [</small>]"
  );

  let tokyoElement = document.querySelector("#tokyo");
  let tokyoDateElement = tokyoElement.querySelector(".date");
  let tokyoTimeElement = tokyoElement.querySelector(".time");
  let tokyoTime = moment().tz("Asia/Tokyo");
  tokyoDateElement.innerHTML = tokyoTime.format("Do MMMM YYYY");
  tokyoTimeElement.innerHTML = tokyoTime.format(
    "h:mm:ss [<small>] A [</small>]"
  );

  let vancouverElement = document.querySelector("#vancouver");
  let vancouverDateElement = vancouverElement.querySelector(".date");
  let vancouverTimeElement = vancouverElement.querySelector(".time");
  let vancouverTime = moment().tz("America/Vancouver");
  vancouverDateElement.innerHTML = vancouverTime.format("Do MMMM YYYY");
  vancouverTimeElement.innerHTML = vancouverTime.format(
    "h:mm:ss [<small>] A [</small>]"
  );
}

showCurrentTime();
setInterval(showCurrentTime, 1000);

function updateCity(event) {
  let cityName = event.target.value.replace("_", " ").split("/")[1];
  searchCity(cityName);
  updateTime();
  setInterval(updateTime, 1000);

  function updateTime() {
    let timeZoneElement = event.target.value;
    if (timeZoneElement === "current") {
      timeZoneElement = moment.tz.guess();
    }

    let cityName = timeZoneElement.replace("_", " ").split("/")[1];
    let timeElement = moment().tz(timeZoneElement);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = `
  <div class="city">
          <div>
            <h2>${cityName}</h2>
            <div class="date"> ${timeElement.format("Do MMMM YYYY")} </div>
          </div>
          <div class="time">${timeElement.format(
            "h:mm:ss"
          )} <small> ${timeElement.format(" A")} </small>
   </div>
        </div>
        
        `;
  }
}

function searchCity(city) {
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(`${apiUrl}${city}&appid=${apiKey}&units=metric`)
    .then(currentTemperature);
}

function currentTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");

  let celciusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `
     <div class="temperature">
     <div class="conditions">
              <p>Currently</p>
              <h3>${Math.round(celciusTemperature)}°C</h3>
              <p id="tempDescription"> ${
                response.data.weather[0].description
              }</p>
             </div>
  <div class="conditions">
          <p>Humidity</p>
              <h3>${response.data.main.humidity}%</h3>
      </div>
      <div class="conditions">
          <p>Wind Speed</p>
              <h3>${Math.round(response.data.wind.speed)} km/h </h3>
            </div>
            <div class="conditions">
          <p>UV Index</p>
              <h3 id="uv"></h3>
              <p id="uvscale"></p>
            </div>
            </div>
         <a href="/">All cities</a>
        

    `;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "9eca7aac0b071aa16e3cb063adba0785";
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    )
    .then(displayForecast);
}

function displayForecast(response) {
  let uv = Math.round(response.data.current.uvi);
  let uvscale = document.querySelector("#uvscale");
  document.querySelector("#uv").innerHTML = uv;
  if (uv <= 2) {
    uvscale.innerHTML = `Low`;
    uvscale.style.color = "#2ab231";
  } else if (uv < 5.1) {
    uvscale.innerHTML = `Moderate`;
    uvscale.style.color = "#efe940";
  } else if (uv < 7.1) {
    uvscale.innerHTML = `High`;
    uvscale.style.color = "#f49e1d";
  } else if (uv < 10.1) {
    uvscale.innerHTML = `Very High`;
    uvscale.style.color = "#f22c0e";
  } else {
    uvscale.innerHTML = `Extreme`;
    uvscale.style.color = "#ea0e0e";
  }
}

let citySelector = document.querySelector("#cities");
citySelector.addEventListener("change", updateCity);
