import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import crudRoutes from './routes/crud.routes.js';

const app = express()

app.use(express.json());

app.use(morgan('dev'));
app.use(cors({
    origin: ['http://localhost:5173', '*']
}))



app.use('/api', crudRoutes)

export default app;