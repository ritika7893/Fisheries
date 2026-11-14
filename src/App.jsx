import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Fish,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./styles/global.css";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import DashboardLayout from "./layouts/DashboardLayout";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";

import Overview from "./dashboards/Overview";
import Listings from "./pages/Listings";
import Negotiations from "./pages/Negotiations";
import Deliveries from "./pages/Deliveries";
import People from "./pages/People";
import Reports from "./pages/Reports";
import Payments from "./pages/Payments";

import { roles } from "./data/seed";

function AppContent() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("aqua_user"));
    } catch {
      return null;
    }
  });
  const [dialog, setDialog] = useState("");
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("AquaTrade Admin");
  const [email, setEmail] = useState("admin@aquatrade.in");
  const demoProfiles = {
    admin: { name: "AquaTrade Admin", email: "admin@aquatrade.in" },
    inventory: { name: "Inventory Manager", email: "inventory@demo.com" },
    farmer: { name: "Rajesh Kumar", email: "rajesh@demo.com" },
    hatchery: { name: "Maa Ganga Hatchery", email: "hatchery@demo.com" },
    dam: { name: "Amit Singh", email: "amit@demo.com" },
    contractor: { name: "Riverside Contractors", email: "contractor@demo.com" },
    delivery: { name: "Vikram Rawat", email: "delivery@demo.com" },
  };
  const [userLocation, setUserLocation] = useState("Dehradun, Uttarakhand");

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/app");

  const login = () => {
    const r = roles.find((x) => x.id === role);
    const u = { name, role, roleLabel: r?.label, email, location: userLocation };
    setUser(u);
    localStorage.setItem("aqua_user", JSON.stringify(u));
    setDialog("");
    navigate("/app");
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("aqua_user");
    navigate("/");
  };
  const openLogin = () => {
    setDialog("login");
    setRole("admin");
    setName(demoProfiles.admin.name);
    setEmail(demoProfiles.admin.email);
  };
  const openRegister = () => {
    setDialog("register");
    setRole("farmer");
    setName(demoProfiles.farmer.name);
    setEmail(demoProfiles.farmer.email);
  };

  return (
    <>
      {!isDashboard && <Navbar onLogin={openLogin} onRegister={openRegister} />}
      <Routes>
        <Route path="/" element={<Home onLogin={openLogin} onRegister={openRegister} />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route
          path="/app"
          element={
            user ? (
              <DashboardLayout
                user={user}
                onLogout={logout}
                onRoleChange={(r) => {
                  setRole(r);
                  setDialog("login");
                }}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          <Route index element={<Overview />} />
          <Route path="listings" element={<Listings />} />
          <Route path="negotiations" element={<Negotiations />} />
          <Route path="deliveries" element={<Deliveries />} />
          <Route path="payments" element={<Payments />} />
          <Route path="people" element={<People />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {dialog && (
        <Modal
          title={dialog === "login" ? "Welcome back" : "Join the AquaTrade network"}
          onClose={() => setDialog("")}
        >
          <div className="auth-intro">
            <div><Fish size={22} /></div>
            <p>
              {dialog === "login"
                ? "Choose a demo role and enter the workspace. No password or backend is required."
                : "Create a local demo profile to explore the supplier experience."}
            </p>
          </div>
          <form
            className="form-grid auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <label className="full-field">
              Workspace role
              <select
                value={role}
                onChange={(e) => {
                  const nextRole = e.target.value;
                  setRole(nextRole);
                  const profile = demoProfiles[nextRole];
                  if (profile) {
                    setName(profile.name);
                    setEmail(profile.email);
                  }
                }}
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </label>
            <label className="full-field">
              {dialog === "login" ? "Display name" : "Your name / business name"}
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            </label>
            <label className="full-field">
              Email address
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            {dialog === "register" && (
              <label className="full-field">
                Location
                <input required value={userLocation} onChange={(e) => setUserLocation(e.target.value)} />
              </label>
            )}
            <div className="auth-note full-field">
              <ShieldCheck size={15} /> Demo mode · Your activity is saved in this browser only.
            </div>
            <button className="primary-btn full-field">
              {dialog === "login" ? "Enter dashboard" : "Create demo account"} <ArrowRight size={15} />
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

function App() {
  return (
    <Router basename="/">
      <AppContent />
    </Router>
  );
}

export default App;