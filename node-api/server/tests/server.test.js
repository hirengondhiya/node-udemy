var config = require('../config.js');
var expect = require('expect');
var request = require('supertest');

var { app } = require('./../' + config.filePath.app);
var { Todo } = require('./../' + config.filePath.todoModel);

beforeEach((done) => {
    var todos = [
        {text: 'Some test todo 1'},
        {text: 'Some test todo 2'},
    ];
    // console.log('\tDeleting existing todos from todos collection');
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    })
    .then(() => done());
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

                Todo.find({text}).then((todos) => {
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
                    expect(todos.length).toBe(2); // pass test if only todos from beforeEach block is returned
                    done();
                }).catch(err =>done(err)); // fail test if there is any error
            });
    });
});

describe('GET /todos', () => {

    it('should return all todos', (done) => {
        // var text = 'test get todos';
        // var todo = new Todo({text})
        // todo.save();
        // uncomment below to verify test failure.
        // text = text + '1';
        request(app)
            .get(config.routes.todos)
            .expect(200)
            .expect(res => {
                expect(res.body.todos).toExist();
                expect(res.body.todos.length).toBe(2);
                // expect(res.body.todos[0]).toInclude({text});
            })
            .end(done);
    });
});
