var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to Mongodb server.');
    }
    console.log('Successfully connected to mongo db.');

    db.collection('Todos'
    ).findOneAndUpdate({_id: new ObjectID('5949ceebcd1625246e64acde')},
        {
            $set: {
                completed: false
            }
        },
        {
            returnOriginal: false
        }
    ).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    }).catch(error => {
        console.log(`Error: ${error}`)
    });
    
    db.collection('Users'
    ).findOneAndUpdate({
        name: 'Chandni Gondhiya'
    }, {
        $set: {name: 'Hiren Gondhiya'},
        $inc: {
            age: 1
        }
    }).then(result => {
        console.log(JSON.stringify(result, undefined, 2))
    }).catch(error => {
        console.log(`Error: ${error}.`)
    });
    // db.close();
});