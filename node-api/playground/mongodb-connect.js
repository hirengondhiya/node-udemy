var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to Mongodb server.');
    }
    console.log('Successfully connected to mongo db.');

    // db.collection('Todo').insertOne(
    //     {text: 'Something to do.', completed: false}, 
    //     (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert data: ', error);
    //         }
    //         console.log('Data inserted successfully: ', JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({name: 'Hiren Gondhiya', age: 34}, (error, result) => {
        if (error) {
            return console.log('Unable to insert data.', error);
        }
        console.log('Data inserted successfully: ', JSON.stringify(result.ops, undefined, 2));
    }); 
    db.close();
});