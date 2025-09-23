import { Router } from 'express';
import { validateEVMWallet } from '../middlewares/validateWallet';
import { getTokenBalance, getNativeBalance } from '../services/evmService';
import { validateEVMToken } from '../middlewares/validateToken';
const router = Router();

/**
 * POST /api/evm/balance
 * Body: { walletAddress: string, tokenAddress?: string, rpcUrl?: string }
 */
router.post('/tokenBalance', validateEVMWallet,validateEVMToken, async (req, res) => {
  const { wallet, tokenAddress, chain } = req.body;
console.log("entered here")
  try {
    
    const result = await getTokenBalance(wallet, tokenAddress, chain);
    res.json({
      chain:chain,
      tokenBalance:result,
      walletAddress:wallet,
      
    });
  } catch (err) {
    res.status(500).json({ error: true, message: (err as Error).message });
  }
});
router.post('/nativeBalance', validateEVMWallet, async (req, res) => {
  const { wallet, chain } = req.body;
console.log("entered here")
  try {
    
    const result = await getNativeBalance(wallet, chain);
    res.json({
      chain:chain,
      Balance:result,
      walletAddress:wallet,
      
    });
  } catch (err) {
    res.status(500).json({ error: true, message: (err as Error).message });
  }
});

export default router;
