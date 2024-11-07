import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./server_side/routes/auth.route.js";
import clientRoutes from "./server_side/routes/booking.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 1010;

// Create a cluster files and middlewares...............................................

app.use(express.json()); //allow us to parse incomming request form client side
app.use(cookieParser());
// Routes................................................................................

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);

// Run PORT .............................................................................

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
