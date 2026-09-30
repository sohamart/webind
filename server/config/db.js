const mongoose = require('mongoose');

let isConnected = false;
let useEmbeddedStore = false;

const connectDB = async () => {
  if (isConnected || useEmbeddedStore) {
    return mongoose.connection;
  }

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
      console.warn(`[MongoDB Notice] External connection failed: ${err.message}. Falling back to embedded store.`);
    }
  }

  // Graceful zero-friction mode: Embedded ecosystem document store
  console.log('[System Engine] Activating high-resilience Embedded Data Engine.');
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
