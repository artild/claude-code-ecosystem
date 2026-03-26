import { useState, useMemo, useCallback } from "react";

const NODES = [
  { id:"claudemd", title:"CLAUDE.md", short:"CLAUDE", cat:"context", color:"#7F77DD",
    desc:"Persistent project memory loaded every session. Coding standards, architecture, libraries, checklists. Auto-memory saves learnings automatically.",
    items:[{t:"Project root",loc:"./CLAUDE.md or .claude/CLAUDE.md"},{t:"Global (all projects)",loc:"~/.claude/CLAUDE.md"},{t:"Subdirectory overrides",loc:"src/CLAUDE.md"},{t:"Auto-memory",loc:"~/.claude/MEMORY.md"},{t:"Priority: managed > user > project"},{t:"Bootstrap with /init command"}],
    links:[{l:"CLAUDE.md docs",u:"https://code.claude.com/docs/en/claude-md"},{l:"How it works",u:"https://code.claude.com/docs/en/how-claude-code-works"},{l:"Extension overview",u:"https://code.claude.com/docs/en/features-overview"}]},
  { id:"skills", title:"Skills", short:"Skills", cat:"extension", color:"#1D9E75",
    desc:"Reusable workflows in SKILL.md + scripts, templates, docs. Claude auto-invokes by description match, or trigger as /slash-commands.",
    items:[{t:"Project",loc:".claude/skills/<n>/SKILL.md"},{t:"Personal",loc:"~/.claude/skills/<n>/SKILL.md"},{t:"YAML frontmatter: name, description, tools, model"},{t:"Bundle scripts in any language alongside"},{t:"Works on Claude Code, Claude.ai, Desktop"},{t:"Context budget: 2% of context window"}],
    links:[{l:"Skills docs",u:"https://code.claude.com/docs/en/skills"},{l:"Skills in SDK",u:"https://platform.claude.com/docs/en/agent-sdk/skills"}]},
  { id:"commands", title:"Slash commands", short:"Cmds", cat:"extension", color:"#0F6E56",
    desc:"Explicit /commands you type. Legacy .claude/commands/ or modern Skills format. Built-in: /compact, /clear, /help, /init, /model.",
    items:[{t:"Project",loc:".claude/commands/*.md"},{t:"Personal",loc:"~/.claude/commands/*.md"},{t:"$ARGUMENTS placeholder for input"},{t:"Frontmatter: allowed-tools, description, model"},{t:"Prefix nesting: /tools:security-scan"},{t:"Built-in: /compact /clear /help /init /model"}],
    links:[{l:"Slash commands",u:"https://platform.claude.com/docs/en/agent-sdk/slash-commands"},{l:"Skills (new format)",u:"https://code.claude.com/docs/en/skills"}]},
  { id:"subagents", title:"Subagents", short:"Agents", cat:"extension", color:"#378ADD",
    desc:"Isolated Claude instances with own context. Delegate research, parallel work, specialized tasks without polluting your session.",
    items:[{t:"Project",loc:".claude/agents/*.md"},{t:"Personal",loc:"~/.claude/agents/*.md"},{t:"Create with /agents command"},{t:"YAML: name, description, tools, disallowedTools"},{t:"Built-in: Plan, Explore, Task"},{t:"Invoke: @agent-<n> or auto-delegation"},{t:"Session mode: claude --agent <n>"}],
    links:[{l:"Subagents docs",u:"https://code.claude.com/docs/en/sub-agents"},{l:"Subagents in SDK",u:"https://platform.claude.com/docs/en/agent-sdk/subagents"}]},
  { id:"teams", title:"Agent teams", short:"Teams", cat:"extension", color:"#185FA5",
    desc:"Multi-session collaboration. Lead coordinates, assigns tasks, merges results. Up to 10 teammates with peer-to-peer messaging. Experimental.",
    items:[{t:"Enable: CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1"},{t:"Lead + up to 10 teammates"},{t:"Own context + shared tasks",loc:"~/.claude/tasks/{team}/"},{t:"Peer-to-peer automatic messaging"},{t:"Hooks: TeammateIdle, TaskCompleted"},{t:"Teammates inherit lead permissions & MCP"}],
    links:[{l:"Agent teams docs",u:"https://code.claude.com/docs/en/agent-teams"}]},
  { id:"hooks", title:"Hooks", short:"Hooks", cat:"extension", color:"#D85A30",
    desc:"Deterministic scripts at lifecycle events. Not LLM judgment. Auto-lint, block commands, notifications, quality gates.",
    items:[{t:"Events: SessionStart, PreToolUse, PostToolUse, Stop, SubagentStart/Stop, TeammateIdle..."},{t:"Types: command, http, prompt, agent"},{t:"Matcher: regex on tool_name"},{t:"Exit code 2 = block + feedback"},{t:"Config",loc:".claude/settings.json"},{t:"Browse: /hooks command"}],
    links:[{l:"Hooks guide",u:"https://code.claude.com/docs/en/hooks-guide"},{l:"Hooks reference",u:"https://code.claude.com/docs/en/hooks"}]},
  { id:"mcp", title:"MCP", short:"MCP", cat:"extension", color:"#D4537E",
    desc:"Model Context Protocol — open standard for external tools. Databases, Jira, Slack, GitHub, Brave Search — no custom code.",
    items:[{t:"Transports: stdio, HTTP, streamable-http"},{t:"Project",loc:".mcp.json"},{t:"Personal",loc:"~/.claude/.mcp.json"},{t:"Tool search: auto-loads relevant tools only"},{t:"Popular: GitHub, Brave, Playwright, Supabase, Figma, Sentry..."},{t:"Subagents inherit MCP by default"}],
    links:[{l:"MCP in Claude Code",u:"https://code.claude.com/docs/en/mcp"},{l:"MCP in SDK",u:"https://platform.claude.com/docs/en/agent-sdk/mcp"},{l:"MCP specification",u:"https://modelcontextprotocol.io"}]},
  { id:"plugins", title:"Plugins", short:"Plugins", cat:"extension", color:"#993556",
    desc:"Package skills, agents, hooks, commands, MCP into shareable bundles. Marketplace distribution. Namespaced.",
    items:[{t:"Manifest",loc:".claude-plugin/plugin.json"},{t:"Contains: skills/ agents/ commands/ hooks/ .mcp.json"},{t:"Install: /plugin marketplace add <repo>"},{t:"Namespace: plugin-name:skill-name"},{t:"Priority: enterprise > user > project > plugin"}],
    links:[{l:"Plugins docs",u:"https://code.claude.com/docs/en/plugins"},{l:"Plugins in SDK",u:"https://platform.claude.com/docs/en/agent-sdk/plugins"},{l:"Official plugins",u:"https://github.com/anthropics/claude-code/tree/main/plugins"}]},
  { id:"tools", title:"Built-in tools", short:"Tools", cat:"runtime", color:"#73726c",
    desc:"The foundation. File ops, bash, web search, grep/glob, git, Agent tool. Everything else builds on this.",
    items:[{t:"Read, Write, Edit — file ops"},{t:"Bash — any shell command"},{t:"Grep, Glob — file search"},{t:"WebSearch, WebFetch — web"},{t:"Agent — spawn subagents"},{t:"Permission allowlists & denylists"}],
    links:[{l:"Tools reference",u:"https://code.claude.com/docs/en/tools"},{l:"Permissions",u:"https://code.claude.com/docs/en/permissions"}]},
  { id:"models", title:"Model agnostic", short:"Models", cat:"runtime", color:"#BA7517",
    desc:"Not locked to Anthropic. ANTHROPIC_BASE_URL routes to Ollama, OpenRouter, LiteLLM, Bedrock, Vertex AI.",
    items:[{t:"Ollama (local)",loc:"ANTHROPIC_BASE_URL=http://localhost:11434"},{t:"OpenRouter: 300+ models, drop-in"},{t:"LiteLLM: local proxy, multi-provider"},{t:"Local: qwen3-coder, devstral, glm, deepseek..."},{t:"Cloud: Bedrock, Vertex AI, Foundry"},{t:"3 slots: Haiku / Sonnet / Opus"},{t:"opusplan: built-in model routing"}],
    links:[{l:"Ollama guide",u:"https://docs.ollama.com/integrations/claude-code"},{l:"Third-party",u:"https://code.claude.com/docs/en/third-party-integrations"},{l:"LLM gateway",u:"https://code.claude.com/docs/en/llm-gateway"}]},
  { id:"sdk", title:"Agent SDK", short:"SDK", cat:"runtime", color:"#639922",
    desc:"Claude Code as a library. Full tools, subagents, skills, hooks, MCP, plugins — programmatic. TypeScript & Python.",
    items:[{t:"npm: @anthropic-ai/claude-agent-sdk"},{t:"pip: claude-agent-sdk"},{t:"query() streams messages, controls turns"},{t:"All filesystem config works"},{t:"Custom tools & MCP connections"},{t:"Build: SRE bots, reviewers, CI agents"}],
    links:[{l:"SDK overview",u:"https://code.claude.com/docs/en/sdk/sdk-overview"},{l:"SDK quickstart",u:"https://platform.claude.com/docs/en/agent-sdk/quickstart"}]},
  { id:"envs", title:"Environments", short:"Envs", cat:"runtime", color:"#5F5E5A",
    desc:"Terminal, VS Code, JetBrains, Desktop, Web, GitHub Actions, GitLab CI, Slack. Same engine everywhere.",
    items:[{t:"Terminal CLI — primary"},{t:"VS Code — diffs, @-mentions, plans"},{t:"JetBrains — IDEA, PyCharm, WebStorm"},{t:"Desktop — macOS & Windows"},{t:"Web — claude.ai/code"},{t:"GitHub Actions & GitLab CI/CD"},{t:"Slack — @Claude → get a PR"}],
    links:[{l:"Overview",u:"https://code.claude.com/docs/en/overview"},{l:"VS Code",u:"https://code.claude.com/docs/en/vscode"},{l:"GitHub Actions",u:"https://code.claude.com/docs/en/github-actions"}]},
];

