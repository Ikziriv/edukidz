# EduKidz Agent Working Directives

## 1. Project Context
EduKidz is an interactive web-based educational storytelling platform for kids (Ages 3–10) featuring dual-mode rendering (**3D via Three.js / React Three Fiber** and **2D Layered Parallax Canvas**) supporting three modes:
- **Study Mode**: Phonics, karaoke word-sync reading, educational fact hotspots, and mini-quizzes.
- **Sleeping Mode**: Calming circadian twilight colors, soothing ambient lullabies/ASMR, and gradual fade-out sleep timer.
- **Playing Mode**: Interactive 3D pop-up diorama, tap-to-animate characters, and hidden star quest.

Architecture documents are located in `docs/`:
- `docs/BRD.md` (Business Requirements Document)
- `docs/PRD.md` (Product Requirements Document)
- `docs/SDD.md` (System Design Document)
- `docs/TDD.md` (Technical Design Document & Test Specification)
- `docs/AGENT_GUIDELINES.md` (AI Agent prompt & test exclusion guide)

---

## 2. CRITICAL RULE: TEST FILE EXCLUSION PROTOCOL
To optimize speed, token efficiency, and avoid unsolicited test runner runs:
1. **NEVER search, open, read, edit, or execute files inside `tests/` or matching `*.test.*` or `*.spec.*` during routine feature development.**
2. **NEVER run `npm test`, `npx vitest`, or test runners** unless the user's prompt explicitly contains the keyword `[RUN_TESTS]` or `[EDIT_TESTS]`.
3. When using search tools (`grep_search`), always exclude tests using patterns like `Includes: ["!**/tests/**", "!**/*.test.*"]`.
4. Validate implementation solely through code correctness, TypeScript compilation (`npm run build`), or visual verification.
