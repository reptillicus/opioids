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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = d3;

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

var _d = __webpack_require__(1);

var d3 = _interopRequireWildcard(_d);

var _map = __webpack_require__(3);

var _map2 = _interopRequireDefault(_map);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapCtrl = function () {
  function MapCtrl($http, $interval, $window) {
    var _this = this;

    _classCallCheck(this, MapCtrl);

    this.$http = $http;
    this.$interval = $interval;
    this.$window = $window;
    this.timestep = 0;

    this.map = new _map2.default('#map');
    this.loading = true;

    this.$http.get('https://d3js.org/us-10m.v1.json').then(function (resp) {
      _this.map.draw(resp.data);
    }).then(function () {
      d3.csv('./assets/data.csv').row(function (d) {
        d["death_rate"] = d["Estimated Age-adjusted Death Rate, 11 Categories (in ranges)"];
        return d;
      }).get(function (data) {
        var nested = d3.nest().key(function (d) {
          return +d.Year;
        }).entries(data);
        _this.nested_data = nested;
        console.log(_this.nested_data);
        _this.start_animation();
        _this.loading = false;
      });
    });
  }

  _createClass(MapCtrl, [{
    key: "stop_animation",
    value: function stop_animation() {
      this.$interval.cancel(this.interval_promise);
      this.play = false;
    }
  }, {
    key: "start_animation",
    value: function start_animation() {
      var _this2 = this;

      this.stop_animation();
      this.play = true;
      this.interval_promise = this.$interval(function () {
        _this2.map.set_county_values(_this2.nested_data[_this2.timestep]);
        _this2.timestep++;
        if (_this2.timestep >= _this2.nested_data.length) {
          _this2.timestep = 0;
        }
      }, 1000);
    }
  }, {
    key: "toggle_play",
    value: function toggle_play() {
      console.log("toggle");
      this.play ? this.stop_animation() : this.start_animation();
    }
  }]);

  return MapCtrl;
}();

exports.default = MapCtrl;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = __webpack_require__(1);

var d3 = _interopRequireWildcard(_d);

var _topojson = __webpack_require__(4);