const EDGES = [
  {from:"plugins",to:"skills",label:"contains skills/",solid:true},
  {from:"plugins",to:"subagents",label:"contains agents/",solid:true},
  {from:"plugins",to:"commands",label:"contains commands/",solid:true},
  {from:"plugins",to:"hooks",label:"contains hooks/",solid:true},
  {from:"plugins",to:"mcp",label:"contains .mcp.json",solid:true},
  {from:"skills",to:"commands",label:"invoked as /slash"},
  {from:"subagents",to:"teams",label:"teammates are agents"},
  {from:"mcp",to:"subagents",label:"tools inherited"},
  {from:"hooks",to:"subagents",label:"SubagentStart/Stop"},
  {from:"hooks",to:"teams",label:"TeammateIdle hook"},
  {from:"hooks",to:"tools",label:"PreToolUse/Post"},
  {from:"sdk",to:"plugins",label:"loads via code"},
  {from:"sdk",to:"subagents",label:"agents param"},
  {from:"models",to:"tools",label:"powers tool loop"},
  {from:"teams",to:"mcp",label:"inherits MCP"},
  {from:"claudemd",to:"skills",label:"context loaded"},
];

const CAT_META = {context:{label:"Context",color:"#7F77DD"},extension:{label:"Extensions",color:"#D4537E"},runtime:{label:"Runtime",color:"#BA7517"}};
const ORDER = ["claudemd","skills","commands","subagents","teams","hooks","mcp","plugins","tools","models","sdk","envs"];
const CX=400, CY=400, R=280;
const POS={};
ORDER.forEach((id,i)=>{const a=(i/ORDER.length)*Math.PI*2-Math.PI/2;POS[id]={x:CX+R*Math.cos(a),y:CY+R*Math.sin(a),a};});

