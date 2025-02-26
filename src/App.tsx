import React from "react";
import WordleGame from "./components/wordlegame/WordleGame";
import { HashRouter, Route, Routes } from "react-router-dom";
import TopMenuBar from "./components/menu/TopMenuBar";
import About from "./components/aboutpage/About";
import InfoPage from "./components/infopage/InfoPage";

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="startPage">
        <TopMenuBar />
        <Routes>
          <Route path="/" element={<WordleGame />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
