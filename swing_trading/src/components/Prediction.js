import React, { useState } from 'react';
import RNN_Chart from './RNN_Charts'; // RNN chart component
import LSTM_Chart from './LSTM_Charts'; // LSTM chart component
import ChartControls from './ChartControls'; // Chart controls component

const Prediction = () => {
    const [symbol, setSymbol] = useState('RECLTD.NS'); // State for stock symbol
    const [period, setPeriod] = useState('5y'); // State for period selection
    const [selectedModel, setSelectedModel] = useState('RNN'); // Default model is RNN

    return (
        <div>
            <h1>Interactive Candlestick Chart</h1>

            {/* Render ChartControls */}
            <ChartControls
                symbol={symbol}
                setSymbol={setSymbol}
                period={period}
                setPeriod={setPeriod}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
            />

            {/* Render the selected chart */}
            {selectedModel === 'RNN' ? (
                // eslint-disable-next-line react/jsx-pascal-case
                <RNN_Chart symbol={symbol} period={period} />
            ) : (
                // eslint-disable-next-line react/jsx-pascal-case
                <LSTM_Chart symbol={symbol} period={period} />
            )}
        </div>
    );
};

export default Prediction;
