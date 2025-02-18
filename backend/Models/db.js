const mongoose = require('mongoose');

// Load environment variables
const mongo_url = process.env.MONGO_CON 
console.log(mongo_url);

// Async function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:");
    console.error("  - Message: ", err.message);
    console.error("  - Stack: ", err.stack);
    process.exit(1); // Exit process with failure
  }
};

// Invoke the connection function
connectToMongoDB();
