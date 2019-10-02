const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3a0999e3de62bb3843e561a083df0ab7/' + latitude + ',' + longitude + '?units=si&lang=uk';
    //https://api.darksky.net/forecast/3a0999e3de62bb3843e561a083df0ab7/37.8267,-122.4233?units=si&lang=uk
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, `${body.daily.data[0].summary} Поточна температура: ${body.currently.temperature}℃. Існує ${body.currently.precipProbability}% шанс на дощ.`);
        }
    });
};

module.exports = forecast;