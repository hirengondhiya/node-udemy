var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to Mongodb server.');
    }
    console.log('Successfully connected to mongo db.');

//Insert one todo
    // db.collection('Todo').insertOne(
    //     {text: 'Something to do.', completed: false}, 
    //     (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert data: ', error);
    //         }
    //         console.log('Data inserted successfully: ', JSON.stringify(result.ops, undefined, 2));
    // });

//Insert one User
    // db.collection('Users').insertOne({name: 'Hiren Gondhiya', age: 34}, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert data.', error);
    //     }
    //     console.log('Data inserted successfully: ', JSON.stringify(result.ops, undefined, 2));
    // }); 

//find all todos with _id = 5949b54c9a8aa637f6a2b515   
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

// Find all todos which are completed.
    // db.collection('Todos')
    //     .find({completed: false})
    //     .count()
    //     .then((count) => {
    //         console.log('Todos count: ' + count);
    //     })
    //     .catch(error => {
    //         console.log(`Error: ${error}`)
    //     });

  // Find all users with name 'Hiren Gondhiya'  
    // db
    //     .collection('Users')
    //     .find({name: 'Hiren Gondhiya'})
    //     .toArray()
    //     .then(docs => {
    //         console.log('Users:');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     })
    //     .catch(error => {
    //         console.log('Error: ' + error)
    //     });

// Delete All Eat Lunch Todos
    // db
    //     .collection('Todos')
    //     .deleteMany({text: 'Eat Lunch'})
    //     .then((result) => {
    //         console.log('Deleted')
    //         console.log(JSON.stringify(result, undefined, 2))
    //     })
    //     .catch(error => {
    //         console.log('Error: ' + error)
    //     });

// // deleteOne todo - Delete only one todo
//     db
//         .collection('Todos')
//         .deleteOne({text: 'Eat Lunch'})
//         .then(result => {
//             console.log('Deleted one todo.');
//             console.log(JSON.stringify(result, undefined, 2));
//         })
//         .catch(error => {
//             console.log('Error: ' + error)
//         });
// // findOneAndDelete - to delete one todo and return the deleted result
//     db
//         .collection('Todos')
//         .findOneAndDelete({completed: false})
//         .then(result => {
//             console.log('findONeAndDelete');
//             console.log(JSON.stringify(result, undefined, 2));
//         })
//         .catch(error => {
//             console.log(`Error: ${error}.`)
//         });

    db.collection('Users')
        .deleteMany({name: 'Hiren Gondhiya'})
        .then(result => {
            console.log('deleteMany Users name: "Hiren Gondhiya"');
            console.log(JSON.stringify(result, undefined, 2));
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        });

    db.collection('Users')
        .findOneAndDelete({name: 'Chandni Gondhiya'})
        .then(result => {
            console.log('findOneAndDelete Users name: "Chandni Gondhiya"');
            console.log(JSON.stringify(result, undefined, 2));
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        });
    // db.close();
});
