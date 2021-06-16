const mongoose = require('mongoose'); // Erase if already required
const User = require("./user.model");

// Declare the Schema of the Mongo model
var companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

//Export the model
module.exports = mongoose.model('Company', companySchema);