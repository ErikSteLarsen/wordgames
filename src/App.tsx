import React from 'react';
import WordleGame from './components/WordleGame';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import TopMenuBar from './components/menu/TopMenuBar';
import Instructions from './components/Instructions';
import About from './components/About';

const App: React.FC = () => {
  return (
    <BrowserRouter >
      <div className="startPage">
        <TopMenuBar />
        <Routes>
          <Route path="/wordgames" element={<WordleGame />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
    
  );
};

export default App;
