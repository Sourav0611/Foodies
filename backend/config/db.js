import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://jaiswalsourav5:123456789Sj159@cluster0.vzhcw.mongodb.net/foodies').then(()=>console.log("DataBase Connected"));
}