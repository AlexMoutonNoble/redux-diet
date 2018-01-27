"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (key) {
  var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return function (state, action) {
    state = state || init;

    if (action.type == "set " + key) return action[key].slice(0);

    return state;
  };
};
//# sourceMappingURL=Array.js.map