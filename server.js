const express = require("express");
const userRoutes = require("./routes/Auth");
require("dotenv").config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
const connectDB = require('./config/ConnetDB')
connectDB()
// Use the user routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
