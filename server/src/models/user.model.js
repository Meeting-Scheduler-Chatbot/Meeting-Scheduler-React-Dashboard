const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const Company = require("./company.model");
const Group = require("./group.model");

const userSchema = new Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    dropDups: true,
    required: true,
  },
  password: {
    //salted and hashed using bcrypt
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  belongCompany: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
    default: "6086aaac5fe0b800647463d1",
  },
  belongGroups: {
    type: [
      {
        groupId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
        },
      },
    ],
    required: false,
  },
  googleCalendarRefreshToken: {
    type: String,
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
