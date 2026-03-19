# Project Instructions for PR Generation

When creating a pull request, always generate both:
1. A clear PR title
2. A complete PR description in English

Requirements:
- Title format: `<ticket>: <concise change summary>`
- Use the same ticket and summary in the Work Item section.
- Plane URL format: `https://app.plane.so/mauricio-martinez/browse/<ticket>/`

Description must be structured with these sections:
- Work Item
- Context
- Root Cause
- What Changed
- Why This Makes Sense Now
- Impact
- Validation

Rules:
- In *Work Item*, output exactly one markdown link in this format:
  `[<ticket>: <concise change summary>](https://app.plane.so/mauricio-martinez/browse/<ticket>/)`
- Example:
  `[CUST-3: Improve PR template consistency](https://app.plane.so/mauricio-martinez/browse/CUST-3/)`
- Explain the user-visible issue first, then the technical cause.
- Explicitly describe previous behavior vs new behavior.
- List exact files touched and key logic changes.
- For calculations, include formulas when relevant.
- Mention edge-case handling (e.g., divide-by-zero, null-safe behavior).
- Include validation done (lint/tests/manual checks) and note limitations if something was not run.
- Keep tone technical and concise; avoid vague wording.
- Do not omit any section, even for small PRs (write "N/A" if truly not applicable).

Output format:
- Markdown
- Use headings (`## ...`)
- Use bullet points for file-level changes

## Commit Messages

When creating commits, follow this format:
- Commit title format: `<ticket>: <imperative summary>`
- Example: `CUST-3: Update AGENTS project rules for Plane ticket links`
- Keep commit titles concise and specific (prefer <= 72 chars when possible).
- Do not use `WIP` in commit titles.
- Use English for commit messages.
- Group changes by intent; avoid mixing unrelated changes in one commit.

Commit body guidance:
- Add a short body when context is needed.
- Explain why the change is needed (not only what changed).
- Reference key files touched when useful.
