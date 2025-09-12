import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * Listens for connection success and error events.
 */
const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) return; // Already connected or connecting
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("Database connected succesfully")
        })

        connection.on('error',(err)=>{
            console.error("Database connection failed ",err)
            process.exit(1)
        })
    } catch (error) {
        console.error("Database connection failed",error)
        process.exit(1)
    }
}
  

export default connectDB;
