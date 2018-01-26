export const Array = (key, init = []) => {
  return (state, action) => {
    state = state || init

    if(action.type == `set ${key}`)
      return action[key].slice(0)

    return state
  }
}
