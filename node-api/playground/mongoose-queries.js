var { ObjectID } = require('mongodb');
var config = require('../server/config.js');

var { mongoose } = require(config.filePath.mongooseDb);
// var { Todo } = require(config.filePath.todoModel);
var { User } = require(config.filePath.userModel);


var _id = '694b066e5e3092f658e6be22';
if ( !ObjectID.isValid(_id)) {
    return console.log('Incorrect Id.');
}
// Todo.find({ _id }).then(todos => {
//     console.log(`Todos: ${todos}`);
// }).catch(handleError);

// Todo.findOne({_id}).then(todo => {
//     console.log(`Todo: ${todo}`);
// }).catch(handleError);

// Todo.findById(_id).then(todo => console.log(`Todo by id: ${todo}`)).catch(handleError);

User.findById(_id)
    .then(printResult)
    .catch(handleError);

User.find({_id})
    .then(printResult)
    .catch(handleError);

User.findOne({_id})
    .then(printResult)
    .catch(handleError);

function printResult(result) {
    if(result){
        return console.log(`Result: ${result}.`);
    }

    console.log('No data found.');
}
function handleError(error) {
    console.log(`Error: ${error}`);
}