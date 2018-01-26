export const RequestableStatus = (key, resets = []) => {
  return (state, action) => {
    const init = { status: 'empty', error: null }
    state = state || init
    if( resets.includes(action.type) ) {
      return init
    }
    if( action.type == `request ${key}` ) {
      return Object.assign({}, state, { status: 'loading', error: null } )
    }
    if( action.type == `set ${key}` ) {
      return Object.assign({}, state, { status: 'clean', error: null } )
    }
    if( action.type == `clear ${key}` ) {
      return init
    }
    if( action.type == `set error ${key}` ) {
      return Object.assign({}, state, { status: 'error', error: action.error } )
    }
    return state
  }
}
