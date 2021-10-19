const request = require('postman-request');

const geocode = (address, callback) => {
    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWJhbHVramEiLCJhIjoiY2t1Z3o4Y2tnMDdvYjJub3p4eWM0MzV4biJ9.aZumarGzEXXjuhPFAiDr7A`;

    request(mapUrl, { json: true }, (error, response, body) => {
        if (error) {
            callback('Error: ', undefined, 'Unable to connect...');
        } else if (body.features.length === 0) {
            callback('Error: ', undefined, 'Unable to find location.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            }, 'success')
        }
    });
}

const forecast = ({ latitude, longitude }, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fb7f48e47a37608b0e435440335680ae&query=${longitude},${latitude}`;

    request(url,  { json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to reach host', undefined);
        } else if (body.error) {
            callback('Something bad happened. Please try again.', undefined)
        }
        else {
            const description = body.current.weather_descriptions[0];
            const temp = body.current.temperature;
            const feelsTemp = body.current.feelslike;

            callback(undefined, `${description}. It is ${temp} degrees. It feels like ${feelsTemp} degrees.`);
        }
    });
}

module.exports = { geocode, forecast };
