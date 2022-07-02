import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

//routes
import authRoute from "./routes/auth.js"
import hotelRoute from "./routes/hotels.js"
import roomRoute from "./routes/rooms.js"
import userRoute from "./routes/users.js"

const app = express()
dotenv.config()

// 'mongodb://localhost:27017/booking'
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Database connected")
    } catch (error) {
        throw (error);
    }
}

//middlewares

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong"
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB connected");
})

app.listen(process.env.PORT || 8800, () => {
    connect();
    console.log("Connected to Backend")
})