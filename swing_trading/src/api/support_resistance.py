import yfinance as yf

def calculate_support_resistance(ticker, period='1mo', interval='1d'):
    # Fetch historical data
    stock_data = yf.download(ticker, period=period, interval=interval)
    
    # Drop any rows with missing data to avoid errors
    stock_data = stock_data.dropna()
    
    # Get the latest day's high, low, and close prices
    if not stock_data.empty:
        high = float(stock_data['High'].iloc[-1])
        low = float(stock_data['Low'].iloc[-1])
        close = float(stock_data['Close'].iloc[-1])
    else:
        print("No data available for the specified period.")
        return
    
    # Calculate pivot point
    pivot_point = (high + low + close) / 3
    
    # Calculate support and resistance levels
    range_ = high - low
    resistances = [pivot_point + i * range_ for i in range(1, 6)]
    supports = [pivot_point - i * range_ for i in range(1, 6)]
    
    # Print results
    print(f"Stock: {ticker}")
    print(f"Pivot Point: {pivot_point:.2f}")
    for i in range(5):
        print(f"Resistance Level {i + 1}: {resistances[i]:.2f}")
    for i in range(5):
        print(f"Support Level {i + 1}: {supports[i]:.2f}")

# Example usage
ticker_symbol = 'AAPL'  # Change this to any stock symbol you want
calculate_support_resistance(ticker_symbol)