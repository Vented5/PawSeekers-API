//dependencias
const express = require('express');
const mongoose = require('mongoose');

//Congiguracion de exspress
const app = express();
app.use(express.json());

//mongo
mongoose.connect('mongodb+srv://Zanero:H4mb0rgue50@pawseekers.c6acmzd.mongodb.net/PawSeekers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB Atlas');
}).catch((error) => {
  console.error('Error al conectar a MongoDB Atlas:', error);
});

//Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String 
 });

 const User = mongoose.model('User', userSchema);

//Api
app.get('/api/users/:email/user', async (req, res) => {
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
  

const Collar = mongoose.model('Collar', collarSchema);

app.put('/collar/:COLLARID/updatelocation/:ubication', async (req, res) => {
  const { COLLARID, ubication } = req.params;
  
    await Collar.findOneAndUpdate(    //Agruega la ultima ubicacion conocida al registro del collar
       { id: COLLARID }, 
       { $push: { locationlog: ubication }}, 
       { new: true }  
    );
    
});

//exportar api
module.exports = app;

//vercel dev para correrlo en local

//vercel paa ejecutarlo y desplegarlo