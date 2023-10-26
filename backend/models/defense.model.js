const mongoose = require("mongoose");

const defenseSchema = new mongoose.Schema({
   date: Date,
   hour: Number,
   note: Number,
   mention: String, 
   comment: String,
   internship: {type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true}

})

const Defense = mongoose.model("Defense", defenseSchema);

module.exports = Defense;