/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _map = __webpack_require__(2);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapCtrl = function () {
  function MapCtrl($http, $timeout, $window) {
    _classCallCheck(this, MapCtrl);

    console.log(this);
    this.$http = $http;
    this.$timeout = $timeout;
    this.$window = $window;

    this.map = new _map2.default('#map');
  }

  _createClass(MapCtrl, [{
    key: 'update_data',
    value: function update_data() {}
  }]);

  return MapCtrl;
}();

exports.default = MapCtrl;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _d = __webpack_require__(3);

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log(_angular2.default, _d2.default);

var CountyMap = function () {
    function CountyMap(element_id) {
        _classCallCheck(this, CountyMap);

        this.element_id = element_id;
        console.log(this.element_id, _d2.default);
        var svg = _d2.default.select(element_id),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var unemployment = _d2.default.map();

        var path = _d2.default.geoPath();

        var x = _d2.default.scaleLinear().domain([1, 10]).rangeRound([600, 860]);

        var color = _d2.default.scaleThreshold().domain(_d2.default.range(2, 10)).range(_d2.default.schemeBlues[9]);

        var g = svg.append("g").attr("class", "key").attr("transform", "translate(0,40)");

        g.selectAll("rect").data(color.range().map(function (d) {
            d = color.invertExtent(d);
            if (d[0] == null) d[0] = x.domain()[0];
            if (d[1] == null) d[1] = x.domain()[1];
            return d;
        })).enter().append("rect").attr("height", 8).attr("x", function (d) {
            return x(d[0]);
        }).attr("width", function (d) {
            return x(d[1]) - x(d[0]);
        }).attr("fill", function (d) {
            return color(d[0]);
        });

        g.append("text").attr("class", "caption").attr("x", x.range()[0]).attr("y", -6).attr("fill", "#000").attr("text-anchor", "start").attr("font-weight", "bold").text("Unemployment rate");

        g.call(_d2.default.axisBottom(x).tickSize(13).tickFormat(function (x, i) {
            return i ? x : x + "%";
        }).tickValues(color.domain())).select(".domain").remove();
    }

    _createClass(CountyMap, [{
        key: 'element_id',
        value: function element_id(id) {
            this.element_id = id;
            return this;
        }
    }]);

    return CountyMap;
}();

// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");
//
// var unemployment = d3.map();
//
// var path = d3.geoPath();
//
// var x = d3.scaleLinear()
//     .domain([1, 10])
//     .rangeRound([600, 860]);
//
// var color = d3.scaleThreshold()
//     .domain(d3.range(2, 10))
//     .range(d3.schemeBlues[9]);
//
// var g = svg.append("g")
//     .attr("class", "key")
//     .attr("transform", "translate(0,40)");
//
// g.selectAll("rect")
//   .data(color.range().map(function(d) {
//       d = color.invertExtent(d);
//       if (d[0] == null) d[0] = x.domain()[0];
//       if (d[1] == null) d[1] = x.domain()[1];
//       return d;
//     }))
//   .enter().append("rect")
//     .attr("height", 8)
//     .attr("x", function(d) { return x(d[0]); })
//     .attr("width", function(d) { return x(d[1]) - x(d[0]); })
//     .attr("fill", function(d) { return color(d[0]); });
//
// g.append("text")
//     .attr("class", "caption")
//     .attr("x", x.range()[0])
//     .attr("y", -6)
//     .attr("fill", "#000")
//     .attr("text-anchor", "start")
//     .attr("font-weight", "bold")
//     .text("Unemployment rate");
//
// g.call(d3.axisBottom(x)
//     .tickSize(13)
//     .tickFormat(function(x, i) { return i ? x : x + "%"; })
//     .tickValues(color.domain()))
//   .select(".domain")
//     .remove();
//
// d3.queue()
//     .defer(d3.json, "https://d3js.org/us-10m.v1.json")
//     .defer(d3.tsv, "unemployment.tsv", function(d) { unemployment.set(d.id, +d.rate); })
//     .await(ready);
//
// function ready(error, us) {
//   if (error) throw error;
//
//   svg.append("g")
//       .attr("class", "counties")
//     .selectAll("path")
//     .data(topojson.feature(us, us.objects.counties).features)
//     .enter().append("path")
//       .attr("fill", function(d) { return color(d.rate = unemployment.get(d.id)); })
//       .attr("d", path)
//     .append("title")
//       .text(function(d) { return d.rate + "%"; });
//
//   svg.append("path")
//       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//       .attr("class", "states")
//       .attr("d", path);
// }


exports.default = CountyMap;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = d3;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _MapCtrl = __webpack_require__(1);

var _MapCtrl2 = _interopRequireDefault(_MapCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_MapCtrl2.default);
var app = _angular2.default.module("app", ["ui.router"]);

app.config(["$stateProvider", function ($stateProvider) {
  $stateProvider.state('map', {
    url: '',
    templateUrl: '/templates/map.html',
    controller: 'MapCtrl as vm'
  });
}]);

app.controller('MapCtrl', _MapCtrl2.default);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map