import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://jaiswalsourav5:123456789Sj159@cluster0.vzhcw.mongodb.net/foodies').then(()=>console.log("DataBase Connected"));
}