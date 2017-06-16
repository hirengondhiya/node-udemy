const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
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

geocode
    .geocodeAddress(argv.address)
    .then( (result) => {
        return weather.getWeather(result.lattitude, result.longitude)
    }).then((weatherResult) => {
        console.log(`It is currently: ${weatherResult.temperature}.`);
        console.log(`It feels like: ${weatherResult.apparentTemperature}.`);
    }).catch((errorMessage) => {
        console.log(errorMessage);
    });

// geocode.geocodeAddress(argv.address, (errorMessage, result) => {
//     if(errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(result, undefined, 2));
//         weather.getWeather(result.lattitude, result.longitude, (weatherErrorMessage, weatherResult) => {
//             if(weatherErrorMessage) {
//                 console.log(weatherErrorMessage);
//             } else {
//                 console.log(`It is currently: ${weatherResult.temperature}.`);
//                 console.log(`It feels like: ${weatherResult.apparentTemperature}.`);
//             }
//         });
//     }
// });