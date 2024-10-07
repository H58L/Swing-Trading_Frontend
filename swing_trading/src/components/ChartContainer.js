
// import React from "react";
// import Card from "./Card";
// import Header from "./Header";
// import Details from "./Details";
// import { mockCompanyDetails } from "../constants/mock";
// import Overview from "./Overview";

// const ChartContainer = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-10 font-quicksand auto-rows-auto">
//       {/* Header */}
//       <div className="col-span-1 md:col-span-2 xl:col-span-3">
//         <Header name={mockCompanyDetails.name} />
//       </div>

//       {/* Chart */}
//       <div className="col-span-1 md:col-span-2 row-span-4">
//         <Card>Chart</Card>
//       </div>

//       {/* Overview */}
//       <div className="col-span-1">
//         <Overview symbol={mockCompanyDetails.ticker} price = {300} change={30} changePercent={10.0} currency={"USD"}>

//         </Overview>
//       </div>

//       {/* Details */}
//       <div className="col-span-1 row-span-2 xl:row-span-3">
//         <Details details={mockCompanyDetails} />
//       </div>
//     </div>
//   );
// };

// export default ChartContainer;

import React from "react";
import Card from "./Card";
import Header from "./Header";
import Details from "./Details";
import { mockCompanyDetails } from "../constants/mock";
import ThemeIcon from './ThemeIcon'; // import the ThemeIcon component

const ChartContainer = () => {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 
    xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand relative"> 
      {/* Removed absolute positioning from ThemeIcon and added relative to container */}

      {/* Header row */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={mockCompanyDetails.name}></Header>
      </div>

      {/* Chart box */}
      <div className="md:col-span-2 row-span-4">
        <Card>
          Chart
        </Card>
      </div>

      {/* Overview box */}
      <div>
        <Card>
          Overview
        </Card>
      </div>

      {/* Company details */}
      <div className="row-span-2 xl:row-span-3">
        <Details details={mockCompanyDetails}></Details>
      </div> 

    </div>
  );
}

export default ChartContainer;

