import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Activity,
  Bell,
  ChevronDown,
  Fish,
  LayoutDashboard,
  Package,
  Handshake,
  Truck,
  Users,
  Settings,
  LogOut,
  Menu,
  Waves,
  UserRound,
  BarChart3,
  WalletCards,
} from "lucide-react";
import "./DashboardLayout.css";
const links = [
  ["Overview", "/app", LayoutDashboard],
  ["Fish listings", "/app/listings", Fish],
  ["Negotiations", "/app/negotiations", Handshake],
  ["Payments", "/app/payments", WalletCards],
  ["Deliveries", "/app/deliveries", Truck],
  ["People & suppliers", "/app/people", Users],
  ["Reports & insights", "/app/reports", BarChart3],
];
export default function DashboardLayout({ user, onLogout, onRoleChange }) {
  const nav = useNavigate();
  const visibleLinks =
    user.role === "delivery"
      ? links.filter((x) => ["Overview", "Deliveries"].includes(x[0]))
      : ["farmer", "hatchery", "dam", "contractor"].includes(user.role)
        ? links.filter((x) =>
            [
              "Overview",
              "Fish listings",
              "Negotiations",
              "Payments",
              "Deliveries",
            ].includes(x[0]),
          )
        : user.role === "inventory"
          ? links.filter((x) => x[0] !== "Reports & insights")
          : links;
  return (
    <div className="dash-shell">
      <aside className="dash-sidebar">
        <a className="brand side-brand" href="/">
          <span className="brand-mark">
            <Fish />
          </span>
          <span>
            Aqua<span>Trade</span>
            <small>TRADE MANAGEMENT</small>
          </span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <div className="side-links">
          {visibleLinks.map(([name, path, Icon]) => (
            <NavLink key={path} end={path === "/app"} to={path}>
              <Icon size={17} />
              {name}
              {name === "Negotiations" && <b>3</b>}
            </NavLink>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="help-card">
            <Waves size={18} />
            <b>Keep the chain fresh</b>
            <p>Monitor freshness windows and reduce post-harvest loss.</p>
          </div>
          <button onClick={onLogout}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>
      <main className="dash-main">
        <header className="dash-topbar">
          <div className="crumb">
            <span>Workspace</span>
            <b>/</b> Overview
          </div>
          <div className="top-actions">
            <span className="live-dot">● Demo environment</span>
            <button className="bell-btn">
              <Bell size={18} />
              <i />
            </button>
            <div className="profile-chip">
              <div className="avatar">{user.name?.[0] || "A"}</div>
              <div>
                <b>{user.name}</b>
                <small>{user.roleLabel}</small>
              </div>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>
        <div className="dash-content">
          <Outlet context={{ user, onRoleChange }} />
        </div>
      </main>
    </div>
  );
}
