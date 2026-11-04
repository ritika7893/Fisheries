import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  Fish,
  ArrowRight,
  ShieldCheck,
  UserRound,
  LockKeyhole,
  Mail,
  MapPin,
} from "lucide-react";
import Home from "./pages/Home";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./dashboards/Overview";
import Listings from "./pages/Listings";
import Negotiations from "./pages/Negotiations";
import Deliveries from "./pages/Deliveries";
import People from "./pages/People";
import Reports from "./pages/Reports";
import Payments from "./pages/Payments";
import Modal from "./components/Modal/Modal";
import { roles } from "./data/seed";
import "./styles/global.css";
function AppRoutes() {
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
  const [location, setLocation] = useState("Dehradun, Uttarakhand");
  const navigate = useNavigate();
  const login = () => {
    const r = roles.find((x) => x.id === role);
    const u = { name, role, roleLabel: r.label, email, location };
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
      <Routes>
        <Route
          path="/"
          element={<Home onLogin={openLogin} onRegister={openRegister} />}
        />
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
              <Navigate to="/" />
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {dialog && (
        <Modal
          title={
            dialog === "login" ? "Welcome back" : "Join the AquaTrade network"
          }
          onClose={() => setDialog("")}
        >
          <div className="auth-intro">
            <div>
              <Fish size={22} />
            </div>
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
                  <option value={r.id}>{r.label}</option>
                ))}
              </select>
            </label>
            <label className="full-field">
              {dialog === "login"
                ? "Display name"
                : "Your name / business name"}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </label>
            <label className="full-field">
              Email address
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {dialog === "register" && (
              <label className="full-field">
                Location
                <input
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
            )}
            <div className="auth-note full-field">
              <ShieldCheck size={15} /> Demo mode · Your activity is saved in
              this browser only.
            </div>
            <button className="primary-btn full-field">
              {dialog === "login" ? "Enter dashboard" : "Create demo account"}{" "}
              <ArrowRight size={15} />
            </button>
          </form>
          <div className="demo-hint">
            Quick demo: Admin · Inventory Manager · Fish Farmer · Delivery
            Personnel
          </div>
        </Modal>
      )}
    </>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
