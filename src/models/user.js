//Este archivo valida los datos antes de guardarlos en la BD
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: String,
   email: String,
   password: String 
});

userSchema.methods.encryptPwd = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePwd = function (password) {
    return bcrypt.compareSync(password, this.password);
}
//Permite su utilizacion en otros archivos y especifica la colleccion donde se guarsda
module.exports = mongoose.model('users', userSchema);


