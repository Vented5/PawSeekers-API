const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); //NO BORRAR, no importa lo que visual diga!!!! 
const cors = require('cors'); //Permite devolver objetos json de manera segura

router.use(cors());

const User = require('../models/user');
const Pets = require('../models/pets');

router.get('/users/:email', async (req, res) => {
    try {
      const { email } = req.params;
  
      // Buscar el robot por su código
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User no encontrado' });
      }
      res.json({ user });
  
    } catch (error) {
      console.error('Error al obtener la informacion de usuario:', error);
      res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
    }
  });
  
router.get('/pets/:name', async (req, res) => {
    try {
      const { name } = req.params;
  
      const pet = await Pets.findOne({ name });
  
      if (!pet) {
        return res.status(404).json({ error: 'Pet no encontrado' });
      }
      res.json({ pet });
    } catch (error) {
      console.error('error al obtener la informacion de la mascota', error);
      res.status(500).json({ error: 'Ocurrio un error al procesar la solicitud' });
    }
  });
  
  //Missing reports nearby
  
  router.get('/missing_nearby/:location', async (req, res) => {
    try {
      const pets = await Pets.find();
      res.json({ pets });
  
    } catch (error) {
      console.error('request error (ˉ﹃ˉ)', error);
      req.status(500).json({ error: 'request error (ˉ﹃ˉ)' })
    }
  });
  
  router.post('/api/pets/newpet', async (req, res) => {
    const newPet = new Pets();
    newPet.specie = req.body.specie;
    newPet.name = req.body.pet_name;
    newPet.color = req.body.pet_color;
    await newPet.save();
  
    res.send('Datos recibidos');
  });
  

module.exports = router;