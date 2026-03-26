export const NODES = [
  // === Tier 1: Core building blocks (inner ring) ===
  { id:"claudemd", title:"CLAUDE.md", short:"CLAUDE", cat:"context", color:"#7F77DD", tier:1, size:3,
    desc:"Persistent project instructions loaded every session. Coding standards, architecture, libraries, checklists. The foundation of project context.",
    items:[{t:"Project root",loc:"./CLAUDE.md or .claude/CLAUDE.md"},{t:"Global (all projects)",loc:"~/.claude/CLAUDE.md"},{t:"Subdirectory overrides",loc:"src/CLAUDE.md"},{t:"Priority: managed > user > project"},{t:"Bootstrap with /init command"}],
    links:[{l:"Memory & CLAUDE.md",u:"https://code.claude.com/docs/en/memory"},{l:"How it works",u:"https://code.claude.com/docs/en/how-claude-code-works"},{l:"Extension overview",u:"https://code.claude.com/docs/en/features-overview"}]},
  { id:"skills", title:"Skills", short:"Skills", cat:"extension", color:"#1D9E75", tier:1, size:3,
    desc:"Reusable workflows in SKILL.md + scripts, templates, docs. Claude auto-invokes by description match, or trigger as /slash-commands.",
    items:[{t:"Project",loc:".claude/skills/<n>/SKILL.md"},{t:"Personal",loc:"~/.claude/skills/<n>/SKILL.md"},{t:"YAML frontmatter: name, description, tools, model"},{t:"Bundle scripts in any language alongside"},{t:"Works on Claude Code, Claude.ai, Desktop"},{t:"Context budget: 2% of context window"}],
    links:[{l:"Skills docs",u:"https://code.claude.com/docs/en/skills"},{l:"Skills in SDK",u:"https://platform.claude.com/docs/en/agent-sdk/skills"}]},
  { id:"subagents", title:"Subagents", short:"Agents", cat:"extension", color:"#378ADD", tier:1, size:3,
    desc:"Isolated Claude instances with own context. Delegate research, parallel work, specialized tasks without polluting your session.",
    items:[{t:"Project",loc:".claude/agents/*.md"},{t:"Personal",loc:"~/.claude/agents/*.md"},{t:"Create with /agents command"},{t:"YAML: name, description, tools, disallowedTools"},{t:"Built-in: Plan, Explore, Task"},{t:"Invoke: @agent-<n> or auto-delegation"},{t:"Session mode: claude --agent <n>"}],
    links:[{l:"Subagents docs",u:"https://code.claude.com/docs/en/sub-agents"},{l:"Subagents in SDK",u:"https://platform.claude.com/docs/en/agent-sdk/subagents"}]},
  { id:"mcp", title:"MCP", short:"MCP", cat:"extension", color:"#D4537E", tier:1, size:3,
    desc:"Model Context Protocol — open standard for external tools. Databases, Jira, Slack, GitHub, Brave Search — no custom code.",
    items:[{t:"Transports: stdio, HTTP, streamable-http"},{t:"Project",loc:".mcp.json"},{t:"Personal",loc:"~/.claude/.mcp.json"},{t:"Tool search: auto-loads relevant tools only"},{t:"Popular: GitHub, Brave, Playwright, Supabase, Figma, Sentry..."},{t:"Subagents inherit MCP by default"}],
    links:[{l:"MCP in Claude Code",u:"https://code.claude.com/docs/en/mcp"},{l:"MCP in SDK",u:"https://platform.claude.com/docs/en/agent-sdk/mcp"},{l:"MCP specification",u:"https://modelcontextprotocol.io"}]},
  { id:"hooks", title:"Hooks", short:"Hooks", cat:"extension", color:"#D85A30", tier:1, size:2,
    desc:"Deterministic scripts at lifecycle events. Not LLM judgment. Auto-lint, block commands, notifications, quality gates.",
    items:[{t:"Events: SessionStart, PreToolUse, PostToolUse, Stop, SubagentStart/Stop, TeammateIdle..."},{t:"Types: command, http, prompt, agent"},{t:"Matcher: regex on tool_name"},{t:"Exit code 2 = block + feedback"},{t:"Config",loc:".claude/settings.json"},{t:"Browse: /hooks command"}],
    links:[{l:"Hooks guide",u:"https://code.claude.com/docs/en/hooks-guide"},{l:"Hooks reference",u:"https://code.claude.com/docs/en/hooks"}]},
  { id:"plugins", title:"Plugins", short:"Plugins", cat:"extension", color:"#993556", tier:1, size:2,
    desc:"Package skills, agents, hooks, commands, MCP into shareable bundles. Marketplace distribution. Namespaced.",
    items:[{t:"Manifest",loc:".claude-plugin/plugin.json"},{t:"Contains: skills/ agents/ commands/ hooks/ .mcp.json"},{t:"Install: /plugin marketplace add <repo>"},{t:"Namespace: plugin-name:skill-name"},{t:"Priority: enterprise > user > project > plugin"}],
    links:[{l:"Plugins docs",u:"https://code.claude.com/docs/en/plugins"},{l:"Plugins in SDK",u:"https://platform.claude.com/docs/en/agent-sdk/plugins"},{l:"Official plugins",u:"https://github.com/anthropics/claude-code/tree/main/plugins"}]},
  { id:"tools", title:"Built-in tools", short:"Tools", cat:"runtime", color:"#73726c", tier:1, size:3,
    desc:"The foundation. File ops, bash, web search, grep/glob, git, Agent tool. Everything else builds on this.",
    items:[{t:"Read, Write, Edit — file ops"},{t:"Bash — any shell command"},{t:"Grep, Glob — file search"},{t:"WebSearch, WebFetch — web"},{t:"Agent — spawn subagents"},{t:"Permission allowlists & denylists"}],
    links:[{l:"Tools reference",u:"https://code.claude.com/docs/en/tools-reference"},{l:"Permissions",u:"https://code.claude.com/docs/en/permissions"}]},
  { id:"sdk", title:"Agent SDK", short:"SDK", cat:"runtime", color:"#639922", tier:1, size:2,
    desc:"Claude Code as a library. Full tools, subagents, skills, hooks, MCP, plugins — programmatic. TypeScript & Python.",
    items:[{t:"npm: @anthropic-ai/claude-agent-sdk"},{t:"pip: claude-agent-sdk"},{t:"query() streams messages, controls turns"},{t:"All filesystem config works"},{t:"Custom tools & MCP connections"},{t:"Build: SRE bots, reviewers, CI agents"}],
    links:[{l:"SDK overview",u:"https://platform.claude.com/docs/en/agent-sdk/overview"},{l:"SDK quickstart",u:"https://platform.claude.com/docs/en/agent-sdk/quickstart"}]},

  // === Tier 2: Supporting features (outer ring) ===
  { id:"memory", title:"Memory", short:"Memory", cat:"context", color:"#9B6DD7", tier:2, size:2,
    desc:"Auto-memory system that saves learnings across sessions. User preferences, feedback, project context, references — builds up over time without manual effort.",
    items:[{t:"Index file",loc:"~/.claude/MEMORY.md"},{t:"Memory files",loc:"~/.claude/projects/<id>/memory/*.md"},{t:"Types: user, feedback, project, reference"},{t:"YAML frontmatter: name, description, type"},{t:"Auto-saved from conversation context"},{t:"Loaded when relevant to current task"}],
    links:[{l:"Memory docs",u:"https://code.claude.com/docs/en/memory"}]},
  { id:"sessions", title:"Sessions", short:"Sessions", cat:"context", color:"#6B5FC7", tier:2, size:2,
    desc:"Persistent conversation threads that survive restarts. Resume previous work, branch into new directions, or continue where you left off.",
    items:[{t:"Resume last session",loc:"claude --continue"},{t:"Resume specific session",loc:"claude --resume <id>"},{t:"List sessions",loc:"claude sessions list"},{t:"Session storage",loc:"~/.claude/projects/<id>/sessions/"},{t:"Each session has full message history"},{t:"Compact: /compact to shrink context"}],
    links:[{l:"CLI reference",u:"https://code.claude.com/docs/en/cli-reference"}]},
  { id:"commands", title:"Slash commands", short:"Cmds", cat:"extension", color:"#0F6E56", tier:2, size:1,
    desc:"Explicit /commands you type. Legacy .claude/commands/ or modern Skills format. Built-in: /compact, /clear, /help, /init, /model.",
    items:[{t:"Project",loc:".claude/commands/*.md"},{t:"Personal",loc:"~/.claude/commands/*.md"},{t:"$ARGUMENTS placeholder for input"},{t:"Frontmatter: allowed-tools, description, model"},{t:"Prefix nesting: /tools:security-scan"},{t:"Built-in: /compact /clear /help /init /model"}],
    links:[{l:"Slash commands",u:"https://platform.claude.com/docs/en/agent-sdk/slash-commands"},{l:"Skills (new format)",u:"https://code.claude.com/docs/en/skills"}]},
  { id:"teams", title:"Agent teams", short:"Teams", cat:"extension", color:"#185FA5", tier:2, size:1,
    desc:"Multi-session collaboration. Lead coordinates, assigns tasks, merges results. Up to 10 teammates with peer-to-peer messaging. Experimental.",
    items:[{t:"Enable: CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1"},{t:"Lead + up to 10 teammates"},{t:"Own context + shared tasks",loc:"~/.claude/tasks/{team}/"},{t:"Peer-to-peer automatic messaging"},{t:"Hooks: TeammateIdle, TaskCompleted"},{t:"Teammates inherit lead permissions & MCP"}],
    links:[{l:"Agent teams docs",u:"https://code.claude.com/docs/en/agent-teams"}]},
  { id:"models", title:"Model agnostic", short:"Models", cat:"runtime", color:"#BA7517", tier:2, size:2,
    desc:"Not locked to Anthropic. ANTHROPIC_BASE_URL routes to Ollama, OpenRouter, LiteLLM, Bedrock, Vertex AI.",
    items:[{t:"Ollama (local)",loc:"ANTHROPIC_BASE_URL=http://localhost:11434"},{t:"OpenRouter: 300+ models, drop-in"},{t:"LiteLLM: local proxy, multi-provider"},{t:"Local: qwen3-coder, devstral, glm, deepseek..."},{t:"Cloud: Bedrock, Vertex AI, Foundry"},{t:"3 slots: Haiku / Sonnet / Opus"},{t:"opusplan: built-in model routing"}],
    links:[{l:"Ollama guide",u:"https://docs.ollama.com/integrations/claude-code"},{l:"Third-party",u:"https://code.claude.com/docs/en/third-party-integrations"},{l:"LLM gateway",u:"https://code.claude.com/docs/en/llm-gateway"}]},
  { id:"envs", title:"Environments", short:"Envs", cat:"runtime", color:"#5F5E5A", tier:2, size:2,
    desc:"Terminal, VS Code, JetBrains, Desktop, Web, GitHub Actions, GitLab CI, Slack. Same engine everywhere.",
    items:[{t:"Terminal CLI — primary"},{t:"VS Code — diffs, @-mentions, plans"},{t:"JetBrains — IDEA, PyCharm, WebStorm"},{t:"Desktop — macOS & Windows"},{t:"Web — claude.ai/code"},{t:"GitHub Actions & GitLab CI/CD"},{t:"Slack — @Claude → get a PR"}],
    links:[{l:"Overview",u:"https://code.claude.com/docs/en/overview"},{l:"VS Code",u:"https://code.claude.com/docs/en/vs-code"},{l:"GitHub Actions",u:"https://code.claude.com/docs/en/github-actions"}]},
  { id:"permissions", title:"Permissions", short:"Perms", cat:"runtime", color:"#C44B2B", tier:2, size:2,
    desc:"Control what Claude can do. Allowlists, denylists, trust modes. Per-tool, per-project, per-command granularity.",
    items:[{t:"Trust modes: Yolo / Normal / Paranoid"},{t:"Tool allowlists",loc:".claude/settings.json → allowedTools"},{t:"Tool denylists",loc:".claude/settings.json → disallowedTools"},{t:"Per-command patterns: Bash(npm*)"},{t:"Prompt before risky operations"},{t:"Enterprise policy overrides"}],
    links:[{l:"Permissions docs",u:"https://code.claude.com/docs/en/permissions"}]},
  { id:"settings", title:"Settings", short:"Settings", cat:"runtime", color:"#8B7355", tier:2, size:2,
    desc:"Configuration layer — settings.json at project, user, and enterprise levels. Model defaults, permissions, hooks, env vars.",
    items:[{t:"Project",loc:".claude/settings.json"},{t:"User",loc:"~/.claude/settings.json"},{t:"Enterprise (managed)",loc:"managed policy"},{t:"Priority: enterprise > user > project"},{t:"Keys: model, permissions, hooks, env"},{t:"Browse: /settings command"}],
    links:[{l:"Settings reference",u:"https://code.claude.com/docs/en/cli-reference"}]},
  { id:"plans", title:"Plans", short:"Plans", cat:"context", color:"#5B8FA8", tier:2, size:1,
    desc:"Structured thinking before implementation. Enter plan mode, design approach, get alignment, then execute. Prevents wasted effort on wrong direction.",
    items:[{t:"Enter: /plan or shift+tab"},{t:"Plan files saved to session"},{t:"Read-only: no edits in plan mode"},{t:"Exit to execute the plan"},{t:"Subagent: built-in Plan agent"},{t:"Great for complex multi-step tasks"}],
    links:[{l:"Features overview",u:"https://code.claude.com/docs/en/features-overview"}]},
  { id:"worktrees", title:"Worktrees", short:"Worktree", cat:"extension", color:"#4A7B6F", tier:2, size:1,
    desc:"Git worktree isolation for parallel agent work. Each subagent gets its own copy of the repo — no conflicts, no locks, clean merges.",
    items:[{t:"Flag: isolation: \"worktree\""},{t:"Auto-creates temp git worktree"},{t:"Agent works on isolated branch"},{t:"Changes returned with branch name"},{t:"Auto-cleanup if no changes"},{t:"Enables safe parallel edits"}],
    links:[{l:"Subagents docs",u:"https://code.claude.com/docs/en/sub-agents"}]},
  { id:"tasks", title:"Tasks", short:"Tasks", cat:"context", color:"#7B68AE", tier:2, size:1,
    desc:"Track progress within a session. Create, update, and complete tasks as you work. Helps Claude stay organized on complex multi-step work.",
    items:[{t:"Create: TaskCreate tool"},{t:"Update: TaskUpdate (in_progress, completed)"},{t:"List: TaskList to see all tasks"},{t:"Scoped to current session"},{t:"Auto-suggested for complex work"},{t:"Visible in VS Code sidebar"}],
    links:[{l:"Features overview",u:"https://code.claude.com/docs/en/features-overview"}]},
  { id:"context", title:"Context mgmt", short:"Context", cat:"runtime", color:"#6B7B8D", tier:2, size:1,
    desc:"How Claude manages its finite context window. Automatic compaction, manual /compact, token budgets, and smart prioritization of what stays loaded.",
    items:[{t:"Auto-compaction near limits"},{t:"Manual: /compact command"},{t:"/compact [instructions] for guided compaction"},{t:"Skills: 2% budget each"},{t:"CLAUDE.md: always loaded"},{t:"Old messages summarized, not dropped"}],
    links:[{l:"How it works",u:"https://code.claude.com/docs/en/how-claude-code-works"}]},
];

