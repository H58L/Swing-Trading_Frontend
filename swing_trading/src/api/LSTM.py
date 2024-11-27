import pandas as pd
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler
import yfinance as yf

def get_lstm_predictions(stock_symbol="AAPL", forecast_days=15):
    # Fetch data for the past 10 years
    stock_data = yf.download(stock_symbol, period="10y", interval="1d")
    if stock_data.empty:
        return {"error": "No data found for this symbol"}
    
    # Reset index to include 'Date' as a column
    stock_data.reset_index(inplace=True)

    # Prepare data for LSTM
    scaler = MinMaxScaler(feature_range=(0, 1))
    stock_data["Close_scaled"] = scaler.fit_transform(stock_data["Close"].values.reshape(-1, 1))

    # Create sequences for LSTM input
    def create_sequences(data, sequence_length=60):
        x, y = [], []
        for i in range(len(data) - sequence_length):
            x.append(data[i:i + sequence_length])
            y.append(data[i + sequence_length])
        return np.array(x), np.array(y)

    sequence_length = 60
    x_data, y_data = create_sequences(stock_data["Close_scaled"].values, sequence_length)

    # Split into training and testing sets
    split = int(len(x_data) * 0.8)
    x_train, x_test = x_data[:split], x_data[split:]
    y_train, y_test = y_data[:split], y_data[split:]

    # Define the LSTM model dynamically
    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=(x_train.shape[1], 1)),
        Dropout(0.2),
        LSTM(50, return_sequences=False),
        Dropout(0.2),
        Dense(25),
        Dense(1)
    ])

    # Compile the model
    model.compile(optimizer='adam', loss='mean_squared_error')

    # Train the model
    model.fit(x_train, y_train, batch_size=32, epochs=10, validation_data=(x_test, y_test))

    # Predict on test data
    predictions = model.predict(x_test)

    # Reverse scale predictions
    predictions = scaler.inverse_transform(predictions)

    # Prepare data for plotting
    dates = stock_data["Date"].iloc[sequence_length + split:].astype(str).values
    predictions = predictions.flatten().tolist()

    # Create an array to store predictions for the next 15 days
    next_15_days_predictions = []
    last_sequence = x_data[-1:].reshape(1, sequence_length, 1)  # Reshape to 3D array (1, sequence_length, 1)

    for _ in range(forecast_days):
        try:
            # Ensure last_sequence is in the correct shape: (1, sequence_length, 1)
            last_sequence = last_sequence.reshape(1, sequence_length, 1)  # (1, sequence_length, 1)

            # Predict the next day's closing price
            next_day = model.predict(last_sequence)

            # Reverse scale the prediction
            next_day_unscaled = scaler.inverse_transform(next_day)

            # Add to the list of predictions
            next_15_days_predictions.append(next_day_unscaled[0][0])

            # Update the last sequence by adding the predicted day's data (rolling window)
            last_sequence = np.append(last_sequence[:, 1:, :], next_day.reshape(1, 1, 1), axis=1)
        except Exception as e:
            print(f"Error during prediction: {e}")
            break  # Break the loop if there is an error

    # Generate future dates for the next 15 days
    last_date = pd.to_datetime(stock_data["Date"].iloc[-1])
    future_dates = (last_date + pd.to_timedelta(np.arange(1, forecast_days + 1), 'D')).strftime('%Y-%m-%d').tolist()

    # Prepare response
    response = {
        "dates": dates.tolist(),
        "predictions": predictions,
        "forecasted_dates": future_dates,  # Added forecasted dates
        "forecasted_predictions": next_15_days_predictions  # Added forecasted predictions
    }

    return response