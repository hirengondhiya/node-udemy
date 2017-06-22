var config = require('../config.js');
var expect = require('expect');
var request = require('supertest');
var { ObjectID } = require('mongodb');

var { app } = require('./../' + config.filePath.app);
var { Todo } = require('./../' + config.filePath.todoModel);
var todos = [
    {_id: new ObjectID(), text: 'Some test todo 1'},
    {_id: new ObjectID(), text: 'Some test todo 2'},
];

beforeEach((done) => {
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
        // uncomment below to verify test failure.
        // text = text + '1';
        request(app)
            .get(config.routes.todos)
            .expect(200)
            .expect(res => {
                expect(res.body.todos).toExist();
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET todos/:id', () => {
    it('should get todo with given id', (done) => {
        var _id = todos[0]._id.toHexString();
        request(app)
            .get(config.routes.todosWithId.replace(':id', _id))
            .expect(200)
            .expect(res => {
                expect(res.body.todo).toExist();
                expect(res.body.todo).toInclude({text: todos[0].text})
            })
            .end(done);
    });
    it('should fail on Invaild id.', (done) => {
        var _id = 123;
        request(app)
            .get(config.routes.todosWithId.replace(':id', _id))
            .expect(404)
            .expect(res => { 
                expect(res.body.error).toBe(config.errorMessage.invalidId);
            })
            .end(done);
    });
    it('should fail on no Todo', (done) => {
        var _id = new ObjectID().toHexString();
        request(app)
            .get(config.routes.todosWithId.replace(':id', _id))
            .expect(404)
            .expect(res => {
                expect(res.body.error).toBe(config.errorMessage.todoNotFound);
            })
            .end(done);
    });
});