export const EDGES = [
  // Plugin containment (solid)
  {from:"plugins",to:"skills",label:"contains skills/",solid:true},
  {from:"plugins",to:"subagents",label:"contains agents/",solid:true},
  {from:"plugins",to:"commands",label:"contains commands/",solid:true},
  {from:"plugins",to:"hooks",label:"contains hooks/",solid:true},
  {from:"plugins",to:"mcp",label:"contains .mcp.json",solid:true},
  // Extension relationships
  {from:"skills",to:"commands",label:"invoked as /slash"},
  {from:"subagents",to:"teams",label:"teammates are agents"},
  {from:"subagents",to:"worktrees",label:"isolation mode"},
  {from:"mcp",to:"subagents",label:"tools inherited"},
  {from:"hooks",to:"subagents",label:"SubagentStart/Stop"},
  {from:"hooks",to:"teams",label:"TeammateIdle hook"},
  {from:"hooks",to:"tools",label:"PreToolUse/Post"},
  // Runtime relationships
  {from:"sdk",to:"plugins",label:"loads via code"},
  {from:"sdk",to:"subagents",label:"agents param"},
  {from:"models",to:"tools",label:"powers tool loop"},
  {from:"envs",to:"sdk",label:"embeds engine"},
  {from:"permissions",to:"tools",label:"controls access"},
  {from:"settings",to:"permissions",label:"configures"},
  {from:"settings",to:"hooks",label:"defines hooks"},
  // Context relationships
  {from:"claudemd",to:"skills",label:"context inherited"},
  {from:"claudemd",to:"memory",label:"persists learnings"},
  {from:"claudemd",to:"subagents",label:"context inherited"},
  {from:"sessions",to:"memory",label:"triggers saves"},
  {from:"sessions",to:"subagents",label:"spawns within"},
  {from:"sessions",to:"tasks",label:"tracks progress"},
  {from:"plans",to:"subagents",label:"Plan agent"},
  {from:"context",to:"sessions",label:"compacts history"},
  {from:"claudemd",to:"context",label:"always loaded"},
];

