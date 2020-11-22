// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/data.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flights = void 0;
//all data used
//data for flights
var flights = ["AB800", "BC900", "CD400", "DE400", "BF400", "CE300", "DE300", "EB600", "CE200", "DC700", "EB500", "FD200"];
exports.flights = flights;
},{}],"js/models/flights.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flightsModel = void 0;

var _data = require("../data.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// OOP
// Class for the flights model
var Flights = /*#__PURE__*/function () {
  function Flights(flights) {
    _classCallCheck(this, Flights);

    //variable to parse out the appropriate flight data
    var flightData = flights.map(function (flightElement) {
      //parse out flight id
      var id = flightElement; //parse out departure

      var departure = flightElement.slice(0, 1); //parse out destination

      var destination = flightElement.slice(1, 2); //parse out distance

      var distance = parseInt(flightElement.slice(2, 5)); //return result

      return {
        id: id,
        departure: departure,
        destination: destination,
        distance: distance
      };
    }); //assign the flight data to the property

    this.baseFlights = flightData; // Direct flights

    var directFlights = flightData;
    var singleRedirectFlights = []; // generate transfer flights for each single flight

    flightData.forEach(function (flight) {
      // filter out the flights that fly from the destination
      var existingFlights = flightData.filter(function (flightElement) {
        return flightElement.departure === flight.destination;
      }); // generate redirected flights

      var redirectedFlights = existingFlights.map(function (existingFlight) {
        return {
          id: "".concat(flight.id, "-").concat(existingFlight.id),
          departure: flight.departure,
          transfer1: flight.destination,
          destination: existingFlight.destination,
          distance: flight.distance + existingFlight.distance
        };
      });
      singleRedirectFlights = [].concat(_toConsumableArray(singleRedirectFlights), _toConsumableArray(redirectedFlights)); // add them to the single transfer variable
    });
    var doubleRedirectFlights = []; //generate all flights with 2 transfers

    singleRedirectFlights.forEach(function (flight) {
      var existingFlights = flightData.filter(function (flightElement) {
        return flightElement.destination === flight.transfer1;
      });
      var redirectedFlights = existingFlights.map(function (existingFlight) {
        return {
          id: "".concat(flight.id, "-").concat(existingFlight.id),
          departure: flight.departure,
          transfer1: flight.transfer1,
          transfer2: flight.destination,
          destination: existingFlight.destination,
          distance: flight.distance + existingFlight.distance
        };
      });
      doubleRedirectFlights = [].concat(_toConsumableArray(doubleRedirectFlights), _toConsumableArray(redirectedFlights));
    }); //spread operator...merges multiple arrays into one.

    this.possibleFlights = [].concat(_toConsumableArray(directFlights), _toConsumableArray(singleRedirectFlights), _toConsumableArray(doubleRedirectFlights));
  }

  _createClass(Flights, [{
    key: "getClosestFlight",
    value: function getClosestFlight(departure, destination, passengers) {
      // get appropriate flights
      var filteredFlights = this.possibleFlights.filter(function (flightElement) {
        return flightElement.departure === departure && flightElement.destination === destination;
      });
      var filteredFlights1 = this.possibleFlights.filter(function (flightElement) {
        return flightElement.destination === departure && flightElement.departure === destination;
      }); // sorting based on lowest distance

      filteredFlights.sort(function (a, b) {
        return a.distance - b.distance;
      });
      filteredFlights1.sort(function (a, b) {
        return a.distance - b.distance;
      }); // [1, 2] [] if array is empty come back as null - if no trips/combinations available

      var flightObject = {
        outbound: filteredFlights[0] ? filteredFlights[0] : null,
        inbound: filteredFlights1[0] ? filteredFlights1[0] : null
      };
      return flightObject;
    }
  }]);

  return Flights;
}();

; // Create the instance of the Flgiht class

var flightsModel = new Flights(_data.flights);
exports.flightsModel = flightsModel;
},{"../data.js":"js/data.js"}],"js/views/flightview.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderFlights = void 0;

