const mongoose = require("mongoose");
const Person = require("./person.model");

const teacherSchema = new mongoose.Schema({
  
});

const Teacher = Person.discriminator("Teacher", teacherSchema);

module.exports = Teacher;
