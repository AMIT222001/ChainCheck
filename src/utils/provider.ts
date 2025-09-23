import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const providers: { [key: string]: ethers.JsonRpcProvider } = {
    ethereum: new ethers.JsonRpcProvider(process.env.ETH_RPC_URL),
    bsc: new ethers.JsonRpcProvider(process.env.BNB_RPC_URL),
    polygon: new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL),
    avalanche: new ethers.JsonRpcProvider(process.env.AVALANCHE_RPC_URL),
    cronos: new ethers.JsonRpcProvider(process.env.CRONOS_RPC_URL),
    arbitrum: new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC_URL),
    base: new ethers.JsonRpcProvider(process.env.BASE_RPC_URL),
    pulsechain: new ethers.JsonRpcProvider(process.env.PULSECHAIN_RPC_URL),
   
};
console.log(providers)
export default providers;
