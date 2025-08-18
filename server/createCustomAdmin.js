import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createCustomAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("❌ Admin user already exists");
      console.log("To recreate, first delete the existing admin user from the database");
      process.exit(0);
    }

    // You can change these values
    const adminData = {
      username: "admin",
      email: "admin@example.com",
      password: "admin", // Change this to your preferred password
      role: "admin"
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    
    // Create admin user
    const adminUser = new User({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully");
    console.log(`Username: ${adminData.username}`);
    console.log(`Password: ${adminData.password}`);
    console.log(`Email: ${adminData.email}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  }
};

createCustomAdmin();
