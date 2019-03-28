# @indlekofer/redux-store

redux store with injectable reducers for module seperation

## Usage

```js
import store from '@indlekofer/redux-store';

//dispatch actions
store.dispatch({type: "test"});

//dispatch thunk
store.dispatch(() => (dispatch, getState) => dispatch({type: "test"}));
```

## inject

### Usage

```js
//inject reducer
store.inject('App', Reducer);
```

### Parameters

  **namespace**: string  
  **reducer**: function  
  **force**: boolean (optional default false) replace existing namspaces  

## remove

### Usage

```js
//remove reducers
store.remove("name1");

//remove all
store.remove();
```

### Parameters

  **namespace**: string (optional)  

