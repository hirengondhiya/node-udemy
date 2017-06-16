const request = require('request');
var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);
        request({ 
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connnect to Google servers.');
                // console.log(`Error: ${error} `);
            } else if (response.body.status === "ZERO_RESULTS") {
                reject('Unable to find that address.');
            } else if (response.body.status === "OK") {
                resolve({ 
                    address: response.body.results[0].formatted_address,
                    lattitude: response.body.results[0].geometry.location.lat,
                    longitude: response.body.results[0].geometry.location.lng
                });
                // console.log(`Address: ${response.body.results[0].formatted_address} `);
                // console.log(`Lattitude: ${response.body.results[0].geometry.location.lat} `);
                // console.log(`Longitude: ${response.body.results[0].geometry.location.lng} `) ;       
            } else {
                reject(`Some error occurred.`);
                // console.log(`Error: ${error} `);
            }
        });

    });
};

module.exports = {
    geocodeAddress
};