import { Router } from 'express';
import { validateSolanaWallet } from '../middlewares/validateWallet';
import { getSOLBalance, getSPLTokenBalance } from '../services/solanaService';
import { validateSolanaToken } from '../middlewares/validateToken';

const router = Router();

/**
 * POST /api/solana/native
 * Body: { walletAddress: string }
 */
router.post('/nativeBalance', validateSolanaWallet, async (req, res) => {
  const { wallet } = req.body;
  const result = await getSOLBalance(wallet);
  res.json({
    chain:"solana",
    balance:{result,unit:"sol"} ,
    wallet:wallet
  });
});

/**
 * POST /api/solana/token
 * Body: { walletAddress: string, tokenAddress: string }
 */
router.post('/tokenBalance', validateSolanaWallet,validateSolanaToken, async (req, res) => {
  const { wallet, tokenAddress } = req.body;
  console.log("trying to fetch balance of token")
  const result = await getSPLTokenBalance(wallet, tokenAddress);
  res.json(
    {
      wallet:wallet,
      tokenBalance:result,
      chain:"solana",
    }
  );
});

export default router;
