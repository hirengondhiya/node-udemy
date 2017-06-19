const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (msg) => {
    return msg.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}\n`;
    console.log(log);

    fs.appendFile('log.log', log, (err) => {
        if(err){
            console.log(err);
        }
    })

    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs')
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my site'        
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port: ${port}.`);
});
