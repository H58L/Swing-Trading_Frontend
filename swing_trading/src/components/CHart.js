// import React, { useState } from 'react'
// import { mockHistoricalData } from '../constants/mock'
// import { convertDateToUnixTimeStamp } from '../helpers/date-helper';
// import Card from './Card';
// import {ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis} from "recharts"



// const Chart = () => {
// //creating state
// const [data, setData] = useState(mockHistoricalData);
// const [filter, setFilter] = useState("1W");

// //function that will format closing data
// const formatData = () => {
//     return data.c.map((item, index) => {
//         return {
//             value: item.toFixed(2),   //Value of closing price upto 2 decimal places
//             date: convertDateToUnixTimeStamp(data.t[index]),     //COnvert ms to s
//         };

//     });
// };

//   return (
//     <Card>
//         <ResponsiveContainer>
//             <AreaChart data ={formatData(data)}>
//                 <Area type = "monotone" dataKey="value" stroke="#312e81" fillOpacity={1} strokeWidth={0.5}>
//                 </Area>
//                 <Tooltip>
//                     <XAxis dataKey={"date"}></XAxis>
//                     <YAxis domain={["dataMin", "dataMax"]}></YAxis>   
//                 </Tooltip>
//             </AreaChart>
//         </ResponsiveContainer>
//     </Card>
//   )
// };

// export default Chart

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// import React, { useState } from 'react'
// import { mockHistoricalData } from '../constants/mock'
// import { convertDateToUnixTimeStamp } from '../helpers/date-helper';
// import Card from './Card';
// import {ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis} from "recharts"



// const Chart = () => {
//   const [filter, setFilter] = useState("1W");

 

//   const [data, setData] = useState([]);

//   const formatData = (data) => {
//     return data.c.map((item, index) => {
//       return {
//         value: item.toFixed(2),
//         date: convertDateToUnixTimeStamp(data.t[index]),
//       };
//     });
//   };

  

    

   

//   return (
//     <Card>
//       {/* <ul className="flex absolute top-2 right-2 z-40">
//         {Object.keys(chartConfig).map((item) => (
//           <li key={item}>
            
//           </li>
//         ))}
//       </ul> */}
//       <ResponsiveContainer>
//         <AreaChart data={data}>
          
//           <Tooltip
            
//           />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#312e81"
//             fill="url(#chartColor)"
//             fillOpacity={1}
//             strokeWidth={0.5}
//           />
//           <XAxis dataKey="date" />
//           <YAxis domain={["dataMin", "dataMax"]} />
//         </AreaChart>
//       </ResponsiveContainer>
//     </Card>
//   );
// };

// export default Chart;

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

import React, { useState } from 'react';
import { mockHistoricalData } from '../constants/mock';
import { convertDateToUnixTimeStamp, convertUnixTimeStampToDate } from '../helpers/date-helper';
import Card from './Card';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

const Chart = () => {
  //creating state
  const [data, setData] = useState(mockHistoricalData);
  const [filter, setFilter] = useState("1W");

  //function that will format closing data
  const formatData = () => {
    return data.c.map((item, index) => {
      return {
        value: parseFloat(item.toFixed(2)),   //Value of closing price up to 2 decimal places
        date: convertUnixTimeStampToDate(data.t[index]), //Convert ms to s
      };
    });
  };

  return (
    <Card>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={formatData()}>
                <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgb(199 210 254)" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="rgb(199 210 254" stopOpacity={0}/>
            </linearGradient>
            
        </defs>
          <XAxis dataKey={"date"} />
          <YAxis domain={['auto', 'auto']} />
          <Area type="monotone" dataKey="value" stroke="#312e81" 
          fillOpacity={0.6} 
          strokeWidth={1}
          fill = "url(#chartColor)" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
