# import yfinance as yf
# from flask import Flask, jsonify, request
# import yfinance as yf
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# @app.route('/api/support', methods=['GET'])
# def calculate_support_resistance(ticker, period='1mo', interval='1d'):
#     # Fetch historical data
#     stock_data = yf.download(ticker, period=period, interval=interval)
    
#     # Drop any rows with missing data to avoid errors
#     stock_data = stock_data.dropna()
    
#     # Get the latest day's high, low, and close prices
#     if not stock_data.empty:
#         high = float(stock_data['High'].iloc[-1])
#         low = float(stock_data['Low'].iloc[-1])
#         close = float(stock_data['Close'].iloc[-1])
#     else:
#         print("No data available for the specified period.")
#         return
    
#     # Calculate pivot point
#     pivot_point = (high + low + close) / 3
    
#     # Calculate support and resistance levels
#     range_ = high - low
#     resistances = [pivot_point + i * range_ for i in range(1, 6)]
#     supports = [pivot_point - i * range_ for i in range(1, 6)]
    
#     # Print results
#     print(f"Stock: {ticker}")
#     print(f"Pivot Point: {pivot_point:.2f}")
#     for i in range(5):
#         print(f"Resistance Level {i + 1}: {resistances[i]:.2f}")
#     for i in range(5):
#         print(f"Support Level {i + 1}: {supports[i]:.2f}")

# # Example usage
# ticker_symbol = 'AAPL'  # Change this to any stock symbol you want
# calculate_support_resistance(ticker_symbol)

import yfinance as yf
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/support', methods=['GET'])
def calculate_support_resistance():
    # Get the ticker from the query parameters
    ticker = request.args.get('ticker')
    if not ticker:
        return jsonify({"error": "Ticker parameter is required"}), 400

    # Fetch historical data
    try:
        stock_data = yf.download(ticker, period='1mo', interval='1d')
        
        # Drop any rows with missing data
        stock_data = stock_data.dropna()

        # Ensure data is available
        if stock_data.empty:
            return jsonify({"error": "No data available for the specified period"}), 404

        # Get the latest day's high, low, and close prices
        high = float(stock_data['High'].iloc[-1])
        low = float(stock_data['Low'].iloc[-1])
        close = float(stock_data['Close'].iloc[-1])

        # Calculate pivot point
        pivot_point = (high + low + close) / 3

        # Calculate support and resistance levels
        range_ = high - low
        resistances = [pivot_point + i * range_ for i in range(1, 6)]
        supports = [pivot_point - i * range_ for i in range(1, 6)]

        # Prepare the response
        response = {
            "ticker": ticker,
            "pivot_point": round(pivot_point, 2),
            "resistances": [round(r, 2) for r in resistances],
            "supports": [round(s, 2) for s in supports]
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
