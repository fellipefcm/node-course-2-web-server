const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + ': ' + req.method + ' ' + req.url;

  console.log(log);
  fs.appendFileSync('server.log', log + '\n')
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//  }
// );

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Stone Pagamentos S.A.',
    welcomeMessage: 'Stone Pagamentos é uma adquirente que possui atualmente 4% de market share.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Couldn´t fullfil the request',
    code: 401
  });
});

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'});
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
