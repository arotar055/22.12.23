const apiKey = '855273cafc8aba763951dd5ed10dbed1';
const weatherElement = document.getElementById('weather');
const iconw = document.getElementById('img');
const city = document.getElementById('city');
const gust = document.getElementById('gust');
const speed = document.getElementById('speed');
const climate = document.getElementById('climate');
const id = document.getElementById('id');
const input_city = document.getElementById('input_city');
const button = document.getElementById('button');


window.addEventListener('DOMContentLoaded', (event) => {
    fetchWeather("Odesa");
    input_city.focus();

    button.addEventListener('click', () => {
        const cityName = input_city.value.trim();
        if (cityName !== '') {
            fetchWeather(cityName);
        } else {
            alert('Введіть назву міста!');
            input_city.focus();
        }
    });
});

function fetchWeather(INPUT_CITY) {
    const url = `api.openweathermap.org/data/2.5/forecast?q=${INPUT_CITY}&appid=${apiKey}&units=metric`;

    fetch(url).then((response) => response.json()).then((data) => {

        if (data.message == "city not found") {
            alert(`Нету такого города: ${INPUT_CITY}`);
            input_city.value = "";
            input_city.focus();
            return;
        }


        const temperature = data.main.temp;

        city.innerText = data.name + " Страна: " + `${data.sys.country}`;

        weatherElement.innerHTML = `Текущая температура: ${temperature}°C<br>`;
        iconw.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`

        gust.textContent = `Порыв ветра: ${data.wind.gust}`;
        speed.textContent = `Скорость ветра: ${data.wind.speed}`;
        climate.textContent = `Погода: ${data.weather[0].main}`;
        id.textContent = `id: ${data.id}`;
    })

        .catch((error) => {
            console.error('Произошла ошибка:', error);
        });
}