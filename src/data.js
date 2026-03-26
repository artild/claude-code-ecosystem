export const NODES = [
  { id:"claudemd", title:"CLAUDE.md", short:"CLAUDE", cat:"context", color:"#7F77DD",
    desc:"Persistent project instructions loaded every session. Coding standards, architecture, libraries, checklists. The foundation of project context.",
    items:[{t:"Project root",loc:"./CLAUDE.md or .claude/CLAUDE.md"},{t:"Global (all projects)",loc:"~/.claude/CLAUDE.md"},{t:"Subdirectory overrides",loc:"src/CLAUDE.md"},{t:"Priority: managed > user > project"},{t:"Bootstrap with /init command"}],
    links:[{l:"CLAUDE.md docs",u:"https://code.claude.com/docs/en/claude-md"},{l:"How it works",u:"https://code.claude.com/docs/en/how-claude-code-works"},{l:"Extension overview",u:"https://code.claude.com/docs/en/features-overview"}]},
  { id:"memory", title:"Memory", short:"Memory", cat:"context", color:"#9B6DD7",
    desc:"Auto-memory system that saves learnings across sessions. User preferences, feedback, project context, references — builds up over time without manual effort.",
    items:[{t:"Index file",loc:"~/.claude/MEMORY.md"},{t:"Memory files",loc:"~/.claude/projects/<id>/memory/*.md"},{t:"Types: user, feedback, project, reference"},{t:"YAML frontmatter: name, description, type"},{t:"Auto-saved from conversation context"},{t:"Loaded when relevant to current task"}],
    links:[{l:"CLAUDE.md docs",u:"https://code.claude.com/docs/en/claude-md"},{l:"How it works",u:"https://code.claude.com/docs/en/how-claude-code-works"}]},
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

export const EDGES = [
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
  {from:"claudemd",to:"skills",label:"context inherited"},
  {from:"claudemd",to:"memory",label:"persists learnings"},
  {from:"claudemd",to:"subagents",label:"context inherited"},
  {from:"envs",to:"sdk",label:"embeds engine"},
];

export const CAT_META = {
  context: { label: "Context", color: "#7F77DD" },
  extension: { label: "Extensions", color: "#D4537E" },
  runtime: { label: "Runtime", color: "#BA7517" },
};

export const ORDER = ["claudemd","memory","skills","commands","subagents","teams","hooks","mcp","plugins","tools","models","sdk","envs"];

export const CX = 500, CY = 500, R = 350;

export const POS = {};
ORDER.forEach((id, i) => {
  const a = (i / ORDER.length) * Math.PI * 2 - Math.PI / 2;
  POS[id] = { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a), a };
});

export function crv(fid, tid) {
  const p1 = POS[fid], p2 = POS[tid], mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
  const dx = mx - CX, dy = my - CY, dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ad = Math.abs(p1.a - p2.a), norm = Math.min(ad, Math.PI * 2 - ad) / Math.PI;
  const bulge = 35 + norm * 55, cpx = mx + (dx / dist) * bulge, cpy = my + (dy / dist) * bulge;
  return { d: `M${p1.x},${p1.y} Q${cpx},${cpy} ${p2.x},${p2.y}`, cpx, cpy };
}
