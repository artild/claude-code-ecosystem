import { useState, useCallback, useEffect, useMemo } from "react";
import { NODES, NODE_MAP, CAT_META } from "./data";
import MindMap from "./MindMap";
import Detail from "./Detail";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return [theme, () => setTheme(t => t === "dark" ? "light" : "dark")];
}

function useHashNode() {
  const read = () => {
    const h = location.hash.slice(1);
    return NODE_MAP.has(h) ? h : null;
  };
  const [id, setId] = useState(read);
  useEffect(() => {
    const onHash = () => setId(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const select = useCallback(newId => {
    const next = id === newId ? null : newId;
    history.replaceState(null, "", next ? `#${next}` : location.pathname + location.search);
    setId(next);
  }, [id]);
  return [id, select];
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [activeId, selectNode] = useHashNode();
  const [hoveredId, setHoveredId] = useState(null);
  const [showEdges, setShowEdges] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState(null);
  const activeNode = NODE_MAP.get(activeId) || null;

  const filteredIds = useMemo(() => {
    const q = search.toLowerCase().trim();
    return new Set(
      NODES.filter(n => {
        if (activeCat && n.cat !== activeCat) return false;
        if (q && !n.title.toLowerCase().includes(q) && !n.desc.toLowerCase().includes(q) && !n.short.toLowerCase().includes(q)) return false;
        return true;
      }).map(n => n.id)
    );
  }, [search, activeCat]);

  const hasFilter = search.trim() || activeCat;

  return (
    <div className="cc-app">
      <header className="cc-header">
        <div>
          <h1>Claude Code <span className="sep">/</span><span className="sub"> ecosystem</span></h1>
          <p className="subtitle">Click nodes · hover edges · follow doc links</p>
        </div>
        <div className="cc-legend">
          {Object.values(CAT_META).map(c => (
            <span key={c.label} className="cc-legend-item">
              <span className="cat-dot" style={{ background: c.color }} />{c.label}
            </span>
          ))}
          {showEdges && <>
            <span className="cc-legend-item"><span className="legend-line-solid" />contains</span>
            <span className="cc-legend-item"><span className="legend-line-dashed" />relates</span>
          </>}
          <button className="cc-btn" onClick={() => setShowEdges(p => !p)} style={{ opacity: showEdges ? .6 : .3 }}>
            <svg width="14" height="7" viewBox="0 0 14 7"><path d="M1 6Q7 0 13 6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" /></svg>{showEdges ? "On" : "Off"}
          </button>
          <button className="cc-btn" onClick={toggleTheme} aria-label="Toggle dark mode" style={{ opacity: .6 }}>
            {theme === "dark" ? "\u2600" : "\u263E"}
          </button>
        </div>
      </header>

      <div className="cc-search">
        <svg className="cc-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input className="cc-search-input" type="text" placeholder="Search components..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="cc-cat-filters">
        {Object.entries(CAT_META).map(([key, meta]) => (
          <button key={key} className={`cc-cat-btn ${activeCat === key ? "active" : ""}`} onClick={() => setActiveCat(activeCat === key ? null : key)}>
            <span className="cat-dot" style={{ background: meta.color }} />{meta.label}
          </button>
        ))}
        {hasFilter && <button className="cc-cat-btn" onClick={() => { setSearch(""); setActiveCat(null) }} style={{ opacity: .6 }}>Clear</button>}
      </div>

      <div className="cc-layout">
        <div className="cc-map-wrap">
          <MindMap activeId={activeId} hoveredId={hoveredId} showEdges={showEdges} onSelect={selectNode} onHover={setHoveredId} filteredIds={filteredIds} hasFilter={hasFilter} />
        </div>
        <div className="cc-detail">
          <Detail node={activeNode} onClose={() => selectNode(activeId)} onNavigate={selectNode} />
        </div>
      </div>

      <footer className="cc-footer">
        <a href="https://code.claude.com" target="_blank" rel="noopener noreferrer">code.claude.com</a>
        {" · "}
        <a href="https://platform.claude.com" target="_blank" rel="noopener noreferrer">platform.claude.com</a>
        {" · "}
        <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">modelcontextprotocol.io</a>
        {" · "}
        <a href="https://docs.ollama.com" target="_blank" rel="noopener noreferrer">docs.ollama.com</a>
      </footer>
    </div>
  );
}
