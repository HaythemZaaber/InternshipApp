const mongoose = require("mongoose");

const defenseTeacherSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  defense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Defense",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  role: String,
});

const DefenseTeacher = mongoose.model("DefenseTeacher", defenseTeacherSchema);

module.exports = DefenseTeacher;
