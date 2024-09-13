const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
    path: `${__dirname}/.env.${ENV}`,
});

const {MongoClient} = require('mongodb')

const mongoURI = process.env.MONGO_URI;

if(!mongoURI) throw Error('Please add your MONGO URL to .env')

let client = new MongoClient(mongoURI,{})
let clientPromise

if(process.env.NODE_ENV !== 'production'){
    if(!global._mongoClientPromise){
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
}else{
    clientPromise = client.connect()
}

module.exports = clientPromise