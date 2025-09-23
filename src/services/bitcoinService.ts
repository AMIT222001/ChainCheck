const axios = require("axios");

export async function getBTCBalance(address:string) {
  try {
    const url = `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`;
    const response = await axios.get(url);
    return {
      address,
      balanceBTC: response.data.final_balance / 1e8,
    };
  } catch (err) {
   return err;
  }
}

getBTCBalance("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa").then(console.log);
