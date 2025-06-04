import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";

const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'TU_SECRETO_SEGURIDAD';

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body; 

  const user = await userModel.getUserByEmail(email); 
  if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});


export default authRouter;