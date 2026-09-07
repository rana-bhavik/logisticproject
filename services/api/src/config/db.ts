import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/logistis';
    await mongoose.connect(mongoURI);
    console.log('[Database] MongoDB Connected Successfully');
  } catch (error) {
    console.error('[Database] Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;
