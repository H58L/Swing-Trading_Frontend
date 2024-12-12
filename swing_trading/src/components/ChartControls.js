import React from 'react';

const ChartControls = ({ symbol, setSymbol, period, setPeriod, selectedModel, setSelectedModel }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const inputSymbol = event.target.elements.stockSymbol.value.trim().toUpperCase();
        if (inputSymbol) {
            setSymbol(inputSymbol);
        }
    };

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <label htmlFor="stockSymbol" style={{ marginRight: '10px' }}>
                    Enter Stock Symbol:
                </label>
                <input
                    type="text"
                    id="stockSymbol"
                    name="stockSymbol"
                    placeholder="e.g., AAPL"
                    style={{
                        padding: '5px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        marginRight: '10px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Load Chart
                </button>
            </form>

            <label htmlFor="period" style={{ marginRight: '10px' }}>
                Select Period:
            </label>
            <select
                id="period"
                value={period}
                onChange={handlePeriodChange}
                style={{ marginBottom: '20px' }}
            >
                <option value="1mo">1 Month</option>
                <option value="6mo">6 Months</option>
                <option value="1y">1 Year</option>
                <option value="2y">2 Years</option>
                <option value="5y">5 Years</option>
                <option value="10y">10 Years</option>
            </select>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="model-select">Select Model: </label>
                <select
                    id="model-select"
                    value={selectedModel}
                    onChange={handleModelChange}
                    style={{ padding: '5px', fontSize: '16px' }}
                >
                    <option value="RNN">RNN</option>
                    <option value="LSTM">LSTM</option>
                </select>
            </div>
        </div>
    );
};

export default ChartControls;
