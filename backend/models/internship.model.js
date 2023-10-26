const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    type: String,
    in_pairs: Boolean,
    proposed_task: String,
    start_date: Date,
    finish_date: Date,
    enterprise: {type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise' , required: true}
})

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;