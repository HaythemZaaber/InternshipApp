const mongoose = require("mongoose");

const demandSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  name_enterprise: String,
  email: String,
  accepted: Boolean,
},
{
    timestamps :true
});

const Demand = mongoose.model("Demand", demandSchema);

module.exports = Demand;
