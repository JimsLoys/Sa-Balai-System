import { useState } from "react";
import { LayoutDashboard, BedDouble, UtensilsCrossed, Waves, Package, Plus, X, Check, AlertTriangle, Calendar, LogIn, LogOut, Edit, Trash2, ChevronRight } from "lucide-react";

const today = new Date().toISOString().split("T")[0];

const ROLES = ["Manager", "Front Desk", "Restaurant Staff", "Housekeeping"];

const MENU = [
  { id: 1, name: "Club Sandwich", price: 320, cat: "Food" },
  { id: 2, name: "Grilled Fish Fillet", price: 480, cat: "Food" },
  { id: 3, name: "Sinigang na Hipon", price: 550, cat: "Food" },
  { id: 4, name: "Crispy Pata", price: 750, cat: "Food" },
  { id: 5, name: "Iced Tea", price: 85, cat: "Drinks" },
  { id: 6, name: "Buko Pandan", price: 120, cat: "Drinks" },
  { id: 7, name: "San Miguel Beer", price: 95, cat: "Drinks" },
  { id: 8, name: "Fresh Mango Shake", price: 150, cat: "Drinks" },
];

const initRooms = [
  { id: 1, number: "101", type: "Standard", status: "available", guest: null, checkIn: null, checkOut: null, rate: 3500 },
  { id: 2, number: "102", type: "Standard", status: "occupied", guest: "Santos Family", checkIn: "2026-04-10", checkOut: "2026-04-14", rate: 3500 },
  { id: 3, number: "103", type: "Standard", status: "available", guest: null, checkIn: null, checkOut: null, rate: 3500 },
  { id: 4, number: "104", type: "Standard", status: "reserved", guest: "Cruz, Maria", checkIn: "2026-04-13", checkOut: "2026-04-15", rate: 3500 },
  { id: 5, number: "105", type: "Standard", status: "available", guest: null, checkIn: null, checkOut: null, rate: 3500 },
  { id: 6, number: "106", type: "Standard", status: "occupied", guest: "Reyes, John", checkIn: "2026-04-11", checkOut: "2026-04-13", rate: 3500 },
  { id: 7, number: "107", type: "Standard", status: "maintenance", guest: null, checkIn: null, checkOut: null, rate: 3500 },
  { id: 8, number: "108", type: "Standard", status: "available", guest: null, checkIn: null, checkOut: null, rate: 3500 },
  { id: 9, number: "201", type: "Deluxe", status: "occupied", guest: "Lim, Angela", checkIn: "2026-04-09", checkOut: "2026-04-15", rate: 5500 },
  { id: 10, number: "202", type: "Deluxe", status: "available", guest: null, checkIn: null, checkOut: null, rate: 5500 },
  { id: 11, number: "203", type: "Deluxe", status: "reserved", guest: "Tan, Roberto", checkIn: "2026-04-14", checkOut: "2026-04-16", rate: 5500 },
  { id: 12, number: "204", type: "Deluxe", status: "available", guest: null, checkIn: null, checkOut: null, rate: 5500 },
  { id: 13, number: "205", type: "Deluxe", status: "occupied", guest: "Garcia, Elena", checkIn: "2026-04-12", checkOut: "2026-04-14", rate: 5500 },
  { id: 14, number: "301", type: "Suite", status: "available", guest: null, checkIn: null, checkOut: null, rate: 12000 },
  { id: 15, number: "302", type: "Suite", status: "occupied", guest: "Dela Cruz, VP", checkIn: "2026-04-11", checkOut: "2026-04-14", rate: 12000 },
  { id: 16, number: "303", type: "Suite", status: "reserved", guest: "Mendoza, C.", checkIn: "2026-04-13", checkOut: "2026-04-17", rate: 12000 },
];

const initTables = [
  { id: 1, number: 1, cap: 2, status: "available", res: null },
  { id: 2, number: 2, cap: 2, status: "occupied", res: { guest: "Walk-in", time: "12:30" } },
  { id: 3, number: 3, cap: 4, status: "reserved", res: { guest: "Santos, 4 pax", time: "13:00" } },
  { id: 4, number: 4, cap: 4, status: "available", res: null },
  { id: 5, number: 5, cap: 4, status: "occupied", res: { guest: "Walk-in", time: "12:00" } },
  { id: 6, number: 6, cap: 6, status: "available", res: null },
  { id: 7, number: 7, cap: 6, status: "reserved", res: { guest: "Reyes Group", time: "18:00" } },
  { id: 8, number: 8, cap: 4, status: "available", res: null },
  { id: 9, number: 9, cap: 2, status: "available", res: null },
  { id: 10, number: 10, cap: 6, status: "occupied", res: { guest: "Walk-in", time: "11:45" } },
];

const initOrders = [
  { id: 1, tableId: 2, items: [{ mid: 1, qty: 2 }, { mid: 5, qty: 2 }], status: "serving", time: "12:30" },
  { id: 2, tableId: 5, items: [{ mid: 3, qty: 1 }, { mid: 4, qty: 1 }, { mid: 7, qty: 3 }], status: "preparing", time: "12:05" },
  { id: 3, tableId: 10, items: [{ mid: 2, qty: 2 }, { mid: 8, qty: 2 }], status: "served", time: "11:45" },
];

const initInventory = [
  { id: 1, name: "Bath Towels", dept: "Housekeeping", qty: 45, min: 20, unit: "pcs" },
  { id: 2, name: "Bed Sheets (Queen)", dept: "Housekeeping", qty: 12, min: 16, unit: "sets" },
  { id: 3, name: "Shampoo (Amenity)", dept: "Housekeeping", qty: 200, min: 50, unit: "btls" },
  { id: 4, name: "Rice (50kg sack)", dept: "Restaurant", qty: 8, min: 5, unit: "sacks" },
  { id: 5, name: "Cooking Oil (5L)", dept: "Restaurant", qty: 3, min: 5, unit: "cans" },
  { id: 6, name: "San Miguel Beer", dept: "Restaurant", qty: 10, min: 5, unit: "cases" },
  { id: 7, name: "Chlorine", dept: "Pool", qty: 2, min: 4, unit: "drums" },
  { id: 8, name: "Pool Noodles", dept: "Pool", qty: 18, min: 10, unit: "pcs" },
  { id: 9, name: "Life Jackets", dept: "Pool", qty: 8, min: 8, unit: "pcs" },
  { id: 10, name: "Toilet Paper", dept: "Housekeeping", qty: 150, min: 60, unit: "rolls" },
  { id: 11, name: "Drinking Water", dept: "Hotel", qty: 40, min: 30, unit: "gal" },
  { id: 12, name: "Laundry Detergent", dept: "Housekeeping", qty: 5, min: 3, unit: "kg" },
];

