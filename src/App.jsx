import React from "react";
import './App.css';
import StarryBackground from "./components/Background/StarryBackground";
import Header from "./components/Header/header";
import AppRoutes from "./routes/AppRoutes"; 
import { AuthProvider } from "./contexts/AuthContext";



function App() {
  return (
       
    <div className="App">
      <StarryBackground />
     
       <AuthProvider>
        <Header /> {/* Използваме компонента Header */}
        <AppRoutes /> {/* Използваме дефинираните маршрути */}
        </AuthProvider>
    </div>
   
  );
}

export default App;
