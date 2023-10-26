const Defense = require("../models/defense.model");

const getDefenses = async (req, res) => {
  const defenses = await Defense.find();

  res.json({ defenses });
};

const getDefense = async (req, res) => {
  const defenseId = req.params.id;

  const defense = await Defense.findById(defenseId);

  res.json({ defense });
};

const createDefense = async (req, res) => {
  //Get the sent in data off request body
  const { date, hour, note, mention, comment, internship } = req.body;
  // Create a defense with it
  const defense = await Defense.create({
    date,
    hour,
    note,
    mention,
    comment,
    internship,
  });

  //respond with the new
  res.json({ defense });
};

const updateDefense = async (req, res) => {
  const defenseId = req.params.id;

  //Get the sent in data off request body
  const { date, hour, note, mention, comment, internship } = req.body;
  // Create a defense with it
  const defense = await Defense.findByIdAndUpdate(
    defenseId,
    {
      date,
      hour,
      note,
      mention,
      comment,
      internship,
    },
    { new: 1 }
  );

  //respond with the new
  res.json({ defense });
};

const deleteDefense = async (req, res) => {
  const defenseId = req.params.id;

  // delete a defense with it
  await Defense.deleteOne({ _id: defenseId });

  //respond with success message
  res.json({ message: "defense deleted successfully" });
};

module.exports = {
  getDefenses,
  getDefense,
  createDefense,
  updateDefense,
  deleteDefense,
};
