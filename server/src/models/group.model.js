const mongoose = require('mongoose'); // Erase if already required
const User = require('./user.model');
const Company = require("./company.model");

//TODO: Burda User'a atıyoruz ancak co-founder case'i için stüdyoya atamak gerekiyo, templateMessage düzeltildi.
// Declare the Schema of the Mongo model
var groupSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  belongCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      },
    ],
    required: false,
  },
});

//Export the model
module.exports = mongoose.model("group", groupSchema);