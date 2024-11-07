const mongoose = require("mongoose");

async function mongoConnection() {
  const URL = process.env.MONGODB_URL;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
    return;
  } catch (error) {
    console.log("Error: mongodb connection failed ", error);
    process.exit(1);
  }
}

module.exports.mongoConnection = mongoConnection;
