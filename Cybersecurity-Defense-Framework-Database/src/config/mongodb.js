const MONGODB_URI = process.env.MONGODB_URI || "";

const mongodbOptions = {
  autoIndex: process.env.NODE_ENV !== "production",
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
};

module.exports = {
  MONGODB_URI,
  mongodbOptions,
};
