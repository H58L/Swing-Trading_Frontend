# app.py
from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
