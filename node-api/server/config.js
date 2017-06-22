var server = '../server/';
var db = server + 'db/';
var models = server + 'models/';

var id = '/:id';
var todos = '/todos';
var users = '/users';


module.exports = {
    // variables
    db,
    models,
    server,

    // Error Messages
    errorMessage: {
        invalidId: 'Invalid id.',
        todoNotFound: 'Todo not found.',
        userNotFound: 'User not found.',
    },
    
    // file paths
    filePath: {
        mongooseDb: db + 'mongoose.js',
        todoModel: models + 'todo.model.js',
        userModel: models + 'user.model.js',
        app: server + 'server.js'
    },

    // express routes
    routes: {
        todos,
        todosWithId: todos + id,
        users,
        usersWithId: users + id,
    },
}
