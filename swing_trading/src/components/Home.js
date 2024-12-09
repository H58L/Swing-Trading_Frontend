// import React, { useContext } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import Header from "./Header";
// import Footer from "./Footer";
// import ChartContainer from "./ChartContainer";
// import Counter from "./Counter";
// import { useLoginContext } from "../context/LoginContext";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const Home = () => {

//   //REMOVE THIS
//   // const { isLoggedin, setIsLoggedIn } = useLoginContext();
//   // const navigate = useNavigate();
//   // const [loggedOut, setLoggedOut] = useState(false);
//   // useEffect(() => {
//   //   //monitors chanege in userEmail or isLoggedin, used for logout
//   //   if (loggedOut && isLoggedin) {
//   //     console.log(isLoggedin);
//   //     // console.log(userEmail);
//   //     // console.log(loggedOut);
//   //     navigate("/");
//   //   }
//   // }, [isLoggedin,loggedOut,navigate]);

//   return (
//     <div className="home-container">
      
//       <div className="navigation">
//         {/* <Counter /> */}
//         {/* <Link to="/login" className="mr-4">
//           Login
//         </Link>
//         <Link to="/register" className="mr-4">
//           Register
//         </Link> */}
//           <Header></Header>
//         {/* Image with full width from the public folder */}
//         <img
//           src={`${process.env.PUBLIC_URL}/Landing_Page_bg.jpg`}
//           alt="Landing Page Background"
//           className="w-screen h-auto" // Tailwind classes for full width
//         />
//         <ChartContainer></ChartContainer>
//         <Footer></Footer>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Navigate } from "react-router-dom"; // Use Navigate for redirection
import Header from "./Header";
import Footer from "./Footer";
import ChartContainer from "./ChartContainer";
import { useLoginContext } from "../context/LoginContext";

const Home = () => {
  const { isLoggedin } = useLoginContext(); // Access authentication status

  // If the user is not logged in, redirect to the login page
  if (!isLoggedin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="home-container">
      <Header />
      
      {/* Full-width background image */}
      <div className="image-container">
        <img
          src={`${process.env.PUBLIC_URL}/Landing_Page_bg.jpg`}
          alt="Landing Page Background"
          className="w-screen h-auto"
        />
      </div>

      <ChartContainer />

      <Footer />
    </div>
  );
};

export default Home;
