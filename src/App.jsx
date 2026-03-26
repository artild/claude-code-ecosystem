import { useState, useCallback } from "react";
import { NODES, CAT_META } from "./data";
import MindMap from "./MindMap";
import Detail from "./Detail";

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [showEdges, setShowEdges] = useState(true);
  const activeNode = NODES.find(n => n.id === activeId) || null;
  const handleSelect = useCallback(id => setActiveId(p => p === id ? null : id), []);

  return (
    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif", minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>
      <header style={{ padding: "20px 24px 0", maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -.8 }}>Claude Code <span style={{ fontWeight: 400, opacity: .3 }}>/</span><span style={{ fontWeight: 400, opacity: .4 }}> ecosystem</span></h1>
          <p style={{ fontSize: 12, opacity: .3, marginTop: 3 }}>Click nodes · hover edges · follow doc links</p>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 11, fontWeight: 500, opacity: .4 }}>
          {Object.values(CAT_META).map(c => (
            <span key={c.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.color }} />{c.label}
            </span>
          ))}
          {showEdges && <>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 14, height: 2, background: "#993556", borderRadius: 1 }} />contains</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 14, borderTop: "1.5px dashed var(--fg-muted)" }} />relates</span>
          </>}
          <button onClick={() => setShowEdges(p => !p)} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: `1px solid var(--border)`, borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600, padding: "5px 12px", opacity: showEdges ? .6 : .3, color: "inherit", transition: "all .2s" }}>
            <svg width="14" height="7" viewBox="0 0 14 7"><path d="M1 6Q7 0 13 6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" /></svg>{showEdges ? "On" : "Off"}
          </button>
        </div>
      </header>

      <div className="cc-layout" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 40px", display: "flex", gap: 0, alignItems: "stretch", minHeight: "80vh" }}>
        <div style={{ flex: "1 1 58%", minWidth: 0, padding: "8px 0" }}>
          <MindMap activeId={activeId} hoveredId={hoveredId} showEdges={showEdges} onSelect={handleSelect} onHover={setHoveredId} />
        </div>
        <div className="cc-detail" style={{ flex: "1 1 38%", maxWidth: 480, borderLeft: "1px solid var(--border)", paddingLeft: 28, overflowY: "auto", minHeight: 400 }}>
          <Detail node={activeNode} onClose={() => setActiveId(null)} />
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "16px", fontSize: 10, opacity: .2, borderTop: "1px solid var(--border-subtle)" }}>
        Links: code.claude.com · platform.claude.com · modelcontextprotocol.io · docs.ollama.com
      </footer>
    </div>
  );
}
