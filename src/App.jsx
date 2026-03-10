import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const PROJECT = {
  name: "Gervo Residences",
  description: "Proposed 2-Storey Residence with Pool",
  location: "Lot 20 Blk 8 #9 Alicante Street, Pueblo del Sol, Tagaytay City",
  owner: "Mr. and Mrs. Gervo",
  contractor: "LLUID Builders Inc.",
  contractAmount: 5830536,
  startDate: "2025-08-01",
  targetTurnover: "2026-08-25",
  currentDate: "2026-03-11",
};

const PHASES = [
  { id: "A", name: "Roofing & Weatherproofing", weight: 8, ganttStart: 0, ganttEnd: 6, color: "#E74C3C" },
  { id: "B", name: "GF Slab & Septic", weight: 6, ganttStart: 1, ganttEnd: 7, color: "#E67E22" },
  { id: "C", name: "CHB Walls & Plastering", weight: 12, ganttStart: 4, ganttEnd: 14, color: "#F39C12" },
  { id: "D", name: "MEP Rough-In", weight: 10, ganttStart: 4, ganttEnd: 12, color: "#27AE60" },
  { id: "E", name: "Ceiling Works", weight: 6, ganttStart: 9, ganttEnd: 12, color: "#16A085" },
  { id: "F", name: "Stair Works", weight: 4, ganttStart: 7, ganttEnd: 19, color: "#2980B9" },
  { id: "G", name: "Doors, Windows & Glass", weight: 10, ganttStart: 3, ganttEnd: 14, color: "#8E44AD" },
  { id: "H", name: "Tile Works & Flooring", weight: 10, ganttStart: 12, ganttEnd: 19, color: "#C0392B" },
  { id: "I", name: "Painting Works", weight: 8, ganttStart: 9, ganttEnd: 20, color: "#D35400" },
  { id: "J", name: "Perimeter Wall", weight: 6, ganttStart: 11, ganttEnd: 21, color: "#7F8C8D" },
  { id: "K", name: "Cabinetry & Built-ins", weight: 8, ganttStart: 5, ganttEnd: 17, color: "#795548" },
  { id: "L", name: "Final Fixtures", weight: 8, ganttStart: 16, ganttEnd: 21, color: "#1ABC9C" },
  { id: "M", name: "Turnover & Closeout", weight: 4, ganttStart: 19, ganttEnd: 23, color: "#2C3E50" },
];

const BOQ_SECTIONS = [
  { id: "1", name: "General Requirements", materials: 129934, labor: 70001, total: 199935 },
  { id: "2", name: "Site Works", materials: 75313, labor: 38735, total: 114048 },
  { id: "3", name: "Cast-in-Place Concrete", materials: 248654, labor: 56600, total: 305254 },
  { id: "4", name: "Steel Reinforcement", materials: 245570, labor: 49333, total: 294903 },
  { id: "5", name: "Formworks & Scaffolds", materials: 188932, labor: 34000, total: 222932 },
  { id: "6", name: "Masonry Works", materials: 543355, labor: 181000, total: 724355 },
  { id: "7", name: "Steel & Metal Works", materials: 178637, labor: 98000, total: 276637 },
  { id: "8", name: "Sashwork", materials: 28000, labor: 6400, total: 34400 },
  { id: "9", name: "Windows Schedule", materials: 78220, labor: 31760, total: 109980 },
  { id: "10", name: "Door Schedule", materials: 194540, labor: 59600, total: 254140 },
  { id: "11", name: "Exterior Finishes", materials: 0, labor: 0, total: 0 },
  { id: "12", name: "Finishes", materials: 612487, labor: 242300, total: 854787 },
  { id: "13", name: "Roofing Works", materials: 75778, labor: 69232, total: 145010 },
  { id: "14", name: "Plumbing Works", materials: 193303, labor: 83723, total: 277026 },
  { id: "15", name: "Electrical Works", materials: 226493, labor: 18900, total: 245393 },
];

