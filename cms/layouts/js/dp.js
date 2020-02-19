/**
 * Reference na knihovnu DP.
 */
var DP = DP || {};


/*
 *	GLOBAL CONSTANTS
 */

DP.constants = {
	READY_FLAG_NAME: "dp.ready",
	INIT_IN_PROGRESS_FLAG_NAME: "dp.init.inProgress"
};

/**
 * Zalozeni namespace pro funkce s obecnym trivialnim chovanim.
 */
DP.function = DP.function || {};

/**
 * Tato funkce je tzv. prázdná operace (no operation) a nevykonává žádný kód.
 * Použije se tam, kde API vyžaduje callback funkci, ale my nechceme, aby se při
 * volani callbacku provedl nějaký kód.
 * <p>
 * Příklad použití:</p>
 * <pre>
 * let onCompleteFn = function (x, y) { ... }
 * let requestParams = {
 *     url: DP.context.baseUrl + "/record-video-playback",
 *     timeout: timeout,
 *     data: {videoId: videoId},
 *     onComplete: onCompleteFn,
 *     onError: DP.function.noop,
 *     onTimeout: DP.function.noop
 * };
 * </pre>
 */
DP.function.noop = function () {};

/**
 * Tato funkce vrací svůj nezměněný vstup. Respektive vrací svůj první argument.
 * Pokud argument není zadán, vrací <code>undefined</code>. Použije se tam, kde
 * API vyžaduje callback funkci, která má transformovat předaný argument, ale my
 * nechceme, aby se při volani callbacku nějaká transformace provedla.
 * 
 * @param arg vstup funkce
 * @returns Vrací nezměněný vstupní argument <code>arg</code>
 */
DP.function.identity = function (arg) {
	return arg;
};

/**
 * Vrátí název funkce/třídy. Pokud je argument <code>undefined<code>,
 * <code>null<code> nebo <code>""<code>, tak vrátí <code>undefined<code>.
 * 
 * @param {Function|Class} objectClass Reference na funkci/třídu.
 * @returns Název funkce/třídy.
 */
