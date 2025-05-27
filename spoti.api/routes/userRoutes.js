import { Router } from "express";
import UserController from "../controllers/userController.js";

const controller = new UserController();
const userRouter = Router();

userRouter.get('/', controller.getAll);

export default userRouter;