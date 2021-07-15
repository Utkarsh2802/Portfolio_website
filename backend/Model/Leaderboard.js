import mongoose from "mongoose";

const LeaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  tests_taken: { type: Number, default: 0 },
  avg_speed: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  improvement_speed: { type: Number, default: 0 }, //baiscally the current typing score average-first typing test score/ total games
});
const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);
export default Leaderboard;