const initPool = {
  maxCap: 40,
  curGuests: 12,
  passes: [
    { id: 1, name: "Santos Family", count: 4, time: "09:30", type: "Hotel Guest" },
    { id: 2, name: "Walk-in Group", count: 6, time: "10:15", type: "Day Pass" },
    { id: 3, name: "Cruz, Maria", count: 2, time: "11:00", type: "Hotel Guest" },
  ],
  maintenance: [
    { id: 1, task: "pH Level Check", date: "2026-04-12", status: "done" },
    { id: 2, task: "Chlorine Treatment", date: "2026-04-12", status: "done" },
    { id: 3, task: "Filter Cleaning", date: "2026-04-14", status: "scheduled" },
    { id: 4, task: "Pool Light Check", date: "2026-04-15", status: "scheduled" },
  ],
};

const calcTotal = (items) => items.reduce((s, i) => { const m = MENU.find(m => m.id === i.mid); return s + (m ? m.price * i.qty : 0); }, 0);

const SC = {
  available:   { fg: "#10B981", bg: "rgba(16,185,129,0.12)" },
  occupied:    { fg: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  reserved:    { fg: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  maintenance: { fg: "#6B7280", bg: "rgba(107,114,128,0.12)" },
  preparing:   { fg: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  serving:     { fg: "#A855F7", bg: "rgba(168,85,247,0.12)" },
  served:      { fg: "#10B981", bg: "rgba(16,185,129,0.12)" },
  billed:      { fg: "#64748B", bg: "rgba(100,116,139,0.12)" },
  done:        { fg: "#10B981", bg: "rgba(16,185,129,0.12)" },
  scheduled:   { fg: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
};

function Badge({ s, label }) {
  const c = SC[s] || { fg: "#94A3B8", bg: "rgba(148,163,184,0.12)" };
  return <span style={{ display:"inline-block", padding:"2px 9px", borderRadius:20, fontSize:10, fontWeight:700, color:c.fg, background:c.bg, textTransform:"capitalize", letterSpacing:"0.3px" }}>{label || s}</span>;
}

function Modal({ title, onClose, children, wide }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.72)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, backdropFilter:"blur(3px)" }}>
      <div style={{ background:"#0C1A2E", border:"1px solid #1d3a5f", borderRadius:16, padding:24, width:wide?580:420, maxWidth:"94vw", maxHeight:"88vh", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:"#E8D9B0" }}>{title}</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#475569", cursor:"pointer", padding:4 }}><X size={16}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Btn({ onClick, children, v = "ghost", sz = "md", full }) {
  const vs = {
    primary: { background:"#E8C040", color:"#0C1A2E", border:"none" },
    ghost:   { background:"#112240", color:"#94A3B8", border:"1px solid #1d3a5f" },
    danger:  { background:"rgba(239,68,68,0.12)", color:"#EF4444", border:"1px solid rgba(239,68,68,0.25)" },
    success: { background:"rgba(16,185,129,0.12)", color:"#10B981", border:"1px solid rgba(16,185,129,0.25)" },
  };
  const ss = { sm:{ padding:"4px 10px", fontSize:11 }, md:{ padding:"7px 14px", fontSize:13 }, lg:{ padding:"10px 20px", fontSize:14 } };
  return (
    <button onClick={onClick} style={{ ...vs[v], ...ss[sz], borderRadius:8, cursor:"pointer", fontFamily:"inherit", fontWeight:500, display:"inline-flex", alignItems:"center", gap:5, transition:"opacity 0.15s", width:full?"100%":"auto", justifyContent:full?"center":"flex-start" }}>
      {children}
    </button>
  );
}

function Fld({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div style={{ marginBottom:12 }}>
      {label && <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:"1px", marginBottom:5 }}>{label}</div>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width:"100%", background:"#112240", border:"1px solid #1d3a5f", color:"#CBD5E1", padding:"8px 11px", borderRadius:8, fontFamily:"inherit", fontSize:13, outline:"none", boxSizing:"border-box" }} />
    </div>
  );
}

function Sel({ label, value, onChange, opts }) {
  return (
    <div style={{ marginBottom:12 }}>
      {label && <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:"1px", marginBottom:5 }}>{label}</div>}
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width:"100%", background:"#112240", border:"1px solid #1d3a5f", color:"#CBD5E1", padding:"8px 11px", borderRadius:8, fontFamily:"inherit", fontSize:13, outline:"none", boxSizing:"border-box" }}>
        {opts.map(o => <option key={o.v||o} value={o.v||o}>{o.l||o}</option>)}
      </select>
    </div>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{ background:"#0C1A2E", border:"1px solid #1d3a5f", borderRadius:12, padding:"16px 18px" }}>
      <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:"1px", marginBottom:8 }}>{label}</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:700, color:color||"#E8D9B0", lineHeight:1 }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:"#475569", marginTop:6 }}>{sub}</div>}
    </div>
  );
}

