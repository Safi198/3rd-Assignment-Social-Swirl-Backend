const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGO_URI);


const authRoutes = require("./routes/auth");
const authticateJWT = require("./middleware/authenticate");
const user = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.get("/",(req,res)=>{
    res.send("Server is running")
})
app.get("/users", authticateJWT, async (req, res) => {
    try {
        const users = await user.find({}, "username");
        res.json(users);
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            err: err.message,
        });
    }
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });