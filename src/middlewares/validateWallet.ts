import { Request, Response, NextFunction } from 'express';
import {
  isValidEVMAddress,
  isValidTRONAddress,
  isValidBTCAddress,
  isValidSolanaAddress,
} from '../utils/validator';

// ---- EVM ----
export function validateEVMWallet(req: Request, res: Response, next: NextFunction) {
  const { wallet } = req.body;
  if (!isValidEVMAddress(wallet)) {
    return res.status(400).json({ message: 'Invalid EVM wallet address' });
  }
  next();
}

// ---- Tron ----
export function validateTronWallet(req: Request, res: Response, next: NextFunction) {
  const { wallet } = req.body;
  if (!isValidTRONAddress(wallet)) {
    return res.status(400).json({ message: 'Invalid Tron wallet address' });
  }
  next();
}

// ---- Solana ----
export function validateSolanaWallet(req: Request, res: Response, next: NextFunction) {
  console.log("validating wallet")
  const { wallet } = req.body;
  if (!isValidSolanaAddress(wallet)) {
    return res.status(400).json({ message: 'Invalid Solana wallet address' });
  }
  next();
}

// ---- Bitcoin ----
export function validateBTCWallet(req: Request, res: Response, next: NextFunction) {
  const { wallet } = req.body;
  console.log(wallet)
  if (!isValidBTCAddress(wallet)) {
    return res.status(400).json({ message: 'Invalid Bitcoin wallet address' });
  }
  next();
}
