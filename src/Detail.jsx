import { NODES, EDGES, CAT_META } from "./data";

export default function Detail({ node, onClose }) {
  if (!node) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", padding: "40px 24px", opacity: .2 }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" style={{ marginBottom: 16 }}>
        <circle cx="24" cy="24" r="20" strokeDasharray="4 4" /><circle cx="24" cy="24" r="4" fill="currentColor" opacity=".3" />
        <line x1="24" y1="4" x2="24" y2="12" /><line x1="24" y1="36" x2="24" y2="44" />
        <line x1="4" y1="24" x2="12" y2="24" /><line x1="36" y1="24" x2="44" y2="24" />
      </svg>
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>Click a node</div>
      <div style={{ fontSize: 12, opacity: .6 }}>Explore docs, paths, and connections</div>
    </div>
  );
  const rels = EDGES.filter(e => e.from === node.id || e.to === node.id);
  const containsRels = rels.filter(e => e.solid), otherRels = rels.filter(e => !e.solid);
  return (
    <div key={node.id} style={{ animation: "fadeIn .2s ease", padding: "24px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16, borderBottom: "1px solid var(--border)", marginBottom: 18 }}>
        <div style={{ width: 14, height: 14, borderRadius: "50%", background: node.color, flexShrink: 0 }} />
        <h2 style={{ fontSize: 19, fontWeight: 700, flex: 1, letterSpacing: -.5 }}>{node.title}</h2>
        <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 14, background: node.color + "15", color: node.color, fontWeight: 600 }}>{CAT_META[node.cat]?.label}</span>
        <button onClick={onClose} aria-label="Close detail panel" style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", opacity: .25, lineHeight: 1, color: "inherit" }}>{"\u00d7"}</button>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.7, opacity: .55, marginBottom: 20 }}>{node.desc}</p>
      {node.items.map((it, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 0", borderTop: i > 0 ? "1px solid var(--border-subtle)" : "none" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: node.color, opacity: .3, flexShrink: 0, marginTop: 8 }} />
          <span style={{ fontSize: 13.5, lineHeight: 1.55 }}>
            {it.t}{it.loc && <code style={{ display: "inline-block", fontSize: 11, background: "var(--code-bg)", padding: "2px 8px", borderRadius: 5, marginLeft: 8, fontFamily: "ui-monospace,'SF Mono',Monaco,monospace", wordBreak: "break-all" }}>{it.loc}</code>}
          </span>
        </div>
      ))}
      {rels.length > 0 && (
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
          {containsRels.length > 0 && <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, opacity: .3, marginBottom: 8 }}>Contains</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{containsRels.map((e, j) => {
              const other = NODES.find(n => n.id === (e.from === node.id ? e.to : e.from));
              return (<span key={j} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 8, background: other?.color + "12", border: `1.5px solid ${other?.color}22`, color: other?.color, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: other?.color, opacity: .6 }} />{other?.title}
              </span>);
            })}</div>
          </div>}
          {otherRels.length > 0 && <div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, opacity: .3, marginBottom: 8 }}>Related to</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{otherRels.map((e, j) => {
              const other = NODES.find(n => n.id === (e.from === node.id ? e.to : e.from));
              const dir = e.from === node.id ? "\u2192" : "\u2190";
              return (<span key={j} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 8, background: "var(--chip-bg)", border: "1px solid var(--border)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: other?.color, opacity: .5 }} />
                <span style={{ opacity: .4, fontSize: 10 }}>{dir}</span>{other?.title}
                <span style={{ opacity: .3, fontSize: 10 }}>{e.label}</span>
              </span>);
            })}</div>
          </div>}
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>{node.links.map((lk, j) => (
        <a key={j} href={lk.u} target="_blank" rel="noopener noreferrer" className="doc-link" style={{ fontSize: 12.5, fontWeight: 600, color: node.color, textDecoration: "none", padding: "7px 16px", border: `1.5px solid ${node.color}20`, borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 5, transition: "all .15s" }}
          onMouseEnter={ev => { ev.currentTarget.style.background = node.color + "0a"; ev.currentTarget.style.borderColor = node.color + "40" }}
          onMouseLeave={ev => { ev.currentTarget.style.background = "transparent"; ev.currentTarget.style.borderColor = node.color + "20" }}>
          {lk.l}<span style={{ fontSize: 10, opacity: .5 }}>{"\u2197"}</span>
        </a>
      ))}</div>
    </div>
  );
}
