
import {Routes, Route, } from 'react-router';


import StarryBackground from "./components/Background/StarryBackground";
import Header from "./components/Header/header";
import Home from "./pages/Home/home";
import About from './pages/About/about';
import Contacts from './pages/Contacts/contacts';

function App() {

  

  return (
    <div className="App">
      <StarryBackground/>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/planets" element={<h1>Planets</h1>} />
      </Routes>
    </div>
  );
}

export default App;