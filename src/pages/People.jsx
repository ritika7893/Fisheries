import React, { useState } from "react";
import { Users, Search, Plus, MapPin, Mail, ShieldCheck } from "lucide-react";
import { getUsers } from "../utils/store";
import Modal from "../components/Modal/Modal";
import "./People.css";
export default function People() {
  const [users, setUsers] = useState(getUsers());
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [f, setF] = useState({
    name: "",
    email: "",
    role: "farmer",
    location: "",
  });
  const labels = {
    farmer: "Fish Farmer",
    hatchery: "Hatchery Farmer",
    dam: "Dam Farmer",
    contractor: "River Contractor",
    delivery: "Delivery Personnel",
    inventory: "Inventory Manager",
    admin: "Administrator",
  };
  return (
    <div>
      <div className="page-heading">
        <div>
          <div className="welcome-kicker">PARTNER DIRECTORY</div>
          <h1>People & suppliers</h1>
          <p>
            Manage the trusted network powering your fisheries supply chain.
          </p>
        </div>
        <button className="primary-btn" onClick={() => setOpen(true)}>
          <Plus size={16} /> Add partner
        </button>
      </div>
      <div className="people-stats">
        <div>
          <Users />
          <b>{users.length + 24}</b>
          <span>Registered partners</span>
        </div>
        <div>
          <Fish />
          <b>
            {users.filter((x) =>
              ["farmer", "hatchery", "dam", "contractor"].includes(x.role),
            ).length + 18}
          </b>
          <span>Suppliers & producers</span>
        </div>
        <div>
          <ShieldCheck />
          <b>96%</b>
          <span>Verified profiles</span>
        </div>
      </div>
      <div className="people-toolbar">
        <div className="search-field">
          <Search size={16} />
          <input
            placeholder="Search partners..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
      <div className="people-grid">
        {users
          .filter((x) =>
            (x.name + x.email + x.role).toLowerCase().includes(q.toLowerCase()),
          )
          .map((u, i) => (
            <article className="person-card">
              <div className="person-top">
                <div className="person-avatar">{u.name[0]}</div>
                <span className="verified">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>
              <h3>{u.name}</h3>
              <span className="person-role">{labels[u.role] || u.role}</span>
              <div className="person-contact">
                <span>
                  <Mail size={13} />
                  {u.email}
                </span>
                <span>
                  <MapPin size={13} />
                  {u.location || "Uttarakhand"}
                </span>
              </div>
              <div className="person-foot">
                <span>Partner ID · AT-{String(2401 + i).padStart(4, "0")}</span>
                <b>Active</b>
              </div>
            </article>
          ))}
      </div>
      {open && (
        <Modal title="Add a marketplace partner" onClose={() => setOpen(false)}>
          <form
            className="form-grid"
            onSubmit={(e) => {
              e.preventDefault();
              setUsers([{ ...f, id: Date.now() }, ...users]);
              setOpen(false);
            }}
          >
            <label className="full-field">
              Full name / business name
              <input
                required
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
              />
            </label>
            <label className="full-field">
              Email address
              <input
                type="email"
                required
                value={f.email}
                onChange={(e) => setF({ ...f, email: e.target.value })}
              />
            </label>
            <label>
              Partner role
              <select
                value={f.role}
                onChange={(e) => setF({ ...f, role: e.target.value })}
              >
                {Object.entries(labels)
                  .filter(([k]) => k !== "admin")
                  .map(([k, v]) => (
                    <option value={k}>{v}</option>
                  ))}
              </select>
            </label>
            <label>
              Location
              <input
                required
                value={f.location}
                onChange={(e) => setF({ ...f, location: e.target.value })}
              />
            </label>
            <button className="primary-btn full-field">
              Create partner profile <Plus size={15} />
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
