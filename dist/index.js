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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controllers/item.ctrl.ts":
/*!**************************************!*\
  !*** ./src/controllers/item.ctrl.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = __webpack_require__(/*! request */ "request");
function getPrice(value) {
    const stringValue = value.toString();
    const decimalValue = stringValue.indexOf('.');
    let x = [];
    if (decimalValue > -1) {
        return stringValue.split('.');
    }
    else {
        return [stringValue, '00'];
    }
}
function getAll(query) {
    return new Promise(function (resolve, reject) {
        try {
            const options = {
                url: 'https://api.mercadolibre.com/sites/MLA/search?q=:query',
                headers: {
                    'User-Agent': 'request'
                }
            };
            request.get(options, function (err, resp, body) {
                if (err) {
                    reject(err);
                }
                else {
                    const data = JSON.parse(body);
                    const categories = [];
                    const items = [];
                    data.results.forEach((element) => {
                        if (!categories.includes(element.category_id)) {
                            categories.push(element.category_id);
                        }
                        const priceValue = getPrice(element.price);
                        items.push({
                            "id": element.id,
                            "title": element.title,
                            "price": {
                                "currency": element.currency_id,
                                "amount": +priceValue[0],
                                "decimals": +priceValue[1],
                            },
                            "picture": element.thumbnail,
                            "condition": element.condition,
                            "free_shipping": element.shipping.free_shipping
                        });
                    });
                    const response = {
                        author: {
                            name: 'Dayana',
                            lastname: 'Serrano'
                        },
                        categories: categories,
                        items
                    };
                    resolve(response);
                }
            });
        }
        catch (error) {
            return reject(error);
        }
    });
}
function getId(id) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let options = {
                url: 'https://api.mercadolibre.com/items/' + id,
                headers: {
                    'User-Agent': 'request'
                }
            };
            request.get(options, function (err, resp, body) {
                if (err) {
                    reject(err);
                }
                else {
                    const data = JSON.parse(body);
                    const priceValue = getPrice(data.price);
                    const response = {
                        author: {
                            name: 'Dayana',
                            lastname: 'Serrano'
                        },
                        item: {
                            id: data.id,
                            title: data.title,
                            price: {
                                currency: data.currency_id,
                                amount: +priceValue[0],
                                decimals: +priceValue[1],
                            },
                            picture: data.thumbnail,
                            condition: data.condition,
                            free_shipping: data.shipping.free_shipping,
                            sold_quantity: data.sold_quantity,
                            description: ''
                        }
                    };
                    options.url = 'https://api.mercadolibre.com/items/' + id + '/descriptions';
                    request.get(options, function (err, resp, body) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            const dataDescription = JSON.parse(body);
                            response.item.description = dataDescription[0].plain_text;
                            resolve(response);
                        }
                    });
                }
            });
        }
        catch (error) {
            return reject(error);
        }
    }));
}
function getIdDescription(id) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                url: 'https://api.mercadolibre.com/items/' + id + '/descriptions',
                headers: {
                    'User-Agent': 'request'
                }
            };
            request.get(options, function (err, resp, body) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(JSON.parse(body));
                }
            });
        }
        catch (error) {
            return reject(error);
        }
    }));
}
exports.ItemCtrl = {
    getAll: getAll,
    getId: getId
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(/*! fs */ "fs");
const contents = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'))["development" || false];
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
exports.confApp = contents;
const express = __webpack_require__(/*! express */ "express");
const routes_1 = __webpack_require__(/*! ./routes/routes */ "./src/routes/routes.ts");
var compression = __webpack_require__(/*! compression */ "compression");
(() => __awaiter(this, void 0, void 0, function* () {
    const app = express();
    app.use(compression({
        level: 9
    }));
    app.use("/", express.static(__dirname + '/www', {
        maxAge: 1444444
    }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    routes_1.initRoute(app);
    app.listen(exports.confApp.port, () => {
        console.log('app listen port ' + exports.confApp.port);
    });
}))();


/***/ }),

/***/ "./src/routes/item.router.ts":
/*!***********************************!*\
  !*** ./src/routes/item.router.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = __webpack_require__(/*! express */ "express");
const item_ctrl_1 = __webpack_require__(/*! ../controllers/item.ctrl */ "./src/controllers/item.ctrl.ts");
const router = express.Router();
router.get('/items', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const items = yield item_ctrl_1.ItemCtrl.getAll(req.query);
        res.status(200).json({
            data: items,
            result: true
        });
    }
    catch (error) {
        res.status(500).json({
            data: error,
            result: false
        });
    }
}));
router.get('/items/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const item = yield item_ctrl_1.ItemCtrl.getId(req.params.id);
        res.status(200).json({
            data: item,
            result: true
        });
    }
    catch (error) {
        res.status(500).json({
            data: error,
            result: false
        });
    }
}));
module.exports = router;


/***/ }),

/***/ "./src/routes/routes.ts":
/*!******************************!*\
  !*** ./src/routes/routes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
function initRoute(app) {
    let router = express.Router();
    router.get('/', (req, res, next) => {
        res.status(200).json({
            data: 'ping',
            result: true
        });
    });
    router.use(__webpack_require__(/*! ./item.router */ "./src/routes/item.router.ts"));
    app.use('/api', router);
}
exports.initRoute = initRoute;


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map