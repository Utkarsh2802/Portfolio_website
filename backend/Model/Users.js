import mongoose from "mongoose";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  salt: { type: String },
  hash: { type: String }, //we salt the password and hash it for greater security
  email: { type: String, required: true, unique: true },
  verifier: { type: String },
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex"); //encode each byte as two hexadecimal characters
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 100, 64, "sha512")
    .toString("hex");
  this.verifier = this.salt + "UtkarshAgarwal_shh"; //basically i am making a unique identifier for each cookie so that even if someone is able to read a cookie he won't be able to do anything about it
};
//setting it to 100 iterations since time is also important for me as this a just going to be a small site with a lower user count and length of 64
userSchema.methods.isValidPassword = function (password) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 100, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};
const Users = mongoose.model("Users", userSchema);
export default Users;
