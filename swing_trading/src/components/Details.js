// import React from 'react'
// import Card from './Card'

// const Details = ({details}) => {

//     const detailsList ={ //key value pairs
//         name: "Name",
//         country: "Currency",
//         exchnage: "Exchange",
//         ipo: "IPO Date",
//         marketCapitalization: "Market Cap",
//         finnhubIndustry: "Industry"
//     };

//     const convertMilliontoBillion = (number) =>
//     {
//        return(number/1000).toFixed(2);
//     }
//   return (
//     <Card>
//     <ul className='w-full h-full flex felx-col jusitfy-between divide-y-1'>
//     {Object.keys(detailsList).map((item) =>{
//         return <li key={item} className='flex-1 flex justify-between items-center'>
//             {/* Like a header */}
//             <span>{detailsList[item]}</span>  

//             {/* Actual Data which is coming from props, will be passed in CardContainer, convert Market Cap to Billion    */}
//             <span>{item === "marketCapitalization"
//             ? `${convertMilliontoBillion(details[item])}B`:
//              details[item]}
//             </span>
//         </li>;

//     })}

//     </ul>

//     </Card>
      
    
//   )
// }

// export default Details


// import React, { useContext } from "react";
// import Card from "./Card";
// //import ThemeContext from "../context/ThemeContext";

// const Details = ({ details }) => {
//   //const { darkMode } = useContext(ThemeContext);

//   const detailsList = {
//     name: "Name",
//     country: "Country",
//     currency: "Currency",
//     exchange: "Exchange",
//     ipo: "IPO Date",
//     marketCapitalization: "Market Capitalization",
//     finnhubIndustry: "Industry",
//   };

//   const convertMillionToBillion = (number) => {
//     return (number / 1000).toFixed(2);
//   };

//   return (
//     <Card>
//        <ul className='w-full h-full flex felx-col jusitfy-between divide-y-1'>
//         {Object.keys(detailsList).map((item) => {
//           return (
//             <li key={item} className="flex-1 flex justify-between items-center">
//               <span>{detailsList[item]}</span>
//               <span className="font-bold">
//                 {item === "marketCapitalization"
//                   ? `${convertMillionToBillion(details[item])}B`
//                   : details[item]}
//               </span>
//             </li>
//           );
//         })}
//       </ul>
//     </Card>
//   );
// };

// export default Details;

import React from "react";
import Card from "./Card";

const Details = ({ details }) => {
  const detailsList = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exchange",
    ipo: "IPO Date",
    marketCapitalization: "Market Capitalization",
    finnhubIndustry: "Industry",
  };

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };

  return (
    <Card>
      <ul className="w-full h-full flex flex-col justify-between divide-y divide-gray-200">
        {Object.keys(detailsList).map((item) => {
          return (
            <li key={item} className="flex justify-between items-center py-2">
              <span>{detailsList[item]}</span>
              <span className="font-bold">
                {item === "marketCapitalization"
                  ? `${convertMillionToBillion(details[item])}B`
                  : details[item]}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