const URGENT_PROCUREMENT = [
  { id: "p1", item: "D05: Large Tempered Glass Door", cost: 64032, needBy: "Apr 7", orderBy: "Mar 10", status: "pending", leadWeeks: 4 },
  { id: "p2", item: "D01: Main Tempered Glass Entry Door", cost: 34224, needBy: "Apr 7", orderBy: "Mar 10", status: "pending", leadWeeks: 4 },
  { id: "p3", item: "D07: Tempered Glass Door", cost: 55200, needBy: "Apr 7", orderBy: "Mar 10", status: "pending", leadWeeks: 4 },
  { id: "p4", item: "W-1: 3-Panel Fixed Glass Window (Large)", cost: 38880, needBy: "Apr 7", orderBy: "Mar 10", status: "pending", leadWeeks: 4 },
  { id: "p5", item: "W-6: 3-Panel Fixed Glass Window", cost: 19440, needBy: "Apr 7", orderBy: "Mar 10", status: "pending", leadWeeks: 4 },
  { id: "p6", item: "W-3: 1-Panel Awning Windows (2 sets)", cost: 29952, needBy: "Apr 7", orderBy: "Mar 10", status: "pending", leadWeeks: 4 },
  { id: "p7", item: "Panel Board & Accessories", cost: 80000, needBy: "Apr 21", orderBy: "Mar 24", status: "pending", leadWeeks: 3 },
  { id: "p8", item: "Service Entrance & Cable (coordinate MERALCO)", cost: 46840, needBy: "Apr 21", orderBy: "Mar 24", status: "pending", leadWeeks: 3 },
  { id: "p9", item: "Roofing Sheets Ga.24 (68.64 lm)", cost: 34320, needBy: "Apr 7", orderBy: "Mar 17", status: "pending", leadWeeks: 2 },
  { id: "p10", item: "Double Bubble Insulation Sheet", cost: 6178, needBy: "Apr 7", orderBy: "Mar 17", status: "pending", leadWeeks: 2 },
  { id: "p11", item: "Soil Poisoning Pre-construction (LS)", cost: 40000, needBy: "Mar 17", orderBy: "Mar 10", status: "pending", leadWeeks: 1 },
  { id: "p12", item: "Modular Cabinets – Source Supplier NOW", cost: 0, needBy: "May 12", orderBy: "Mar 10", status: "pending", leadWeeks: 8 },
];

const WEEKLY_CHECKLIST = [
  { id: "wc1", phase: "A", task: "Roof trusses fabrication at 2F — ongoing or complete?", type: "progress" },
  { id: "wc2", phase: "A", task: "Steel assembly of roof I-beams — status?", type: "progress" },
  { id: "wc3", phase: "A", task: "Roofing supplier confirmed and materials ordered?", type: "procurement" },
  { id: "wc4", phase: "B", task: "Septic tank CHB laying — ongoing?", type: "progress" },
  { id: "wc5", phase: "B", task: "GF slab rebar works started?", type: "progress" },
  { id: "wc6", phase: "B", task: "Plumbing rough-in GF started?", type: "progress" },
  { id: "wc7", phase: "C", task: "CHB laying 2nd floor — started?", type: "progress" },
  { id: "wc8", phase: "D", task: "Electrical conduit rough-in ongoing?", type: "progress" },
  { id: "wc9", phase: "G", task: "Doors and windows supplier confirmed?", type: "procurement" },
  { id: "wc10", phase: "A", task: "Any delays or blockers this week?", type: "blocker" },
  { id: "wc11", phase: "A", task: "Number of workers on site today?", type: "manpower" },
  { id: "wc12", phase: "A", task: "Any safety incidents or near misses?", type: "safety" },
  { id: "wc13", phase: "A", task: "Materials delivered this week?", type: "delivery" },
  { id: "wc14", phase: "A", task: "Photo documentation submitted?", type: "documentation" },
];

const PROGRESS_BILLINGS = [
  { id: "pb1", billing: "1st Progress Billing", date: "2025-09-15", amount: 583054, status: "paid", description: "Mobilization + Foundation Works" },
  { id: "pb2", billing: "2nd Progress Billing", date: "2025-11-17", amount: 583054, status: "paid", description: "Structural Works GF + Columns" },
  { id: "pb3", billing: "3rd Progress Billing", date: "2026-01-22", amount: 583054, status: "paid", description: "2F Slab + CHB Works" },
  { id: "pb4", billing: "4th Progress Billing", date: "2026-03-11", amount: 583054, status: "pending", description: "Roofing + GF Slab" },
  { id: "pb5", billing: "5th Progress Billing", date: "2026-05-01", amount: 583054, status: "upcoming", description: "Walls + MEP Rough-In" },
  { id: "pb6", billing: "6th Progress Billing", date: "2026-06-15", amount: 583054, status: "upcoming", description: "Tiling + Painting" },
  { id: "pb7", billing: "7th Progress Billing", date: "2026-07-15", amount: 583054, status: "upcoming", description: "Fixtures + Cabinetry" },
  { id: "pb8", billing: "8th Progress Billing (Final)", date: "2026-08-15", amount: 583054, status: "upcoming", description: "Punchlist + Turnover" },
  { id: "pb9", billing: "Retention Release", date: "2026-11-15", amount: 291527, status: "upcoming", description: "6-month post-turnover retention" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n) => "₱" + Math.round(n).toLocaleString("en-PH");
const pct = (a, b) => Math.round((a / b) * 100);

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function TopBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "⬛" },
    { id: "progress", label: "Progress", icon: "📊" },
    { id: "procurement", label: "Procurement", icon: "🛒" },
    { id: "billing", label: "Billing", icon: "💰" },
    { id: "checklist", label: "Site Report", icon: "📋" },
    { id: "boq", label: "BOQ", icon: "📄" },
  ];
  return (
    <div style={{ background: "#0f1923", borderBottom: "1px solid #1e2d3d", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32, height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#C9A84C,#E8C96B)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏗</div>
            <div>
              <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, lineHeight: 1 }}>GERVO</div>
              <div style={{ color: "#4a6275", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Construction</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                background: activeTab === t.id ? "#1e2d3d" : "transparent",
                border: activeTab === t.id ? "1px solid #2a4a6b" : "1px solid transparent",
                color: activeTab === t.id ? "#E8C96B" : "#6b8ba4",
                padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13,
                fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", transition: "all .15s"
              }}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27AE60", boxShadow: "0 0 6px #27AE60" }} />
            <span style={{ color: "#4a6275", fontSize: 12 }}>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, accent, icon }) {
  return (
    <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, padding: "20px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: accent }} />
      <div style={{ color: "#4a6275", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ color: "#f0f4f8", fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: "#4a6275", fontSize: 12, marginTop: 6 }}>{sub}</div>}
      <div style={{ position: "absolute", bottom: 16, right: 20, fontSize: 28, opacity: 0.15 }}>{icon}</div>
    </div>
  );
}

