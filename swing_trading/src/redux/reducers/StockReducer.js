// reducers.js
import { ActionTypes } from "../constants/action-types"; //This import statement brings in a collection of constants defined in a separate file. to avoid any typos.

const initialState = {
  stockData: [], //This is the default state for the reducer. It's an object containing a property stockData, which is initialized as an empty array. This represents the state of stock data before any actions are dispatched.
};

const StockReducer = (state = initialState, action) => {
  //StockReducer is a pure function that takes two parameters: state and action.
  switch (
    action.type // An object representing the action dispatched to the store. It contains a type property and may also have a payload that carries the updated state.
  ) {
    case ActionTypes.FETCH_STOCK_DATA:
      return {
        ...state, //This syntax (spread operator) copies all existing properties from the current state.
        stockData: action.payload,
      };
    default: //If the action type does not match any of the defined cases, the reducer returns the current state unchanged.
      return state;
  }
};

export default StockReducer;
