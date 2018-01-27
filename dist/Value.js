"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (key, init) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
    var action = arguments[1];
    return action.type === "set " + key ? action[key] : state;
  };
};
//# sourceMappingURL=Value.js.map