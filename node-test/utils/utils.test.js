const utils = require('./utils.js');

it('should add two numbers', () => {
    res = utils.add(33, 11);

    if(res !== 44) {
        throw new Error(`expected 44 but got ${res}.`);
    }
});

it('should square a number', () => {
    res = utils.square(11);

    if(res !== 121) {
        throw new Error(`expected 121 but got ${res}.`);
    }
});
