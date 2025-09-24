import { TronWeb } from 'tronweb';
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
});

export async function getTRXBalance(wallet:string)
{
   
    const sun = await tronWeb.trx.getBalance(wallet);
    console.log(Number(sun)/1e6);
    return (Number(sun) / 1e6);
}
export async function getTRC20Balance(wallet:string,tokenAddress:string)
{
try {
    // Set default address (optional for read-only)
    tronWeb.defaultAddress = {
      hex: tronWeb.address.toHex(wallet),
      base58: wallet
    };

    // Get contract instance
    const contract = await tronWeb.contract().at(tokenAddress);

    // Fetch balance
    const balance = await contract.balanceOf(wallet).call();
    console.log(typeof(balance))
    console.log((balance))
    const decimals = await contract.decimals().call();
    console.log(typeof(decimals))
    console.log((decimals))
    
    const humanReadable:string = String(Number(balance) / (10 ** Number(decimals)));

    // Return as JSON
 return humanReadable;
  } catch (err ) {
    return err;
  }
}