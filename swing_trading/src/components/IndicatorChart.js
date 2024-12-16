
// import React, { useState } from 'react';
// import axios from 'axios';
// import Plot from 'react-plotly.js';
// import '../style/MovingAveragesChart.css';
// import Header from "./Header";

// const IndicatorChart = () => {
//   const [ticker, setTicker] = useState('AAPL');
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedIndicator, setSelectedIndicator] = useState('');
  
//   // Mapping between dropdown labels and backend keys
//   const indicators = [
//     { label: 'Moving Averages - 20 Days', value: 'MA20' },
//     { label: 'Moving Averages - 50 Days', value: 'MA50' },
//     { label: 'Moving Averages - 100 Days', value: 'MA100' },
//     { label: 'Bollinger Bands - 20 Days', value: 'BB20' },
//     {label: 'Elliot Wave', value: 'ElliottWave' },
//   ];

//   const fetchIndicatorData = async () => {
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5000/indicators', {
//         params: { ticker, indicator: selectedIndicator },
//       });
//       setData(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Error fetching data');
//     }
//   };

//   const plotData = () => {
//     if (!data.length || !selectedIndicator) return [];

//     const plots = [
//       {
//         x: data.map((d) => d.Date),
//         y: data.map((d) => d.Close),
//         type: 'scatter',
//         mode: 'lines',
//         name: 'Close Price',
//       },
//     ];

//     // Handle Bollinger Bands specifically
//     if (selectedIndicator === 'BB20') {
//       plots.push(
//         {
//           x: data.map((d) => d.Date),
//           y: data.map((d) => d['Middle Band']),
//           type: 'scatter',
//           mode: 'lines',
//           name: 'Middle Band',
//           line: { dash: 'dash', color: 'blue' },
//         },
//         {
//           x: data.map((d) => d.Date),
//           y: data.map((d) => d['Upper Band']),
//           type: 'scatter',
//           mode: 'lines',
//           name: 'Upper Band',
//           line: { color: 'green' },
//         },
//         {
//           x: data.map((d) => d.Date),
//           y: data.map((d) => d['Lower Band']),
//           type: 'scatter',
//           mode: 'lines',
//           name: 'Lower Band',
//           line: { color: 'red' },
//         }
//       );
//     } else {
//       // Handle other indicators (e.g., Moving Averages)
//       plots.push({
//         x: data.map((d) => d.Date),
//         y: data.map((d) => d[selectedIndicator]),
//         type: 'scatter',
//         mode: 'lines',
//         name: indicators.find((ind) => ind.value === selectedIndicator)?.label,
//       });
//     }

//     return plots;
//   };

//   return (
//     <>
//     <Header />
// <div className="chart-container">
      
//       <h2>Stock Indicators Chart</h2>
//       <div className="input-container">
//         {/* Ticker Input */}
//         <input
//           type="text"
//           value={ticker}
//           onChange={(e) => setTicker(e.target.value.toUpperCase())}
//           placeholder="Enter Ticker (e.g., AAPL)"
//           className="ticker-input"
//         />

//         {/* Dropdown for Indicator Selection */}
//         <select
//           value={selectedIndicator}
//           onChange={(e) => setSelectedIndicator(e.target.value)}
//           className="indicator-dropdown"
//         >
//           <option value="" disabled>
//             Select Indicator
//           </option>
//           {indicators.map((indicator) => (
//             <option key={indicator.value} value={indicator.value}>
//               {indicator.label}
//             </option>
//           ))}
//         </select>

//         {/* Fetch Button */}
//         <button onClick={fetchIndicatorData} className="fetch-button" disabled={!selectedIndicator}>
//           Get Data
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && <p className="error-message">{error}</p>}

//       {/* Plot */}
//       {data.length > 0 && selectedIndicator && (
//         <Plot
//           data={plotData()}
//           layout={{
//             title: `${ticker} ${indicators.find((ind) => ind.value === selectedIndicator)?.label}`,
//             xaxis: { title: 'Date' },
//             yaxis: { title: 'Price' },
//             dragmode: 'pan',
//           }}
//         />
//       )}
//     </div>
//     </>
    
//   );
// };

// export default IndicatorChart;

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
    { label: 'Moving Averages - 20 Days', value: 'MA20' },
    { label: 'Moving Averages - 50 Days', value: 'MA50' },
    { label: 'Moving Averages - 100 Days', value: 'MA100' },
    { label: 'Bollinger Bands - 20 Days', value: 'BB20' },
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
  
    // Handle Bollinger Bands specifically
    if (selectedIndicator === 'BB20') {
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
    } else if (selectedIndicator === 'ElliottWave') {
      // Assuming that we want to simulate the wave progression between points:
      const elliotWaveData = {
        impulseWave1: data.impulse_wave_1 || null,
        impulseWave3: data.impulse_wave_3 || null,
        impulseWave5: data.impulse_wave_5 || null,
        correctionWave2: data.correction_wave_2 || null,
        correctionWave4: data.correction_wave_4 || null,
      };
  
      // Define X values as the dates or index points for the waves
      const waveDates = [data.Date]; // You can adjust this to use actual dates or indices of your waves
  
      // Add lines to represent waves: 
      const generateWave = (startY, endY) => {
        // Generate an array of points between the start and end values for each wave
        return [startY, (startY + endY) / 2, endY]; // For simplicity, just a linear progression
      };
  
      // Generate plots for each wave
      const impulseWave1 = generateWave(elliotWaveData.impulseWave1, elliotWaveData.impulseWave3);
      const correctionWave2 = generateWave(elliotWaveData.impulseWave3, elliotWaveData.correctionWave2);
      const impulseWave3 = generateWave(elliotWaveData.correctionWave2, elliotWaveData.impulseWave5);
  
      // Plot the simulated waves
      plots.push(
        {
          x: waveDates,
          y: impulseWave1,
          type: 'scatter',
          mode: 'lines',
          name: 'Impulse Wave 1',
          line: { color: 'blue' },
        },
        {
          x: waveDates,
          y: correctionWave2,
          type: 'scatter',
          mode: 'lines',
          name: 'Correction Wave 2',
          line: { color: 'red' },
        },
        {
          x: waveDates,
          y: impulseWave3,
          type: 'scatter',
          mode: 'lines',
          name: 'Impulse Wave 3',
          line: { color: 'blue' },
        },
        {
          x: waveDates,
          y: [elliotWaveData.impulseWave5],
          type: 'scatter',
          mode: 'markers+text',
          name: 'Impulse Wave 5',
          marker: { color: 'blue', size: 10 },
          text: ['Impulse Wave 5'],
          textposition: 'top right',
        }
      );
    } else {
      // Handle other indicators (e.g., Moving Averages)
      plots.push({
        x: data.map((d) => d.Date),
        y: data.map((d) => d[selectedIndicator]),
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