var topojson = _interopRequireWildcard(_topojson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CountyMap = function () {
  function CountyMap(element_id) {
    var _this = this;

    _classCallCheck(this, CountyMap);

    this.element_id = element_id;
    this.svg = d3.select(element_id);
    this.width = parseInt(this.svg.style("width"), 10);
    this.height = parseInt(this.svg.style("height"), 10);
    this.centered = null;
    this.colors = ["rgb(0, 0, 255)", "rgb(23, 0, 232)", "rgb(46, 0, 209)", "rgb(70, 0, 185)", "rgb(93, 0, 162)", "rgb(116, 0, 139)", "rgb(139, 0, 116)", "rgb(162, 0, 93)", "rgb(185, 0, 70)", "rgb(209, 0, 46)", "rgb(232, 0, 23)"];
    this.categories = [">20", "18.1-20", "16.1-18", "14.1-16", "12.1-14", "10.1-12", "8.1-10", "6.1-8", "4.1-6", "2.1-4", "0-2"];

    window.addEventListener('resize', function () {
      console.log("resize");
      _this.width = parseInt(_this.svg.style("width"), 10);
      _this.height = parseInt(_this.svg.style("height"), 10);
      console.log(_this.width);
      _this.draw(_this.counties);
    });

    this.rates = d3.map();

    this.path = d3.geoPath();

    this.x = d3.scaleLinear().domain([0, 10]).rangeRound([0, 300]);
    this.color = d3.scaleThreshold().domain(d3.range(0, 10)).range(this.colors.reverse());

    this.legend = this.svg.append("g").attr("class", "key").attr("transform", "translate(" + this.width * 0.80 + ",50)");

    this.chart = this.svg.append("g").attr("class", "chart").attr("transform", "translate(" + this.width * 0.80 + "," + this.height - 200 + ')');

    this.bars = this.legend.selectAll(".legend-box").data(this.colors).enter().append("g");

    this.bars.append("rect").attr("height", 25).attr("class", "legend-box").attr("y", function (d, i) {
      return _this.x(i);
    }).attr("x", 0).attr("width", 25).attr("fill", function (d, i) {
      return _this.color(i);
    });

    this.bars.append("text").attr("x", 30).attr("y", function (d, i) {
      return _this.x(i) + 18;
    }).text(function (d, i) {
      return _this.categories[i];
    });

    this.legend.append("text").attr("class", "caption").attr("x", 0).attr("y", -6).attr("fill", "#000").attr("text-anchor", "start").attr("font-weight", "bold").attr("font-size", "1em").text("Death rate per 100k");

    this.title = this.svg.append("g").attr("class", "map_title").attr("transform", "translate(" + String(this.width / 2) + ",30)");

    this.map = this.svg.append("g").attr('class', "map-container").attr('width', this.width);
  }

  _createClass(CountyMap, [{
    key: 'element_id',
    value: function element_id(id) {
      this.element_id = id;
      return this;
    }
  }, {
    key: 'set_county_values',
    value: function set_county_values(data) {
      var _this2 = this;

      this.county_values = data.values;
      this.title.selectAll('.map-title').remove();
      this.title.append("text").attr('class', 'map-title').text(data.key);
      this.county_values.forEach(function (d) {
        _this2.rates.set(d.FIPS, d);
      });
      this.map.selectAll('.counties').remove();

      this.map.append("g").attr("class", "counties").selectAll("path").data(topojson.feature(this.counties, this.counties.objects.counties).features).enter().append("path").attr("fill", function (d) {
        d = _this2.rates.get(d.id);
        if (d) {
          return _this2.fill_function(d);
        } else {
          return "black";
        }
      }).attr("d", this.path).on('click', this.click);
    }
  }, {
    key: 'click',
    value: function click(d, node) {
      var x, y, k;
      console.log(d, node);
      if (d && this.centered !== d) {
        console.log(this.centered);
        var centroid = node.path.centroid(d);
        x = centroid[0];
        y = centroid[1];
        k = 4;
        this.centered = d;
      } else {
        x = this.width / 2;
        y = this.height / 2;
        k = 1;
        this.centered = null;
        console.log(this.centered);
      }

      this.map.transition().duration(750).attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")").style("stroke-width", 1.5 / k + "px");
    }
  }, {
    key: 'fill_function',
    value: function fill_function(d) {
      var classes = {
        "0-2": "rgb(0, 0, 255)",
        "2.1-4": "rgb(23, 0, 232)",
        "4.1-6": "rgb(46, 0, 209)",
        "6.1-8": "rgb(70, 0, 185)",
        "8.1-10": "rgb(93, 0, 162)",
        "10.1-12": "rgb(116, 0, 139)",
        "12.1-14": "rgb(139, 0, 116)",
        "14.1-16": "rgb(162, 0, 93)",
        "16.1-18": "rgb(185, 0, 70)",
        "18.1-20": "rgb(209, 0, 46)",
        ">20": "rgb(232, 0, 23)"
      };
      return classes[d.death_rate];
    }
  }, {
    key: 'draw',
    value: function draw(data) {
      console.log(data);
      this.counties = data;
      this.map.append("g").attr("class", "states").selectAll("path").data(topojson.feature(data, data.objects.counties).features).enter().append("path").attr("d", this.path).attr("id", function (d) {
        return 'county_' + d.id;
      });
      this.map.append("path").datum(topojson.mesh(data, data.objects.states, function (a, b) {
        return a !== b;
      })).attr("class", "states").attr("d", this.path);
    }
  }]);

  return CountyMap;
}();

exports.default = CountyMap;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = topojson;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _MapCtrl = __webpack_require__(2);

var _MapCtrl2 = _interopRequireDefault(_MapCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_MapCtrl2.default);
var app = _angular2.default.module("app", ["ui.router"]);

app.config(["$stateProvider", "$locationProvider", function ($stateProvider, $locationProvider) {

  $stateProvider.state('map', {
    url: '',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl as vm'
  });
}]);

app.controller('MapCtrl', _MapCtrl2.default);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map