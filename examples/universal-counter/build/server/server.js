/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _express = __webpack_require__(/*! express */ 8);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _path = __webpack_require__(/*! path */ 9);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _reduxCore = __webpack_require__(/*! redux-core */ 10);
	
	var _shared = __webpack_require__(/*! ../shared */ 11);
	
	var _utilsGetIntentStream = __webpack_require__(/*! ./utils/getIntentStream */ 1);
	
	var _utilsGetIntentStream2 = _interopRequireDefault(_utilsGetIntentStream);
	
	var _utilsRender = __webpack_require__(/*! ./utils/render */ 16);
	
	var _utilsRender2 = _interopRequireDefault(_utilsRender);
	
	var _sharedViewComponentsCounter = __webpack_require__(/*! ../shared/view/components/Counter */ 17);
	
	var _sharedViewComponentsCounter2 = _interopRequireDefault(_sharedViewComponentsCounter);
	
	var _react = __webpack_require__(/*! react */ 18);
	
	var _react2 = _interopRequireDefault(_react);
	
	var app = _express2['default']();
	
	// main
	app.get('/', function (req, res) {
	  var intentIds = req.query.intentId;
	
	  console.log('\n\nReceive request with intent ids: ' + intentIds);
	
	  var store = _reduxCore.createStore(_shared.reducer);
	  var intent$ = _utilsGetIntentStream2['default'](intentIds);
	  var action$ = _shared.applyRxMiddleware(intent$, store);
	  var state$ = action$.map(store.dispatch).startWith(store.getState());
	
	  var finalState = store.getState();
	
	  state$.subscribe(function (state) {
	    console.log(state);
	    finalState = state;
	  }, function (err) {
	    throw new Error(err);
	  }, function () {
	    console.log('state$ completed.');
	    var intent$ = {};
	    var view = _react2['default'].renderToString(_react2['default'].createElement(_sharedViewComponentsCounter2['default'], { state: finalState, intent$: intent$ }));
	    res.send(_utilsRender2['default'](view, finalState));
	  });
	});
	
	// static path for browser to get bundle.js
	app.use('/assets', _express2['default']['static'](_path2['default'].join('.', 'build', 'assets')));
	
	app.get('*', function (req, res) {
	  res.status(404).end('404 - Page Not Found');
	});
	
	app.listen(3000, function () {
	  console.log('Listening on port 3000, root: ' + _path2['default'].dirname(__webpack_require__.c[0].filename));
	});

/***/ },
/* 1 */
/*!*********************************************!*\
  !*** ./src/server/utils/getIntentStream.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = getIntentStream;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rx = __webpack_require__(/*! rx */ 2);
	
	var _rx2 = _interopRequireDefault(_rx);
	
	var _sharedIntentsCounterIntentList = __webpack_require__(/*! ../../shared/intents/CounterIntentList */ 5);
	
	// Transform intent ids to intent function
	
	var _sharedIntentsCounterIntentList2 = _interopRequireDefault(_sharedIntentsCounterIntentList);
	
	function getIntentStream(intentIds) {
	  var intents = [];
	
	  if (intentIds) {
	    intentIds.split('').forEach(function (id) {
	      var intentCreator = _sharedIntentsCounterIntentList2['default'][id];
	
	      // in case user modify query string to invalid id like '11asdasdas'
	      if (intentCreator) {
	        var intent = intentCreator();
	        intents.push(intent);
	      }
	    });
	  }
	
	  return _rx2['default'].Observable.from(intents);
	}
	
	module.exports = exports['default'];