function Card({ title, children, action }) {
  return (
    <div style={{ background:"#0C1A2E", border:"1px solid #1d3a5f", borderRadius:12, padding:18 }}>
      {title && (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, fontWeight:600, color:"#E8D9B0" }}>{title}</div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────
function Dashboard({ rooms, tables, orders, inventory, pool }) {
  const occupied = rooms.filter(r => r.status === "occupied").length;
  const lowStock = inventory.filter(i => i.qty < i.min);
  const activeOrders = orders.filter(o => o.status !== "billed");
  const poolPct = Math.round((pool.curGuests / pool.maxCap) * 100);
  const revenue = rooms.filter(r => r.status === "occupied").reduce((s, r) => s + r.rate, 0);

  return (
    <div>
      {lowStock.length > 0 && (
        <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:10, padding:"10px 14px", marginBottom:18, display:"flex", alignItems:"center", gap:9, fontSize:13, color:"#F59E0B" }}>
          <AlertTriangle size={15}/> <strong>{lowStock.length} inventory items</strong>&nbsp;below minimum:&nbsp;
          <span style={{ color:"#94A3B8" }}>{lowStock.map(i => i.name).slice(0,3).join(", ")}{lowStock.length > 3 ? "…" : ""}</span>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:13, marginBottom:16 }}>
        <StatCard label="Occupancy Rate" value={`${Math.round((occupied/rooms.length)*100)}%`} sub={`${occupied} of ${rooms.length} rooms`} color="#10B981"/>
        <StatCard label="Active Orders" value={activeOrders.length} sub={`${tables.filter(t=>t.status==="occupied").length} tables occupied`} color="#3B82F6"/>
        <StatCard label="Pool Guests" value={pool.curGuests} sub={`${pool.maxCap - pool.curGuests} spots left`} color="#06B6D4"/>
        <StatCard label="Room Revenue/Night" value={`₱${revenue.toLocaleString()}`} sub="Current occupied rooms" color="#E8C040"/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
        <Card title="Room Status">
          {[{l:"Available",s:"available",c:"#10B981"},{l:"Occupied",s:"occupied",c:"#EF4444"},{l:"Reserved",s:"reserved",c:"#F59E0B"},{l:"Maintenance",s:"maintenance",c:"#6B7280"}].map(x => (
            <div key={x.s} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:x.c, flexShrink:0 }}/>
              <div style={{ flex:1, fontSize:13, color:"#94A3B8" }}>{x.l}</div>
              <div style={{ fontSize:13, fontWeight:600, color:"#E2D5B0" }}>{rooms.filter(r=>r.status===x.s).length}</div>
              <div style={{ width:70, background:"#1d3a5f", borderRadius:4, height:4 }}>
                <div style={{ width:`${(rooms.filter(r=>r.status===x.s).length/rooms.length)*100}%`, background:x.c, height:"100%", borderRadius:4 }}/>
              </div>
            </div>
          ))}
        </Card>

        <Card title="Active Restaurant Orders">
          {activeOrders.length === 0
            ? <div style={{ color:"#475569", fontSize:13, textAlign:"center", padding:"14px 0" }}>No active orders</div>
            : activeOrders.slice(0,5).map(o => (
              <div key={o.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:"1px solid #112240", fontSize:13 }}>
                <div>
                  <div style={{ color:"#CBD5E1", fontWeight:500 }}>Table {o.tableId}</div>
                  <div style={{ color:"#475569", fontSize:11 }}>{o.time}</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ color:"#E8C040", fontSize:12 }}>₱{calcTotal(o.items).toLocaleString()}</span>
                  <Badge s={o.status}/>
                </div>
              </div>
            ))
          }
        </Card>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <Card title="Pool Capacity">
          <div style={{ display:"flex", alignItems:"center", gap:20 }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:38, fontWeight:700, color:poolPct>80?"#EF4444":"#06B6D4", lineHeight:1 }}>{poolPct}%</div>
              <div style={{ fontSize:11, color:"#475569", marginTop:3 }}>capacity</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ background:"#1d3a5f", borderRadius:8, height:10, overflow:"hidden", marginBottom:8 }}>
                <div style={{ width:`${poolPct}%`, background:poolPct>80?"#EF4444":"#06B6D4", height:"100%", borderRadius:8 }}/>
              </div>
              <div style={{ fontSize:12, color:"#64748B" }}>{pool.curGuests} / {pool.maxCap} guests</div>
              <div style={{ fontSize:12, color:"#64748B", marginTop:3 }}>{pool.maxCap - pool.curGuests} spots available</div>
            </div>
          </div>
        </Card>

        <Card title={<span>Low Stock Items {lowStock.length > 0 && <span style={{ background:"rgba(239,68,68,0.2)", color:"#EF4444", fontSize:10, padding:"1px 7px", borderRadius:10, marginLeft:7 }}>{lowStock.length}</span>}</span>}>
          {lowStock.length === 0
            ? <div style={{ color:"#475569", fontSize:13, textAlign:"center", padding:"14px 0" }}><Check size={16} style={{ display:"block", margin:"0 auto 5px", color:"#10B981" }}/>All items stocked</div>
            : lowStock.map(i => (
              <div key={i.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:"1px solid #112240", fontSize:12 }}>
                <div>
                  <div style={{ color:"#CBD5E1" }}>{i.name}</div>
                  <div style={{ color:"#475569", fontSize:10 }}>{i.dept}</div>
                </div>
                <div style={{ color:"#EF4444", fontWeight:600 }}>{i.qty}/{i.min} {i.unit}</div>
              </div>
            ))
          }
        </Card>
      </div>
    </div>
  );
}

