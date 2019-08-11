/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./renderer/reversi.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./renderer/draw.js":
/*!**************************!*\
  !*** ./renderer/draw.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Draw; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar COLOR_LINE = \"#FFFFFF\";\nvar COLOR_BOARD = \"#00BB33\";\nvar COLOR_WHITE = \"#FFFFFF\";\nvar COLOR_BLACK = \"#000000\";\nvar CELL_SIZE = 60;\nvar DISC_SIZE = 29;\n\nvar Draw =\n/*#__PURE__*/\nfunction () {\n  function Draw(canvas) {\n    _classCallCheck(this, Draw);\n\n    this.canvas = canvas;\n    this.draw_board();\n  }\n\n  _createClass(Draw, [{\n    key: \"draw_board\",\n    value: function draw_board() {\n      this.canvas.beginPath();\n      this.canvas.clearRect(0, 0, 500, 500);\n      this.canvas.lineWidth = 1;\n      this.canvas.strokeStyle = COLOR_LINE;\n      this.canvas.fillStyle = COLOR_BOARD;\n\n      for (var x = 0; x < 8; x++) {\n        for (var y = 0; y < 8; y++) {\n          this.canvas.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);\n          this.canvas.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);\n        }\n      }\n    }\n  }, {\n    key: \"draw_discs\",\n    value: function draw_discs(board) {\n      this.canvas.shadowBlur = 1;\n      this.canvas.shadowOffsetX = 1;\n      this.canvas.shadowOffsetY = 1;\n      var gradient;\n\n      for (var x = 0; x < 8; x++) {\n        for (var y = 0; y < 8; y++) {\n          this.canvas.beginPath();\n\n          if (board[x][y] == 1) {\n            this.canvas.shadowColor = COLOR_WHITE;\n            gradient = this.canvas.createLinearGradient(x * CELL_SIZE, y * CELL_SIZE, x * CELL_SIZE + CELL_SIZE, y * CELL_SIZE + CELL_SIZE);\n            gradient.addColorStop(0, 'rgb(180, 180, 180)');\n            gradient.addColorStop(0.4, COLOR_BLACK);\n            gradient.addColorStop(1, COLOR_BLACK);\n            this.canvas.fillStyle = gradient;\n            this.canvas.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, DISC_SIZE, 0, Math.PI * 2, false);\n            this.canvas.fill();\n          } else if (board[x][y] == -1) {\n            this.canvas.shadowColor = COLOR_BLACK;\n            gradient = this.canvas.createLinearGradient(x * CELL_SIZE, y * CELL_SIZE, x * CELL_SIZE + CELL_SIZE, y * CELL_SIZE + CELL_SIZE);\n            gradient.addColorStop(0, COLOR_WHITE);\n            gradient.addColorStop(0.4, COLOR_WHITE);\n            gradient.addColorStop(1, 'rgb(180, 180, 180)');\n            this.canvas.fillStyle = gradient;\n            this.canvas.arc(x * CELL_SIZE + CELL_SIZE / 2, y * CELL_SIZE + CELL_SIZE / 2, DISC_SIZE, 0, Math.PI * 2, false);\n            this.canvas.fill();\n          }\n        }\n      }\n\n      this.canvas.shadowColor = \"rgba(0, 0, 0, 0)\";\n    }\n  }, {\n    key: \"put_point_highlight\",\n    value: function put_point_highlight(pleyer, board) {\n      var _this = this;\n\n      this.canvas.fillStyle = pleyer == 1 ? COLOR_BLACK : COLOR_WHITE;\n      this.canvas.globalAlpha = pleyer == 1 ? 0.2 : 0.4;\n      board.forEach(function (postion) {\n        _this.canvas.beginPath();\n\n        _this.canvas.arc(postion[0] * CELL_SIZE + CELL_SIZE / 2, postion[1] * CELL_SIZE + CELL_SIZE / 2, DISC_SIZE, 0, Math.PI * 2, false);\n\n        _this.canvas.fill();\n      });\n      this.canvas.globalAlpha = 1;\n    }\n  }]);\n\n  return Draw;\n}();\n\n\n\n//# sourceURL=webpack:///./renderer/draw.js?");

/***/ }),

/***/ "./renderer/game.js":
/*!**************************!*\
  !*** ./renderer/game.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Game =\n/*#__PURE__*/\nfunction () {\n  function Game() {\n    _classCallCheck(this, Game);\n\n    this.player = 1;\n    this.board = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, -1, 1, 0, 0, 0], [0, 0, 0, 1, -1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];\n  }\n\n  _createClass(Game, [{\n    key: \"put\",\n    value: function put(x, y) {\n      if (this.canPut(x, y)) {\n        this.turnDiscs(x, y);\n        this.board[x][y] = this.player;\n        this.player = -this.player;\n      }\n    }\n  }, {\n    key: \"disc_count\",\n    value: function disc_count(player) {\n      var count = 0; //配列全てをサマリして置ける箇所数を出す\n\n      this.board.forEach(function (x) {\n        return x.forEach(function (y) {\n          return y == player ? count++ : null;\n        });\n      });\n      return count;\n    }\n  }, {\n    key: \"turnEnd\",\n    value: function turnEnd() {\n      //置ける箇所数が0なら\n      if (this.canPutChecker().length == 0) {\n        //プレイヤーをPASS\n        this.player = -this.player; //置ける箇所数が0なら\n\n        if (this.canPutChecker().length == 0) {\n          //Geme Over\n          return true;\n        }\n      }\n\n      return false;\n    }\n  }, {\n    key: \"canPutChecker\",\n    value: function canPutChecker() {\n      var canPutBoard = [];\n\n      for (var x = 0; x <= 7; x++) {\n        for (var y = 0; y <= 7; y++) {\n          if (this.canPut(x, y) == 1) canPutBoard.push([x, y]);\n        }\n      }\n\n      return canPutBoard;\n    }\n  }, {\n    key: \"canPut\",\n    value: function canPut(x, y) {\n      if (this.board[x][y] != 0) return false;\n\n      for (var di_x = -1; di_x <= 1; di_x++) {\n        for (var di_y = -1; di_y <= 1; di_y++) {\n          //中心以外の８方向をチェックする\n          if (di_x === 0 && di_y === 0) continue; //盤外の場合は次へ\n\n          if (x + di_x < 0 || y + di_y < 0 || 7 < x + di_x || 7 < y + di_y) continue; //接してる石が相手色でなければ次へ\n\n          if (this.board[x + di_x][y + di_y] != this.enemy) continue; //再帰チェック\n\n          if (this.canPutSub(x + di_x, di_x, y + di_y, di_y)) return true;\n        }\n      }\n\n      return false;\n    }\n  }, {\n    key: \"canPutSub\",\n    value: function canPutSub(x, di_x, y, di_y) {\n      //盤外の場合はfalseを返しこの方向のチェックを終わる\n      if (x + di_x < 0 || y + di_y < 0 || 7 < x + di_x || 7 < y + di_y) return false; //石がない場合はfalseを返しこの方向のチェックを終わる\n\n      if (this.board[x + di_x][y + di_y] === 0) return false; //自色があればtrueを返す\n\n      if (this.board[x + di_x][y + di_y] === this.player) return true; //次の石のチェックへ\n\n      return this.canPutSub(x + di_x, di_x, y + di_y, di_y);\n    }\n  }, {\n    key: \"turnDiscs\",\n    value: function turnDiscs(x, y) {\n      if (this.board[x][y] != 0) return false;\n\n      for (var di_x = -1; di_x <= 1; di_x++) {\n        for (var di_y = -1; di_y <= 1; di_y++) {\n          //中心以外の８方向をチェックする\n          if (di_x === 0 && di_y === 0) continue; //盤外の場合は次へ\n\n          if (x + di_x < 0 || y + di_y < 0 || 7 < x + di_x || 7 < y + di_y) continue; //接してる石が相手色でなければ次へ\n\n          if (this.board[x + di_x][y + di_y] != this.enemy) continue; //再帰チェック\n\n          if (this.canPutSub(x + di_x, di_x, y + di_y, di_y)) {\n            this.turnDiscsSub(x, di_x, y, di_y);\n          }\n        }\n      }\n\n      return false;\n    }\n  }, {\n    key: \"turnDiscsSub\",\n    value: function turnDiscsSub(x, di_x, y, di_y) {\n      //自色があればtrueを返す\n      if (this.board[x + di_x][y + di_y] === this.player) return true;\n      this.board[x + di_x][y + di_y] = this.player; //次の石のチェックへ\n\n      return this.turnDiscsSub(x + di_x, di_x, y + di_y, di_y);\n    }\n  }, {\n    key: \"enemy\",\n    get: function get() {\n      return -this.player;\n    }\n  }]);\n\n  return Game;\n}();\n\n\n\n//# sourceURL=webpack:///./renderer/game.js?");

/***/ }),

/***/ "./renderer/reversi.js":
/*!*****************************!*\
  !*** ./renderer/reversi.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderer/game */ \"./renderer/game.js\");\n/* harmony import */ var _renderer_draw__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderer/draw */ \"./renderer/draw.js\");\n\n\nvar context = document.getElementById(\"canv\").getContext('2d');\ncontext.canvas.addEventListener('mouseup', ev_mouseClick);\nvar game = new _renderer_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nvar draw = new _renderer_draw__WEBPACK_IMPORTED_MODULE_1__[\"default\"](context);\ndraw.put_point_highlight(game.player, game.canPutChecker());\ndraw.draw_discs(game.board);\n\nfunction ev_mouseClick(e) {\n  var x = Math.floor((e.clientX - e.target.getBoundingClientRect().top) / 60);\n  var y = Math.floor((e.clientY - e.target.getBoundingClientRect().left) / 60); //ダイアログ呼び出しを非同期としてPromiseでラップする\n  //resolveはthenメソッドに渡された処理を実行する\n\n  var alertWithNoBlock = function alertWithNoBlock(msg) {\n    return new Promise(function (resolve, reject) {\n      return setTimeout(function () {\n        return resolve(alert(msg));\n      }, 0);\n    });\n  };\n\n  game.put(x, y);\n  draw.draw_board();\n  draw.put_point_highlight(game.player, game.canPutChecker());\n  draw.draw_discs(game.board);\n\n  if (game.turnEnd()) {\n    alertWithNoBlock(game.disc_count(1) > game.disc_count(-1) ? \"黒の勝利です\" : game.disc_count(1) < game.disc_count(-1) ? \"白の勝利です\" : \"ドローです\").then(function (result) {\n      game = new _renderer_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n      draw.draw_board();\n      draw.put_point_highlight(game.player, game.canPutChecker());\n      draw.draw_discs(game.board);\n    });\n  }\n}\n\n//# sourceURL=webpack:///./renderer/reversi.js?");

/***/ })

/******/ });