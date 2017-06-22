var db = './db/';
var models = './models/';

module.exports = {
    // db,
    filePath: {
        mongooseDb: db + 'mongoose.js',
        todoModel: models + 'todo.model.js',
        userModel: models + 'user.model.js',
    },
    routes: {
        todos: '/todos',
        users: '/users'
    },
    // models,
}
