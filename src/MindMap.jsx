import { useState, useMemo } from "react";
import { NODES, EDGES, NODE_MAP, CX, CY, R1, R2, POS, SZ, SZ_HOVER, SZ_ACTIVE, FONT_SZ, crv } from "./data";

export default function MindMap({ activeId, hoveredId, showEdges, onSelect, onHover, filteredIds, hasFilter }) {
  const [hovEdge, setHovEdge] = useState(null);

  const litSet = useMemo(() => {
    const id = activeId || hoveredId;
    if (!id) return new Set();
    return new Set(EDGES.reduce((a, e, i) => (e.from === id || e.to === id) ? [...a, i] : a, []));
  }, [activeId, hoveredId]);

  const linkedNodes = useMemo(() => {
    if (litSet.size === 0) return new Set();
    const s = new Set();
    EDGES.forEach((e, i) => { if (litSet.has(i)) { s.add(e.from); s.add(e.to) } });
    return s;
  }, [litSet]);

  return (
    <svg viewBox="-160 -40 1320 1080" role="img" aria-label="Claude Code ecosystem mind map" style={{ width: "100%", display: "block" }}>
      {/* Ring guides */}
      <circle cx={CX} cy={CY} r={R1} fill="none" stroke="var(--fg)" strokeWidth="0.5" opacity="0.05" />
      <circle cx={CX} cy={CY} r={R2} fill="none" stroke="var(--fg)" strokeWidth="0.5" opacity="0.03" />
      {/* Spokes */}
      {NODES.map(n => { const p = POS[n.id], on = activeId === n.id, hv = hoveredId === n.id;
        const dimmed = hasFilter && !filteredIds.has(n.id);
        return <line key={`s-${n.id}`} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={n.color} strokeWidth={on ? 1 : .4} opacity={dimmed ? .005 : on ? .15 : hv ? .08 : .02} style={{ transition: "all .3s" }} />;
      })}
      {/* Edges */}
      {showEdges && EDGES.map((e, i) => { const { d, cpx, cpy } = crv(e.from, e.to); const col = NODE_MAP.get(e.from)?.color || "#888"; const hot = litSet.has(i) || hovEdge === i;
        const dimmed = hasFilter && (!filteredIds.has(e.from) || !filteredIds.has(e.to));
        return (<g key={`e-${i}`} style={{ opacity: dimmed ? .05 : 1, transition: "opacity .3s" }}>
          <path d={d} fill="none" stroke="transparent" strokeWidth="20" style={{ cursor: "pointer" }} onMouseEnter={() => setHovEdge(i)} onMouseLeave={() => setHovEdge(null)} />
          <path d={d} fill="none" stroke={col} strokeWidth={hot ? (e.solid ? 3 : 2) : (e.solid ? 1.8 : .7)} opacity={hot ? .6 : (e.solid ? .22 : .07)} strokeDasharray={e.solid ? "none" : (hot ? "7 4" : "3 5")} style={{ transition: "all .3s", pointerEvents: "none" }} />
          {hovEdge === i && <g style={{ pointerEvents: "none" }}><rect x={cpx - 80} y={cpy - 15} width={160} height={30} rx={8} fill="var(--tooltip-bg)" stroke={col} strokeWidth={e.solid ? 1.2 : .6} /><text x={cpx} y={cpy + 1} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="600" fill={col}>{e.label}</text></g>}
        </g>);
      })}
      {/* Center hub */}
      <circle cx={CX} cy={CY} r={56} fill="var(--fg)" opacity="0.035" />
      <text x={CX} y={CY - 9} textAnchor="middle" fontSize="21" fontWeight="700" fill="var(--fg)" opacity="0.8" style={{ letterSpacing: -.5 }}>Claude</text>
      <text x={CX} y={CY + 14} textAnchor="middle" fontSize="15" fontWeight="500" fill="var(--fg)" opacity="0.4">Code</text>
      {/* Nodes */}
      {NODES.map(n => { const p = POS[n.id], on = activeId === n.id, hv = hoveredId === n.id;
        const linked = linkedNodes.has(n.id);
        const dimmed = hasFilter && !filteredIds.has(n.id);
        const sz = on ? SZ_ACTIVE[n.size] : hv ? SZ_HOVER[n.size] : SZ[n.size];
        const labelR = (p.tier === 1 ? R1 : R2) + sz + 16;
        const lx = CX + labelR * Math.cos(p.a), ly = CY + labelR * Math.sin(p.a);
        const ca = Math.cos(p.a), anch = ca < -.25 ? "end" : ca > .25 ? "start" : "middle";
        const fontSize = FONT_SZ[n.size];
        const labelFontSize = n.tier === 1 ? 14 : 12;
        const nodeOpacity = dimmed ? .15 : on ? 1 : hv ? .95 : linked ? .85 : n.tier === 1 ? .8 : .65;
        const labelOpacity = dimmed ? .1 : on ? 1 : (hv || linked) ? .7 : n.tier === 1 ? .5 : .35;
        return (<g key={n.id} className="map-node" role="button" aria-label={n.title} tabIndex={0} style={{ cursor: "pointer", outline: "none" }}
          onClick={() => onSelect(n.id)} onKeyDown={e => e.key === "Enter" && onSelect(n.id)}
          onMouseEnter={() => onHover(n.id)} onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(n.id)} onBlur={() => onHover(null)}>
          {on && <circle cx={p.x} cy={p.y} r={sz + 9} fill="none" stroke={n.color} strokeWidth="2" opacity="0.25"><animate attributeName="r" values={`${sz + 7};${sz + 12};${sz + 7}`} dur="2.5s" repeatCount="indefinite" /></circle>}
          {linked && !on && <circle cx={p.x} cy={p.y} r={sz + 4} fill="none" stroke={n.color} strokeWidth="1" opacity="0.2" strokeDasharray="3 3" />}
          <circle className="node-circle" cx={p.x} cy={p.y} r={sz} fill={n.color} opacity={nodeOpacity} style={{ transition: "all .25s" }} />
          <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="central" fontSize={fontSize} fontWeight="600" fill="#fff" opacity={dimmed ? .3 : .95} style={{ pointerEvents: "none", letterSpacing: -.3 }}>{n.short}</text>
          <text x={lx} y={ly} textAnchor={anch} dominantBaseline="central" fontSize={labelFontSize} fontWeight={on ? "700" : linked ? "600" : "500"} fill="var(--fg)" opacity={labelOpacity} style={{ pointerEvents: "none", transition: "all .3s" }}>{n.title}</text>
        </g>);
      })}
    </svg>
  );
}
