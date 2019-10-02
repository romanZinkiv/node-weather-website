const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoicm9tYXp5YnJ1ayIsImEiOiJjazBsMDJrOG4wbDF0M2hvYjMybXF2bW1uIn0.M1N3-Cy2auvz96qwo-oWBQ&limit=1';

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to service!');
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;