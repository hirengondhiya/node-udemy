var config = require('../config.js');
var expect = require('expect');
var request = require('supertest');

var { app } = require('./../server.js');
var { Todo } = require('./../models/todo.model');

beforeEach((done) => {
    // console.log('\tDeleting existing todos from todos collection');
    Todo.remove({}).then(() => done());
});
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo';
        request(app)
            .post(config.routes.todos)
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(err => done(err));
            });
    });

    it('should not create todo with empty data', (done) => {
        request(app)
            .post(config.routes.todos)
            .send({})
            .expect(400) // expect status to be 400
            .expect(res => { // expect res.body to exist
                expect(res.body).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err); // end test with error 
                }

                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(0); // pass test if there is no todo returned
                    done();
                }).catch(err =>done(err)); // fail test if there is any error
            });
    });
});