"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dynamic;

var _dynamic = _interopRequireDefault(require("umi/dynamic"));

var _mobx = require("mobx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const cached = {};

function registerStore(stores = []) {
  stores.map(store => {
    const name = store.name,
          path = store.path;
    console.log(name, path);

    if (!cached[name]) {
      (0, _mobx.observable)(require(`${path}`).default);
      cached[name] = 1;
    }
  });
}

function dynamic(config) {
  const stores = config.stores,
        resolveComponent = config.component;
  return (0, _dynamic.default)({
    loader() {
      return _asyncToGenerator(function* () {
        registerStore(stores);
        return () => resolveComponent();
      })();
    }

  });
}