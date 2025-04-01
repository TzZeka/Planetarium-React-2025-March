import React from "react";
import './App.css';
import StarryBackground from "./components/Background/StarryBackground";
import Header from "./components/Header/header";
import AppRoutes from "./routes/AppRoutes"; 
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/footer";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";



function App() {
  return (
     <AuthProvider> 
        <div className="App">
            <ToastContainer/>
            <StarryBackground />
          <ErrorBoundary>
              <Header />
              <AppRoutes />
          </ErrorBoundary>
            <Footer/>         
        </div>
    </AuthProvider> 
   
  );
}

export default App;
