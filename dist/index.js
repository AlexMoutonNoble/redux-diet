"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ActionTypeReset = exports.ActionTypeReset = function ActionTypeReset(keys, init) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
    var action = arguments[1];

    if (keys.includes(action.type)) {
      return init;
    }
    return state;
  };
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Array = exports.Array = function Array(key) {
  var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return function (state, action) {
    state = state || init;

    if (action.type == "set " + key) return action[key].slice(0);

    return state;
  };
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Field = exports.Field = function Field(parent, key, foreign) {
  foreign = foreign || key;
  return function (state, action) {
    var init = '';
    state = state || init;
    if (action.type == 'set ' + parent) {
      return action[parent][foreign] && _extends({}, action[parent][foreign]) || init;
    } else if (aciton.type == 'set ' + key) {
      return action[key] && _extends({}, action[key]) || init;
    }
    return state;
  };
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Object = exports.Object = function Object(key) {
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
ActionTypeReset = require('./ActionTypeReset.js');

var RequestableReset = exports.RequestableReset = function RequestableReset(key, init) {
  return ActionTypeReset(['clear ' + key, 'set ' + key + ' error'], init);
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RequestableStatus = exports.RequestableStatus = function RequestableStatus(key) {
  var resets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return function (state, action) {
    var init = { status: 'empty', error: null };
    state = state || init;
    if (resets.includes(action.type)) {
      return init;
    }
    if (action.type == 'request ' + key) {
      return Object.assign({}, state, { status: 'loading', error: null });
    }
    if (action.type == 'set ' + key) {
      return Object.assign({}, state, { status: 'clean', error: null });
    }
    if (action.type == 'clear ' + key) {
      return init;
    }
    if (action.type == 'set error ' + key) {
      return Object.assign({}, state, { status: 'error', error: action.error });
    }
    return state;
  };
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Sequence = exports.Sequence = function Sequence(reducers) {
  return function (state, action) {
    return reducers.map(function (reducer) {
      return reducer(state, action);
    }).find(function (s) {
      return s != state;
    }) || state;
  };
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Value = exports.Value = function Value(key, init) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init;
    var action = arguments[1];
    return action.type === "set " + key ? action[key] : state;
  };
};
