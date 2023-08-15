//dependencias
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const port = process.env.PORT || 3000;
const engine = require('ejs-mate'); 
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); //Permite devolver objetos json de manera segura

const admin = require('firebase-admin');

var serviceAccount = require("./credentials/pawseekers-firebase-adminsdk-m62jr-09762a14ca.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://pawseekers.appspot.com'
});


//Congiguracion de exspress
const app = express();
require('./dbconnection');
require('./src/passport/local-auth');


app.set('views', path.join(process.cwd(), "src/views"));
app.engine('ejs', engine);

//Middelwares
app.use(cors());
app.use('/src',express.static(path.join(process.cwd(), 'src'))); //Sin este no jala el css
//app.use('/images', express.static(path.join(process.cwd(), 'src/images')));
//app.use('/icons', express.static(path.join(process.cwd(), 'src/icons'))); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
  secret: 'SuicideZanero', //Clave adicional de seguridad
  resave: false, 
  saveUninitialized: false
}));
app.use(flash()); //Tiene que ir de ahuevo despues de sesiones para enviar datos y antes de passport para ser usado
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => { //Mensajs de error
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.user = req.user;
  next();
});



//Routes
app.use('/', require('./src/routes/routes'));
app.use('/api', require('./src/routes/api'));




//exportar api
module.exports = app;

//vercel dev para correrlo en local

//vercel paa ejecutarlo y desplegarlo
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});