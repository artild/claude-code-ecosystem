import { NODES, EDGES, NODE_MAP, CAT_META } from "./data";

export default function Detail({ node, onClose, onNavigate }) {
  if (!node) {
    const cats = {};
    NODES.forEach(n => { cats[n.cat] = (cats[n.cat] || 0) + 1 });
    const entry = NODE_MAP.get("claudemd");
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5">
            <circle cx="24" cy="24" r="20" strokeDasharray="4 4" /><circle cx="24" cy="24" r="4" fill="currentColor" opacity=".3" />
            <line x1="24" y1="4" x2="24" y2="12" /><line x1="24" y1="36" x2="24" y2="44" />
            <line x1="4" y1="24" x2="12" y2="24" /><line x1="36" y1="24" x2="44" y2="24" />
          </svg>
          <div style={{ fontSize: 14, fontWeight: 500, marginTop: 16, marginBottom: 6 }}>Click a node to explore</div>
        </div>
        <div className="empty-stats">
          <span className="empty-stats-number">{NODES.length}</span>
          components · {EDGES.length} connections
        </div>
        <div className="empty-cats">
          {Object.entries(cats).map(([cat, count]) => (
            <div key={cat} className="empty-cat-row">
              <span className="cat-dot" style={{ background: CAT_META[cat]?.color }} />
              <span style={{ fontWeight: 600 }}>{count}</span>
              <span>{CAT_META[cat]?.label}</span>
            </div>
          ))}
        </div>
        {entry && (
          <div className="empty-start">
            <div className="empty-start-label">Start here</div>
            <button className="start-node-btn" onClick={() => onNavigate(entry.id)} style={{ color: entry.color, borderColor: entry.color + "22", background: entry.color + "08" }}>
              <span className="cat-dot" style={{ background: entry.color, opacity: .6 }} />{entry.title}
            </button>
            <p className="empty-start-desc">{entry.desc}</p>
          </div>
        )}
      </div>
    );
  }
  const rels = EDGES.filter(e => e.from === node.id || e.to === node.id);
  const containsRels = rels.filter(e => e.solid), otherRels = rels.filter(e => !e.solid);
  return (
    <div key={node.id} className="detail-wrap">
      <div className="detail-header">
        <div className="cat-dot" style={{ width: 14, height: 14, background: node.color }} />
        <h2>{node.title}</h2>
        <span className="detail-badge" style={{ background: node.color + "15", color: node.color }}>{CAT_META[node.cat]?.label}</span>
        <button className="detail-close" onClick={onClose} aria-label="Close detail panel">{"\u00d7"}</button>
      </div>
      <p className="detail-desc">{node.desc}</p>
      {node.items.map((it, i) => (
        <div key={i} className="detail-item">
          <span className="detail-item-dot" style={{ background: node.color }} />
          <span className="detail-item-text">
            {it.t}{it.loc && <code>{it.loc}</code>}
          </span>
        </div>
      ))}
      {rels.length > 0 && (
        <div className="detail-rels">
          {containsRels.length > 0 && <div style={{ marginBottom: 12 }}>
            <div className="detail-rels-title">Contains</div>
            <div className="detail-rels-list">{containsRels.map((e, j) => {
              const other = NODE_MAP.get(e.from === node.id ? e.to : e.from);
              return (<button key={j} className="detail-rel-chip" onClick={() => onNavigate(other?.id)} style={{ background: other?.color + "12", border: `1.5px solid ${other?.color}22`, color: other?.color }}>
                <span className="cat-dot" style={{ width: 6, height: 6, background: other?.color, opacity: .6 }} />{other?.title}
              </button>);
            })}</div>
          </div>}
          {otherRels.length > 0 && <div>
            <div className="detail-rels-title">Related to</div>
            <div className="detail-rels-list">{otherRels.map((e, j) => {
              const other = NODE_MAP.get(e.from === node.id ? e.to : e.from);
              const dir = e.from === node.id ? "\u2192" : "\u2190";
              return (<button key={j} className="detail-rel-chip" onClick={() => onNavigate(other?.id)} style={{ background: "var(--chip-bg)", border: "1px solid var(--border)" }}>
                <span className="cat-dot" style={{ width: 6, height: 6, background: other?.color, opacity: .5 }} />
                <span className="detail-rel-dir">{dir}</span>{other?.title}
                <span className="detail-rel-label">{e.label}</span>
              </button>);
            })}</div>
          </div>}
        </div>
      )}
      <div className="detail-links">{node.links.map((lk, j) => (
        <a key={j} href={lk.u} target="_blank" rel="noopener noreferrer" className="doc-link" style={{ color: node.color, border: `1.5px solid ${node.color}20` }}>
          {lk.l}<span className="doc-link-arrow">{"\u2197"}</span>
        </a>
      ))}</div>
    </div>
  );
}
