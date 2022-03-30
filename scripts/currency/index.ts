var XMLHttpRequest = require('xhr2');


export function convertCurrency(fromCurrency: string | null, toCurrency: string | null, ammount: number) {

  const req = new XMLHttpRequest()
    req.open('GET', 'http://www.floatrates.com/daily/usd.json')

    return new Promise ((resolve, reject) => {
        req.send()

        req.onload = function() {


            const data = JSON.parse(req.responseText)
            const fromCurrencyRate:number = fromCurrency ? data[fromCurrency!.toLowerCase()].rate : 1
            const toCurrencyRate:number = toCurrency ? data[toCurrency!.toLowerCase()].inverseRate : 1

            resolve((ammount * toCurrencyRate) * fromCurrencyRate)
        }
    })
}