// ─── HOTEL ────────────────────────────────────────────────
function HotelView({ rooms, setRooms }) {
  const [sel, setSel] = useState(null);
  const [mode, setMode] = useState(null);
  const [form, setForm] = useState({ guest:"", checkIn:today, checkOut:"" });
  const [filter, setFilter] = useState("all");

  const upd = (id, data) => setRooms(p => p.map(r => r.id === id ? { ...r, ...data } : r));
  const close = () => { setSel(null); setMode(null); };

  const doCheckIn = () => {
    if (!form.guest || !form.checkOut) return;
    upd(sel.id, { status:"occupied", guest:form.guest, checkIn:form.checkIn, checkOut:form.checkOut });
    close();
  };
  const doReserve = () => {
    if (!form.guest || !form.checkIn || !form.checkOut) return;
    upd(sel.id, { status:"reserved", guest:form.guest, checkIn:form.checkIn, checkOut:form.checkOut });
    close();
  };

  const TYPE_COL = { Standard:"#3B82F6", Deluxe:"#A855F7", Suite:"#E8C040" };
  const filtered = filter === "all" ? rooms : rooms.filter(r => r.status === filter);

  return (
    <div>
      <div style={{ display:"flex", gap:7, marginBottom:18, flexWrap:"wrap" }}>
        {["all","available","occupied","reserved","maintenance"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding:"5px 13px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight:filter===f?600:400, background:filter===f?"#E8C040":"#112240", color:filter===f?"#0C1A2E":"#64748B", textTransform:"capitalize" }}>
            {f === "all" ? `All (${rooms.length})` : `${f} (${rooms.filter(r=>r.status===f).length})`}
          </button>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:11 }}>
        {filtered.map(room => {
          const c = SC[room.status] || SC.available;
          return (
            <div key={room.id} onClick={() => { setSel(room); setMode(null); }} style={{ background:"#0C1A2E", border:`1px solid ${c.fg}30`, borderRadius:12, padding:"13px 10px", cursor:"pointer", textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:c.fg, lineHeight:1 }}>{room.number}</div>
              <div style={{ fontSize:9, textTransform:"uppercase", letterSpacing:"1.5px", color:TYPE_COL[room.type], marginTop:4, fontWeight:600 }}>{room.type}</div>
              <div style={{ marginTop:7, display:"inline-block", padding:"2px 8px", borderRadius:10, fontSize:10, fontWeight:700, color:c.fg, background:c.bg, textTransform:"capitalize" }}>{room.status}</div>
              {room.guest && <div style={{ fontSize:10, color:"#475569", marginTop:5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{room.guest}</div>}
              {room.checkOut && <div style={{ fontSize:9, color:"#2d4a6a", marginTop:2 }}>out: {room.checkOut}</div>}
            </div>
          );
        })}
      </div>

      {sel && !mode && (
        <Modal title={`Room ${sel.number} — ${sel.type}`} onClose={close}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
            <Badge s={sel.status}/><span style={{ color:"#E8C040", fontSize:13 }}>₱{sel.rate.toLocaleString()}/night</span>
          </div>
          {sel.guest && (
            <div style={{ background:"#112240", borderRadius:10, padding:"11px 13px", marginBottom:14 }}>
              <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:"1px", marginBottom:5 }}>Guest</div>
              <div style={{ color:"#CBD5E1", fontWeight:500 }}>{sel.guest}</div>
              {sel.checkIn && <div style={{ color:"#64748B", fontSize:12, marginTop:4 }}>Check-in: {sel.checkIn} → Check-out: {sel.checkOut}</div>}
            </div>
          )}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {sel.status === "available" && <>
              <Btn v="primary" onClick={() => { setForm({guest:"",checkIn:today,checkOut:""}); setMode("checkin"); }}><LogIn size={13}/>Check In</Btn>
              <Btn v="ghost" onClick={() => { setForm({guest:"",checkIn:today,checkOut:""}); setMode("reserve"); }}><Calendar size={13}/>Reserve</Btn>
              <Btn v="danger" onClick={() => { upd(sel.id,{status:"maintenance",guest:null,checkIn:null,checkOut:null}); close(); }}>Set Maintenance</Btn>
            </>}
            {sel.status === "occupied" && <Btn v="success" onClick={() => { upd(sel.id,{status:"available",guest:null,checkIn:null,checkOut:null}); close(); }}><LogOut size={13}/>Check Out</Btn>}
            {sel.status === "reserved" && <>
              <Btn v="primary" onClick={() => { setForm({guest:sel.guest,checkIn:sel.checkIn,checkOut:sel.checkOut}); setMode("checkin"); }}><LogIn size={13}/>Check In Now</Btn>
              <Btn v="danger" onClick={() => { upd(sel.id,{status:"available",guest:null,checkIn:null,checkOut:null}); close(); }}>Cancel Reservation</Btn>
            </>}
            {sel.status === "maintenance" && <Btn v="success" onClick={() => { upd(sel.id,{status:"available"}); close(); }}><Check size={13}/>Mark Available</Btn>}
          </div>
        </Modal>
      )}

      {sel && mode === "checkin" && (
        <Modal title={`Check In — Room ${sel.number}`} onClose={close}>
          <Fld label="Guest Name" value={form.guest} onChange={v => setForm({...form,guest:v})} placeholder="Full name or group"/>
          <Fld label="Check-in Date" type="date" value={form.checkIn} onChange={v => setForm({...form,checkIn:v})}/>
          <Fld label="Check-out Date" type="date" value={form.checkOut} onChange={v => setForm({...form,checkOut:v})}/>
          <div style={{ display:"flex", gap:8, marginTop:6 }}>
            <Btn v="primary" onClick={doCheckIn}><Check size={13}/>Confirm Check In</Btn>
            <Btn v="ghost" onClick={close}>Cancel</Btn>
          </div>
        </Modal>
      )}

      {sel && mode === "reserve" && (
        <Modal title={`Reserve — Room ${sel.number}`} onClose={close}>
          <Fld label="Guest Name" value={form.guest} onChange={v => setForm({...form,guest:v})} placeholder="Full name"/>
          <Fld label="Check-in Date" type="date" value={form.checkIn} onChange={v => setForm({...form,checkIn:v})}/>
          <Fld label="Check-out Date" type="date" value={form.checkOut} onChange={v => setForm({...form,checkOut:v})}/>
          <div style={{ display:"flex", gap:8, marginTop:6 }}>
            <Btn v="primary" onClick={doReserve}><Calendar size={13}/>Confirm Reservation</Btn>
            <Btn v="ghost" onClick={close}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── RESTAURANT ───────────────────────────────────────────
function RestaurantView({ tables, setTables, orders, setOrders }) {
  const [selTable, setSelTable] = useState(null);
  const [view, setView] = useState("tables");
  const [mode, setMode] = useState(null);
  const [orderItems, setOrderItems] = useState({});
  const [resForm, setResForm] = useState({ guest:"", time:"" });

  const tableOrder = (id) => orders.find(o => o.tableId === id && o.status !== "billed");
  const add = (mid) => setOrderItems(p => ({...p,[mid]:(p[mid]||0)+1}));
  const rem = (mid) => setOrderItems(p => { const n={...p}; if(n[mid]>1)n[mid]--; else delete n[mid]; return n; });
  const total = Object.entries(orderItems).reduce((s,[mid,qty]) => { const m=MENU.find(m=>m.id===parseInt(mid)); return s+(m?m.price*qty:0); },0);

  const placeOrder = () => {
    if (!Object.keys(orderItems).length) return;
    const now = new Date().toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit"});
    const o = { id:Date.now(), tableId:selTable.id, items:Object.entries(orderItems).map(([mid,qty])=>({mid:parseInt(mid),qty})), status:"preparing", time:now };
    setOrders(p => [...p, o]);
    setTables(p => p.map(t => t.id===selTable.id ? {...t,status:"occupied",res:{guest:"Walk-in",time:now}} : t));
    setOrderItems({}); setMode(null); setSelTable(null);
  };

  const doReserve = () => {
    if (!resForm.guest || !resForm.time) return;
    setTables(p => p.map(t => t.id===selTable.id ? {...t,status:"reserved",res:{guest:resForm.guest,time:resForm.time}} : t));
    setResForm({guest:"",time:""}); setMode(null); setSelTable(null);
  };

  const nextStatus = { preparing:"serving", serving:"served", served:"billed" };
  const nextLabel  = { preparing:"Mark Serving", serving:"Mark Served", served:"Bill Out" };

  const updOrder = (id, status) => {
    setOrders(p => p.map(o => o.id===id ? {...o,status} : o));
    if (status === "billed") {
      const o = orders.find(o => o.id===id);
      if (o) setTables(p => p.map(t => t.id===o.tableId ? {...t,status:"available",res:null} : t));
    }
  };

  const close = () => { setSelTable(null); setMode(null); setOrderItems({}); };

  return (
    <div>
      <div style={{ display:"flex", gap:4, background:"#112240", borderRadius:10, padding:4, marginBottom:18, width:"fit-content" }}>
        {["tables","orders"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{ padding:"7px 18px", borderRadius:7, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:500, background:view===v?"#0C1A2E":"transparent", color:view===v?"#E8C040":"#475569", textTransform:"capitalize" }}>
            {v === "tables" ? "Tables" : "Orders"}
          </button>
        ))}
      </div>

      {view === "tables" && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:12 }}>
          {tables.map(t => {
            const c = SC[t.status]||SC.available;
            const o = tableOrder(t.id);
            return (
              <div key={t.id} onClick={() => { setSelTable(t); setMode(null); }} style={{ background:"#0C1A2E", border:`1px solid ${c.fg}30`, borderRadius:12, padding:13, cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:7 }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, color:"#E8D9B0", lineHeight:1 }}>T{t.number}</div>
                  <div style={{ fontSize:10, color:"#475569" }}>{t.cap} pax</div>
                </div>
                <div style={{ display:"inline-block", padding:"2px 8px", borderRadius:10, fontSize:10, fontWeight:700, color:c.fg, background:c.bg, textTransform:"capitalize" }}>{t.status}</div>
                {t.res && <div style={{ fontSize:10, color:"#64748B", marginTop:5, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t.res.guest}</div>}
                {o && <div style={{ fontSize:11, color:"#E8C040", marginTop:4, fontWeight:600 }}>₱{calcTotal(o.items).toLocaleString()}</div>}
              </div>
            );
          })}
        </div>
      )}

      {view === "orders" && (
        <div>
          {["preparing","serving","served"].map(status => {
            const grp = orders.filter(o => o.status === status);
            if (!grp.length) return null;
            return (
              <div key={status} style={{ marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}><Badge s={status}/><span style={{ color:"#475569", fontSize:12 }}>({grp.length})</span></div>
                {grp.map(o => (
                  <div key={o.id} style={{ background:"#0C1A2E", border:"1px solid #1d3a5f", borderRadius:10, padding:14, marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontWeight:600, color:"#E8D9B0", marginBottom:6 }}>Table {o.tableId} <span style={{ color:"#475569", fontSize:12, fontWeight:400 }}>· {o.time}</span></div>
                      {o.items.map(item => { const m=MENU.find(m=>m.id===item.mid); return m ? <div key={item.mid} style={{ fontSize:12, color:"#64748B" }}>{item.qty}× {m.name} — ₱{(m.price*item.qty).toLocaleString()}</div> : null; })}
                      <div style={{ color:"#E8C040", fontWeight:600, marginTop:6, fontSize:13 }}>Total: ₱{calcTotal(o.items).toLocaleString()}</div>
                    </div>
                    <Btn v="primary" sz="sm" onClick={() => updOrder(o.id, nextStatus[status])}>{nextLabel[status]}</Btn>
                  </div>
                ))}
              </div>
            );
          })}
          {!orders.filter(o=>["preparing","serving","served"].includes(o.status)).length && (
            <div style={{ color:"#475569", textAlign:"center", padding:"40px 0", fontSize:14 }}>No active orders</div>
          )}
        </div>
      )}

      {selTable && !mode && (
        <Modal title={`Table ${selTable.number} — ${selTable.cap} pax`} onClose={close}>
          <div style={{ marginBottom:14 }}><Badge s={selTable.status}/></div>
          {selTable.res && <div style={{ background:"#112240", borderRadius:10, padding:"10px 13px", marginBottom:13 }}><div style={{ color:"#CBD5E1", fontSize:13 }}>{selTable.res.guest}</div>{selTable.res.time && <div style={{ color:"#64748B", fontSize:11, marginTop:3 }}>Time: {selTable.res.time}</div>}</div>}
          {tableOrder(selTable.id) && (
            <div style={{ background:"#112240", borderRadius:10, padding:"10px 13px", marginBottom:13 }}>
              <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:"1px", marginBottom:7 }}>Active Order</div>
              {tableOrder(selTable.id).items.map(item => { const m=MENU.find(m=>m.id===item.mid); return m?<div key={item.mid} style={{ fontSize:12, color:"#94A3B8", marginBottom:2 }}>{item.qty}× {m.name}</div>:null; })}
              <div style={{ color:"#E8C040", fontWeight:600, marginTop:7 }}>₱{calcTotal(tableOrder(selTable.id).items).toLocaleString()}</div>
            </div>
          )}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {(selTable.status==="available"||selTable.status==="occupied") && <Btn v="primary" onClick={() => { setOrderItems({}); setMode("order"); }}><Plus size={13}/>New Order</Btn>}
            {selTable.status==="available" && <Btn v="ghost" onClick={() => setMode("reserve")}><Calendar size={13}/>Reserve</Btn>}
            {selTable.status==="reserved" && <Btn v="danger" onClick={() => { setTables(p=>p.map(t=>t.id===selTable.id?{...t,status:"available",res:null}:t)); close(); }}>Cancel Reservation</Btn>}
          </div>
        </Modal>
      )}

      {selTable && mode === "order" && (
        <Modal title={`New Order — Table ${selTable.number}`} onClose={close} wide>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:"1px", marginBottom:10 }}>Menu</div>
              {["Food","Drinks"].map(cat => (
                <div key={cat} style={{ marginBottom:12 }}>
                  <div style={{ fontSize:10, color:"#2d4a6a", marginBottom:7, fontWeight:600 }}>{cat}</div>
                  {MENU.filter(m=>m.cat===cat).map(m => (
                    <div key={m.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:"1px solid #112240" }}>
                      <div><div style={{ fontSize:12, color:"#CBD5E1" }}>{m.name}</div><div style={{ fontSize:11, color:"#475569" }}>₱{m.price}</div></div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <button onClick={() => rem(m.id)} style={{ background:"#1d3a5f", border:"none", color:"#CBD5E1", width:22, height:22, borderRadius:6, cursor:"pointer", fontSize:15, lineHeight:1 }}>−</button>
                        <span style={{ color:orderItems[m.id]?"#E8C040":"#475569", fontSize:13, minWidth:18, textAlign:"center" }}>{orderItems[m.id]||0}</span>
                        <button onClick={() => add(m.id)} style={{ background:"#1d3a5f", border:"none", color:"#CBD5E1", width:22, height:22, borderRadius:6, cursor:"pointer", fontSize:15, lineHeight:1 }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:"1px", marginBottom:10 }}>Summary</div>
              <div style={{ background:"#112240", borderRadius:10, padding:12, minHeight:110, marginBottom:12 }}>
                {!Object.keys(orderItems).length ? <div style={{ color:"#2d4a6a", fontSize:12, textAlign:"center", padding:"18px 0" }}>Select items</div>
                  : Object.entries(orderItems).map(([mid,qty]) => { const m=MENU.find(m=>m.id===parseInt(mid)); return m?<div key={mid} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:12 }}><span style={{ color:"#CBD5E1" }}>{qty}× {m.name}</span><span style={{ color:"#E8C040" }}>₱{(m.price*qty).toLocaleString()}</span></div>:null; })
                }
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderTop:"1px solid #1d3a5f", marginBottom:12 }}>
                <span style={{ color:"#94A3B8", fontWeight:600, fontSize:12 }}>TOTAL</span>
                <span style={{ color:"#E8C040", fontWeight:700, fontSize:18 }}>₱{total.toLocaleString()}</span>
              </div>
              <Btn v="primary" onClick={placeOrder} full><Check size={13}/>Place Order</Btn>
            </div>
          </div>
        </Modal>
      )}

      {selTable && mode === "reserve" && (
        <Modal title={`Reserve Table ${selTable.number}`} onClose={close}>
          <Fld label="Guest Name" value={resForm.guest} onChange={v => setResForm({...resForm,guest:v})} placeholder="Name or group"/>
          <Fld label="Time" type="time" value={resForm.time} onChange={v => setResForm({...resForm,time:v})}/>
          <div style={{ display:"flex", gap:8, marginTop:6 }}>
            <Btn v="primary" onClick={doReserve}><Calendar size={13}/>Confirm</Btn>
            <Btn v="ghost" onClick={close}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── POOL ─────────────────────────────────────────────────
function PoolView({ pool, setPool }) {
  const [view, setView] = useState("overview");
  const [showPass, setShowPass] = useState(false);
  const [showMaint, setShowMaint] = useState(false);
  const [pf, setPf] = useState({ name:"", count:"1", type:"Day Pass" });
  const [mf, setMf] = useState({ task:"", date:today, status:"scheduled" });

  const pct = Math.round((pool.curGuests/pool.maxCap)*100);
  const col = pct>=90?"#EF4444":pct>=70?"#F59E0B":"#06B6D4";

  const addPass = () => {
    if (!pf.name) return;
    const cnt = parseInt(pf.count)||1;
    if (pool.curGuests+cnt > pool.maxCap) { alert(`Only ${pool.maxCap-pool.curGuests} spots left!`); return; }
    const now = new Date().toLocaleTimeString("en-PH",{hour:"2-digit",minute:"2-digit"});
    setPool(p => ({...p, curGuests:p.curGuests+cnt, passes:[...p.passes,{id:Date.now(),name:pf.name,count:cnt,time:now,type:pf.type}]}));
    setPf({name:"",count:"1",type:"Day Pass"}); setShowPass(false);
  };

  const remPass = (pass) => setPool(p => ({...p, curGuests:Math.max(0,p.curGuests-pass.count), passes:p.passes.filter(x=>x.id!==pass.id)}));

  const addMaint = () => {
    if (!mf.task) return;
    setPool(p => ({...p, maintenance:[...p.maintenance,{id:Date.now(),...mf}]}));
    setMf({task:"",date:today,status:"scheduled"}); setShowMaint(false);
  };

  const toggleMaint = (id) => setPool(p => ({...p, maintenance:p.maintenance.map(m=>m.id===id?{...m,status:m.status==="done"?"scheduled":"done"}:m)}));

  const r = 60, circ = 2*Math.PI*r;

  return (
    <div>
      <div style={{ display:"flex", gap:4, background:"#112240", borderRadius:10, padding:4, marginBottom:18, width:"fit-content" }}>
        {["overview","passes","maintenance"].map(v => (
          <button key={v} onClick={() => setView(v)} style={{ padding:"7px 16px", borderRadius:7, border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:500, background:view===v?"#0C1A2E":"transparent", color:view===v?"#E8C040":"#475569", textTransform:"capitalize" }}>{v}</button>
        ))}
      </div>

      {view === "overview" && (
        <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:14 }}>
          <Card>
            <div style={{ textAlign:"center" }}>
              <div style={{ position:"relative", width:150, height:150, margin:"0 auto 14px" }}>
                <svg width="150" height="150" viewBox="0 0 150 150">
                  <circle cx="75" cy="75" r={r} fill="none" stroke="#1d3a5f" strokeWidth={11}/>
                  <circle cx="75" cy="75" r={r} fill="none" stroke={col} strokeWidth={11}
                    strokeDasharray={`${(pct/100)*circ} ${circ}`} strokeLinecap="round"
                    style={{transform:"rotate(-90deg)",transformOrigin:"75px 75px",transition:"stroke-dasharray 0.5s"}}/>
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:34, fontWeight:700, color:col, lineHeight:1 }}>{pct}%</div>
                  <div style={{ fontSize:9, color:"#475569", marginTop:4, textTransform:"uppercase", letterSpacing:"1px" }}>Capacity</div>
                </div>
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"#E8D9B0" }}>{pool.curGuests}</div>
              <div style={{ fontSize:11, color:"#64748B" }}>of {pool.maxCap} guests</div>
              <div style={{ marginTop:14 }}><Btn v="primary" sz="sm" onClick={() => setShowPass(true)} full><Plus size={12}/>Add Guests</Btn></div>
            </div>
          </Card>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, alignContent:"start" }}>
            {[
              {l:"Current Guests",v:pool.curGuests,c:"#06B6D4"},
              {l:"Spots Left",v:pool.maxCap-pool.curGuests,c:"#10B981"},
              {l:"Day Passes",v:pool.passes.filter(p=>p.type==="Day Pass").reduce((s,p)=>s+p.count,0),c:"#F59E0B"},
              {l:"Hotel Guests",v:pool.passes.filter(p=>p.type==="Hotel Guest").reduce((s,p)=>s+p.count,0),c:"#A855F7"},
            ].map(s => <StatCard key={s.l} label={s.l} value={s.v} color={s.c}/>)}
          </div>
        </div>
      )}

      {view === "passes" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ color:"#94A3B8", fontSize:13 }}>Active Pool Passes Today</span>
            <Btn v="primary" sz="sm" onClick={() => setShowPass(true)}><Plus size={12}/>Add Pass</Btn>
          </div>
          <Card>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 70px 90px 70px 30px", padding:"8px 0", borderBottom:"1px solid #1d3a5f", fontSize:10, textTransform:"uppercase", letterSpacing:"1px", color:"#475569", marginBottom:4 }}>
              <div>Name</div><div>Guests</div><div>Type</div><div>Time</div><div></div>
            </div>
            {pool.passes.map(p => (
              <div key={p.id} style={{ display:"grid", gridTemplateColumns:"1fr 70px 90px 70px 30px", padding:"10px 0", borderBottom:"1px solid #112240", alignItems:"center", fontSize:13 }}>
                <div style={{ color:"#CBD5E1" }}>{p.name}</div>
                <div style={{ color:"#E8D9B0", fontWeight:600 }}>{p.count}</div>
                <div><Badge s={p.type==="Hotel Guest"?"occupied":"reserved"} label={p.type}/></div>
                <div style={{ color:"#64748B" }}>{p.time}</div>
                <button onClick={() => remPass(p)} style={{ background:"none", border:"none", color:"#475569", cursor:"pointer", padding:0 }}><X size={13}/></button>
              </div>
            ))}
            {!pool.passes.length && <div style={{ color:"#475569", textAlign:"center", padding:"20px 0", fontSize:13 }}>No active passes</div>}
          </Card>
        </div>
      )}

      {view === "maintenance" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <span style={{ color:"#94A3B8", fontSize:13 }}>Maintenance Schedule</span>
            <Btn v="primary" sz="sm" onClick={() => setShowMaint(true)}><Plus size={12}/>Add Task</Btn>
          </div>
          <Card>
            {pool.maintenance.map(m => (
              <div key={m.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom:"1px solid #112240" }}>
                <button onClick={() => toggleMaint(m.id)} style={{ width:20, height:20, borderRadius:5, border:`2px solid ${m.status==="done"?"#10B981":"#475569"}`, background:m.status==="done"?"#10B981":"transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {m.status === "done" && <Check size={11} color="#0C1A2E"/>}
                </button>
                <div style={{ flex:1, color:m.status==="done"?"#475569":"#CBD5E1", fontSize:13, textDecoration:m.status==="done"?"line-through":"none" }}>{m.task}</div>
                <div style={{ fontSize:12, color:"#64748B" }}>{m.date}</div>
                <Badge s={m.status}/>
              </div>
            ))}
          </Card>
        </div>
      )}

      {showPass && (
        <Modal title="Add Pool Guests" onClose={() => setShowPass(false)}>
          <div style={{ background:"#112240", borderRadius:9, padding:"8px 12px", marginBottom:14, fontSize:12, color:"#64748B" }}>{pool.curGuests} / {pool.maxCap} — {pool.maxCap-pool.curGuests} spots available</div>
          <Fld label="Name / Group" value={pf.name} onChange={v => setPf({...pf,name:v})} placeholder="Guest or group name"/>
          <Fld label="Number of Guests" type="number" value={pf.count} onChange={v => setPf({...pf,count:v})}/>
          <Sel label="Pass Type" value={pf.type} onChange={v => setPf({...pf,type:v})} opts={["Day Pass","Hotel Guest"]}/>
          <div style={{ display:"flex", gap:8, marginTop:6 }}><Btn v="primary" onClick={addPass}><Check size={13}/>Add to Pool</Btn><Btn v="ghost" onClick={() => setShowPass(false)}>Cancel</Btn></div>
        </Modal>
      )}

      {showMaint && (
        <Modal title="Add Maintenance Task" onClose={() => setShowMaint(false)}>
          <Fld label="Task" value={mf.task} onChange={v => setMf({...mf,task:v})} placeholder="e.g. pH Level Check"/>
          <Fld label="Date" type="date" value={mf.date} onChange={v => setMf({...mf,date:v})}/>
          <Sel label="Status" value={mf.status} onChange={v => setMf({...mf,status:v})} opts={[{v:"scheduled",l:"Scheduled"},{v:"done",l:"Done"}]}/>
          <div style={{ display:"flex", gap:8, marginTop:6 }}><Btn v="primary" onClick={addMaint}><Check size={13}/>Add Task</Btn><Btn v="ghost" onClick={() => setShowMaint(false)}>Cancel</Btn></div>
        </Modal>
      )}
    </div>
  );
}

