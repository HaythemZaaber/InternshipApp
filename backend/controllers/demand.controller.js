const Demand = require("../models/demand.model");

const getDemands = async (req, res) => {
  const demand = await Demand.find();

  res.json({ demand });
};

const getDemandById = async (req, res) => {
  const demandId = req.params.id;

  const demand = await Internship.findById(demandId);

  res.json({ demand });
};

const createDemand = async (req, res) => {
  //Get the sent in data off request body
  const { student, name_enterprise, address_mail} =
    req.body;
  // Create a internship with it
  const demand = await Demand.create({
   student,
   name_enterprise,
   email:address_mail
  });

  //respond with the new
  res.json({ demand });
};

const updateDemand = async (req, res) => {
  const demandId = req.params.id;

  //Get the sent in data off request body
  const { student, name_enterprise, address_mail, accepted } = req.body;
  // Create a internship with it
  const demand = await Demand.findByIdAndUpdate(
    demandId,
    {
     student, 
     name_enterprise,
     email : address_mail ,
     accepted
    },
    { new: 1 }
  );

  //respond with the new
  res.json({ demand });
};

const deleteDemand = async (req, res) => {
  const demandId = req.params.id;

  // delete a internship with it
  await Demand.deleteOne({ _id: demandId });

  //respond with success message
  res.json({ message: "internship deleted successfully" });
};

module.exports = {
  getDemandById,
  getDemands,
  createDemand,
  updateDemand,
  deleteDemand,
};
