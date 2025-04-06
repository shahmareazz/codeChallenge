import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CardApi from "./CardApi";
import ProductDetail from "./ProductDetail";

export const sampleContext = createContext();

function App() {
  const [product, setProduct] = useState([]);

  return (
    <sampleContext.Provider value={{ product, setProduct }}>
      <Router>
        <Routes>
          <Route path="/" element={<CardApi />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </sampleContext.Provider>
  );
}

export default App;
