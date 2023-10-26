const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    student : {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
    internship: {type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true}
})

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;