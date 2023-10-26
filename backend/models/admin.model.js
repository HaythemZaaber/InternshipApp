const mongoose = require("mongoose");
const Person = require('./person.model')

const adminSchema = new mongoose.Schema({
     
})

const Admin = Person.discriminator("Admin", adminSchema);

module.exports = Admin;