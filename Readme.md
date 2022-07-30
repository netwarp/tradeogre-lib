# TradeOgre lib

![Ogre logo](https://raw.githubusercontent.com/netwarp/tradeogre-lib/master/logo.svg)

Tradeogre rest api with promise.  
Node version: 18+

## Usage

    import TradeOgre from '../src/TradeOgre.js'
    import auth from '../env.json' assert {type: 'json'}

    const tradeogre = new TradeOgre(auth.key, auth.secret)

    const markets = await tradeogre.markets()
    console.log(markets)

    const orders = await tradeogre.orders('BTC-XMR')
    console.log(orders)
    
    const ticker = await tradeogre.ticker('BTC-XMR')
    console.log(ticker)
    
    const history = await tradeogre.history('BTC-XMR')
    console.log(history)
    
    const buy = await tradeogre.buy('BTC-XMR', 0.01, 0.0061)
    console.log(buy)
    
    const sell = await tradeogre.sell('BTC-XMR', 0.01, 0.00619)
    console.log(sell)
    
    const cancel = await tradeogre.cancel()
    console.log(cancel)
    
    const orders = await tradeogre.orders()
    console.log(orders)
    
    const balance = await tradeogre.balance('BTC')
    console.log(balance)
    
    const balances = await tradeogre.balances()
    console.log(balances)

