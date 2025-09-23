import express from 'express';
import evmRoutes from './routes/evmRoutes';
import tronRoutes from './routes/tronRoutes';
import solanaRoutes from './routes/solanaRoutes';
import bitcoinRoutes from './routes/bitcoinRoutes';


const app = express();
app.use(express.json());

// Multi-chain routes
app.use('/api/evm', evmRoutes);
app.use('/api/tron', tronRoutes);
app.use('/api/solana', solanaRoutes);
app.use('/api/bitcoin', bitcoinRoutes);

// Global error handler


export default app;
