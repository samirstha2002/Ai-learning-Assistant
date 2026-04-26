const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected sucessfuly: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to Database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