function crv(fid,tid){
  const p1=POS[fid],p2=POS[tid],mx=(p1.x+p2.x)/2,my=(p1.y+p2.y)/2;
  const dx=mx-CX,dy=my-CY,dist=Math.sqrt(dx*dx+dy*dy)||1;
  const ad=Math.abs(p1.a-p2.a),norm=Math.min(ad,Math.PI*2-ad)/Math.PI;
  const bulge=35+norm*55,cpx=mx+(dx/dist)*bulge,cpy=my+(dy/dist)*bulge;
  return{d:`M${p1.x},${p1.y} Q${cpx},${cpy} ${p2.x},${p2.y}`,cpx,cpy};
}

function MindMap({activeId,hoveredId,showEdges,onSelect,onHover}){
  const[hovEdge,setHovEdge]=useState(null);
  const litIdx=useMemo(()=>{const id=activeId||hoveredId;if(!id)return[];return EDGES.reduce((a,e,i)=>(e.from===id||e.to===id)?[...a,i]:a,[]);},[activeId,hoveredId]);

  return(
    <svg viewBox="0 0 800 800" style={{width:"100%",display:"block"}}>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.07"/>
      {NODES.map(n=>{const p=POS[n.id],on=activeId===n.id,hv=hoveredId===n.id;
        return <line key={`s-${n.id}`} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={n.color} strokeWidth={on?1:.4} opacity={on?.2:hv?.1:.03} style={{transition:"all .3s"}}/>;
      })}
      {showEdges&&EDGES.map((e,i)=>{const{d,cpx,cpy}=crv(e.from,e.to);const col=NODES.find(n=>n.id===e.from)?.color||"#888";const hot=litIdx.includes(i)||hovEdge===i;
        return(<g key={`e-${i}`}>
          <path d={d} fill="none" stroke="transparent" strokeWidth="20" style={{cursor:"pointer"}} onMouseEnter={()=>setHovEdge(i)} onMouseLeave={()=>setHovEdge(null)}/>
          <path d={d} fill="none" stroke={col} strokeWidth={hot?(e.solid?3:2):(e.solid?1.8:.7)} opacity={hot?.6:(e.solid?.22:.07)} strokeDasharray={e.solid?"none":(hot?"7 4":"3 5")} style={{transition:"all .3s",pointerEvents:"none"}}/>
          {hot&&<g style={{pointerEvents:"none"}}><rect x={cpx-68} y={cpy-13} width={136} height={26} rx={8} fill="rgba(255,255,255,0.95)" stroke={col} strokeWidth={e.solid?1.2:.6}/><text x={cpx} y={cpy+1} textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="600" fill={col}>{e.label}</text></g>}
        </g>);
      })}
      <circle cx={CX} cy={CY} r={44} fill="currentColor" opacity="0.035"/>
      <text x={CX} y={CY-7} textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor" opacity="0.6" style={{letterSpacing:-.5}}>Claude</text>
      <text x={CX} y={CY+12} textAnchor="middle" fontSize="12" fontWeight="500" fill="currentColor" opacity="0.28">Code</text>
      {NODES.map(n=>{const p=POS[n.id],on=activeId===n.id,hv=hoveredId===n.id;
        const linked=litIdx.length>0&&EDGES.some((e,i)=>litIdx.includes(i)&&(e.from===n.id||e.to===n.id));
        const sz=on?36:hv?33:28,lr=R+50,lx=CX+lr*Math.cos(p.a),ly=CY+lr*Math.sin(p.a);
        const ca=Math.cos(p.a),anch=ca<-.25?"end":ca>.25?"start":"middle";
        return(<g key={n.id} style={{cursor:"pointer"}} onClick={()=>onSelect(n.id)} onMouseEnter={()=>onHover(n.id)} onMouseLeave={()=>onHover(null)}>
          {on&&<circle cx={p.x} cy={p.y} r={sz+9} fill="none" stroke={n.color} strokeWidth="2" opacity="0.25"><animate attributeName="r" values={`${sz+7};${sz+12};${sz+7}`} dur="2.5s" repeatCount="indefinite"/></circle>}
          {linked&&!on&&<circle cx={p.x} cy={p.y} r={sz+4} fill="none" stroke={n.color} strokeWidth="1" opacity="0.2" strokeDasharray="3 3"/>}
          <circle cx={p.x} cy={p.y} r={sz} fill={n.color} opacity={on?1:hv?.92:linked?.8:.6} style={{transition:"all .25s"}}/>
          <text x={p.x} y={p.y+1} textAnchor="middle" dominantBaseline="central" fontSize={n.short.length>6?8.5:10.5} fontWeight="600" fill="#fff" opacity=".95" style={{pointerEvents:"none",letterSpacing:-.3}}>{n.short}</text>
          <text x={lx} y={ly} textAnchor={anch} dominantBaseline="central" fontSize="11.5" fontWeight={on?"700":linked?"600":"400"} fill="currentColor" opacity={on?.88:(hv||linked)?.55:.28} style={{pointerEvents:"none",transition:"all .3s"}}>{n.title}</text>
        </g>);
      })}
    </svg>
  );
}

