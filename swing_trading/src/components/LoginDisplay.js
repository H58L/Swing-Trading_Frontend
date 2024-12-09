import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "./Header";
import Footer from "./Footer";
import ChartContainer from "./ChartContainer";
import Counter from "./Counter";
import Login from "./Login";

const LoginDisplay = () => {
  return (
    
      <>
        <Header></Header>
        <Login></Login>
        <Footer></Footer> 
      </>
      
     
     
   
  );
};

export default LoginDisplay;
