const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Importar el módulo 'path'
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

// Ruta página de contacto
app.get('/contacto', (req, res) => {
  res.render('contact'); 
});

// Ruta página de galeria
app.get('/galeria', (req, res) => {
  res.render('gallery'); 
});

// Ruta página de contacto
app.get('/nosotros', (req, res) => {
  res.render('about'); 
});

//Ruta página admin
app.get('/admin', (req, res) => {
  res.render('admin/admin');
});


// MIME para style.css
app.get('/style.css', function(req, res) {
  res.set('Content-Type', 'text/css');
  res.sendFile(__dirname + '/public/style.css');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
