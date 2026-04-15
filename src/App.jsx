import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Listings from "./pages/Listings";
import Services from "./pages/Services";
import Auth from "./contexts/Auth";
import AddService from "./pages/AddService";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/add-service" element={<AddService/>} />
        <Route path="/listings" element={<Listings/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
