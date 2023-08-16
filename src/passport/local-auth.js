const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


// ----------------   SIGNUP   ---------------------
passport.use('local-signup', new LocalStrategy({  //Estrategia de validdacion del modulo passport local
    usernameField: 'email', //Datos que recibe de un formulario
    passwordField: 'password',
    passReqToCallback: true //No se que hace imagino que sin esta no jala la siguiente funcion
}, async (req, email, password, done) => { 
    
    const user = await User.findOne({ email: email}); 
    if(user){
        console.log("E el email ya esta usado");
        return done(null, false, req.flash('signupMessage', 'The Email is already Taken.')) //Mensaje de error si el usuario ya existe
    } else { 
        const newUser = new User(); //Creacion de nuevo usuario
        newUser.email = email;
        newUser.password = newUser.encryptPwd(password);
        await newUser.save();
        done(null, newUser);
    }
     
}));

///--- ------      SIGNIN      --------------
passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if(!user){
        console.log("No se encontor usuario");
        return done(null, false, req.flash('signinMessage', 'User is not registered.'));
    }
    if(!user.comparePwd(password)){
        console.log("La contrase;a no coincide");
        return done(null, false, req.flash('signinMessage', 'La contraseña no coincide.'));
    }
    console.log("Ahueso, se encontro el usuario");
    done(null, user); // Si no hay error regresa el usuario
}));

passport.serializeUser((user, done) => {  //Crea un nuevo usuario)? credenciales? algo asi
    done(null, user.id);

});

passport.deserializeUser(async (id, done) => { //Si existe las encuentra y regresa el usuario
    const user = await User.findById(id);
    done(null, user);
});
