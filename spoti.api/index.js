import express from 'express';
import favoriteRouter from './routes/favoriteRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'; 

import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/favorites', favoriteRouter);
app.use('/api/users', userRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API corriendo en puerto ${PORT}`);
});
