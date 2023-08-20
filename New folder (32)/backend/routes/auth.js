import express from "express";

const router = express.Router();

import {
  register,
  login,
  logout,
  users,
  userUpdate,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/users", users);

router.put("/user-upadate/:_id", userUpdate);
module.exports = router;
