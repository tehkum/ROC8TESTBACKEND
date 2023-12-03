import { RocUsers } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const findEmailInUser = await RocUsers.findOne({ email });
    if (findEmailInUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new RocUsers({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    return res.status(201).json({ message: "RocUsers created", token, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await RocUsers.findOne({ email });

    if (!findUser) {
      return res.status(400).json({ message: "RocUsers does not exist" });
    }
    const validPassword = await bcrypt.compare(password, findUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: findUser.email, _id: findUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    return res
      .status(200)
      .json({ message: "RocUsers login successful", token, user: findUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const findUser = await RocUsers.findById(req.user._id).select("-password");

    return res.status(200).json({
      message: "RocUsers Fetch Successfull",
      user: findUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
