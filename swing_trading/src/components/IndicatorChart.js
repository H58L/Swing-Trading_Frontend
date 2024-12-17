
import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import '../style/MovingAveragesChart.css';
import Header from "./Header";
import { useEffect } from 'react';

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
    // { label: 'Fibonacci Retracement', value: 'FR' },
    { label: 'Elliot Wave', value: 'EW00' },
  ];

  useEffect(() => {
    if (selectedIndicator) {
      fetchIndicatorData();
    }
  }, [selectedIndicator]);
  

  const fetchIndicatorData = async () => {
    setError(null);
    try {
      console.log("Selected Indicator: ", selectedIndicator);

      const response = await axios.get('http://localhost:5000/indicators', {
        params: { ticker, indicator: selectedIndicator },
      });

      console.log("Recieved Data in fetch",response.data);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching data');
    }
  };

const plotData = () => {
  console.log("plotData called, selectedIndicator:", selectedIndicator);
  if (!Array.isArray(data) || !data.length || !selectedIndicator) return [];

  const plots = [
    {
      x: data.map((d) => d.Date),
      y: data.map((d) => d.Close),
      type: 'scatter',
      mode: 'lines',
      name: 'Close Price',
      line: {color: 'black'}
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
  
  


  else if (selectedIndicator === 'MACD') {
    plots.push({
      x: data.map((d) => d.Date),
      y: data.map((d) => d.Close),
      type: 'scatter',
      mode: 'lines',
      name: 'Close Price',
      line: { color: 'green' }, // Set a color for the Close price line
      yaxis: 'y', // Assign this trace to the primary y-axis
    });
    plots.push({
      x: data.map((d) => d.Date),
      y: data.map((d) => d.MACD),
      type: 'scatter',
      mode: 'lines',
      name: 'MACD Line',
      line: { color: 'blue' }, // Set a color for the MACD line
      yaxis: 'y2', // Assign this trace to the secondary y-axis
    });
    plots.push({
      x: data.map((d) => d.Date),
      y: data.map((d) => d.Signal_line),
      type: 'scatter',
      mode: 'lines',
      name: 'Signal Line',
      line: { color: 'orange' }, // Set a color for the signal line
      yaxis: 'y2', // Assign this trace to the secondary y-axis
    });
  }
   
  
 
  
  else if (selectedIndicator === 'ATR') {
    console.log('Received Data ATR:', data);
    plots.push({
      x: data.map((d) => d.Date),
      y: data.map((d) => d.Close),
      type: 'scatter',
      mode: 'lines',
      name: 'Close Price',
      line: { color: 'green' }, // Color for the Close price line
      yaxis: 'y', // Assign this trace to the primary y-axis
    });
    plots.push({
      x: data.map((d) => d.Date),
      y: data.map((d) => d.ATR || null), // ATR values from the backend
      type: 'scatter',
      mode: 'lines',
      name: 'ATR (14 Days)',
      line: { color: 'purple' }, // Color for the ATR line
      yaxis: 'y2', // Assign this trace to the secondary y-axis
    });
  }

  

    // else if (indicators.length > 0 && selectedIndicator === 'FR') {
    //   console.log("Inside FR if");
    //   console.log('Received Data Inside FR:', data);

    //   if (!data.stock_data || data.stock_data.length === 0) {
    //     return []; // Return an empty array if no data is available
    //   }

    //   // Extract Fibonacci levels and stock data
    //   const fibonacciLevels = data.fibonacci_levels; // From backend response
    //   const stockData = data.stock_data; // Stock data
    
    //   // Get date range
    //   const startDate = stockData[0]?.Date;
    //   const endDate = stockData[stockData.length - 1]?.Date;
    
    //   // Iterate over Fibonacci levels and push each retracement line
    //   Object.entries(fibonacciLevels).forEach(([levelName, levelPrice]) => {
    //     plots.push({
    //       x: [startDate, endDate], // Span across the full date range
    //       y: [levelPrice, levelPrice], // Horizontal line at retracement price
    //       type: 'scatter',
    //       mode: 'lines',
    //       name: levelName, // E.g., "23.6%", "50.0%", etc.
    //       line: {
    //         dash: 'dash',
    //         color: 'rgba(77, 102, 255, 0.7)', // Adjust color and style
    //         width: 2,
    //       },
    //     });
    //   });
    
    //   // Add close price line for stock data
    //   plots.push({
    //     x: stockData.map((d) => d.Date),
    //     y: stockData.map((d) => d.Close),
    //     type: 'scatter',
    //     mode: 'lines',
    //     name: 'Close Price',
    //     line: { color: 'black' },
    //   });
    // }
    
   
    
      else if (indicators.length > 0 && selectedIndicator === 'FR') {
      
        console.log("Inside FR if");
        console.log('Received Data:', data);
    
        // Check for empty data
        if (!data.stock_data || data.stock_data.length === 0) {
          return []; // Return empty array if no data
        }
    
        // Extract Fibonacci levels and stock data
        const fibonacciLevels = data.fibonacci_levels;
        const stockData = data.stock_data;
    
        // Get date range (handle missing dates if needed)
        const startDate = data.stock_data?.[0]?.Date || '2023-12-01';
        const endDate = data.stock_data?.[data.stock_data.length - 1]?.Date || new Date();
    
        // Iterate over Fibonacci levels and push each retracement line
        Object.entries(fibonacciLevels).forEach(([levelName, levelPrice]) => {
          plots.push({
            x: [startDate, endDate],
            y: [levelPrice, levelPrice],
            type: 'scatter',
            mode: 'lines',
            name: levelName,
            line: {
              dash: 'dash',
              color: 'rgba(77, 102, 255, 0.7)',
              width: 2,
            },
          });
        });
    
        // Add close price line for stock data
        plots.push({
          x: stockData.map((d) => d.Date),
          y: stockData.map((d) => d.Close),
          type: 'scatter',
          mode: 'lines',
          name: 'Close Price',
          line: { color: 'black' },
        });
      }
    
   
  
  // if (selectedIndicator === 'EW00') {
  //   console.log("Inside Elliot Wave if else");
  //   console.log("Recieved Data in EW00 block",data);

    

  // } 

  else if (selectedIndicator === 'EW00') {
    if (!data.buy_signals || !data.sell_signals) return [];  // Check if buy/sell signals exist
    
    // Buy and Sell Signals for Elliot Wave
    plots.push({
      x: data.buy_signals.map((d) => d.date),
      y: data.buy_signals.map((d) => d.price),
      type: 'scatter',
      mode: 'markers',
      name: 'Buy Signals',
      marker: { color: 'green', size: 8 },  // Set marker color and size for buy signals
    });
  
    plots.push({
      x: data.sell_signals.map((d) => d.date),
      y: data.sell_signals.map((d) => d.price),
      type: 'scatter',
      mode: 'markers',
      name: 'Sell Signals',
      marker: { color: 'red', size: 8 },  // Set marker color and size for sell signals
    });
  }
  
  else {
    // Handle other indicators (e.g., Moving Averages)
    console.log("Inside else block");
    plots.push({
      x: data.map((d) => d.Date),
      y: data.map((d) => d[selectedIndicator]),
      //name: {selectedIndicator},
      type: 'scatter',
      mode: 'lines',
      name: indicators.find((ind) => ind.value === selectedIndicator)?.label,
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
    yaxis: {
      title: 'Price',
      side: 'left',
      showgrid: true,
    }, // Primary y-axis for Close Price
    ...(selectedIndicator === 'MACD' || selectedIndicator === 'ATR'
      ? {
          yaxis2: {
            title: selectedIndicator === 'MACD' ? 'MACD & Signal Line' : 'ATR',
            side: 'right',
            overlaying: 'y', // Overlay on primary y-axis
            showgrid: false,
          },
        }
      : {}),
    dragmode: 'pan',
  }}
/>

          
       
      

      )}
    </div>
    </>
  );
};

