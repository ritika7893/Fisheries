import React, { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Truck,
  MapPin,
  Clock,
  Snowflake,
  UserRound,
  CheckCircle2,
  PackageCheck,
  Phone,
  Navigation,
  ClipboardList,
} from "lucide-react";
import { getDeliveries, saveDeliveries } from "../utils/store";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import "./Operations.css";
import "./Deliveries.css";

const stages = [
  "Assigned",
  "Picked up",
  "In transit",
  "Out for delivery",
  "Delivered",
  "Received by farmer",
];
const supplierRoles = ["farmer", "hatchery", "dam", "contractor"];
export default function Deliveries() {
  const { user } = useOutletContext();
  const farmer = supplierRoles.includes(user.role);
  const deliveryRole = user.role === "delivery";
  const manager = ["admin", "inventory"].includes(user.role);
  const [items, setItems] = useState(getDeliveries());
  const visible = useMemo(
    () =>
      items.filter(
        (x) =>
          manager ||
          (farmer
            ? x.supplier === user.name
            : deliveryRole
              ? x.driver === user.name || x.driverEmail === user.email
              : false),
      ),
    [items, manager, farmer, deliveryRole, user.name, user.email],
  );
  const update = (next) => {
    setItems(next);
    saveDeliveries(next);
  };
  const changeStage = (item, nextStage) => {
    const event = {
      status: nextStage,
      at: new Date().toISOString(),
      by: user.name,
      note:
        nextStage === "Delivered"
          ? "Delivery partner marked parcel delivered."
          : nextStage === "Received by farmer"
            ? "Farmer confirmed receipt of the parcel."
            : `Shipment status updated to ${nextStage}.`,
    };
    update(
      items.map((x) =>
        x.id === item.id
          ? {
              ...x,
              status: nextStage,
              updatedAt: event.at,
              history: [...(x.history || []), event],
            }
          : x,
      ),
    );
  };
  return (
    <div className="ops-page delivery-page">
      <div className="page-heading">
        <div>
          <div className="welcome-kicker">LAST-MILE OPERATIONS</div>
          <h1>
            {farmer
              ? "Track my delivery"
              : deliveryRole
                ? "My assigned shipments"
                : "Delivery tracking & management"}
          </h1>
          <p>
            {farmer
              ? "Track your delivery partner, parcel journey and expected arrival date."
              : deliveryRole
                ? "Update shipment milestones as you move each parcel."
                : "Monitor assigned delivery partners and the complete shipment journey."}
          </p>
        </div>
      </div>
      <div className="ops-summary">
        <div>
          <Truck />
          <b>{visible.length}</b>
          <span>{farmer ? "Your shipments" : "Visible shipments"}</span>
        </div>
        <div>
          <Navigation />
          <b>
            {
              visible.filter((x) =>
                ["In transit", "Out for delivery", "Picked up"].includes(
                  x.status,
                ),
              ).length
            }
          </b>
          <span>On the way</span>
        </div>
        <div>
          <CheckCircle2 />
          <b>
            {
              visible.filter((x) =>
                ["Delivered", "Received by farmer"].includes(x.status),
              ).length
            }
          </b>
          <span>Delivered / received</span>
        </div>
      </div>
      <div className="delivery-list">
        {visible.map((x) => (
          <article className="delivery-card tracking-card" key={x.id}>
            <div className="delivery-id">
              <div>
                <span>SHIPMENT ID</span>
                <b>{x.id}</b>
              </div>
              <StatusBadge status={x.status} />
            </div>
            <h3>{x.fish}</h3>
            <div className="tracking-route">
              <div>
                <MapPin size={15} />
                <div>
                  <small>PICKUP FROM</small>
                  <b>{x.pickupLocation || x.supplier}</b>
                </div>
              </div>
              <div className="route-line">
                <i />
              </div>
              <div>
                <MapPin size={15} />
                <div>
                  <small>DELIVER TO</small>
                  <b>
                    {x.destination || x.supplierLocation || "Farmer location"}
                  </b>
                </div>
              </div>
            </div>
            <div className="tracking-info-grid">
              <div>
                <small>DELIVERY PARTNER</small>
                <b>
                  <UserRound size={14} />
                  {x.driver || "Not assigned"}
                </b>
              </div>
              <div>
                <small>CONTACT</small>
                <b>
                  <Phone size={14} />
                  {x.driverPhone || "Not provided"}
                </b>
              </div>
              <div>
                <small>ESTIMATED ARRIVAL</small>
                <b>
                  <Clock size={14} />
                  {x.eta
                    ? new Date(x.eta).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Not set"}
                </b>
              </div>
              <div>
                <small>TRANSPORT</small>
                <b>
                  <Snowflake size={14} />
                  {x.coldChain ? "Cold-chain enabled" : "Standard transport"}
                </b>
              </div>
            </div>
            <div className="tracking-progress">
              <div className="tracking-progress-head">
                <b>
                  <ClipboardList size={15} /> Shipment journey
                </b>
                <span>{x.status}</span>
              </div>
              <div className="tracking-timeline">
                {stages.map((stage, i) => {
                  const current = stages.indexOf(x.status);
                  const done = i <= current;
                  return (
                    <div
                      className={`tracking-stage ${done ? "done" : ""}`}
                      key={stage}
                    >
                      <i />
                      <span>{stage}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {x.history?.length > 0 && (
              <div className="tracking-history">
                <b>Tracking updates</b>
                {[...x.history].reverse().map((h, i) => (
                  <div className="tracking-event" key={`${h.at}-${i}`}>
                    <i />
                    <div>
                      <b>{h.status}</b>
                      <span>{h.note || ""}</span>
                      <small>
                        {h.at
                          ? new Date(h.at).toLocaleString("en-IN")
                          : "Time not recorded"}{" "}
                        · {h.by || "System"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="tracking-actions">
              {deliveryRole && (
                <label>
                  Update shipment status
                  <select
                    value={x.status}
                    onChange={(e) => changeStage(x, e.target.value)}
                  >
                    {stages
                      .filter((s) => s !== "Received by farmer")
                      .map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                  </select>
                </label>
              )}
              {farmer && x.status === "Delivered" && (
                <button
                  className="accept-btn"
                  onClick={() => changeStage(x, "Received by farmer")}
                >
                  <PackageCheck size={15} /> Confirm parcel received
                </button>
              )}
              {farmer &&
                x.status !== "Delivered" &&
                x.status !== "Received by farmer" && (
                  <span className="pending-note">
                    Your parcel is being handled by the assigned delivery
                    partner.
                  </span>
                )}
              {x.status === "Received by farmer" && (
                <span className="received-confirmed">
                  <CheckCircle2 size={15} /> Receipt confirmed by farmer
                </span>
              )}
              {manager && (
                <span className="manager-monitor-note">
                  Admin / Inventory monitoring enabled · Tracking history
                  retained
                </span>
              )}
            </div>
          </article>
        ))}
        {!visible.length && (
          <div className="empty-state">
            <div>🚚</div>
            <h3>No deliveries to show</h3>
            <p>
              {farmer
                ? "Once payment is complete and a delivery partner is assigned, your shipment tracking will appear here."
                : deliveryRole
                  ? "No shipments are assigned to your account yet."
                  : "Paid orders will appear here after a delivery partner is assigned from the Payments page."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
