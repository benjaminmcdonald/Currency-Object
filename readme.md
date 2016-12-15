## Currency-Value
Javascript Currency class

* Big number calculations for high precious float calculations
* Node or browers support
* Currency code attribute

## Why?
Only currency value object with big number support

## Installing currency-value
```js
npm install --save currency-value
```

## Using
```js

let currency = new Currency('1', 'EUR');

currency = currency.add(new Currency('5', 'EUR'));
currency.amount() === 6;

(new Currency('10', 'EUR')).converTo('2', 'USD').toString() === '20'
```