//view
var renderFlights = function renderFlights(suggestion, passengers, transport) {
  var _suggestion$outbound, _suggestion$outbound2, _suggestion$inbound, _suggestion$inbound2, _suggestion$inbound3, _suggestion$outbound3;

  console.log(suggestion); //select conatainer

  var container = document.getElementById("suggestioncontainer"); // //reset the container

  container.innerHTML = ""; //generate markup

  var markup = "\n        <div class=\"card\" style=\"width: 38rem;\" id=\"suggestion\">\n        <div class=\"card-header\">\n          OUR SUGGESTION\n        </div>\n        <ul class=\"list-group list-group-flush\">\n        <li class=\"list-group-item\">Outbound Route: ".concat(suggestion === null || suggestion === void 0 ? void 0 : (_suggestion$outbound = suggestion.outbound) === null || _suggestion$outbound === void 0 ? void 0 : _suggestion$outbound.id, " </li>\n        <li class=\"list-group-item\">Outbound Cost: \xA3").concat((suggestion === null || suggestion === void 0 ? void 0 : (_suggestion$outbound2 = suggestion.outbound) === null || _suggestion$outbound2 === void 0 ? void 0 : _suggestion$outbound2.distance) * passengers * 0.1, "</li>\n        </br>\n        <li class=\"list-group-item\">Inbound Route:").concat(suggestion === null || suggestion === void 0 ? void 0 : (_suggestion$inbound = suggestion.inbound) === null || _suggestion$inbound === void 0 ? void 0 : _suggestion$inbound.id, " </li>\n        <li class=\"list-group-item\">Inbound Cost: \xA3").concat((suggestion === null || suggestion === void 0 ? void 0 : (_suggestion$inbound2 = suggestion.inbound) === null || _suggestion$inbound2 === void 0 ? void 0 : _suggestion$inbound2.distance) * passengers * 0.1, " </li>\n    </br>\n        <li class=\"list-group-item\"> Return Travel to Airport Cost & Type: \xA3").concat(transport === null || transport === void 0 ? void 0 : transport.cost, " (").concat(transport === null || transport === void 0 ? void 0 : transport.type, ") </li>\n        \n        </br>\n        <li class=\"list-group-item\" >TOTAL COST: \xA3").concat((suggestion === null || suggestion === void 0 ? void 0 : (_suggestion$inbound3 = suggestion.inbound) === null || _suggestion$inbound3 === void 0 ? void 0 : _suggestion$inbound3.distance) * passengers * 0.1 + (suggestion === null || suggestion === void 0 ? void 0 : (_suggestion$outbound3 = suggestion.outbound) === null || _suggestion$outbound3 === void 0 ? void 0 : _suggestion$outbound3.distance) * passengers * 0.1 + (transport === null || transport === void 0 ? void 0 : transport.cost), " </li>\n        \n        </ul>\n    </div>");
  var noFlightsMarkup = "\n    <p> No Flights </p>   \n    "; //insert markup into the container

  container.insertAdjacentHTML('beforeend', (suggestion === null || suggestion === void 0 ? void 0 : suggestion.outbound) && (suggestion === null || suggestion === void 0 ? void 0 : suggestion.inbound) ? markup : noFlightsMarkup);
};