/***/ },
/* 2 */
/*!********************************************************!*\
  !*** ./~/rx-lite-joinpatterns/rx.lite.joinpatterns.js ***!
  \********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// Copyright (c) Microsoft Open Technologies, Inc. All rights reserved. See License.txt in the project root for license information.
	
	;(function (factory) {
	    var objectTypes = {
	        'boolean': false,
	        'function': true,
	        'object': true,
	        'number': false,
	        'string': false,
	        'undefined': false
	    };
	
	    var root = (objectTypes[typeof window] && window) || this,
	        freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports,
	        freeModule = objectTypes[typeof module] && module && !module.nodeType && module,
	        moduleExports = freeModule && freeModule.exports === freeExports && freeExports,
	        freeGlobal = objectTypes[typeof global] && global;
	
	    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	        root = freeGlobal;
	    }
	
	    // Because of build optimizers
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! rx-lite */ 4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Rx, exports) {
	            return factory(root, exports, Rx);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module === 'object' && module && module.exports === freeExports) {
	        module.exports = factory(root, module.exports, require('rx-lite'));
	    } else {
	        root.Rx = factory(root, {}, root.Rx);
	    }
	}.call(this, function (root, exp, Rx, undefined) {
	
	  // Aliases
	  var Observable = Rx.Observable,
	    observableProto = Observable.prototype,
	    AnonymousObservable = Rx.AnonymousObservable,
	    observableThrow = Observable.throwError,
	    observerCreate = Rx.Observer.create,
	    SingleAssignmentDisposable = Rx.SingleAssignmentDisposable,
	    CompositeDisposable = Rx.CompositeDisposable,
	    AbstractObserver = Rx.internals.AbstractObserver,
	    noop = Rx.helpers.noop,
	    defaultComparer = Rx.internals.isEqual,
	    inherits = Rx.internals.inherits,
	    Enumerable = Rx.internals.Enumerable,
	    Enumerator = Rx.internals.Enumerator,
	    $iterator$ = Rx.iterator,
	    doneEnumerator = Rx.doneEnumerator;
	
	  /** @private */
	  var Map = root.Map || (function () {
	
	    function Map() {
	      this._keys = [];
	      this._values = [];
	    }
	
	    Map.prototype.get = function (key) {
	      var i = this._keys.indexOf(key);
	      return i !== -1 ? this._values[i] : undefined;
	    };
	
	    Map.prototype.set = function (key, value) {
	      var i = this._keys.indexOf(key);
	      i !== -1 && (this._values[i] = value);
	      this._values[this._keys.push(key) - 1] = value;
	    };
	
	    Map.prototype.forEach = function (callback, thisArg) {
	      for (var i = 0, len = this._keys.length; i < len; i++) {
	        callback.call(thisArg, this._values[i], this._keys[i]);
	      }
	    };
	
	    return Map;
	  }());
	
	  /**
	   * @constructor
	   * Represents a join pattern over observable sequences.
	   */
	  function Pattern(patterns) {
	    this.patterns = patterns;
	  }
	
	  /**
	   *  Creates a pattern that matches the current plan matches and when the specified observable sequences has an available value.
	   *  @param other Observable sequence to match in addition to the current pattern.
	   *  @return {Pattern} Pattern object that matches when all observable sequences in the pattern have an available value.
	   */
	  Pattern.prototype.and = function (other) {
	    return new Pattern(this.patterns.concat(other));
	  };
	
	  /**
	   *  Matches when all observable sequences in the pattern (specified using a chain of and operators) have an available value and projects the values.
	   *  @param {Function} selector Selector that will be invoked with available values from the source sequences, in the same order of the sequences in the pattern.
	   *  @return {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
	   */
	  Pattern.prototype.thenDo = function (selector) {
	    return new Plan(this, selector);
	  };
	
	  function Plan(expression, selector) {
	      this.expression = expression;
	      this.selector = selector;
	  }
	
	  Plan.prototype.activate = function (externalSubscriptions, observer, deactivate) {
	    var self = this;
	    var joinObservers = [];
	    for (var i = 0, len = this.expression.patterns.length; i < len; i++) {
	      joinObservers.push(planCreateObserver(externalSubscriptions, this.expression.patterns[i], observer.onError.bind(observer)));
	    }
	    var activePlan = new ActivePlan(joinObservers, function () {
	      var result;
	      try {
	        result = self.selector.apply(self, arguments);
	      } catch (e) {
	        observer.onError(e);
	        return;
	      }
	      observer.onNext(result);
	    }, function () {
	      for (var j = 0, jlen = joinObservers.length; j < jlen; j++) {
	        joinObservers[j].removeActivePlan(activePlan);
	      }
	      deactivate(activePlan);
	    });
	    for (i = 0, len = joinObservers.length; i < len; i++) {
	      joinObservers[i].addActivePlan(activePlan);
	    }
	    return activePlan;
	  };
	
	  function planCreateObserver(externalSubscriptions, observable, onError) {
	    var entry = externalSubscriptions.get(observable);
	    if (!entry) {
	      var observer = new JoinObserver(observable, onError);
	      externalSubscriptions.set(observable, observer);
	      return observer;
	    }
	    return entry;
	  }
	
	  function ActivePlan(joinObserverArray, onNext, onCompleted) {
	    this.joinObserverArray = joinObserverArray;
	    this.onNext = onNext;
	    this.onCompleted = onCompleted;
	    this.joinObservers = new Map();
	    for (var i = 0, len = this.joinObserverArray.length; i < len; i++) {
	      var joinObserver = this.joinObserverArray[i];
	      this.joinObservers.set(joinObserver, joinObserver);
	    }
	  }
	
	  ActivePlan.prototype.dequeue = function () {
	    this.joinObservers.forEach(function (v) { v.queue.shift(); });
	  };
	
	  ActivePlan.prototype.match = function () {
	    var i, len, hasValues = true;
	    for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
	      if (this.joinObserverArray[i].queue.length === 0) {
	        hasValues = false;
	        break;
	      }
	    }
	    if (hasValues) {
	      var firstValues = [],
	          isCompleted = false;
	      for (i = 0, len = this.joinObserverArray.length; i < len; i++) {
	        firstValues.push(this.joinObserverArray[i].queue[0]);
	        this.joinObserverArray[i].queue[0].kind === 'C' && (isCompleted = true);
	      }
	      if (isCompleted) {
	        this.onCompleted();
	      } else {
	        this.dequeue();
	        var values = [];
	        for (i = 0, len = firstValues.length; i < firstValues.length; i++) {
	          values.push(firstValues[i].value);
	        }
	        this.onNext.apply(this, values);
	      }
	    }
	  };
	
	  var JoinObserver = (function (__super__) {
	    inherits(JoinObserver, __super__);
	
	    function JoinObserver(source, onError) {
	      __super__.call(this);
	      this.source = source;
	      this.onError = onError;
	      this.queue = [];
	      this.activePlans = [];
	      this.subscription = new SingleAssignmentDisposable();
	      this.isDisposed = false;
	    }
	
	    var JoinObserverPrototype = JoinObserver.prototype;
	
	    JoinObserverPrototype.next = function (notification) {
	      if (!this.isDisposed) {
	        if (notification.kind === 'E') {
	          return this.onError(notification.exception);
	        }
	        this.queue.push(notification);
	        var activePlans = this.activePlans.slice(0);
	        for (var i = 0, len = activePlans.length; i < len; i++) {
	          activePlans[i].match();
	        }
	      }
	    };
	
	    JoinObserverPrototype.error = noop;
	    JoinObserverPrototype.completed = noop;
	
	    JoinObserverPrototype.addActivePlan = function (activePlan) {
	      this.activePlans.push(activePlan);
	    };
	
	    JoinObserverPrototype.subscribe = function () {
	      this.subscription.setDisposable(this.source.materialize().subscribe(this));
	    };
	
	    JoinObserverPrototype.removeActivePlan = function (activePlan) {
	      this.activePlans.splice(this.activePlans.indexOf(activePlan), 1);
	      this.activePlans.length === 0 && this.dispose();
	    };
	
	    JoinObserverPrototype.dispose = function () {
	      __super__.prototype.dispose.call(this);
	      if (!this.isDisposed) {
	        this.isDisposed = true;
	        this.subscription.dispose();
	      }
	    };
	
	    return JoinObserver;
	  } (AbstractObserver));
	
	  /**
	   *  Creates a pattern that matches when both observable sequences have an available value.
	   *
	   *  @param right Observable sequence to match with the current sequence.
	   *  @return {Pattern} Pattern object that matches when both observable sequences have an available value.
	   */
	  observableProto.and = function (right) {
	    return new Pattern([this, right]);
	  };
	
	  /**
	   *  Matches when the observable sequence has an available value and projects the value.
	   *
	   *  @param {Function} selector Selector that will be invoked for values in the source sequence.
	   *  @returns {Plan} Plan that produces the projected values, to be fed (with other plans) to the when operator.
	   */
	  observableProto.thenDo = function (selector) {
	    return new Pattern([this]).thenDo(selector);
	  };
	
	  /**
	   *  Joins together the results from several patterns.
	   *
	   *  @param plans A series of plans (specified as an Array of as a series of arguments) created by use of the Then operator on patterns.
	   *  @returns {Observable} Observable sequence with the results form matching several patterns.
	   */
	  Observable.when = function () {
	    var len = arguments.length, plans;
	    if (Array.isArray(arguments[0])) {
	      plans = arguments[0];
	    } else {
	      plans = new Array(len);
	      for(var i = 0; i < len; i++) { plans[i] = arguments[i]; }
	    }
	    return new AnonymousObservable(function (o) {
	      var activePlans = [],
	          externalSubscriptions = new Map();
	      var outObserver = observerCreate(
	        function (x) { o.onNext(x); },
	        function (err) {
	          externalSubscriptions.forEach(function (v) { v.onError(err); });
	          o.onError(err);
	        },
	        function (x) { o.onCompleted(); }
	      );
	      try {
	        for (var i = 0, len = plans.length; i < len; i++) {
	          activePlans.push(plans[i].activate(externalSubscriptions, outObserver, function (activePlan) {
	            var idx = activePlans.indexOf(activePlan);
	            activePlans.splice(idx, 1);
	            activePlans.length === 0 && o.onCompleted();
	          }));
	        }
	      } catch (e) {
	        observableThrow(e).subscribe(o);
	      }
	      var group = new CompositeDisposable();
	      externalSubscriptions.forEach(function (joinObserver) {
	        joinObserver.subscribe();
	        group.add(joinObserver);
	      });
	
	      return group;
	    });
	  };
	
	    return Rx;
	}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/buildin/module.js */ 3)(module)))

