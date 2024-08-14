import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';


const App: React.FC = () => (
  <Router>
    {/* <Navbar/> */}
    <Routes>
      <Route path="/My-Portfolio" element={<Home />} />
      
      {/* <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  </Router>
);

export default App;
