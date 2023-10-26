// Load env variables
if (process.env.NODE_ENV != 'production') {
require("dotenv").config();
}

MONGODB_URL = process.env.DB_URL

const mongoose = require("mongoose");

async function connectToDb(){
    try{
        const client = await mongoose.connect(MONGODB_URL);
        console.log('Connected to database '+ client.connection.host);
    } catch(err){
        console.log('Error connecting to database', err);
    }
}

module.exports = connectToDb;