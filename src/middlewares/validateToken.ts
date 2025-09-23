import { Request, Response, NextFunction } from 'express';
import {
  isValidEVMToken,
  isValidTRONToken,
  isValidSolanaToken,
  isValidBTCToken, // optional – Bitcoin normally has no “token contracts”
} from '../utils/validator';

// ---- EVM (ERC-20 / ERC-721 etc.) ----
export function validateEVMToken(req: Request, res: Response, next: NextFunction) {
  const { tokenAddress } = req.body;
  if (!isValidEVMToken(tokenAddress)) {
    return res.status(400).json({ message: 'Invalid EVM token address' });
  }
  next();
}

// ---- Tron (TRC-20) ----
export function validateTronToken(req: Request, res: Response, next: NextFunction) {
  const { tokenAddress } = req.body;
  console.log("done")
  if (!isValidTRONToken(tokenAddress)) {
    return res.status(400).json({ message: 'Invalid Tron token address' });
  }
  next();
}

// ---- Solana (SPL token mint address) ----
export function validateSolanaToken(req: Request, res: Response, next: NextFunction) {
  console.log("validating token")
  const { tokenAddress } = req.body;
  if (!isValidSolanaToken(tokenAddress)) {
    return res.status(400).json({ message: 'Invalid Solana token address' });
  }
  next();
}

// ---- Bitcoin ----
// Bitcoin doesn’t have native “token contracts,” but you might allow
// certain protocols (e.g. BRC-20) if you want to validate them.
export function validateBTCToken(req: Request, res: Response, next: NextFunction) {
  const { tokenAddress } = req.body;
  if (!isValidBTCToken(tokenAddress)) {
    return res.status(400).json({ message: 'Invalid Bitcoin token identifier' });
  }
  next();
}
