# AI Agent Operational Guidelines: Test File Exclusion Strategy
## Project: EduKidz

---

### Document Control
- **Purpose:** Best practices, configuration files, and prompt templates to guarantee AI coding agents DO NOT inspect, read, run, or modify test files during routine development prompts.
- **Document Version:** 1.0.0
- **Location:** `docs/AGENT_GUIDELINES.md`

---

## 1. The Challenge: Why AI Agents Inspect Tests Unnecessarily

When instructed to implement or update features, AI coding assistants (e.g., Antigravity, Claude Code, Cursor, Copilot, Windsurf) frequently:
1. **Over-index on codebase search:** Running broad searches (e.g., `grep_search` or `file_search` with `**/*`) that pull `*.test.ts`, `*.spec.tsx`, or snapshot files into the context window.
2. **Context bloat & token waste:** Consuming 10,000+ tokens reading unit tests and mock fixtures that are irrelevant to UI/feature building.
3. **Premature test refactoring:** Editing test assertions prematurely when a UI component changes, leading to endless debugging loops.
4. **Unsolicited test runs:** Running `npm test` after minor edits even when the user only asked to adjust a button or styling.

---

## 2. The Best Architectural Approach: Multi-Layer Defense

To achieve a 100% reliable guarantee that agents will **never** check test files during normal prompts, use a **3-Layer Defense-in-Depth** strategy:

```
Layer 1: Agent Rule Files (AGENTS.md, GEMINI.md, .cursorrules)
        ▼ (Automated workspace enforcement)
Layer 2: Tool & File System Configuration (.ignore, tsconfig, package.json)
        ▼ (Underlying tool filtering)
Layer 3: User Prompt Prefix / Golden Anchor
        ▼ (Explicit prompt-level constraint)
```

---

## 3. Layer 1: Workspace Agent Rule Files

AI agents automatically inspect root configuration files (`AGENTS.md`, `GEMINI.md`, or `.cursorrules`) at the start of a conversation.

### 3.1 Root `AGENTS.md` (Already active in repo)
Ensure your project contains an `AGENTS.md` with this exact clause:

```markdown
# Agent Execution Rules: Test Exclusion Protocol

## CRITICAL DIRECTIVE: ZERO TEST FILE INSPECTION
1. NEVER search, view, read, edit, or execute files inside `tests/` or matching `*.test.*` or `*.spec.*`.
2. NEVER run `npm test`, `npx vitest`, or test runners unless the user's prompt explicitly includes the command `[RUN_TESTS]`.
3. If using `grep_search` or file search tools, ALWAYS exclude tests using patterns like `Includes: ["!**/tests/**", "!**/*.test.*"]`.
4. Focus 100% of reasoning, edits, and verification on `src/` and production code.
```

---

## 4. Layer 2: Tooling & Configuration Gates

Even if an agent runs a ripgrep or TypeScript check, your project configuration can physically block it from seeing test files:

### 4.1 Ripgrep / Search Ignore (`.ignore`)
Create a `.ignore` file at your repository root. Ripgrep and agent search tools honor `.ignore`:
```gitignore
# Exclude tests from agent search index
tests/
__tests__/
*.test.ts
*.test.tsx
*.spec.ts
*.spec.tsx
```

### 4.2 TypeScript Configuration Decoupling (`tsconfig.json`)
Ensure the main `tsconfig.json` strictly excludes tests so `tsc` typechecking never trips on test files:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["tests/**/*", "**/*.test.*", "**/*.spec.*", "node_modules"]
}
```

### 4.3 Clean `package.json` Scripts
Ensure default build and verification commands never trigger test runners:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src/ --ext .ts,.tsx",
    "test:isolated": "vitest run --config vitest.config.ts"
  }
}
```

---

## 5. Layer 3: Prompt Engineering Templates & Prefixes

Whenever you prompt an agent for new features, bug fixes, or styling tweaks, use one of these proven prompt techniques:

### Option A: The "Golden Prefix" (Recommended for every prompt)
Add this quick one-line anchor at the start or end of your prompt:

> **`[NO_TESTS] Build the Sleep Timer modal in src/components/audio/SleepTimerModal.tsx with 10, 20, and 30 minute buttons. Do NOT check, read, or run any test files.`**

### Option B: The System Anchor Template
If you write detailed task prompts, include this standard block:

```text
TASK: Implement Bedtime Ambient Audio Cross-Fade
SCOPE:
- Focus solely on files in src/
- DO NOT inspect, search, or run any test files (*.test.*, tests/)
- Verification: Verify by previewing code correctness and build output only (npm run build).
```

### Option C: The Conditional Trigger Protocol
Establish a strict rule with your agent:
- Normal Prompts $\rightarrow$ **Zero test interaction**.
- Testing Prompts $\rightarrow$ Must begin with `[RUN_TESTS]` or `[EDIT_TESTS]`.

Example:
- Routine feature: `"Add interactive star collectibles in Scene3DCanvas.tsx"` *(Agent stays in `src/`)*
- Explicit test run: `"[RUN_TESTS] Run unit tests on the story state store to verify scene transitions"` *(Agent executes tests)*

---

## 6. Summary Checklist for EduKidz Developers

- [x] `docs/BRD.md` completed.
- [x] `docs/PRD.md` completed.
- [x] `docs/SDD.md` completed.
- [x] `docs/TDD.md` completed.
- [x] `docs/AGENT_GUIDELINES.md` completed.
- [x] `AGENTS.md` created at repository root to enforce test exclusion.
- [x] `.ignore` created to filter search tools.
