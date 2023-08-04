import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'melhorenvio',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (err) {
    console.log(err);
  }
};
