import { ActionTypes } from "../constants/action-types";

//This is an action creator that is defined as a function returning another function (a thunk).
export const fetchStockData =
  (
    ticker = "TCS",
    period = "1mo" //defaults to "TCS" and "1mo" if no value is provided.
  ) =>
  async (dispatch) => {
    //The inner function is an asynchronous function that receives dispatch as an argument.
    try {
      const response = await fetch(
        // `http://127.0.0.1:5000/api/stock?ticker=${ticker}&period=${period}`
        `https://swing-trading-backend-fdrx.vercel.app/api/stock?ticker=${ticker}&period=${period}`,
          
        
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.status}`);
      }

      // Parse the JSON data from the response
      const data = await response.json();

      // Dispatch the action with the parsed data. The action is dispatched to the Redux store.
      dispatch({
        type: ActionTypes.FETCH_STOCK_DATA,
        payload: data, // This is now the parsed JSON, not the raw response object
      });
    } catch (error) {
      console.error("Error fetching stock data:", error);

      // Optionally, dispatch an error action if needed
      dispatch({
        type: ActionTypes.FETCH_STOCK_DATA_ERROR,
        payload: error.message,
      });
    }
  };
