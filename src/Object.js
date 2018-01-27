export default (key, init={}) => {
  const setField = RegExp("set " + key + " (\\w*)$");
  const clearField = RegExp("clear " + key + " (\\w*)$");
  const setObj = `set ${key}`
  const mergeObj = `merge ${key}`
  const clearObj = `clear ${key}`
  return (state=init, action) => {
    if(action.type === setObj) {
      return Object.assign( {}, action[key] )
    }

    if(action.type === mergeObj) {
      return Object.assign( {}, state, action[key] )
    }

    if(action.type == clearObj) {
      return init
    }

    let m = action.type.match(setField)
    if(m) {
      let field = m[1]
      var update = {}
      update[field] = action[field]
      return Object.assign({}, state, update)
    }

    let c = action.type.match(clearField)
    if(c) {
      let field = c[1]
      var s = Object.assign({}, state)
      delete s[field]
      return s
    }

    return state
  }
}
