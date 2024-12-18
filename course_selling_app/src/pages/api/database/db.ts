import mongoose from "mongoose";

// Define user schema
const userSchema = new mongoose.Schema({
  username: String,
  gmail: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

// Define admin schema
const adminSchema = new mongoose.Schema({
  adminname: String,
  gmail: String,
  password: String,
});

// Define course schema
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Check if models already exist in mongoose.models, to avoid redefinition
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export { User, Admin, Course };
