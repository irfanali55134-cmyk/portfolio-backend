// Run with: npm run seed:admin
// Creates (or updates the password of) the default admin using values from .env

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const run = async () => {
  await connectDB();

  const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  let admin = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  if (admin) {
    admin.password = ADMIN_PASSWORD; // pre-save hook will hash it
    admin.name = ADMIN_NAME || admin.name;
    await admin.save();
    console.log(`✅ Existing admin updated: ${admin.email}`);
  } else {
    admin = await Admin.create({
      name: ADMIN_NAME || "Admin",
      email: ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASSWORD,
    });
    console.log(`✅ Admin created: ${admin.email}`);
  }

  process.exit(0);
};

run().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
