const axios = require('axios').default

const BTC_ID = '1'

const KEY = ''

const minutes = 60000

let lastPrice = ''

let received = 0
let totalAmount = 0
let totalReceived = 0

const testPayment = (price, lastPrice) => {

  if(!lastPrice){
    console.log('aqui 1')
    received += 0
    return
  }

  if(price > lastPrice) {
    console.log('aqui 2')
    received += price - lastPrice
  }

  if(lastPrice > price) {
    console.log('aqui 3')
    totalAmount += lastPrice - price
  }

  let totalReceived = received - totalAmount

  console.log('Total Received = ' + received)
  console.log('Total Amount = ' + totalAmount)
  console.log('Total Received = ' + totalReceived)
}

const listCoins = async () => {
  const apiInfo = await axios.get('https://pro-api.coinmarketcap.com/v1/key/info', {
    headers: {
      'X-CMC_PRO_API_KEY': KEY,
    },
  });

  const apiUsage = apiInfo.data.data.usage

  const maxCredits = apiUsage.current_day.credits_left

  console.log(apiUsage)

  if(maxCredits >! 0){
    const { data } = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${BTC_ID}`, {
      headers: {
        'X-CMC_PRO_API_KEY': KEY,
      },
    });

    const price = data.data[1].quote.USD.price
    
    console.log('BTC LAST PRICE ------- USD ' + lastPrice + ' -------')

    console.log('BTC PRICE ------- USD ' + price + ' -------')

    testPayment(price, lastPrice)

    lastPrice = price
  }
}

function intervalFunc(interval) {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      try {
        listCoins(lastPrice);
        resolve();
      } catch (e) {
        reject(e);
      }
    }, interval);

    // Stop the interval after 5 iterations
    setTimeout(() => clearInterval(intervalId), interval * 31);
  });
}

async function main() {
  try {
    await intervalFunc(minutes); // Call myFunction every 5 minutes
  } catch (e) {
    console.error(e);
  }
}

main();