function Dashboard({ phaseProgress, setActiveTab }) {
  const totalBOQ = BOQ_SECTIONS.reduce((s, b) => s + b.total, 0);
  const paidBillings = PROGRESS_BILLINGS.filter(p => p.status === "paid").reduce((s, b) => s + b.amount, 0);
  const pendingBillings = PROGRESS_BILLINGS.filter(p => p.status === "pending").reduce((s, b) => s + b.amount, 0);
  const overallProgress = Math.round(PHASES.reduce((s, p) => s + (p.weight * (phaseProgress[p.id] || 0)) / 100, 0));
  const urgentOrders = URGENT_PROCUREMENT.filter(p => p.status === "pending" && p.orderBy === "Mar 10").length;
  const daysToTurnover = Math.round((new Date("2026-08-25") - new Date("2026-03-11")) / 86400000);

  return (
    <div style={{ padding: "32px 0" }}>
      {/* Alert Banner */}
      <div style={{ background: "linear-gradient(90deg,#7f1d1d,#991b1b)", border: "1px solid #dc2626", borderRadius: 10, padding: "14px 20px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 20 }}>🚨</span>
        <div>
          <div style={{ color: "#fca5a5", fontWeight: 700, fontSize: 14 }}>URGENT: {urgentOrders} procurement items must be ordered TODAY</div>
          <div style={{ color: "#f87171", fontSize: 12, marginTop: 2 }}>Glass doors and aluminum windows have 4-week lead times. Delay = delay to turnover.</div>
        </div>
        <button onClick={() => setActiveTab("procurement")} style={{ marginLeft: "auto", background: "#dc2626", border: "none", color: "#fff", padding: "6px 16px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
          View Orders →
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard label="Overall Progress" value={`${overallProgress}%`} sub="vs. 52% planned" accent="#C9A84C" icon="📊" />
        <StatCard label="Contract Value" value={fmt(totalBOQ)} sub="LLUID Builders BOQ" accent="#2980B9" icon="📄" />
        <StatCard label="Amount Paid" value={fmt(paidBillings)} sub={`${pct(paidBillings, PROJECT.contractAmount)}% of contract`} accent="#27AE60" icon="✅" />
        <StatCard label="Pending Billing" value={fmt(pendingBillings)} sub="4th progress billing due" accent="#E67E22" icon="⏳" />
        <StatCard label="Days to Turnover" value={daysToTurnover} sub="Target: Aug 25, 2026" accent="#8E44AD" icon="🏁" />
        <StatCard label="Urgent Orders" value={urgentOrders} sub="Must order this week" accent="#E74C3C" icon="🛒" />
      </div>

      {/* Phase Progress Overview */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, padding: 24 }}>
          <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Phase Progress</div>
          {PHASES.map(phase => {
            const prog = phaseProgress[phase.id] || 0;
            return (
              <div key={phase.id} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ color: "#9bb5c8", fontSize: 12 }}>{phase.id}. {phase.name}</span>
                  <span style={{ color: prog === 100 ? "#27AE60" : prog > 0 ? "#E8C96B" : "#4a6275", fontSize: 12, fontWeight: 700 }}>{prog}%</span>
                </div>
                <div style={{ background: "#1e2d3d", borderRadius: 4, height: 6 }}>
                  <div style={{ width: `${prog}%`, height: "100%", background: phase.color, borderRadius: 4, transition: "width .4s" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, padding: 24 }}>
          <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Key Milestones</div>
          {[
            { date: "Mar 10", label: "TODAY — Order glass doors & windows", done: false, urgent: true },
            { date: "Mar 28", label: "Roofing complete", done: false, urgent: false },
            { date: "Apr 18", label: "GF Slab poured", done: false, urgent: false },
            { date: "Apr 30", label: "House ENCLOSED (critical — before rains)", done: false, urgent: true },
            { date: "May 31", label: "Exterior painting done before rainy season", done: false, urgent: false },
            { date: "Jun 21", label: "Tiling & finishing works complete", done: false, urgent: false },
            { date: "Jul 15", label: "All fixtures installed", done: false, urgent: false },
            { date: "Aug 11", label: "Punchlist complete", done: false, urgent: false },
            { date: "Aug 25", label: "🏁 TARGET TURNOVER", done: false, urgent: true },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 56, color: m.urgent ? "#E8C96B" : "#4a6275", fontSize: 11, fontWeight: 700, flexShrink: 0, paddingTop: 2 }}>{m.date}</div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.done ? "#27AE60" : m.urgent ? "#E8C96B" : "#2a4a6b", marginTop: 4, flexShrink: 0, boxShadow: m.urgent ? "0 0 8px #E8C96B" : "none" }} />
              <div style={{ color: m.done ? "#4a6275" : m.urgent ? "#f0f4f8" : "#9bb5c8", fontSize: 13, textDecoration: m.done ? "line-through" : "none" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Breakdown */}
      <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, padding: 24 }}>
        <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Monthly Cash Flow Plan</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 }}>
          {[
            { month: "Mar", amount: 552000, pct: 9.5, active: true },
            { month: "Apr", amount: 1068000, pct: 18.3, active: false },
            { month: "May", amount: 744000, pct: 12.8, active: false },
            { month: "Jun", amount: 696000, pct: 11.9, active: false },
            { month: "Jul", amount: 864000, pct: 14.8, active: false },
            { month: "Aug", amount: 336000, pct: 5.8, active: false },
          ].map(m => (
            <div key={m.month} style={{ background: m.active ? "#1a2e45" : "#121c27", border: `1px solid ${m.active ? "#2980B9" : "#1e2d3d"}`, borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ color: m.active ? "#E8C96B" : "#4a6275", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{m.month} 2026</div>
              <div style={{ color: "#f0f4f8", fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700 }}>{fmt(m.amount)}</div>
              <div style={{ color: "#4a6275", fontSize: 11, marginTop: 4 }}>{m.pct}% of contract</div>
              <div style={{ background: "#1e2d3d", borderRadius: 4, height: 4, marginTop: 8 }}>
                <div style={{ width: `${m.pct * 4}%`, height: "100%", background: m.active ? "#2980B9" : "#2a4a6b", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "12px 16px", background: "#121c27", borderRadius: 8, display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#4a6275", fontSize: 12 }}>Total L&M Contract</span>
          <span style={{ color: "#E8C96B", fontWeight: 700, fontSize: 14 }}>{fmt(PROJECT.contractAmount)}</span>
        </div>
      </div>
    </div>
  );
}

function ProgressTracker({ phaseProgress, setPhaseProgress }) {
  return (
    <div style={{ padding: "32px 0" }}>
      <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Construction Progress</div>
      <div style={{ color: "#4a6275", fontSize: 13, marginBottom: 28 }}>Drag sliders to update progress per phase. Auto-saves to session.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 16 }}>
        {PHASES.map(phase => {
          const prog = phaseProgress[phase.id] || 0;
          const getStatus = (p) => p === 0 ? "Not Started" : p === 100 ? "Complete" : "In Progress";
          const getStatusColor = (p) => p === 0 ? "#4a6275" : p === 100 ? "#27AE60" : "#E8C96B";
          return (
            <div key={phase.id} style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ color: "#f0f4f8", fontWeight: 700, fontSize: 14 }}>Phase {phase.id}: {phase.name}</div>
                  <div style={{ color: "#4a6275", fontSize: 11, marginTop: 2 }}>Weight: {phase.weight}% of project</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: phase.color, fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700 }}>{prog}%</div>
                  <div style={{ color: getStatusColor(prog), fontSize: 10, fontWeight: 700 }}>{getStatus(prog)}</div>
                </div>
              </div>
              <div style={{ background: "#1e2d3d", borderRadius: 6, height: 8, marginBottom: 12, position: "relative" }}>
                <div style={{ width: `${prog}%`, height: "100%", background: `linear-gradient(90deg,${phase.color}88,${phase.color})`, borderRadius: 6, transition: "width .3s" }} />
              </div>
              <input type="range" min="0" max="100" step="5" value={prog}
                onChange={e => setPhaseProgress(prev => ({ ...prev, [phase.id]: +e.target.value }))}
                style={{ width: "100%", accentColor: phase.color, cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ color: "#2a4a6b", fontSize: 10 }}>0%</span>
                <span style={{ color: "#2a4a6b", fontSize: 10 }}>50%</span>
                <span style={{ color: "#2a4a6b", fontSize: 10 }}>100%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProcurementTracker() {
  const [items, setItems] = useState(URGENT_PROCUREMENT);
  const updateStatus = (id, status) => setItems(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  const pending = items.filter(p => p.status === "pending");
  const ordered = items.filter(p => p.status === "ordered");
  const delivered = items.filter(p => p.status === "delivered");

  const StatusBadge = ({ status }) => {
    const map = { pending: ["#7f1d1d", "#fca5a5", "⬜ Pending"], ordered: ["#1a3a5c", "#93c5fd", "📦 Ordered"], delivered: ["#14532d", "#86efac", "✅ Delivered"] };
    const [bg, col, label] = map[status] || map.pending;
    return <span style={{ background: bg, color: col, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{label}</span>;
  };

  return (
    <div style={{ padding: "32px 0" }}>
      <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Procurement Tracker</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        <div style={{ background: "#1a0a0a", border: "1px solid #7f1d1d", borderRadius: 10, padding: 20, textAlign: "center" }}>
          <div style={{ color: "#fca5a5", fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>{pending.length}</div>
          <div style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>Pending Orders</div>
          <div style={{ color: "#7f1d1d", fontSize: 11, marginTop: 2 }}>{fmt(pending.reduce((s, p) => s + p.cost, 0))} at risk</div>
        </div>
        <div style={{ background: "#0a1a2e", border: "1px solid #1e4a7a", borderRadius: 10, padding: 20, textAlign: "center" }}>
          <div style={{ color: "#93c5fd", fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>{ordered.length}</div>
          <div style={{ color: "#60a5fa", fontSize: 12, marginTop: 4 }}>Ordered</div>
          <div style={{ color: "#1e4a7a", fontSize: 11, marginTop: 2 }}>{fmt(ordered.reduce((s, p) => s + p.cost, 0))} committed</div>
        </div>
        <div style={{ background: "#0a1e12", border: "1px solid #14532d", borderRadius: 10, padding: 20, textAlign: "center" }}>
          <div style={{ color: "#86efac", fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display',serif" }}>{delivered.length}</div>
          <div style={{ color: "#4ade80", fontSize: 12, marginTop: 4 }}>Delivered</div>
          <div style={{ color: "#14532d", fontSize: 11, marginTop: 2 }}>{fmt(delivered.reduce((s, p) => s + p.cost, 0))} received</div>
        </div>
      </div>

      <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #1e2d3d", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 16 }}>
          {["Item", "Cost", "Need By", "Order By", "Status"].map(h => (
            <div key={h} style={{ color: "#4a6275", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        {items.map(item => (
          <div key={item.id} style={{ padding: "14px 24px", borderBottom: "1px solid #121c27", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 16, alignItems: "center", background: item.orderBy === "Mar 10" && item.status === "pending" ? "#1a0a0a" : "transparent" }}>
            <div>
              <div style={{ color: "#f0f4f8", fontSize: 13, fontWeight: 600 }}>{item.item}</div>
              {item.leadWeeks >= 4 && <div style={{ color: "#f87171", fontSize: 11, marginTop: 2 }}>⚠ {item.leadWeeks}-week lead time</div>}
            </div>
            <div style={{ color: item.cost > 0 ? "#E8C96B" : "#4a6275", fontSize: 13, fontWeight: 700 }}>{item.cost > 0 ? fmt(item.cost) : "TBD"}</div>
            <div style={{ color: "#9bb5c8", fontSize: 13 }}>{item.needBy}</div>
            <div style={{ color: item.orderBy === "Mar 10" ? "#fca5a5" : "#9bb5c8", fontSize: 13, fontWeight: item.orderBy === "Mar 10" ? 700 : 400 }}>{item.orderBy}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <StatusBadge status={item.status} />
              {item.status === "pending" && (
                <button onClick={() => updateStatus(item.id, "ordered")} style={{ background: "#1a3a5c", border: "none", color: "#93c5fd", padding: "3px 8px", borderRadius: 4, cursor: "pointer", fontSize: 10 }}>Mark Ordered</button>
              )}
              {item.status === "ordered" && (
                <button onClick={() => updateStatus(item.id, "delivered")} style={{ background: "#14532d", border: "none", color: "#86efac", padding: "3px 8px", borderRadius: 4, cursor: "pointer", fontSize: 10 }}>Mark Delivered</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingTracker() {
  const [billings, setBillings] = useState(PROGRESS_BILLINGS);
  const totalPaid = billings.filter(b => b.status === "paid").reduce((s, b) => s + b.amount, 0);
  const totalPending = billings.filter(b => b.status === "pending").reduce((s, b) => s + b.amount, 0);
  const totalContract = billings.reduce((s, b) => s + b.amount, 0);

  const StatusStyle = { paid: ["#14532d", "#86efac", "✅ Paid"], pending: ["#7c2d12", "#fdba74", "⏳ Pending Approval"], upcoming: ["#1e2d3d", "#4a6275", "🔜 Upcoming"] };

  return (
    <div style={{ padding: "32px 0" }}>
      <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Progress Billing Tracker</div>
      <div style={{ color: "#4a6275", fontSize: 13, marginBottom: 28 }}>Track all billings against contract amount of {fmt(PROJECT.contractAmount)}.</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Paid" value={fmt(totalPaid)} sub={`${pct(totalPaid, totalContract)}% of total billings`} accent="#27AE60" icon="✅" />
        <StatCard label="Pending Approval" value={fmt(totalPending)} sub="4th billing — submit now" accent="#E67E22" icon="⏳" />
        <StatCard label="Remaining to Bill" value={fmt(totalContract - totalPaid - totalPending)} sub="Future progress billings" accent="#2980B9" icon="📋" />
      </div>

      {/* Progress bar */}
      <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: "#9bb5c8", fontSize: 13 }}>Overall Billing Progress</span>
          <span style={{ color: "#E8C96B", fontSize: 13, fontWeight: 700 }}>{pct(totalPaid, totalContract)}% paid</span>
        </div>
        <div style={{ background: "#1e2d3d", borderRadius: 8, height: 16, overflow: "hidden", display: "flex" }}>
          <div style={{ width: `${pct(totalPaid, totalContract)}%`, background: "#27AE60", transition: "width .5s" }} />
          <div style={{ width: `${pct(totalPending, totalContract)}%`, background: "#E67E22", transition: "width .5s" }} />
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, background: "#27AE60", borderRadius: 2 }} /><span style={{ color: "#4a6275", fontSize: 11 }}>Paid</span></div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, background: "#E67E22", borderRadius: 2 }} /><span style={{ color: "#4a6275", fontSize: 11 }}>Pending</span></div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, background: "#1e2d3d", borderRadius: 2 }} /><span style={{ color: "#4a6275", fontSize: 11 }}>Upcoming</span></div>
        </div>
      </div>

      <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, overflow: "hidden" }}>
        {billings.map((b, i) => {
          const [bg, col, label] = StatusStyle[b.status];
          return (
            <div key={b.id} style={{ padding: "18px 24px", borderBottom: i < billings.length - 1 ? "1px solid #1e2d3d" : "none", display: "flex", alignItems: "center", gap: 20, background: b.status === "pending" ? "#1a1208" : "transparent" }}>
              <div style={{ width: 36, height: 36, background: bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                {b.status === "paid" ? "✅" : b.status === "pending" ? "⏳" : "🔜"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#f0f4f8", fontWeight: 700, fontSize: 14 }}>{b.billing}</div>
                <div style={{ color: "#4a6275", fontSize: 12, marginTop: 2 }}>{b.description}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 700 }}>{fmt(b.amount)}</div>
                <div style={{ color: "#4a6275", fontSize: 11, marginTop: 2 }}>{b.date}</div>
              </div>
              <div style={{ background: bg, padding: "4px 12px", borderRadius: 20, flexShrink: 0 }}>
                <span style={{ color: col, fontSize: 11, fontWeight: 700 }}>{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SiteReport() {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [reportDate] = useState(new Date().toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));

  const progressItems = WEEKLY_CHECKLIST.filter(i => i.type === "progress");
  const procItems = WEEKLY_CHECKLIST.filter(i => i.type === "procurement");
  const otherItems = WEEKLY_CHECKLIST.filter(i => !["progress", "procurement"].includes(i.type));

  const handleResponse = (id, val) => setResponses(prev => ({ ...prev, [id]: val }));

  if (submitted) {
    return (
      <div style={{ padding: "32px 0", textAlign: "center" }}>
        <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
        <div style={{ color: "#86efac", fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Report Submitted</div>
        <div style={{ color: "#4a6275", fontSize: 14, marginBottom: 32 }}>Weekly site report for {reportDate} has been recorded.</div>
        <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, padding: 24, maxWidth: 500, margin: "0 auto", textAlign: "left" }}>
          <div style={{ color: "#E8C96B", fontWeight: 700, marginBottom: 16 }}>Summary</div>
          {Object.entries(responses).map(([id, val]) => {
            const item = WEEKLY_CHECKLIST.find(i => i.id === id);
            return item ? (
              <div key={id} style={{ marginBottom: 10, borderBottom: "1px solid #1e2d3d", paddingBottom: 10 }}>
                <div style={{ color: "#9bb5c8", fontSize: 12 }}>{item.task}</div>
                <div style={{ color: "#f0f4f8", fontSize: 13, fontWeight: 600, marginTop: 4 }}>{val}</div>
              </div>
            ) : null;
          })}
        </div>
        <button onClick={() => { setSubmitted(false); setResponses({}); }} style={{ marginTop: 24, background: "#1e2d3d", border: "1px solid #2a4a6b", color: "#9bb5c8", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 14 }}>
          New Report
        </button>
      </div>
    );
  }

  const Section = ({ title, items, accent }) => (
    <div style={{ background: "#0f1923", border: `1px solid #1e2d3d`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
      <div style={{ color: accent, fontWeight: 700, fontSize: 15, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 4, height: 18, background: accent, borderRadius: 2 }} />
        {title}
      </div>
      {items.map(item => (
        <div key={item.id} style={{ marginBottom: 18 }}>
          <div style={{ color: "#9bb5c8", fontSize: 13, marginBottom: 8 }}>{item.task}</div>
          {item.type === "blocker" || item.type === "documentation" || item.type === "delivery" ? (
            <textarea value={responses[item.id] || ""} onChange={e => handleResponse(item.id, e.target.value)}
              placeholder="Describe in detail..."
              style={{ width: "100%", background: "#121c27", border: "1px solid #2a4a6b", borderRadius: 8, color: "#f0f4f8", padding: "10px 14px", fontSize: 13, resize: "vertical", minHeight: 80, boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }} />
          ) : item.type === "manpower" ? (
            <input type="number" value={responses[item.id] || ""} onChange={e => handleResponse(item.id, e.target.value)}
              placeholder="Enter number..."
              style={{ background: "#121c27", border: "1px solid #2a4a6b", borderRadius: 8, color: "#f0f4f8", padding: "10px 14px", fontSize: 13, width: 120 }} />
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Done ✅", "In Progress ⚡", "Not Started ❌", "Blocked 🚫"].map(opt => (
                <button key={opt} onClick={() => handleResponse(item.id, opt)}
                  style={{ background: responses[item.id] === opt ? accent : "#121c27", border: `1px solid ${responses[item.id] === opt ? accent : "#2a4a6b"}`, color: responses[item.id] === opt ? "#0f1923" : "#9bb5c8", padding: "6px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all .15s" }}>
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: "32px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700 }}>Weekly Site Report</div>
          <div style={{ color: "#4a6275", fontSize: 13, marginTop: 4 }}>For: Foreman Julius | {reportDate}</div>
        </div>
        <div style={{ background: "#1e2d3d", border: "1px solid #2a4a6b", borderRadius: 8, padding: "8px 16px", color: "#9bb5c8", fontSize: 12 }}>Week of Mar 10, 2026</div>
      </div>

      <Section title="Construction Progress" items={progressItems} accent="#27AE60" />
      <Section title="Procurement & Deliveries" items={procItems} accent="#E8C96B" />
      <Section title="Site Management" items={otherItems} accent="#2980B9" />

      <button onClick={() => setSubmitted(true)}
        style={{ width: "100%", background: "linear-gradient(135deg,#C9A84C,#E8C96B)", border: "none", color: "#0f1923", padding: "16px", borderRadius: 10, cursor: "pointer", fontSize: 16, fontWeight: 800, fontFamily: "'DM Sans',sans-serif", letterSpacing: 0.5 }}>
        Submit Weekly Report →
      </button>
    </div>
  );
}

function BOQViewer() {
  const [expanded, setExpanded] = useState(null);
  const totalMat = BOQ_SECTIONS.reduce((s, b) => s + b.materials, 0);
  const totalLab = BOQ_SECTIONS.reduce((s, b) => s + b.labor, 0);
  const totalAll = BOQ_SECTIONS.reduce((s, b) => s + b.total, 0);

  return (
    <div style={{ padding: "32px 0" }}>
      <div style={{ color: "#E8C96B", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Bill of Quantities</div>
      <div style={{ color: "#4a6275", fontSize: 13, marginBottom: 28 }}>Source: LLUID Builders Cost Estimate — 10 QTO (2). Total Contract: {fmt(PROJECT.contractAmount)} (incl. 30% profit + 10% contingency)</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Materials" value={fmt(totalMat)} sub={`${pct(totalMat, totalAll)}% of raw cost`} accent="#2980B9" icon="🧱" />
        <StatCard label="Total Labor" value={fmt(totalLab)} sub={`${pct(totalLab, totalAll)}% of raw cost`} accent="#27AE60" icon="👷" />
        <StatCard label="Total Raw Cost" value={fmt(totalAll)} sub="Before profit & contingency" accent="#C9A84C" icon="📊" />
      </div>

      <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 24px", borderBottom: "1px solid #1e2d3d", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 60px", gap: 16 }}>
          {["Section", "Materials", "Labor", "Total", ""].map(h => (
            <div key={h} style={{ color: "#4a6275", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
        {BOQ_SECTIONS.map((sec, i) => (
          <div key={sec.id}>
            <div onClick={() => setExpanded(expanded === sec.id ? null : sec.id)}
              style={{ padding: "14px 24px", borderBottom: "1px solid #121c27", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 60px", gap: 16, alignItems: "center", cursor: "pointer", background: expanded === sec.id ? "#121c27" : "transparent", transition: "background .15s" }}>
              <div style={{ color: "#f0f4f8", fontSize: 13, fontWeight: 600 }}>{sec.id}. {sec.name}</div>
              <div style={{ color: "#9bb5c8", fontSize: 13 }}>{sec.materials > 0 ? fmt(sec.materials) : "—"}</div>
              <div style={{ color: "#9bb5c8", fontSize: 13 }}>{sec.labor > 0 ? fmt(sec.labor) : "—"}</div>
              <div style={{ color: "#E8C96B", fontSize: 13, fontWeight: 700 }}>{sec.total > 0 ? fmt(sec.total) : "—"}</div>
              <div>
                <div style={{ background: "#1e2d3d", borderRadius: 4, height: 4, width: "100%" }}>
                  <div style={{ width: `${pct(sec.total, totalAll)}%`, height: "100%", background: "#2980B9", borderRadius: 4 }} />
                </div>
                <div style={{ color: "#4a6275", fontSize: 10, marginTop: 3 }}>{pct(sec.total, totalAll)}%</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ padding: "16px 24px", background: "#121c27", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 60px", gap: 16, borderTop: "2px solid #2a4a6b" }}>
          <div style={{ color: "#E8C96B", fontWeight: 700 }}>TOTAL</div>
          <div style={{ color: "#E8C96B", fontWeight: 700 }}>{fmt(totalMat)}</div>
          <div style={{ color: "#E8C96B", fontWeight: 700 }}>{fmt(totalLab)}</div>
          <div style={{ color: "#E8C96B", fontWeight: 700, fontSize: 15 }}>{fmt(totalAll)}</div>
          <div />
        </div>
        <div style={{ padding: "12px 24px", background: "#0a1020", borderTop: "1px solid #1e2d3d" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#4a6275", fontSize: 12 }}>
            <span>+ 30% Profit Markup: {fmt(totalAll * 0.3)}</span>
            <span>+ 10% Contingency: {fmt(totalAll * 0.1)}</span>
            <span style={{ color: "#E8C96B", fontWeight: 700, fontSize: 14 }}>Final Contract: {fmt(totalAll * 1.4)}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 12, padding: 20 }}>
        <div style={{ color: "#E8C96B", fontWeight: 700, marginBottom: 12 }}>Owner-Supplied / Excluded from Contract</div>
        {["Furniture", "Joinery / Carpentry", "Appliances & Furnishings", "Swimming Pool (including finishes)", "Supply & Installation of AC", "Architectural Lighting Fixtures"].map(item => (
          <div key={item} style={{ color: "#4a6275", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #121c27", display: "flex", gap: 8 }}>
            <span style={{ color: "#2a4a6b" }}>—</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [phaseProgress, setPhaseProgress] = useState({
    A: 75, B: 30, C: 10, D: 5, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0, K: 0, L: 0, M: 5
  });

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":    return <Dashboard phaseProgress={phaseProgress} setActiveTab={setActiveTab} />;
      case "progress":     return <ProgressTracker phaseProgress={phaseProgress} setPhaseProgress={setPhaseProgress} />;
      case "procurement":  return <ProcurementTracker />;
      case "billing":      return <BillingTracker />;
      case "checklist":    return <SiteReport />;
      case "boq":          return <BOQViewer />;
      default:             return <Dashboard phaseProgress={phaseProgress} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ background: "#080f18", minHeight: "100vh", fontFamily: "'DM Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Project Header Strip */}
      <div style={{ background: "#0a1218", borderBottom: "1px solid #1e2d3d", padding: "10px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ color: "#4a6275", fontSize: 12 }}>📍 {PROJECT.location}</span>
            <span style={{ color: "#4a6275", fontSize: 12 }}>👤 {PROJECT.owner}</span>
            <span style={{ color: "#4a6275", fontSize: 12 }}>🏢 {PROJECT.contractor}</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ color: "#4a6275", fontSize: 12 }}>Started: Aug 1, 2025</span>
            <span style={{ color: "#E8C96B", fontSize: 12, fontWeight: 700 }}>Target Turnover: Aug 25, 2026</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        {renderTab()}
      </div>
    </div>
  );
}
