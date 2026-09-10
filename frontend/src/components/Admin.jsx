import { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiChevronRight,
  FiInbox,
  FiLayers,
  FiMenu,
  FiRefreshCw,
  FiSearch,
  FiUsers,
  FiX,
} from "react-icons/fi";
import {
  getBlogPosts,
  getContactMessages,
  getProjects,
  getServices,
  getTeam,
  getTestimonials,
  updateContactMessage,
} from "../api/api";
import "./admin.css";

const collections = [
  { key: "overview", label: "Overview", icon: FiLayers },
  { key: "messages", label: "Messages", icon: FiInbox },
  { key: "services", label: "Services", icon: FiLayers },
  { key: "projects", label: "Projects", icon: FiLayers },
  { key: "team", label: "Team", icon: FiUsers },
  { key: "testimonials", label: "Testimonials", icon: FiUsers },
  { key: "blog", label: "Blog posts", icon: FiLayers },
];

const loaders = {
  messages: getContactMessages,
  services: getServices,
  projects: getProjects,
  team: getTeam,
  testimonials: getTestimonials,
  blog: getBlogPosts,
};

const labels = {
  _id: "ID",
  createdAt: "Created",
  updatedAt: "Updated",
  publishedAt: "Published",
  projectType: "Project type",
};

function displayValue(value) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function titleFor(item) {
  return item.name || item.title || item.company || item.headline || "Untitled record";
}

export default function Admin() {
  const [activeKey, setActiveKey] = useState("overview");
  const [data, setData] = useState({});
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const entries = await Promise.all(
        Object.entries(loaders).map(async ([key, loader]) => [key, await loader()])
      );
      setData(Object.fromEntries(entries));
      setSelected(null);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load admin data. Is the API running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const records = data[activeKey] || [];
  const filteredRecords = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return records;
    return records.filter((item) => JSON.stringify(item).toLowerCase().includes(normalized));
  }, [query, records]);

  const totalRecords = Object.values(data).reduce((sum, items) => sum + items.length, 0);
  const newMessages = (data.messages || []).filter((item) => item.status === "new").length;

  const chooseCollection = (key) => {
    setActiveKey(key);
    setSelected(null);
    setQuery("");
    setMenuOpen(false);
  };

  const changeStatus = async (status) => {
    if (!selected) return;
    try {
      const updated = await updateContactMessage(selected._id, { status });
      setData((current) => ({
        ...current,
        messages: current.messages.map((item) => (item._id === updated._id ? updated : item)),
      }));
      setSelected(updated);
    } catch (err) {
      setError(err.response?.data?.message || "Could not update message status.");
    }
  };

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="admin-brand">
          <span className="brand-mark" />
          <span>BUILDCORE</span>
          <button className="admin-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <FiX />
          </button>
        </div>
        <div className="admin-side-label">Workspace</div>
        <nav className="admin-nav">
          {collections.map(({ key, label, icon: Icon }) => (
            <button className={activeKey === key ? "active" : ""} key={key} onClick={() => chooseCollection(key)}>
              <Icon />
              {label}
              {key === "messages" && newMessages > 0 && <span className="nav-count">{newMessages}</span>}
            </button>
          ))}
        </nav>
        <a className="admin-back" href="/">
          <FiArrowLeft /> View website
        </a>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><FiMenu /></button>
          <div>
            <span className="admin-kicker">Operations dashboard</span>
            <h1>{collections.find((item) => item.key === activeKey)?.label || "Overview"}</h1>
          </div>
          <button className="admin-refresh" onClick={loadData} disabled={loading} title="Refresh data">
            <FiRefreshCw className={loading ? "spin" : ""} /> Refresh
          </button>
        </header>

        {error && <div className="admin-alert">{error}</div>}

        {activeKey === "overview" ? (
          <Overview data={data} totalRecords={totalRecords} newMessages={newMessages} onChoose={chooseCollection} />
        ) : (
          <section className="admin-content">
            <div className="admin-toolbar">
              <div className="admin-search"><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${activeKey}...`} /></div>
              <span className="record-count">{filteredRecords.length} records</span>
            </div>
            <div className="admin-workspace">
              <div className="record-list">
                {loading && <div className="empty-state">Loading records...</div>}
                {!loading && filteredRecords.length === 0 && <div className="empty-state">No records found.</div>}
                {filteredRecords.map((item) => (
                  <button className={`record-row ${selected?._id === item._id ? "selected" : ""}`} key={item._id} onClick={() => setSelected(item)}>
                    <span><strong>{titleFor(item)}</strong><small>{item.email || item.category || item.role || displayValue(item.createdAt)}</small></span>
                    <FiChevronRight />
                  </button>
                ))}
              </div>
              <DetailPanel item={selected} isMessage={activeKey === "messages"} onStatusChange={changeStatus} />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Overview({ data, totalRecords, newMessages, onChoose }) {
  const cards = [
    ["Messages", data.messages?.length || 0, newMessages, "messages"],
    ["Services", data.services?.length || 0, "Published catalog", "services"],
    ["Projects", data.projects?.length || 0, "Portfolio items", "projects"],
    ["People", (data.team?.length || 0) + (data.testimonials?.length || 0), "Team + reviews", "team"],
  ];
  return <section className="admin-content overview-content">
    <div className="overview-intro"><div><span className="admin-kicker">Buildcore control room</span><h2>Everything in one place.</h2><p>Review your website content and respond to incoming quote requests.</p></div><div className="total-records"><strong>{totalRecords}</strong><span>Total records</span></div></div>
    <div className="metric-grid">{cards.map(([label, value, note, key]) => <button className="metric-card" key={label} onClick={() => onChoose(key)}><span>{label}</span><strong>{value}</strong><small>{typeof note === "number" ? `${note} need attention` : note}</small><FiChevronRight /></button>)}</div>
    <div className="admin-note"><FiInbox /><div><strong>Inbox first</strong><p>Your newest quote requests are grouped under Messages. Select one to view the full request and update its status.</p></div></div>
  </section>;
}

function DetailPanel({ item, isMessage, onStatusChange }) {
  if (!item) return <div className="detail-panel detail-empty"><FiLayers /><h3>Select a record</h3><p>Choose an item from the list to inspect every stored field.</p></div>;
  return <article className="detail-panel"><div className="detail-heading"><div><span className="admin-kicker">Record detail</span><h2>{titleFor(item)}</h2></div>{isMessage && <select value={item.status || "new"} onChange={(event) => onStatusChange(event.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select>}</div><div className="detail-fields">{Object.entries(item).map(([key, value]) => <div className="detail-field" key={key}><span>{labels[key] || key}</span><pre>{displayValue(value)}</pre></div>)}</div></article>;
}