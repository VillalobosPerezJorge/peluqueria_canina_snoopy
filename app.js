const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;


// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para manejar sesiones
app.use(session({
  secret: process.env.SECRET_KEY || 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));



// Rutas para las vistas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/contacto', (req, res) => {
  res.render('contact');
});

app.get('/galeria', (req, res) => {
  res.render('gallery');
});

app.get('/nosotros', (req, res) => {
  res.render('about');
});

app.get('/admin', (req, res) => {
  res.render('admin/admin');
});

app.get('/login', (req, res) => {
  res.render('login');
});


app.get('/mi_perfil', (req, res) => {
  res.render('users/user_profile');
});

app.get('/servicios', (req, res) => {
  res.render('services');
});

app.get('/registrarse', (req, res) => {
  res.render('signup');
});

app.get('/iniciar_sesion', (req, res) => {
  res.render('login');
});


app.get('/completar_registro/:token?', async (req, res) => {
    if(!req.params.token || req.params.token == '') return res.render('index');

    const token = req.params.token;

    try {
      const response = await fetch(`http://18.231.252.59/api/user/validateUserRegister/${token}`, {
        method: 'GET',
        mode: 'cors',
      });

      const response_json = await response.json();

      if(response_json.status == 'Success') {
        res.locals ={
          image_name: 'smile.webp',
          title: 'Registro exitoso',
          detail: 'Ya puedes acceder a tu cuenta de usuario'
        }
      }else{
        res.locals ={
          image_name: 'sad.webp',
          title: 'No se pudo completar el registro',
          detail: 'Lo sentimos, hubo un problema al registrar al usuario, intente nuevamente'
        }        
      }

      res.render('signup-complete');

    } catch (error) {
      console.error(error);
      res.render('index');
    }

});

app.get('/password-recovery', (req, res) => {
    res.render('password-recovery');
});

app.get('/password-change/:token?', (req, res) => {
  res.render('password-change');
});


// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// MIME para style.css
app.get('/style.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'public/style.css'));
});

app.get('/st_contacto.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'public/st_contacto.css'));
});


app.use(express.static(__dirname + 'public'));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


// POST
app.post('/registrarse', (req, res) => {
  // Después de completar el registro, redirige al usuario a la página de inicio de sesión
  res.redirect('/iniciar_sesion');
});



