const mongoose = require("mongoose");

const enterpriseSchema = new mongoose.Schema({
   name_enterprise: {type: String, required: true},
   fieldOfActivity: String,
   address: String, 
   phone: Number,
   fax: Number,
   web_site: String,
   name_supervisor: String,
   function_supervisor: String,
   service_supervisor: String,
   mail_supervisor: String,
})

const Enterprise = mongoose.model("Enterprise", enterpriseSchema);

module.exports = Enterprise;