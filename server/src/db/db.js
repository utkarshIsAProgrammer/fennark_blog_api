import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected successfully! ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error connecting mongoDB! ${err.message}`);
    process.exit(1);
  }
};
