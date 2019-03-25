const request = require('request');

var getCountry = (country, callback) => {
    request({
        url: 'https://restcountries.eu/rest/v2/name/' + encodeURIComponent(country),
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to rest-countries API');
        }
        else if (body.status === 'ZERO_RESULTS') {
            callback('Cannot find requested country');
        }
        else if (body.status !== 'ZERO_RESULTS') {
            callback(undefined, {
                country: country,
                city: body[0].capital
            })
        }
    });
};

var getWeather = (country, capitalCity, callback) => {
    request({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(capitalCity) + '&APPID=80cdf1508b99c6931c80485a690b7b3d&units=imperial',
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to OpenWeather API');
        }
        else if (body.cod === '404') {
            callback('Cannot find requested city');
        }
        else if (body.status !== '404') {
            console.log('Capital city is ' + capitalCity);
            console.log(`The weather in ${capitalCity}, capital of ${country} is ${body.main.temp} degress Fahrenheit with wind speed of ${body.wind.speed}`);
        }
    });
};


module.exports = {
    getCountry,
    getWeather
};
