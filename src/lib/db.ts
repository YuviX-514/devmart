// src/lib/mongodb.ts

import mongoose from "mongoose";

export const connectDB = async () => {
  // Already connected? Do nothing
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "devmart",
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error; // don’t use process.exit() in serverless
  }
};
