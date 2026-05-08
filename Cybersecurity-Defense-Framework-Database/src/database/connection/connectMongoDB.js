const mongoose = require("mongoose");

const { MONGODB_URI, mongodbOptions } = require("../../config/mongodb");

const connectMongoDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in environment variables.");
    }

    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    await mongoose.connect(MONGODB_URI, mongodbOptions);

    console.log("MongoDB connected successfully.");

    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
