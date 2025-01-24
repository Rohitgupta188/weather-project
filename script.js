const apikey = "b30a4c0219e3e0f5ecdd58721b226342";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let temperature = document.querySelector(".temp");
let city = document.querySelector("input");
let search = document.querySelector(".submit");
let container = document.querySelector(".con");

async function getWeather() {
  try {
    const response = await fetch(`${apiurl}${city.value}&appid=${apikey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const newDiv = document.createElement("div");
    
    newDiv.className =
      "h-24 w-80 bg-blue-500 text-white flex flex-col items-center justify-center p-4 rounded-lg shadow-lg mt-4";
    newDiv.innerHTML = `
      <h3 class="text-lg font-bold">${data.name}, ${data.sys.country}</h3>
      <p class="text-xl">${Math.round(data.main.temp)}°C</p>
    `;

    container.appendChild(newDiv);


    city.value = "";
  } catch (error) {
    console.error("Error fetching weather data:", error);


    const errorDiv = document.createElement("div");
    errorDiv.className =
      "h-16 w-80 bg-red-500 text-white flex items-center justify-center rounded-lg shadow-lg mt-4";
    errorDiv.textContent = "City not found. Please try again!";
    container.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 1000);
  }
}

search.addEventListener("click", getWeather);
city.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});