DP.function.getName = DP.getClassName = function (objectClass) {
	if (DP.isEmpty(objectClass)) {
		let undefined;
		return undefined;
	}
	if (DP.isUndefined(objectClass.name)) {
		// Fix Function#name on browsers that do not support it (IE)
		let name = (objectClass.toString().match(/^function\s*([^\s(]+)/) || [])[1];
		// For better performance only parse once, and then cache the
		// result through a new accessor for repeated access.
		Object.defineProperty(objectClass, 'name', {value: name, configurable: true});
	}
	return objectClass.name;
};

/*
 *	EXCEPTIONS
 */

/**
 * Trida vyjimky, ktera oznamuje, ze funkci byly predany nevhodne nebo
 * nepovolene argumenty.
 * 
 * @extends Error
 * 
 * @constructor
 * @param {String|Object} message Detailni zprava o chybe 
 */
DP.IllegalArgumentException = function (message) {
	this.message = message;
};
// class IllegalArgumentException extends Error
DP.IllegalArgumentException.prototype = new Error();

/**
 * Tato vyjimka by se mela vyhazovat pro oznameni nevhodneho nebo nepovoleneho
 * pouziti null (pripadne undefined).
 * 
 * Pro oznamovani konkretniho stavu stavu, kdy referovana promenna nebyla
 * deklarovana, pouzij vestavenou tridu ReferenceError.
 * 
 * @extends Error
 * 
 * @constructor
 * @param {String|Object} message Detailni zprava o chybe 
 */
DP.NullPointerException = function (message) {
	this.message = message;
};
// class IllegalArgumentException extends Error
DP.NullPointerException.prototype = new Error();

/**
 * Vyjimka je vyhazovana pri hledani nebo pristupu k elementu v DOM a oznamuje,
 * ze pozadovany HTML element v dokumentu neexistuje.
 * 
 * @extends Error
 * 
 * @constructor
 * @param {String|Object} message 
 */
DP.ElementNotFoundException = function (message) {
	this.message = message;
};
// class ElementNotFoundException extends Error
DP.ElementNotFoundException.prototype = new Error();

/**
 * Tato vyjimka oznamuje, ze funkce byla vyvolana v nevhodnem nebo nepovolenem
 * okamziku. Tedy ze prostredi, aplikace nebo objekt nejsou ve vhodnem stavu
 * pro volani pozadovane operace.
 * 
 * @extends Error
 * 
 * @constructor
 * @param {String|Object} message 
 */
DP.IllegalStateException = function (message) {
	this.message = message;
};
// class IllegalStateException extends Error
DP.IllegalStateException.prototype = new Error();


/*
 *	VALUE TESTING AND PRECONDITIONS 
 */

/**
 * Vraci true v pripade, ze parametr neni definovan, jinak vraci false.
 * 
 * @param {Object} value Testovana hodnota
 */
DP.isUndefined = function (value) {
	return (typeof value === 'undefined');
};
DP.isNotUndefined = function (value) {
	return !DP.isUndefined(value);
};

/**
 * Vraci true v pripade, ze parametr je null, jinak vraci false.
 * 
 * @param {Object} value Testovana hodnota
 */
DP.isNull = function (value) {
	return (value === null);
};
DP.isNotNull = function (value) {
	return !DP.isNull(value);
};

/**
 * Vraci <code>true</code> v pripade, kdy parametr je <code>undefined</code>,
 * <code>null</code> nebo <code>""</code>, jinak vraci <code>false</code>.
 * 
 * @param {String|Number|Boolean} value Testovana hodnota
 */
DP.isEmpty = function (value) {
	return (typeof value === 'undefined') || (value === null) || (value === "");
};
DP.isNotEmpty = function (value) {
	return !DP.isEmpty(value);
};

/**
 * Vraci true v pripade, ze lze parametr vyhodnotit jako true, jinak vraci false.
 * <p>
 * Priklady chovani:</p>
 * <pre>
 * console.assert(DP.isTrue(undefined) === false);
 * console.assert(DP.isTrue(null) === false);
 * console.assert(DP.isTrue(-1) === true);
 * console.assert(DP.isTrue(0) === false);
 * console.assert(DP.isTrue(1) === true);
 * console.assert(DP.isTrue(2) === true);
 * console.assert(DP.isTrue('') === false);
 * console.assert(DP.isTrue('true') === true);
 * console.assert(DP.isTrue('false') === false);
 * console.assert(DP.isTrue({}) === true);
 * console.assert(DP.isTrue([]) === true);
 * console.assert(DP.isTrue(DP) === true);
 * console.assert(DP.isTrue(DP.isTrue) === true);
 * console.assert(DP.isTrue(undefined, 123) === 123);</pre>
 * 
 * @param {Object} value Testvana hodnota
 * @param {Object} defaultValue Nepovinna defaultni hodnota pokud value je false
 */
DP.isTrue = function (value, defaultValue) {
	return (DP.isUndefined(value)
		? (DP.isUndefined(defaultValue) ? false : defaultValue)
		: value !== 'false' && !!value);
};

/**
 * Vraci true v pripade, ze lze parametr vyhodnotit jako false, jinak vraci false.
 * <p>
 * Priklady chovani:</p>
 * <pre>
 * console.assert(DP.isFalse(undefined) === true);
 * console.assert(DP.isFalse(null) === true);
 * console.assert(DP.isFalse(-1) === false);
 * console.assert(DP.isFalse(0) === true);
 * console.assert(DP.isFalse(1) === false);
 * console.assert(DP.isFalse(2) === false);
 * console.assert(DP.isFalse('') === true);
 * console.assert(DP.isFalse('true') === false);
 * console.assert(DP.isFalse('false') === true);
 * console.assert(DP.isFalse({}) === false);
 * console.assert(DP.isFalse([]) === false);
 * console.assert(DP.isFalse(DP) === false);
 * console.assert(DP.isFalse(DP.isTrue) === false);
 * console.assert(DP.isFalse(undefined, 123) === 123);</pre>
 * 
 * @param {Object} value Testvana hodnota
 * @param {Object} defaultValue Nepovinna defaultni hodnota pokud value je true
 */
DP.isFalse = function (value, defaultValue) {
	return (DP.isUndefined(value)
		? (DP.isUndefined(defaultValue) ? true : defaultValue)
		: value === 'false' || value !== 'true' && !value);
};

/**
 * Vraci <code>true</code> v pripade, ze parametr je typu <code>string</code>,
 * jinak vraci <code>false</code>. Pojud je paramnetr <code>null</code> nebo
 * <code>undefined</code>, tak vati <code>false</code>.
 * 
 * @param {Object} value Testovana hodnota
 */
DP.isString = function (value) {
	return value !== null && typeof value !== 'undefined'
		&& (typeof value === 'string' || value instanceof String);
};

/**
 * Vraci <code>true</code> v pripade, ze parametr je typu <code>Array</code>,
 * jinak vraci <code>false</code>. Pojud je paramnetr <code>null</code> nebo
 * <code>undefined</code>, tak vati <code>false</code>.
 * 
 * @param {Object} value Testovana hodnota
 */
DP.isArray = function (value) {
	return value !== null && typeof value !== 'undefined'
		&& typeof value === 'object' && value instanceof Array;
};

/**
 * Vraci <code>true</code> v pripade, ze parametr je funkce, jinak vraci
 * <code>false</code>. Pojud je paramnetr <code>null</code> nebo
 * <code>undefined</code>, tak vati <code>false</code>.
 * 
 * @param {Object} value Testovana hodnota
 */
DP.isFunction = function (value) {
	return value !== null && typeof value !== 'undefined'
		&& (typeof value === 'function' || value instanceof Function);
};

/**
 * Vraci <code>true</code> v pripade, ze parametr je typu <code>jQuery object</code>,
 * jinak vraci <code>false</code>. Pojud je paramnetr <code>null</code> nebo
 * <code>undefined</code>, tak vati <code>false</code>.
 * 
 * @param {Object} value Testovana hodnota
 */
DP.isJQueryObject = function (value) {
	return value !== null && typeof value !== 'undefined'
		&& typeof value === 'object' && DP.isTrue(value.jquery);
};

/**
 * Vraci <code>true</code> v pripade, ze parametr je typu <code>DOM node</code>,
 * jinak vraci <code>false</code>. Pojud je paramnetr <code>null</code> nebo
 * <code>undefined</code>, tak vati <code>false</code>.
 * 
 * @param {Object} value Testovana hodnota
 */
DP.isDomNode = function (value) {
	return value !== null && typeof value !== 'undefined' && (typeof Node instanceof Object
		// DOM2
		? value instanceof Node
		// FF3, IE7, Chrome 1 and Opera 9
		: typeof value === "object" && typeof value.nodeType === "number" && typeof value.nodeName === "string");
};

/**
 * Vraci <code>true</code> v pripade, ze parametr je typu <code>DOM element</code>,
 * jinak vraci <code>false</code>. Pojud je paramnetr <code>null</code> nebo
 * <code>undefined</code>, tak vati <code>false</code>.
 * 
 * @param {Object} value Testovana hodnota
 */
DP.isDomElement = function (value) {
	return value !== null && typeof value !== 'undefined' && (typeof HTMLElement instanceof Object
		// DOM2
		? value instanceof HTMLElement
		// FF3, IE7, Chrome 1 and Opera 9
		: typeof value === "object" && value !== null && value.nodeType === 1 && typeof value.nodeName === "string");
};

/**
 * Otestuje prvni parametr metody a pokud neni null ani undefined, tak ho vrati.
 * Pokud test selze, tak vyhodi vyjimku DP.NullPointerException.
 * <p>
 * DP.checkNotNull(value [, message [, funcParam1...]]) </p>
 * <p>
 * Priklady:</p>
 * <pre>
 * DP.checkNotNull(value, "Nesmi byt null");
 * DP.checkNotNull(value, function () {return "Nesmi byt null";});
 * DP.checkNotNull(
 *    value,
 *    function (params) {return "Prvek ID=" + params[0] + " nesmi byt null";},
 *    itemId);</pre>
 * 
 * @param {Object} value
 * @param {String|Function} message nepovinny
 * @param {Object} funcParam1 nepovinny
 * 
 * @returns {Object} Vrati nezmenenou testovanou hodnotu.
 * 
 * @throws {DP.NullPointerException} Pokud prvni parametr je null nebo undefined
 */
DP.checkNotNull = function () {
	if (arguments.length === 0) {
		// nejmene jeden argument musi byt zadan
		throw new DP.IllegalArgumentException("DP.checkNotNull() call with missing arguments.");
	}
	const args = Array.prototype.slice.call(arguments);
	const value = args[0];
	if (DP.isNotNull(value) && DP.isNotUndefined(value)) {
		// podminka je splnena, vratim testovanou hodnotu
		return value;
	}
	const msgSupplier = args[1];
	// ziskam subarray od indexu 2 do konce 
	const msgParams = args.slice(2);
	if (DP.isFalse(msgSupplier)) {
		throw new DP.NullPointerException("Value must not be null.");
	}
	// msgSupplier muze byt funkce nebo string
	const message = (typeof msgSupplier === 'function')
		? (msgParams.length === 0 ? msgSupplier() : msgSupplier(msgParams))
		: msgSupplier;
	throw new DP.NullPointerException(message);
};

/**
 * Otestuje jestli ma pravdivostni vyraz 'expression' hodnotu true. Pokud test
 * selze, tak vyhodi vyjimku DP.IllegalArgumentException.
 * <p>
 * DP.checkArgument(expression [, message [, funcParam1...]]) </p>
 * <p>
 * Priklady:</p>
 * <pre>
 * DP.checkArgument(value > 100, "Musi byt > 100");
 * DP.checkArgument(value > 100, function () {return "Musi byt > 100";});
 * DP.checkArgument(
 *    value > 100,
 *    function (params) {return "Prvek ID=" + params[0] + " musi byt > 100";},
 *    itemId);</pre>
 * 
 * @param {Boolean} expression
 * @param {String|Function} message nepovinny
 * @param {Object} funcParam1 nepovinny
 * 
 * @throws {DP.IllegalArgumentException} Pokud ma expression hodnotu false
 */
DP.checkArgument = function () {
	if (arguments.length === 0) {
		// nejmene jeden argument musi byt zadan
		throw new DP.IllegalArgumentException("DP.checkArgument() call with missing arguments.");
	}
	const args = Array.prototype.slice.call(arguments);
	const expression = args[0];
	if (DP.isTrue(expression)) {
		// podminka je splnena, ukoncim metodu
		return;
	}
	const msgSupplier = args[1];
	// ziskam subarray od indexu 2 do konce 
	const msgParams = args.slice(2);
	if (DP.isFalse(msgSupplier)) {
		throw new DP.IllegalArgumentException("Argument has illegal value.");
	}
	// msgSupplier muze byt funkce nebo string
	const message = (typeof msgSupplier === 'function')
		? (msgParams.length === 0 ? msgSupplier() : msgSupplier(msgParams))
		: msgSupplier;
	throw new DP.IllegalArgumentException(message);
};

/**
 * Otestuje jestli ma pravdivostni vyraz 'expression' hodnotu true. Pokud test
 * selze, tak vyhodi vyjimku DP.IllegalStateException.
 * <p>
 * DP.checkState(expression [, message [, funcParam1...]]) </p>
 * <p>
 * Priklady:</p>
 * <pre>
 * DP.checkState(obj.isReady(), "Musi byt pripraven");
 * DP.checkState(obj.isReady(), function () {return "Musi byt pripraven";});
 * DP.checkState(
 *    obj.isReady(),
 *    function (params) {return "Prvek ID=" + params[0] + " musi byt pripraven";},
 *    itemId);</pre>
 * 
 * @param {Boolean} expression
 * @param {String|Function} message nepovinny
 * @param {Object} funcParam1 nepovinny
 * 
 * @throws {DP.IllegalStateException} Pokud ma expression hodnotu false
 */
DP.checkState = function () {
	if (arguments.length === 0) {
		// nejmene jeden argument musi byt zadan
		throw new DP.IllegalStateException("DP.checkState() call with missing arguments.");
	}
	const args = Array.prototype.slice.call(arguments);
	const expression = args[0];
	if (DP.isTrue(expression)) {
		// podminka je splnena, ukoncim metodu
		return;
	}
	const msgSupplier = args[1];
	// ziskam subarray od indexu 2 do konce 
	const msgParams = args.slice(2);
	if (DP.isFalse(msgSupplier)) {
		throw new DP.IllegalStateException("Illegal state.");
	}
	// msgSupplier muze byt funkce nebo string
	const message = (typeof msgSupplier === 'function')
		? (msgParams.length === 0 ? msgSupplier() : msgSupplier(msgParams))
		: msgSupplier;
	throw new DP.IllegalStateException(message);
};

/**
 * Pokud je funkce volana v produkcnim prostredi, tak vraci <code>true</code>.
 * 
 * @returns {Boolean}
 */
DP.isProduction = function () {
	if (DP.flags.check(DP.constants.READY_FLAG_NAME)) {
		return DP.context.isProduction;
	}
	// pokud nedoslo k inicializaci prostredi, hlasim problem v logu a chovam se
	// jako bych byl v produkci
	DP.log.error("Prostredi DP neni inicializovane!");
	return true;
};

/**
 * Spusti funkci <code>callback</code>, pokud je v kontextu produkcniho
 * prostredi.
 * 
 * @param {Function} callback
 */
DP.ifProduction = function (callback) {
	if (DP.isProduction()) {
		return callback();
	}
};

/**
 * Spusti funkci <code>callback</code>, pokud neni v kontextu produkcniho
 * prostredi.
 * 
 * @param {Function} callback
 */
DP.unlessProduction = function (callback) {
	if (!DP.isProduction()) {
		return callback();
	}
};

/**
 * Pokud je klientske zarizeni mobilni (phone, tablet), tak vraci
 * <code>true</code>.
 * <p>
 * Podminkou spravneho chovani funkce je inicializovane prostredi DP.
 * Pokud prostredi neni v okamziku volani inicializovane, tak funkce vraci 
 * <code>true</code>, i kdyz to nemusi byt pravda.</p>
 * 
 * @see Funkce <code>DP.ifMobileDevice(callback)</code> odstranuje problem
 * nutnosti ohlidat predchozi inicializaci prostredi DP.
 * 
 * @returns {Boolean}
 */
DP.isMobileDevice = function () {
	if (DP.flags.check(DP.constants.READY_FLAG_NAME)) {
		return DP.context.client.__mobileOrTablet;
	}
	// pokud nedoslo k inicializaci prostredi, hlasim problem v logu a chovam se
	// jako bych byl na desktopu
	DP.log.error("Prostredi DP neni inicializovane!");
	return false;
};

/**
 * Spusti funkci <code>callback</code>, pokud je klientske zarizeni mobilni.
 * Protoze detekce zarizeni vyzaduje inicializovane prostredi DP, tak se
 * <code>callback</code> provede az v okamziku "DP.ready", tj. po inicializaci.
 * 
 * @param {Function} callback
 */
DP.ifMobileDevice = function (callback) {
	DP.ready(function () {
		if (DP.isMobileDevice()) {
			return callback();
		}
	});
};


/*
 *	UTILITIES
 */

/**
 * StringBuilder
 * 
 * @constructor
 * @param {String} initialValue
 */
DP.StringBuilder = function StringBuilder(initialValue) {
	this._buffer = new Array();
	if (DP.isNotUndefined(initialValue)) {
		this.append(initialValue);
	}
};

DP.StringBuilder.prototype.append = function (str) {
	if (DP.isNotUndefined(str)) {
		if (str === null) {
			this._buffer.push("null");
		} else if (str === true) {
			this._buffer.push("true");
		} else if (str === false) {
			this._buffer.push("false");
		} else {
			this._buffer.push(str);
		}
	}
	return this;
};

DP.StringBuilder.prototype.clear = function () {
	this._buffer = [];
	return this;
};

DP.StringBuilder.prototype.toString = function () {
	return this._buffer.join("");
};

/**
 * Mutex - a type of lock.
 * 
 * @constructor
 * 
 * @see https://blog.jcoglan.com/2016/07/12/mutexes-and-javascript/
 */
DP.Mutex = function Mutex() {
	this._busy = false;
	this._queue = [];
};

/**
 * Tato metoda zajisti, ze jednotlive funkce <code>task()</code>, ktere jsou
 * predany funkci <code>synchronize()</code>, budou provedeny seriove za sebou.
 * Nasledujici funkce <code>task()</code> je spustena vzdy nejdrive po skonceni
 * predchozi, ostatni jsou blokovany.
 * <p>
 * Priklad:</p>
 * <pre>
 * var mutex = new DP.Mutex();
 * var sharedData = {...};
 * 
 * function manipulateData() {
 * 	var promise = mutex.synchronize(function () {
 * 		return new Promise(function(onFulfilled, onRejected) {
 * 			... read from sharedData
 * 			... write to sharedData
 * 			
 * 			if ( everything turned out fine ) {
 * 				onFulfilled(result);
 * 			} else {
 * 				onRejected(new Error("It's broke"));
 * 			}
 * 		});
 * 	});
 * 	return promise;
 * }
 * 
 * manipulateData()
 * 	.then(handleResult);
 * 	.catch(logFail);
 * </pre>
 * 
 * @param {Function} task Funkce operujici s chranenymi zdroji (daty).
 * Funkce musi vracet instanci tridy <code>Promise</code>.
 * 
 * @returns {Promise} <code>Promise</code> jako prepravka vysledku funkce
 * <code>task()</code> predane v argumentu.
 */
DP.Mutex.prototype.synchronize = function (task) {
	let that = this;
	//  'volajicimu' chceme predat vysledek funkce task()
	return new Promise(function (resolveFn, rejectFn) {
		that._queue.push([task, resolveFn, rejectFn]);
		if (!that._busy) {
			// pokud je mutex volny, zacny se zpracovanim obsahu fronty
			that._dequeue();
		}
	});
};

DP.Mutex.prototype._dequeue = function () {
	this._busy = true;
	let next = this._queue.shift();
	if (next) {
		this._execute(next);
	} else {
		this._busy = false;
	}
};

DP.Mutex.prototype._execute = function (taskRecord) {
	let task = taskRecord[0];
	let resolveFn = taskRecord[1];
	let rejectFn = taskRecord[2];
	let that = this;
	task()
		// When we execute the task, we bind the (resolve, reject) functions to its promise,
		// which passes the result of task() through to the promise returned from synchronize().
		.then(resolveFn, rejectFn)
		// Continues to process queued functions even if one of them fails.
		.then(function () {
			that._dequeue();
		}, function () {
			that._dequeue();
		});
};

DP.randomString = function (length) {
	DP.checkArgument(length > 0, "Delka nahodneho retezce musi byt kladne cislo.");
	let res = "";
	for (var i = 0; i < length; i++) {
		// ASCII/UTF-8  a-z
		let charCode = Math.floor(Math.random() * (122 - 97)) + 97;
		res += String.fromCharCode(charCode);
	}
	return res;
};

/**
 * A container object which may or may not contain a non-null value.
 * If a value is present, <code>isPresent()</code> will return <code>true</code>
 * and <code>get()</code> will return the value.
 * 
 * // private
 * @constructor Constructs an empty instance.
 */
DP.Optional = function Optional() {
	this._value = null;
};

// Generally only one empty instance, should exist.
DP.Optional.EMPTY = new DP.Optional();

/**
 * Returns an empty <code>DP.Optional</code> instance. No value is present for
 * this Optional.
 *
 * @static
 * @returns {DP.Optional}
 */
DP.Optional.empty = function () {
	return DP.Optional.EMPTY;
};

/**
 * Returns an <code>DP.Optional</code> with the specified present non-null value.
 *
 * @static
 * @param {Object} value the value to be present, which must be non-null
 * @returns {DP.Optional} an <code>DP.Optional</code> with the value present
 * @throws {DP.NullPointerException} if value is null
 */
DP.Optional.of = function (value) {
	let opt = new DP.Optional(); // is empty
	opt._value = DP.checkNotNull(value); // sets the value
	return opt;
};

/**
 * Returns an <code>DP.Optional</code> describing the specified value,
 * if non-null, otherwise returns an empty <code>DP.Optional<code>.
 * 
 * @static
 * @param {Object} value the possibly-null value to describe
 * @returns {DP.Optional} an <code>DP.Optional</code> with a present value if
 * the specified value is non-null, otherwise an empty <code>DP.Optional<code>
 */
DP.Optional.ofNullable = function (value) {
	return (DP.isUndefined(value) || DP.isNull(value))
		? DP.Optional.empty()
		: DP.Optional.of(value);
};

/**
 * If a value is present in this <code>DP.Optional</code>, returns the value,
 * otherwise throws <code>DP.NoSuchElementException</code>.
 *
 * @return {Object} the non-null value held by this <code>DP.Optional</code>
 * @throws {DP.NoSuchElementException} if there is no value present
 */
DP.Optional.prototype.get = function () {
	if (this._value === null) {
		throw new DP.NoSuchElementException("No value present");
	}
	return this._value;
};

/**
 * Return <code>true</code> if there is a value present,
 * otherwise <code>false</code>.
 */
DP.Optional.prototype.isPresent = function () {
	return this._value !== null;
};

/**
 * If a value is present, invoke the specified consumer with the value,
 * otherwise do nothing.
 *
 * @param {Function} consumer <code>consumer(value)</code> to be executed if
 * a value is present
 * @throws {DP.NullPointerException} if value is present and
 * <code>consumer</code> is null
 */
DP.Optional.prototype.ifPresent = function (consumer) {
	if (this._value !== null) {
		DP.checkNotNull(consumer);
		consumer(this._value);
	}
};

/**
 * If a value is present, and the value matches the given predicate,
 * return an <code>DP.Optional</code> describing the value, otherwise return an
 * empty <code>DP.Optional</code>.
 *
 * @param {Function} predicate a <code>predicate(value):boolean</code> to apply
 * to the value, if present
 * @returns {DP.Optional} an <code>DP.Optional</code> describing the value of
 * this <code>DP.Optional</code> if a value is present and the value matches
 * the given predicate, otherwise an empty <code>DP.Optional</code>
 * @throws {DP.NullPointerException} if the predicate is null
 */
DP.Optional.prototype.filter = function (predicate) {
	DP.checkNotNull(predicate);
	if (!this.isPresent()) {
		return this;
	}
	DP.checkNotNull(predicate);
	return predicate(this._value) ? this : DP.Optional.empty();
};

/**
 * If a value is present, apply the provided mapping function to it, and if
 * the result is non-null, return an <code>DP.Optional</code> describing
 * the result. Otherwise return an empty <code>DP.Optional</code>.
 *
 * @param {Function} mapper a <code>mapper(value):Object</code> function to
 * apply to the value, if present
 * @returns {DP.Optional} an <code>DP.Optional</code> describing the result of
 * applying a mapping function to the value of this <code>DP.Optional<code>,
 * if a value is present, otherwise an empty <code>DP.Optional</code>
 * @throws {DP.NullPointerException} if the mapping function is null
 */
DP.Optional.prototype.map = function (mapper) {
	if (!this.isPresent()) {
		return this;
	}
	DP.checkNotNull(mapper);
	return DP.Optional.ofNullable(mapper(this._value));
};

/**
 * Return the value if present, otherwise return <code>other</code>.
 *
 * @param {Object} other the value to be returned if there is no value present,
 * may be null
 * @returns {Object} the value, if present, otherwise <code>other</code>
 */
DP.Optional.prototype.orElse = function (other) {
	return this._value !== null ? this._value : other;
};

/**
 * Return the value if present, otherwise invoke <code>other</code> and return
 * the result of that invocation.
 *
 * @param {Function} otherSupplier a <code>otherSupplier():Object</code> whose
 * result is returned if no value is present
 * @returns {Object} the value if present otherwise the result of
 * <code>otherSupplier()</code>
 * @throws {DP.NullPointerException} if value is not present and
 * <code>otherSupplier</code> is null
 */
DP.Optional.prototype.orElseGet = function (otherSupplier) {
	if (!this.isPresent()) {
		return this._value;
	}
	DP.checkNotNull(otherSupplier);
	return otherSupplier();
};


/**
 * Shrnuje podrobnosti o clientskem zarizeni, OS a webovem prohlizeci.
 * Inicializuje se automaticky na "document ready" a instance je pristupna
 * pomoci: <code>DP.context.client</code>.
 *
 * @constructor Vytvori prazdnou instanci.
 */
DP.ClientDetails = function ClientDetails() {
	let undefined;

	this.__mobileOrTablet = false;
	this.userAgent = null;
	this.browser = {
		name: undefined,
		major: undefined,
		version: undefined
	};
	this.cpu = {
		architecture: undefined
	};
	this.device = {
		model: undefined,
		type: undefined,
		vendor: undefined
	};
	this.engine = {
		name: undefined,
		version: undefined
	};
	this.os = {
		name: undefined,
		version: undefined
	};
};

// Generally only one empty instance, should exist.
DP.ClientDetails.EMPTY = new DP.ClientDetails();

/**
 * Vrati <code>true</code>, pokud je objekt prazdny (neinicializovany).
 * 
 * @returns {Boolean}
 */
DP.ClientDetails.prototype.isEmpty = function () {
	return this.userAgent === null;
};


/*
 *	LOGGING
 */

/**
 * Logger
 * 
 * @constructor
 */
DP.Logger = function Logger() {
	this.COLOR_DEBUG = "background: #aaffaa;";
	this.COLOR_INFO = "background: #aaaaff;";
	this.COLOR_WARNING = "background: #ffaa55; color: #000000;";
	this.COLOR_ERROR = "background: #ff5555; color: #000000;";
	this.COLOR_FATAL = "background: #000000; color: #ffffff;";

	// defaultne se v konzoli loguje jen ERROR a FATAL
	this.loggingLevel = DP.Logger.SeverityLevelEnum.ERROR;
};

DP.Logger.prototype.SeverityLevelEnum = {
	DEBUG: 1,
	INFO: 2,
	WARNING: 3,
	ERROR: 4,
	FATAL: 5
};
// public static class DP.Logger.SeverityLevelEnum
DP.Logger.SeverityLevelEnum = DP.Logger.prototype.SeverityLevelEnum;

DP.Logger.prototype.setLoggingLevel = function (severityLevel) {
	DP.checkNotNull(severityLevel, "Severity level must not be null");
	this.loggingLevel = severityLevel;
};

/**
 * @private
 */
DP.Logger.prototype._doLog = function (severityLevel, args) {
	if (window.console && window.console.log) {
		let loggedObject = (args.length === 1) ? args[0] : args;
		switch (severityLevel) {
			case DP.Logger.SeverityLevelEnum.DEBUG:
				window.console.log("%c DEBUG: ", this.COLOR_DEBUG, loggedObject);
				break;
			case DP.Logger.SeverityLevelEnum.INFO:
				window.console.log("%c INFO: ", this.COLOR_INFO, loggedObject);
				break;
			case DP.Logger.SeverityLevelEnum.WARNING:
				window.console.warn("%c WARNING: ", this.COLOR_WARNING, loggedObject);
				break;
			case DP.Logger.SeverityLevelEnum.ERROR:
				window.console.error("%c ERROR: ", this.COLOR_ERROR, loggedObject);
				break;
			case DP.Logger.SeverityLevelEnum.FATAL:
				window.console.error("%c FATAL: ", this.COLOR_FATAL, loggedObject);
				break;
		}
	}
};

DP.Logger.prototype.debug = function () {
	let severityLevel = DP.Logger.SeverityLevelEnum.DEBUG;
	if (this.loggingLevel === severityLevel) {
		this._doLog(severityLevel, arguments);
	}
};

DP.Logger.prototype.info = function () {
	let severityLevel = DP.Logger.SeverityLevelEnum.INFO;
	if (this.loggingLevel <= severityLevel) {
		this._doLog(severityLevel, arguments);
	}
};

DP.Logger.prototype.warn = function () {
	let severityLevel = DP.Logger.SeverityLevelEnum.WARNING;
	if (this.loggingLevel <= severityLevel) {
		this._doLog(severityLevel, arguments);
	}
};

DP.Logger.prototype.error = function () {
	let severityLevel = DP.Logger.SeverityLevelEnum.ERROR;
	if (this.loggingLevel <= severityLevel) {
		this._doLog(severityLevel, arguments);
	}
};

DP.Logger.prototype.fatal = function () {
	let severityLevel = DP.Logger.SeverityLevelEnum.FATAL;
	if (this.loggingLevel <= severityLevel) {
		this._doLog(severityLevel, arguments);
	}
};

DP.Logger.prototype.isDebugEnabled = function () {
	return this.loggingLevel === DP.Logger.SeverityLevelEnum.DEBUG;
};

DP.Logger.prototype.isInfoEnabled = function () {
	return this.loggingLevel <= DP.Logger.SeverityLevelEnum.INFO;
};

/**
 * Nastaveni globalniho loggeru
 */
DP.log = DP.log || new DP.Logger();


/*
 *	CACHE
 */

/**
 * Register typu [key, value]
 * 
 * @constructor
 */
DP.Register = function Register() {
	this._entries = {};
	this._size = 0;
};

/**
 * Vytvoreni registru z dvojic parametru (klic, hodnota).
 * <pre>
 * DP.Register.fromArray(array)
 * DP.Register.fromArray(key, value [, key2, value2 [, key3, value3...]])</pre>
 * 
 * @static
 * @param {Array}
 * @returns {DP.Register}
 */
DP.Register.fromArray = function () {
	const args = Array.prototype.slice.call(arguments);
	const argsCount = args.length;
	if (argsCount === 0) {
		// zadne parametry -> vratim prazdny registr
		return new DP.Register();
	}
	let entries = args;
	let size = argsCount;
	// pokud vstup je pole
	if (argsCount === 1 && typeof args[0] === "object" && args[0] instanceof Array) {
		entries = args[0];
		size = args[0].length;
	}
	DP.checkArgument(size % 2 === 0,
		function () {
			// message supplier
			return "Parametry musi byt dvojice (klic, hodnota) a jejich pocet musi byt sudy. Pocet parametru je " + size;
		}
	);
	let register = new DP.Register();
	for (var i = 0; i < size; i += 2) {
		register.put(entries[i], entries[i + 1]);
	}
	return register;
};

/**
 * Vlozi pod identifikatorem 'key' do registru hodnotu 'value'.
 * 
 * @param {String|Number} key Unikatni klic identifikujici ulozena data
 * @param {String|Number|Boolean|Object|Function} value Ukladana data
 * 
 * @throws {DP.NullPointerException} Pokud 'key' je <code>null</code>.
 * @throws {DP.IllegalArgumentException} Pokud 'value' je <code>undefined</code>.
 */
DP.Register.prototype.put = function (key, value) {
	// klic nesmi byt null ani undefined
	DP.checkNotNull(key, "Key must not be null");
	// hodnota nesmi byt undefined
	DP.checkArgument(DP.isNotUndefined(value), "Value must not be 'undefined'");

	let previous = this._entries[key];
	this._entries[key] = value;
	// pokud puvodni hodnota neexistuje, tak byla pridana nova polozka
	if (DP.isUndefined(previous)) {
		this._size += 1;
	}
	return previous;
};

/**
 * Vrati z registru data podle identifikatoru 'key'.
 * 
 * @param {String|Number} key Unikatni klic identifikujici ulozena data
 * 
 * @throws {DP.IllegalArgumentException} Pokud 'key' je null.
 */
DP.Register.prototype.get = function (key) {
	// klic musi byt uveden
	DP.checkNotNull(key, "Key must not be null");
	return this._entries[key];
};

/**
 * Odstrani z registru data ulozena pod identifikatorem 'key'.
 * 
 * @param {String|Number} key Unikatni klic identifikujici ulozena data
 * 
 * @throws {DP.IllegalArgumentException} Pokud 'key' je null.
 */
DP.Register.prototype.remove = function (key) {
	// klic musi byt uveden
	DP.checkNotNull(key, "Key must not be null");

	let previous = this._entries[key];
	// pokud puvodni hodnota existuje, tak dojde k odebrani polozky
	if (DP.isNotUndefined(previous)) {
		delete(this._entries[key]);
		this._size -= 1;
	}
	return previous;
};

/**
 * Vrati <code>true</code>, pokud registr obsahuje data pro klic 'key'.
 * 
 * @param {String|Number} key
 * @returns {Boolean}
 * 
 * @throws {DP.IllegalArgumentException} Pokud 'key' je null.
 */
DP.Register.prototype.contains = function (key) {
	// klic musi byt uveden
	DP.checkNotNull(key, "Key must not be null");
	return DP.isNotUndefined(this._entries[key]);
};

/**
 * Smaze z registru vsechna ulozena data.
 */
DP.Register.prototype.clean = function () {
	this._entries = {};
	this._size = 0;
};

/**
 * Vrati pocet polozek, ulozenych v registru.
 */
DP.Register.prototype.size = function () {
	return this._size;
};

/**
 * Vrati <code>true</code>, pokud je registr prazdny.
 */
DP.Register.prototype.isEmpty = function () {
	return this._size === 0;
};

/**
 * Vrati pole klicu.
 * 
 * @returns {Array}
 */
DP.Register.prototype.getKeys = function () {
	let keys = [];
	if (!this.isEmpty()) {
		for (var key in this._entries) {
			// pouze vlozene polozky
			if (this._entries.hasOwnProperty(key)) {
				let value = this._entries[key];
				// pouze nesmazane polozky
				if (DP.isNotUndefined(value)) {
					keys.push(key);
				}
			}
		}
	}
	return keys;
};

/**
 * Pro kazdou polozku registru provede dodanou funkci.
 * <pre>
 * register.forEachEntry( function(key, value) )</pre>
 * 
 * @param {function} consumer
 * 
 * @throws {DP.IllegalArgumentException} Pokud 'key' je null.
 */
DP.Register.prototype.forEachEntry = function (consumer) {
	for (var key in this._entries) {
		// pouze vlozene polozky
		if (this._entries.hasOwnProperty(key)) {
			let value = this._entries[key];
			// pouze nesmazane polozky
			if (DP.isNotUndefined(value)) {
				consumer(key, value);
			}
		}
	}
};

/**
 * Zalozeni globalniho registru dat podle klice typu String
 */
DP.cache = DP.cache || new DP.Register();

/**
 * Vrati soukromou cache podle uvedeneho jmena. Pokud cache neexistuje, tak je
 * vytvorena a vracena.
 * <p>
 * Privatni cache se ukladaji do globalni cache. Pokud se smaze globalni cache
 * <code>DP.cache.clean()</code>, tak se smazou take vsechny privatni. Privatni
 * cache maji k nazvu automaticky pridavan prefix "__".</p>
 * 
 * @param {String} name Nazev soukrome kese.
 * @returns {DP.Register}
 */
DP.cache.getPrivateCache = function (name) {
	let cacheKey = "__" + name;
	let privateCache = DP.cache.get(cacheKey);
	if (DP.isUndefined(privateCache) || DP.isNull(privateCache)) {
		// soukroma cache zatim neexistuje, tak ji zalozim
		privateCache = new DP.Register();
		DP.cache.put(cacheKey, privateCache);
		DP.log.debug("Zalozena privatni cache. Name=[" + name + "]");
	}
	return privateCache;
};

/**
 * Pro zadane <code>instanceId</code> vrati z cache instanci tridy
 * <code>objectClass</code>. Pokud instance v cache neexistuje, tak je zalozena,
 * vlozena do cache a vracena.
 * <p>
 * Pokud neni k dispozici funkce <code>factory</code>, tak se pri vytvareni
 * instance predava konstruktoru uvedene <code>instanceId</code>.</p>
 * 
 * @param {class} objectClass
 * @param {String|Number} instanceId
 * @param {Function} factory
 * @returns {Object}
 */
DP.getObject = function (objectClass, instanceId, factory) {
	DP.checkNotNull(objectClass, "Class must not be null");
	let _className = DP.getClassName(objectClass);
	DP.checkArgument(DP.isNotUndefined(_className) && _className !== "", "Argument must be named class: " + (typeof objectClass));
	//
	let _isService = _className.endsWith("Service");
	if (_isService) {
		// pokud jde o sluzbu, tak se argumenty instanceId a factory neuvadi
		instanceId = _className;
		factory = null;
	}
	// kontrola argumentu
	DP.checkNotNull(instanceId, "ID of " + _className + " must not be null");
	DP.checkArgument(instanceId !== "", "ID of " + _className + " must not be empty.");
	// ziskam soukromou cache
	let _privateCacheName = (_isService ? "service" : _className);
	let objectsByIdRegister = DP.cache.getPrivateCache(_privateCacheName);

	// zkusim ziskat instanci z registru
	let objectInstance = objectsByIdRegister.get(instanceId);
	if (DP.isUndefined(objectInstance) || DP.isNull(objectInstance)) {
		// instance pro dane ID zatim neexistuje, tak ji zalozim
		if (DP.isFunction(factory)) {
			objectInstance = factory();
		} else {
			objectInstance = new objectClass(instanceId);
		}
		objectsByIdRegister.put(instanceId, objectInstance);
		DP.log.debug("Vytvorena instance " + _className + ". ID=[" + instanceId + "]");
	}
	return objectInstance;
};

/**
 * Zalozeni globalniho registru priznaku typu Boolean.
 */
DP.flags = DP.flags || {_flags: new DP.Register()};

/**
 * Vrati puvodni hodnotu priznaku a nastavi novou hodnotu na <code>true</code>.
 * Defaultni hodnota priznaku je <code>false</code>.
 * 
 * @param {String} flagName Nazev priznaku
 * @returns {Boolean} Puvodni hodnota priznaku
 * 
 * @throws {DP.IllegalArgumentException} Pokud 'flagName' neni <code>String</code>.
 */
DP.flags.getThenSetTrue = function (flagName) {
	DP.checkArgument(DP.isString(flagName) && flagName !== "", "Nazev priznaku musi byt neprazdny retezec.");
	let flagValue = this._flags.get(flagName);
	if (DP.isFalse(flagValue)) {
		this._flags.put(flagName, true);
		// flagValue mohlo byt undefined, proto vracim explicitne FALSE
		return false;
	}
	// flag uz je nastaven na TRUE, zustava nastaven na TRUE
	return true;
};

/**
 * Vrati puvodni hodnotu priznaku a nastavi novou hodnotu na <code>false</code>.
 * Defaultni hodnota priznaku je <code>false</code>.
 * 
 * @param {String} flagName Nazev priznaku
 * @returns {Boolean} Puvodni hodnota priznaku
 * 
 * @throws {DP.IllegalArgumentException} Pokud 'flagName' neni <code>String</code>.
 */
DP.flags.getThenSetFalse = function (flagName) {
	DP.checkArgument(DP.isString(flagName) && flagName !== "", "Nazev priznaku musi byt neprazdny retezec.");
	let flagValue = this._flags.get(flagName);
	if (flagValue === true) {
		this._flags.remove(flagName);
		return true;
	}
	// flagValue mohlo byt undefined, proto vracim explicitne FALSE
	return false;
};

/**
 * Vrati soucasnou hodnotu priznaku. Defaultni hodnota priznaku je
 * <code>false</code>.
 * 
 * @param {String} flagName Nazev priznaku
 * @returns {Boolean} Soucasna hodnota priznaku
 * 
 * @throws {DP.IllegalArgumentException} Pokud 'flagName' neni <code>String</code>.
 */
DP.flags.check = function (flagName) {
	DP.checkArgument(DP.isString(flagName) && flagName !== "", "Nazev priznaku musi byt neprazdny retezec.");
	let flagValue = this._flags.get(flagName);
	return flagValue === true;
};

///**
// * Porovna hodnotu priynaku s hodnotou <code>expectedValue</code> a pokud jsou
// * shodne, tak flag nastavi na novou hodnotu <code>replacementValue</code>.
// * Funkce vraci puvodni hodnotu priznaku.
// * 
// * @param {String} flagName Nazev priznaku
// * @param {String} expectedValue Hodnota, se kterou se priznak porovnava
// * @param {String} replacementValue Nova hodnota priznaku
// * @returns {Boolean} Puvodni hodnota priznaku
// * 
// * @throws {DP.IllegalArgumentException} Pokud 'flagName' neni <code>String</code>.
// */
//DP.flags.compareThenSet = function (flagName, expectedValue, replacementValue) {
//	// TODO - je potreba kontrolovat expectedValue a replacementValue na typ boolean
//};


/*
 *	AJAX
 */

/**
 * Zalozeni namespace pro AJAX
 */
DP.ajax = DP.ajax || {};

DP.ajax.send = DP.sendAjaxRequest = function (params) {
	// default request headers
	var requestHeaders = {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"};
	// callback helpery
	var callbacks = {onSuccess: undefined, onError: undefined, onTimeout: undefined, onAbort: undefined, onParseError: undefined, onBefore: undefined, onComplete: undefined};
	for (var key in callbacks) {
		if (params[key]) {
			callbacks[key] = params[key];
			delete(params[key]);
		}
	}
	// rozsireni parametru
	params = $.extend({
		type: (params["method"] || "POST"),
		cache: (params["cache"] || false),
		timeout: (params["timeout"] || 10000),
		beforeSend: function (xhr) {
			let customHeaders = params["requestHeaders"];
			for (var headerName in requestHeaders) {
				if (customHeaders && customHeaders[ headerName ]) {
					// prepsani defaultni hodnoty hlavicky
					xhr.setRequestHeader(headerName, customHeaders[headerName]);
					delete(customHeaders[headerName]);
				} else {
					// pouziti defaultni hodnoty
					xhr.setRequestHeader(headerName, requestHeaders[headerName]);
				}
			}
			// nastaveni zbylych hlavicek
			if (customHeaders) {
				for (var headerName in customHeaders) {
					xhr.setRequestHeader(headerName, customHeaders[headerName]);
				}
			}
			if (callbacks.onBefore) {
				callbacks.onBefore(xhr);
			}
		},
		complete: function (xhr, textStatus) {
			if (callbacks.onComplete) {
				callbacks.onComplete(xhr, textStatus);
			}
		},
		success: function (data, textStatus, xhr) {
			if (callbacks.onSuccess) {
				callbacks.onSuccess(data, xhr, textStatus);
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			switch (textStatus) {
				case "timeout":
					// pozadavek nebylo mozne odeslat - server neodpovedel v pozadovanem case
					if (callbacks.onTimeout) {
						callbacks.onTimeout();
					} else {
						alert("Server neodpovídá, zkuste požadavek odeslat znovu.");
					}
					break;
				case "error":
					// nastala chyba pri zpracovani pozadavku
					if (callbacks.onError) {
						callbacks.onError(xhr.status, xhr.responseJSON);
					} else {
						alert("Při zpracování požadavku nastala chyba.");
					}
					break;
				case "abort":
					// odeslani pozadavku bylo zruseno
					if (callbacks.onAbort) {
						callbacks.onAbort();
					}
					break;
				case "parsererror":
					// odpovede serveru neobsahuje validni odpoved a nelze zpracovat
					if (callbacks.onParseError) {
						callbacks.onParseError();
					} else {
						alert("Při zpracování příchozího požaqdavku nastala chyba.");
					}
					break;
			}
		},
		statusCode: $.extend({
			// 200: function(xhr) {},
			// 405: function(xhr) {}
			// 500: function(xhr) {}
		}, params.statusCode || {})
	}, params);
	//DP.log.debug(params);
	//
	$.ajax(params);
	//
	return false;
};


/*
 *	DOM HELPER FUNCTIONS
 */

/**
 * Zalozeni namespace pro DOM
 */
DP.dom = DP.dom || {};

/**
 * Prida elementu jednu nebo vice CSS trid. Pokud uz element pridavanou tridu
 * ma, tak se trida preskoci a pokaracuje se pridanim dalsi tridy v poradi.
 * <p>
 * Pouziti:</p>
 * <pre>
 * let element = document.getElementById("unique");
 * 
 * DP.dom.addClass(element, "cls");
 * 
 * DP.dom.addClass(element, "c1 c2 c3");
 * 
 * DP.dom.addClass(element, "c1", "c2", ...);
 * 
 * let arr = ["c1", "c2", ...];
 * DP.dom.addClass(element, arr);</pre>
 * 
 * @param {DOMElement} domElement 
 * @param {String|Array} classNames 
 */
DP.dom.addClass = function () {
	const args = Array.prototype.slice.call(arguments);
	let domElement = args[0];
	let classNames = args.slice(1);
	DP.checkNotNull(domElement, "DOM element object must not be null.");
	DP.checkArgument(classNames.length !== 0, "CSS class name(s) must be defined.");
	//
	if (domElement.classList) {
		let _classNames = (classNames.length === 1 && typeof classNames[0] === "object" && classNames[0] instanceof Array) ? classNames[0] : classNames;
		for (let clsIdx = 0; clsIdx < _classNames.length; clsIdx++) {
			let classesToAdd = _classNames[clsIdx].split(" ");
			for (let i = 0; i < classesToAdd.length; i++) {
				let singleClassName = classesToAdd[i];
				if (DP.isTrue(singleClassName)) {
					domElement.classList.add(singleClassName);
				}
			}
		}
	} else {
		// For IE9 and earlier
		let currentClasses = domElement.className.split(" ");
		for (var clsIdx = 0; clsIdx < classNames.length; clsIdx++) {
			let _classNames = classNames[clsIdx];
			let classesToAdd = (typeof _classNames === "object" && _classNames instanceof Array) ? _classNames : _classNames.split(" ");
			for (let i = 0; i < classesToAdd.length; i++) {
				let singleClassName = classesToAdd[i];
				if (DP.isTrue(singleClassName) && currentClasses.indexOf(singleClassName) === -1) {
					domElement.className += " " + singleClassName;
					currentClasses.push(singleClassName);
				}
			}
		}
	}
};

/**
 * Odebere elementu jednu nebo vice CSS trid. Pokud element odebidanou tridu
 * nema, tak se trida preskoci a pokaracuje se odebiranim dalsi tridy v poradi.
 * <p>
 * Pouziti:</p>
 * <pre>
 * let element = document.getElementById("unique");
 * 
 * DP.dom.removeClass(element, "cls");
 * 
 * DP.dom.removeClass(element, "c1 c2 c3");
 * 
 * DP.dom.removeClass(element, "c1", "c2", ...);
 * 
 * let arr = ["c1", "c2", ...];
 * DP.dom.removeClass(element, arr);</pre>
 * 
 * @param {DOMElement} domElement 
 * @param {String|Array} classNames 
 */
DP.dom.removeClass = function () {
	const args = Array.prototype.slice.call(arguments);
	let domElement = args[0];
	let classNames = args.slice(1);
	DP.checkNotNull(domElement, "DOM element object must not be null.");
	DP.checkArgument(classNames.length !== 0, "CSS class name(s) must be defined.");
	//
	if (domElement.classList) {
		let _classNames = (classNames.length === 1 && typeof classNames[0] === "object" && classNames[0] instanceof Array) ? classNames[0] : classNames;
		for (let clsIdx = 0; clsIdx < _classNames.length; clsIdx++) {
			let classesToAdd = _classNames[clsIdx].split(" ");
			for (let i = 0; i < classesToAdd.length; i++) {
				let singleClassName = classesToAdd[i];
				if (DP.isTrue(singleClassName)) {
					domElement.classList.remove(singleClassName);
				}
			}
		}
	} else {
		// For IE9 and earlier
		for (var clsIdx = 0; clsIdx < classNames.length; clsIdx++) {
			let _classNames = classNames[clsIdx];
			let classesToRemove = (typeof _classNames === "object" && _classNames instanceof Array) ? _classNames : _classNames.split(" ");
			for (let i = 0; i < classesToRemove.length; i++) {
				let singleClassName = classesToRemove[i];
				if (DP.isTrue(singleClassName)) {
					let expression = new RegExp("\\b\\s*" + singleClassName + "\\b", "g");
					domElement.className = domElement.className.replace(expression, "");
				}
			}
		}
	}
};

/**
 * Vrati <code>true</code>, pokud element ma nastavenou uvedenou CSS tridu.
 * 
 * @param {DOMElement} domElement
 * @param {String} className
 * @returns {Boolean}
 */
DP.dom.hasClass = function (domElement, className) {
	DP.checkNotNull(domElement, "DOM element object must not be null.");
	DP.checkNotNull(className, "CSS class name must not be null.");
	DP.checkArgument(DP.isTrue(className), "CSS class name must not be empty.");
	if (domElement.classList) {
		return domElement.classList.contains(className);
	} else {
		// For IE9 and earlier
		let expression = new RegExp("\\b" + className + "\\b", "g");
		return expression.test(domElement.className);
	}
};

/**
 * Odstrani z dokumentu predany element a vrati <code>true</code>. Pokud element
 * nelze odstranit, tak neprovede nic a vrati </code>false</code>.
 * 
 * @param {HTMLElement} element
 * @returns {Boolean}
 */
DP.dom.removeElement = function (element) {
	DP.checkArgument(DP.isDomElement(element), "Argument must be DOM element.");
	let parent = element.parentElement;
	if (parent !== null) {
		parent.removeChild(element);
		return true;
	}
	return false;
};

/**
 * Prepise v dokumentu predany <code>element</code> hodnotou <code>replacement</code>.
 * Pokud <code>replacement</code> je <code>null</code>, <code>undefined</code>,
 * <code>""</code> nebo prazdny <code>jQuery</code> objekt, tak je element
 * smazana a neni nicim nahrazen.
 * <p>
 * Pokud je predana funkce <code>showEffectFunction</code> provede se po nahrazeni
 * elementu <code>element</code> pozadovana animace. Funkce musi byt deklarovana
 * jako <code>function effect(jQuery object) { ... }</code>.</p>
 * <p>
 * Priklad pouziti:</p>
 * <pre>
 * let element = document.getElementById("639675761");
 * let replacement = $("section.articles div.row");
 * 
 * DP.dom.replaceElement_(element, replacement, function (objectJQ) { objectJQ.fadeIn(); });
 * </pre>
 * 
 * @param {HTMLElement} element
 * @param {HTMLElement|jQuery|String} replacement
 * @param {Function} showEffectFunction
 */
DP.dom.replaceElement = function (element, replacement, showEffectFunction) {
	DP.checkArgument(DP.isDomElement(element), "Argument must be DOM element.");
	DP.checkArgument(DP.isUndefined(showEffectFunction) || DP.isNull(showEffectFunction) || DP.isFunction(showEffectFunction),
			"Effect must be function.");
	// pokud je replacement prazdny
	if (DP.isUndefined(replacement) || DP.isNull(replacement) || replacement === "") {
		DP.dom.removeElement(element);
	}
	
	// vytvorim funkci, ktera provede inicializaci jQuery objektu pro "show efekt"
	let initEffect = DP.Optional.ofNullable(showEffectFunction)
			// pokud je efekt nastaven na "no operation", tak se nema aplikovat
			.filter(function (showFn) { return showFn !== DP.function.noop; })
			// pokud je nastavena funkce efektu, vratim inicializacni funkci
			.map(function (showFn) {
				let fn = function (replacementJQ) {
					replacementJQ.hide();
				};
				return fn;
			})
			// pokud parametry nastaveny nejsou, vratim "no opretaion"
			.orElse(DP.function.noop);
	
	// funkce, ktera nad jQuery objektem provede pozadovany "show efekt"
	let applyEfect = DP.Optional.ofNullable(showEffectFunction)
			// pokud parametry nastaveny nejsou, vratim "no opretaion"
			.orElse(DP.function.noop);
	
	// pokud nahrazuji DOM Nodem, provedu jednoduche nahrazeni pres parenta
	if (DP.isDomNode(replacement)) {
		initEffect($(replacement));
		// replace
		element.parentElement.replaceChild(replacement, element);
		// effect
		applyEfect($(replacement));
		return;
	}
	// pokud nahrazuji jQuery objektem, tak zalezi, kolik elementu obsahuje
	if (DP.isJQueryObject(replacement)) {
		let selectedElementsCount = replacement.length;
		if (selectedElementsCount === 0) {
			DP.log.warn("Relpacement je prazdy jQuery objekt.");
			DP.dom.removeElement(element);
		} else {
			let fragment = document.createDocumentFragment();
			for (var i = 0; i < selectedElementsCount; i++) {
				fragment.appendChild(replacement[i]);
			}
			initEffect(replacement);
			// replace
			element.parentElement.replaceChild(fragment, element);
			// effect
			applyEfect(replacement);
		}
		return;
	}
	// pokud nahrazuji HTML kodem v retezci, tak zajistim, aby byl spravne interpretovan
	if (DP.isString(replacement)) {
		let fragment = document.createDocumentFragment();
		{
			// DocumentFragment neposkytuje atribut innerHTML, proto se musi
			// pouzit pomocny element
			let tempElement = document.createElement('div');
			tempElement.innerHTML = replacement;
			initEffect($(tempElement).children());
			while (tempElement.firstChild) {
				var child = tempElement.removeChild(tempElement.firstChild);
				fragment.appendChild(child);
			}
		}
		let parentJQ = $(element.parentElement);
		// replace
		element.parentNode.replaceChild(fragment, element);
		// effect
		applyEfect(parentJQ.children());
	}
};

/**
 * Do predaneho elementu <code>element</code> vlozi hodnotou <code>content</code>,
 * tim prepise veskery puvodni obsah elementu. Pokud <code>content</code> je
 * <code>null</code>, <code>undefined</code>, <code>""</code> nebo prazdny
 * <code>jQuery</code> objekt, tak je obsah elementu smazan a jeho obsah bude
 * prazdny.
 * 
 * @param {HTMLElement} element
 * @param {HTMLElement|jQuery|String} content
 */
DP.dom.insertIntoElement = function (element, content) {
	DP.checkArgument(DP.isDomElement(element), "Argument must be DOM element.");
	// nejprve smazu obsah elementu
	element.innerHTML = "";
	// pokud je content prazdny, tak koncim
	if (DP.isUndefined(content) || DP.isNull(content) || content === "") {
		return;
	}
	// pokud vkladam DOM Node
	if (DP.isDomNode(content)) {
		element.appendChild(content);
		return;
	}
	// pokud vkladam jQuery objekt, tak zalezi, kolik elementu obsahuje
	if (DP.isJQueryObject(content)) {
		let selectedElementsCount = content.length;
		if (selectedElementsCount === 0) {
			DP.log.warn("Vkladani prazdneho jQuery objektu.");
		} else {
			let fragment = document.createDocumentFragment();
			for (var i = 0; i < selectedElementsCount; i++) {
				fragment.appendChild(content[i]);
			}
			element.appendChild(fragment);
		}
		return;
	}
	// pokud nahrazuji HTML kodem v retezci, tak zajistim, aby byl spravne interpretovan
	if (DP.isString(content)) {
		element.innerHTML = content;
	}
};


/*
 *	POLYFILL
 */

if (!Array.prototype.filter) {
	/**
	 * Array.filter(func) polyfill.
	 * <p>
	 * Pouziti:</p>
	 * <pre>
	 * var pathParts = document.location.pathname.split('/').filter(function (f) {
	 * 	return f;
	 * });</pre>
	 */
	Array.prototype.filter = function (func, thisArg) {
		'use strict';
		if (!((typeof func === 'Function') && this))
			throw new TypeError();
		var len = this.length >>> 0,
			res = new Array(len), // preallocate array
			c = 0, i = -1;
		if (thisArg === undefined)
			while (++i !== len)
				// checks to see if the key was set
				if (i in this)
					if (func(t[i], i, t))
						res[c++] = t[i];
					else
						while (++i !== len)
							// checks to see if the key was set
							if (i in this)
								if (func.call(thisArg, t[i], i, t))
									res[c++] = t[i];
		res.length = c; // shrink down array to proper size
		return res;
	};
}

if (!String.prototype.endsWith) {
	/**
	 * Tato metoda umožní zjistit, zda řetězec končí znaky jiného řetězce.
	 * Prohledávání je case-sensitive.
	 * <p>
	 * Použití:</p>
	 * <pre>
	 * var str = "Hello world, welcome to the universe.";
	 * var n = str.endsWith("universe.");
	 * </pre>
	 * 
	 * @param {String} searchString Znaky hledané na konci tohoto řetězce.
	 * @param {Number} position Volitelné. Omezení prohledávané délky řetězce.
	 * Výchozí hodnota je skutečná délka řetězce.
	 * 
	 * @returns {Boolean}
	 */
	String.prototype.endsWith = function (searchString, position) {
		var subjectString = this.toString();
		if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
			position = subjectString.length;
		}
		position -= searchString.length;
		var lastIndex = subjectString.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};
}

if (!String.prototype.startsWith) {
	/**
	 * Tato metoda umožní zjistit, zda řetězec začíná znaky jiného řetězce.
	 * Prohledávání je case-sensitive.
	 * <p>
	 * Použití:</p>
	 * <pre>
	 * var str = "Hello world, welcome to the universe.";
	 * var n = str.startsWith("Hello");
	 * </pre>
	 * 
	 * @param {String} searchString Znaky hledané na začátku tohoto řetězce.
	 * @param {Number} position Volitelné. Omezení prohledávané délky řetězce.
	 * Výchozí hodnota je 0.
	 * 
	 * @returns {Boolean}
	 */
	Object.defineProperty(String.prototype, 'startsWith', {
		value: function (searchString, position) {
			position = !position || position < 0 ? 0 : +position;
			return this.substring(position, position + searchString.length) === searchString;
		}
	});
}


/*
 *	SERVICES
 */

/**
 * Vytvori instanci sluzby videi.
 * 
 * @constructor
 */
DP.VideoService = function VideoService() {
	this.PLAYBACK_SUBMIT_OK = "OK";
	//
	this._playbackSubmits = new DP.Register();
};

/**
 * Zaznamena prehrani videa podle jeho Asset ID.
 * 
 * @param {Number} videoId
 * @param {Number} responseTimeout
 * @param {Number} delayMillis
 */
DP.VideoService.prototype.submitVideoPlayback = function (videoId, responseTimeout, delayMillis) {
	DP.checkNotNull(videoId, "Video ID must not be null.");
	// pokud uz video bylo zaznamenano, tak koncim
	let res = this._playbackSubmits.get(videoId);
	if (res === this.PLAYBACK_SUBMIT_OK) {
		return;
	}

	let timeout = 10000;
	let delay = 10000;
	// pokud je zadan timeout, tak se pouzije
	if (DP.isTrue(responseTimeout)) {
		timeout = responseTimeout;
	}
	// pokud je zadano odlozeni requestu, tak se pouzije
	if (DP.isTrue(delayMillis)) {
		delay = delayMillis;
	}

	let that = this;
	let onCompleteFn = function (xhr, textStatus) {
		if (textStatus === "success") {
			that._playbackSubmits.put(videoId, that.PLAYBACK_SUBMIT_OK);
		} else {
			DP.log.error("Nepodariolo se zaznamenat prehrani videa [" + videoId + "]: status " + xhr.status + " / " + textStatus);
		}
	};

	let requestParams = {
		url: DP.context.baseUrl + "/record-video-playback",
		timeout: timeout,
		data: {videoId: videoId},
		onComplete: onCompleteFn,
		onError: DP.function.noop,
		onTimeout: DP.function.noop
	};

	let timer = setTimeout(function () {
		DP.ajax.send(requestParams);
	}, delay);

	// ulozim timer pro pripadne pozdejsi zruseni zaznamenani statistiky
	this._playbackSubmits.put(videoId, timer);
};

/**
 * Pokud dosud nebyla odeslana informace o spusteni videa, tak se odeslani
 * zrusi.
 * 
 * @param {Number} videoId
 */
DP.VideoService.prototype.suppressVideoPlayback = function (videoId) {
	let timer = this._playbackSubmits.get(videoId);
	if (DP.isNotUndefined(timer) && timer !== this.PLAYBACK_SUBMIT_OK) {
		clearTimeout(timer);
		this._playbackSubmits.remove(videoId);
	}
};


/*
 *	PAGINATION
 */

/**
 * Pager je objekt, ktery zajistuje prechod na dalsi/predchozi stranky v ramci
 * strankovaneho vypisu polozek.
 * 
 * @constructor
 * @param {Number|String} id Unikatni ID strankovace. Pokud není zadán selektor,
 * tak se ID použije jako selektor "wrapper elementu" metadat pro strankovani.
 * @param {String} selector Nepovinný selektor elementu s metadaty pro strankovani.
 * Pokud je zadán, musí se vyhodnotit na jedinný element na stránce, jinak je
 * vyhozena výjimka.
 * @returns {DP.Pager} Vraci novou instanci pageru. Pokud neni zadano ID nebo
 * element s metadaty neni na stance nalezen, tak vrati prazdny pager.
 */
DP.Pager = function Pager(id, selector) {
	// defaultni stav (prazdny/neaktivni pager)
	this._id = null;
	this._urlBuilder = null;
	this._itemsTotalCount = 0;
	this._pagesCount = 0;
	this._currentPageIndex = 0;
	// pointery
	this._prevPagePointerElementId = null;
	this._nextPagePointerElementId = null;
	// registry
	this._hooks = new DP.Register();
	this._retrySubmitPage = new DP.Register();
	// efekt nacteni stranky
	this._loadEffectFunction = DP.function.noop;

	// pokud parametr byl zadan, pak se pravdepodobne nejedna o konstrukci prazdneho pageru
	if (DP.isNotEmpty(id)) {
		let _selector = DP.isNotEmpty(selector)
			? selector
			: "#" + id + " .pager-metadata";
		let pagerMetadataJQ = $(_selector);

		// cilem selektoru smi byt maximalne jeden element
		if (pagerMetadataJQ.length > 1) {
			throw new DP.IllegalArgumentException("DP.Pager.constructor: Query with selector=[" + _selector + "] corresponds to more than one element.");
		}

		// pokud element existuje, inicializuji pager z dat v HTML dokumentu
		if (pagerMetadataJQ.length !== 0) {
			this._id = id;
			this._itemsTotalCount = DP.checkNotNull(pagerMetadataJQ.data("items-count"), "DP.Pager.fromMarkup: Items count must not be null.");
			this._pagesCount = DP.checkNotNull(pagerMetadataJQ.data("pages-count"), "DP.Pager.fromMarkup: Pages count must not be null.");
			this._currentPageIndex = DP.checkNotNull(pagerMetadataJQ.data("page-index"), "DP.Pager.fromMarkup: Page index must not be null.");
			this._prevPagePointerElementId = id + "-pager-pointer-previous";
			this._nextPagePointerElementId = id + "-pager-pointer-next";
		}
	}
};

DP.Pager.EMPTY = new DP.Pager();

/**
 * Vrati prazdny/neaktivni <code>DP.Pager</code>.
 * 
 * @static
 * @returns {DP.Pager}
 */
DP.Pager.empty = function () {
	return DP.Pager.EMPTY;
};

/**
 * Vraci tovarni funkci pro <code>DP.Pager</code>. Parametr ID a nepovinny
 * parametr selektor se pouziji pro vytvoreni instance vracenou tovarni metodou.
 * 
 * @static
 * @param {Number|String} id Viz konstruktor.
 * @param {Number|String} selector Viz konstruktor.
 * @returns {Function} Vrati funkci, ktera vyrabi instance DP.Pager. Funkce je
 * deklarovana jako <code>factory():DP.Pager</code>.
 */
DP.Pager.getFactory = function (id, selector) {
	let factory = function () {
		return new DP.Pager(id, selector);
	};
	return factory;
};

/**
 * Nastavi builder URL adres jednotlivych stranek strankovaneho vypisu polozek.
 * <p>
 * Builder je objekt, ktery poskytuje metodu <code>setPage(Number):Builder</code>
 * pro slozeni URL pozadovane stranky a metodu <code>build():String</code> pro
 * ziskani URL pozadovane stranky.</p>
 * 
 * @param {Object} urlBuilder 
 * @returns {DP.Pager}
 */
DP.Pager.prototype.setUrlBuilder = function (urlBuilder) {
	// argument urlBuilder musi byt zadan
	DP.checkNotNull(urlBuilder);
	DP.checkArgument(DP.isFunction(urlBuilder.setPage),
		"DP.Pager.setUrlBuilder: URL builder nema metodu setPage( Number )");
	DP.checkArgument(DP.isFunction(urlBuilder.build),
		"DP.Pager.setUrlBuilder: URL builder nema metodu build()");
	this._urlBuilder = urlBuilder;
	return this;
};

/**
 * Nastavi funkci, ktera se provede v okamzik, kdyz Pager bude v odpovidajicim
 * stavu, nebo provede odpovidajici akci.
 * <p>Standardni hooky:</p>
 * <ul>
 * <li>
 * <b>beforeDomChanged</b> - provede se, kdyz pager zapricini zmenu DOM modelu</li>
 * <li>
 * <b>afterDomChanged</b> - provede se, kdyz pager zapricini zmenu DOM modelu</li>
 * <li>
 * <b>afterSuccessSubmit</b> - provede se, kdyz submit predchozi/dalsi stranky
 * je uspesny (provede se pred volanim <code>afterDomChanged</code>)</li>
 * </ul>
 * 
 * @param {String} hookName
 * @param {Function} fn
 * @returns {DP.Pager}
 */
DP.Pager.prototype.setHook = function (hookName, fn) {
	DP.checkArgument(hookName !== "", "DP.Pager.setHook: Hook name must not be empty.");
	DP.checkArgument(DP.isFunction(fn), "DP.Pager.setHook: Argument is not a function.");
	this._hooks.put(hookName, fn);
	return this;
};

/**
 * Zavola funkci registrovanou pro dany <code>hookName</code>. Vraci vysledek
 * hook funkce.
 * 
 * @param {String} hookName
 * @returns {undefined|Object}
 */
DP.Pager.prototype.callHook = function (hookName) {
	let hookFunction = this._hooks.get(hookName);
	if (DP.isNotUndefined(hookFunction)) {
		return hookFunction();
	}
};

/**
 * Nastaveni animace, ktera se provede po nacteni stranky pageru.
 * <p>
 * Funkce musi byt deklarovana jako <code>function effect(jQuery object) { ... }</code>.</p>
 * 
 * @param {Function} loadEffectFunction
 * @returns {DP.Pager}
 */
DP.Pager.prototype.setLoadEffect = function (loadEffectFunction) {
	DP.checkArgument(DP.isFunction(loadEffectFunction), "DP.Pager.setLoadEffect: Argument is not a function.");
	this._loadEffectFunction = loadEffectFunction;
	return this;
};

/**
 * Vrati <code>true</code>, pokud existuje vice jak jedna stranka vypisu.
 * @returns {Boolean}
 */
DP.Pager.prototype.isActive = function () {
	return this._pagesCount > 1;
};

/**
 * Vrati <code>true</code>, pokud existuje dalsi stranka vypisu.
 * @returns {Boolean}
 */
DP.Pager.prototype.hasNextPage = function () {
	return this._pagesCount > (this._currentPageIndex + 1);
};

/**
 * Vrati <code>DP.Optional</code>, ktery obsahuje index dalsi stranky vypisu.
 * Pokud dalsi stranka neexistuje, pak vrati prazdny <code>DP.Optional</code>.
 * @returns {DP.Optional}
 */
DP.Pager.prototype.getNextPageIndex = function () {
	if (this.hasNextPage()) {
		return DP.Optional.of(this._currentPageIndex + 1);
	}
	return DP.Optional.empty();
};

/**
 * Vtari <code>true</code>, pokud existuje predchazejici stranka vypisu.
 * @returns {Boolean}
 */
DP.Pager.prototype.hasPreviousPage = function () {
	return this._currentPageIndex > 0;
};

/**
 * Vrati <code>DP.Optional</code>, ktery obsahuje index predchozi stranky vypisu.
 * Pokud dalsi stranka neexistuje, pak vrati prazdny <code>DP.Optional</code>.
 * @returns {DP.Optional}
 */
DP.Pager.prototype.getPreviousPageIndex = function () {
	if (this.hasPreviousPage()) {
		return DP.Optional.of(this._currentPageIndex - 1);
	}
	return DP.Optional.empty();
};

/**
 * Provede nacteni dalsi stranky strankovaneho vypisu.
 */
DP.Pager.prototype.submitNextPage = function () {
	// pokud existuje dalsi stranka, odeslu pozadavek na nacteni
	let pager = this;
	pager.getNextPageIndex().ifPresent(function (nextPageIndex) {
		// test, jestli se jedna o "retry"
		let retryFunction = pager._retrySubmitPage.get(nextPageIndex);
		if (DP.isNotUndefined(retryFunction)) {
			retryFunction();
			return;
		}

		// ziskam URL builder
		let urlBuilder = pager._urlBuilder;
		DP.checkNotNull(urlBuilder, "DP.Pager.submitNextPage: URL builder must not be null.");
		let url = urlBuilder.setPage(nextPageIndex).build();

		// FIXME: Kontrola, ze domElement === null a nasledna vhodna reakce
		// (alternativni element a chovani).
		let domElement = document.getElementById(pager._nextPagePointerElementId);
		if (urlBuilder instanceof DP.ComponentUrlBuilder) {
			let component = DP.component(url)
				.whilePending(function (element) {
					pager.callHook("beforeDomChanged");
					DP.dom.insertIntoElement(element,
						"<img style='height: 34px;' src='/cms/layouts-decko/images/preloader.gif'/>");
					pager.callHook("afterDomChanged");
				})
				.whenComplete(function (status, element) {
					let retryLink = "<a href='#' onclick='DP.getObject(DP.Pager, &#39;" + pager._id + "&#39;).submitNextPage(); return false;'>znovu</a>";
					switch (status) {
						case "success":
							pager._currentPageIndex++;
							pager.callHook("afterSuccessSubmit");
							break;
						case "error":
							pager.callHook("beforeDomChanged");
							DP.dom.insertIntoElement(element,
								"<span class='fail-info'>Jejda... něco se pokazilo. Kliknutím na odkaz můžete zkusit načíst položky " + retryLink + ".</span>");
							break;
						case "timeout":
							pager.callHook("beforeDomChanged");
							DP.dom.insertIntoElement(element,
								"<span class='fail-info'>Server neodpovídá. Kliknutím na odkaz můžete zkusit načíst položky " + retryLink + ".</span>");
							break;
					}
					pager.callHook("afterDomChanged");
				})
				.replace(domElement)
				.setLoadEffect(pager._loadEffectFunction)
				.submit();
			// Ulozim do registru obsluhu pro "retry"
			pager._retrySubmitPage.put(nextPageIndex, function () {
				// Osetrim vicenasobne volani
				if (component.isDone()) {
					// submit() volam jen kdyz uz je predchozi volani ukonceno
					component.submit();
				}
			});
		} else {
			// TODO - obsluha v pripade, kdy URL builder neni typu ComponentUrlBuilder
			DP.log.fatal("DP.Page.submitNextPage: Not implemented yet.");
			return;
		}
	});
};

/**
 * Vrati funkci, ktera po zavolani zajisi nacteni dalsi stranky strankovaneho
 * vypisu. Pokud uz dalsi stranka neexistuje, tak vracena funkce nic neprovadi.
 * 
 * @returns {Function} Funkce deklarovana jako <code>eventHandler(event):void</code>.
 */
DP.Pager.prototype.getNextPageEventHandler = function () {
	let pager = this;
	let eventHandler = function (event) {
		pager.submitNextPage();
	};
	return eventHandler;
};


/*
 *	COMPONENTS
 */

/**
 * ComponentUrlBuilder
 * <p>
 * Pouziti:</p>
 * <pre>
 * var url = new ComponentUrlBuilder("UserAchievementsList")
 *    .setGroup("application")
 *    .setVariant("appRelative")
 *    .setParameter("size", "compact")
 *    .build();</pre>
 * 
 * @constructor
 * @param {String} componentName
 */
DP.ComponentUrlBuilder = function ComponentUrlBuilder(componentName) {
	this._params = new DP.Register();
	this._contextURL = null;
	this._buildResult = null;
	//
	this._name = null;
	if (DP.isNotUndefined(componentName)) {
		this.setName(componentName);
	}
	//
	this.setContextUrl(DP.context.baseUrl + window.location.pathname);
};

DP.ComponentUrlBuilder.prototype.setName = function (name) {
	DP.checkArgument(DP.isString(name) && name !== "",
		"Nazev komponenty musi byt neprazdny retezec.");
	this._cleanResult();
	this._name = name;
	return this;
};

DP.ComponentUrlBuilder.prototype.setContextUrl = function (url) {
	DP.checkArgument(DP.isString(url) && url !== "",
		"\"" + this._name + "\": URL musi byt neprazdny retezec.");
	this._cleanResult();
	if (url.endsWith("/")) {
		this._contextURL = url.substring(0, url.length - 1);
		;
	} else {
		this._contextURL = url;
	}
	return this;
};

DP.ComponentUrlBuilder.prototype.setParameter = function (name, value) {
	DP.checkArgument(DP.isString(name) && name !== "",
		"\"" + this._name + "\": Name of the component parameter is not valid.");
	this._cleanResult();
	if (DP.isUndefined(value)) {
		// pokud je hodnota parametru 'undefined', nastaveni parametru se zrusi
		this._params.remove(name);
		// POZN.: Hodnota "null" nebo "" je relevantni.
	} else {
		this._params.put(name, value);
	}
	return this;
};

DP.ComponentUrlBuilder.prototype.removeParameter = function (name) {
	return this.setParameter(name);
};

/**
 * Pouziti:
 * <pre>
 * var urlBuilder = new DP.ComponentUrlBuilder("CopmonentName");
 * 
 * urlBuilder.setParameters(register)
 * urlBuilder.setParameters(name, value [, name2, value2 [, name3, value3...]])</pre>
 * 
 * @param {DP.Register | Array} 
 * 
 * @returns {DP.ComponentUrlBuilder}
 */
DP.ComponentUrlBuilder.prototype.setParameters = function () {
	if (arguments.length === 0) {
		// pokud nejsou zadne argumenty, tak nic nedelam
		return;
	}
	let params = null;
	if (arguments.length === 1) {
		// pokud je jeden parametr, tak to musi byt registr parametru
		params = arguments[0];
		DP.checkArgument(DP.isTrue(params) && typeof params === "object" && params instanceof DP.Register,
			"\"" + this._name + "\": Register of the component parameters is not valid.");
	} else {
		// pokud je vice parametru, pak to musi byt dvojice [klic, hodnota]
		const paramsArray = Array.prototype.slice.call(arguments);
		params = DP.Register.fromArray(paramsArray);
	}
	this._cleanResult();
	this._params = params;
	return this;
};

DP.ComponentUrlBuilder.prototype.setVariant = function (variant) {
	return this.setParameter("variant", variant);
};

DP.ComponentUrlBuilder.prototype.setGroup = function (group) {
	return this.setParameter("group", group);
};

DP.ComponentUrlBuilder.prototype.setStyle = function (style) {
	return this.setParameter("style", style);
};

DP.ComponentUrlBuilder.prototype.setDisabled = function (disabled) {
	return this.setParameter("disabled:Boolean", disabled);
};

DP.ComponentUrlBuilder.prototype.setHighlight = function (highlight) {
	return this.setParameter("highlight:Boolean", highlight);
};

/**
 * Nastavi stranku strankovaneho vypisu. Podpora pro API tridy
 * <code>DP.Pager</code>.
 * 
 * @param {Number} pageNumber
 * @returns {DP.ComponentUrlBuilder}
 * @see <code>DP.Pager</code>
 */
DP.ComponentUrlBuilder.prototype.setPage = function (pageNumber) {
	// test na relevantni hodnoty
	if (DP.isTrue(pageNumber) || pageNumber === 0) {
		return this.setParameter("page:Integer", pageNumber);
	}
	// pokud pageNumber je undefined, null nebo "", tak parametr smazu
	return this.removeParameter("page:Integer");
};

DP.ComponentUrlBuilder.prototype._cleanResult = function () {
	this._buildResult = null;
};

DP.ComponentUrlBuilder.prototype.build = function () {
	if (DP.isNotNull(this._buildResult)) {
		return this._buildResult;
	}
	const url = new DP.StringBuilder()
		// context
		.append(this._contextURL)
		// rest-component URI delimiter
		.append("/!");
	let countOfParamsProcessed = 0;
	// pokud je zadana skupina, pripojim ji k URL
	let componentGroup = this._params.get("group");
	if (DP.isTrue(componentGroup)) {
		url.append(componentGroup);
		countOfParamsProcessed++;
	}
	url.append("/");
	// nazev komponenty je povinny
	url.append(this._name);
	// pokud je zadana varianta, pripojim ji k URL
	let componentVariant = this._params.get("variant");
	if (DP.isTrue(componentVariant)) {
		url.append("/").append(componentVariant);
		countOfParamsProcessed++;
	}
	// zbyle parametry komponenty tvori query string
	if (!this._params.isEmpty()) {
		url.append("?");
		let countOfParamsLeft = this._params.size() - countOfParamsProcessed;
		this._params.forEachEntry(function (param, value) {
			// skupina a varianta uz v URL zastoupeny jsou
			if (param !== "group" && param !== "variant") {
				url.append(param);
				url.append("=");
				url.append(value);
				if (--countOfParamsLeft !== 0) {
					url.append("&");
				}
			}
		});
	}
	this._buildResult = url.toString();
	// vratim vysledek
	return this._buildResult;
};

/**
 * Vytvori a vrati objek lazy-loadovane komponenty <code>DP.LazyLoadedComponent</code>.
 * <p>
 * DP.component(componentNameOrUrl [, param1, value1 [, param2, value2...]])</p>
 * <p>
 * Priklady:</p>
 * <pre>
 * var url = new ComponentUrlBuilder("UserAchievementsList")
 *    .setVariant("appRelative")
 *    .setParameter("size", "compact")
 *    .build();
 * 
 * DP.component(url);
 * 
 * DP.component("UserAchievementsList");
 * DP.component("UserAchievementsList", "variant", "appRelative");
 * DP.component("UserAchievementsList"
 *    "group", "profile",
 *    "variant", "sidePanel",
 *    "size", "compact",
 *    "style", "cernobil-theme");</pre>
 * 
 * @param {String} componentNameOrUrl
 * @param {String} param1
 * @param {String} value1
 * 
 * @returns {DP.LazyLoadedComponent} lazy loadovana komponenta
 */
DP.component = function () {
	const args = Array.prototype.slice.call(arguments);
	const componentNameOrUrl = args[0];
	const paramsArray = args.slice(1);
	DP.checkArgument(DP.isString(componentNameOrUrl) && componentNameOrUrl !== "",
		"Nazev komponenty ani jeji URL nesmi byt prazdny retezec.");
	DP.checkArgument((paramsArray.length % 2) === 0,
		function () {
			// message supplier
			return "Parametry musi byt dvojice (klic, hodnota) a jejich pocet musi byt sudy. Pocet parametru je " + paramsArray.length;
		}
	);
	let url = null;
	// overim, jestli vstupem metody je URL komponenty
	if (componentNameOrUrl.search(/^(https?:)?\/?\//i) === 0) {
		// vstupem je URL
		url = componentNameOrUrl;
	} else {
		// vstupem je nazev komponenty a seznam parametru
		let urlBuilder = new DP.ComponentUrlBuilder(componentNameOrUrl);
		if (paramsArray.length !== 0) {
			const params = DP.Register.fromArray(paramsArray);
			urlBuilder.setParameters(params);
		}
		url = urlBuilder.build();
	}

	// zalozim a vratim komponentu
	let component = new DP.LazyLoadedComponent(url);
	return component;
};

/**
 * Lazy loadovana komponenta.
 * <p>
 * Pouziti:</p>
 * <pre>
 * DP.component(url)
 *    .whilePending( function(domElement) {...} )
 *    .onError( function(statusCode, domElement) {...} )
 *    .onTimeout( function(domElement) {...} )
 *    .whenComplete( function(textStatus, domElement) {...} )
 *    .replace(domElement)
 *    .submit();</pre>
 * 
 * @constructor
 * @param {Object} url 
 */
DP.LazyLoadedComponent = function LazyLoadedComponent(url) {
	this._url = url;
	this._whilePendingHandler = null;
	this._onErrorHandler = null;
	this._onTimeoutHandler = null;
	this._whenCompleteHandler = null;
	this._targetElement = null;
	this._replaceTargetElement = false;
	this._loadEffectFunction = DP.function.noop;
	this._isDone = false;
	this._randHash = null;
};

DP.LazyLoadedComponent.prototype.whilePending = function (callback) {
	if (DP.isTrue(callback)) {
		this._whilePendingHandler = callback;
		this.resetHash();
	}
	return this;
};

DP.LazyLoadedComponent.prototype.onError = function (callback) {
	if (DP.isTrue(callback)) {
		this._onErrorHandler = callback;
		this.resetHash();
	}
	return this;
};

DP.LazyLoadedComponent.prototype.onTimeout = function (callback) {
	if (DP.isTrue(callback)) {
		this._onTimeoutHandler = callback;
		this.resetHash();
	}
	return this;
};

DP.LazyLoadedComponent.prototype.whenComplete = function (callback) {
	if (DP.isTrue(callback)) {
		this._whenCompleteHandler = callback;
		this.resetHash();
	}
	return this;
};

DP.LazyLoadedComponent.prototype.replace = function (domElement) {
	DP.checkArgument(DP.isDomElement(domElement), "Argument neni DOM element.");
	this._targetElement = domElement;
	this._replaceTargetElement = true;
	this.resetHash();
	return this;
};

DP.LazyLoadedComponent.prototype.insertInto = function (domElement) {
	DP.checkArgument(DP.isDomElement(domElement), "Argument neni DOM element.");
	this._targetElement = domElement;
	this._replaceTargetElement = false;
	this.resetHash();
	return this;
};

/**
 * Nastaveni animace, ktera se provede po nacteni komponenty.
 * <p>
 * Funkce musi byt deklarovana jako <code>function effect(jQuery object) { ... }</code>.</p>
 * 
 * @param {Function} loadEffectFunction
 * @returns {DP.LazyLoadedComponent}
 */
DP.LazyLoadedComponent.prototype.setLoadEffect = function (loadEffectFunction) {
	DP.checkArgument(DP.isFunction(loadEffectFunction), "Argument neni funkce.");
	this._loadEffectFunction = loadEffectFunction;
	this.resetHash();
	return this;
};

/**
 * Odesle request na REST komponentu.
 * 
 * @param {Number} responseTimeout
 * @param {Number} delayMillis
 * @returns {DP.LazyLoadedComponent}
 */
DP.LazyLoadedComponent.prototype.submit = function (responseTimeout, delayMillis) {
	DP.checkState(DP.isNotNull(this._targetElement), "Neni nastaven DOM element pro renderovani komponenty.");
	// unikatni hash instance kompnenty pouziju jako flag
	let hash = this.getHash();
	if (DP.flags.getThenSetTrue(hash)) {
		// submit teto instance se prave provadi
		DP.log.warn("Vicenasobne soubezne volani LazyLoadedComponent.submit() pro komponentu [" + hash + "].");
		return this;
	}

	let that = this;
	let onSuccess = function (data, xhr, textStatus) {
		if (that._replaceTargetElement === true) {
			// replace
			DP.dom.replaceElement(that._targetElement, data, that._loadEffectFunction);
		} else {
			// insert
			DP.dom.insertIntoElement(that._targetElement, data);
		}
		DP.log.info("Component loaded successfully.");
		if (that._whenCompleteHandler !== null) {
			that._whenCompleteHandler("success", that._targetElement);
		}
	};

	let onError = function (statusCode, responseJSON) {
		if (that._onErrorHandler !== null) {
			that._onErrorHandler(statusCode, that._targetElement);
		}
		DP.log.error("Component loading error [" + statusCode + "].");
		if (that._whenCompleteHandler !== null) {
			that._whenCompleteHandler("error", that._targetElement);
		}
	};

	let onTimeout = function () {
		if (that._onTimeoutHandler !== null) {
			that._onTimeoutHandler(that._targetElement);
		}
		DP.log.error("Component loading time exceeded limit.");
		if (that._whenCompleteHandler !== null) {
			that._whenCompleteHandler("timeout", that._targetElement);
		}
	};

	let whenComplete = function (xhr, textStatus) {
		DP.flags.getThenSetFalse(hash);
		that._isDone = true;
		if (that._whenCompleteHandler !== null) {
			// pokud nenastal zadny ze sledovanych stavu, reaguji stejne jako na chybu
			if (textStatus !== "success" && textStatus !== "error" && textStatus !== "timeout") {
				that._whenCompleteHandler("error", that._targetElement);
			}
		}
	};

	let timeout = 40000;
	// pokud je zadan timeout, tak se pouzije
	if (DP.isTrue(responseTimeout)) {
		timeout = responseTimeout;
	}

	// odeslu request na komponentu
	that._isDone = false;
	DP.log.debug("Submit component [" + this.getHash() + "]: " + this._url);
	let requestParams = {
		method: "GET",
		url: this._url,
		timeout: timeout,
		requestHeaders: {
			"Accept": "text/html,application/xhtml+xml,application/xml"
		},
		onSuccess: onSuccess,
		onError: onError,
		onTimeout: onTimeout,
		onComplete: whenComplete
	};

	if (DP.isUndefined(delayMillis)) {
		DP.ajax.send(requestParams);
	} else {
		setTimeout(function () {
			DP.ajax.send(requestParams);
		}, delayMillis);
	}

	// nez server posle data, zobrazim "spinning wheel"
	if (this._whilePendingHandler !== null) {
		this._whilePendingHandler(that._targetElement);
	}
	return this;
};

/**
 * Vrati <code>true</true>, pokud uz skoncil proces stahovani a renderovani
 * komponenty. Pokud proces skoncil s chybou, take vraci <code>true</true>.
 * 
 * @returns {Boolean}
 */
DP.LazyLoadedComponent.prototype.isDone = function () {
	return this._isDone;
};

DP.LazyLoadedComponent.prototype.getHash = function () {
	if (DP.isNotNull(this._randHash)) {
		return this._randHash;
	}
	this._randHash = DP.randomString(10);
	return this._randHash;
};

DP.LazyLoadedComponent.prototype.resetHash = function () {
	this._randHash = null;
};

/**
 * Komponenta TabbedPane
 * <p>
 * Root element (container) obsahu kazde zalozky musi mit CSS tridu 'dp-tab-content'.</p>
 * <p>
 * Container pro prepinace (ouska) musi mit CSS tridu 'dp-tabs-navigation'.
 * Prepinace zalozek nejsou povinne. Pokud nejsou pritomne, tak mohou mit
 * contejnery obsahu nastavenou tridu 'dp-tabs-navigation-hidden'.</p>
 * <p>
 * Aktivni zalozka (obsah i ousko) je indokovano tridou 'active'</p>
 * 
 * @constructor
 */
DP.TabbedPane = function TabbedPane(id) {
	DP.checkNotNull(id, "ID of TabbedPane must not be null");
	DP.checkArgument(id !== "", "ID of TabbedPane must not be empty.");

	this.rootElementId = id;
	this.rootElement = $("#" + id);
	if (this.rootElement.length === 0) {
		throw new DP.ElementNotFoundException("TabbedPane.constructor: Element with ID=[" + id + "] does not exists.");
	}
	// defaults
	this.tabs = [];
	this.selectedTabIndex = null;
	this.hasNavigation = false;
	// inicializace
	this.init();
};

DP.TabbedPane.prototype.init = function () {
	// lista s navigaci
	let navigationContainerElement = this.rootElement.children(".dp-tabs-navigation").first();
	let tabSwitches = null;
	this.hasNavigation = false;
	if (navigationContainerElement.length !== 0) {
		this.hasNavigation = true;
		tabSwitches = navigationContainerElement.children();
	} else {
		// informuji o vyjimecnem stavu, kdy TabbedPane nema prepinace zalozek
		DP.log.debug("TabbedPane.init: " + this.rootElementId + " nema navigaci.");
	}
	// panely s obsahem
	let tabContents = this.rootElement.children(".dp-tab-content");
	let tabsCount = tabContents.length;
	if (tabsCount !== 0) {
		// kontrola na shodny pocet prepinacu a zalozek
		if (this.hasNavigation && tabSwitches.length !== tabsCount) {
			DP.log.error("TabbedPane.init: " + this.rootElementId
				+ " nema shodny pocet prepinacu (ousek) a zalozek. ["
				+ tabSwitches.length + "/" + tabContents.length + "]");
			// Provedu korekci: Pokud mam nedostatek prepinacu, tak obsah,
			// na ktery se neni mozne dostat, skryji (resp. ignoruji).
			if (tabSwitches.length < tabsCount) {
				tabsCount = tabSwitches.length;
			}
		}
		let _selectedTabIndex = null;
		for (let i = 0; i < tabsCount; i++) {
			let tabElement = tabContents[i];
			let navElement = this.hasNavigation ? tabSwitches[i] : null;
			this.tabs.push({
				id: tabElement.id,
				navElement: navElement,
				tabElement: tabElement
			});
			// zjistim, ktery tab ma byt na pocatku aktivni
			if (DP.dom.hasClass(tabElement, "active")) {
				if (_selectedTabIndex === null) {
					// aktivni zalozka jeste nebyla nastavena -> nastavim ji
					_selectedTabIndex = i;
					if (this.hasNavigation) {
						DP.dom.addClass(navElement, "active");
					}
				} else {
					// dve zalozky maji v HTML elementu tridu 'active', druhy vyskyt odeberu
					DP.dom.removeClass(tabElement, "active");
					if (this.hasNavigation) {
						DP.dom.removeClass(navElement, "active");
					}
				}
			}
		}
		this.selectedTabIndex = _selectedTabIndex;
	} else {
		DP.log.warn("TabbedPane.init: " + this.rootElementId + " nema zadny panel s obsahem.");
	}
	// pokud nebala nastavena aktivni zalozka, tak ji nastavim na prvni
	if (this.getTabsCount() > 0 && this.selectedTabIndex === null) {
		this.selectedTabIndex = 0;
		DP.dom.addClass(this.tabs[0].tabElement, "active");
		if (this.hasNavigation) {
			DP.dom.addClass(this.tabs[0].navElement, "active");
		}
	}
	return this;
};

DP.TabbedPane.prototype.getTabsCount = function () {
	return this.tabs.length;
};

DP.TabbedPane.prototype.removeAt = function (tabIndex) {
	/*
	 * FIXME: Pri odebirani zalozek se neupravi akce onclick navesena
	 * na prepinacich zalozek. Prepinace pak prepinaji chybne.
	 */
	DP.checkArgument(tabIndex >= 0 && tabIndex < this.getTabsCount(), "TabbedPane: Invalid tab index value.");
	// pri odebirani karty je potreba osetrit index aktualni zobrazene karty
	if (this.selectedTabIndex !== null) {
		// odebiram aktualni zobrazenou kartu
		if (this.selectedTabIndex === tabIndex) {
			if (tabIndex === this.getTabsCount() - 1) {
				// kdyz odebiram posledni zalozku, prepnu na predchazejici (le-li to mozne)
				if (this.getTabsCount() > 1) {
					this.switchTo(tabIndex - 1);
				}
			} else {
				// jinak prepnu na nasledujici
				this.switchTo(tabIndex + 1);
				this.selectedTabIndex = tabIndex;
			}
		}
		// odebiram kartu umistenou pred aktualni zobrazenou kartou
		if (tabIndex < this.selectedTabIndex) {
			this.selectedTabIndex--;
		}
		// Pokud odebiram kartu umistenou za aktualni kartou, tak se vnitni stav
		// nemeni.
	}
	// odebere tab na indexu 'tabIndex' a vrati odebrany objekt
	let removedTab = this.tabs.splice(tabIndex, 1)[0];
	// odeberu z DOMu elementy odebirane zalozky
	DP.dom.removeElement(removedTab.tabElement);
	if (this.hasNavigation) {
		DP.dom.removeElement(removedTab.navElement);
	}
	DP.log.debug("TabbedPane.removeAt: Odstranen tab Index=[" + tabIndex + "] v panelu ID=[" + this.rootElementId + "]");
	return removedTab;
};

DP.TabbedPane.prototype.switchTo = function (tabIndex) {
	DP.checkArgument(tabIndex >= 0 && tabIndex < this.getTabsCount(), "TabbedPane: Invalid tab index value.");
	// aktualne zobrazena zalozka se musi schovat
	if (this.selectedTabIndex !== null) {
		let currentTab = this.tabs[this.selectedTabIndex];
		DP.dom.removeClass(currentTab.tabElement, "active");
		// zrusim zvyrazneni ouska zalozky
		if (this.hasNavigation) {
			DP.dom.removeClass(currentTab.navElement, "active");
		}
	}
	// pozadovana zalozka se musi zobrazit
	let nextTab = this.tabs[tabIndex];
	DP.dom.addClass(nextTab.tabElement, "active");
	if (this.hasNavigation) {
		DP.dom.addClass(nextTab.navElement, "active");
	}
	this.selectedTabIndex = tabIndex;
	DP.log.debug("TabbedPane.switchTo: Zobrazen tab Index=[" + tabIndex + "] v panelu ID=[" + this.rootElementId + "]");
};

/**
 * Komponenta ScrollPane.
 * <p>
 * Konfigurace:</p>
 * <pre>
 * Zobrazi sipky na koncich posuvniku
 * &lt;div class="show-arrows"&gt;  content...  &lt;/div&gt;
 * 
 * Vynuti zobrazeni posuvniku i kdyz je obsah mensi
 * &lt;div data-vertical-bar="always"&gt;  content...  &lt;/div&gt;
 * &lt;div data-horizontal-bar="always"&gt;  content...  &lt;/div&gt;
 * </pre>
 * 
 * @param {Number|String} id unikatni ID komponenty a take selektor root
 * elementu komponenty
 *  
 * @constructor
 */
DP.ScrollPane = function ScrollPane(id) {
	DP.checkNotNull(id, "ID of ScrollPane must not be null");
	DP.checkArgument(id !== "", "ID of ScrollPane must not be empty.");

	// unikatni ID komponenty
	this.rootElementId = id;
	this.rootElementJQ = $("#" + id);
	if (this.rootElementJQ.length === 0) {
		throw new DP.ElementNotFoundException("ScrollPane.constructor: Element with ID=[" + id + "] does not exists.");
	}

	// hranicni vzdalenost viewportu od okraje obsahu, od ktere budou pri pohybu
	// posuvnikem spousteny udalosti atTop, atBottom, atLeft a atRight
	this._activationRange = 70; // px
	// vychozi nastaveni jScrollPane
	this._jspSettingsChanged = false;
	this._jspSettings = {
		maintainPosition: true,
		hijackInternalLinks: false,
		showArrows: false,
		autoReinitialise: false,
		autoReinitialiseDelay: 500, // millis
		// The smallest size that the horizontal/vertical drag can have.
		verticalDragMinHeight: 60, // px
		horizontalDragMinWidth: 60, // px
		// The amount of space between the side of the content and the vertical scrollbar.
		verticalGutter: 4, // px
		// The amount of space between the bottom of the content and the horizontal scrollbar.
		horizontalGutter: 4, // px
		// Scrollbar is showed automatically.
		alwaysShowHScroll: false,
		alwaysShowVScroll: false,
		// Whether clicking on the track should scroll towards the point clicked on.
		clickOnTrack: true
	};
	this._jspApi = null;
	this._eventHandlers = new DP.Register();
	// inicializace
	this.init();
};

/**
 * Inicializuje komponentu ScrollPane podle nastaveni atributu root elementu.
 * @private
 */
DP.ScrollPane.prototype.init = function () {
	// zobrazeni sipek
	this._jspSettings.showArrows = this.rootElementJQ.hasClass("show-arrows");
	// zobrazeni vertikalniho nebo horizontalniho posuvniku
	this._jspSettings.alwaysShowVScroll = (this.rootElementJQ.data("vertical-bar") === "always");
	this._jspSettings.alwaysShowHScroll = (this.rootElementJQ.data("horizontal-bar") === "always");
	// inicializace jScrollPane
	this.rootElementJQ.jScrollPane(this._jspSettings);
	this._jspApi = this.rootElementJQ.data('jsp');
	if (DP.isFalse(this._jspApi)) {
		DP.log.error("Nelze inicializovat ScrollPane: jScrollPane API je undefined");
		throw new DP.IllegalStateException("Chybi API pro jScrollPane");
	}

	let that = this;
	DP.ready(function () {
		// bind listeners
		that.rootElementJQ.on('jsp-scroll-x', function (event, scrollPositionX, isAtLeft, isAtRight) {
			that._jspScrollXHaldler(event, scrollPositionX, isAtLeft, isAtRight);
		});
		that.rootElementJQ.on('jsp-scroll-y', function (event, scrollPositionY, isAtTop, isAtBottom) {
			that._jspScrollYHaldler(event, scrollPositionY, isAtTop, isAtBottom);
		});
	});
};

/**
 * Handler udalosti. Parametry viz dokumentace jScrollPane.
 * @private
 */
DP.ScrollPane.prototype._jspScrollXHaldler = function (event, scrollPositionX, isAtLeft, isAtRight) {
	if (this._activationRange !== 0) {
		let contentWidth = this.getContentWidth();
		let viewportWidth = this.getViewportWidth();
		let distanceToRight = contentWidth - viewportWidth - scrollPositionX;
		isAtLeft = scrollPositionX < this._activationRange;
		isAtRight = distanceToRight < this._activationRange;
	}
	if (isAtLeft) {
		if (DP.flags.getThenSetTrue(this.rootElementId + ".atLeft") === false) {
			this._dispatchEvent(event, "atLeft");
		}
	} else {
		DP.flags.getThenSetFalse(this.rootElementId + ".atLeft");
		if (isAtRight) {
			if (DP.flags.getThenSetTrue(this.rootElementId + ".atRight") === false) {
				this._dispatchEvent(event, "atRight");
			}
		} else {
			DP.flags.getThenSetFalse(this.rootElementId + ".atRight");
		}
	}
};

/**
 * Handler udalosti. Parametry viz dokumentace jScrollPane.
 * @private
 */
DP.ScrollPane.prototype._jspScrollYHaldler = function (event, scrollPositionY, isAtTop, isAtBottom) {
	if (this._activationRange !== 0) {
		let contentHeight = this.getContentHeight();
		let viewportHeight = this.getViewportHeight();
		let distanceToBottom = contentHeight - viewportHeight - scrollPositionY;
		isAtTop = scrollPositionY < this._activationRange;
		isAtBottom = distanceToBottom < this._activationRange;
	}
	if (isAtTop) {
		if (DP.flags.getThenSetTrue(this.rootElementId + ".atTop") === false) {
			this._dispatchEvent(event, "atTop");
		}
	} else {
		DP.flags.getThenSetFalse(this.rootElementId + ".atTop");
		if (isAtBottom) {
			if (DP.flags.getThenSetTrue(this.rootElementId + ".atBottom") === false) {
				this._dispatchEvent(event, "atBottom");
			}
		} else {
			DP.flags.getThenSetFalse(this.rootElementId + ".atBottom");
		}
	}
};

/**
 * Notifikuje registrovane listenery udalosti.
 * @private
 */
DP.ScrollPane.prototype._dispatchEvent = function (event, eventType) {
	let handlers = this._eventHandlers.get(eventType);
	if (DP.isTrue(handlers)) {
		for (var i = 0; i < handlers.length; i++) {
			let handler = handlers[i];
			handler(event);
		}
	}
};

/**
 * Pro uvedenou udalost registruje handler, ktery bude spusten, kdyz udalost
 * nastane.
 * 
 * @param {String} eventType
 * @param {Function} handler
 * @returns {DP.ScrollPane}
 */
DP.ScrollPane.prototype.on = function (eventType, handler) {
	let handlers = this._eventHandlers.get(eventType);
	if (DP.isUndefined(handlers)) {
		handlers = [];
		this._eventHandlers.put(eventType, handlers);
	}
	handlers.push(handler);
	return this;
};

/**
 * Reinitialises the scroll pane.
 * 
 * @returns {DP.ScrollPane}
 * @see jScrollPane API
 */
DP.ScrollPane.prototype.reinitialise = function () {
	if (this._jspSettingsChanged) {
		this._jspApi.reinitialise(this._jspSettings);
	} else {
		this._jspApi.reinitialise();
	}
	return this;
};

/**
 * Returns the function that reinitialises the scroll pane when called.
 * 
 * @returns {Function}
 */
DP.ScrollPane.prototype.getReinitializer = function () {
	let thisSp = this;
	let fn = function () {
		thisSp.reinitialise();
	};
	return fn;
};

/**
 * Scrolls the specified <code>element</code> into view so that it can be seen
 * within the viewport.
 * 
 * @param {jQuery|String|DOM_node} element
 * @param {boolean} stickToTop If <code>stickToTop</code> is <code>true</code> then
 * the element will appear at the top of the viewport, if it is
 * <code>false</code> then the viewport will scroll as little as possible
 * to show the element.
 * @param {boolean} animate Specify if you want animation to occur. If you don't
 * provide this argument then the animateScroll value from the settings object is used instead.
 * 
 * @returns {DP.ScrollPane}
 * @see jScrollPane API
 */
DP.ScrollPane.prototype.scrollToElement = function (element, stickToTop, animate) {
	this._jspApi.scrollToElement(element, stickToTop, animate);
	return this;
};

/**
 * Gets a reference to the content pane.
 * 
 * @returns {jQuery}
 * @see jScrollPane API
 */
DP.ScrollPane.prototype.getContentPane = function () {
	return this._jspApi.getContentPane();
};

/**
 * Returns the width of the content within the scroll pane.
 * 
 * @returns {Number}
 * @see jScrollPane API
 */
DP.ScrollPane.prototype.getContentWidth = function () {
	return this._jspApi.getContentWidth();
};

/**
 * Returns the height of the content within the scroll pane.
 * 
 * @returns {Number}
 * @see jScrollPane API
 */
DP.ScrollPane.prototype.getContentHeight = function () {
	return this._jspApi.getContentHeight();
};

/**
 * Returns the width of the scroll pane viewport.
 * 
 * @returns {Number}
 */
DP.ScrollPane.prototype.getViewportWidth = function () {
	return this.rootElementJQ.width();
};

/**
 * Returns the height of the scroll pane viewport.
 * 
 * @returns {Number}
 */
DP.ScrollPane.prototype.getViewportHeight = function () {
	return this.rootElementJQ.height();
};

/**
 * Manager boxu s prehravacem iVysilani
 * 
 * @constructor
 * @param {String} id Identifikator elemntu, ktery reprezentuje box s prahravacem
 * 
 * @throws {DP.IllegalArgumentException} pokud 'id' je undefined, null nebo ""
 * @throws {DP.ElementNotFoundException} pokud HTML element podle id neexistuje
 */
DP.MediaPlayerManager = function MediaPlayerManager(id) {
	DP.checkNotNull(id, "ID of MediaPlayerBox must not be null");
	DP.checkArgument(id !== "", "ID of MediaPlayerBox must not be empty.");

	this.playerBoxId = id;
	this.playerBoxElementJQ = $("#" + id);
	if (this.playerBoxElementJQ.length === 0) {
		throw new DP.ElementNotFoundException("Element with ID=[" + id + "] does not exists.");
	}
	// inicializace atributu
	this.iframePlayerHash = this.playerBoxElementJQ.data("hsh");
	this.screenElementJQ = $("#" + id + "-screen");
	this.additionalInfoElementJQ = $("#" + id + "-additional-info");
	this.currentMediaAttributes = {
		id: this.screenElementJQ.data("id")
	};
	this.slideUpDuration = 250;

	// inicializace obsluhy udalosti
	if (this.additionalInfoElementJQ.length !== 0) {
		// skryti dodatecnych informaci kliknutim na ne
		this.additionalInfoElementJQ.click(function () {
			DP.getObject(DP.MediaPlayerManager, id).toggleMoreInfo();
		});
	}
};

DP.MediaPlayerManager.prototype.showMoreInfo = function () {
	if (this.additionalInfoElementJQ.length === 0) {
		// pokud element s dodatecnymi informace neexistuje, nic se neprovede
		DP.log.warn("Pozadovano zobrazeni vice informaci o prehravanem mediu, ale informace nejsou k dispozici."
			+ " MediaPlayerManager ID = " + this.playerBoxId);
		return;
	}
	this.additionalInfoElementJQ.slideUp(this.slideUpDuration);
};

DP.MediaPlayerManager.prototype.hideMoreInfo = function () {
	if (this.additionalInfoElementJQ.length === 0) {
		// pokud element s dodatecnymi informace neexistuje, nic se neprovede
		DP.log.warn("Pozadovano skryti vice informaci o prehravanem mediu, ale informace nejsou k dispozici."
			+ " MediaPlayerManager ID = " + this.playerBoxId);
		return;
	}
	this.additionalInfoElementJQ.slideDown(this.slideUpDuration);
};

DP.MediaPlayerManager.prototype.toggleMoreInfo = function () {
	if (this.additionalInfoElementJQ.length === 0) {
		// pokud element s dodatecnymi informace neexistuje, nic se neprovede
		DP.log.warn("Pozadovano skryti vice informaci o prehravanem mediu, ale informace nejsou k dispozici."
			+ " MediaPlayerManager ID = " + this.playerBoxId);
		return;
	}
	this.additionalInfoElementJQ.slideToggle(this.slideUpDuration);
};

DP.MediaPlayerManager.prototype.startPlayer = function () {
	let playerQuery = this.screenElementJQ.data("player-query");
	let hashParam = "&hash=" + this.iframePlayerHash;
	this.screenElementJQ.empty();

	DP.log.info("Vkladam iframe s prehravacem. Box=[" + this.playerBoxId + "] Media=[" + playerQuery + "]");
	$("<iframe />", {
		// src: "/ivysilani/embed/iFramePlayer.php?w=99&width=528&origin=decko&toolbar=false&" + playerQuery + hashParam,
		src: "https://decko.ceskatelevize.cz/ivysilani/embed/iFramePlayer.php?width=528&origin=decko&toolbar=false&" + playerQuery + hashParam,
		frameborder: "no",
		scrolling: "no",
		allow: "autoplay",
		webkitallowfullscreen: "true",
		mozallowfullscreen: "true",
		allowfullscreen: "true"
	}).appendTo(this.screenElementJQ);

	// zaznamenam prehrani videa
	let videoService = DP.getObject(DP.VideoService);
	videoService.submitVideoPlayback(this.currentMediaAttributes.id);
};

DP.MediaPlayerManager.prototype.setupMediaInfo = function (mediaAttributes) {
	DP.checkNotNull(mediaAttributes, "Media attributes must not be null");
	// player query
	let playerQuery = mediaAttributes.playerQuery;
	DP.checkArgument(DP.isNotUndefined(playerQuery) && DP.isNotNull(playerQuery), "PlayerQuery must not be " + playerQuery);
	this.currentMediaAttributes = mediaAttributes;
	this.screenElementJQ.data("player-query", playerQuery);
	// title
	let titleElement = this.playerBoxElementJQ.children(".media-player__title");
	if (titleElement.length !== 0) {
		let composedTitle = DP.isUndefined(mediaAttributes.partNumber)
			? mediaAttributes.cleanTitle
			: mediaAttributes.partNumber + " " + mediaAttributes.cleanTitle;
		titleElement.text(composedTitle);
	}
	// last broadcast date
	let broadcastElement = this.playerBoxElementJQ.children(".media-player__date");
	if (broadcastElement.length !== 0) {
		broadcastElement.text(DP.isNotUndefined(mediaAttributes.lastBroadcastDate) ? mediaAttributes.lastBroadcastDate : "");
	}
	// more information
	if (this.additionalInfoElementJQ.length !== 0) {
		// title
		let titleElement = this.additionalInfoElementJQ.children("h2");
		titleElement.text(mediaAttributes.cleanTitle);
		// description
		let descriptionElement = this.additionalInfoElementJQ.find(".description");
		if (DP.isUndefined(mediaAttributes.description)) {
			descriptionElement.text("");
		} else {
			descriptionElement.html(mediaAttributes.description);
		}
		// duration
		let durationElement = this.additionalInfoElementJQ.find(".duration");
		durationElement.text(mediaAttributes.duration);
		// release year
		let releaseYearElement = this.additionalInfoElementJQ.find(".release-year");
		releaseYearElement.text(DP.isNotUndefined(mediaAttributes.releaseYear) ? mediaAttributes.releaseYear : "");
		// last broadcast
		let broadcastElement = this.additionalInfoElementJQ.find(".last-broadcast");
		broadcastElement.text(DP.isNotUndefined(mediaAttributes.lastBroadcastDate) ? mediaAttributes.lastBroadcastDate : "");
	}
};

DP.MediaPlayerManager.prototype.setupAndPlay = function (mediaAttributes) {
	// zrusim zaznamenani prehrani videa, pokud jeste nebylo zaznamenano
	let videoService = DP.getObject(DP.VideoService);
	videoService.suppressVideoPlayback(this.currentMediaAttributes.id);
	// nastavim a spustim prehravac
	this.setupMediaInfo(mediaAttributes);
	this.startPlayer();
};

/**
 * Manager boxu se seznamy videi/audii
 * 
 * @constructor
 * @param {String} id Identifikator elemntu, ktery box reprezentuje
 * 
 * @throws {DP.IllegalArgumentException} pokud 'id' je undefined, null nebo ""
 * @throws {DP.ElementNotFoundException} pokud HTML element podle id neexistuje
 */
DP.MediaListManager = function MediaListManager(id) {
	DP.checkNotNull(id, "ID of MediaListBox must not be null");
	DP.checkArgument(id !== "", "ID of MediaListBox must not be empty.");

	this.listBoxId = id;
	this.listBoxElementJQ = $("#" + id);
	if (this.listBoxElementJQ.length === 0) {
		throw new DP.ElementNotFoundException("Element with ID=[" + id + "] does not exists.");
	}
	// inicializace atributu
	this.playerBoxId = this.listBoxElementJQ.data("player-box-id");
	this.currentActiveItemJQ = $("#" + id + " .content-list__item-active");
};

DP.MediaListManager.prototype.getMediaAttributes = function (listItemId) {
	// zkusim ziskat data z cache
	let mediaAttributes = DP.cache.get(listItemId);

	if (DP.isUndefined(mediaAttributes) || DP.isNull(mediaAttributes)) {
		// data v cache nejsou, ziskam root element polozky seznamu
		let itemElementJQ = $("#" + listItemId);
		if (itemElementJQ.length === 0) {
			DP.log.error("Nelze sestavit atributy videa.");
			throw new DP.ElementNotFoundException("Element polozky seznamu s ID=[" + listItemId + "] neexistuje.");
		}
		// ziskam extra metadata element
		let mediaDataElementJQ = itemElementJQ.children(".media-metadata");
		if (mediaDataElementJQ.length === 0) {
			DP.log.error("Nelze sestavit atributy videa.");
			throw new DP.ElementNotFoundException("Element s metadaty videa neexistuje. Selector=[#" + listItemId + " .media-metadata]");
		}
		// ziskam element obsahujici titulek videa
		let mediaTitleElement = mediaDataElementJQ.children(".title");
		if (mediaTitleElement.length === 0) {
			DP.log.error("Nelze sestavit atributy videa.");
			throw new DP.ElementNotFoundException("Element s nazvem videa neexistuje. Selector=[#" + listItemId + " .media-metadata .title]");
		}
		// sestavim povinne atributy
		mediaAttributes = {
			id: mediaDataElementJQ.data("id"),
			posterUri: mediaDataElementJQ.data("poster-uri"),
			playerQuery: mediaDataElementJQ.data("player-query"),
			videoType: mediaDataElementJQ.data("video-type"),
			duration: mediaDataElementJQ.data("duration"),
			title: mediaTitleElement.html(),
			cleanTitle: mediaTitleElement.data("clean-title")
		};
		// nepovinne description
		let mediaDescriptionElementJQ = mediaDataElementJQ.children(".description");
		if (mediaDescriptionElementJQ.length !== 0) {
			mediaAttributes.description = mediaDescriptionElementJQ.html();
		}
		// pokud typ videa je EPISODE, ziskam jeste dalsi informace
		if (mediaAttributes.videoType === "EPISODE") {
			let partNumber = mediaDataElementJQ.data("part-number");
			let releaseYear = mediaDataElementJQ.data("release-year");
			let premiereDate = mediaDataElementJQ.data("premiere");
			let lastBroadcastDate = mediaDataElementJQ.data("last-broadcast");
			//
			if (DP.isNotUndefined(partNumber) && DP.isNotNull(partNumber)) {
				mediaAttributes.partNumber = partNumber;
			}
			if (DP.isNotUndefined(releaseYear) && DP.isNotNull(releaseYear)) {
				mediaAttributes.releaseYear = releaseYear;
			}
			if (DP.isNotUndefined(premiereDate) && DP.isNotNull(premiereDate)) {
				mediaAttributes.premiereDate = premiereDate;
			}
			if (DP.isNotUndefined(lastBroadcastDate) && DP.isNotNull(lastBroadcastDate)) {
				mediaAttributes.lastBroadcastDate = lastBroadcastDate;
			}
		}
		DP.cache.put(listItemId, mediaAttributes);
		DP.log.debug("Sestaveny atributy videa", mediaAttributes);
	}
	return mediaAttributes;
};

DP.MediaListManager.prototype.play = function (listItemId) {
	DP.checkNotNull(listItemId, "ID of MediaListItem must not be null");
	DP.checkArgument(listItemId !== "", "ID of MediaListItem must not be empty.");

	let mediaAttributes = this.getMediaAttributes(listItemId);

	// nastavim polozku v seznamu jako aktivni
	if (DP.isNotNull(this.currentActiveItemJQ)) {
		// puvodni aktivni polozka prestane byt aktivni
		this.currentActiveItemJQ.removeClass("content-list__item-active");
	}
	this.currentActiveItemJQ = $("#" + listItemId);
	this.currentActiveItemJQ.addClass("content-list__item-active");

	// ziskam managera a spustim prehravac
	let playerBoxManager = DP.getObject(DP.MediaPlayerManager, this.playerBoxId);
	playerBoxManager.setupAndPlay(mediaAttributes);
};


/*
 *	INICIALIZACE PROSTREDI
 */

/**
 * Registruje callback funkci, ktera bude spustena po plnem nacteni stranky,
 * sestaveni DOM a inicializaci prostredi DP.
 * <p>
 * Funkce <code>DP.ready()</code> umoznuje provest JS kod jakmile je bezpecne
 * manipulovat s DOM objektem a pouzivat prostredi DP.
 * </p>
 * <pre>
 * DP.ready( callback [, precedence])</pre>
 * 
 * @argument {function} callback Funkce, ktera bude provedena az bude DP pripraveno.
 * @argument {Number} precedence Nastavi prednost provedeni callback funkce.
 * Defaultni hodnota je 10. Nizsi hodnota znamena vyssi prednost.
 */
DP.ready = function () {
	if (arguments.length === 0) {
		// nejmene jeden argument musi byt zadan
		throw new DP.IllegalArgumentException("DP.ready() call with missing arguments.");
	}
	const callback = arguments[0];
	if (!DP.isFunction(callback)) {
		throw new DP.IllegalArgumentException("DP.ready(): Argument is not a function.");
	}
	// overim stav pripravenosti prostredi
	if (DP.flags.check(DP.constants.READY_FLAG_NAME)) {
		// prostredi uz bylo inicializovano -> callback provedu bez odkladu
		callback();
		return;
	}
	// jeste nedoslo k inicializaci -> naplanuji zpracovani callbacku
	const precedence = (DP.isUndefined(arguments[1]) || DP.isNull(arguments[1])) ? 10 : arguments[1];
	const readyQueues = DP._getReadyQueues();
	let queue = readyQueues.get(precedence);
	if (DP.isUndefined(queue) || DP.isNull(queue)) {
		// fronta zatim neexistuje, tak ji zalozim
		queue = [];
		readyQueues.put(precedence, queue);
	}
	// pridam callback do fronty
	queue.push(callback);
};

DP._getReadyQueues = function () {
	return DP.cache.getPrivateCache("dp.ready.queues");
};

DP._init = function (settings) {
	// POZNAMKA IMPLEMENTACE:
	// V nekterych pripadech neni vhodne pouzit DP.log, kvuli defaultnimu
	// nastaveni loggingLevel.

	// kontrola vicenasobne inicializace (uz skoncila a nebo prave probiha)
	let recursiveInitCall = DP.flags.getThenSetTrue(DP.constants.INIT_IN_PROGRESS_FLAG_NAME);
	if (DP.flags.check(DP.constants.READY_FLAG_NAME) || recursiveInitCall) {
		DP.log.error("Pokus o vicenasobnou inicializaci prostredi DP.");
		return;
	}

	// Defaultni context objekt
	// Pokud nebyla zadana konfigurace, predpoklada se produkcni prostredi.
	let lc = window.location;
	DP.context = {
		isProduction: true,
		requestUri: lc.pathname,
		mappingUri: null,
		activeSection: null,
		baseUrl: lc.protocol + "//" + lc.host,
		client: null
	};

	// nastaveni kontextu prostredi podle dodanych parametru
	if (DP.isNotUndefined(settings)) {
		// dodane nastaveni prepise defaultni hodnoty v kontextu
		$.extend(DP.context, settings);
	}

	// fronty uloh registrovane prostrednictvim DP.ready
	const readyQueues = DP._getReadyQueues();
	// fronta, ktera se ma provest pred inicializaci ma precedence=0
	let beforeInitQueue = readyQueues.get(0);
	if (DP.isNotUndefined(beforeInitQueue) && DP.isNotNull(beforeInitQueue) && beforeInitQueue.length > 0) {
		// spustim registrovane ulohy
		for (let j = 0; j < beforeInitQueue.length; j++) {
			try {
				let callback = beforeInitQueue[j];
				callback();
			} catch (exception) {
				DP.log.error(exception);
			}
		}
		// odeberu zpracovanou frontu z registru
		readyQueues.remove(0);
	}

	// Promise polyfill
	// https://github.com/taylorhakes/promise-polyfill.git
	// https://github.com/taylorhakes/setAsap.git
	if (typeof Promise !== 'undefined') {
		// By default promise-polyfill uses setImmediate, but falls back to setTimeout
		// for executing asynchronously. If a browser does not support setImmediate
		// (IE/Edge are the only browsers with setImmediate), you may see
		// performance issues. Uses a setAsap (setImmediate polyfill) to fix this issue.
		if (typeof setAsap !== 'undefined') {
			Promise._immediateFn = setAsap;
		} else {
			window.console.error("DP: 'setImmediate' polyfill not found at global scope.");
		}
	} else {
		window.console.error("DP: 'Promise' not found at global scope.");
	}

	// Test via a getter in the options object to see if the passive property is accessed
	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	try {
		var opts = Object.defineProperty({}, 'passive', {
			get: function () {
				DP.flags.getThenSetTrue("supportsPassiveEvents");
			}
		});
		window.addEventListener("testPassive", null, opts);
		window.removeEventListener("testPassive", null, opts);
	} catch (ignored) {
	}
	DP.log.info("Browser does " + (DP.flags.check("supportsPassiveEvents") ? "" : "not ") + "support passive events.");

	// Added non-passive event listener to a scroll-blocking 'touchstart' event.
	// https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	// POZNAMKA:
	// Stejne nastaveni pro udalosti 'wheel' a 'mousewheel' zpusobuji nefunkcnost
	// pluginu jQuery mousewheel.
	jQuery.event.special.touchstart = {
		setup: function (_, ns, handle) {
			// For IE9 and earlier string.search(searchvalue)
			if (DP.isNotUndefined(ns.search) && ns.search("nonPassive") !== -1) {
				// $("selector").on("touchstart.nonPassive");
				this.addEventListener("touchstart", handle, {passive: false});
			} else {
				// window.console.log("forced passive events");
				this.addEventListener("touchstart", handle, {passive: true});
			}
		}
	};
	jQuery.event.special.touchmove = {
		setup: function (_, ns, handle) {
			// For IE9 and earlier string.search(searchvalue)
			if (DP.isNotUndefined(ns.search) && ns.search("nonPassive") !== -1) {
				// $("selector").on("touchmove.nonPassive");
				this.addEventListener("touchmove", handle, {passive: false});
			} else {
				// window.console.log("forced passive events");
				this.addEventListener("touchmove", handle, {passive: true});
			}
		}
	};

	// User-Agent parser
	// https://github.com/faisalman/ua-parser-js
	// UAParser se ma automaticky pridat do jQuery. Pokud se tak stane, pouzije
	// se tato registrovana instance.
	let client = new DP.ClientDetails();
	try {
		let parserResult = jQuery.ua;
		if (DP.isTrue(jQuery.ua)) {
			parserResult = jQuery.ua;
		} else {
			// Pokud parser neni registrovany, zjistim jeho dostupnost.
			if (typeof UAParser !== 'undefined') {
				let parser = new UAParser();
				parserResult = parser.getResult();
			} else {
				window.console.error("DP: 'UAParser' not found at global scope.");
				DP.log.info("Pouzije se zjednodusena detekce mobilnich zarizeni.");
				// UAParser neni k dispozici, tak pouziju vlastni implementaci.
				parserResult = new DP.ClientDetails();
				parserResult.ua = window.navigator.userAgent;
				//
				let uaLower = parserResult.ua.toLowerCase();
				if (uaLower.indexOf("android") > -1) {
					parserResult.os.name = "Android";
					parserResult.device.type = "mobile";
				} else if (/iPad|iPhone|iPod/.test(navigator.platform) || uaLower.match(/ios/i)) {
					parserResult.os.name = "iOS";
					parserResult.device.type = "mobile";
				} else if (uaLower.match(/windows phone/i) || uaLower.match(/iemobile/i) || uaLower.match(/wpdesktop/i)) {
					parserResult.os.name = "Windows";
					parserResult.device.type = "mobile";
				} else if (uaLower.match(/.*(mobi|phone).*/i)) {
					parserResult.device.type = "mobile";
				}
			}
			;
		}
		client.userAgent = parserResult.ua;
		client.browser = parserResult.browser;
		client.cpu = parserResult.cpu;
		client.device = parserResult.device;
		client.engine = parserResult.engine;
		client.os = parserResult.os;
		let deviceType = parserResult.device.type;
		if (deviceType === "mobile" || deviceType === "tablet") {
			client.__mobileOrTablet = true;
		}
	} catch (exception) {
		DP.log.error(exception);
	}
	DP.context.client = client;

	// nastavim priznak, ze DP je ready a inicializace je dokoncena
	DP.flags.getThenSetTrue(DP.constants.READY_FLAG_NAME);
	DP.flags.getThenSetFalse(DP.constants.INIT_IN_PROGRESS_FLAG_NAME);
	window.console.log("DP: Environment initialization finished.");

	// nakonec vyprazdnim zasobnik cekajicich uloh;
	// pokud jsou nejake registrovane, tak je provedu
	if (!readyQueues.isEmpty()) {
		let precedences = readyQueues.getKeys();
		precedences.sort(function (a, b) {
			return a - b;
		});
		for (let idx = 0; idx < precedences.length; idx++) {
			let queue = readyQueues.get(precedences[idx]);
			for (let j = 0; j < queue.length; j++) {
				try {
					// TODO:
					// Osetrit precedence pro pripady, kdy callback vola funkci
					// DP.ready(). Nyni je to mozne, ale ignoruje se precedence,
					// protoze v tomto okamziku uz je DP inicializovane.
					let callback = queue[j];
					callback();
				} catch (exception) {
					DP.log.error(exception);
				}
			}
		}
	}
};


/**
 * Vraci funkci, ktera provede inicializaci knihovny DP podle dane konfigurace.
 * 
 * @param {Object} settings
 * @returns {Function}
 */
DP.init = function (settings) {
	let fn = function () {
		DP._init(settings);
	};
	return fn;
};








