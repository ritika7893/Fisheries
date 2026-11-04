import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Clock3,
  Send,
  Check,
  X,
  ArrowRightLeft,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";
import Modal from "../components/Modal/Modal";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import { getListings, saveListings } from "../utils/store";
import "./Listings.css";
export default function Listings() {
  const { user } = useOutletContext();
  const supplier = ["farmer", "hatchery", "dam", "contractor"].includes(
    user.role,
  );
  const manager = ["admin", "inventory"].includes(user.role);
  const [items, setItems] = useState(getListings());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    species: "Rohu",
    category: "Freshwater",
    qty: "250",
    ask: "180",
    location: user.location || "Haridwar, Uttarakhand",
    harvest: "2026-11-04",
    hours: "24",
    grade: "A",
  });
  const [offer, setOffer] = useState("");
  const update = (x) => {
    setItems(x);
    saveListings(x);
  };
  const own = items.filter((x) => !supplier || x.supplier === user.name);
  const filtered = own.filter(
    (x) =>
      (x.species + " " + x.supplier + " " + x.location)
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (filter === "All" ||
        (filter === "Fresh" && x.hours > 24) ||
        (filter === "Nearing expiry" && x.hours <= 24 && x.hours > 0) ||
        (filter === "Expired" && x.hours <= 0) ||
        x.status === filter),
  );
  const add = (e) => {
    e.preventDefault();
    const x = {
      ...form,
      id: Date.now(),
      supplier: user.name,
      role: user.roleLabel,
      qty: +form.qty,
      ask: +form.ask,
      offer: 0,
      hours: +form.hours,
      status: "Pending review",
      unit: "kg",
      image: "🐟",
    };
    update([x, ...items]);
    setModal("");
  };
  const negotiate = (x) => {
    setSelected(x);
    setOffer(String(x.offer || x.ask - 8));
    setModal("offer");
  };
  const submitOffer = (e) => {
    e.preventDefault();
    update(
      items.map((x) =>
        x.id === selected.id
          ? { ...x, offer: +offer, status: "Negotiation" }
          : x,
      ),
    );
    setModal("");
  };
  const confirm = (x) =>
    update(
      items.map((y) =>
        y.id === x.id
          ? {
              ...y,
              offer: +(y.offer || y.ask - 8),
              status: "Negotiation",
              history: [
                ...(y.history || []),
                {
                  amount: +(y.offer || y.ask - 8),
                  note: "Inventory Manager opened price negotiation.",
                  by: user.name,
                  at: new Date().toISOString(),
                },
              ],
            }
          : y,
      ),
    );
  const reject = (x) =>
    update(
      items.map((y) => (y.id === x.id ? { ...y, status: "Rejected" } : y)),
    );
  return (
    <div className="listings-page">
      <div className="page-heading">
        <div>
          <div className="welcome-kicker">SUPPLY NETWORK</div>
          <h1>
            {supplier ? "My fish listings" : "Fish listings & supply requests"}
          </h1>
          <p>
            {supplier
              ? "Manage your catch, availability and freshness details."
              : "Review supply requests, compare prices and manage freshness."}
          </p>
        </div>
        {supplier && (
          <button className="primary-btn" onClick={() => setModal("add")}>
            <Plus size={16} /> Add fish listing
          </button>
        )}
      </div>
      <div className="listing-summary">
        <div>
          <b>{own.length}</b>
          <span>Total listings</span>
        </div>
        <div>
          <b>{own.filter((x) => x.status === "Pending review").length}</b>
          <span>Awaiting review</span>
        </div>
        <div>
          <b>{own.filter((x) => x.status === "Negotiation").length}</b>
          <span>In negotiation</span>
        </div>
        <div>
          <b>{own.filter((x) => x.hours <= 24 && x.hours > 0).length}</b>
          <span>Freshness watch</span>
        </div>
      </div>
      <div className="listing-toolbar">
        <div className="search-field">
          <Search size={16} />
          <input
            placeholder="Search fish, supplier or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {[
            "All",
            "Pending review",
            "Negotiation",
            "Farmer accepted",
            "Payment pending",
            "Paid",
            "Fresh",
            "Nearing expiry",
            "Expired",
          ].map((x) => (
            <button
              key={x}
              className={filter === x ? "selected" : ""}
              onClick={() => setFilter(x)}
            >
              {x}
            </button>
          ))}
        </div>
      </div>
      <div className="listing-cards">
        {filtered.map((x) => (
          <article className="listing-card" key={x.id}>
            <div className="listing-card-top">
              <div className="listing-fish-icon">{x.image || "🐟"}</div>
              <div className="listing-fish-title">
                <h3>{x.species}</h3>
                <span>
                  {x.category} · Grade {x.grade || "A"}
                </span>
              </div>
              <StatusBadge status={x.status} />
            </div>
            <div className="listing-meta">
              <span>
                <MapPin size={13} />
                {x.location}
              </span>
              <span>
                <Clock3 size={13} />
                {x.hours <= 0 ? "Expired" : `${x.hours}h freshness left`}
              </span>
            </div>
            <div className="listing-numbers">
              <div>
                <small>AVAILABLE QUANTITY</small>
                <b>
                  {x.qty} <i>kg</i>
                </b>
              </div>
              <div>
                <small>EXPECTED PRICE</small>
                <b>
                  ₹{x.ask}
                  <i>/kg</i>
                </b>
              </div>
              <div>
                <small>COUNTER OFFER</small>
                <b>
                  {x.offer ? "₹" + x.offer : "—"}
                  {x.offer && <i>/kg</i>}
                </b>
              </div>
            </div>
            {x.status === "Payment pending" && (
              <div className="payment-pending-note">
                <span>✓ Price agreed</span>
                <b>₹{x.agreedPrice || x.offer || x.ask}/kg</b>
                <small>Awaiting settlement by inventory manager</small>
              </div>
            )}
            {x.status === "Farmer accepted" && (
              <div className="payment-pending-note">
                <span>✓ You accepted the manager offer</span>
                <b>₹{x.acceptedPrice || x.offer || x.ask}/kg</b>
                <small>Waiting for Inventory Manager final confirmation</small>
              </div>
            )}
            {x.status === "Paid" && (
              <div className="payment-paid-note">
                <span>✓ Payment received</span>
                <b>₹{x.agreedPrice || x.offer || x.ask}/kg</b>
                <small>
                  Payment complete · Delivery partner assignment follows
                </small>
              </div>
            )}
            {x.hours <= 12 && (
              <div className="freshness-alert">
                <AlertTriangle size={14} />{" "}
                {x.hours <= 0
                  ? "Freshness window expired"
                  : "Urgent: freshness window is closing"}
              </div>
            )}
            <div className="listing-card-bottom">
              <div>
                <small>SUPPLIER</small>
                <b>{x.supplier}</b>
                <small>{x.harvest}</small>
              </div>
              <div className="listing-actions">
                {manager && (
                  <>
                    {["Pending review", "Negotiation"].includes(x.status) && (
                      <button
                        className="outline-btn"
                        onClick={() => negotiate(x)}
                      >
                        <ArrowRightLeft size={14} /> Counter
                      </button>
                    )}
                    {["Pending review", "Freshness alert"].includes(
                      x.status,
                    ) && (
                      <button className="accept-btn" onClick={() => confirm(x)}>
                        <Check size={14} /> Start negotiation
                      </button>
                    )}
                    {x.status === "Farmer accepted" && (
                      <button
                        className="accept-btn"
                        onClick={() =>
                          window.location.assign("/app/negotiations")
                        }
                      >
                        <Check size={14} /> Final confirmation
                      </button>
                    )}
                    {["Payment pending", "Paid"].includes(x.status) && (
                      <button
                        className="outline-btn"
                        onClick={() => window.location.assign("/app/payments")}
                      >
                        <IndianRupee size={14} />{" "}
                        {x.status === "Paid" ? "View payment" : "Pay now"}
                      </button>
                    )}
                  </>
                )}
                {supplier && (
                  <button
                    className="outline-btn"
                    onClick={() => {
                      setSelected(x);
                      setModal("details");
                    }}
                  >
                    View details
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div>🐟</div>
            <h3>No listings found</h3>
            <p>Try changing your search or filters to find supply requests.</p>
          </div>
        )}
      </div>
      {modal === "add" && (
        <Modal title="Add a fish listing" onClose={() => setModal("")}>
          <form className="form-grid" onSubmit={add}>
            <label>
              Fish species
              <select
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
              >
                {[
                  "Rohu",
                  "Catla",
                  "Common Carp",
                  "Tilapia",
                  "Pangasius",
                  "Mrigal",
                  "Silver Carp",
                  "Other",
                ].map((x) => (
                  <option>{x}</option>
                ))}
              </select>
            </label>
            <label>
              Category
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Freshwater</option>
                <option>Farm raised</option>
                <option>River catch</option>
                <option>Dam catch</option>
              </select>
            </label>
            <label>
              Available quantity (kg)
              <input
                type="number"
                min="1"
                required
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
              />
            </label>
            <label>
              Expected price (₹/kg)
              <input
                type="number"
                min="1"
                required
                value={form.ask}
                onChange={(e) => setForm({ ...form, ask: e.target.value })}
              />
            </label>
            <label className="full-field">
              Harvest / availability date
              <input
                type="date"
                required
                value={form.harvest}
                onChange={(e) => setForm({ ...form, harvest: e.target.value })}
              />
            </label>
            <label className="full-field">
              Pickup location
              <input
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </label>
            <label>
              Freshness duration (hours)
              <input
                type="number"
                min="1"
                required
                value={form.hours}
                onChange={(e) => setForm({ ...form, hours: e.target.value })}
              />
            </label>
            <label>
              Product grade
              <select
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
              >
                <option>A+</option>
                <option>A</option>
                <option>B+</option>
                <option>B</option>
              </select>
            </label>
            <div className="form-note full-field">
              <Clock3 size={15} /> Freshness starts from the harvest /
              availability time. Managers will see alerts as the window closes.
            </div>
            <button className="primary-btn full-field" type="submit">
              Submit supply request <ArrowRightLeft size={15} />
            </button>
          </form>
        </Modal>
      )}
      {modal === "offer" && (
        <Modal
          title={`Counter offer · ${selected?.species}`}
          onClose={() => setModal("")}
        >
          <form className="form-grid" onSubmit={submitOffer}>
            <div className="offer-context full-field">
              <span>Supplier asking price</span>
              <b>₹{selected?.ask}/kg</b>
              <span>Current offer</span>
              <b>₹{selected?.offer || "Not set"}/kg</b>
            </div>
            <label className="full-field">
              Your counter price (₹/kg)
              <input
                type="number"
                min="1"
                required
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
              />
            </label>
            <button className="primary-btn full-field">
              Send counter offer <Send size={15} />
            </button>
          </form>
        </Modal>
      )}
      {modal === "details" && (
        <Modal
          title={`${selected?.species} listing details`}
          onClose={() => setModal("")}
        >
          <div className="details-list">
            {[
              ["Supplier", selected?.supplier],
              ["Quantity", selected?.qty + " kg"],
              ["Expected price", "₹" + selected?.ask + "/kg"],
              ["Offer", "₹" + (selected?.offer || "—")],
              ["Harvest date", selected?.harvest],
              ["Freshness", selected?.hours + " hours"],
              ["Location", selected?.location],
              ["Status", selected?.status],
            ].map(([a, b]) => (
              <div>
                <span>{a}</span>
                <b>{b}</b>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
