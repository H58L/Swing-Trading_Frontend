// xxX ORIGINAL CODE XXXXX
// import React, { useState, useContext, useEffect } from 'react';
// import Header from './Header';
// import ThemeContext from "../context/ThemeContext";

// const AlertForm = () => {
//     const { darkMode } = useContext(ThemeContext);
//     const [formData, setFormData] = useState({
//         ticker: '',
//         currentPrice: '',
//         operator: '>=',
//         alertPrice: ''  // Ensure this field is included in the initial state
//     });
//     const [latestPrice, setLatestPrice] = useState(null); // State to hold the latest price

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault(); // Prevent form submission on Enter key
//             fetchStockData(formData.ticker); // Call the fetch function
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form data submitted:', formData);
//     };

//     const fetchStockData = async (symbol) => {
//         if (!symbol) return; // Exit if no symbol is provided

//         try {
//             const response = await fetch(
//                 `https://swing-trading-backend-fdrx.vercel.app/api/stock?ticker=${symbol}`
//             );
//             const data = await response.json();

//             if (!data.error) {
//                 const price = data.close[data.close.length - 1];
//                 setLatestPrice(price); // Set the latest price
//                 setFormData((prevData) => ({
//                     ...prevData,
//                     currentPrice: price // Update currentPrice in formData
//                 }));
//             }
//         } catch (error) {
//             console.error("Failed to fetch stock data for:", symbol);
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
//                 <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-indigo-400' : 'text-gray-900'}`}>
//                     Alert Conditions
//                 </h2>

//                 <form onSubmit={handleSubmit} className={`p-6 w-full max-w-md rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}`}>
//                     <div className="mb-4">
//                         <label htmlFor="ticker" className="block font-semibold mb-2">
//                             Stock Ticker
//                         </label>
//                         <input
//                             type="text"
//                             id="ticker"
//                             name="ticker"
//                             value={formData.ticker}
//                             onChange={handleChange}
//                             onKeyDown={handleKeyDown} // Handle Enter key press
//                             className={`w-full p-3 border rounded ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
//                             placeholder="Enter stock ticker"
//                             required
//                         />
//                     </div>
                    
//                     <div className="mb-4">
//                         <label htmlFor="currentPrice" className="block font-semibold mb-2">
//                             Current Price
//                         </label>
//                         <input
//                             type="number"
//                             id="currentPrice"
//                             name="currentPrice"
//                             value={formData.currentPrice}
//                             readOnly // Make this read-only if you're fetching the price
//                             className={`w-full p-3 border rounded ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
//                             placeholder={latestPrice ? latestPrice : "Press Enter in Stock Ticker to fetch latest price"}
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="alertPrice" className="block font-semibold mb-2">
//                             Alert Price
//                         </label>
//                         <input
//                             type="number"
//                             id="alertPrice"
//                             name="alertPrice"
//                             value={formData.alertPrice}
//                             onChange={handleChange}
//                             className={`w-full p-3 border rounded ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
//                             placeholder="Price for which you want to set an alert"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="operator" className="block font-semibold mb-2">
//                             Operator
//                         </label>
//                         <select
//                             id="operator"
//                             name="operator"
//                             value={formData.operator}
//                             onChange={handleChange}
//                             className={`w-full p-3 border rounded ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}
//                         >
//                             <option value=">=">&#8805; (Greater than or equal to)</option>
//                             <option value="<=">&#8804; (Less than or equal to)</option>
//                             <option value="=">= (Equal to)</option>
//                             <option value=">">&gt; (Greater than)</option>
//                             <option value="<">&lt; (Less than)</option>
//                         </select>
//                     </div>

//                     <button
//                         type="submit"
//                         className={`w-full mt-4 py-2 font-semibold rounded ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//                     >
//                         Submit
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default AlertForm;


// MORE AESTHETIC HARD CODED SUPPORT AND RESISTANCE
// import React, { useState, useContext } from 'react';
// import Header from './Header';
// import ThemeContext from "../context/ThemeContext";
// import SupportResistanceTable from './SupportResistanceTable';

