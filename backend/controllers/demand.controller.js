const Demand = require("../models/demand.model");

const getDemands = async (req, res) => {
  try {
    const demands = await Demand.find();
    res.json({ demands });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDemandById = async (req, res) => {
  const demandId = req.params.id;

  try {
    const demand = await Demand.find({ student: demandId });
    res.json({ demand });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createDemand = async (req, res) => {
  try {
    // Get the sent-in data from the request body
    const { student, name_enterprise, address_mail } = req.body;

    // Create a demand with it
    const demand = await Demand.create({
      student,
      name_enterprise,
      email: address_mail,
    });

    // Respond with the new demand
    res.json({ demand });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateDemand = async (req, res) => {
  const demandId = req.params.id;

  try {
    // Get the sent-in data from the request body
    const { student, name_enterprise, address_mail, accepted } = req.body;

    // Update the demand
    const demand = await Demand.findByIdAndUpdate(
      demandId,
      {
        student,
        name_enterprise,
        email: address_mail,
        accepted,
      },
      { new: true }
    );

    // Respond with the updated demand
    res.json({ demand });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDemand = async (req, res) => {
  const demandId = req.params.id;

  try {
    // Delete the demand
    await Demand.deleteOne({ _id: demandId });

    // Respond with success message
    res.json({ message: "Demand deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getDemandById,
  getDemands,
  createDemand,
  updateDemand,
  deleteDemand,
};
