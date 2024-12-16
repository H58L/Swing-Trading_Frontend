
import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import '../style/MovingAveragesChart.css';
import Header from "./Header";

const IndicatorChart = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedIndicator, setSelectedIndicator] = useState('');
  
  // Mapping between dropdown labels and backend keys
  const indicators = [
    { label: 'Simple Moving Averages - 20,50,100 Days', value: 'MA' },
    { label: 'Simple Moving Averages - 20 Days', value: 'MA20' },
    { label: 'Simple Moving Averages - 50 Days', value: 'MA50' },
    { label: 'Simple Moving Averages - 100 Days', value: 'MA100' },
    { label: 'Exponential Moving Averages - 20,50,100 Days', value: 'EMA' },
    { label: 'Exponential Moving Averages - 20 Days', value: 'EMA20' },
    { label: 'Exponential Moving Averages - 50 Days', value: 'EMA50' },
    { label: 'Exponential Moving Averages - 100 Days', value: 'EMA100' },
    { label: 'Bollinger Bands - 20 Days', value: 'BB20' },
    { label: 'Moving Average Convergence/divergence', value: 'MACD' },
    { label: 'Average True Range (ATR)', value: 'ATR' }, 
    { label: 'Elliot Wave', value: 'ElliottWave' },
  ];

  const fetchIndicatorData = async () => {
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/indicators', {
        params: { ticker, indicator: selectedIndicator },
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching data');
    }
  };

const plotData = () => {
  if (!data.length || !selectedIndicator) return [];

  const plots = [
    {
      x: data.map((d) => d.Date),
      y: data.map((d) => d.Close),
      type: 'scatter',
      mode: 'lines',
      name: 'Close Price',
    },
  ];

  //handling all SMAs
  if (selectedIndicator === 'MA') {
    const smaPeriods = [20, 50, 100];  // Periods for all desired SMAs
    for (const period of smaPeriods) {
      plots.push({
        x: data.map((d) => d.Date),
        y: data.map((d) => `MA${period}` ? d[`MA${period}`] : null),  // Check if key exists
        type: 'scatter',
        mode: 'lines',
        name: `SMA${period}`,
        line: { color: period === 20 ? 'orange' : period === 50 ? 'blue' : 'green' },  // Assign different colors
      });
    }
  }

  //Handling all EMAa
  if (selectedIndicator === 'EMA') {
    const smaPeriods = [20, 50, 100];  // Periods for all desired SMAs
    for (const period of smaPeriods) {
      plots.push({
        x: data.map((d) => d.Date),
        y: data.map((d) => `EMA${period}` ? d[`EMA${period}`] : null),  // Check if key exists
        type: 'scatter',
        mode: 'lines',
        name: `EMA${period}`,
        line: { color: period === 20 ? 'orange' : period === 50 ? 'blue' : 'green' },  // Assign different colors
      });
    }
  }

  // Handle EMA20 specifically
  else if (selectedIndicator === 'EMA20') {
    plots.push(
      {
        x: data.map((d) => d.Date),
        y: data.map((d) => d.EMA20),
        type: 'scatter',
        mode: 'lines',
        name: 'EMA20',
        line: { color: 'orange' },
      }
    ); }
    else if (selectedIndicator === 'EMA50') {
      plots.push(
        {
          x: data.map((d) => d.Date),
          y: data.map((d) => d.EMA50),
          type: 'scatter',
          mode: 'lines',
          name: 'EMA50',
          line: { color: 'orange' },
        }
      );

  }
  else if (selectedIndicator === 'EMA100') {
    plots.push(
      {
        x: data.map((d) => d.Date),
        y: data.map((d) => d.EMA100),
        type: 'scatter',
        mode: 'lines',
        name: 'EMA100',
        line: { color: 'orange' },
      }
    );
  }
  else if (selectedIndicator === 'BB20') {
    plots.push(
      {
        x: data.map((d) => d.Date),
        y: data.map((d) => d['Middle Band']),
        type: 'scatter',
        mode: 'lines',
        name: 'Middle Band',
        line: { dash: 'dash', color: 'blue' },
      },
      {
        x: data.map((d) => d.Date),
        y: data.map((d) => d['Upper Band']),
        type: 'scatter',
        mode: 'lines',
        name: 'Upper Band',
        line: { color: 'green' },
      },
      {
        x: data.map((d) => d.Date),
        y: data.map((d) => d['Lower Band']),
        type: 'scatter',
        mode: 'lines',
        name: 'Lower Band',
        line: { color: 'red' },
      }
    );
  }
  
  // Handle MACD specifically
  else if (selectedIndicator === 'MACD') {
    plots.push({
      x: data.map((d) => d.Date),
      y: data.map((d) => d.MACD),
      type: 'scatter',
      mode: 'lines',
      name: 'MACD Line',
      line: { color: 'blue' }, // Set a color for the MACD line
    });
    plots.push({
      x: data.map((d) => d.Date),
      y: data.map((d) => d.Signal_line),
      type: 'scatter',
      mode: 'lines',
      name: 'Signal Line',
      line: { color: 'orange' }, // Set a color for the signal line
    });
  }

  else if (selectedIndicator === 'ATR') {
    plots.push({
      x: data.map((d) => d.Date),
      y: data.map((d) => d.ATR || null),  // ATR values from the backend
      type: 'scatter',
      mode: 'lines',
      name: 'ATR (14 Days)',
      line: { color: 'purple' },  // Color for ATR line
    });
  }
  
  else if (selectedIndicator === 'ElliottWave') {
    // Handle Elliott Wave logic here
    // Similar to the previous example
  } else {
    // Handle other indicators (e.g., Moving Averages)
    plots.push({
      // x: data.map((d) => d.Date),
      // y: data.map((d) => d[selectedIndicator]),
      // type: 'scatter',
      // mode: 'lines',
      // //name: indicators.find((ind) => ind.value === selectedIndicator)?.label,
    });
  }

  return plots;
};

  return (
    <>
    <Header />
    <div className="chart-container">
      <h2>Stock Indicators Chart</h2>
      <div className="input-container">
        {/* Ticker Input */}
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter Ticker (e.g., AAPL)"
          className="ticker-input"
        />

        {/* Dropdown for Indicator Selection */}
        <select
          value={selectedIndicator}
          onChange={(e) => setSelectedIndicator(e.target.value)}
          className="indicator-dropdown"
        >
          <option value="" disabled>
            Select Indicator
          </option>
          {indicators.map((indicator) => (
            <option key={indicator.value} value={indicator.value}>
              {indicator.label}
            </option>
          ))}
        </select>

        {/* Fetch Button */}
        <button onClick={fetchIndicatorData} className="fetch-button" disabled={!selectedIndicator}>
          Get Data
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Plot */}
      {data.length > 0 && selectedIndicator && (
        <Plot
          data={plotData()}
          layout={{
            title: `${ticker} ${indicators.find((ind) => ind.value === selectedIndicator)?.label}`,
            xaxis: { title: 'Date' },
            yaxis: { title: 'Price' },
            dragmode: 'pan',
          }}
        />
      )}
    </div>
    </>
  );
};

export default IndicatorChart;
