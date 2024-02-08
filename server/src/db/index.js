import mongoose from 'mongoose'

export const connectDB = async() => {
    try {
        const mongoDBconnection = await mongoose.connect(`${process.env.MONGO_URI}/users`);
        console.log(`MongoDB Connected: ${mongoDBconnection.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Failed!", error);
        return error;
    }
}