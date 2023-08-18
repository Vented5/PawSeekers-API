const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors'); //Permite devolver objetos json de manera segura

const admin = require('firebase-admin');
const multer = require('multer');


const bucket = admin.storage().bucket();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Limitar el tamaño de archivo a 5 MB
  }
});

router.use(cors());


const User = require('../models/user');
const Pet = require('../models/pets');


router.get("/", (req, res) => {
  res.render('home.ejs');
});

router.get('/find', isAuthenticated, (req, res) => {
  const pet = Pet.findById("64cb0128351b6950a2818132");
  res.render('map.ejs', { apiKey: process.env.APIKEY, pet });
});

router.get('/request', isAuthenticated, (req, res) => {
  res.render('request.ejs', { apiKey: process.env.APIKEY });
});

router.post('/request', upload.single('pet_photo'), async (req, res) => {
  console.log(req.body);
  const newPet = new Pet();
  newPet.specie = req.body.specie;
  newPet.name = req.body.pet_name;
  newPet.sex = req.body.sex;
  newPet.color = req.body.pet_color;
  newPet.characteristics = req.body.pet_chara;
  newPet.accesories = req.body.pet_accesories;
  newPet.completed = false;
  newPet.personality = req.body.pet_personality;
  newPet.coordinates.lat = req.body.pet_lat;
  newPet.coordinates.lng = req.body.pet_lng;
  newPet.lastLocation = req.body.address;
  
  try{
    const file = req.file;
    if(!file){
      return res.status(400).send('No se ha proporcionado una imagen');
    }
     
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.end(file.buffer);
    
    blobStream.on('finish', async () => { //Al crear con exito la imagen aqui se puede agregar acciones
      
      const [url] = await blob.getSignedUrl({
        action: 'read',
        expires: '01-01-3000'
      });
      newPet.imgUrl = url;
      try {
        await newPet.save(); 
        res.redirect('/find');
      } catch (saveError) {
        console.error('Error al guardar en la base de datos: ', saveError);
        res.status(500).send('Error al guardar en la base de datos')
      }
      
    });
  }catch (error) {
    console.error('Error al subir imagen: ', error);
    res.status(500).send('Error al subir imagen');
  }
  
  //Guardar en la bd
  

});

router.get('/track', isAuthenticated, (req, res) => {
  res.render('track.ejs', { apiKey: process.env.APIKEY });
});

router.get('/profile', isAuthenticated, (req, res) => {
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

  router.get('/adopt', (req, res) => {
    res.render('adopt.ejs');
  });
  
  router.get('/about', (req, res) => {
    res.render('about.ejs');
  });
  
  router.post('/reg', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/reg',
    passReqToCallback: true
  }) );

  router.get('/logout', (req, res, next) => {
    req.logout(function (err){
      if(err) { return next(err); }
      res.redirect('/');
    });  
  });

  
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