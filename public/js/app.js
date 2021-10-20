console.log('Website is loaded...');

const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const weatherLocation = document.querySelector('#weather-location');
const weatherForecast = document.querySelector('#weather-forecast');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    weatherLocation.textContent = 'Loading weather...';
    weatherForecast.textContent = '';

    fetch(`/weather?address=${weatherInput.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherLocation.textContent = data.message;
                console.log(data.error);
            } else {
                weatherLocation.textContent = data.location;
                weatherForecast.textContent = data.forecast;
                console.log(data.forecast);
            }
        });
    });
});
