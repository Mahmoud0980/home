import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PricePredictor from "./components/PricePredictor";
import RentProperties from "./pages/RentProperties";
import MortgageProperties from "./pages/MortgageProperties";
import Agents from "./pages/Agents";
import Sale from "./pages/Sale";
import ContactAgent from "./pages/ContactAgent";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ContactSettings from "./pages/admin/ContactSettings";

import ListAgents from "./pages/admin/Agents/ListAgents";
import AddAgent from "./pages/admin/Agents/AddAgent";
import EditAgent from "./pages/admin/Agents/EditAgent";

import ListProperties from "./pages/admin/Properties/ListProperties";
import AddPropertyAdmin from "./pages/admin/Properties/AddProperty";
import EditProperty from "./pages/admin/Properties/EditProperty";
import AssignAgent from "./pages/admin/Properties/AssignAgent";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home user={user} />} />
        <Route path="/contact-agent" element={<ContactAgent />} />
        <Route path="/add" element={<AddProperty user={user} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route
          path="/predict"
          element={<PricePredictor isLoggedIn={!!user} />}
        />
        <Route path="/sale" element={<Sale />} />
        <Route path="/rent" element={<RentProperties />} />
        <Route path="/mortgage" element={<MortgageProperties />} />
        <Route path="/agents" element={<Agents />} />

        {/* Admin Dashboard */}
        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />

        {/* Contact Settings */}
        <Route path="/admin/contact-settings" element={<ContactSettings />} />

        {/* Agents CRUD */}
        <Route path="/admin/agents" element={<ListAgents />} />
        <Route path="/admin/agents/add" element={<AddAgent />} />
        <Route path="/admin/agents/edit/:id" element={<EditAgent />} />

        {/* Properties CRUD */}
        <Route path="/admin/properties" element={<ListProperties />} />
        <Route path="/admin/properties/add" element={<AddPropertyAdmin />} />
        <Route path="/admin/properties/edit/:id" element={<EditProperty />} />
        <Route path="/admin/properties/assign" element={<AssignAgent />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
