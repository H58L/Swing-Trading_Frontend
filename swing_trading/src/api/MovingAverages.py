#SIMPLE MOVING AVERAGES
def calculate_MA2050100(data):
    data['MA20'] = data['Close'].rolling(window=20).mean()
    data['MA50'] = data['Close'].rolling(window=50).mean()
    data['MA100'] = data['Close'].rolling(window=100).mean()
    result = data[['Date', 'Close', 'MA20', 'MA50', 'MA100']].dropna().reset_index()
    return result

def calculate_MA20(data):
     data['MA20'] = data['Close'].rolling(window=20).mean()
     result = data[['Date','Close', 'MA20']].dropna().reset_index()
     return result

def calculate_MA50(data):
     data['MA50'] = data['Close'].rolling(window=50).mean()
     result = data[['Date','Close', 'MA50']].dropna().reset_index()
     return result

def calculate_MA100(data):
      data['MA100'] = data['Close'].rolling(window=100).mean()
      result = data[['Date','Close', 'MA100']].dropna().reset_index()
      return result

#EXPONENTIAL MOVING AVERAGES
def calculate_EMA2050100(data):
     data['EMA20'] = data['Close'].ewm(span=20, adjust=False).mean()
     data['EMA50'] = data['Close'].ewm(span=50, adjust=False).mean()
     data['EMA100'] = data['Close'].ewm(span=100, adjust=False).mean()
     result = data[['Date', 'Close', 'EMA20', 'EMA50', 'EMA100']].dropna().reset_index()
     return result

def calculate_EMA20(data):
    data['EMA20'] = data['Close'].ewm(span=20, adjust=False).mean()
    result = data[['Date','Close', 'EMA20']].dropna().reset_index(drop=True)
    
    return result

def calculate_EMA50(data):
    data['EMA50'] = data['Close'].ewm(span=50, adjust=False).mean()
    result = data[['Date','Close', 'EMA50']].dropna().reset_index(drop=True)
  
    return result

def calculate_EMA100(data):
    data['EMA100'] = data['Close'].ewm(span=100, adjust=False).mean()
    result = data[['Date','Close', 'EMA100']].dropna().reset_index(drop=True)
   
    return result

