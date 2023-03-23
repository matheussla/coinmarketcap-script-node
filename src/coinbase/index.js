const CoinbasePro = require('coinbase-pro');

const key = 'your-api-key';
const secret = 'your-api-secret';
const passphrase = 'your-api-passphrase';

const client = new CoinbasePro.AuthenticatedClient(key, secret, passphrase);

async function buyBitcoin(amount) {
  const order = {
    type: 'market',
    side: 'buy',
    product_id: 'BTC-USD',
    funds: amount,
  };
  const response = await client.placeOrder(order);
  console.log(response);
}

async function sellBitcoin(amount) {
  const order = {
    type: 'market',
    side: 'sell',
    product_id: 'BTC-USD',
    size: amount,
  };
  const response = await client.placeOrder(order);
  console.log(response);
}

buyBitcoin('100'); // Buy $100 worth of bitcoin at market price
sellBitcoin('0.01'); // Sell 0.01 bitcoin at market price
