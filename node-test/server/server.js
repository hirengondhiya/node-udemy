const express = require('express');

var port = process.env.PORT || 3000;
var app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/error', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'App version 1.0'
    });
});

app.get('/users', (req, res) => {
    res.status(200).send(
        [
            {name: 'Hiren Gondhiya', age: 34},
            {name: 'Tanmay Goswami', age: 34},
            {name: 'Vijaypuri Goswami', age: 34},
            {name: 'Jinesh Parekh', age: 34},
        ]
    );
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});

module.exports.app = app;