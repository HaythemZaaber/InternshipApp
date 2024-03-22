const mongoose = require("mongoose");
const Person = require("./person.model");

const studentSchema = new mongoose.Schema({
  study: String,
  group: String,
  phoneNumber: Number,
  secondPhoneNumber: Number,
  linkedIn: String,
  address: String,
});

const Student = Person.discriminator("Student", studentSchema);

module.exports = Student;
