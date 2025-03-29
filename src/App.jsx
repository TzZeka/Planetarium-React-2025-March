import React from "react";
import './App.css';
import StarryBackground from "./components/Background/StarryBackground";
import Header from "./components/Header/header";
import AppRoutes from "./routes/AppRoutes"; 
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/footer";



function App() {
  return (
       
    <div className="App">
          <ToastContainer/>
          <StarryBackground />
          <Header /> 
          <AppRoutes />
          <Footer/>      
    </div>
   
  );
}

export default App;
