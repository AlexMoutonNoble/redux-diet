"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (key) {
  var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var setField = RegExp("set " + key + " (\\w*)$");
  var clearField = RegExp("clear " + key + " (\\w*)$");
  var setObj = "set " + key;
  var mergeObj = "merge " + key;
  var clearObj = "clear " + key;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
    var action = arguments[1];

    if (action.type === setObj) {
      return Object.assign({}, action[key]);
    }

    if (action.type === mergeObj) {
      return Object.assign({}, state, action[key]);
    }

    if (action.type == clearObj) {
      return init;
    }

    var m = action.type.match(setField);
    if (m) {
      var field = m[1];
      var update = {};
      update[field] = action[field];
      return Object.assign({}, state, update);
    }

    var c = action.type.match(clearField);
    if (c) {
      var _field = c[1];
      var s = Object.assign({}, state);
      delete s[_field];
      return s;
    }

    return state;
  };
};
//# sourceMappingURL=Object.js.map