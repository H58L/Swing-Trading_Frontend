from flask import Flask, jsonify, request
from sklearn.preprocessing import MinMaxScaler
from charts import create_candlestick_chart
from RNN import get_rnn_predictions
from LSTM import build_lstm_model, fetch_stock_data, load_model_and_scaler, preprocess_data, predict_next_days, lstm_forecast, save_model, train_lstm_model
import joblib
import os
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/candlestick-chart', methods=['GET'])
def candlestick_chart():
    # Get stock symbol from query parameter (default: RECLTD.NS)
    stock_symbol = request.args.get('symbol', 'RECLTD.NS')
    period = request.args.get('period', '5y')  # Default period
    candlestick_data = create_candlestick_chart(stock_symbol, period)
    return jsonify(candlestick_data)

@app.route('/rnn', methods=['GET'])
def combined_chart_rnn():
    stock_symbol = request.args.get('symbol', 'RECLTD.NS')
    period = request.args.get('period', '5y')  # Default period
    forecast_days = int(request.args.get('forecast_days', 5))  # Default to 15 days forecast
    
    # Generate candlestick data
    candlestick_data = create_candlestick_chart(stock_symbol, period)
    if "error" in candlestick_data:
        return jsonify(candlestick_data)
    
    # Get RNN predictions (including next 5 days)
    rnn_data = get_rnn_predictions(stock_symbol, forecast_days=forecast_days)
    if "error" in rnn_data:
        return jsonify(rnn_data)
    
     # Filter predictions to match the selected period
    candlestick_dates = [item['x'] for item in candlestick_data['data'] if item['type'] == 'candlestick'][0]
    start_date = pd.to_datetime(candlestick_dates[0]).tz_localize(None)  # Ensure timezone-naive
    end_date = pd.to_datetime(candlestick_dates[-1]).tz_localize(None)  # Ensure timezone-naive
    
    # Filter predicted dates and values
    filtered_predictions = [
        (date, value) 
        for date, value in zip(rnn_data["dates"], rnn_data["predicted"])
        if start_date <= pd.to_datetime(date).tz_localize(None) <= end_date  # Ensure comparison is timezone-naive
    ]
    filtered_dates, filtered_values = zip(*filtered_predictions) if filtered_predictions else ([], [])
    
    # Update the combined chart data
    combined_data = candlestick_data
    combined_data["data"].append({
        "x": filtered_dates,
        "y": filtered_values,
        "type": "scatter",
        "mode": "lines",
        "name": "RNN Predictions",
        "line": {"color": "blue", "width": 2}
    })

    combined_data["data"].append({
    "x": rnn_data["forecasted_dates"],
    "y": rnn_data["forecasted_predictions"],
    "type": "scatter",
    "mode": "lines",
    "name": "Forecasted Predictions",
    "line": {"color": "green", "width": 2, "dash": "dash"}
    })

    # Include table data in the response
    combined_data["table_data"] = {
        "forecasted_dates": rnn_data["forecasted_dates"],
        "forecasted_predictions": rnn_data["forecasted_predictions"]
    }
    
    return jsonify(combined_data)

# Define paths for the saved model and scaler
MODEL_FILENAME = "./model/lstm_model.h5"  # Use .h5 to save the model as a Keras model
SCALER_FILENAME = "./model/lstm_scaler.pkl"

def get_model_paths(stock_symbol):
    """Use global model and scaler."""
    model_path = "./model/lstm_modeL.h5"  # Global model for all symbols
    scaler_path = "./model/lstm_scaler.pkl"    # Global scaler for all symbols
    return model_path, scaler_path

