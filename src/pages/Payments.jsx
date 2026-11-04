import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  IndianRupee,
  ShieldCheck,
  WalletCards,
  CheckCircle2,
  Clock3,
  Receipt,
  LockKeyhole,
  Truck,
  Phone,
  CalendarClock,
} from "lucide-react";
import Modal from "../components/Modal/Modal";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import {
  getListings,
  saveListings,
  getPayments,
  savePayments,
  getDeliveries,
  saveDeliveries,
} from "../utils/store";
import "./Payments.css";

const supplierRoles = ["farmer", "hatchery", "dam", "contractor"];
export default function Payments() {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [listings, setListings] = useState(getListings());
  const [payments, setPayments] = useState(getPayments());
  const [deliveries, setDeliveries] = useState(getDeliveries());
  const [selected, setSelected] = useState(null);
  const [method, setMethod] = useState("UPI");
  const [reference, setReference] = useState("");
  const [payer, setPayer] = useState(user.name || "AquaTrade Buyer");
  const [receipt, setReceipt] = useState(null);
  const [assign, setAssign] = useState(null);
  const [deliveryForm, setDeliveryForm] = useState({
    driver: "Vikram Rawat",
    driverPhone: "9876543210",
    driverEmail: "delivery@demo.com",
    destination: "",
    eta: "2026-11-06T17:00",
    pickup: "2026-11-05T10:00",
    coldChain: true,
  });
  const inventory = user.role === "inventory";
  const managerView = ["admin", "inventory"].includes(user.role);
  const visible = listings.filter((x) =>
    managerView
      ? ["Payment pending", "Paid"].includes(x.status)
      : supplierRoles.includes(user.role)
        ? x.supplier === user.name &&
          ["Payment pending", "Paid"].includes(x.status)
        : false,
  );
  const pending = visible.filter((x) => x.status === "Payment pending");
  const paid = visible.filter((x) => x.status === "Paid");
  const pendingTotal = pending.reduce(
    (a, x) => a + +(x.agreedPrice || x.offer || x.ask) * x.qty,
    0,
  );
  const paidTotal = paid.reduce(
    (a, x) => a + +(x.agreedPrice || x.offer || x.ask) * x.qty,
    0,
  );
  const updateListings = (next) => {
    setListings(next);
    saveListings(next);
  };
  const payNow = (e) => {
    e.preventDefault();
    if (!selected) return;
    const rate = +(selected.agreedPrice || selected.offer || selected.ask);
    const rec = {
      id: "TXN-" + Date.now().toString().slice(-8),
      listingId: selected.id,
      species: selected.species,
      supplier: selected.supplier,
      quantity: selected.qty,
      pricePerKg: rate,
      amount: rate * selected.qty,
      method,
      reference: reference.trim() || "DEMO-" + Date.now().toString().slice(-6),
      payer,
      paidAt: new Date().toISOString(),
      status: "Paid",
    };
    updateListings(
      listings.map((x) =>
        x.id === selected.id
          ? {
              ...x,
              status: "Paid",
              paymentStatus: "Paid",
              paymentId: rec.id,
              paidAt: rec.paidAt,
              paymentMethod: method,
            }
          : x,
      ),
    );
    const next = [rec, ...payments];
    setPayments(next);
    savePayments(next);
    setSelected(null);
    setReference("");
    setReceipt(rec);
  };
  const openAssign = (x) => {
    setAssign(x);
    setDeliveryForm({
      driver: "Vikram Rawat",
      driverPhone: "9876543210",
      driverEmail: "delivery@demo.com",
      destination: x.supplierLocation || x.location || "",
      eta: "2026-11-06T17:00",
      pickup: "2026-11-05T10:00",
      coldChain: true,
    });
  };
  const assignPartner = (e) => {
    e.preventDefault();
    if (!assign) return;
    const id = "DL-" + Date.now().toString().slice(-7);
    const event = {
      status: "Assigned",
      at: new Date().toISOString(),
      by: user.name,
      note: `Delivery partner ${deliveryForm.driver} assigned by Inventory Manager.`,
    };
    const shipment = {
      id,
      listingId: assign.id,
      fish: `${assign.species} · ${assign.qty} kg`,
      supplier: assign.supplier,
      supplierLocation: assign.location,
      pickupLocation: assign.location,
      destination: deliveryForm.destination,
      driver: deliveryForm.driver,
      driverPhone: deliveryForm.driverPhone,
      driverEmail: deliveryForm.driverEmail,
      eta: deliveryForm.eta,
      pickup: deliveryForm.pickup,
      status: "Assigned",
      coldChain: deliveryForm.coldChain,
      history: [event],
      createdAt: event.at,
    };
    const nextDeliveries = [shipment, ...deliveries];
    setDeliveries(nextDeliveries);
    saveDeliveries(nextDeliveries);
    const nextListings = listings.map((x) =>
      x.id === assign.id
        ? { ...x, deliveryId: id, deliveryAssignedAt: event.at }
        : x,
    );
    updateListings(nextListings);
    setAssign(null);
    navigate("/app/deliveries");
  };
  return (
    <div className="payments-page">
      <div className="page-heading">
        <div>
          <div className="welcome-kicker">SECURE DEAL SETTLEMENT</div>
          <h1>Payments & settlements</h1>
          <p>
            {inventory
              ? "Pay only after the Inventory Manager has finally confirmed the farmer-accepted deal. Assign a delivery partner immediately after payment."
              : user.role === "admin"
                ? "Monitor payment settlements and delivery handover. Only Inventory Manager can execute payment and partner assignment."
                : "Track payment and delivery handover for your confirmed fish supply deals."}
          </p>
        </div>
      </div>
      <div className="payment-stats">
        <article>
          <span className="payment-stat-icon amber">
            <Clock3 />
          </span>
          <div>
            <small>PAYMENT PENDING</small>
            <b>₹{pendingTotal.toLocaleString("en-IN")}</b>
            <em>{pending.length} deal(s) awaiting payment</em>
          </div>
        </article>
        <article>
          <span className="payment-stat-icon green">
            <CheckCircle2 />
          </span>
          <div>
            <small>PAID / SETTLED</small>
            <b>₹{paidTotal.toLocaleString("en-IN")}</b>
            <em>{paid.length} paid deal(s)</em>
          </div>
        </article>
        <article>
          <span className="payment-stat-icon blue">
            <Receipt />
          </span>
          <div>
            <small>TRANSACTIONS</small>
            <b>{payments.length}</b>
            <em>Demo payment records</em>
          </div>
        </article>
      </div>
      <section className="payment-flow">
        <div className="payment-flow-title">
          <ShieldCheck />
          <div>
            <b>Order settlement workflow</b>
            <span>
              Farmer accepts → Manager final confirms → Payment → Assign
              delivery → Tracking
            </span>
          </div>
        </div>
        <div className="payment-flow-steps">
          <span className="done">1. Final confirmation</span>
          <i />
          <span className={pending.length ? "active" : "done"}>2. Payment</span>
          <i />
          <span className={paid.length ? "active" : "muted"}>
            3. Delivery assignment
          </span>
        </div>
      </section>
      <div className="payment-section-head">
        <div>
          <h2>
            {managerView
              ? "Payment and settlement monitor"
              : "Your confirmed deals"}
          </h2>
          <p>
            {inventory
              ? "Pay the locked price. Delivery assignment becomes available immediately after payment."
              : user.role === "admin"
                ? "Read-only monitoring of payment status and assigned delivery."
                : "Payment status and agreed amount for your supply."}
          </p>
        </div>
        <span>{pending.length} pending</span>
      </div>
      <div className="pay-deal-list">
        {visible.map((x) => {
          const rate = +(x.agreedPrice || x.offer || x.ask),
            amount = rate * Number(x.qty);
          const hasDelivery = deliveries.some((d) => d.listingId === x.id);
          return (
            <article className="pay-deal-card" key={x.id}>
              <div className="pay-deal-top">
                <div className="pay-fish-icon">🐟</div>
                <div className="pay-deal-title">
                  <h3>
                    {x.species} <small>· {x.qty} kg</small>
                  </h3>
                  <p>
                    {x.supplier} · {x.location}
                  </p>
                </div>
                <StatusBadge status={x.status} />
              </div>
              <div className="pay-breakdown">
                <div>
                  <small>AGREED PRICE</small>
                  <b>
                    ₹{rate.toLocaleString("en-IN")}
                    <i>/kg</i>
                  </b>
                </div>
                <div>
                  <small>QUANTITY</small>
                  <b>
                    {Number(x.qty).toLocaleString("en-IN")} <i>kg</i>
                  </b>
                </div>
                <div className="pay-total">
                  <small>
                    {x.status === "Paid" ? "PAID AMOUNT" : "TOTAL TO PAY"}
                  </small>
                  <b>₹{amount.toLocaleString("en-IN")}</b>
                </div>
              </div>
              <div className="pay-deal-footer">
                <span>
                  <LockKeyhole size={13} />{" "}
                  {x.status === "Paid"
                    ? `Paid via ${x.paymentMethod || "Digital payment"}`
                    : "Price locked after Inventory Manager final confirmation"}
                </span>
                {x.status === "Payment pending" && inventory && (
                  <button
                    className="primary-btn"
                    onClick={() => setSelected(x)}
                  >
                    <IndianRupee size={15} /> Pay ₹
                    {amount.toLocaleString("en-IN")}
                  </button>
                )}
                {x.status === "Paid" && inventory && !hasDelivery && (
                  <button className="primary-btn" onClick={() => openAssign(x)}>
                    <Truck size={15} /> Assign delivery partner
                  </button>
                )}
                {x.status === "Paid" && hasDelivery && (
                  <button
                    className="outline-btn"
                    onClick={() => navigate("/app/deliveries")}
                  >
                    View tracking <Truck size={14} />
                  </button>
                )}
                {x.status === "Paid" && !inventory && (
                  <button
                    className="outline-btn"
                    onClick={() => navigate("/app/deliveries")}
                  >
                    Track delivery <Truck size={14} />
                  </button>
                )}
              </div>
            </article>
          );
        })}
        {!visible.length && (
          <div className="payment-empty">
            <WalletCards />
            <h3>No payment items yet</h3>
            <p>
              After the farmer accepts the price and the Inventory Manager gives
              final confirmation, the deal appears here.
            </p>
          </div>
        )}
      </div>
      <div className="payment-section-head history-head">
        <div>
          <h2>Transaction history</h2>
          <p>Completed demo settlements and payment references.</p>
        </div>
      </div>
      <div className="transaction-table-wrap">
        <table>
          <thead>
            <tr>
              <th>TRANSACTION</th>
              <th>FISH / SUPPLIER</th>
              <th>PAYMENT METHOD</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>
                  <b>{p.id}</b>
                  <small>
                    {new Date(p.paidAt).toLocaleDateString("en-IN")}
                  </small>
                </td>
                <td>
                  <b>{p.species}</b>
                  <small>
                    {p.supplier} · {p.quantity} kg
                  </small>
                </td>
                <td>{p.method}</td>
                <td>
                  <b>₹{Number(p.amount).toLocaleString("en-IN")}</b>
                </td>
                <td>
                  <span className="settled-label">
                    <CheckCircle2 size={14} /> Paid
                  </span>
                </td>
                <td>
                  <button className="receipt-btn" onClick={() => setReceipt(p)}>
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!payments.length && (
          <div className="transaction-empty">
            No completed transactions yet.
          </div>
        )}
      </div>
      {selected && (
        <Modal
          title="Complete supplier payment"
          onClose={() => setSelected(null)}
        >
          <div className="checkout-summary">
            <div>
              <span>
                {selected.species} · {selected.qty} kg
              </span>
              <b>
                ₹
                {(
                  +(selected.agreedPrice || selected.offer || selected.ask) *
                  selected.qty
                ).toLocaleString("en-IN")}
              </b>
            </div>
            <p>
              Agreed rate: ₹
              {selected.agreedPrice || selected.offer || selected.ask}/kg ·
              Supplier: {selected.supplier}
            </p>
          </div>
          <form className="form-grid payment-form" onSubmit={payNow}>
            <label className="full-field">
              Payer / organisation
              <input
                required
                value={payer}
                onChange={(e) => setPayer(e.target.value)}
              />
            </label>
            <label className="full-field">
              Payment method
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option>UPI</option>
                <option>Bank transfer</option>
                <option>Debit / Credit card</option>
                <option>Net banking</option>
              </select>
            </label>
            <label className="full-field">
              Demo transaction reference (optional)
              <input
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Enter UTR / payment reference"
              />
            </label>
            <div className="demo-payment-warning full-field">
              <ShieldCheck size={16} /> Demonstration mode: no real money is
              transferred. Submitting records a simulated successful payment in
              this browser.
            </div>
            <button className="primary-btn full-field">
              <LockKeyhole size={15} /> Confirm demo payment · ₹
              {(
                +(selected.agreedPrice || selected.offer || selected.ask) *
                selected.qty
              ).toLocaleString("en-IN")}
            </button>
          </form>
        </Modal>
      )}
      {assign && (
        <Modal title="Assign delivery partner" onClose={() => setAssign(null)}>
          <div className="checkout-summary">
            <div>
              <span>
                {assign.species} · {assign.qty} kg
              </span>
              <b>Paid</b>
            </div>
            <p>
              Payment is complete. Assign a delivery partner so the farmer can
              start tracking the parcel.
            </p>
          </div>
          <form className="form-grid" onSubmit={assignPartner}>
            <label className="full-field">
              Delivery partner name
              <input
                required
                value={deliveryForm.driver}
                onChange={(e) =>
                  setDeliveryForm({ ...deliveryForm, driver: e.target.value })
                }
              />
            </label>
            <label>
              Partner phone
              <input
                required
                type="tel"
                value={deliveryForm.driverPhone}
                onChange={(e) =>
                  setDeliveryForm({
                    ...deliveryForm,
                    driverPhone: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Partner login email
              <input
                type="email"
                value={deliveryForm.driverEmail}
                onChange={(e) =>
                  setDeliveryForm({
                    ...deliveryForm,
                    driverEmail: e.target.value,
                  })
                }
              />
            </label>
            <label className="full-field">
              Farmer delivery address
              <input
                required
                value={deliveryForm.destination}
                onChange={(e) =>
                  setDeliveryForm({
                    ...deliveryForm,
                    destination: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Pickup date & time
              <input
                type="datetime-local"
                required
                value={deliveryForm.pickup}
                onChange={(e) =>
                  setDeliveryForm({ ...deliveryForm, pickup: e.target.value })
                }
              />
            </label>
            <label>
              Estimated arrival
              <input
                type="datetime-local"
                required
                value={deliveryForm.eta}
                onChange={(e) =>
                  setDeliveryForm({ ...deliveryForm, eta: e.target.value })
                }
              />
            </label>
            <label className="check-label full-field">
              <input
                type="checkbox"
                checked={deliveryForm.coldChain}
                onChange={(e) =>
                  setDeliveryForm({
                    ...deliveryForm,
                    coldChain: e.target.checked,
                  })
                }
              />{" "}
              Cold-chain transport required
            </label>
            <div className="demo-payment-warning full-field">
              <CalendarClock size={16} /> The farmer will see this delivery
              partner, phone number and estimated arrival time in the Deliveries
              page.
            </div>
            <button className="primary-btn full-field">
              <Truck size={15} /> Confirm assignment
            </button>
          </form>
        </Modal>
      )}
      {receipt && (
        <Modal title="Payment receipt" onClose={() => setReceipt(null)}>
          <div className="receipt-panel">
            <div className="receipt-success">
              <CheckCircle2 />
              <b>Payment recorded successfully</b>
              <span>Demo transaction receipt</span>
            </div>
            <div className="receipt-amount">
              ₹{Number(receipt.amount).toLocaleString("en-IN")}
            </div>
            {[
              ["Transaction ID", receipt.id],
              ["Fish / species", receipt.species],
              ["Supplier", receipt.supplier],
              ["Quantity", receipt.quantity + " kg"],
              ["Agreed rate", "₹" + receipt.pricePerKg + "/kg"],
              ["Payment method", receipt.method],
              ["Reference", receipt.reference],
              ["Paid by", receipt.payer],
              ["Date", new Date(receipt.paidAt).toLocaleString("en-IN")],
            ].map(([a, b]) => (
              <div className="receipt-row" key={a}>
                <span>{a}</span>
                <b>{b}</b>
              </div>
            ))}
            <button
              className="primary-btn full-field"
              onClick={() => setReceipt(null)}
            >
              Done
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
