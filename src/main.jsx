import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TravelApp from "./pages/TravelApp";
import "./assets/css/index.css";

function Main() {
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/travel-app" element={<TravelApp />} />
    </Routes>
  );
}

export default Main;
