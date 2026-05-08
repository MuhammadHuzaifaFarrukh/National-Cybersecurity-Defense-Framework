const DataResource = require("../models/DataResource.mongo");
const User = require("../models/User.mongo");

const seedDataResources = async () => {
  const users = await User.find({});
  const userMap = users.reduce((accumulator, user) => {
    accumulator[user.username] = user._id;
    return accumulator;
  }, {});

  const resources = [
    {
      resource_name: "National Threat Intelligence Feed",
      classification: "restricted",
      owner: userMap["admin.ncdf"],
    },
    {
      resource_name: "Incident Response Playbooks",
      classification: "confidential",
      owner: userMap["ali.responder"],
    },
    {
      resource_name: "Security Awareness Policy",
      classification: "internal",
      owner: userMap["nida.compliance"],
    },
    {
      resource_name: "Public Advisory Bulletin Archive",
      classification: "public",
      owner: userMap["sara.analyst"],
    },
  ];

  await DataResource.deleteMany({});
  await DataResource.insertMany(resources);

  console.log("Data resources seeded successfully.");
};

module.exports = seedDataResources;
