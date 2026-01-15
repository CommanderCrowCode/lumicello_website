# Agent Instructions

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

## Branch Workflow

### Current: Direct-to-Main (Jan 2026+)

Polecats merge directly to `main`. No intermediate staging branch.

```
polecat/feature-branch → main
```

**Rationale:**
- Render.com deploys from `main` to production (www.lumicello.com)
- Preview deployments are automatic per-PR via Render
- Eliminates extra merge step and preview branch drift

**Local preview:** Run `python -m http.server 8889` from `mayor/rig` on main.

### Historical: Preview Branch (Pre-Jan 2026)

Previously used a `preview` branch as staging:
```
polecat/feature-branch → preview → main
```

This workflow was retired because:
- Preview branch frequently drifted behind main
- Extra merge step added friction without benefit
- Render's automatic PR previews provide the same safety net

**Note:** The `preview` branch still exists but is no longer used. It's ~15 commits behind main as of Jan 2026.

