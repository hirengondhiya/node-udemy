const request = require('request');
const weatherApiUrl = 'https://api.darksky.net/forecast/0424dacdcb76bdddb4cc4afd4fb1451d/';

var getWeather = (lattitude, longitude) => {
    return new Promise( (resolve, reject) => {
        request({
            url: `${weatherApiUrl}${lattitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve({
                    temperature: response.body.currently.temperature,
                    apparentTemperature: response.body.currently.apparentTemperature
                });
            } else {
                reject('Unable to fetch weather.');
            }
        });
    });
};

module.exports = {
    getWeather
};