// const AlertForm = () => {
//     const { darkMode } = useContext(ThemeContext);
//     const [formData, setFormData] = useState({
//         ticker: '',
//         currentPrice: '',
//         operator: '>=',
//         alertPrice: ''
//     });
//     const [latestPrice, setLatestPrice] = useState(null);

//     // Example support and resistance data
//     const pivotPoint = 225.40;

//     const supportResistanceData = [
//         { resistance: 228.05, support: 222.75 },
//         { resistance: 230.70, support: 220.10 },
//         { resistance: 233.35, support: 217.45 },
//         { resistance: 236.00, support: 214.80 },
//         { resistance: 238.65, support: 212.15 },
//     ];

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             fetchStockData(formData.ticker);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form data submitted:', formData);
//     };

//     const fetchStockData = async (symbol) => {
//         if (!symbol) return;

//         try {
//             const response = await fetch(
//                 `https://swing-trading-backend-fdrx.vercel.app/api/stock?ticker=${symbol}`
//             );
//             const data = await response.json();

//             if (!data.error) {
//                 const price = data.close[data.close.length - 1];
//                 setLatestPrice(price);
//                 setFormData((prevData) => ({
//                     ...prevData,
//                     currentPrice: price
//                 }));
//             }
//         } catch (error) {
//             console.error("Failed to fetch stock data for:", symbol);
//         }
//     };

    



//     return (
//         <>
//             <Header />
//             <div className={`min-h-screen py-8 px-4 flex flex-col items-center ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
//                 <h2 className={`text-3xl font-extrabold mb-8 ${darkMode ? 'text-indigo-400' : 'text-gray-800'}`}>
//                     Alert Conditions
//                 </h2>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
//                     {/* Form Section */}
//                     <form
//                         onSubmit={handleSubmit}
//                         className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}`}
//                     >
//                         <h3 className="text-xl font-semibold mb-6">Set Alert</h3>

//                         <div className="mb-4">
//                             <label htmlFor="ticker" className="block font-medium mb-2">
//                                 Stock Ticker
//                             </label>
//                             <input
//                                 type="text"
//                                 id="ticker"
//                                 name="ticker"
//                                 value={formData.ticker}
//                                 onChange={handleChange}
//                                 onKeyDown={handleKeyDown}
//                                 className={`w-full p-3 border rounded focus:outline-none ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
//                                 placeholder="Enter stock ticker"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label htmlFor="currentPrice" className="block font-medium mb-2">
//                                 Current Price
//                             </label>
//                             <input
//                                 type="number"
//                                 id="currentPrice"
//                                 name="currentPrice"
//                                 value={formData.currentPrice}
//                                 readOnly
//                                 className={`w-full p-3 border rounded ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
//                                 placeholder={latestPrice ? latestPrice : "Press Enter to fetch price"}
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label htmlFor="alertPrice" className="block font-medium mb-2">
//                                 Alert Price
//                             </label>
//                             <input
//                                 type="number"
//                                 id="alertPrice"
//                                 name="alertPrice"
//                                 value={formData.alertPrice}
//                                 onChange={handleChange}
//                                 className={`w-full p-3 border rounded focus:outline-none ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
//                                 placeholder="Set alert price"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label htmlFor="operator" className="block font-medium mb-2">
//                                 Operator
//                             </label>
//                             <select
//                                 id="operator"
//                                 name="operator"
//                                 value={formData.operator}
//                                 onChange={handleChange}
//                                 className={`w-full p-3 border rounded focus:outline-none ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}
//                             >
//                                 <option value=">=">&#8805; Greater than or equal to</option>
//                                 <option value="<=">&#8804; Less than or equal to</option>
//                                 <option value="=">= Equal to</option>
//                                 <option value=">">&gt; Greater than</option>
//                                 <option value="<">&lt; Less than</option>
//                             </select>
//                         </div>

//                         <button
//                             type="submit"
//                             className={`w-full py-3 font-medium rounded-lg focus:outline-none ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//                         >
//                             Submit
//                         </button>
//                     </form>

