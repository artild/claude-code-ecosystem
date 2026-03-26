import { useState, useMemo } from "react";
import { NODES, EDGES, CX, CY, R, POS, crv } from "./data";

export default function MindMap({ activeId, hoveredId, showEdges, onSelect, onHover }) {
  const [hovEdge, setHovEdge] = useState(null);
  const litIdx = useMemo(() => {
    const id = activeId || hoveredId;
    if (!id) return [];
    return EDGES.reduce((a, e, i) => (e.from === id || e.to === id) ? [...a, i] : a, []);
  }, [activeId, hoveredId]);

  return (
    <svg viewBox="0 0 1000 1000" role="img" aria-label="Claude Code ecosystem mind map" style={{ width: "100%", display: "block" }}>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--fg)" strokeWidth="0.5" opacity="0.07" />
      {NODES.map(n => { const p = POS[n.id], on = activeId === n.id, hv = hoveredId === n.id;
        return <line key={`s-${n.id}`} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={n.color} strokeWidth={on ? 1 : .4} opacity={on ? .2 : hv ? .1 : .03} style={{ transition: "all .3s" }} />;
      })}
      {showEdges && EDGES.map((e, i) => { const { d, cpx, cpy } = crv(e.from, e.to); const col = NODES.find(n => n.id === e.from)?.color || "#888"; const hot = litIdx.includes(i) || hovEdge === i;
        return (<g key={`e-${i}`}>
          <path d={d} fill="none" stroke="transparent" strokeWidth="20" style={{ cursor: "pointer" }} onMouseEnter={() => setHovEdge(i)} onMouseLeave={() => setHovEdge(null)} />
          <path d={d} fill="none" stroke={col} strokeWidth={hot ? (e.solid ? 3 : 2) : (e.solid ? 1.8 : .7)} opacity={hot ? .6 : (e.solid ? .22 : .07)} strokeDasharray={e.solid ? "none" : (hot ? "7 4" : "3 5")} style={{ transition: "all .3s", pointerEvents: "none" }} />
          {hot && <g style={{ pointerEvents: "none" }}><rect x={cpx - 80} y={cpy - 15} width={160} height={30} rx={8} fill="var(--tooltip-bg)" stroke={col} strokeWidth={e.solid ? 1.2 : .6} /><text x={cpx} y={cpy + 1} textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="600" fill={col}>{e.label}</text></g>}
        </g>);
      })}
      <circle cx={CX} cy={CY} r={56} fill="var(--fg)" opacity="0.035" />
      <text x={CX} y={CY - 9} textAnchor="middle" fontSize="21" fontWeight="700" fill="var(--fg)" opacity="0.6" style={{ letterSpacing: -.5 }}>Claude</text>
      <text x={CX} y={CY + 14} textAnchor="middle" fontSize="15" fontWeight="500" fill="var(--fg)" opacity="0.28">Code</text>
      {NODES.map(n => { const p = POS[n.id], on = activeId === n.id, hv = hoveredId === n.id;
        const linked = litIdx.length > 0 && EDGES.some((e, i) => litIdx.includes(i) && (e.from === n.id || e.to === n.id));
        const sz = on ? 46 : hv ? 42 : 36, lr = R + 60, lx = CX + lr * Math.cos(p.a), ly = CY + lr * Math.sin(p.a);
        const ca = Math.cos(p.a), anch = ca < -.25 ? "end" : ca > .25 ? "start" : "middle";
        return (<g key={n.id} role="button" aria-label={n.title} tabIndex={0} style={{ cursor: "pointer", outline: "none" }}
          onClick={() => onSelect(n.id)} onKeyDown={e => e.key === "Enter" && onSelect(n.id)}
          onMouseEnter={() => onHover(n.id)} onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(n.id)} onBlur={() => onHover(null)}>
          {on && <circle cx={p.x} cy={p.y} r={sz + 9} fill="none" stroke={n.color} strokeWidth="2" opacity="0.25"><animate attributeName="r" values={`${sz + 7};${sz + 12};${sz + 7}`} dur="2.5s" repeatCount="indefinite" /></circle>}
          {linked && !on && <circle cx={p.x} cy={p.y} r={sz + 4} fill="none" stroke={n.color} strokeWidth="1" opacity="0.2" strokeDasharray="3 3" />}
          <circle cx={p.x} cy={p.y} r={sz} fill={n.color} opacity={on ? 1 : hv ? .92 : linked ? .8 : .6} style={{ transition: "all .25s" }} />
          <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="central" fontSize={n.short.length > 6 ? 11 : 13.5} fontWeight="600" fill="#fff" opacity=".95" style={{ pointerEvents: "none", letterSpacing: -.3 }}>{n.short}</text>
          <text x={lx} y={ly} textAnchor={anch} dominantBaseline="central" fontSize="14" fontWeight={on ? "700" : linked ? "600" : "400"} fill="var(--fg)" opacity={on ? .88 : (hv || linked) ? .55 : .28} style={{ pointerEvents: "none", transition: "all .3s" }}>{n.title}</text>
        </g>);
      })}
    </svg>
  );
}
