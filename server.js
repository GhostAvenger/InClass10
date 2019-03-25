const express = require('express');
const country = require('./gmaps');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
});

app.use((request, response, next) => {
    var time = new Date().toString();
    response.render('maintenance.hbs', {
        title: 'Sorry!',
        year: new Date().getFullYear(),
        welcome: 'Error!'
    });
});


app.get('/', (request, response) => {
    response.send({
        name: 'Your Name',
        school: [
            'BCIT',
            'SFU',
            'UBC'
        ]
    });
});

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'Abouot page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
});

country.getCountry('Canada', (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage)
    } else {;
        country.getWeather(results.country, results.city, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage)
            } else {
                console.log(JSON.stringify(results, undefined, 2));
            }
        });
    }
});

app.listen(8080, () => {
    console.log('Server is up on the port 8080')
});

