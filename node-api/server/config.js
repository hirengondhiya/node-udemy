var server = '../server/';
var db = server + 'db/';
var models = server + 'models/';

module.exports = {
    // variables
    db,
    models,
    server,
    
    // file paths
    filePath: {
        mongooseDb: db + 'mongoose.js',
        todoModel: models + 'todo.model.js',
        userModel: models + 'user.model.js',
        app: server + 'server.js'
    },

    // express routes
    routes: {
        todos: '/todos',
        users: '/users',
        params: {
            id: '/:id'
        }
    },
}
