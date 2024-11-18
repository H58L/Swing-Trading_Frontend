# app.py
from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app)

# Load the trained LSTM model
model = tf.keras.models.load_model('model/LSTM_Model.h5')

@app.route('/api/stock', methods=['GET'])
def get_stock_data():
    stock_ticker = request.args.get('ticker', 'RELIANCE.NS')  # Default to Reliance
    period = request.args.get('period', '1mo')  # Default to 1 month

    if not stock_ticker:
        return jsonify({'error': 'Ticker symbol is required'}), 400

    try:
        stock = yf.Ticker(stock_ticker)
        stock_info = stock.history(period=period)

        if not stock_info.empty:
            # Prepare stock data for LSTM prediction
            close_prices = stock_info['Close'].values
            scaled_data = (close_prices - np.min(close_prices)) / (np.max(close_prices) - np.min(close_prices))

            # Create sequences for LSTM
            sequence_length = 30  # Example: Use 30 days to predict the next
            X = []
            for i in range(sequence_length, len(scaled_data)):
                X.append(scaled_data[i - sequence_length:i])
            X = np.array(X)

            # Predict using LSTM
            predictions = model.predict(X)
            predictions = (predictions * (np.max(close_prices) - np.min(close_prices))) + np.min(close_prices)

            stock_data = {
                'dates': stock_info.index.strftime('%Y-%m-%d').tolist(),
                'open': stock_info['Open'].tolist(),
                'high': stock_info['High'].tolist(),
                'low': stock_info['Low'].tolist(),
                'close': stock_info['Close'].tolist(),
                'volume': stock_info['Volume'].tolist(),
            }
            return jsonify(stock_data)
        else:
            return jsonify({'error': f'No data found for the given ticker: {stock_ticker}'}), 404

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': str(e)}), 500
        
if __name__ == '__main__':
    app.run(debug=True)
