const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({
    path: `${__dirname}/.env.${ENV}`,
});
const  mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

async function connect(){
    mongoose.connect(mongoURI, {
    })
    .then(() => {
        // console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); 
    });
}

module.exports = connect