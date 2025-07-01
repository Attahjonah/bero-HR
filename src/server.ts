import app from './app';
import { PrismaClient } from '../src/generated/prisma'; 
import logger from './utils/logger';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await prisma.$connect();
    logger.info('✅ Connected to Neon PostgreSQL successfully.');

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('❌ Failed to connect to the database:', error);
    process.exit(1); // exit the app if DB fails
  }
}

startServer();
