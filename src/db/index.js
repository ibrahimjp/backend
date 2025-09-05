import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
export const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`).then(() => {
            console.log("Connected to the database");
        }).catch((error) => {
            console.log("Error connecting to the database", error);
        });
    }catch(error){
        console.log("Error connecting to the database", error);
    }
}