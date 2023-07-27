import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap"; // Import Container from React-Bootstrap
import Homepage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container fluid className="bg-dark text-white min-vh-100"> 
      <Routes>
        <Route path="/" element={<Homepage/>} exact />
        <Route path="/coins/:id" element={<CoinPage/>} exact />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
