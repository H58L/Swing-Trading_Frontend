// import React, { useState } from 'react';
// import { mockHistoricalData } from '../constants/mock';
// import { convertDateToUnixTimeStamp, convertUnixTimeStampToDate } from '../helpers/date-helper';
// import Card from './Card';
// import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";
// import { chatConfig } from '../constants/config';
// import ChartFilter from './ChartFilter';

// const Chart = () => {
//   //creating state
//   const [data, setData] = useState(mockHistoricalData);
//   const [filter, setFilter] = useState("1W");  //state that changes filter ie 1W, 1M, 1Y

//   //function that will format closing data
//   const formatData = () => {
//     return data.c.map((item, index) => {
//       return {
//         value: parseFloat(item.toFixed(2)),   //Value of closing price up to 2 decimal places
//         date: convertUnixTimeStampToDate(data.t[index]), //Convert ms to s
//       };
//     });
//   };

//   return (
//     <Card>
//     {/* Unordered list for chartfilters */}
//     <ul className='flec absolute top-2 right-2 z-40'>
//         {Object.keys(chatConfig).map((item => {
//             <li key = {item}>
//                 <ChartFilter text={item} active = {filter === item} onClick = {() =>{
//                     // Changing the state of fileter by setting it to item
//                     setFilter(item);
//                 } }></ChartFilter>
//             </li>;
//         }))}
//     </ul>
//       <ResponsiveContainer width="100%" height={400}>
//         <AreaChart data={formatData()}>
//                 <defs>
//             <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor="rgb(199 210 254)" stopOpacity={0.8}/>
//             <stop offset="95%" stopColor="rgb(199 210 254" stopOpacity={0}/>
//             </linearGradient>

//         </defs>
//           <XAxis dataKey={"date"} />
//           <YAxis domain={['auto', 'auto']} />
//           <Area type="monotone" dataKey="value" stroke="#312e81"
//           fillOpacity={0.6}
//           strokeWidth={1}
//           fill = "url(#chartColor)" />
//           <Tooltip />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };

// export default Chart;

import React, { useState } from "react";
import { mockHistoricalData } from "../constants/mock";
import { convertUnixTimeStampToDate } from "../helpers/date-helper";
import Card from "./Card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chatConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../context/ThemeContex";
import { useContext } from "react";

const Chart = () => {
  // Creating state for data and filter
  const [data, setData] = useState(mockHistoricalData);
  const [filter, setFilter] = useState("1W"); // State for controlling the filter (1W, 1M, 1Y)
  const {darkMode} = useContext(ThemeContext);

  // Function to format data for chart
  const formatData = () => {
    return data.c.map((item, index) => {
      return {
        value: parseFloat(item.toFixed(2)), // Value of closing price up to 2 decimal places
        date: convertUnixTimeStampToDate(data.t[index]), // Convert Unix timestamp to readable date
      };
    });
  };

  return (
    
    <Card>
      {/* Chart Filters */}
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chatConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => setFilter(item)} // Set the filter state when clicked
            />
          </li>
        ))}
      </ul>

      {/* Chart Rendering */}
     

  
      <ResponsiveContainer width="100%" height={400} >
        <AreaChart data={formatData()}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor= {darkMode ? "#312e81" : "rgb(199 210 254"}
                stopOpacity={0.8}
              />
              <stop offset="95%" stopColor= {darkMode ? "#312e81" : "rgb(199 210 254"} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* XAxis and YAxis for the chart */}
          <XAxis dataKey={"date"} />
          <YAxis domain={["auto", "auto"]} />

          {/* The area of the chart that is filled */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fillOpacity={0.6}
            strokeWidth={1}
            fill="url(#chartColor)"
          />

          <Tooltip 
          contentStyle={darkMode ? {backgroundColor: "#111827"} : null}
          itemStyle={darkMode ? {color : "#818cf8"} : null}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
    
  );
};

export default Chart;
