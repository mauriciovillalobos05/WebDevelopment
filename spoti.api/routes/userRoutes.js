import { Router } from "express";
import UserController from "../controllers/userController.js";

const userRouter = Router();
const controller = new UserController();

userRouter.get('/', (req, res) => controller.getAllUsers(req, res));
userRouter.get('/email/:mail', (req, res) => controller.getUserByEmail(req, res)); 
userRouter.get('/:id', (req, res) => controller.getUserById(req, res));
userRouter.post('/', (req, res) => controller.createUser(req, res));
userRouter.put('/:id', (req, res) => controller.updateUser(req, res));

export default userRouter;
