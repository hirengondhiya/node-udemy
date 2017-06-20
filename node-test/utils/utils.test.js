const expect = require('expect');
const utils = require('./utils.js');

describe('utils', () => {

    it('should add two numbers', () => {
        res = utils.add(33, 11);

        expect(res).toBe(44).toBeA('number');
    });

    it('should square a number', () => {
        res = utils.square(11);

        expect(res).toBe(121).toBeA('number');
    });

    it('should asynchronously add two numbers', (done) => {

        utils.asyncAdd(33, 11, (res) => {
                expect(res).toBe(44).toBeA('number');
                done();
        });
    });

    it('should asynchronously square a number', (done) => {
        utils.asyncSquare(11, (res) => {
            expect(res).toBe(121).toBeA('number');
            done();
        });
    });

    it('should set firstName and lastName', () => {
        res = utils.setUserName({ }, 'Hiren Gondhiya');

        expect(res).toInclude({lastName: 'Gondhiya', firstName: 'Hiren'}).toBeA('object');
    });    
});
