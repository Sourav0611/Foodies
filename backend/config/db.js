import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/mydb').then(()=>console.log("DataBase Connected"));
}