import React from "react";
import {
  Download,
  TrendingUp,
  IndianRupee,
  Package,
  Truck,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import StatCard from "../components/StatCard/StatCard";
import "./Reports.css";
const data = [
  { month: "Jun", sales: 42, volume: 30 },
  { month: "Jul", sales: 55, volume: 39 },
  { month: "Aug", sales: 48, volume: 35 },
  { month: "Sep", sales: 68, volume: 52 },
  { month: "Oct", sales: 73, volume: 58 },
  { month: "Nov", sales: 82, volume: 64 },
];
const mix = [
  { name: "Freshwater", value: 62 },
  { name: "Farm raised", value: 25 },
  { name: "River & dam", value: 13 },
];
export default function Reports() {
  return (
    <div className="reports-page">
      <div className="page-heading">
        <div>
          <div className="welcome-kicker">BUSINESS INTELLIGENCE</div>
          <h1>Reports & insights</h1>
          <p>
            Performance, trade activity and supply chain visibility at a glance.
          </p>
        </div>
        <button className="primary-btn" onClick={() => window.print()}>
          <Download size={15} /> Export report
        </button>
      </div>
      <div className="stat-grid">
        <StatCard
          label="Gross trade value"
          value="₹18.6L"
          change="+18.4% vs last month"
          icon={IndianRupee}
        />
        <StatCard
          label="Fish traded"
          value="24.8 T"
          change="+12.2% vs last month"
          icon={Package}
          tone="blue"
        />
        <StatCard
          label="Completed deliveries"
          value="186"
          change="94% on-time"
          icon={Truck}
          tone="purple"
        />
        <StatCard
          label="Avg. price realization"
          value="₹184/kg"
          change="+6.8% vs last month"
          icon={TrendingUp}
          tone="orange"
        />
      </div>
      <div className="reports-grid">
        <section className="panel">
          <div className="panel-title">
            <div>
              <h3>Trade performance</h3>
              <p>Monthly gross trade value (₹ lakh)</p>
            </div>
            <span className="period-pill">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={data}
              margin={{ top: 25, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid stroke="#edf2f2" vertical={false} />
              <XAxis
                dataKey="month"
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
              <Bar
                dataKey="sales"
                fill="#159b8b"
                radius={[5, 5, 0, 0]}
                barSize={23}
              />
              <Bar
                dataKey="volume"
                fill="#9bcfc5"
                radius={[5, 5, 0, 0]}
                barSize={23}
              />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="panel">
          <div className="panel-title">
            <div>
              <h3>Supply mix</h3>
              <p>By source category</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={mix}
                dataKey="value"
                nameKey="name"
                innerRadius={57}
                outerRadius={83}
                paddingAngle={4}
              >
                {mix.map((x, i) => (
                  <Cell fill={["#159b8b", "#75b9ae", "#e9b66c"][i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
            </PieChart>
          </ResponsiveContainer>
        </section>
      </div>
      <div className="insight-banner">
        <BarChart3 />
        <div>
          <b>Operations insight</b>
          <p>
            Cold-chain enabled deliveries and early freshness alerts are key
            levers to reduce wastage and improve supplier realization.
          </p>
        </div>
      </div>
    </div>
  );
}
