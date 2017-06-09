console.log('Starting app.');

const fs = require('fs');
const os = require('os');
var user = os.userInfo();
console.log(user.username);

fs.appendFile('greetings.txt', `Hello ${user.username}!` , handleError);



function handleError(error) {
    if (error) {
        console.log('Error occurred in app.js')
        console.log(error);
    }
}