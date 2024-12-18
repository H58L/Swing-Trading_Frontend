from scipy.signal import find_peaks
def calculate_elliott_wave(data):
    prices = data['Close'].dropna().values
    dates = data.index

    # Find peaks (local maxima)
    peaks, _ = find_peaks(prices, distance=5)

    # Find troughs (local minima by inverting the data)
    troughs, _ = find_peaks(-prices, distance=5)

    return peaks, troughs, prices, dates

def identify_buy_sell_signals(peaks, troughs, prices, dates):
    buy_signals = [(dates[trough], prices[trough]) for trough in troughs]
    sell_signals = [(dates[peak], prices[peak]) for peak in peaks]
    return buy_signals, sell_signals