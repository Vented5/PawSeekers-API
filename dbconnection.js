const mongoose  = require('mongoose');

require('dotenv').config()
const url = process.env.URI_MONGO 

const connect = async () => {
    try {
        await mongoose.connect(url)
        console.log("Ahueso tenemos coneccion (☞ﾟヮﾟ)☞")
    } catch (error) {
        console.log("Valio we ");
        console.log(error);
        
    }
}

connect();

exports.connect = connect;
