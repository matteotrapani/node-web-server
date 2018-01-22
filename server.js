const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err)
      console.log('Unable to append to server.log');
  });
  console.log(log);
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

var getPageData = (pageTitle) => {
  return {
      pageTitle
    };
}

app.get('/', (req, res) => {
  var data = getPageData('Homepage');
  data.welcomeMessage = 'Welcome to my server';
  res.render('home.hbs', data);
});

app.get('/about', (req, res) => {
  res.render('about.hbs', getPageData('About page'));
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fullfil the request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