// ─── INVENTORY ────────────────────────────────────────────
function InventoryView({ inventory, setInventory }) {
  const [showAdd, setShowAdd] = useState(false);
  const [dept, setDept] = useState("All");
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name:"", dept:"Housekeeping", qty:"", min:"", unit:"" });

  const depts = ["All", ...new Set(inventory.map(i => i.dept))];
  const shown = dept === "All" ? inventory : inventory.filter(i => i.dept === dept);
  const low = inventory.filter(i => i.qty < i.min);

  const save = () => {
    if (!form.name || !form.qty || !form.min) return;
    if (editId) {
      setInventory(p => p.map(i => i.id===editId ? {...i,...form,qty:parseInt(form.qty),min:parseInt(form.min)} : i));
      setEditId(null);
    } else {
      setInventory(p => [...p,{id:Date.now(),...form,qty:parseInt(form.qty),min:parseInt(form.min)}]);
    }
    setForm({name:"",dept:"Housekeeping",qty:"",min:"",unit:""}); setShowAdd(false);
  };

  const del = (id) => setInventory(p => p.filter(i => i.id !== id));
  const edit = (item) => { setForm({name:item.name,dept:item.dept,qty:String(item.qty),min:String(item.min),unit:item.unit}); setEditId(item.id); setShowAdd(true); };
  const adj = (id, d) => setInventory(p => p.map(i => i.id===id ? {...i,qty:Math.max(0,i.qty+d)} : i));

  const DEPT_COL = { Housekeeping:{bg:"rgba(168,85,247,0.12)",fg:"#A855F7"}, Restaurant:{bg:"rgba(59,130,246,0.12)",fg:"#3B82F6"}, Pool:{bg:"rgba(6,182,212,0.12)",fg:"#06B6D4"}, Hotel:{bg:"rgba(16,185,129,0.12)",fg:"#10B981"} };

  return (
    <div>
      {low.length > 0 && (
        <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:10, padding:"9px 13px", marginBottom:14, fontSize:12, color:"#EF4444", display:"flex", alignItems:"center", gap:8 }}>
          <AlertTriangle size={13}/><strong>{low.length} items</strong>&nbsp;need restocking: {low.map(i=>i.name).join(", ")}
        </div>
      )}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {depts.map(d => (
            <button key={d} onClick={() => setDept(d)} style={{ padding:"5px 12px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontFamily:"inherit", background:dept===d?"#E8C040":"#112240", color:dept===d?"#0C1A2E":"#64748B", fontWeight:dept===d?600:400 }}>{d}</button>
          ))}
        </div>
        <Btn v="primary" sz="sm" onClick={() => { setForm({name:"",dept:"Housekeeping",qty:"",min:"",unit:""}); setEditId(null); setShowAdd(true); }}><Plus size={12}/>Add Item</Btn>
      </div>

      <div style={{ background:"#0C1A2E", border:"1px solid #1d3a5f", borderRadius:12, overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 100px 140px 55px 55px 65px", padding:"9px 14px", background:"#112240", fontSize:10, textTransform:"uppercase", letterSpacing:"1px", color:"#475569" }}>
          <div>Item</div><div>Department</div><div>Stock</div><div>Min</div><div>Unit</div><div>Actions</div>
        </div>
        {shown.map(item => {
          const isLow = item.qty < item.min;
          const dc = DEPT_COL[item.dept] || { bg:"rgba(100,116,139,0.12)", fg:"#94A3B8" };
          return (
            <div key={item.id} style={{ display:"grid", gridTemplateColumns:"2fr 100px 140px 55px 55px 65px", padding:"10px 14px", borderBottom:"1px solid #112240", alignItems:"center", background:isLow?"rgba(239,68,68,0.02)":"transparent" }}>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                {isLow && <AlertTriangle size={11} color="#EF4444" style={{ flexShrink:0 }}/>}
                <span style={{ color:"#CBD5E1", fontSize:13 }}>{item.name}</span>
              </div>
              <div><span style={{ fontSize:10, padding:"2px 7px", borderRadius:6, fontWeight:600, background:dc.bg, color:dc.fg }}>{item.dept}</span></div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <button onClick={() => adj(item.id,-1)} style={{ background:"#1d3a5f", border:"none", color:"#CBD5E1", width:22, height:22, borderRadius:5, cursor:"pointer", fontSize:14, lineHeight:1 }}>−</button>
                <span style={{ color:isLow?"#EF4444":"#E2D5B0", fontWeight:600, fontSize:13, minWidth:24, textAlign:"center" }}>{item.qty}</span>
                <button onClick={() => adj(item.id,1)} style={{ background:"#1d3a5f", border:"none", color:"#CBD5E1", width:22, height:22, borderRadius:5, cursor:"pointer", fontSize:14, lineHeight:1 }}>+</button>
              </div>
              <div style={{ color:"#64748B", fontSize:12 }}>{item.min}</div>
              <div style={{ color:"#64748B", fontSize:12 }}>{item.unit}</div>
              <div style={{ display:"flex", gap:7 }}>
                <button onClick={() => edit(item)} style={{ background:"none", border:"none", color:"#475569", cursor:"pointer", padding:2 }}><Edit size={12}/></button>
                <button onClick={() => del(item.id)} style={{ background:"none", border:"none", color:"#475569", cursor:"pointer", padding:2 }}><Trash2 size={12}/></button>
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && (
        <Modal title={editId?"Edit Item":"Add Inventory Item"} onClose={() => { setShowAdd(false); setEditId(null); }}>
          <Fld label="Item Name" value={form.name} onChange={v => setForm({...form,name:v})}/>
          <Sel label="Department" value={form.dept} onChange={v => setForm({...form,dept:v})} opts={["Housekeeping","Restaurant","Pool","Hotel"]}/>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
            <Fld label="Quantity" type="number" value={form.qty} onChange={v => setForm({...form,qty:v})}/>
            <Fld label="Min Stock" type="number" value={form.min} onChange={v => setForm({...form,min:v})}/>
            <Fld label="Unit" value={form.unit} onChange={v => setForm({...form,unit:v})} placeholder="pcs, kg…"/>
          </div>
          <div style={{ display:"flex", gap:8, marginTop:6 }}>
            <Btn v="primary" onClick={save}><Check size={13}/>{editId?"Save Changes":"Add Item"}</Btn>
            <Btn v="ghost" onClick={() => { setShowAdd(false); setEditId(null); }}>Cancel</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────
export default function ResortApp() {
  const [tab, setTab]   = useState("dashboard");
  const [role, setRole] = useState("Manager");
  const [rooms, setRooms]         = useState(initRooms);
  const [tables, setTables]       = useState(initTables);
  const [orders, setOrders]       = useState(initOrders);
  const [inventory, setInventory] = useState(initInventory);
  const [pool, setPool]           = useState(initPool);

  const nav = [
    { id:"dashboard", label:"Dashboard",  Icon:LayoutDashboard },
    { id:"hotel",     label:"Hotel",      Icon:BedDouble },
    { id:"restaurant",label:"Restaurant", Icon:UtensilsCrossed },
    { id:"pool",      label:"Pool",       Icon:Waves },
    { id:"inventory", label:"Inventory",  Icon:Package },
  ];

  const access = (t) => {
    if (role==="Manager") return true;
    if (role==="Front Desk") return ["dashboard","hotel","pool"].includes(t);
    if (role==="Restaurant Staff") return ["dashboard","restaurant"].includes(t);
    if (role==="Housekeeping") return ["dashboard","hotel","inventory"].includes(t);
    return false;
  };

  const titles = { dashboard:"Dashboard", hotel:"Hotel Rooms", restaurant:"Restaurant", pool:"Pool", inventory:"Inventory" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Outfit',sans-serif;background:#070F1C}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#1d3a5f;border-radius:2px}
        input[type=date]::-webkit-calendar-picker-indicator,
        input[type=time]::-webkit-calendar-picker-indicator{filter:invert(0.4)}
        input[type=number]::-webkit-inner-spin-button{opacity:0.3}
        option{background:#0C1A2E}
      `}</style>

      <div style={{ display:"flex", height:"100vh", background:"#070F1C", color:"#CBD5E1", fontFamily:"'Outfit',sans-serif", overflow:"hidden" }}>

        {/* Sidebar */}
        <div style={{ width:196, background:"#0C1A2E", borderRight:"1px solid #1d3a5f", display:"flex", flexDirection:"column", flexShrink:0 }}>
          <div style={{ padding:"18px 15px 13px", borderBottom:"1px solid #1d3a5f" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, color:"#E8C040", letterSpacing:"1px" }}>⚓ Villa Palma</div>
            <div style={{ fontSize:9, color:"#475569", letterSpacing:"2px", textTransform:"uppercase", marginTop:2 }}>Resort Management</div>
          </div>

          <div style={{ padding:"11px 13px", borderBottom:"1px solid #1d3a5f" }}>
            <div style={{ fontSize:9, color:"#475569", textTransform:"uppercase", letterSpacing:"1px", marginBottom:5 }}>Staff Role</div>
            <select value={role} onChange={e => { setRole(e.target.value); setTab("dashboard"); }}
              style={{ background:"#112240", border:"1px solid #1d3a5f", color:"#E8C040", padding:"6px 9px", borderRadius:8, fontSize:12, width:"100%", fontFamily:"'Outfit',sans-serif", outline:"none", cursor:"pointer" }}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <nav style={{ flex:1, padding:"8px", overflowY:"auto" }}>
            {nav.map(({ id, label, Icon }) => {
              const active = tab === id;
              const ok = access(id);
              return (
                <div key={id} onClick={() => ok && setTab(id)} style={{ display:"flex", alignItems:"center", gap:9, padding:"9px 10px", borderRadius:8, cursor:ok?"pointer":"default", margin:"2px 0", fontSize:13, fontWeight:active?600:400, background:active?"#0d2240":"transparent", color:active?"#E8C040":ok?"#64748B":"#1d3358", borderLeft:active?"3px solid #E8C040":"3px solid transparent", opacity:ok?1:0.35, transition:"all 0.15s" }}>
                  <Icon size={15}/>{label}
                </div>
              );
            })}
          </nav>

          <div style={{ padding:"10px 13px", borderTop:"1px solid #1d3a5f", fontSize:9, color:"#1d3a5f" }}>Villa Palma Resort v1.0</div>
        </div>

        {/* Main */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ background:"#0C1A2E", borderBottom:"1px solid #1d3a5f", padding:"12px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:600, color:"#E8D9B0" }}>{titles[tab]}</div>
            <div style={{ fontSize:11, color:"#475569" }}>{new Date().toLocaleDateString("en-PH",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
          </div>

          <div style={{ flex:1, overflowY:"auto", padding:"20px 22px" }}>
            {tab==="dashboard"  && <Dashboard rooms={rooms} tables={tables} orders={orders} inventory={inventory} pool={pool}/>}
            {tab==="hotel"      && <HotelView rooms={rooms} setRooms={setRooms}/>}
            {tab==="restaurant" && <RestaurantView tables={tables} setTables={setTables} orders={orders} setOrders={setOrders}/>}
            {tab==="pool"       && <PoolView pool={pool} setPool={setPool}/>}
            {tab==="inventory"  && <InventoryView inventory={inventory} setInventory={setInventory}/>}
          </div>
        </div>
      </div>
    </>
  );
}
