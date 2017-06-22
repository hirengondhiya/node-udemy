var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config.js');
var { mongoose } = require(config.filePath.mongooseDb);
var { Todo } = require(config.filePath.todoModel);
var { User } = require(config.filePath.userModel);
var app = express();
var port = process.env.PORT | 3000;

app.use(bodyParser.json());

// POST
app.post(config.routes.todos, (req, res) => {
    // console.log(req.body);
    var todo = new Todo(req.body);
    todo.save().then((doc) => {
        res.send(doc);
    }).catch(error => {
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}.`);
});

module.exports = {
    app
};

// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
// var Todo = mongoose.model('Todo',{
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// var newTodo = new Todo({
//     text: 'Cook Dinner'
// });

// newTodo.save().then((doc) => {
//     console.log(`Saved todo: ${doc}`);
// }).catch(error => {
//     console.log('Unable to save todo.')
// });


// var otherTodo = new Todo({
//     text: 'Feed the cate.',
//     completed: true,
//     completedAt: 123
// });

// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }).catch(error => {
//     console.log(`Unable to save todo. Error: ${error}.`);
// });

// var User = mongoose.model('user', {
//     email: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     }
// });

// var newUser = new User({
//     email: ' hirengondhiya@gmail.com '
// });
// newUser.save().then((doc) => { 
//     console.log(`New user created with following details: ${JSON.stringify(doc, undefined, 2)}`);
// }).catch (error => {
//     console.log(`Error: ${error}`);
// });