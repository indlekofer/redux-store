# @indlekofer/redux-store

[![npm version](https://badge.fury.io/js/%40indlekofer%2Fredux-store.svg)](https://badge.fury.io/js/%40indlekofer%2Fredux-store)

redux store with injectable reducers and middleware for module seperation

## Usage

```js
import store from '@indlekofer/redux-store';

//dispatch actions
store.dispatch({type: "test"});

//dispatch thunk - thunk middleware is always there
store.dispatch(() => (dispatch, getState) => dispatch({type: "test"}));
```

# Function exports

## injectReducer

  **reducer**: function  
  **namespace**: string  
  **force**: boolean (optional default false) replace existing namspaces  

## removeReducer

remove a specific reducer by namespace

  **namespace**: string  

## resetReducers

remove all reducers

## injectMiddleware

  **middleware**: function  
  **namespace**: string  
  **force**: boolean (optional default false) replace existing namspaces  

## removeMiddleware

  **namespace**: string  

## resetMiddleware

