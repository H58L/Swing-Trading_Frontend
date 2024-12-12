import pandas as pd
import numpy as np
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Input
import tensorflow as tf

def fetch_stock_data(stock_symbol="AAPL", lookback_period="5y"):
    """Fetch historical stock data."""
    stock_data = yf.download(stock_symbol, period=lookback_period, interval="1d")
    if stock_data.empty:
        raise ValueError("No data found for the given stock symbol.")
    stock_data.reset_index(inplace=True)
    return stock_data

def preprocess_data(data, sequence_length=60):
    """Scale and prepare data for LSTM."""
    scaler = MinMaxScaler(feature_range=(0, 1))
    data_scaled = scaler.fit_transform(data.reshape(-1, 1))

    x, y = [], []
    for i in range(sequence_length, len(data_scaled)):
        x.append(data_scaled[i - sequence_length:i])
        y.append(data_scaled[i])

    x, y = np.array(x), np.array(y)
    return x, y, scaler

def build_lstm_model(sequence_length):
    """Define and compile the LSTM model."""
    model = Sequential([
        Input(shape=(sequence_length, 1)),
        LSTM(50, return_sequences=True),
        Dropout(0.2),
        LSTM(50, return_sequences=False),
        Dropout(0.2),
        Dense(25),
        Dense(1)
    ])
    model.compile(optimizer="adam", loss="mean_squared_error")
    return model

def train_lstm_model(model, x_train, y_train, x_val, y_val, epochs=10, batch_size=32):
    """Train the LSTM model."""
    model.fit(
        x_train, y_train,
        validation_data=(x_val, y_val),
        epochs=epochs,
        batch_size=batch_size,
        verbose=1
    )

def predict_next_days(model, last_sequence, scaler, forecast_days=5):
    """Predict the next N days based on the last known sequence."""
    predictions = []
    sequence = last_sequence.copy()  # Avoid modifying the original sequence

    for _ in range(forecast_days):
        next_day_scaled = model.predict(sequence.reshape(1, -1, 1), verbose=0)
        next_day = scaler.inverse_transform(next_day_scaled)
        predictions.append(next_day[0][0])
        
        # Update the sequence with the new prediction
        sequence = np.append(sequence[1:], next_day_scaled, axis=0)

    return predictions

def lstm_forecast(stock_symbol="AAPL", forecast_days=5):
    """Main function to handle the LSTM workflow."""
    # Step 1: Fetch and preprocess data
    stock_data = fetch_stock_data(stock_symbol)
    close_prices = stock_data["Close"].values
    sequence_length = 60
    x, y, scaler = preprocess_data(close_prices, sequence_length)

    # Step 2: Split data into training and validation sets
    split = int(len(x) * 0.8)
    x_train, x_val = x[:split], x[split:]
    y_train, y_val = y[:split], y[split:]

    # Step 3: Build and train the model
    model = build_lstm_model(sequence_length)
    train_lstm_model(model, x_train, y_train, x_val, y_val)

    # Step 4: Predict next N days
    last_sequence = x[-1]  # Last sequence from the training data
    future_predictions = predict_next_days(model, last_sequence, scaler, forecast_days)

    # Step 5: Predict historical data
    historical_predictions_scaled = model.predict(x, verbose=0)
    historical_predictions = scaler.inverse_transform(historical_predictions_scaled)
    historical_dates = stock_data["Date"].iloc[sequence_length:].tolist()

    # Step 6: Prepare response with future dates
    last_date = pd.to_datetime(stock_data["Date"].iloc[-1])
    future_dates = [(last_date + pd.Timedelta(days=i)).strftime('%Y-%m-%d') for i in range(1, forecast_days + 1)]

    return {
        "historical_dates": [date.strftime('%Y-%m-%d') for date in historical_dates],
        "historical_predictions": historical_predictions.flatten().tolist(),
        "forecasted_dates": future_dates,
        "forecasted_predictions": future_predictions
    }