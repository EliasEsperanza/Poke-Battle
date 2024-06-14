import express from 'express';
import cors from 'cors';
import batallaRoutes from './routes/batalla.routes.js';

const corsOptions = {
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(batallaRoutes);

export default app;