exports.renderFlights = renderFlights;
},{}],"js/models/transport.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transportModel = exports.Transport = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// //  
// class that calculates the transport costs
var Transport = /*#__PURE__*/function () {
  function Transport(transport) {
    _classCallCheck(this, Transport);
  } //method


  _createClass(Transport, [{
    key: "getTransportCost",
    value: function getTransportCost(transport, passengers, transportType) {
      //calculating taxi
      var travelTaxi;

      if (passengers <= 4) {
        travelTaxi = transport * 0.4 * 2;
      } else if (passengers > 4 && passengers < 9) {
        travelTaxi = transport * 0.4 * 2 * 2;
      } else {
        travelTaxi = transport * 0.4 * 2 * 3;
      }

      console.log(travelTaxi); //calculating car

      var travelCar;

      if (passengers <= 4) {
        travelCar = transport * 0.2 * 2 + 3;
      } else if (passengers > 4 && passengers < 9) {
        travelCar = transport * 0.2 * 2 * 2 + 6;
      } else {
        travelCar = transport * 0.2 * 2 * 3 + 9;
      }

      console.log(travelCar);

      if (transportType === "Car") {
        return {
          type: "Car",
          cost: travelCar
        };
      } else {
        return {
          type: "Taxi",
          cost: travelTaxi
        };
      }
    }
  }]);

  return Transport;
}();

exports.Transport = Transport;
var transportModel = new Transport();
exports.transportModel = transportModel;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _flights = require("./js/models/flights.js");

var _flightview = require("./js/views/flightview.js");

var _transport = require("./js/models/transport.js");

//controller
//selectors
var inbound = document.getElementById("inbound");
var outbound = document.getElementById("outbound");
var distance = document.getElementById("distance");
var passengers = document.getElementById("passengers");
var transport = document.getElementById("transport");
var transportType = document.getElementById("typeoftransport"); // 

4; //app state - all info/data that app holds at a certain time. we set it as null there is no state, there can be if check

var state = {
  input: {
    outbound: null,
    inbound: null,
    distance: null,
    passengers: null,
    transport: null,
    transportType: null
  },
  output: {
    suggestion: null,
    transport: null
  }
}; //event handlers

outbound.addEventListener("change", function (event) {
  state.input.outbound = event.target.value;
  state.output.suggestion = _flights.flightsModel.getClosestFlight(state.input.inbound, state.input.outbound);
  if (state.output.suggestion && state.input.passengers) (0, _flightview.renderFlights)(state.output.suggestion, state.input.passengers);
});
console.log(state);
inbound.addEventListener("change", function (event) {
  state.input.inbound = event.target.value;
  state.output.suggestion = _flights.flightsModel.getClosestFlight(state.input.inbound, state.input.outbound, state.input.passengers);
  if (state.output.suggestion && state.input.passengers) (0, _flightview.renderFlights)(state.output.suggestion, state.input.passengers, state.transport);
  console.log(state);
}); //parseInt - used to change from type string to type number

passengers.addEventListener("change", function (event) {
  state.input.passengers = parseInt(event.target.value);
  state.output.transport = _transport.transportModel.getTransportCost(state.input.transport, state.input.passengers, state.input.transportType);
  if (state.output.suggestion && state.input.passengers && state.input.transport) (0, _flightview.renderFlights)(state.output.suggestion, state.input.passengers, state.output.transport);
});
transport.addEventListener("change", function (event) {
  state.input.transport = parseInt(event.target.value); // if (state.output.suggestion && state.input.passengers) renderFlights(state.output.suggestion, state.input.passengers);

  console.log(state);
  state.output.transport = _transport.transportModel.getTransportCost(state.input.transport, state.input.passengers, state.input.transportType);
  if (state.output.suggestion && state.input.passengers && state.input.transport) (0, _flightview.renderFlights)(state.output.suggestion, state.input.passengers, state.output.transport);
  console.log(state);
});
transportType.addEventListener("change", function (event) {
  state.input.transportType = event.target.value;
  state.output.transport = _transport.transportModel.getTransportCost(state.input.transport, state.input.passengers, state.input.transportType);
  if (state.output.suggestion && state.input.passengers && state.input.transport) (0, _flightview.renderFlights)(state.output.suggestion, state.input.passengers, state.output.transport);
  console.log(state);
});
console.log(state);
},{"./js/models/flights.js":"js/models/flights.js","./js/views/flightview.js":"js/views/flightview.js","./js/models/transport.js":"js/models/transport.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59039" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map