const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors'); //Permite devolver objetos json de manera segura

router.use(cors());


const User = require('../models/user');
const Pet = require('../models/pets');


router.get("/", (req, res) => {
  res.render('home.ejs');
});

router.get('/find', (req, res) => {
  const pet = Pet.findById("64cb0128351b6950a2818132");
  console.log(pet.name);
  res.render('map.ejs', { apiKey: process.env.APIKEY, pet });
});

router.get('/request', (req, res) => {
  res.render('request.ejs', { apiKey: process.env.APIKEY });
});

router.get('/track', (req, res) => {
  res.render('track.ejs', { apiKey: process.env.APIKEY });
});

router.get('/profile', (req, res) => {
  res.render('profile.ejs', { apiKey: process.env.APIKEY });
});


router.get('/log', (req, res) => {
  res.render('login.ejs');
});

router.post('/log', passport.authenticate('local-signin', { //Describe el metodo de autenticacion en caso de recibir una solicitud post
  successRedirect: '/',
  failureRedirect: '/log',
  passReqToCallback: true  //Sin esto no jala, no mover Xd
}));


  router.get('/reg', (req, res) => {
    res.render('register.ejs');
  });
  
  router.post('/reg', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/reg',
    passReqToCallback: true
  }) );


  
  function isAuthenticated (req, res, next) {
    if(req.isAuthenticated()){
      return next();
    } 
    res.redirect('/log');
  }

module.exports = router;


/*
const Collar = mongoose.model('Collar', collarSchema);

app.put('/collar/:COLLARID/updatelocation/:ubication', async (req, res) => {
  const { COLLARID, ubication } = req.params;
  
    await Collar.findOneAndUpdate(    //Agruega la ultima ubicacion conocida al registro del collar
       { id: COLLARID }, 
       { $push: { locationlog: ubication }}, 
       { new: true }  
    );
    
});
*/