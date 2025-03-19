import React from "react";

import './App.css';
import StarryBackground from "./components/Background/StarryBackground";
import Header from "./components/Header/header";
import AppRoutes from "./routes/AppRoutes"; // Импортираме компонентa с маршрутите
import { AuthProvider } from "./contexts/AuthContext";



function App() {
  return (
    <AuthProvider>
    <div className="App">
      
        <StarryBackground />
        <Header />
        <AppRoutes /> {/* Използваме дефинираните маршрути */}
      
    </div>
    </AuthProvider>
  );
}

export default App;
