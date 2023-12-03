import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
});

export const RocUsers = mongoose.model("rocusers", userSchema);
