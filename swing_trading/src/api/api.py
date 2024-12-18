#  REWRITNG FOR MACD
import pandas as pd
import yfinance as yf
from flask import Flask, jsonify, request
from charts import create_candlestick_chart
from RNN import get_rnn_predictions
from LSTM import lstm_forecast
from flask_cors import CORS
from ElliotWave import calculate_elliott_wave, identify_buy_sell_signals
from BollingerBands import calculate_BB
from MovingAverages import (
    calculate_MA20, calculate_MA50, calculate_MA100, 
    calculate_EMA20, calculate_EMA100, calculate_EMA50,
    calculate_MA2050100, calculate_EMA2050100, calculate_MACD
)
from AverageTrueRange import calculate_atr
from FibonacciRetracement import calculate_fibonacci_retracement

app = Flask(__name__)
CORS(app)



@app.route('/candlestick-chart', methods=['GET'])
def candlestick_chart():
    # Get stock symbol from query parameter (default: AAPL)
    stock_symbol = request.args.get('symbol', 'AAPL')
    period = request.args.get('period', '5y')  # Default period
    candlestick_data = create_candlestick_chart(stock_symbol, period)
    return jsonify(candlestick_data)

@app.route('/rnn', methods=['GET'])
def combined_chart_rnn():
    stock_symbol = request.args.get('symbol', 'AAPL')
    period = request.args.get('period', '5y')  # Default period
    forecast_days = int(request.args.get('forecast_days', 5))  # Default to 5 days forecast
    
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

    # Add forecasted predictions as well
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

@app.route('/lstm', methods=['GET'])
def combined_chart_lstm():
    stock_symbol = request.args.get('symbol', 'AAPL')
    period = request.args.get('period', '5y')  # Default period
    forecast_days = int(request.args.get('forecast_days', 5))  # Default to 5 days forecast

    # Generate candlestick data
    candlestick_data = create_candlestick_chart(stock_symbol, period)
    if "error" in candlestick_data:
        return jsonify(candlestick_data)
    
    try:
        # Call the updated LSTM function
        lstm_result = lstm_forecast(stock_symbol, forecast_days=forecast_days)
    except ValueError as e:
        print("Error during LSTM forecast:", str(e))
        return {"error": str(e)}
    
    # Filter candlestick chart's period
    candlestick_dates = [
        pd.to_datetime(item['x']).tz_localize(None) 
        for item in candlestick_data['data'] if item['type'] == 'candlestick'
    ][0]
    start_date = candlestick_dates[0]
    end_date = candlestick_dates[-1]
    
    # Historical Predictions: Filter LSTM data matching historical candlestick period
    historical_predictions = [
        (str(date), float(value))  # Convert to serializable types
        for date, value in zip(lstm_result["historical_dates"], lstm_result["historical_predictions"])
        if start_date <= pd.to_datetime(date) <= end_date
    ]
    historical_dates, historical_values = zip(*historical_predictions) if historical_predictions else ([], [])

    # Forecasted Predictions: Already future-dated; no need for additional filtering
    forecasted_dates = [str(date) for date in lstm_result["forecasted_dates"]]
    forecasted_values = [float(value) for value in lstm_result["forecasted_predictions"]]

    # Combine the historical data (blue line)
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
    
    # Combine the forecasted data (green dashed line)
    if forecasted_dates and forecasted_values:
        combined_data["data"].append({
            "x": forecasted_dates,
            "y": forecasted_values,
            "type": "scatter",
            "mode": "lines",
            "name": "LSTM Predictions (Forecast)",
            "line": {"color": "green", "width": 2, "dash": "dash"}
        })

    # Include table data in the response
    combined_data["table_data"] = {
        "forecasted_dates": forecasted_dates,
        "forecasted_predictions": forecasted_values  # Ensure float
    }

    return jsonify(combined_data)

@app.route('/indicators', methods=['GET'])
def moving_averages():
    ticker = request.args.get('ticker', 'AAPL')  # Default to 'AAPL' if no ticker is provided
    indicator = request.args.get('indicator', 'MA20')  # Default to 'MA20' if no indicator is provided

    try:
        # Download 6 months of data
        data = yf.download(ticker, period="6mo")
        data.reset_index(inplace=True)
        
        # SIMPLE moving average
        if indicator == 'MA':
            result = calculate_MA2050100(data)
        elif indicator == 'MA20':
            result = calculate_MA20(data)
        elif indicator == 'MA50':
            result = calculate_MA50(data)
        elif indicator == 'MA100':
            result = calculate_MA100(data)

        # EXPOENETIAL MOVING AVERAGES
        elif indicator == 'EMA':
            result = calculate_EMA2050100(data)
        elif indicator == 'EMA20':
            result = calculate_EMA20(data)
        elif indicator == 'EMA50':
            result = calculate_EMA50(data)
        elif indicator == 'EMA100':
            result = calculate_EMA100(data)  

        elif indicator == 'BB20': # Bollinger Bands for 20 days
            result = calculate_BB(data)

        # MACD
        elif indicator == 'MACD':
            result = calculate_MACD(data)

        #Average True Range
        elif indicator == 'ATR':
            result = calculate_atr(data,14)

        #Fibonacci Retracement
        elif indicator == 'FR':
            stock_data = pd.DataFrame(data)
            result = calculate_fibonacci_retracement(stock_data)
            return jsonify(result)
        
        elif indicator == 'EW00':
                    # Perform Elliott Wave analysis
            peaks, troughs, prices, dates = calculate_elliott_wave(data)
            buy_signals, sell_signals = identify_buy_sell_signals(peaks, troughs, prices, dates)
            
            # Debugging print statements
            print("Peaks:", peaks)
            print("Troughs:", troughs)
            print("Prices:", prices)
            print("Dates:", dates)

            # Create a DataFrame with Close Prices, Peaks, and Troughs
            df = pd.DataFrame({'Date': dates, 'Close': prices})
            df['Date'] = pd.to_datetime(df['Date'], errors='coerce')  # Ensure dates are in datetime format
            df['Date'] = df['Date'].dt.strftime("%Y-%m-%d")  # Format as string
            
            # df['Peak'] = pd.Series(prices[peaks], index=peaks)
            # df['Trough'] = pd.Series(prices[troughs], index=troughs)

            # Reset index for JSON serialization
            df.reset_index(drop=True, inplace=True)

            # Include buy/sell signals in the result
            result = {
                "data": df.to_dict(orient='records'),
                #.dropna(subset=["Peak", "Trough"], how="all")
                # .dropna(subset=["Peak", "Trough"], how="all").to_dict(orient='records'),
                "buy_signals": [{"date": date, "price": price} for date, price in buy_signals],
                "sell_signals": [{"date": date, "price": price} for date, price in sell_signals]
            }

            return jsonify(result)            

        else:
            return jsonify({"error": f"Indicator '{indicator}' is not supported."}), 400

        # Convert Date to string for JSON response
        result['Date'] = result['Date'].astype(str)
        return jsonify(result.to_dict(orient='records'))

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)

