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

let currency = new Currency('1', 'EUR');

currency = currency.add(new Currency('5', 'EUR'));
currency.amount() === 6;
currency.currency() === 'EUR';

(new Currency('10', 'EUR')).converTo('2', 'USD').currency() === 'USD'
(new Currency('10', 'EUR')).converTo('2', 'USD').toString() === '20'
```




