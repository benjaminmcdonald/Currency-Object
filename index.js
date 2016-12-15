// @flow

(function (root, factory) {
	if (typeof exports !== 'undefined') {
        exports.Currency = factory(require('big-decimal'));
    } else {
        // Browser globals (root is window)
        window.Currency = factory(window.BigDecimal);
  	}
}(this, function (BigDecimal) {
	'use strict';

	class Currency {
		/*:: 
		_amount: BigDecimal; 
		_currency: string;
		_isNegitiveAllowed: boolean;
		*/
	    constructor (amount /*:string*/, currency /*:string*/, isNegitiveAllowed /*:boolean*/ = false) {
	    	if (currency.length !== 3) {
	    		throw Error(`Currency should be ISO currency of length 3`)
	    	}
	    	if (typeof(amount) !== 'string') {
	    		throw Error(`Input amount should be as a string`)
	    	}

	    	this._amount = new BigDecimal(amount);
	    	this._currency = currency;
	    	this._isNegitiveAllowed = isNegitiveAllowed;
	    }
	    checkCurrencyMatch(otherCurrency/*:Currency*/) /*:void*/{
			if (otherCurrency.currency() !== this.currency()) {
	    		throw Error(`Currency mismatch ${otherCurrency.currency()} and ${this.currency()}`)
	    	}
	    }
    	amount()/*:number*/ {return parseFloat(this._amount.toString());}
    	isNegitiveAllowed()/*:boolean*/ {return this._isNegitiveAllowed;}
    	toString()/*:string*/ {return this._amount.toString();}
    	toJSON()/*:string*/ {return this._amount.toString();}
    	currency()/*:string*/ {return this._currency;}
    	copy(isNegitiveAllowed/*:boolean*/ = false) /*:Currency*/ {
    		return new Currency(this._amount.toString(), this.currency(), isNegitiveAllowed || this._isNegitiveAllowed);
    	}
    	min(otherCurrency/*:Currency*/) {
	    	this.checkCurrencyMatch(otherCurrency);
    		return this.isGreaterThan(otherCurrency)?otherCurrency:this;
    	}
    	max(otherCurrency/*:Currency*/) {
	    	this.checkCurrencyMatch(otherCurrency);
    		return this.isGreaterThan(otherCurrency)?this:otherCurrency;
    	}
    	round(scale/*:number*/) /*:string*/ {
    		return this._amount.setScale(scale, BigDecimal.ROUND_HALF_UP).toString();
    	}
	    isEqual(otherCurrency/*:Currency*/)/*:boolean*/ {
	    	this.checkCurrencyMatch(otherCurrency);
	    	return this._amount.equals(otherCurrency._amount);
	    }
	    isLessThan(otherCurrency/*:Currency*/)/*:boolean*/ {
	    	this.checkCurrencyMatch(otherCurrency);
	    	return this._amount.isLessThan(otherCurrency._amount);
	    }
	    isLessThanOrEqualTo(otherCurrency/*:Currency*/)/*:boolean*/ {
	    	this.checkCurrencyMatch(otherCurrency);
	    	return this._amount.isLessThanOrEqualTo(otherCurrency._amount);
	    }
	    isGreaterThan(otherCurrency/*:Currency*/)/*:boolean*/ {
	    	this.checkCurrencyMatch(otherCurrency);
	    	return this._amount.isGreaterThan(otherCurrency._amount);
	    }
	    isGreaterThanOrEqualTo(otherCurrency/*:Currency*/)/*:boolean*/ {
	    	this.checkCurrencyMatch(otherCurrency);
	    	return this._amount.isGreaterThanOrEqualTo(otherCurrency._amount);
	    }
	    converTo(exchangeRate /*:string*/, newCurrencyCode /*:string*/)/*:Currency*/ {
	    	if (!this._isNegitiveAllowed && (new BigDecimal(exchangeRate)).isLessThan(new BigDecimal('0'))) {
	    		throw Error(`Negitive balance will result`)
	    	}
	    	return new Currency(this._amount.multiply(new BigDecimal(exchangeRate)).toString(), newCurrencyCode);
	    }
	    multi(scalarValue /*:string*/)/*:Currency*/ {
	    	if (!this._isNegitiveAllowed && (new BigDecimal(scalarValue)).isLessThan(new BigDecimal('0'))) {
	    		throw Error(`Negitive balance will result`)
	    	}
	    	console.assert(typeof(scalarValue) === 'string');
	    	return new Currency(this._amount.multiply(new BigDecimal(scalarValue)).toString(), this.currency());
	    }
	    div(scalarValue /*:string*/)/*:Currency*/ {
	    	console.assert(typeof(scalarValue) === 'string');
	    	if (!this._isNegitiveAllowed && (new BigDecimal(scalarValue)).isLessThan(new BigDecimal('0'))) {
	    		throw Error(`Negitive balance will result`)
	    	}
	    	return new Currency(this._amount.divide(new BigDecimal(scalarValue), 50, BigDecimal.ROUND_HALF_UP).toString(), this.currency());
	    }
	    add(otherCurrency /*:Currency*/) /*:Currency*/ {
	    	this.checkCurrencyMatch(otherCurrency);
	    	return new Currency(this._amount.add(otherCurrency._amount).toString(), this.currency());
	    }
	    subtract(otherCurrency /*:Currency*/)/*:Currency*/ {
	    	this.checkCurrencyMatch(otherCurrency);
	    	if (!this._isNegitiveAllowed && otherCurrency.isGreaterThan(this)) {
	    		throw Error(`Negitive balance will result`)
	    	}	
    		return  new Currency(this._amount.subtract(otherCurrency._amount).toString(), this.currency());
	    }
	}


	return Currency;
}));