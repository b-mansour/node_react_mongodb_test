import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home/Home.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState(
    "accessssssssssssssssssssss token"
  );

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
