const apiKey = "";

const detailDivEl = document.getElementById("detailDiv");
const formEl = document.getElementById("form");
const searchEl = document.getElementById("searchByCity");

async function searchWeatherByLocation(city) {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const resData = await resp.json();
  console.log(resData);
  if (resData) {
    addToPage(resData);
  } else {
    console.log("not found city");
  }
}
let city = "";
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  city = searchEl.value;

  if (city) {
    searchWeatherByLocation(city);
  } else {
    console.log("incorrect city name");
  }
});

function addToPage(data) {
  const tempInC = Math.floor(data.main.temp - 273.15);

  detailDivEl.innerHTML = `
  <div class="titleNTime">
  <h4>CURRENT WEATHER</h4>
  <h5>TIME</h5>
</div>
<div class="tempNDes">
  <img src="https://openweathermap.org/img/wn/${
    data.weather[0].icon
  }@2x.png" alt="weather foto" />
  <h4>Weather Description: <br> ${data.weather[0].description}</h4>
  <h3>Temperature ${ConvertToC(data.main.temp)} C</h3>
  
  <h4>Feel like Temperature ${ConvertToC(data.main.feels_like)} C</h4>
</div>
<div class="otherDetail">
  <ul class="detailList">
    <li>wind  ${data.wind.speed}</li>
    <li>humidity <i class="fas fa-humidity"></i> ${data.main.humidity}</li>
    <li>visibility ${data.visibility}</li>
    <li>pressure ${data.main.pressure}</li>
    <li>DEW point ${data.main.humidity}</li>
  </ul>
</div>



    
    `;
}

function ConvertToC(temp) {
  const c = Math.floor(temp - 273.15);
  return c;
}
