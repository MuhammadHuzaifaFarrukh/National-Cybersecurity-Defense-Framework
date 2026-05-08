require("dotenv").config();

const mongoose = require("mongoose");

const connectMongoDB = require("./database/connection/connectMongoDB");

const bootstrap = async () => {
  await connectMongoDB();
  console.log("National Cybersecurity Defense Framework database layer is ready.");
};

bootstrap();

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});
