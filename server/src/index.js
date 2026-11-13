import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'portfolio-api' }));
app.use('/api/contact', contactRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong. Please try again later.' });
});

async function start() {
  try {
    if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is missing. Add it to server/.env');
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Portfolio API listening on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
}
start();
