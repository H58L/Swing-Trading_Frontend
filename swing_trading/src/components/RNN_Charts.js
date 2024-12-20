import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const RNN_Chart = ({ symbol, period }) => {
    const [chartData, setChartData] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // fetch(`http://127.0.0.1:5000/rnn?symbol=${symbol}&period=${period}&forecast_days=5`)
        fetch(`https://swingtradingprediction-production.up.railway.app/rnn?symbol=${symbol}&period=${period}&forecast_days=5`)
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                if (data.error) {
                    setError(data.error);
                    setChartData(null);
                    setTableData(null);
                } else {
                    setError(null);
                    setChartData(data);
                    setTableData(data.table_data); // For the table
                }
            })
            .catch((error) => {
                setLoading(false);
                setError("Error fetching chart data.");
                setChartData(null);
                setTableData(null);
            });
    }, [symbol, period]);

    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <div style={{ flex: 3 }}>
                {error && <div style={{ color: "red" }}>{error}</div>}
                {loading && <p>Loading RNN chart...</p>}
                {chartData && !loading && (
                    <Plot
                        data={chartData.data}
                        layout={{ ...chartData.layout, title: `Stock Data for ${symbol} (${period})` }}
                        config={{ responsive: true }}
                    />
                )}
            </div>
            <div style={{ flex: 1 }}>
                {tableData && !loading && (
                    <div>
                        <h3>5-Day Predictions</h3>
                        <table
                            style={{
                                borderCollapse: "collapse",
                                width: "100%",
                                textAlign: "left",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            backgroundColor: "#f2f2f2",
                                        }}
                                    >
                                        Date
                                    </th>
                                    <th
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "8px",
                                            backgroundColor: "#f2f2f2",
                                        }}
                                    >
                                        Prediction (Close)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.forecasted_dates.map((date, index) => (
                                    <tr key={index}>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            {date || "N/A"}
                                        </td>
                                        <td
                                            style={{
                                                border: "1px solid #ddd",
                                                padding: "8px",
                                            }}
                                        >
                                            {tableData.forecasted_predictions[index].toFixed(2) || "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RNN_Chart;
