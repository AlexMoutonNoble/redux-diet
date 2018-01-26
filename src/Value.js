export const Value = (key, init) =>
  (state=init, action) =>
    (action.type === `set ${key}`) ? action[key] : state
