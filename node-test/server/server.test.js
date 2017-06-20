const request = require('supertest');
const expect = require('expect');

var app = require('./server.js').app;

describe('server.js', () => {
    describe('/', () => {
        it('should return hello world response', (done) => {
            request(app)
                .get('/')
                .expect(200)
                .expect('Hello World!')
                .end(done);
        });
    });

    describe('/users', () => {
        it('should include me in users route', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        name: 'Hiren Gondhiya', age: 34
                    });
                })
                .end(done);
        });
    });

    describe('/error', () => {
        it('should return error response', (done) => {
            request(app)
                .get('/error')
                .expect(404)
                .expect({
                    error: 'Page not found.',
                    name: 'App version 1.0'
                })
                .end(done);
        });

        it('should include error in error route', (done) => {
            request(app)
                .get('/error')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page not found.'
                    });
                })
                .end(done);
        });
    });
});