//                     {/* Support and Resistance Table */}
//                     <SupportResistanceTable data={supportResistanceData} darkMode={darkMode} pivotPoint={pivotPoint} />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AlertForm;

// XX WITH API CALL xx

import React, { useState, useContext } from 'react';
import Header from './Header';
import ThemeContext from "../context/ThemeContext";
import SupportResistanceTable from './SupportResistanceTable';

const AlertForm = () => {
    const { darkMode } = useContext(ThemeContext);
    const [formData, setFormData] = useState({
        ticker: '',
        currentPrice: '',
        operator: '>=',
        alertPrice: ''
    });
    const [latestPrice, setLatestPrice] = useState(null);
    const [supportResistanceData, setSupportResistanceData] = useState([]);
    const [pivotPoint, setPivotPoint] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchStockData(formData.ticker);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    const fetchStockData = async (symbol) => {
        if (!symbol) return;

        try {
            // Fetch the latest stock price
            const priceResponse = await fetch(
                `https://swing-trading-backend-fdrx.vercel.app/api/stock?ticker=${symbol}`
            );
            const priceData = await priceResponse.json();

            if (!priceData.error) {
                const price = priceData.close[priceData.close.length - 1];
                setLatestPrice(price);
                setFormData((prevData) => ({
                    ...prevData,
                    currentPrice: price
                }));
            }

            // Fetch support and resistance data
            const srResponse = await fetch(
                `https://swing-trading-backend-fdrx.vercel.app/api/support?ticker=${symbol}`
            );
            const srData = await srResponse.json();

            if (!srData.error) {
                setPivotPoint(srData.pivot_point);
                setSupportResistanceData(srData.supports.map((support, index) => ({
                    resistance: srData.resistances[index],
                    support: support,
                })));
            }
        } catch (error) {
            console.error("Failed to fetch stock or support/resistance data for:", symbol);
        }
    };

    return (
        <>
            <Header />
            <div className={`min-h-screen py-8 px-4 flex flex-col items-center ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
                <h2 className={`text-3xl font-extrabold mb-8 ${darkMode ? 'text-indigo-400' : 'text-gray-800'}`}>
                    Alert Conditions
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
                    {/* Form Section */}
                    <form
                        onSubmit={handleSubmit}
                        className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}`}
                    >
                        <h3 className="text-xl font-semibold mb-6">Set Alert</h3>

                        <div className="mb-4">
                            <label htmlFor="ticker" className="block font-medium mb-2">
                                Stock Ticker
                            </label>
                            <input
                                type="text"
                                id="ticker"
                                name="ticker"
                                value={formData.ticker}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                className={`w-full p-3 border rounded focus:outline-none ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
                                placeholder="Enter stock ticker"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="currentPrice" className="block font-medium mb-2">
                                Current Price
                            </label>
                            <input
                                type="number"
                                id="currentPrice"
                                name="currentPrice"
                                value={formData.currentPrice}
                                readOnly
                                className={`w-full p-3 border rounded ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
                                placeholder={latestPrice ? latestPrice : "Press Enter to fetch price"}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="alertPrice" className="block font-medium mb-2">
                                Alert Price
                            </label>
                            <input
                                type="number"
                                id="alertPrice"
                                name="alertPrice"
                                value={formData.alertPrice}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded focus:outline-none ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
                                placeholder="Set alert price"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="operator" className="block font-medium mb-2">
                                Operator
                            </label>
                            <select
                                id="operator"
                                name="operator"
                                value={formData.operator}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded focus:outline-none ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}
                            >
                                <option value=">=">&#8805; Greater than or equal to</option>
                                <option value="<=">&#8804; Less than or equal to</option>
                                <option value="=">= Equal to</option>
                                <option value=">">&gt; Greater than</option>
                                <option value="<">&lt; Less than</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 font-medium rounded-lg focus:outline-none ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                        >
                            Submit
                        </button>
                    </form>

                    {/* Support and Resistance Table */}
                    <SupportResistanceTable 
                        data={supportResistanceData} 
                        darkMode={darkMode} 
                        pivotPoint={pivotPoint} 
                    />
                </div>
            </div>
        </>
    );
};

export default AlertForm;
