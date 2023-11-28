const mongoose = require("mongoose");

const uri =
  "mongodb+srv://nomanmangalzai4:Katapoorkooz1@cluster0.nvltbzm.mongodb.net/?retryWrites=true&w=majority";

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
    });
    console.log("MongoDB connection successful");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

module.exports = { connectToMongoDB };