function Detail({node,onClose}){
  if(!node)return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",textAlign:"center",padding:"40px 24px",opacity:.2}}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" style={{marginBottom:16}}>
        <circle cx="24" cy="24" r="20" strokeDasharray="4 4"/><circle cx="24" cy="24" r="4" fill="currentColor" opacity=".3"/>
        <line x1="24" y1="4" x2="24" y2="12"/><line x1="24" y1="36" x2="24" y2="44"/>
        <line x1="4" y1="24" x2="12" y2="24"/><line x1="36" y1="24" x2="44" y2="24"/>
      </svg>
      <div style={{fontSize:14,fontWeight:500,marginBottom:6}}>Click a node</div>
      <div style={{fontSize:12,opacity:.6}}>Explore docs, paths, and connections</div>
    </div>
  );
  const rels=EDGES.filter(e=>e.from===node.id||e.to===node.id);
  const containsRels=rels.filter(e=>e.solid),otherRels=rels.filter(e=>!e.solid);
  return(
    <div key={node.id} style={{animation:"fadeIn .2s ease",padding:"24px 0"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,paddingBottom:16,borderBottom:"1px solid rgba(0,0,0,.06)",marginBottom:18}}>
        <div style={{width:14,height:14,borderRadius:"50%",background:node.color,flexShrink:0}}/>
        <h2 style={{fontSize:19,fontWeight:700,flex:1,letterSpacing:-.5}}>{node.title}</h2>
        <span style={{fontSize:10,padding:"3px 10px",borderRadius:14,background:node.color+"15",color:node.color,fontWeight:600}}>{CAT_META[node.cat]?.label}</span>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",opacity:.25,lineHeight:1,color:"inherit"}}>×</button>
      </div>
      <p style={{fontSize:14,lineHeight:1.7,opacity:.55,marginBottom:20}}>{node.desc}</p>
      {node.items.map((it,i)=>(
        <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"7px 0",borderTop:i>0?"1px solid rgba(0,0,0,.04)":"none"}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:node.color,opacity:.3,flexShrink:0,marginTop:8}}/>
          <span style={{fontSize:13.5,lineHeight:1.55}}>
            {it.t}{it.loc&&<code style={{display:"inline-block",fontSize:11,background:"rgba(0,0,0,.03)",padding:"2px 8px",borderRadius:5,marginLeft:8,fontFamily:"ui-monospace,'SF Mono',Monaco,monospace",wordBreak:"break-all"}}>{it.loc}</code>}
          </span>
        </div>
      ))}
      {rels.length>0&&(
        <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid rgba(0,0,0,.06)"}}>
          {containsRels.length>0&&<div style={{marginBottom:12}}>
            <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1.2,opacity:.3,marginBottom:8}}>Contains</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{containsRels.map((e,j)=>{
              const other=NODES.find(n=>n.id===(e.from===node.id?e.to:e.from));
              return(<span key={j} style={{fontSize:12,padding:"5px 12px",borderRadius:8,background:other?.color+"12",border:`1.5px solid ${other?.color}22`,color:other?.color,fontWeight:600,display:"inline-flex",alignItems:"center",gap:5}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:other?.color,opacity:.6}}/>{other?.title}
              </span>);
            })}</div>
          </div>}
          {otherRels.length>0&&<div>
            <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1.2,opacity:.3,marginBottom:8}}>Related to</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{otherRels.map((e,j)=>{
              const other=NODES.find(n=>n.id===(e.from===node.id?e.to:e.from));
              const dir=e.from===node.id?"\u2192":"\u2190";
              return(<span key={j} style={{fontSize:12,padding:"5px 12px",borderRadius:8,background:"rgba(0,0,0,.025)",border:"1px solid rgba(0,0,0,.05)",display:"inline-flex",alignItems:"center",gap:5}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:other?.color,opacity:.5}}/>
                <span style={{opacity:.4,fontSize:10}}>{dir}</span>{other?.title}
                <span style={{opacity:.3,fontSize:10}}>{e.label}</span>
              </span>);
            })}</div>
          </div>}
        </div>
      )}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:22}}>{node.links.map((lk,j)=>(
        <a key={j} href={lk.u} target="_blank" rel="noopener noreferrer" style={{fontSize:12.5,fontWeight:600,color:node.color,textDecoration:"none",padding:"7px 16px",border:`1.5px solid ${node.color}20`,borderRadius:10,display:"inline-flex",alignItems:"center",gap:5,transition:"all .15s"}}
          onMouseEnter={ev=>{ev.currentTarget.style.background=node.color+"0a";ev.currentTarget.style.borderColor=node.color+"40"}}
          onMouseLeave={ev=>{ev.currentTarget.style.background="transparent";ev.currentTarget.style.borderColor=node.color+"20"}}>
          {lk.l}<span style={{fontSize:10,opacity:.5}}>{"\u2197"}</span>
        </a>
      ))}</div>
    </div>
  );
}