/***/ },
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 4 */
/*!**************************!*\
  !*** external "rx-lite" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("rx-lite");

/***/ },
/* 5 */
/*!*************************************************!*\
  !*** ./src/shared/intents/CounterIntentList.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	var _CounterIntents = __webpack_require__(/*! ./CounterIntents */ 6);
	
	var CounterIntents = _interopRequireWildcard(_CounterIntents);
	
	var list = [CounterIntents.increment, CounterIntents.decrement, CounterIntents.incrementIfOdd, CounterIntents.incrementTimeout, CounterIntents.incrementPromise];
	
	exports['default'] = list;
	module.exports = exports['default'];

/***/ },
/* 6 */
/*!**********************************************!*\
  !*** ./src/shared/intents/CounterIntents.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.increment = increment;
	exports.decrement = decrement;
	exports.incrementIfOdd = incrementIfOdd;
	exports.incrementTimeout = incrementTimeout;
	exports.incrementPromise = incrementPromise;
	
	var _constantsIntentTypes = __webpack_require__(/*! ../constants/IntentTypes */ 7);
	
	var isBrowser = typeof window !== 'undefined';
	
	function setQueryString(creatorId) {
	  if (isBrowser) {
	    var base = window.location.search.length ? window.location.search : '?intentId=';
	    window.history.replaceState(null, null, base + creatorId);
	  }
	}
	
	function increment() {
	  // index of this function in `CounterIntentList`
	  setQueryString(0);
	
	  return {
	    type: _constantsIntentTypes.INCREMENT_COUNTER
	  };
	}
	
	function decrement() {
	  setQueryString(1);
	
	  return {
	    type: _constantsIntentTypes.DECREMENT_COUNTER
	  };
	}
	
	function incrementIfOdd() {
	  setQueryString(2);
	
	  return function (getState) {
	    var _getState = getState();
	
	    var counter = _getState.counter;
	
	    if (counter % 2 === 0) {
	      return {
	        type: _constantsIntentTypes.DUMMY_ACTION
	      };
	    }
	
	    return {
	      type: _constantsIntentTypes.INCREMENT_COUNTER
	    };
	  };
	}
	
	function incrementTimeout() {
	  setQueryString(3);
	
	  return {
	    type: _constantsIntentTypes.INCREMENT_DELAY,
	    payload: {
	      action: {
	        type: _constantsIntentTypes.INCREMENT_COUNTER
	      },
	      time: 1000
	    }
	  };
	}
	
	function incrementPromise() {
	  setQueryString(4);
	
	  function getRandomTime() {
	    return Math.floor(Math.random() * 10 % 5) * 100 + 800;
	  }
	
	  return new Promise(function (resolve) {
	    setTimeout(function () {
	      resolve({
	        type: _constantsIntentTypes.INCREMENT_COUNTER
	      });
	    }, getRandomTime());
	  });
	}

