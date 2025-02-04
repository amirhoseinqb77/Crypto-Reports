import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import CryptoReport from "./crypto/crypto";

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
       
          <Route path="/" element={<CryptoReport />} />
          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
