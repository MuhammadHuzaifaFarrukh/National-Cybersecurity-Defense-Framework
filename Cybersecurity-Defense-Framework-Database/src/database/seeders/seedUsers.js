const bcrypt = require("bcryptjs");

const Role = require("../models/Role.mongo");
const User = require("../models/User.mongo");

const seedUsers = async () => {
  const roles = await Role.find({});
  const roleMap = roles.reduce((accumulator, role) => {
    accumulator[role.role_name] = role._id;
    return accumulator;
  }, {});

  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  const users = [
    {
      username: "admin.ncdf",
      password_hash: passwordHash,
      full_name: "National Cyber Admin",
      status: "active",
      role_id: roleMap.administrator,
    },
    {
      username: "sara.analyst",
      password_hash: passwordHash,
      full_name: "Sara Analyst",
      status: "active",
      role_id: roleMap.security_analyst,
    },
    {
      username: "ali.responder",
      password_hash: passwordHash,
      full_name: "Ali Responder",
      status: "active",
      role_id: roleMap.incident_responder,
    },
    {
      username: "nida.compliance",
      password_hash: passwordHash,
      full_name: "Nida Compliance",
      status: "inactive",
      role_id: roleMap.compliance_officer,
    },
  ];

  await User.deleteMany({});
  await User.insertMany(users);

  console.log("Users seeded successfully.");
};

module.exports = seedUsers;
