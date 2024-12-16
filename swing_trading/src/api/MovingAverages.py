def calculate_MA20(data):
     data['MA20'] = data['Close'].rolling(window=20).mean()
     result = data[['Close', 'MA20']].dropna().reset_index()
     return result

def calculate_MA50(data):
     data['MA50'] = data['Close'].rolling(window=50).mean()
     result = data[['Close', 'MA50']].dropna().reset_index()
     return result

def calculate_MA100(data):
      data['MA100'] = data['Close'].rolling(window=100).mean()
      result = data[['Close', 'MA100']].dropna().reset_index()
      return result