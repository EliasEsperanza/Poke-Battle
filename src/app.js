import express from 'express';
import cors from 'cors';
import batallaRoutes from './routes/batalla.routes.js';
import equipoRoutes from './routes/equipo.routes.js';

const corsOptions = {
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(batallaRoutes);
app.use(equipoRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
