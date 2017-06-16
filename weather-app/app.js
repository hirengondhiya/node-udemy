const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
                .options({
                    address: {
                        demand: true,
                        alias: 'a',
                        describe: 'Address to fetch weather for.',
                        string: true
                    }
                })
                .help()
                .alias('help', 'h')
                .argv;
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
axios
    .get(geocodeUrl)
    .then((response) => {
        if (response.data.status === "ZERO_RESULTS") {
            throw new Error('Unable to find that address.');
        }

        console.log(response.data.results[0].formatted_address);
        var lattitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;

        var weatherUrl = `https://api.darksky.net/forecast/0424dacdcb76bdddb4cc4afd4fb1451d/${lattitude},${longitude}`;
        return axios.get(weatherUrl);
    }).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;

        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
    }).catch((error) => {
        if (error.code === "ENOTFOUND") {
            console.log('Unable to connect to API servers.')
        } else {
            console.log(error.message);
        }
    });