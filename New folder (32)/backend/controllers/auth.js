import User from "../models/user";

import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      lastName,
      father_name,
      identity_card_number,
      email,
      password,
      phoneNumber,
      gender,
      description,
      birthday,
    } = req.body;

    if (!email) return res.status(400).send("Email is required");

    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    if (!name) return res.status(400).send("name is required");

    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // register
    const user = new User({
      name,
      lastName,
      father_name,
      identity_card_number,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      description,
      birthday,
    });
    await user.save();

    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    console.log(">>>>>>>>>>>>>>>>>>>>>");
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong password");

    // create signed jwt
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // return user and token to client, exclude hashed password
    user.password = undefined;

    if (typeof window !== "undefined") {
      // Perform localStorage action
      const item = localStorage.setItem("token", token);
    }

    // send token in cookie
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

export const logout = async (req, res) => {
  try {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const item = localStorage.clear("token");
    }
    res.clearCookie("token");
    return res.json({ message: "Signout success" });
  } catch (err) {
    console.log(err);
  }
};

export const users = async (req, res) => {
  let currentPage = req.query.currentPage;
  console.log(currentPage);

  const offest = currentPage * 6;

  const result = {};
  result.result = await User.find().exec();

  const currentPageData = result["result"].slice(offest, offest + 6);

  console.log("Current page data >>>>>>>>>", currentPageData);
  console.log("current page >>>>>>>>>>>.", currentPage);

  const pagaCount = Math.ceil(result["result"].length / 6);
  const c = result["result"];
  res.json({
    currentPageData: result["result"].length == 1 ? c : currentPageData,
    pageCount: pagaCount,
  });
};

export const userUpdate = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log(_id);
    console.log(req.params);
    console.log(req.body);
    const user = await User.findByIdAndUpdate({ _id }).exec();
    console.log(user);
    const updated = await User.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    }).exec();
    // console.log(updated);

    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};