export const CAT_META = {
  context: { label: "Context", color: "#7F77DD" },
  extension: { label: "Extensions", color: "#D4537E" },
  runtime: { label: "Runtime", color: "#BA7517" },
};

// Layout: tier 1 = inner ring, tier 2 = outer ring
const T1 = NODES.filter(n => n.tier === 1);
const T2 = NODES.filter(n => n.tier === 2);

export const CX = 500, CY = 500;
export const R1 = 240, R2 = 420;

export const POS = {};
T1.forEach((n, i) => {
  const a = (i / T1.length) * Math.PI * 2 - Math.PI / 2;
  POS[n.id] = { x: CX + R1 * Math.cos(a), y: CY + R1 * Math.sin(a), a, tier: 1 };
});
T2.forEach((n, i) => {
  const a = (i / T2.length) * Math.PI * 2 - Math.PI / 2;
  POS[n.id] = { x: CX + R2 * Math.cos(a), y: CY + R2 * Math.sin(a), a, tier: 2 };
});

// Size mapping: size 3=42, 2=34, 1=26
export const SZ = { 3: 42, 2: 34, 1: 26 };
export const SZ_HOVER = { 3: 46, 2: 38, 1: 30 };
export const SZ_ACTIVE = { 3: 50, 2: 42, 1: 34 };
export const FONT_SZ = { 3: 14, 2: 12, 1: 10.5 };

export function crv(fid, tid) {
  const p1 = POS[fid], p2 = POS[tid], mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
  const dx = mx - CX, dy = my - CY, dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ad = Math.abs(p1.a - p2.a), norm = Math.min(ad, Math.PI * 2 - ad) / Math.PI;
  // Cross-ring edges need less bulge, same-ring edges need more
  const crossRing = p1.tier !== p2.tier;
  const bulge = crossRing ? Math.max(30, 20 + norm * 40) : Math.max(60, 35 + norm * 70);
  const cpx = mx + (dx / dist) * bulge, cpy = my + (dy / dist) * bulge;
  return { d: `M${p1.x},${p1.y} Q${cpx},${cpy} ${p2.x},${p2.y}`, cpx, cpy };
}
