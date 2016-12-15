
const Currency = (typeof exports !== 'undefined'?require('./index'):window.Currency);

function equals(a, b) {
	console.assert(a === b, {a, b});
	if (a !== b) {
		console.trace();
	}
}

let currency = new Currency('1', 'EUR');

currency = currency.add(new Currency('5', 'EUR'));
equals(currency.amount(), 6);

// Error: subtract from currency with insufficient value
try {
	currency = currency.subtract(new Currency('10', 'EUR'));
	equals(false);
} catch (e) {
	equals(currency.amount(), 6);
}

// Error: subtract USD from EUR
try {
	currency = currency.subtract(new Currency('6', 'USD'));
	equals(false);
} catch (e) {
	equals(currency.amount(), 6);
}

currency = currency.subtract(new Currency('6', 'EUR'));
equals(currency.amount(), 0);

console.log((new Currency('5.234892834', 'EUR')).add(new Currency('5.24234234', 'EUR')).toString());


equals((new Currency('5.23234234', 'EUR')).amount(), 5.23234234);
equals((new Currency('5.234892834', 'EUR')).toString(), '5.234892834');
equals((new Currency('5.234892834', 'EUR')).add(new Currency('5.24234234', 'EUR')).toString(), '10.477235174');

equals((new Currency('5.23234234', 'EUR')).isNegitiveAllowed(), false);
equals((new Currency('5.23234234', 'EUR', true)).isNegitiveAllowed(), true);
equals((new Currency('5.23234234', 'EUR')).currency(), 'EUR');
equals((new Currency('5.23234234', 'EUR')).copy().currency(), 'EUR');
equals((new Currency('5.23234234', 'EUR')).copy().toString(), '5.23234234');

equals((new Currency('5.23234234', 'EUR')).min((new Currency('3.23234234', 'EUR'))).toString(), '3.23234234');
equals((new Currency('5.23234234', 'EUR')).max((new Currency('3.23234234', 'EUR'))).toString(), '5.23234234');

equals((new Currency('5.23234234', 'EUR')).round(2).toString(), '5.23');
equals((new Currency('5.25534234', 'EUR')).round(2).toString(), '5.26');

equals((new Currency('5.25234234', 'EUR')).isEqual((new Currency('5.25234234', 'EUR'))), true);


equals((new Currency('5.23234234', 'EUR')).isLessThan((new Currency('3.23234234', 'EUR'))), false);
equals((new Currency('5.23234234', 'EUR')).isLessThanOrEqualTo((new Currency('3.23234234', 'EUR'))), false);

equals((new Currency('5.23234234', 'EUR')).isGreaterThan((new Currency('3.23234234', 'EUR'))), true);
equals((new Currency('5.23234234', 'EUR')).isGreaterThanOrEqualTo((new Currency('3.23234234', 'EUR'))), true);


equals((new Currency('10', 'EUR')).converTo('2', 'USD').currency(), 'USD');
equals((new Currency('10', 'EUR')).converTo('2', 'USD').toString(), '20');

equals((new Currency('10', 'EUR')).multi('2').toString(), '20');
equals((new Currency('10', 'EUR')).div('2').round(0).toString(), '5');

equals((new Currency('10', 'EUR')).add(new Currency('2', 'EUR')).toString(), '12');
equals((new Currency('10', 'EUR')).subtract(new Currency('2', 'EUR')).toString(), '8');
