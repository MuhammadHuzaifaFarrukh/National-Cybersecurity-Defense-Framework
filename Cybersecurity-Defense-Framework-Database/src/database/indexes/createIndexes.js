require("dotenv").config();

const connectMongoDB = require("../connection/connectMongoDB");
const mongoose = require("mongoose");

const models = [
  require("../models/Permission.mongo"),
  require("../models/Role.mongo"),
  require("../models/User.mongo"),
  require("../models/SystemSetting.mongo"),
  require("../models/DashboardPreference.mongo"),
  require("../models/DataResource.mongo"),
  require("../models/Report.mongo"),
  require("../models/NetworkEvent.mongo"),
  require("../models/SecurityAlert.mongo"),
  require("../models/Incident.mongo"),
  require("../models/ActivityLog.mongo"),
  require("../models/TrainingMaterial.mongo"),
  require("../models/TrainingRecord.mongo"),
];

const createIndexes = async () => {
  try {
    await connectMongoDB();

    for (const dbModel of models) {
      await dbModel.syncIndexes();
      console.log(`Indexes synchronized for ${dbModel.modelName}.`);
    }

    console.log("All indexes synchronized successfully.");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Index synchronization failed:", error.message);
    process.exit(1);
  }
};

createIndexes();