/***/ },
/* 7 */
/*!*********************************************!*\
  !*** ./src/shared/constants/IntentTypes.js ***!
  \*********************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var INCREMENT_COUNTER = 'INCREMENT_COUNTER';
	exports.INCREMENT_COUNTER = INCREMENT_COUNTER;
	var DECREMENT_COUNTER = 'DECREMENT_COUNTER';
	exports.DECREMENT_COUNTER = DECREMENT_COUNTER;
	var INCREMENT_DELAY = 'INCREMENT_DELAY';
	exports.INCREMENT_DELAY = INCREMENT_DELAY;
	var DUMMY_ACTION = 'DUMMY_ACTION';
	exports.DUMMY_ACTION = DUMMY_ACTION;

/***/ },
/* 8 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 9 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 10 */
/*!*****************************!*\
  !*** external "redux-core" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("redux-core");

/***/ },
/* 11 */
/*!*****************************!*\
  !*** ./src/shared/index.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.applyRxMiddleware = applyRxMiddleware;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rxMiddlewareThunkMiddleware = __webpack_require__(/*! ./rx-middleware/thunkMiddleware */ 12);
	
	var _rxMiddlewareThunkMiddleware2 = _interopRequireDefault(_rxMiddlewareThunkMiddleware);
	
	var _rxMiddlewarePromiseMiddleware = __webpack_require__(/*! ./rx-middleware/promiseMiddleware */ 13);
	
	var _rxMiddlewarePromiseMiddleware2 = _interopRequireDefault(_rxMiddlewarePromiseMiddleware);
	
	var _rxMiddlewareDelayMiddleware = __webpack_require__(/*! ./rx-middleware/delayMiddleware */ 14);
	
	var _rxMiddlewareDelayMiddleware2 = _interopRequireDefault(_rxMiddlewareDelayMiddleware);
	
	var _constantsIntentTypes = __webpack_require__(/*! ./constants/IntentTypes */ 7);
	
	var _reduxCore = __webpack_require__(/*! redux-core */ 10);
	
	var _reducersCounter = __webpack_require__(/*! ./reducers/counter */ 15);
	
	var reducers = _interopRequireWildcard(_reducersCounter);
	
	var middleware = [_rxMiddlewareThunkMiddleware2['default'], _rxMiddlewarePromiseMiddleware2['default'], _rxMiddlewareDelayMiddleware2['default']];
	
	function applyRxMiddleware(intent$, store) {
	  var action$ = middleware.reduce(function (prev, cur) {
	    return prev.flatMap(cur(store.getState));
	  }, intent$);
	
	  return action$.filter(function (action) {
	    return action.type !== _constantsIntentTypes.DUMMY_ACTION;
	  });
	}
	
	var reducer = _reduxCore.combineReducers(reducers);
	exports.reducer = reducer;

