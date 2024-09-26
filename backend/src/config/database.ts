import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://piyusss11:HuTC01QkSRXT1hKI@devtinder.1f03b.mongodb.net/devTinder"
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
