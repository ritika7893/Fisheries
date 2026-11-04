import React, { useMemo, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  Handshake,
  Send,
  Check,
  History,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import Modal from "../components/Modal/Modal";
import { getListings, saveListings } from "../utils/store";
import "./Operations.css";

const supplierRoles = ["farmer", "hatchery", "dam", "contractor"];
const normalizeName = (value) =>
  String(value || "")
    .trim()
    .toLocaleLowerCase();
export default function Negotiations() {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const supplier = supplierRoles.includes(user.role);
  const inventory = user.role === "inventory";
  const [all, setAll] = useState(getListings());
  const [target, setTarget] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const items = useMemo(
    () =>
      all.filter((x) => {
        const isNegotiation = [
          "Negotiation",
          "Farmer accepted",
          "Payment pending",
          "Paid",
        ].includes(x.status);
        if (!isNegotiation) return false;
        if (!supplier) return true;
        const sameOwner =
          normalizeName(x.supplier) === normalizeName(user.name) ||
          (x.supplierEmail &&
            normalizeName(x.supplierEmail) === normalizeName(user.email));
        return sameOwner;
      }),
    [all, supplier, user.name, user.email],
  );
  const save = (next) => {
    setAll(next);
    saveListings(next);
  };
  const reply = (e) => {
    e.preventDefault();
    const next = all.map((x) =>
      x.id === target.id
        ? {
            ...x,
            offer: Number(amount),
            status: "Negotiation",
            history: [
              ...(x.history || []),
              {
                amount: Number(amount),
                note,
                by: user.name,
                at: new Date().toISOString(),
              },
            ],
          }
        : x,
    );
    save(next);
    setTarget(null);
    setNote("");
  };
  const acceptOffer = (x) =>
    save(
      all.map((y) =>
        y.id === x.id
          ? {
              ...y,
              status: "Farmer accepted",
              acceptedPrice: Number(y.offer || y.ask),
              farmerAcceptedAt: new Date().toISOString(),
              history: [
                ...(y.history || []),
                {
                  amount: Number(y.offer || y.ask),
                  note: "Farmer accepted the latest offer. Awaiting Inventory Manager final confirmation.",
                  by: user.name,
                  at: new Date().toISOString(),
                },
              ],
            }
          : y,
      ),
    );
  const finalConfirm = (x) =>
    save(
      all.map((y) =>
        y.id === x.id
          ? {
              ...y,
              status: "Payment pending",
              agreedPrice: Number(y.acceptedPrice || y.offer || y.ask),
              finalConfirmedBy: user.name,
              finalConfirmedAt: new Date().toISOString(),
              paymentStatus: "Pending",
              history: [
                ...(y.history || []),
                {
                  amount: Number(y.acceptedPrice || y.offer || y.ask),
                  note: "Final order confirmation by Inventory Manager.",
                  by: user.name,
                  at: new Date().toISOString(),
                },
              ],
            }
          : y,
      ),
    );
  return (
    <div className="ops-page">
      <div className="page-heading">
        <div>
          <div className="welcome-kicker">PRICE DISCOVERY</div>
          <h1>Negotiations</h1>
          <p>
            {supplier
              ? `Accept or counter the Inventory Manager’s offer. Showing negotiations for ${user.name}. Final order confirmation is always completed by the Inventory Manager.`
              : "Review farmer responses and give the final confirmation before payment."}
          </p>
        </div>
      </div>
      <div className="ops-summary">
        <div>
          <Handshake />
          <b>{items.filter((x) => x.status === "Negotiation").length}</b>
          <span>Active negotiations</span>
        </div>
        <div>
          <Check />
          <b>{items.filter((x) => x.status === "Farmer accepted").length}</b>
          <span>Awaiting final confirmation</span>
        </div>
        <div>
          <ShieldCheck />
          <b>
            {
              items.filter((x) =>
                ["Payment pending", "Paid"].includes(x.status),
              ).length
            }
          </b>
          <span>Manager confirmed</span>
        </div>
      </div>
      <div className="ops-list">
        {items.map((x) => (
          <article className="negotiation-card" key={x.id}>
            <div className="neg-top">
              <div className="neg-icon">
                <span>{x.image || "🐟"}</span>
              </div>
              <div className="neg-title">
                <h3>
                  {x.species} <small>· {x.qty} kg</small>
                </h3>
                <p>
                  {x.supplier} · {x.location}
                </p>
              </div>
              <StatusBadge status={x.status} />
            </div>
            <div className="price-comparison">
              <div>
                <small>FARMER ASKING</small>
                <b>
                  ₹{x.ask}
                  <i>/kg</i>
                </b>
              </div>
              <div className="price-arrow">↔</div>
              <div>
                <small>LATEST MANAGER OFFER</small>
                <b>
                  {x.offer ? "₹" + x.offer : "Awaiting"}
                  {x.offer && <i>/kg</i>}
                </b>
              </div>
              <div className="price-gap">
                <small>AGREED RATE</small>
                <b>
                  {x.acceptedPrice || x.agreedPrice
                    ? "₹" + (x.acceptedPrice || x.agreedPrice)
                    : "—"}
                </b>
              </div>
            </div>
            <div className="neg-history">
              <div>
                <MessageCircle size={14} /> Conversation history
              </div>
              <p>
                {x.history?.length
                  ? `${x.history.length} updates · Latest by ${x.history.at(-1).by}`
                  : "Initial request submitted · Waiting for manager offer"}
              </p>
            </div>
            <div className="neg-actions">
              {x.status === "Negotiation" && (
                <>
                  {inventory && (
                    <button
                      className="outline-btn"
                      onClick={() => {
                        setTarget(x);
                        setAmount(String(x.offer || x.ask - 5));
                      }}
                    >
                      <Send size={14} /> Send / revise offer
                    </button>
                  )}
                  {supplier && x.offer > 0 && (
                    <>
                      <button
                        className="accept-btn"
                        onClick={() => acceptOffer(x)}
                      >
                        <Check size={14} /> Accept manager offer
                      </button>
                      <button
                        className="outline-btn"
                        onClick={() => {
                          setTarget(x);
                          setAmount(String(x.offer || x.ask - 5));
                        }}
                      >
                        Counter offer
                      </button>
                    </>
                  )}
                </>
              )}
              {x.status === "Farmer accepted" && inventory && (
                <button className="accept-btn" onClick={() => finalConfirm(x)}>
                  <ShieldCheck size={14} /> Final confirm order
                </button>
              )}
              {x.status === "Farmer accepted" && supplier && (
                <span className="pending-note">
                  Your acceptance is submitted. Waiting for Inventory Manager
                  final confirmation.
                </span>
              )}
              {["Payment pending", "Paid"].includes(x.status) && (
                <button
                  className="outline-btn"
                  onClick={() => navigate("/app/payments")}
                >
                  View payment <ArrowRight size={14} />
                </button>
              )}
            </div>
          </article>
        ))}
        {!items.length && (
          <div className="empty-state">
            <div>🤝</div>
            <h3>No active negotiations</h3>
            <p>
              {supplier
                ? `There are no negotiation offers linked to ${user.name}. Make sure you are logged in with the same farmer/business name used when the listing was created, or ask the Inventory Manager to send an offer from Fish Listings.`
                : "When a farmer listing receives a manager offer, it will appear here. Open Fish Listings and start a negotiation on a Pending review listing."}
            </p>
            {supplier && (
              <button
                className="outline-btn"
                onClick={() => navigate("/app/listings")}
              >
                Open my fish listings <ArrowRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
      {target && (
        <Modal title="Send price offer" onClose={() => setTarget(null)}>
          <form className="form-grid" onSubmit={reply}>
            <label className="full-field">
              Your price (₹ per kg)
              <input
                required
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            <label className="full-field">
              Message / terms
              <textarea
                rows="3"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note about quality, quantity or pickup terms..."
              />
            </label>
            <button className="primary-btn full-field">
              Send offer <Send size={14} />
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