/***/ },
/* 12 */
/*!*****************************************************!*\
  !*** ./src/shared/rx-middleware/thunkMiddleware.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = thunkMiddleware;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rx = __webpack_require__(/*! rx */ 2);
	
	var _rx2 = _interopRequireDefault(_rx);
	
	function thunkMiddleware(getState) {
	  return function (action) {
	    if (typeof action === 'function') {
	      return _rx2['default'].Observable.just(action(getState));
	    }
	
	    return _rx2['default'].Observable.just(action);
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 13 */
/*!*******************************************************!*\
  !*** ./src/shared/rx-middleware/promiseMiddleware.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = promiseMiddleware;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _rx = __webpack_require__(/*! rx */ 2);
	
	var _rx2 = _interopRequireDefault(_rx);
	
	function isPromise(val) {
	  return val && typeof val.then === 'function';
	}
	
	function promiseMiddleware(getState) {
	  return function (action) {
	    if (isPromise(action)) {
	      return _rx2['default'].Observable.fromPromise(action);
	    }
	
	    return _rx2['default'].Observable.just(action);
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 14 */
/*!*****************************************************!*\
  !*** ./src/shared/rx-middleware/delayMiddleware.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = thunkMiddleware;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _constantsIntentTypes = __webpack_require__(/*! ../constants/IntentTypes */ 7);
	
	var _rx = __webpack_require__(/*! rx */ 2);
	
	var _rx2 = _interopRequireDefault(_rx);
	
	function thunkMiddleware(getState) {
	  return function (action) {
	    if (action.type === _constantsIntentTypes.INCREMENT_DELAY) {
	      return _rx2['default'].Observable.just(action.payload.action).delay(action.payload.time);
	    }
	
	    return _rx2['default'].Observable.just(action);
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 15 */
/*!****************************************!*\
  !*** ./src/shared/reducers/counter.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.counter = counter;
	
	var _constantsIntentTypes = __webpack_require__(/*! ../constants/IntentTypes */ 7);
	
	function counter() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  switch (action.type) {
	    case _constantsIntentTypes.INCREMENT_COUNTER:
	      return state + 1;
	    case _constantsIntentTypes.DECREMENT_COUNTER:
	      return state - 1;
	    default:
	      return state;
	  }
	}

/***/ },
/* 16 */
/*!************************************!*\
  !*** ./src/server/utils/render.js ***!
  \************************************/
/***/ function(module, exports) {

	// import fs from 'fs';
	
	"use strict";
	
	exports.__esModule = true;
	
	exports["default"] = function (view, state) {
	  var html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>redux-core</title>\n  <style>\n    button {\n      margin: 0 4px;\n    }\n  </style>\n</head>\n<body>\n<h1>Universal counter demo with redux-core</h1>\n<div id=\"root\">" + view + "</div>\n<script>window.__state = " + JSON.stringify(state) + " ;</script>\n<script src=\"/assets/js/bundle.js\"></script>\n</body>\n</html>";
	  return html;
	};
	
	module.exports = exports["default"];
	// const index = fs.readFileSync('./src/server/index.html', {encoding: 'utf-8'});

/***/ },
/* 17 */
/*!***********************************************!*\
  !*** ./src/shared/view/components/Counter.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react = __webpack_require__(/*! react */ 18);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _intentsCounterIntents = __webpack_require__(/*! ../../intents/CounterIntents */ 6);
	
	var CounterIntents = _interopRequireWildcard(_intentsCounterIntents);
	
	var Counter = (function (_Component) {
	  _inherits(Counter, _Component);
	
	  function Counter() {
	    _classCallCheck(this, Counter);
	
	    _Component.apply(this, arguments);
	  }
	
	  Counter.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	    return nextProps.state.counter !== this.props.state.counter;
	  };
	
	  Counter.prototype.render = function render() {
	    var _props = this.props;
	    var state = _props.state;
	    var intent$ = _props.intent$;
	
	    return _react2['default'].createElement(
	      'p',
	      null,
	      _react2['default'].createElement(
	        'button',
	        { onClick: function () {
	            return intent$.onNext(CounterIntents.decrement());
	          } },
	        '-'
	      ),
	      _react2['default'].createElement(
	        'span',
	        null,
	        state.counter
	      ),
	      _react2['default'].createElement(
	        'button',
	        { onClick: function () {
	            return intent$.onNext(CounterIntents.increment());
	          } },
	        '+'
	      ),
	      _react2['default'].createElement(
	        'button',
	        { onClick: function () {
	            return intent$.onNext(CounterIntents.incrementIfOdd());
	          } },
	        'Increment if odd'
	      ),
	      _react2['default'].createElement(
	        'button',
	        { onClick: function () {
	            return intent$.onNext(CounterIntents.incrementTimeout());
	          } },
	        'Increment after 1 sec.'
	      ),
	      _react2['default'].createElement(
	        'button',
	        { onClick: function () {
	            return intent$.onNext(CounterIntents.incrementPromise());
	          } },
	        'Increment from promise.'
	      )
	    );
	  };
	
	  return Counter;
	})(_react.Component);
	
	Counter.propTypes = {
	  state: _react.PropTypes.object.isRequired,
	  intent$: _react.PropTypes.object.isRequired
	};
	
	exports['default'] = Counter;
	module.exports = exports['default'];

/***/ },
/* 18 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("react");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map