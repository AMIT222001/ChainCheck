import { ethers } from "ethers";
import providers from "../utils/provider";


// A minimal ERC-20 ABI with only the functions we need
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

export async function getTokenBalance(
  wallet: string,
  tokenAddress: string,
  chain: string
) {
  const lower = chain.toLowerCase();
  const provider = providers[lower];
  if (!provider) throw new Error(`Unsupported chain: ${chain}`);

  // Create a contract instance for the ERC-20 token
  const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  // Fetch raw balance (in smallest unit, e.g. wei)
  const rawBalance: bigint = await tokenContract.balanceOf(wallet);

  // Fetch token decimals to convert to human-readable number
  const decimals: number = await tokenContract.decimals();

  // Convert balance to a normal decimal number
  const humanReadable = Number(ethers.formatUnits(rawBalance, decimals));

  return humanReadable;
}

export async function getNativeBalance(wallet: string, chain: string) {
  const lower = chain.toLowerCase();
  // EVM-compatible chains (Ethereum, BSC, Polygon, etc.)
  const provider = providers[lower];
  if (!provider) throw new Error(`Unsupported chain: ${chain}`);

  const balance = await provider.getBalance(wallet);
  return Number(ethers.formatEther(balance));
}
