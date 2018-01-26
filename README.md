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
    shownModalsStatus: Diet.RequestableStatus('shownModals'),
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

* Object supports 'set', 'clear', 'merge' at the object level.
* Object supports 'set', 'clear' at the field level.


```
dispatch({type: `set visited ${key}`, [key]: new Date()})
```

### Array

* Array supports 'set'
* TODO: set element

### RequestableStatus

Maintains loaded/error state for other resources
* Driven by the key of the other resource
* for a. responds to 'request a', 'set a', 'clear a', 'set error a'
* can be given a list of other 'reset' action strings that will switch to reset. TODO: Separate this?

Provides two fields: status, error
* status is in ['empty', 'loading', 'clean', 'error']
* error is whatever is sent with 'set error'

caveat:
* 'set error ${key}' adds concern if you have an 'error' at the top level
* 'set error' action key is 'error' not ${key}

```
dispatch({type: `request shownModals`})
fetch(url)
.then(res => res.json())
.catch(error => {
  dispatch({type: `set error shownModals`, error})
)
.then(shownModals => {
  dispatch({type: `set shownModals`, shownModals})
);
```
