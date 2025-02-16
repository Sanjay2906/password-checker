require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Define Password Schema & Model
const passwordSchema = new mongoose.Schema({
    password: { type: String, required: true }
});
const Password = mongoose.model("Password", passwordSchema);

// API Route to Save Passwords
app.post("/save-password", async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) return res.status(400).json({ message: "Password is required" });

        const newPassword = new Password({ password });
        await newPassword.save();
        res.json({ message: "Password saved successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
