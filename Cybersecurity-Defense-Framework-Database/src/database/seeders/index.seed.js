require("dotenv").config();

const mongoose = require("mongoose");

const connectMongoDB = require("../connection/connectMongoDB");

const seedPermissions = require("./seedPermissions");
const seedRoles = require("./seedRoles");
const seedSystemSettings = require("./seedSystemSettings");
const seedUsers = require("./seedUsers");
const seedDataResources = require("./seedDataResources");
const seedDashboardPreferences = require("./seedDashboardPreferences");
const seedTrainingMaterials = require("./seedTrainingMaterials");
const seedTrainingRecords = require("./seedTrainingRecords");
const seedNetworkEvents = require("./seedNetworkEvents");
const seedSecurityAlerts = require("./seedSecurityAlerts");
const seedIncidents = require("./seedIncidents");
const seedReports = require("./seedReports");

const runSeeders = async () => {
  try {
    await connectMongoDB();

    await seedPermissions();
    await seedRoles();
    await seedSystemSettings();
    await seedUsers();
    await seedDataResources();
    await seedDashboardPreferences();
    await seedTrainingMaterials();
    await seedTrainingRecords();
    await seedNetworkEvents();
    await seedSecurityAlerts();
    await seedIncidents();
    await seedReports();

    console.log("All seeders completed successfully.");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeder failed:", error.message);
    process.exit(1);
  }
};

runSeeders();
