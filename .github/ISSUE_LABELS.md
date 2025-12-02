# Issue Labels Guide

This repository uses a comprehensive labeling system to organize and classify issues.

## AI Capability Classification

These labels indicate whether AI can handle the issue:

| Label | Description | When to Use |
|-------|-------------|-------------|
| **ai-friendly** 🟣 | Can be completed autonomously by AI | - Bug fixes with clear reproduction steps<br>- Code refactoring<br>- Documentation updates<br>- Responsive design fixes<br>- Accessibility improvements with clear requirements |
| **ai-assisted** 🔵 | AI can help but needs human review/approval | - Design changes requiring taste/judgment<br>- Content updates needing brand voice<br>- Complex features needing architectural decisions<br>- SEO optimization |
| **needs-human** 🟪 | Requires human decision or creative input | - Strategic decisions<br>- Brand/marketing copy<br>- User research insights<br>- Business logic decisions<br>- Creative design work |

## Priority Levels

| Label | Description | SLA |
|-------|-------------|-----|
| **priority: high** 🔴 | Critical issues that need immediate attention | Fix ASAP |
| **priority: medium** 🟡 | Standard priority issues | Within 1 week |
| **priority: low** 🟢 | Nice to have improvements | When capacity allows |

## Area Labels

Categorize issues by which part of the codebase they affect:

- **area: frontend** - HTML/CSS/JavaScript changes
- **area: design** - Visual design and UX improvements
- **area: content** - Copy, images, or content updates
- **area: deployment** - Hosting, build, or deployment issues

## Type Labels

Standard GitHub labels for issue types:

- **bug** - Something isn't working
- **enhancement** - New feature or request
- **documentation** - Improvements or additions to documentation
- **question** - Further information is requested

## Status Labels

Track progress on active issues:

- **status: in-progress** - Work has started on this issue
- **status: blocked** - Cannot proceed until something else is resolved
- **status: ready-to-test** - Implementation complete, needs testing

## Specialized Labels

- **responsive** - Mobile/tablet responsive design issues
- **accessibility** - A11y improvements and fixes
- **performance** - Speed and optimization improvements
- **good first issue** - Good for newcomers
- **help wanted** - Extra attention is needed

## Labeling Best Practices

1. **Every issue should have:**
   - One AI capability label (ai-friendly, ai-assisted, or needs-human)
   - One priority label
   - At least one type or area label

2. **AI-friendly issues should:**
   - Have clear acceptance criteria
   - Include reproduction steps (for bugs)
   - Reference specific files/line numbers when possible
   - Avoid subjective requirements ("make it prettier")

3. **Needs-human issues should:**
   - Tag the human decision-maker
   - Explain what decision is needed
   - Provide context and constraints

4. **Examples:**

   ```
   Bug: Navigation broken on mobile Safari
   Labels: bug, ai-friendly, priority: high, area: frontend, responsive

   Enhancement: Add testimonials section
   Labels: enhancement, needs-human, priority: medium, area: content, area: design

   Improvement: Optimize image loading
   Labels: enhancement, ai-friendly, priority: low, performance, area: frontend
   ```

## Color Coding

- **Red** (#d73a4a) - High priority, bugs, blocked
- **Orange/Yellow** (#fbca04) - Medium priority, in-progress
- **Green** (#0e8a16) - Low priority, ready-to-test
- **Purple** (#7057ff, #d876e3) - AI capability labels
- **Blue** (#0052cc, #c5def5) - Technical areas
- **Pastels** - Design, content, responsive

---

This system helps both humans and AI quickly understand issue scope, priority, and who should handle it.
