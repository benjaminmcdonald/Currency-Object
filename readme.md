## Currency-Object
Javascript Currency class

* Big number calculations for high precision float calculations
* Node or browers support
* Currency code attribute
* Flow type support

## Why?
Only currency value object with big number support

## Installing currency-object
```js
npm install --save currency-object
```

## Using
```js
const Currency = require('currency-object')['Currency'];	// isn't beautiful, but it's works

let currency = new Currency('1', 'EUR');

currency = currency.add(new Currency('5', 'EUR'));
currency.amount() === 6;
currency.currency() === 'EUR';

(new Currency('10', 'EUR')).converTo('2', 'USD').currency() === 'USD'
(new Currency('10', 'EUR')).converTo('2', 'USD').toString() === '20'
```





## Methods
* new Currency(string amount, string currency, boolean isNegitiveAllowed = false)
* amount => number
* toString => string
* currency => ISO currency of length 3
* round => string
* toJson => Object
* isNegitiveAllowed => boolean
* copy => Currency
* min => Currency
* max => Currency
* isEqual => boolean
* isLessThan => boolean
* isLessThanOrEqualTo => boolean
* isGreaterThan => boolean
* isGreaterThanOrEqualTo => boolean
* converTo => Currency
* multi => Currency
* div => Currency
* add => Currency
* subtract => Currency

