import React from 'react';

const SupportResistanceTable = ({ data, darkMode, pivotPoint }) => {

    //const pivotPoint = 225.40;
    return (
        <div
            className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}`}
        >
            <h3 className="text-xl font-semibold mb-6">Support & Resistance</h3>
            <div className="mb-6">
                <h4 className="text-lg font-medium mb-2">
                    Pivot Point:
                    <span className={`ml-2 font-bold ${darkMode ? 'text-indigo-400' : 'text-blue-600'}`}>
                        {pivotPoint}
                    </span>
                </h4>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className={darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-900'}>
                        <th className="border border-gray-300 px-4 py-2 text-left">Level</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Resistance</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Support</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} className={darkMode ? 'bg-gray-700' : 'bg-white'}>
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.resistance}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.support}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SupportResistanceTable;
