import mongoose from "mongoose";
const typingProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 25 },
  email: { type: String, required: true, unique: true },
});
const TypingInfo = mongoose.model("TypingInfo", typingProfileSchema);
export default TypingInfo;