@app.route('/lstm', methods=['GET'])
def combined_chart_lstm():
    stock_symbol = request.args.get('symbol', 'RECLTD.NS')
    period = request.args.get('period', '5y')  # Default period
    forecast_days = int(request.args.get('forecast_days', 5))

    # Use the same model and scaler for all symbols
    model_path, scaler_path = get_model_paths(stock_symbol)

    # Step 1: Fetch candlestick data
    candlestick_data = create_candlestick_chart(stock_symbol, period)
    if "error" in candlestick_data:
        return jsonify(candlestick_data)

    try:
        # Fetch stock data based on period
        stock_data = fetch_stock_data(stock_symbol, lookback_period='10y')  # Use a fixed long lookback period (e.g., 10y)
        if stock_data is None or stock_data.empty:
            return jsonify({"error": f"No data found for stock symbol {stock_symbol} in the given period."})

        close_prices = stock_data["Close"].values
        sequence_length = 60

        # Preprocess data for this symbol
        x, y, scaler = preprocess_data(close_prices, sequence_length)

        # Load or create model and scaler
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            model, scaler = load_model_and_scaler(model_path, scaler_path)
            if model is None or scaler is None:
                raise FileNotFoundError(f"Model or scaler not found at {model_path} or {scaler_path}.")
            print(f"Loaded pre-trained model for {stock_symbol}.")
        else:
            print("Model and scaler not found, training a new model.")
            # Train model and save it
            model = build_lstm_model(sequence_length)
            train_lstm_model(model, x, y, x, y)  # Use all data as training data for simplicity
            save_model(model, scaler, model_path, scaler_path)
            print("New model and scaler have been trained and saved.")

        # Use the fixed last sequence for predictions (this ensures predictions remain constant)
        last_sequence = x[-1]  # Use the last known sequence
        future_predictions = predict_next_days(model, last_sequence, scaler, forecast_days)

        historical_predictions_scaled = model.predict(x, verbose=0)
        historical_predictions = scaler.inverse_transform(historical_predictions_scaled)

        # Ensure historical_dates match the length of historical_predictions
        historical_dates = stock_data["Date"].iloc[sequence_length:].values  # Start from the sequence_length index
        if len(historical_dates) != len(historical_predictions):
            raise ValueError("Mismatch in lengths of historical dates and predictions.")

        # Filter the historical predictions based on the candlestick period
        candlestick_dates = [
            pd.to_datetime(item['x']).tz_localize(None) 
            for item in candlestick_data['data'] if item['type'] == 'candlestick'
        ][0]
        start_date = candlestick_dates[0]
        end_date = candlestick_dates[-1]

        # Filter historical predictions based on the selected period
        historical_predictions_filtered = [
            (str(date), float(value)) 
            for date, value in zip(historical_dates, historical_predictions.flatten())
            if start_date <= pd.to_datetime(date) <= end_date
        ]
        historical_dates, historical_values = zip(*historical_predictions_filtered) if historical_predictions_filtered else ([], [])

        # Prepare future dates (same as before)
        last_date = pd.to_datetime(stock_data["Date"].iloc[-1])
        future_dates = [(last_date + pd.Timedelta(days=i)).strftime('%Y-%m-%d') for i in range(1, forecast_days + 1)]

    except ValueError as e:
        print("Error during LSTM forecast:", str(e))
        return jsonify({"error": str(e)})

    # Forecasted Predictions (ensure they remain fixed for the same symbol)
    forecasted_dates = [str(date) for date in future_dates]
    forecasted_values = [float(value) for value in future_predictions]

    # Combine the candlestick data with the LSTM forecast
    combined_data = candlestick_data
    if historical_dates and historical_values:
        combined_data["data"].append({
            "x": historical_dates,
            "y": historical_values,
            "type": "scatter",
            "mode": "lines",
            "name": "LSTM Predictions (Historical)",
            "line": {"color": "blue", "width": 2}
        })

    # Combine the forecasted data
    combined_data["data"].append({
        "x": forecasted_dates,
        "y": forecasted_values,
        "type": "scatter",
        "mode": "lines",
        "name": "LSTM Predictions (Forecast)",
        "line": {"color": "green", "width": 2, "dash": "dash"}
    })

    # Include forecast table
    combined_data["table_data"] = {
        "forecasted_dates": forecasted_dates,
        "forecasted_predictions": forecasted_values
    }

    return jsonify(combined_data)

if __name__ == '__main__':
    app.run(debug=True)
