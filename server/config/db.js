const mongoose = require('mongoose');

let isConnected = false;
let useEmbeddedStore = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri && mongoUri.trim() !== '') {
    try {
      console.log(`[MongoDB] Connecting to: ${mongoUri.replace(/:([^:@]{3})[^:@]*@/, ':***@')}...`);
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000,
      });
      isConnected = true;
      console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
      return conn;
    } catch (err) {
      console.warn(`[MongoDB Notice] External connection failed: ${err.message}`);
    }
  }

  // Graceful zero-friction mode: Embedded ecosystem document store
  console.log('[System Engine] Activating high-resilience Embedded Data Engine.');
  console.log('[System Engine] All Brand CRUD, Settings, Media & Auth will persist to /server/data/ecosystem-db.json');
  console.log('[System Engine] To switch to MongoDB Atlas, set MONGODB_URI in your .env file.');
  useEmbeddedStore = true;
  return null;
};

const isEmbedded = () => useEmbeddedStore;

const disconnectDB = async () => {
  if (isConnected) {
    await mongoose.disconnect();
  }
};

module.exports = { connectDB, disconnectDB, isEmbedded };
