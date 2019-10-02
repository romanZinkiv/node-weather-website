const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// console.log(__dirname);
// console.log(__filename);

// const publicDirectoryPath = path.join(__dirname, '../views');
// Hi Adam , Thanks a lot for your help , I resolve this issue adding the below code
// app.set('views',path.join(__dirname,"../views"))

//Setup handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Roma Zinkiv'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Cat',
        name: 'Kotya'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        ask: 'Give me your battle roar',
        battleRoar: 'IDI NAHUI !!!',
        title: 'Help',
        name: 'Roma Zinkiv'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide the address'
        });
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });

    // res.send({
    //     forecast: 'It is snowing',
    //     location: req.query.address
    // });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roma Zinkiv',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Roma Zinkiv',
        errorMessage: 'Page not found.'
    });
});
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// });

//app
//app/help
//app/about