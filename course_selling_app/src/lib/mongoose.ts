import mongoose from "mongoose";
export default async function connectDatabase() {
  let DB_URL =
    "mongodb+srv://mudasirirshad47:mudasir123456789@cluster0.jzcnrjw.mongodb.net/Course_Selling_App";

  try {
    await mongoose.connect(DB_URL);
    console.log("Data base connected");
  } catch (error) {
    console.log(error);
  }
}
