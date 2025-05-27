import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js'

const app = express();

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

app.use(cors())
app.use(express.json());

app.use('/api/users', userRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Está corriendo en este puerto:", PORT);
})