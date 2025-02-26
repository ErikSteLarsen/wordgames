import React from 'react';
import WordleGame from './components/WordleGame';
import { HashRouter, Route, Routes } from 'react-router-dom';
import TopMenuBar from './components/menu/TopMenuBar';
import Instructions from './components/Instructions';
import About from './components/About';

const App: React.FC = () => {
  return (
    <HashRouter >
      <div className="startPage">
        <TopMenuBar />
        <Routes>
          <Route path="/" element={<WordleGame />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </HashRouter>
    
  );
};

export default App;
