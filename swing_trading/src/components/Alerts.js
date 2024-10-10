import React from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContex";

const Alerts = () => {
  const alerts = [
    {
      title: "Market Open",
      description: "The stock market has opened for trading.",
      timestamp: "2024-10-08T09:30:00",
    },
    {
      title: "New Price Target",
      description: "Analysts have raised the price target for XYZ stock.",
      timestamp: "2024-10-08T12:00:00",
    },
    {
      title: "Earnings Report",
      description:
        "Company ABC will release its quarterly earnings report tomorrow.",
      timestamp: "2024-10-07T16:00:00",
    },
    {
      title: "Dividend Announcement",
      description:
        "Company DEF declared a quarterly dividend of $0.50 per share.",
      timestamp: "2024-10-06T14:00:00",
    },
    {
      title: "Stock Split",
      description: "Company GHI announces a 2-for-1 stock split.",
      timestamp: "2024-10-05T10:00:00",
    },
  ];

  const {darkMode, setDarkMode} = useContext(ThemeContext);

  return (
    <div className="p-0 h-full">
      <ul className="h-full  border-gray-300">
        {alerts.map((alert, index) => (
          <li
            key={index}
            className="alert-item mb-3 bg-white rounded p-4 shadow-sm border border-gray-300 w-full"
          >
            <h3 className="text-lg font-semibold">{alert.title}</h3>
            <p className="text-gray-700">{alert.description}</p>
            <span className="text-sm text-gray-500">
              {new Date(alert.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;


// import React from "react";
// import { useContext } from "react";
// import ThemeContext from "../context/ThemeContex";

// const Alerts = () => {
//   const alerts = [
//     {
//       title: "Market Open",
//       description: "The stock market has opened for trading.",
//       timestamp: "2024-10-08T09:30:00",
//     },
//     {
//       title: "New Price Target",
//       description: "Analysts have raised the price target for XYZ stock.",
//       timestamp: "2024-10-08T12:00:00",
//     },
//     {
//       title: "Earnings Report",
//       description:
//         "Company ABC will release its quarterly earnings report tomorrow.",
//       timestamp: "2024-10-07T16:00:00",
//     },
//     {
//       title: "Dividend Announcement",
//       description:
//         "Company DEF declared a quarterly dividend of $0.50 per share.",
//       timestamp: "2024-10-06T14:00:00",
//     },
//     {
//       title: "Stock Split",
//       description: "Company GHI announces a 2-for-1 stock split.",
//       timestamp: "2024-10-05T10:00:00",
//     },
//   ];

//   const { darkMode } = useContext(ThemeContext);

//   return (
//     <div className={`alerts-container ${darkMode ? "dark-mode" : "light-mode"}`}>
//       <h2>Alerts</h2>
//       <ul className="alerts-list">
//         {alerts.map((alert, index) => (
//           <li key={index} className={`alert-item ${darkMode ? "dark" : "light"}`}>
//             <h3>{alert.title}</h3>
//             <p>{alert.description}</p>
//             <span>{new Date(alert.timestamp).toLocaleString()}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Alerts;
