# GitHub Configuration

This directory contains GitHub-specific configuration for the Lumicello website repository.

## Issue Management System

We use a comprehensive labeling and templating system to organize work and enable efficient AI-human collaboration.

### Quick Start

1. **Creating an issue**: Click "New Issue" and choose a template
2. **Labeling**: Templates auto-apply relevant labels; add priority and AI capability labels
3. **Assignment**: AI-friendly issues can be assigned directly to Claude Code
4. **Workflow**: Status labels track progress (in-progress → ready-to-test → closed)

### Files in This Directory

- **ISSUE_LABELS.md** - Complete guide to our labeling system
- **ISSUE_TEMPLATE/** - Issue templates for consistent reporting
  - `bug_report.yml` - Bug reports with reproduction steps
  - `feature_request.yml` - Feature requests and enhancements
  - `content_update.yml` - Text, image, and copy changes
  - `config.yml` - Template chooser configuration
- **workflows/** - GitHub Actions (Claude Code PR Assistant, Code Review)

### Label Categories

| Category | Purpose | Examples |
|----------|---------|----------|
| **AI Capability** | Who can handle this? | ai-friendly, needs-human, ai-assisted |
| **Priority** | How urgent? | priority: high, priority: medium, priority: low |
| **Area** | Which part of codebase? | area: frontend, area: design, area: content |
| **Type** | What kind of work? | bug, enhancement, documentation |
| **Status** | Where are we? | status: in-progress, status: blocked |
| **Specialized** | Specific concerns | responsive, accessibility, performance |

### AI-Friendly vs Needs-Human

**AI-Friendly Issues** can be completed autonomously when they have:
- Clear acceptance criteria
- Specific file/line references
- Objective requirements (not subjective taste)
- Technical implementation focus

Examples: Fix mobile navigation bug, Add lazy loading to images, Update favicon

**Needs-Human Issues** require human input for:
- Strategic/business decisions
- Creative/brand work
- Subjective design choices
- Content requiring brand voice

Examples: Redesign hero section, Write testimonials copy, Choose color palette

**AI-Assisted Issues** fall in between:
- AI can implement, but needs human approval
- Technical work with subjective elements
- Changes affecting brand/UX perception

Examples: Optimize image loading (technical + visual quality), SEO improvements (technical + strategy)

### Workflows

We have two GitHub Actions workflows:

1. **Claude PR Assistant** - Automatically reviews PRs and suggests improvements
2. **Claude Code Review** - Deep code analysis on PR creation

Both workflows use Claude Code to provide intelligent feedback on changes.

### Best Practices

1. **Label every issue** with at minimum:
   - One AI capability label
   - One priority label
   - One area or type label

2. **Use templates** for consistency and completeness

3. **Update status labels** as work progresses

4. **Reference issues in commits** using `#issue-number`

5. **Close with keywords**: "Fixes #123", "Closes #456", "Resolves #789"

---

For more details, see [ISSUE_LABELS.md](ISSUE_LABELS.md)