export default function App(){
  const[activeId,setActiveId]=useState(null);
  const[hoveredId,setHoveredId]=useState(null);
  const[showEdges,setShowEdges]=useState(true);
  const activeNode=NODES.find(n=>n.id===activeId)||null;
  const handleSelect=useCallback(id=>setActiveId(p=>p===id?null:id),[]);

  return(
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",minHeight:"100vh",background:"#faf9f7",color:"#2a2a28"}}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:#D4537E30}
        @media(max-width:900px){
          .cc-layout{flex-direction:column!important}
          .cc-detail{max-width:100%!important;border-left:none!important;border-top:1px solid rgba(0,0,0,.06)!important;padding-left:0!important}
        }
      `}</style>

      <header style={{padding:"20px 24px 0",maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontSize:22,fontWeight:700,letterSpacing:-.8}}>Claude Code <span style={{fontWeight:400,opacity:.3}}>/</span><span style={{fontWeight:400,opacity:.4}}> ecosystem</span></h1>
          <p style={{fontSize:12,opacity:.3,marginTop:3}}>Click nodes · hover edges · follow doc links</p>
        </div>
        <div style={{display:"flex",gap:16,alignItems:"center",fontSize:11,fontWeight:500,opacity:.4}}>
          {Object.values(CAT_META).map(c=>(
            <span key={c.label} style={{display:"flex",alignItems:"center",gap:4}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:c.color}}/>{c.label}
            </span>
          ))}
          {showEdges&&<>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:14,height:2,background:"#993556",borderRadius:1}}/>contains</span>
            <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:14,borderTop:"1.5px dashed rgba(0,0,0,.3)"}}/>relates</span>
          </>}
          <button onClick={()=>setShowEdges(p=>!p)} style={{display:"flex",alignItems:"center",gap:5,background:"none",border:`1px solid rgba(0,0,0,${showEdges?.1:.05})`,borderRadius:8,cursor:"pointer",fontSize:11,fontWeight:600,padding:"5px 12px",opacity:showEdges?.6:.3,color:"inherit",transition:"all .2s"}}>
            <svg width="14" height="7" viewBox="0 0 14 7"><path d="M1 6Q7 0 13 6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/></svg>{showEdges?"On":"Off"}
          </button>
        </div>
      </header>

      <div className="cc-layout" style={{maxWidth:1400,margin:"0 auto",padding:"0 24px 40px",display:"flex",gap:0,alignItems:"stretch",minHeight:"80vh"}}>
        <div style={{flex:"1 1 58%",minWidth:0,padding:"8px 0"}}>
          <MindMap activeId={activeId} hoveredId={hoveredId} showEdges={showEdges} onSelect={handleSelect} onHover={setHoveredId}/>
        </div>
        <div className="cc-detail" style={{flex:"1 1 38%",maxWidth:480,borderLeft:"1px solid rgba(0,0,0,.06)",paddingLeft:28,overflowY:"auto",minHeight:400}}>
          <Detail node={activeNode} onClose={()=>setActiveId(null)}/>
        </div>
      </div>

      <footer style={{textAlign:"center",padding:"16px",fontSize:10,opacity:.2,borderTop:"1px solid rgba(0,0,0,.04)"}}>
        Links → code.claude.com · platform.claude.com · modelcontextprotocol.io · docs.ollama.com
      </footer>
    </div>
  );
}
