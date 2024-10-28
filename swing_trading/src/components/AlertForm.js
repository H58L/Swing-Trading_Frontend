// import React, { useState } from 'react';
// import Header from './Header';

// const AlertForm = () => {
//   const [formData, setFormData] = useState({
//     ticker: '',
//     currentPrice: '',
//     operator: '>='
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form data submitted:', formData);
//     // Add your form submission logic here
//   };

//   return (
//     <div>
//       <Header />
//       <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
//         <div className="mb-4">
//           <label htmlFor="ticker" className="block text-gray-700 font-semibold mb-2">
//             Stock Ticker
//           </label>
//           <input
//             type="text"
//             id="ticker"
//             name="ticker"
//             value={formData.ticker}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Enter stock ticker (e.g., RELIANCE.NS)"
//             required
//           />
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="currentPrice" className="block text-gray-700 font-semibold mb-2">
//             Current Price
//           </label>
//           <input
//             type="number"
//             id="currentPrice"
//             name="currentPrice"
//             value={formData.currentPrice}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//             placeholder="Fetch Current Price from API"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="operator" className="block text-gray-700 font-semibold mb-2">
//             Operator
//           </label>
//           <select
//             id="operator"
//             name="operator"
//             value={formData.operator}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded"
//           >
//             <option value=">=">&#8805; (Greater than or equal to)</option>
//             <option value="<=">&#8804; (Less than or equal to)</option>
//             <option value="=">= (Equal to)</option>
//             <option value=">">&gt; (Greater than)</option>
//             <option value="<">&lt; (Less than)</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AlertForm;


import React, { useState } from 'react';
import Header from './Header';
import ThemeContext from "../context/ThemeContext";
import { useContext } from 'react';

const AlertForm = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    ticker: '',
    currentPrice: '',
    operator: '>='
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <>
         <Header />

    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
    
    <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-indigo-400' : 'text-gray-900'}`}>
          Alert Conditions
        </h2>

      <form onSubmit={handleSubmit} className={`p-6 w-full max-w-md rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}`}>
        <div className="mb-4">
          <label htmlFor="ticker" className="block font-semibold mb-2">
            Stock Ticker
          </label>
          <input
            type="text"
            id="ticker"
            name="ticker"
            value={formData.ticker}
            onChange={handleChange}
            className={`w-full p-3 border rounded ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
            placeholder="Enter stock ticker (e.g., RELIANCE.NS)"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="currentPrice" className="block font-semibold mb-2">
            Current Price
          </label>
          <input
            type="number"
            id="currentPrice"
            name="currentPrice"
            value={formData.currentPrice}
            onChange={handleChange}
            className={`w-full p-3 border rounded ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100 placeholder-gray-400' : 'border-gray-300 text-gray-900'}`}
            placeholder="Fetch Current Price from API"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="operator" className="block font-semibold mb-2">
            Operator
          </label>
          <select
            id="operator"
            name="operator"
            value={formData.operator}
            onChange={handleChange}
            className={`w-full p-3 border rounded ${darkMode ? 'border-gray-700 bg-gray-700 text-gray-100' : 'border-gray-300 text-gray-900'}`}
          >
            <option value=">=">&#8805; (Greater than or equal to)</option>
            <option value="<=">&#8804; (Less than or equal to)</option>
            <option value="=">= (Equal to)</option>
            <option value=">">&gt; (Greater than)</option>
            <option value="<">&lt; (Less than)</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full mt-4 py-2 font-semibold rounded ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Submit
        </button>
      </form>
    </div>
    </>
   
  );
};

export default AlertForm;
