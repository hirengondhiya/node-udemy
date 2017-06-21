var {MongoClient, ObjectID} = require('mongodb');

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

    // db.collection('Users').insertOne({name: 'Hiren Gondhiya', age: 34}, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert data.', error);
    //     }
    //     console.log('Data inserted successfully: ', JSON.stringify(result.ops, undefined, 2));
    // }); 
    // db.collection('Todos')
    //     // .find({completed: false})
    //     .find({
    //         _id: new ObjectID('5949b54c9a8aa637f6a2b515')
    //     })
    //     .toArray()
    //     .then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     })
    //     .catch(error => {
    //         console.log(`Error: ${error}`)
    //     });

    // db.collection('Todos')
    //     .find({completed: false})
    //     .count()
    //     .then((count) => {
    //         console.log('Todos count: ' + count);
    //     })
    //     .catch(error => {
    //         console.log(`Error: ${error}`)
    //     });
    
    db
        .collection('Users')
        .find({name: 'Hiren Gondhiya'})
        .toArray()
        .then(docs => {
            console.log('Users:');
            console.log(JSON.stringify(docs, undefined, 2));
        })
        .catch(error => {
            console.log('Error: ' + error)
        });
    // db.close();
    
});