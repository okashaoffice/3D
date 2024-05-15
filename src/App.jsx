import { useState, useRef, useEffect } from "react";
import "./App.css";
import Cube from "./component/Cube";
import Sphere from "./component/Sphere";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Cube />}></Route>
        <Route path="/sphere" element={<Sphere />}></Route>
        <Route path="/box" element={<Cube />}></Route>
      </Routes>
    </div>
  );
}

export default App;
