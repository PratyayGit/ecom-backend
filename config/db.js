const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Succesfully connected to DB");
  } catch (error) {
    console.log("Error Connected in DB", error);
  }
};
module.exports = connectDb;
