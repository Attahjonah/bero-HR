import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from '../src/routes/auth.routes';
import { Request, Response, NextFunction } from 'express';
import logger from './utils/logger';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});



app.use('/api/auth', authRoutes);

export default app;
