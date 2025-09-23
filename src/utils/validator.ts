import { ethers } from 'ethers';
import {TronWeb} from 'tronweb';
import { PublicKey } from '@solana/web3.js';
import bitcoin from 'bitcoinjs-lib';

import fetch from "node-fetch";

// ---- Wallet Address Validators ----
export function isValidEVMAddress(address: string): boolean {
  return ethers.isAddress(address);
}

export function isValidTRONAddress(address: string): boolean {
  return TronWeb.isAddress(address);
}

export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

export async function isValidBTCAddress(address: string): Promise<boolean> {
  // 1️⃣ Validate format
  try {
    bitcoin.address.toOutputScript(address);
  } catch {
    return false;
  }

  // 2️⃣ Check existence on-chain using Blockstream API
  try {
    const url = `https://blockstream.info/api/address/${address}`;
    const response = await fetch(url);
    if (!response.ok) return false;

    const data :any= await response.json();

    // Address exists if it has any confirmed or mempool transactions
    const exists = data.chain_stats.tx_count > 0 || data.mempool_stats.tx_count > 0;

    return exists;
  } catch (err) {
    console.error("Error checking BTC wallet:", err);
    return false;
  }
}

// ---- Token Address Validators ----
// For EVM/TRON/Solana these are the same format as wallet addresses
export const isValidEVMToken   = isValidEVMAddress;
export const isValidTRONToken  = isValidTRONAddress;
export const isValidSolanaToken = isValidSolanaAddress;

// Bitcoin normally has no token contracts
export function isValidBTCToken(_identifier: string): boolean {
  return false;
}
