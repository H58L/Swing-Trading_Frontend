import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // used for asynchronous operations (for fetching data from API)
import StockReducer from "./reducers/StockReducer"; // Import your single reducer

const store = createStore(
  StockReducer, // Use your reducer here. This is the root reducer that determines how the state updates based on actions dispatched. A reducer is a pure function that takes the current state and an action as arguments and returns a new state.
  applyMiddleware(thunk) // Apply middleware
);

export default store;
