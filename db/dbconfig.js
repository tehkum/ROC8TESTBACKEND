import mongoose from "mongoose";

export async function connectDB() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB as ${connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
