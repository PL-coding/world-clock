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
        </div>`;
  }
}

let citySelector = document.querySelector("#cities");
citySelector.addEventListener("change", updateCity);
