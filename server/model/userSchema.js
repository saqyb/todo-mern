const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Todo = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  todos: [Todo],
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("Hashed");
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
    next();
  }
});
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
const User = mongoose.model("USER", userSchema);
module.exports = User;

// Dummy Document
// {
//   "name":"Saqib",
//   "email":"saqib@email.com",
//   "phone":987654321,
//   "work":"web developer",
//   "password":"Abc",
//   "cpassword":"Abc"
// }
