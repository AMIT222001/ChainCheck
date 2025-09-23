import { Router } from 'express';
import { validateBTCWallet } from '../middlewares/validateWallet';
import { getBTCBalance } from '../services/bitcoinService';

const router = Router();

/**
 * POST /api/bitcoin/native
 * Body: { walletAddress: string }
 */
router.post('/nativeBalance', validateBTCWallet, async (req, res) => {
  const { wallet } = req.body;
  const result = await getBTCBalance(wallet);
  res.json(result);
});

export default router;
