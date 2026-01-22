const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Attempting MongoDB connection...");
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");//Database connection successful
  } catch (error) {
    console.error("MongoDB connection error:");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
