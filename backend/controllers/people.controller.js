const Person = require("../models/person.model");
const asyncHandler = require("express-async-handler");

const getPeople = asyncHandler(async (req, res) => {
  const people = await Person.find();

  res.json({ people });
});
const getPerson = asyncHandler(async (req, res, next) => {
  const personId = req.params.id;

  // Find the person by ID
  const person = await Person.findOne({ _id: personId });

  // Check if person is found
  if (!person) {
    // Person not found, return 404 Not Found
    res.status(400);
    throw new Error("Enter the correct id of the person you want to display");
    //   return res.status(404).json({ error: "Person not found" });
  }

  // Person found, send the response
  res.json({ person });
});

const createNewPerson = async (req, res) => {
  //Get the sent in data off request body
  const { CIN, name, address_mail, password, picture } = req.body;
  // Create a person with it
  const person = await Person.create({
    CIN,
    name,
    address_mail,
    password,
    picture,
  });

  //respond with the new
  res.json({ person: person });
};

const updatePerson = async (req, res) => {
  const personId = req.params.id;

  //Get the sent in data off request body
  const { CIN, name, address_mail, password, picture } = req.body;
  // Create a person with it
  const person = await Person.findByIdAndUpdate(
    personId,
    {
      CIN,
      name,
      address_mail,
      password,
      picture,
    },
    { new: 1 }
  );

  //respond with the new
  res.json({ person });
};

const deletePerson = async (req, res) => {
  const personId = req.params.id;

  // delete a person with it
  await Person.deleteOne({ _id: personId });

  //respond with success message
  res.json({ message: "person deleted successfully" });
};

module.exports = {
  getPeople,
  getPerson,
  createNewPerson,
  updatePerson,
  deletePerson,
};
