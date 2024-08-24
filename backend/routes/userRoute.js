import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Route for user registration
userRouter.post("/register", registerUser);

// Route for user login
userRouter.post("/login", loginUser);

export default userRouter;
