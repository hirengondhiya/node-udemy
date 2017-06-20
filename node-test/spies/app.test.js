const expect = require('expect');
const rewire = require('rewire');
var app = rewire('./app');

describe('App', () => {
    var db = {
        saveUser: expect.createSpy()
    };
    console.log(typeof app.__set__);
    app.__set__('db', db);
    it('should call saveUser with email and password', () => {
        var email = 'hirengondhiya@gmail.com';
        var password = 'abc123';
        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });
});