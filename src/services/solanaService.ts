import { Request, Response } from "express";
import { Connection, PublicKey, TokenAccountsFilter, clusterApiUrl } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  getAccount,
  getMint,
} from "@solana/spl-token";

/**
 * Get the SPL token balance (returns number in human units)
 */
export async function getSPLTokenBalance(
  walletAddress: string,
  tokenAddress: string
): Promise<string> {
  try {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const owner = new PublicKey(walletAddress);
    const mint = new PublicKey(tokenAddress);
    
    // Use getParsedTokenAccountsByOwner to get parsed data
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
      owner,
      { mint } as TokenAccountsFilter
    );
  
    // Check if any token accounts exist
    if (tokenAccounts.value.length === 0) {
      return "0"; // No token accounts found for this mint
    }
    
    let totalBalance = 0;
    
    // Sum up all token accounts for this mint (in case there are multiple)
    for (const tokenAccount of tokenAccounts.value) {
      const account = tokenAccount.account;
      console.log(account.data.parsed.info.tokenAmount.uiAmount);
      // console.log(account.data.parsed.info.tokenAmount.uiAmountString);
      console.log(account.data.parsed.info.tokenAmount.decimals);
      console.log(account.data.parsed.info.tokenAmount.amount);
      // Access the parsed data safely
      if (
        account.data &&
        typeof account.data === "object" &&
        "parsed" in account.data &&
        account.data.parsed?.info?.tokenAmount?.uiAmount != null
      ) {
        totalBalance += account.data.parsed.info.tokenAmount.uiAmount;
      }
    }
    
    console.log(totalBalance);
    return String(totalBalance);
  } catch (error) {
    console.error("Error fetching SPL token balance:", error);
    throw error;
  }
}

/**
 * Get the native SOL balance (returns number in SOL)
 */
export async function getSOLBalance(walletAddress: string): Promise<number> {
  try {
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
    const balanceLamports = await connection.getBalance(
      new PublicKey(walletAddress)
    );
    return balanceLamports / 1_000_000_000; // convert lamports → SOL
  } catch (error) {
    console.error("Error fetching SOL balance:", error);
    throw error;
  }
}

/**
 * Alternative method using getAssociatedTokenAddress for better performance
 * when you know the wallet only has one associated token account
 */
