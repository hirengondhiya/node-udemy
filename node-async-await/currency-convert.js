const axios = require('axios');

const getExchangeRate = (from, to) => {
    return axios.get(`http://api.fixer.io/latest?base=${from}`).then((res) => {
        return res.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
    try {
        const res = axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return res.data.map((country) => country.name);
    } catch (error) {
        throw new Error(`Unable to find country for the curreny code ${ currencyCode }.`);
    }
};

const getExchangeRateAsync = async (from, to) => {
    try {
        const res = axios.get(`http://api.fixer.io/latest?base=${from}`);
        const rate = res.data.rates[to];
        if (rate) {
            return rate;
        } else {
            throw new Error('Invalide to currency');
        }
    } catch (error) {
        throw new Error(`Unable to convert from ${from} to ${to}.`);
    }
};

const getCountriesAsync = async (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((res) => {
        return res.data.map((country) => country.name);
    });
};

const convertCurrency = (from, to, amount) => {
    // 25 usd is worth 28 cad. cad can be used in the following countries 
    let countries;
    return getCountries(to).then((tempCountries) => {
        countries = tempCountries;
        return getExchangeRate(from, to);
    }).then((rate) => {
        const exchangedAmount = amount * rate;
        return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following contries: ${countries.join("\n")}`;
    });
};

// convertCurrency('USD', 'INR', 100).then((status) => {
//     console.log(status);
// }).catch((error) => {
//     console.log(error);
// });

const convertCurrencyAsync = async (from, to, amount) => {
    const countries = await getCountriesAsync(to);
    const exchangeRate = await getExchangeRateAsync(from, to);
    // Below calls with await from function which returns simple promise are also valid calls
    // const countries = await getCountries(to);
    // const exchangeRate = await getExchangeRate(from, to);

    // const countriesRes = await axios.get(`https://restcountries.eu/rest/v2/currency/${to}`);
    // const countries = countriesRes.data.map((country) => country.name);
    // const exchangeRateRes = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    // const exchangeRate = exchangeRateRes.data.rates[to];
    const exchangedAmount = amount * exchangeRate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}.\n${to} can be used in the following contries:\n${countries.join("\n")}`;
};

convertCurrencyAsync('USD', 'INR', 100).then((status) => {
    console.log(status);
}).catch((error) => {
    console.log(error);
});