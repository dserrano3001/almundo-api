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

/***/ "./src/controllers/hotel.ctrl.ts":
/*!***************************************!*\
  !*** ./src/controllers/hotel.ctrl.ts ***!
  \***************************************/
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
const hotel_1 = __webpack_require__(/*! ../models/hotel */ "./src/models/hotel.ts");
function getAll(query) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let where = query.where || {};
            console.log(where);
            const hotels = yield hotel_1.Hotel.findAll({
                where: where
            });
            return resolve(hotels);
        }
        catch (error) {
            return reject(error);
        }
    }));
}
function getId(id) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const hotel = yield hotel_1.Hotel.findByPk(id);
            if (!hotel) {
                return resolve(null);
            }
            return resolve(hotel);
        }
        catch (error) {
            return reject(error);
        }
    }));
}
function post(body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let data = body;
            data.amenities = data.amenities.join();
            const hotel = yield hotel_1.Hotel.create(data);
            return resolve(hotel);
        }
        catch (error) {
            return reject(error);
        }
    }));
}
function update(id, body) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('amenities', body);
            const hotel = yield hotel_1.Hotel.findByPk(id);
            if (!hotel) {
                return resolve(null);
            }
            let data = body;
            data.amenities = data.amenities.join();
            yield hotel.update(data);
            return resolve(hotel);
        }
        catch (error) {
            console.log('error', error);
            return reject(error);
        }
    }));
}
function deleteHotel(id) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const hotel = yield hotel_1.Hotel.findByPk(id);
            if (!hotel) {
                return resolve(false);
            }
            yield hotel.destroy();
            return resolve(true);
        }
        catch (error) {
            return reject(error);
        }
    }));
}
exports.HotelCtrl = {
    getAll: getAll,
    getId: getId,
    post: post,
    update: update,
    delete: deleteHotel
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
const sequelize_1 = __webpack_require__(/*! ./sequelize */ "./src/sequelize.ts");
const routes_1 = __webpack_require__(/*! ./routes/routes */ "./src/routes/routes.ts");
var compression = __webpack_require__(/*! compression */ "compression");
(() => __awaiter(this, void 0, void 0, function* () {
    const app = express();
    app.use(compression({
        level: 9
    }));
    app.use('/files-bucket', express.static(__dirname + '/upload_images', {
        maxAge: 1444444
    }));
    app.use("/", express.static(__dirname + '/www', {
        maxAge: 1444444
    }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/', (req, res, next) => {
        if (req.url.indexOf("?") > -1) {
            req.qs = req.url.split('?')[1];
        }
        next();
    });
    yield sequelize_1.sequelize.sync({ force: false, alter: false });
    routes_1.initRoute(app);
    app.listen(exports.confApp.port, () => {
        console.log('app listen port ' + exports.confApp.port);
    });
}))();


/***/ }),

/***/ "./src/models/hotel.ts":
/*!*****************************!*\
  !*** ./src/models/hotel.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Hotel = class Hotel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], Hotel.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", String)
], Hotel.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Hotel.prototype, "stars", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.DECIMAL(10, 2)),
    __metadata("design:type", Number)
], Hotel.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(255)),
    __metadata("design:type", String)
], Hotel.prototype, "image", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Hotel.prototype, "amenities", void 0);
Hotel = __decorate([
    sequelize_typescript_1.Table
], Hotel);
exports.Hotel = Hotel;


/***/ }),

/***/ "./src/routes/hotel.router.ts":
/*!************************************!*\
  !*** ./src/routes/hotel.router.ts ***!
  \************************************/
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
const hotel_ctrl_1 = __webpack_require__(/*! ../controllers/hotel.ctrl */ "./src/controllers/hotel.ctrl.ts");
const Qs = __webpack_require__(/*! qs */ "qs");
const bodyParser = __webpack_require__(/*! body-parser */ "body-parser");
const router = express.Router();
router.get('/hotels', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let q = (req.qs) ? Qs.parse(req.qs) : {};
        const hotels = yield hotel_ctrl_1.HotelCtrl.getAll(q);
        res.status(200).json({
            data: hotels,
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
router.get('/hotels/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const hotel = yield hotel_ctrl_1.HotelCtrl.getId(req.params.id);
        res.status(200).json({
            data: hotel,
            result: true
        });
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({
            data: error,
            result: false
        });
    }
}));
router.post('/hotels', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const hotel = yield hotel_ctrl_1.HotelCtrl.post(req.body);
        res.status(200).json({
            data: hotel,
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
router.put('/hotels/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const hotel = yield hotel_ctrl_1.HotelCtrl.update(req.params.id, req.body);
        res.status(200).json({
            data: hotel,
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
router.delete('/hotels/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const hotel = yield hotel_ctrl_1.HotelCtrl.delete(req.params.id);
        res.status(200).json({
            data: null,
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
    router.use(__webpack_require__(/*! ./hotel.router */ "./src/routes/hotel.router.ts"));
    app.use('/api', router);
}
exports.initRoute = initRoute;


/***/ }),

/***/ "./src/sequelize.ts":
/*!**************************!*\
  !*** ./src/sequelize.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const index_1 = __webpack_require__(/*! ./index */ "./src/index.ts");
const hotel_1 = __webpack_require__(/*! ./models/hotel */ "./src/models/hotel.ts");
console.log(__dirname + "/" + index_1.confApp.database.storage);
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: index_1.confApp.database.dialect,
    storage: __dirname + "/" + index_1.confApp.database.storage,
    define: {
        timestamps: true,
        paranoid: true,
    },
    timezone: '+00:00',
    logging: true,
});
exports.sequelize.addModels([hotel_1.Hotel]);


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

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),

/***/ "sequelize-typescript":
/*!***************************************!*\
  !*** external "sequelize-typescript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize-typescript");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map