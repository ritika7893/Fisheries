import React from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import {
  Fish,
  Package,
  Handshake,
  Truck,
  Users,
  Clock3,
  ArrowUpRight,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import StatCard from "../components/StatCard/StatCard";
import StatusBadge from "../components/StatusBadge/StatusBadge";
import { getListings, getDeliveries, getUsers } from "../utils/store";
import "./Overview.css";
const trend = [
  { day: "Mon", supply: 34, orders: 21 },
  { day: "Tue", supply: 48, orders: 30 },
  { day: "Wed", supply: 39, orders: 26 },
  { day: "Thu", supply: 62, orders: 43 },
  { day: "Fri", supply: 54, orders: 36 },
  { day: "Sat", supply: 75, orders: 52 },
  { day: "Sun", supply: 68, orders: 49 },
];
export default function Overview() {
  const { user } = useOutletContext();
  const nav = useNavigate();
  const listings = getListings(),
    deliveries = getDeliveries(),
    users = getUsers();
  const isSupplier = ["farmer", "hatchery", "dam", "contractor"].includes(
    user.role,
  );
  const own = listings.filter((x) => x.supplier === user.name);
  const exp = listings.filter(
    (x) => x.hours <= 12 && x.status !== "Expired",
  ).length;
  return (
    <div className="overview-page">
      <div className="page-heading">
        <div>
          <div className="welcome-kicker">WEDNESDAY, 04 NOVEMBER 2026</div>
          <h1>
            {isSupplier
              ? "Good afternoon, " + user.name.split(" ")[0]
              : "Good afternoon, " + user.name.split(" ")[0]}{" "}
            <span>✦</span>
          </h1>
          <p>
            {isSupplier
              ? "Here’s what’s happening with your supply today."
              : "Here’s your fisheries marketplace at a glance."}
          </p>
        </div>
        <button className="primary-btn" onClick={() => nav("/app/listings")}>
          <Plus size={16} />{" "}
          {isSupplier ? "Add fish listing" : "Manage listings"}
        </button>
      </div>
      <div className="stat-grid">
        {(isSupplier
          ? [
              [
                "My active listings",
                own.length || 2,
                Fish,
                "teal",
                "+1 this month",
              ],
              [
                "In negotiation",
                listings.filter(
                  (x) => x.supplier === user.name && x.status === "Negotiation",
                ).length || 1,
                Handshake,
                "orange",
                "Awaiting response",
              ],
              [
                "Confirmed deals",
                listings.filter(
                  (x) => x.supplier === user.name && x.status === "Confirmed",
                ).length || 1,
                CheckCircle2,
                "blue",
                "Ready for pickup",
              ],
              ["Freshness window", "24h", Clock3, "purple", "Keep catch fresh"],
            ]
          : [
              [
                "Total fish listings",
                listings.length,
                Fish,
                "teal",
                "+12.8% this week",
              ],
              [
                "Open negotiations",
                listings.filter((x) => x.status === "Negotiation").length + 2,
                Handshake,
                "orange",
                "3 need your review",
              ],
              [
                "Confirmed deals",
                listings.filter((x) => x.status === "Confirmed").length + 8,
                Package,
                "blue",
                "Ready for dispatch",
              ],
              [
                "Active deliveries",
                deliveries.length,
                Truck,
                "purple",
                "2 on the move",
              ],
            ]
        ).map(([l, v, I, t, c]) => (
          <StatCard key={l} label={l} value={v} icon={I} tone={t} change={c} />
        ))}
      </div>
      {!isSupplier && (
        <div className="alert-strip">
          <div>
            <AlertTriangle size={18} />
            <span>
              <b>{exp + 1} listings need freshness attention</b>
              <small>
                Review short freshness windows to prevent avoidable wastage.
              </small>
            </span>
          </div>
          <button onClick={() => nav("/app/listings")}>
            Review alerts <ArrowUpRight size={14} />
          </button>
        </div>
      )}
      <div className="overview-grid">
        <section className="panel chart-panel">
          <div className="panel-title">
            <div>
              <h3>Supply & order activity</h3>
              <p>Marketplace movement over the last 7 days</p>
            </div>
            <span className="period-pill">This week⌄</span>
          </div>
          <div className="chart-legend">
            <span>
              <i /> Supply volume
            </span>
            <span>
              <i /> Orders
            </span>
          </div>
          <ResponsiveContainer width="100%" height={225}>
            <AreaChart
              data={trend}
              margin={{ top: 10, right: 8, left: -22, bottom: 0 }}
            >
              <defs>
                <linearGradient id="supplyFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#12a18e" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#12a18e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#edf2f2" vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#8ba0a4" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#8ba0a4" }}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="supply"
                stroke="#13a28f"
                fill="url(#supplyFill)"
                strokeWidth={2.5}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#78a8d6"
                fill="none"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </section>
        <section className="panel freshness-panel">
          <div className="panel-title">
            <div>
              <h3>Freshness watch</h3>
              <p>Listings by remaining freshness</p>
            </div>
            <Clock3 size={17} color="#8ba0a4" />
          </div>
          <div className="freshness-meter">
            <div className="meter-ring">
              <b>86%</b>
              <small>Fresh stock</small>
            </div>
          </div>
          <div className="freshness-rows">
            <div>
              <i className="fresh-dot green-dot" />
              Fresh <b>{listings.filter((x) => x.hours > 24).length + 8}</b>
            </div>
            <div>
              <i className="fresh-dot amber-dot" />
              Nearing expiry{" "}
              <b>
                {listings.filter((x) => x.hours <= 24 && x.hours > 0).length +
                  2}
              </b>
            </div>
            <div>
              <i className="fresh-dot red-dot" />
              Expired <b>0</b>
            </div>
          </div>
        </section>
      </div>
      <section className="panel recent-panel">
        <div className="panel-title">
          <div>
            <h3>
              {isSupplier ? "Your recent listings" : "Recent fish listings"}
            </h3>
            <p>Latest supply requests across the network</p>
          </div>
          <button className="text-btn" onClick={() => nav("/app/listings")}>
            View all <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>FISH / SUPPLIER</th>
                <th>QUANTITY</th>
                <th>ASKING PRICE</th>
                <th>FRESHNESS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {(isSupplier
                ? listings.filter((x) => x.supplier === user.name)
                : listings
              )
                .slice(0, 5)
                .map((x) => (
                  <tr key={x.id}>
                    <td>
                      <div className="fish-cell">
                        <span>{x.image}</span>
                        <div>
                          <b>{x.species}</b>
                          <small>
                            {x.supplier} · {x.location}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>{x.qty} kg</td>
                    <td>
                      <b>₹{x.ask}</b>
                      <small className="sub-text">per kg</small>
                    </td>
                    <td>
                      <span
                        className={
                          x.hours <= 12
                            ? "fresh-risk"
                            : x.hours <= 24
                              ? "fresh-warn"
                              : "fresh-good"
                        }
                      >
                        {x.hours}h left
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={x.status} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
