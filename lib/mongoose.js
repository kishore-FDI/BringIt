// lib/mongoose.js
import mongoose from "mongoose";

export async function mongooseConnect() {
  if (mongoose.connection.readyState >= 1) {
    return; // Return early if already connected
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log("Connected to MongoDB");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error to be caught in the route handler or caller
  }
}
