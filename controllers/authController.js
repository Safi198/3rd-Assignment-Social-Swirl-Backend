const bCrypt = require("bcryptjs");
const jwtoken = require("jsonwebtoken");
require("dotenv").config();

const user = require("../models/user");

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .json({
                    failureMessage: "Username and Password both are required!",
                })
                .status(400);
        }

        const existingUser = await user.findOne({ username });

        if (existingUser) {
            return res
                .status(400)
                .json({ success: "Username already register" });
        }

        const hashPassword = await bCrypt.hash(password, 10);

        const newUser = new user({ username, password: hashPassword });
        await newUser.save();

        res.json({ success: "User registered successfully", newUser }).status(
            200
        );
    } catch (err) {
        res.json({ message: "Internal server error", err: err.message }).status(
            500
        );
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res
                .json({ failureMessage: "Username and password are required" })
                .status(400);
        }

        const uUser = await user.findOne({ username });

        if (!uUser) {
            return res
                .json({ failureMessage: "Invalid credentials" })
                .status(400);
        }

        const isPasswordValid = await bCrypt.compare(password, uUser.password);

        if (!isPasswordValid) {
            return res.json({ message: "Invalid credentials" }).status(400);
        }

        const token = jwtoken.sign(
            { username: uUser.username },
            process.env.SECRET_KEY
        );

        res.json({ success: "Login Successfully", token: token }).status(200);
    } catch (err) {
        res.json({
            message: "Internal server error",
            err: err.message,
        }).status(500);
    }
};