export default IndicatorChart;

// // SOMETHING WORKS
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';
// import '../style/MovingAveragesChart.css';
// import Header from "./Header";

// const IndicatorChart = () => {
//   const [ticker, setTicker] = useState('AAPL');
//   const [data, setData] = useState([]); // General Data
//   const [buySignals, setBuySignals] = useState([]); // Buy Signals for EW00
//   const [error, setError] = useState(null);
//   const [selectedIndicator, setSelectedIndicator] = useState('');

//   // Dropdown menu for selecting indicators
//   const indicators = [
//     { label: 'Simple Moving Averages - 20,50,100 Days', value: 'MA' },
//     { label: 'Exponential Moving Averages - 20,50,100 Days', value: 'EMA' },
//     { label: 'Bollinger Bands - 20 Days', value: 'BB20' },
//     { label: 'Moving Average Convergence/divergence', value: 'MACD' },
//     { label: 'Average True Range (ATR)', value: 'ATR' },
//     { label: 'Fibonacci Retracement', value: 'FR' },
//     { label: 'Elliot Wave', value: 'EW00' },
//   ];

//   useEffect(() => {
//     if (selectedIndicator) {
//       fetchIndicatorData();
//     }
//   }, [selectedIndicator]);

//   // Fetch data from the backend
//   const fetchIndicatorData = async () => {
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5000/indicators', {
//         params: { ticker, indicator: selectedIndicator },
//       });
//       console.log("Received Data:", response.data);

//       if (selectedIndicator === 'EW00') {
//         setData(response.data.data || []);
//         setBuySignals(response.data.buy_signals || []);
//       } else {
//         setData(response.data);
//         setBuySignals([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Error fetching data');
//     }
//   };

//   // Prepare plot data for Plotly
//   const plotData = () => {
//     if (!Array.isArray(data) || !data.length) return [];

//     const plots = [
//       {
//         x: data.map((d) => d.Date),
//         y: data.map((d) => d.Close),
//         type: 'scatter',
//         mode: 'lines',
//         name: 'Close Price',
//         line: { color: 'black' },
//       },
//     ];

//     // Add buy signals for EW00
//     if (selectedIndicator === 'EW00' && Array.isArray(buySignals) && buySignals.length) {
//       plots.push({
//         x: buySignals.map((signal) => signal.date),
//         y: buySignals.map((signal) => signal.price),
//         type: 'scatter',
//         mode: 'markers',
//         name: 'Buy Signals',
//         marker: { color: 'red', size: 10, symbol: 'diamond' },
//       });
//     }

//     return plots;
//   };

//   return (
//     <div className="indicator-chart-container">
//       <Header />
//       <h2>Indicator Chart</h2>

//       {/* Dropdown Menu */}
//       <div>
//         <label>Select Indicator:</label>
//         <select
//           value={selectedIndicator}
//           onChange={(e) => setSelectedIndicator(e.target.value)}
//         >
//           <option value="">Select...</option>
//           {indicators.map((indicator) => (
//             <option key={indicator.value} value={indicator.value}>
//               {indicator.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Plotly Chart */}
//       <div className="chart">
//         {error ? (
//           <p style={{ color: 'red' }}>{error}</p>
//         ) : (
//           <Plot
//             data={plotData()}
//             layout={{
//               title: `Indicator: ${selectedIndicator}`,
//               xaxis: { title: 'Date' },
//               yaxis: { title: 'Price' },
//               showlegend: true,
//             }}
//             style={{ width: '100%', height: '500px' }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default IndicatorChart;
