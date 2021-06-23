import mongoose from "mongoose";
const typingProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  tests_taken: { type: Number, default: 0 },
  avg_speed: { type: Number, default: 0 },
  avg_error: { type: Number, default: 0 },
  speed_history: [{ type: Number }],
  error_history: [{ type: Number }],
  improvement_speed: { type: Number }, //baiscally the current typing score average-first typing test score/ total games
});
const TypingInfo = mongoose.model("TypingInfo", typingProfileSchema);
export default TypingInfo;
