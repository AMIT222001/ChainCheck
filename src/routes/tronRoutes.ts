import { Router } from 'express';
import { validateTronWallet } from '../middlewares/validateWallet';
import { getTRXBalance, getTRC20Balance } from '../services/tronService';
import { validateTronToken } from '../middlewares/validateToken';
import { BADFLAGS } from 'dns';

const router = Router();

/**
 * POST /api/tron/native
 * Body: { walletAddress: string }
 */
router.post('/nativeBalance', validateTronWallet, async (req, res) => {
  const { wallet } = req.body;
  const result = await getTRXBalance(wallet);
  res.json({
    wallet:wallet,
    balance:result,

  });
});

/**
 * POST /api/tron/token
 * Body: { walletAddress: string, tokenAddress: string }
 */
router.post('/tokenBalance', validateTronWallet,validateTronToken, async (req, res) => {
  const { wallet, tokenAddress } = req.body;
  const result = await getTRC20Balance(wallet, tokenAddress);
  res.json({
    wallet:wallet,
    tokenAddress:tokenAddress,
    tokenBalance:result,
  });
});

export default router;
