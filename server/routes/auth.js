import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();



router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashed
    });

const { password: _, ...safeUser } = user._doc;

res.status(201).json({
  msg: "User created successfully",
  user: safeUser,
});

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      "secret",   
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


// export router
export default router;