# redux-diet
Simple Redux Reducer Patterns.

## Install

```yarn add redux-diet```

## Include

```import * as Diet```

## Apply

```
  combineReducers({
    shownModals: Diet.Object('shownModals'),
    notes: Diet.Value('notes', ""),
    visited: Diet.Obj('visited', {}),
  })
```

## Invoke

patterns
 * action words are lower case, simple active verbs
 * your fields are whatever you've got
 * dispatch action key is the same as the leaf


### Value

Value supports 'set'
```
  onChange: (notes) => dispatch({type: `set notes`, notes})
```


### Object

Object supports 'set', 'clear', 'merge' at the object level.
Object supports 'set', 'clear' at the field level.

```
dispatch({type: `set visited ${key}`, [key]: new Date()})
```

### Array

Array supports 'set'
TODO: set element
