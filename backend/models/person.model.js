const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    CIN: {
      type: Number,
      required: [true, "Please add the cinNumber"],
      unique: [true, "the CIN exists"],
    },
    name: {
      type: String,
      required: [true, "Please add the fullname"],
    },
    email: {
      type: String,
      //   required: [true, "Please add an email"],
      //   unique: [true, "The email exists"],
    },
    password: {
      type: String,
      //   required: [true, "Please add a password"],
    },
    picture: String,
birthday: String,
  },
  {
    timestamps: true, //this will create two fields createdAt and updatedAt in the schema
  }
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
